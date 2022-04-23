import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Club, ClubId } from './Club';
import type { User, UserId } from './User';

export interface SubscriptionAttributes {
    id: number;
    clubId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type SubscriptionPk = "id";
export type SubscriptionId = Subscription[SubscriptionPk];
export type SubscriptionOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type SubscriptionCreationAttributes = Optional<SubscriptionAttributes, SubscriptionOptionalAttributes>;

export class Subscription extends Model<SubscriptionAttributes, SubscriptionCreationAttributes> implements SubscriptionAttributes {
    id!: number;
    clubId!: number;
    userId!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // Subscription belongsTo Club via clubId
    club!: Club;
    getClub!: Sequelize.BelongsToGetAssociationMixin<Club>;
    setClub!: Sequelize.BelongsToSetAssociationMixin<Club, ClubId>;
    createClub!: Sequelize.BelongsToCreateAssociationMixin<Club>;
    // Subscription belongsTo User via userId
    user!: User;
    getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
    setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
    createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

    static initModel(sequelize: Sequelize.Sequelize): typeof Subscription {
        return sequelize.define('Subscription', {
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
        tableName: 'Subscription',
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
                name: "Subscription_clubId_userId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "clubId" },
                    { name: "userId" },
                ]
            },
            {
                name: "Subscription_userId_fkey",
                using: "BTREE",
                fields: [
                    { name: "userId" },
                ]
            },
        ]
    }) as typeof Subscription;
    }
}
