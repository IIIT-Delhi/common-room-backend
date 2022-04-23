import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ClubTag, ClubTagId } from './ClubTag';
import type { UserTag, UserTagId } from './UserTag';

export interface TagAttributes {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type TagPk = "id";
export type TagId = Tag[TagPk];
export type TagOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type TagCreationAttributes = Optional<TagAttributes, TagOptionalAttributes>;

export class Tag extends Model<TagAttributes, TagCreationAttributes> implements TagAttributes {
    id!: number;
    name!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // Tag hasMany ClubTag via tagId
    ClubTags!: ClubTag[];
    getClubTags!: Sequelize.HasManyGetAssociationsMixin<ClubTag>;
    setClubTags!: Sequelize.HasManySetAssociationsMixin<ClubTag, ClubTagId>;
    addClubTag!: Sequelize.HasManyAddAssociationMixin<ClubTag, ClubTagId>;
    addClubTags!: Sequelize.HasManyAddAssociationsMixin<ClubTag, ClubTagId>;
    createClubTag!: Sequelize.HasManyCreateAssociationMixin<ClubTag>;
    removeClubTag!: Sequelize.HasManyRemoveAssociationMixin<ClubTag, ClubTagId>;
    removeClubTags!: Sequelize.HasManyRemoveAssociationsMixin<ClubTag, ClubTagId>;
    hasClubTag!: Sequelize.HasManyHasAssociationMixin<ClubTag, ClubTagId>;
    hasClubTags!: Sequelize.HasManyHasAssociationsMixin<ClubTag, ClubTagId>;
    countClubTags!: Sequelize.HasManyCountAssociationsMixin;
    // Tag hasMany UserTag via tagId
    UserTags!: UserTag[];
    getUserTags!: Sequelize.HasManyGetAssociationsMixin<UserTag>;
    setUserTags!: Sequelize.HasManySetAssociationsMixin<UserTag, UserTagId>;
    addUserTag!: Sequelize.HasManyAddAssociationMixin<UserTag, UserTagId>;
    addUserTags!: Sequelize.HasManyAddAssociationsMixin<UserTag, UserTagId>;
    createUserTag!: Sequelize.HasManyCreateAssociationMixin<UserTag>;
    removeUserTag!: Sequelize.HasManyRemoveAssociationMixin<UserTag, UserTagId>;
    removeUserTags!: Sequelize.HasManyRemoveAssociationsMixin<UserTag, UserTagId>;
    hasUserTag!: Sequelize.HasManyHasAssociationMixin<UserTag, UserTagId>;
    hasUserTags!: Sequelize.HasManyHasAssociationsMixin<UserTag, UserTagId>;
    countUserTags!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof Tag {
        return sequelize.define('Tag', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(191),
            allowNull: false
        }
    }, {
        tableName: 'Tag',
        timestamps: true,
        paranoid: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
        ]
    }) as typeof Tag;
    }
}
