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

@Resolver(Auth)
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => Auth)
    login(@Arg('token') token: string): Promise<Auth> {
        return this.authService.login(token);
    }

    @Query(() => Boolean)
    @UseMiddleware(authChecker)
    logout(@Ctx() ctx: any): Promise<boolean> {
        return this.authService.logout(ctx.req.user);
    }
}
