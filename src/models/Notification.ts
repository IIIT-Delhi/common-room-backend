import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Club, ClubId } from './Club';
import type { UserNotification, UserNotificationId } from './UserNotification';

export interface NotificationAttributes {
    id: number;
    clubId: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type NotificationPk = "id";
export type NotificationId = Notification[NotificationPk];
export type NotificationOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type NotificationCreationAttributes = Optional<NotificationAttributes, NotificationOptionalAttributes>;

export class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
    id!: number;
    clubId!: number;
    message!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // Notification belongsTo Club via clubId
    club!: Club;
    getClub!: Sequelize.BelongsToGetAssociationMixin<Club>;
    setClub!: Sequelize.BelongsToSetAssociationMixin<Club, ClubId>;
    createClub!: Sequelize.BelongsToCreateAssociationMixin<Club>;
    // Notification hasMany UserNotification via notificationId
    UserNotifications!: UserNotification[];
    getUserNotifications!: Sequelize.HasManyGetAssociationsMixin<UserNotification>;
    setUserNotifications!: Sequelize.HasManySetAssociationsMixin<UserNotification, UserNotificationId>;
    addUserNotification!: Sequelize.HasManyAddAssociationMixin<UserNotification, UserNotificationId>;
    addUserNotifications!: Sequelize.HasManyAddAssociationsMixin<UserNotification, UserNotificationId>;
    createUserNotification!: Sequelize.HasManyCreateAssociationMixin<UserNotification>;
    removeUserNotification!: Sequelize.HasManyRemoveAssociationMixin<UserNotification, UserNotificationId>;
    removeUserNotifications!: Sequelize.HasManyRemoveAssociationsMixin<UserNotification, UserNotificationId>;
    hasUserNotification!: Sequelize.HasManyHasAssociationMixin<UserNotification, UserNotificationId>;
    hasUserNotifications!: Sequelize.HasManyHasAssociationsMixin<UserNotification, UserNotificationId>;
    countUserNotifications!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof Notification {
        return sequelize.define('Notification', {
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
            unique: "Notification_clubId_fkey"
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'Notification',
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
                name: "Notification_clubId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "clubId" },
                ]
            },
        ]
    }) as typeof Notification;
    }
}
