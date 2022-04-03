import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const FormData = require('form-data');
import { Image } from './image.model';

@Injectable()
export class ImageService {
    constructor(private configService: ConfigService) {}

    async upload(imgData: string): Promise<Image> {
        const data = new FormData();
        data.append('image', imgData);
        const config: any = {
            method: 'post',
            url: this.configService.get<string>('imgur.url'),
            headers: {
                Authorization: `Client-ID ${this.configService.get<string>(
                    'imgur.clientId',
                )}`,
                ...data.getHeaders(),
            },
            data: data,
        };
        const response = await Axios(config);

        if (response.status !== 200) {
            throw new Error(response.data.data.error);
        }

        return {
            url: response.data.data.link,
            data: response.data.data.id,
        };
    }
}
