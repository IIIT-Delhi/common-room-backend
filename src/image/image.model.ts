import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Image {
    @Field() data: string;

    @Field() url: string;
}
