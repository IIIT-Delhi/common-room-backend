import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import { Sequelize } from 'sequelize';
import { initModels } from '../models/init-models';

import adminConfig from '../config/admin.json';

const verifyCredentials = (username: string, password: string) => {
    const accounts = adminConfig.accounts;
    const account = accounts.find((account) => account.username === username);
    if (!account || account.password !== password) {
        return false;
    }
    return {
        email: account.username,
    };
};

AdminJS.registerAdapter(AdminJSSequelize);

export async function setupAdminPanel(
    app: INestApplication,
    configService: ConfigService,
): Promise<void> {
    const sequelize = new Sequelize(configService.get<string>('database.uri'), {
        logging: false,
    });
    initModels(sequelize);

    /** Create adminBro instance */
    const adminJs = new AdminJS({
        // resources, // Here we will put resources
        databases: [sequelize],
        rootPath: '/admin', // Define path for the admin panel
        branding: {
            companyName: 'Common Room',
            favicon: 'https://i.imgur.com/jlo3HKz.png',
            logo: 'https://i.imgur.com/OLWxUbo.png',
            softwareBrothers: false,
        },
    });

    /** Create router */
    const router = AdminJSExpress.buildAuthenticatedRouter(
        adminJs,
        {
            authenticate: async (username, password) => {
                return verifyCredentials(username, password);
            },
            cookiePassword: configService.get<string>('admin.secret'),
            cookieName: 'common-room-admin',
            maxRetries: 3,
        },
        null,
        {
            resave: false,
            saveUninitialized: false,
            secret: configService.get<string>('admin.secret'),
        },
    );

    /** Bind routing */
    app.use(adminJs.options.rootPath, router);
}
