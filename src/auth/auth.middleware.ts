import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MiddlewareFn, NextFn, ResolverData } from 'type-graphql';
import config from '../config/configuration';
import { PrismaService } from 'nestjs-prisma';

export const authChecker: MiddlewareFn<any> = async (
    _context: ResolverData,
    next: NextFn,
) => {
    const _config = config();
    const { context }: { context: any } = _context;
    const headers = context.req.headers;
    if (!headers.authorization) {
        throw new UnauthorizedException();
    }
    const jwtService = new JwtService({
        secret: _config.jwt,
    });
    const prismaService = new PrismaService();
    const token = headers.authorization;
    const user = await jwtService.verify(token);
    const prismaUser = await prismaService.user.findUnique({
        where: { email: user.sub },
        include: {
            clubCoordinator: {
                select: {
                    clubId: true,
                },
            },
        },
    });
    if (!prismaUser || !prismaUser.jwtToken || prismaUser.jwtToken !== token) {
        throw new UnauthorizedException();
    }
    context.req.user = prismaUser;
    return next();
};
