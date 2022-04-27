import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(NotificationsService.name);
    constructor(private prisma: PrismaService) {}

    @Cron('*/5 * * * *')
    async newEventNotification() {
        const res = await this.prisma.event.findMany({
            where: {
                createdAt: {
                    gt: new Date(Date.now() - 1000 * 60 * 5),
                },
                deletedAt: null,
            },
            select: {
                clubEvents: {
                    select: {
                        club: {
                            select: {
                                subscription: {
                                    select: {
                                        user: {
                                            select: {
                                                id: true,
                                            },
                                        },
                                    },
                                },
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
                name: true,
            },
        });
        const userIds = new Set();
        const userNotificationData = [];
        const clubNotificationData = [];
        res.forEach(async (event) => {
            event.clubEvents.forEach(async (clubEvent) => {
                clubEvent.club.subscription.forEach(async (subscription) => {
                    if (!userIds.has(subscription.user.id)) {
                        userIds.add(subscription.user.id);
                        userNotificationData.push({
                            user: {
                                connect: {
                                    id: subscription.user.id,
                                },
                            },
                        });
                    }
                });

                clubNotificationData.push({
                    club: {
                        connect: {
                            id: clubEvent.club.id,
                        },
                    },
                });
            });
            await this.prisma.notification.create({
                data: {
                    message: `New event cooking! Checkout ${event.name}`,
                    userNotifications: {
                        create: userNotificationData,
                    },
                    createdBy: {
                        create: clubNotificationData,
                    },
                },
            });
        });
    }

    @Cron('*/5 * * * *')
    async eventUpdateNotification() {
        const res = await this.prisma.event.findMany({
            where: {
                AND: [
                    {
                        updatedAt: {
                            gt: new Date(Date.now() - 1000 * 60 * 5),
                        },
                        deletedAt: null,
                    },
                    {
                        eventStartDate: {
                            gt: new Date(Date.now() + 1000 * 60 * 4),
                        },
                    },
                ],
            },
            select: {
                name: true,
                clubEvents: {
                    select: {
                        club: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                rsvpEvent: {
                    select: {
                        user: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        res.forEach(async (event) => {
            const clubNotificationData = event.clubEvents.map((clubEvent) => ({
                club: {
                    connect: {
                        id: clubEvent.club.id,
                    },
                },
            }));

            const userNotificationData = event.rsvpEvent.map((rsvp) => ({
                user: {
                    connect: {
                        id: rsvp.user.id,
                    },
                },
            }));

            await this.prisma.notification.create({
                data: {
                    message: `${event.name} has been updated.`,
                    userNotifications: {
                        create: userNotificationData,
                    },
                    createdBy: {
                        create: clubNotificationData,
                    },
                },
            });
        });
    }

    @Cron('*/1 * * * *')
    async sendEventStartNotification() {
        const res = await this.prisma.event.findMany({
            where: {
                eventStartDate: {
                    gt: new Date(Date.now() + 1000 * 60 * 4),
                    lte: new Date(Date.now() + 1000 * 60 * 5),
                },

                deletedAt: null,
            },
            select: {
                name: true,
                clubEvents: {
                    select: {
                        club: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
                rsvpEvent: {
                    select: {
                        user: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        res.forEach(async (event) => {
            const clubNotificationData = event.clubEvents.map((clubEvent) => ({
                club: {
                    connect: {
                        id: clubEvent.club.id,
                    },
                },
            }));

            const userNotificationData = event.rsvpEvent.map((rsvp) => ({
                user: {
                    connect: {
                        id: rsvp.user.id,
                    },
                },
            }));

            await this.prisma.notification.create({
                data: {
                    message: `${event.name} is starting soon!`,
                    userNotifications: {
                        create: userNotificationData,
                    },
                    createdBy: {
                        create: clubNotificationData,
                    },
                },
            });
        });
    }
}
