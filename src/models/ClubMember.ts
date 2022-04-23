import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Club, ClubId } from './Club';
import type { User, UserId } from './User';

export interface ClubMemberAttributes {
    id: number;
    clubId: number;
    userId: number;
    level: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type ClubMemberPk = "id";
export type ClubMemberId = ClubMember[ClubMemberPk];
export type ClubMemberOptionalAttributes = "id" | "level" | "createdAt" | "updatedAt" | "deletedAt";
export type ClubMemberCreationAttributes = Optional<ClubMemberAttributes, ClubMemberOptionalAttributes>;

export class ClubMember extends Model<ClubMemberAttributes, ClubMemberCreationAttributes> implements ClubMemberAttributes {
    id!: number;
    clubId!: number;
    userId!: number;
    level!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // ClubMember belongsTo Club via clubId
    club!: Club;
    getClub!: Sequelize.BelongsToGetAssociationMixin<Club>;
    setClub!: Sequelize.BelongsToSetAssociationMixin<Club, ClubId>;
    createClub!: Sequelize.BelongsToCreateAssociationMixin<Club>;
    // ClubMember belongsTo User via userId
    user!: User;
    getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
    setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
    createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

    static initModel(sequelize: Sequelize.Sequelize): typeof ClubMember {
        return sequelize.define('ClubMember', {
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'ClubMember',
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
                name: "ClubMember_clubId_userId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "clubId" },
                    { name: "userId" },
                ]
            },
            {
                name: "ClubMember_userId_fkey",
                using: "BTREE",
                fields: [
                    { name: "userId" },
                ]
            },
        ]
    }) as typeof ClubMember;
    }
}
