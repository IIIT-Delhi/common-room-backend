import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';
import { Auth } from './auth.model';
// import { Mutation } from 'type-graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-guard';

@Resolver(Auth)
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => Auth)
    login(@Arg('token') token: string): Promise<Auth> {
        return this.authService.login(token);
    }

    @Query(() => Boolean)
    @UseGuards(JwtAuthGuard)
    logout(@Ctx() ctx: any): Promise<boolean> {
        console.log('here');
        // console.log(ctx);
        return this.authService.logout(ctx);
    }
}
