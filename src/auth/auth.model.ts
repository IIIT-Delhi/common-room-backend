import { User } from '@prisma/client';
import { User as _User } from '@generated/type-graphql';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Auth {
    @Field() token: string;

    @Field(() => _User) user: User;
}
