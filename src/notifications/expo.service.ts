import { Injectable, Logger } from '@nestjs/common';
import { Expo } from 'expo-server-sdk';

@Injectable()
export class ExpoService {
    private readonly logger = new Logger(ExpoService.name);
    private expo: Expo = null;

    constructor() {
        this.expo = new Expo();
    }

    async sendNotification(messages) {
        const pushMessages = [];
        for (const message of messages) {
            if (!Expo.isExpoPushToken(message.pushToken)) {
                this.logger.error(
                    `Push token ${message.pushToken} is not a valid Expo push token`,
                );
                continue;
            }

            pushMessages.push({
                to: message.pushToken,
                sound: 'default',
                body: message.data,
            });
        }

        const chunks = this.expo.chunkPushNotifications(pushMessages);
        for (const chunk of chunks) {
            try {
                await this.expo.sendPushNotificationsAsync(chunk);
            } catch (error) {
                this.logger.error(error);
            }
        }
    }
}
