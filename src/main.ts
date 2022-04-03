import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { setupAdminPanel } from './admin/admin-bro.plugin';
import { AppModule } from './app.module';

const prisma = new PrismaClient();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('PORT');

    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);

    await setupAdminPanel(app, prisma);

    await app.listen(port);
}
bootstrap().finally(() => prisma.$disconnect());
