import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { Auth } from './auth.model';
import { FirebaseService } from './firebase.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private firebase: FirebaseService,
        private jwt: JwtService,
    ) {}

    async login(token: string): Promise<Auth> {
        const firebaseUser = await this.firebase.validateToken(token);
        const { name, email, picture } = firebaseUser;
        let user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            const data: Prisma.UserCreateInput = {
                name,
                email,
                picture,
                isOnBoarded: false,
            };
            user = await this.prisma.user.create({
                data,
            });
        }

        const jwtToken = await this.jwt.signAsync({
            name: user.name,
            sub: user.email,
        });

        user = await this.prisma.user.update({
            where: { email },
            data: {
                jwtToken,
            },
        });

        return {
            token: jwtToken,
            user,
        };
    }

    async me(user: any): Promise<any> {
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async logout(user: any): Promise<boolean> {
        if (!user) {
            throw new Error('User not found');
        }
        await this.prisma.user.update({
            where: { email: user.email },
            data: {
                jwtToken: null,
            },
        });
        return true;
    }
}
