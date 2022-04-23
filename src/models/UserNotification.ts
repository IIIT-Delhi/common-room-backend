import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Notification, NotificationId } from './Notification';
import type { User, UserId } from './User';

export interface UserNotificationAttributes {
    id: number;
    notificationId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type UserNotificationPk = "id";
export type UserNotificationId = UserNotification[UserNotificationPk];
export type UserNotificationOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type UserNotificationCreationAttributes = Optional<UserNotificationAttributes, UserNotificationOptionalAttributes>;

export class UserNotification extends Model<UserNotificationAttributes, UserNotificationCreationAttributes> implements UserNotificationAttributes {
    id!: number;
    notificationId!: number;
    userId!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // UserNotification belongsTo Notification via notificationId
    notification!: Notification;
    getNotification!: Sequelize.BelongsToGetAssociationMixin<Notification>;
    setNotification!: Sequelize.BelongsToSetAssociationMixin<Notification, NotificationId>;
    createNotification!: Sequelize.BelongsToCreateAssociationMixin<Notification>;
    // UserNotification belongsTo User via userId
    user!: User;
    getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
    setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
    createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

    static initModel(sequelize: Sequelize.Sequelize): typeof UserNotification {
        return sequelize.define('UserNotification', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        notificationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Notification',
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
        tableName: 'UserNotification',
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
                name: "UserNotification_notificationId_userId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "notificationId" },
                    { name: "userId" },
                ]
            },
            {
                name: "UserNotification_userId_fkey",
                using: "BTREE",
                fields: [
                    { name: "userId" },
                ]
            },
        ]
    }) as typeof UserNotification;
    }
}
