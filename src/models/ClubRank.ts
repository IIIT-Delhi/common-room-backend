import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Club, ClubId } from './Club';

export interface ClubRankAttributes {
    id: number;
    clubId: number;
    rank: number;
    eventCount: number;
    moneyAwarded: number;
    rsvpCount: number;
    upVoteCount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type ClubRankPk = "id";
export type ClubRankId = ClubRank[ClubRankPk];
export type ClubRankOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type ClubRankCreationAttributes = Optional<ClubRankAttributes, ClubRankOptionalAttributes>;

export class ClubRank extends Model<ClubRankAttributes, ClubRankCreationAttributes> implements ClubRankAttributes {
    id!: number;
    clubId!: number;
    rank!: number;
    eventCount!: number;
    moneyAwarded!: number;
    rsvpCount!: number;
    upVoteCount!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // ClubRank belongsTo Club via clubId
    club!: Club;
    getClub!: Sequelize.BelongsToGetAssociationMixin<Club>;
    setClub!: Sequelize.BelongsToSetAssociationMixin<Club, ClubId>;
    createClub!: Sequelize.BelongsToCreateAssociationMixin<Club>;

    static initModel(sequelize: Sequelize.Sequelize): typeof ClubRank {
        return sequelize.define('ClubRank', {
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
            },
            unique: "ClubRank_clubId_fkey"
        },
        rank: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        eventCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        moneyAwarded: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rsvpCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        upVoteCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'ClubRank',
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
                name: "ClubRank_clubId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "clubId" },
                ]
            },
        ]
    }) as typeof ClubRank;
    }
}
