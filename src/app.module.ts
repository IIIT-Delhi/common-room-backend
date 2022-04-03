import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeGraphQLModule } from 'typegraphql-nestjs';
import { Context } from 'apollo-server-core';
import {
    resolvers,
    applyResolversEnhanceMap,
    applyRelationResolversEnhanceMap,
} from '@generated/type-graphql';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './image/image.module';
import { UseMiddleware } from 'type-graphql';
import { authChecker } from './auth/auth.middleware';

import configuration from './config/configuration';

const MyResolvers: Provider[] = [];

const resolverObjects = {};

// iterate over all resolvers and add them to the MyResolvers array
resolvers.forEach((resolver) => {
    const resolverName = resolver.name
        .replace('CrudResolver', '')
        .replace('RelationsResolver', '');

    resolverObjects[resolverName] = {
        _all: [UseMiddleware(authChecker)],
    };

    MyResolvers.push(resolver as Provider);
});

applyResolversEnhanceMap(resolverObjects);
applyRelationResolversEnhanceMap(resolverObjects);

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
        AuthModule,
        ImageModule,
    ],
    providers: [...MyResolvers, PrismaService, AppService, AppController],
})
export class AppModule {}
