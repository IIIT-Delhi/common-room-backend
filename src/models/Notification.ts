import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ClubNotification, ClubNotificationId } from './ClubNotification';
import type { UserNotification, UserNotificationId } from './UserNotification';

export interface NotificationAttributes {
    id: number;
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
    message!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // Notification hasMany ClubNotification via notificationId
    ClubNotifications!: ClubNotification[];
    getClubNotifications!: Sequelize.HasManyGetAssociationsMixin<ClubNotification>;
    setClubNotifications!: Sequelize.HasManySetAssociationsMixin<ClubNotification, ClubNotificationId>;
    addClubNotification!: Sequelize.HasManyAddAssociationMixin<ClubNotification, ClubNotificationId>;
    addClubNotifications!: Sequelize.HasManyAddAssociationsMixin<ClubNotification, ClubNotificationId>;
    createClubNotification!: Sequelize.HasManyCreateAssociationMixin<ClubNotification>;
    removeClubNotification!: Sequelize.HasManyRemoveAssociationMixin<ClubNotification, ClubNotificationId>;
    removeClubNotifications!: Sequelize.HasManyRemoveAssociationsMixin<ClubNotification, ClubNotificationId>;
    hasClubNotification!: Sequelize.HasManyHasAssociationMixin<ClubNotification, ClubNotificationId>;
    hasClubNotifications!: Sequelize.HasManyHasAssociationsMixin<ClubNotification, ClubNotificationId>;
    countClubNotifications!: Sequelize.HasManyCountAssociationsMixin;
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
        ]
    }) as typeof Notification;
    }
}
