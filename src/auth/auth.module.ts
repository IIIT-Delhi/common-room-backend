import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-guard';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secretOrPrivateKey: configService.get<string>('jwt'),
                signOptions: {
                    expiresIn: '7d',
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthResolver, AuthService, FirebaseService, JwtAuthGuard],
})
export class AuthModule {}
