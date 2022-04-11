import {
    Resolver,
    Mutation,
    Arg,
    Query,
    Ctx,
    UseMiddleware,
} from 'type-graphql';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';
import { authChecker } from './auth.middleware';
import { User } from '@prisma/client';
import { User as _User } from '@generated/type-graphql';

@Resolver(Auth)
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => Auth)
    login(@Arg('token') token: string): Promise<Auth> {
        return this.authService.login(token);
    }

    @Query(() => _User)
    @UseMiddleware(authChecker)
    me(@Ctx() ctx: any): Promise<User> {
        return this.authService.me(ctx.req.user);
    }

    @Query(() => Boolean)
    @UseMiddleware(authChecker)
    logout(@Ctx() ctx: any): Promise<boolean> {
        return this.authService.logout(ctx.req.user);
    }
}
