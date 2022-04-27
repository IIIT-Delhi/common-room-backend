import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Club, ClubId } from './Club';
import type { Notification, NotificationId } from './Notification';

export interface ClubNotificationAttributes {
    id: number;
    clubId: number;
    notificationId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type ClubNotificationPk = "id";
export type ClubNotificationId = ClubNotification[ClubNotificationPk];
export type ClubNotificationOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type ClubNotificationCreationAttributes = Optional<ClubNotificationAttributes, ClubNotificationOptionalAttributes>;

export class ClubNotification extends Model<ClubNotificationAttributes, ClubNotificationCreationAttributes> implements ClubNotificationAttributes {
    id!: number;
    clubId!: number;
    notificationId!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // ClubNotification belongsTo Club via clubId
    club!: Club;
    getClub!: Sequelize.BelongsToGetAssociationMixin<Club>;
    setClub!: Sequelize.BelongsToSetAssociationMixin<Club, ClubId>;
    createClub!: Sequelize.BelongsToCreateAssociationMixin<Club>;
    // ClubNotification belongsTo Notification via notificationId
    notification!: Notification;
    getNotification!: Sequelize.BelongsToGetAssociationMixin<Notification>;
    setNotification!: Sequelize.BelongsToSetAssociationMixin<Notification, NotificationId>;
    createNotification!: Sequelize.BelongsToCreateAssociationMixin<Notification>;

    static initModel(sequelize: Sequelize.Sequelize): typeof ClubNotification {
        return sequelize.define('ClubNotification', {
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
        notificationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Notification',
                key: 'id'
            }
        }
    }, {
        tableName: 'ClubNotification',
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
                name: "ClubNotification_clubId_notificationId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "clubId" },
                    { name: "notificationId" },
                ]
            },
            {
                name: "ClubNotification_notificationId_fkey",
                using: "BTREE",
                fields: [
                    { name: "notificationId" },
                ]
            },
        ]
    }) as typeof ClubNotification;
    }
}
