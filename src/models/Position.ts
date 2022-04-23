import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Event, EventId } from './Event';
import type { User, UserId } from './User';

export interface PositionAttributes {
    id: number;
    eventId: number;
    position: string;
    userId: number;
    money?: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type PositionPk = "id";
export type PositionId = Position[PositionPk];
export type PositionOptionalAttributes = "id" | "money" | "createdAt" | "updatedAt" | "deletedAt";
export type PositionCreationAttributes = Optional<PositionAttributes, PositionOptionalAttributes>;

export class Position extends Model<PositionAttributes, PositionCreationAttributes> implements PositionAttributes {
    id!: number;
    eventId!: number;
    position!: string;
    userId!: number;
    money?: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // Position belongsTo Event via eventId
    event!: Event;
    getEvent!: Sequelize.BelongsToGetAssociationMixin<Event>;
    setEvent!: Sequelize.BelongsToSetAssociationMixin<Event, EventId>;
    createEvent!: Sequelize.BelongsToCreateAssociationMixin<Event>;
    // Position belongsTo User via userId
    user!: User;
    getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
    setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
    createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

    static initModel(sequelize: Sequelize.Sequelize): typeof Position {
        return sequelize.define('Position', {
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
        position: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        money: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'Position',
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
                name: "Position_eventId_fkey",
                using: "BTREE",
                fields: [
                    { name: "eventId" },
                ]
            },
            {
                name: "Position_userId_fkey",
                using: "BTREE",
                fields: [
                    { name: "userId" },
                ]
            },
        ]
    }) as typeof Position;
    }
}
