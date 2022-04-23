import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Club, ClubId } from './Club';
import type { User, UserId } from './User';

export interface ClubCoordinatorAttributes {
    id: number;
    clubId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type ClubCoordinatorPk = "id";
export type ClubCoordinatorId = ClubCoordinator[ClubCoordinatorPk];
export type ClubCoordinatorOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type ClubCoordinatorCreationAttributes = Optional<ClubCoordinatorAttributes, ClubCoordinatorOptionalAttributes>;

export class ClubCoordinator extends Model<ClubCoordinatorAttributes, ClubCoordinatorCreationAttributes> implements ClubCoordinatorAttributes {
    id!: number;
    clubId!: number;
    userId!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // ClubCoordinator belongsTo Club via clubId
    club!: Club;
    getClub!: Sequelize.BelongsToGetAssociationMixin<Club>;
    setClub!: Sequelize.BelongsToSetAssociationMixin<Club, ClubId>;
    createClub!: Sequelize.BelongsToCreateAssociationMixin<Club>;
    // ClubCoordinator belongsTo User via userId
    user!: User;
    getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
    setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
    createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

    static initModel(sequelize: Sequelize.Sequelize): typeof ClubCoordinator {
        return sequelize.define('ClubCoordinator', {
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
        }
    }, {
        tableName: 'ClubCoordinator',
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
                name: "ClubCoordinator_clubId_userId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "clubId" },
                    { name: "userId" },
                ]
            },
            {
                name: "ClubCoordinator_userId_fkey",
                using: "BTREE",
                fields: [
                    { name: "userId" },
                ]
            },
        ]
    }) as typeof ClubCoordinator;
    }
}
