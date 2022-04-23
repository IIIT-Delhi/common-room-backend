import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ClubCoordinator, ClubCoordinatorId } from './ClubCoordinator';
import type { ClubEvent, ClubEventId } from './ClubEvent';
import type { ClubMember, ClubMemberId } from './ClubMember';
import type { ClubRank, ClubRankCreationAttributes, ClubRankId } from './ClubRank';
import type { ClubTag, ClubTagId } from './ClubTag';
import type { Notification, NotificationCreationAttributes, NotificationId } from './Notification';
import type { OTP, OTPCreationAttributes, OTPId } from './OTP';
import type { Subscription, SubscriptionId } from './Subscription';

export interface ClubAttributes {
    id: number;
    name: string;
    description: string;
    links: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type ClubPk = "id";
export type ClubId = Club[ClubPk];
export type ClubOptionalAttributes = "id" | "image" | "createdAt" | "updatedAt" | "deletedAt";
export type ClubCreationAttributes = Optional<ClubAttributes, ClubOptionalAttributes>;

export class Club extends Model<ClubAttributes, ClubCreationAttributes> implements ClubAttributes {
    id!: number;
    name!: string;
    description!: string;
    links!: string;
    image!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // Club hasMany ClubCoordinator via clubId
    ClubCoordinators!: ClubCoordinator[];
    getClubCoordinators!: Sequelize.HasManyGetAssociationsMixin<ClubCoordinator>;
    setClubCoordinators!: Sequelize.HasManySetAssociationsMixin<ClubCoordinator, ClubCoordinatorId>;
    addClubCoordinator!: Sequelize.HasManyAddAssociationMixin<ClubCoordinator, ClubCoordinatorId>;
    addClubCoordinators!: Sequelize.HasManyAddAssociationsMixin<ClubCoordinator, ClubCoordinatorId>;
    createClubCoordinator!: Sequelize.HasManyCreateAssociationMixin<ClubCoordinator>;
    removeClubCoordinator!: Sequelize.HasManyRemoveAssociationMixin<ClubCoordinator, ClubCoordinatorId>;
    removeClubCoordinators!: Sequelize.HasManyRemoveAssociationsMixin<ClubCoordinator, ClubCoordinatorId>;
    hasClubCoordinator!: Sequelize.HasManyHasAssociationMixin<ClubCoordinator, ClubCoordinatorId>;
    hasClubCoordinators!: Sequelize.HasManyHasAssociationsMixin<ClubCoordinator, ClubCoordinatorId>;
    countClubCoordinators!: Sequelize.HasManyCountAssociationsMixin;
    // Club hasMany ClubEvent via clubId
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
    // Club hasMany ClubMember via clubId
    ClubMembers!: ClubMember[];
    getClubMembers!: Sequelize.HasManyGetAssociationsMixin<ClubMember>;
    setClubMembers!: Sequelize.HasManySetAssociationsMixin<ClubMember, ClubMemberId>;
    addClubMember!: Sequelize.HasManyAddAssociationMixin<ClubMember, ClubMemberId>;
    addClubMembers!: Sequelize.HasManyAddAssociationsMixin<ClubMember, ClubMemberId>;
    createClubMember!: Sequelize.HasManyCreateAssociationMixin<ClubMember>;
    removeClubMember!: Sequelize.HasManyRemoveAssociationMixin<ClubMember, ClubMemberId>;
    removeClubMembers!: Sequelize.HasManyRemoveAssociationsMixin<ClubMember, ClubMemberId>;
    hasClubMember!: Sequelize.HasManyHasAssociationMixin<ClubMember, ClubMemberId>;
    hasClubMembers!: Sequelize.HasManyHasAssociationsMixin<ClubMember, ClubMemberId>;
    countClubMembers!: Sequelize.HasManyCountAssociationsMixin;
    // Club hasOne ClubRank via clubId
    ClubRank!: ClubRank;
    getClubRank!: Sequelize.HasOneGetAssociationMixin<ClubRank>;
    setClubRank!: Sequelize.HasOneSetAssociationMixin<ClubRank, ClubRankId>;
    createClubRank!: Sequelize.HasOneCreateAssociationMixin<ClubRank>;
    // Club hasMany ClubTag via clubId
    ClubTags!: ClubTag[];
    getClubTags!: Sequelize.HasManyGetAssociationsMixin<ClubTag>;
    setClubTags!: Sequelize.HasManySetAssociationsMixin<ClubTag, ClubTagId>;
    addClubTag!: Sequelize.HasManyAddAssociationMixin<ClubTag, ClubTagId>;
    addClubTags!: Sequelize.HasManyAddAssociationsMixin<ClubTag, ClubTagId>;
    createClubTag!: Sequelize.HasManyCreateAssociationMixin<ClubTag>;
    removeClubTag!: Sequelize.HasManyRemoveAssociationMixin<ClubTag, ClubTagId>;
    removeClubTags!: Sequelize.HasManyRemoveAssociationsMixin<ClubTag, ClubTagId>;
    hasClubTag!: Sequelize.HasManyHasAssociationMixin<ClubTag, ClubTagId>;
    hasClubTags!: Sequelize.HasManyHasAssociationsMixin<ClubTag, ClubTagId>;
    countClubTags!: Sequelize.HasManyCountAssociationsMixin;
    // Club hasOne Notification via clubId
    Notification!: Notification;
    getNotification!: Sequelize.HasOneGetAssociationMixin<Notification>;
    setNotification!: Sequelize.HasOneSetAssociationMixin<Notification, NotificationId>;
    createNotification!: Sequelize.HasOneCreateAssociationMixin<Notification>;
    // Club hasOne OTP via clubId
    OTP!: OTP;
    getOTP!: Sequelize.HasOneGetAssociationMixin<OTP>;
    setOTP!: Sequelize.HasOneSetAssociationMixin<OTP, OTPId>;
    createOTP!: Sequelize.HasOneCreateAssociationMixin<OTP>;
    // Club hasMany Subscription via clubId
    Subscriptions!: Subscription[];
    getSubscriptions!: Sequelize.HasManyGetAssociationsMixin<Subscription>;
    setSubscriptions!: Sequelize.HasManySetAssociationsMixin<Subscription, SubscriptionId>;
    addSubscription!: Sequelize.HasManyAddAssociationMixin<Subscription, SubscriptionId>;
    addSubscriptions!: Sequelize.HasManyAddAssociationsMixin<Subscription, SubscriptionId>;
    createSubscription!: Sequelize.HasManyCreateAssociationMixin<Subscription>;
    removeSubscription!: Sequelize.HasManyRemoveAssociationMixin<Subscription, SubscriptionId>;
    removeSubscriptions!: Sequelize.HasManyRemoveAssociationsMixin<Subscription, SubscriptionId>;
    hasSubscription!: Sequelize.HasManyHasAssociationMixin<Subscription, SubscriptionId>;
    hasSubscriptions!: Sequelize.HasManyHasAssociationsMixin<Subscription, SubscriptionId>;
    countSubscriptions!: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: Sequelize.Sequelize): typeof Club {
        return sequelize.define('Club', {
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
            type: DataTypes.TEXT,
            allowNull: false
        },
        links: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(191),
            allowNull: false,
            defaultValue: "https:\/\/www.gravatar.com\/avatar\/"
        }
    }, {
        tableName: 'Club',
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
    }) as typeof Club;
    }
}
