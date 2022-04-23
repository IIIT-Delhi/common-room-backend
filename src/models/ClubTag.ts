import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Club, ClubId } from './Club';
import type { Tag, TagId } from './Tag';

export interface ClubTagAttributes {
    id: number;
    clubId: number;
    tagId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type ClubTagPk = "id";
export type ClubTagId = ClubTag[ClubTagPk];
export type ClubTagOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type ClubTagCreationAttributes = Optional<ClubTagAttributes, ClubTagOptionalAttributes>;

export class ClubTag extends Model<ClubTagAttributes, ClubTagCreationAttributes> implements ClubTagAttributes {
    id!: number;
    clubId!: number;
    tagId!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // ClubTag belongsTo Club via clubId
    club!: Club;
    getClub!: Sequelize.BelongsToGetAssociationMixin<Club>;
    setClub!: Sequelize.BelongsToSetAssociationMixin<Club, ClubId>;
    createClub!: Sequelize.BelongsToCreateAssociationMixin<Club>;
    // ClubTag belongsTo Tag via tagId
    tag!: Tag;
    getTag!: Sequelize.BelongsToGetAssociationMixin<Tag>;
    setTag!: Sequelize.BelongsToSetAssociationMixin<Tag, TagId>;
    createTag!: Sequelize.BelongsToCreateAssociationMixin<Tag>;

    static initModel(sequelize: Sequelize.Sequelize): typeof ClubTag {
        return sequelize.define('ClubTag', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        clubId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Club',
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
        tableName: 'ClubTag',
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
            {
                name: "ClubTag_clubId_tagId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "clubId" },
                    { name: "tagId" },
                ]
            },
            {
                name: "ClubTag_tagId_fkey",
                using: "BTREE",
                fields: [
                    { name: "tagId" },
                ]
            },
        ]
    }) as typeof ClubTag;
    }
}
