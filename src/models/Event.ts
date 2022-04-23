import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ClubEvent, ClubEventId } from './ClubEvent';
import type { Position, PositionId } from './Position';
import type { RSVPEvent, RSVPEventId } from './RSVPEvent';
import type { Vote, VoteId } from './Vote';

export interface EventAttributes {
    id: number;
    name: string;
    description: string;
    image: string;
    link?: string;
    deadline?: Date;
    eventStartDate?: Date;
    eventEndDate?: Date;
    venue?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type EventPk = "id";
export type EventId = Event[EventPk];
export type EventOptionalAttributes = "id" | "image" | "link" | "deadline" | "eventStartDate" | "eventEndDate" | "venue" | "createdAt" | "updatedAt" | "deletedAt";
export type EventCreationAttributes = Optional<EventAttributes, EventOptionalAttributes>;

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
    id!: number;
    name!: string;
    description!: string;
    image!: string;
    link?: string;
    deadline?: Date;
    eventStartDate?: Date;
    eventEndDate?: Date;
    venue?: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // Event hasMany ClubEvent via eventId
    ClubEvents!: ClubEvent[];
    getClubEvents!: Sequelize.HasManyGetAssociationsMixin<ClubEvent>;
    setClubEvents!: Sequelize.HasManySetAssociationsMixin<ClubEvent, ClubEventId>;
    addClubEvent!: Sequelize.HasManyAddAssociationMixin<ClubEvent, ClubEventId>;
    addClubEvents!: Sequelize.HasManyAddAssociationsMixin<ClubEvent, ClubEventId>;
    createClubEvent!: Sequelize.HasManyCreateAssociationMixin<ClubEvent>;
    removeClubEvent!: Sequelize.HasManyRemoveAssociationMixin<ClubEvent, ClubEventId>;
    removeClubEvents!: Sequelize.HasManyRemoveAssociationsMixin<ClubEvent, ClubEventId>;
    hasClubEvent!: Sequelize.HasManyHasAssociationMixin<ClubEvent, ClubEventId>;
    hasClubEvents!: Sequelize.HasManyHasAssociationsMixin<ClubEvent, ClubEventId>;
    countClubEvents!: Sequelize.HasManyCountAssociationsMixin;
    // Event hasMany Position via eventId
    Positions!: Position[];
    getPositions!: Sequelize.HasManyGetAssociationsMixin<Position>;
    setPositions!: Sequelize.HasManySetAssociationsMixin<Position, PositionId>;
    addPosition!: Sequelize.HasManyAddAssociationMixin<Position, PositionId>;
    addPositions!: Sequelize.HasManyAddAssociationsMixin<Position, PositionId>;
    createPosition!: Sequelize.HasManyCreateAssociationMixin<Position>;
    removePosition!: Sequelize.HasManyRemoveAssociationMixin<Position, PositionId>;
    removePositions!: Sequelize.HasManyRemoveAssociationsMixin<Position, PositionId>;
    hasPosition!: Sequelize.HasManyHasAssociationMixin<Position, PositionId>;
    hasPositions!: Sequelize.HasManyHasAssociationsMixin<Position, PositionId>;
    countPositions!: Sequelize.HasManyCountAssociationsMixin;
    // Event hasMany RSVPEvent via eventId
    RSVPEvents!: RSVPEvent[];
    getRSVPEvents!: Sequelize.HasManyGetAssociationsMixin<RSVPEvent>;
    setRSVPEvents!: Sequelize.HasManySetAssociationsMixin<RSVPEvent, RSVPEventId>;
    addRSVPEvent!: Sequelize.HasManyAddAssociationMixin<RSVPEvent, RSVPEventId>;
    addRSVPEvents!: Sequelize.HasManyAddAssociationsMixin<RSVPEvent, RSVPEventId>;
    createRSVPEvent!: Sequelize.HasManyCreateAssociationMixin<RSVPEvent>;
    removeRSVPEvent!: Sequelize.HasManyRemoveAssociationMixin<RSVPEvent, RSVPEventId>;
    removeRSVPEvents!: Sequelize.HasManyRemoveAssociationsMixin<RSVPEvent, RSVPEventId>;
    hasRSVPEvent!: Sequelize.HasManyHasAssociationMixin<RSVPEvent, RSVPEventId>;
    hasRSVPEvents!: Sequelize.HasManyHasAssociationsMixin<RSVPEvent, RSVPEventId>;
    countRSVPEvents!: Sequelize.HasManyCountAssociationsMixin;
    // Event hasMany Vote via eventId
    Votes!: Vote[];
    getVotes!: Sequelize.HasManyGetAssociationsMixin<Vote>;
    setVotes!: Sequelize.HasManySetAssociationsMixin<Vote, VoteId>;
    addVote!: Sequelize.HasManyAddAssociationMixin<Vote, VoteId>;
    addVotes!: Sequelize.HasManyAddAssociationsMixin<Vote, VoteId>;
    createVote!: Sequelize.HasManyCreateAssociationMixin<Vote>;
    removeVote!: Sequelize.HasManyRemoveAssociationMixin<Vote, VoteId>;
    removeVotes!: Sequelize.HasManyRemoveAssociationsMixin<Vote, VoteId>;
    hasVote!: Sequelize.HasManyHasAssociationMixin<Vote, VoteId>;
    hasVotes!: Sequelize.HasManyHasAssociationsMixin<Vote, VoteId>;
    countVotes!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof Event {
        return sequelize.define('Event', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(191),
            allowNull: false,
            defaultValue: "https:\/\/www.gravatar.com\/avatar\/"
        },
        link: {
            type: DataTypes.STRING(191),
            allowNull: true
        },
        deadline: {
            type: DataTypes.DATE(3),
            allowNull: true
        },
        eventStartDate: {
            type: DataTypes.DATE(3),
            allowNull: true
        },
        eventEndDate: {
            type: DataTypes.DATE(3),
            allowNull: true
        },
        venue: {
            type: DataTypes.STRING(191),
            allowNull: true
        }
    }, {
        tableName: 'Event',
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
    }) as typeof Event;
    }
}
