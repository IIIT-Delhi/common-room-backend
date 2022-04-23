import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Club, ClubId } from './Club';
import type { Event, EventId } from './Event';

export interface ClubEventAttributes {
    id: number;
    clubId: number;
    eventId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type ClubEventPk = "id";
export type ClubEventId = ClubEvent[ClubEventPk];
export type ClubEventOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type ClubEventCreationAttributes = Optional<ClubEventAttributes, ClubEventOptionalAttributes>;

export class ClubEvent extends Model<ClubEventAttributes, ClubEventCreationAttributes> implements ClubEventAttributes {
    id!: number;
    clubId!: number;
    eventId!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // ClubEvent belongsTo Club via clubId
    club!: Club;
    getClub!: Sequelize.BelongsToGetAssociationMixin<Club>;
    setClub!: Sequelize.BelongsToSetAssociationMixin<Club, ClubId>;
    createClub!: Sequelize.BelongsToCreateAssociationMixin<Club>;
    // ClubEvent belongsTo Event via eventId
    event!: Event;
    getEvent!: Sequelize.BelongsToGetAssociationMixin<Event>;
    setEvent!: Sequelize.BelongsToSetAssociationMixin<Event, EventId>;
    createEvent!: Sequelize.BelongsToCreateAssociationMixin<Event>;

    static initModel(sequelize: Sequelize.Sequelize): typeof ClubEvent {
        return sequelize.define('ClubEvent', {
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
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Event',
                key: 'id'
            }
        }
    }, {
        tableName: 'ClubEvent',
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
                name: "ClubEvent_clubId_eventId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "clubId" },
                    { name: "eventId" },
                ]
            },
            {
                name: "ClubEvent_eventId_fkey",
                using: "BTREE",
                fields: [
                    { name: "eventId" },
                ]
            },
        ]
    }) as typeof ClubEvent;
    }
}
