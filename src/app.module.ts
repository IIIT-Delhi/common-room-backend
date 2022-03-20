import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeGraphQLModule } from 'typegraphql-nestjs';
import { Context } from 'apollo-server-core';
import { resolvers } from '@generated/type-graphql';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

import configuration from './config/configuration';

const MyResolvers: Provider[] = [];

// iterate over all resolvers and add them to the MyResolvers array
resolvers.forEach((resolver) => {
    MyResolvers.push(resolver as Provider);
});

const playground = {
    endpoint: '/graphql',
};

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
        }),
        PrismaModule.forRoot({
            isGlobal: true,
        }),
        TypeGraphQLModule.forRootAsync({
            inject: [PrismaService, ConfigService],
            useFactory: async (
                prisma: PrismaService,
                config: ConfigService,
            ) => ({
                playground:
                    config.get('NODE_ENV') === 'development'
                        ? playground
                        : false,
                debug: config.get('NODE_ENV') === 'development' ? true : false,
                introspection:
                    config.get('NODE_ENV') === 'development' ? true : false,
                path: '/',
                emitSchemaFile: './generated-schema.graphql',
                validate: false,
                context: (): Context => ({ prisma }),
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService, ...MyResolvers],
})
export class AppModule {}
