import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Event, EventId } from './Event';
import type { User, UserId } from './User';

export interface VoteAttributes {
    id: number;
    vote: number;
    eventId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type VotePk = "id";
export type VoteId = Vote[VotePk];
export type VoteOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type VoteCreationAttributes = Optional<VoteAttributes, VoteOptionalAttributes>;

export class Vote extends Model<VoteAttributes, VoteCreationAttributes> implements VoteAttributes {
    id!: number;
    vote!: number;
    eventId!: number;
    userId!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // Vote belongsTo Event via eventId
    event!: Event;
    getEvent!: Sequelize.BelongsToGetAssociationMixin<Event>;
    setEvent!: Sequelize.BelongsToSetAssociationMixin<Event, EventId>;
    createEvent!: Sequelize.BelongsToCreateAssociationMixin<Event>;
    // Vote belongsTo User via userId
    user!: User;
    getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
    setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
    createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

    static initModel(sequelize: Sequelize.Sequelize): typeof Vote {
        return sequelize.define('Vote', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        vote: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Event',
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
        tableName: 'Vote',
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
                name: "Vote_eventId_userId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "eventId" },
                    { name: "userId" },
                ]
            },
            {
                name: "Vote_userId_fkey",
                using: "BTREE",
                fields: [
                    { name: "userId" },
                ]
            },
        ]
    }) as typeof Vote;
    }
}
