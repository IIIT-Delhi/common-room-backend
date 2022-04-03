import { Resolver, Mutation, Arg, UseMiddleware } from 'type-graphql';
import { authChecker } from '../auth/auth.middleware';
import { Image } from './image.model';
import { ImageService } from './image.service';

@Resolver(Image)
export class ImageResolver {
    constructor(private imageService: ImageService) {}

    @Mutation(() => Image)
    @UseMiddleware(authChecker)
    async upload(@Arg('data') data: string): Promise<Image> {
        return this.imageService.upload(data);
    }
}
