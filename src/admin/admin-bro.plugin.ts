import { INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { resolvers } from '@generated/type-graphql';
import AdminJS from 'adminjs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AdminJSExpress = require('@adminjs/express');
import { Database, Resource } from '@adminjs/prisma';
import { DMMFClass } from '@prisma/client/runtime';

const resolverObjects = new Set();

resolvers.forEach((resolver) => {
    const resolverName = resolver.name
        .replace('CrudResolver', '')
        .replace('RelationsResolver', '');

    resolverObjects.add(resolverName);
});

AdminJS.registerAdapter({ Database, Resource });

export async function setupAdminPanel(
    app: INestApplication,
    prisma: PrismaClient,
): Promise<void> {
    const dmmf = (prisma as any)._dmmf as DMMFClass;

    const resources = [];

    resolverObjects.forEach((resolverName: string) => {
        resources.push({
            resource: {
                model: dmmf.modelMap[resolverName],
                client: prisma,
            },
            options: {},
        });
    });

    /** Create adminBro instance */
    const adminJs = new AdminJS({
        resources, // Here we will put resources
        rootPath: '/admin', // Define path for the admin panel
    });

    /** Create router */
    const router = AdminJSExpress.buildRouter(adminJs);

    /** Bind routing */
    app.use(adminJs.options.rootPath, router);
}
