import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Tag, TagId } from './Tag';
import type { User, UserId } from './User';

export interface UserTagAttributes {
    id: number;
    userId: number;
    tagId: number;
    createdAt: Date;
    updatedAt: Date;
}

export type UserTagPk = "id";
export type UserTagId = UserTag[UserTagPk];
export type UserTagOptionalAttributes = "id" | "createdAt" | "updatedAt";
export type UserTagCreationAttributes = Optional<UserTagAttributes, UserTagOptionalAttributes>;

export class UserTag extends Model<UserTagAttributes, UserTagCreationAttributes> implements UserTagAttributes {
    id!: number;
    userId!: number;
    tagId!: number;
    createdAt!: Date;
    updatedAt!: Date;

    // UserTag belongsTo Tag via tagId
    tag!: Tag;
    getTag!: Sequelize.BelongsToGetAssociationMixin<Tag>;
    setTag!: Sequelize.BelongsToSetAssociationMixin<Tag, TagId>;
    createTag!: Sequelize.BelongsToCreateAssociationMixin<Tag>;
    // UserTag belongsTo User via userId
    user!: User;
    getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
    setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
    createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

    static initModel(sequelize: Sequelize.Sequelize): typeof UserTag {
        return sequelize.define('UserTag', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Tag',
                key: 'id'
            }
        }
    }, {
        tableName: 'UserTag',
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "UserTag_userId_tagId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "userId" },
                    { name: "tagId" },
                ]
            },
            {
                name: "UserTag_tagId_fkey",
                using: "BTREE",
                fields: [
                    { name: "tagId" },
                ]
            },
        ]
    }) as typeof UserTag;
    }
}
