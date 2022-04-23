import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Event, EventId } from './Event';
import type { User, UserId } from './User';

export interface RSVPEventAttributes {
    id: number;
    eventId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type RSVPEventPk = "id";
export type RSVPEventId = RSVPEvent[RSVPEventPk];
export type RSVPEventOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type RSVPEventCreationAttributes = Optional<RSVPEventAttributes, RSVPEventOptionalAttributes>;

export class RSVPEvent extends Model<RSVPEventAttributes, RSVPEventCreationAttributes> implements RSVPEventAttributes {
    id!: number;
    eventId!: number;
    userId!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // RSVPEvent belongsTo Event via eventId
    event!: Event;
    getEvent!: Sequelize.BelongsToGetAssociationMixin<Event>;
    setEvent!: Sequelize.BelongsToSetAssociationMixin<Event, EventId>;
    createEvent!: Sequelize.BelongsToCreateAssociationMixin<Event>;
    // RSVPEvent belongsTo User via userId
    user!: User;
    getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
    setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
    createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

    static initModel(sequelize: Sequelize.Sequelize): typeof RSVPEvent {
        return sequelize.define('RSVPEvent', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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
        tableName: 'RSVPEvent',
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
                name: "RSVPEvent_eventId_userId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "eventId" },
                    { name: "userId" },
                ]
            },
            {
                name: "RSVPEvent_userId_fkey",
                using: "BTREE",
                fields: [
                    { name: "userId" },
                ]
            },
        ]
    }) as typeof RSVPEvent;
    }
}
