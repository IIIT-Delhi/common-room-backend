import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ClubCoordinator, ClubCoordinatorId } from './ClubCoordinator';
import type { ClubMember, ClubMemberId } from './ClubMember';
import type { Position, PositionId } from './Position';
import type { RSVPEvent, RSVPEventId } from './RSVPEvent';
import type { StudentRank, StudentRankCreationAttributes, StudentRankId } from './StudentRank';
import type { Subscription, SubscriptionId } from './Subscription';
import type { UserNotification, UserNotificationId } from './UserNotification';
import type { UserTag, UserTagId } from './UserTag';
import type { Vote, VoteId } from './Vote';

export interface UserAttributes {
    id: number;
    email: string;
    name: string;
    picture: string;
    jwtToken?: string;
    expoToken?: string;
    isOnBoarded: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type UserPk = "id";
export type UserId = User[UserPk];
export type UserOptionalAttributes = "id" | "picture" | "jwtToken" | "expoToken" | "createdAt" | "updatedAt" | "deletedAt";
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: number;
    email!: string;
    name!: string;
    picture!: string;
    jwtToken?: string;
    expoToken?: string;
    isOnBoarded!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // User hasMany ClubCoordinator via userId
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
    // User hasMany ClubMember via userId
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
    // User hasMany Position via userId
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
    // User hasMany RSVPEvent via userId
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
    // User hasOne StudentRank via userId
    StudentRank!: StudentRank;
    getStudentRank!: Sequelize.HasOneGetAssociationMixin<StudentRank>;
    setStudentRank!: Sequelize.HasOneSetAssociationMixin<StudentRank, StudentRankId>;
    createStudentRank!: Sequelize.HasOneCreateAssociationMixin<StudentRank>;
    // User hasMany Subscription via userId
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
    // User hasMany UserNotification via userId
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
    // User hasMany UserTag via userId
    UserTags!: UserTag[];
    getUserTags!: Sequelize.HasManyGetAssociationsMixin<UserTag>;
    setUserTags!: Sequelize.HasManySetAssociationsMixin<UserTag, UserTagId>;
    addUserTag!: Sequelize.HasManyAddAssociationMixin<UserTag, UserTagId>;
    addUserTags!: Sequelize.HasManyAddAssociationsMixin<UserTag, UserTagId>;
    createUserTag!: Sequelize.HasManyCreateAssociationMixin<UserTag>;
    removeUserTag!: Sequelize.HasManyRemoveAssociationMixin<UserTag, UserTagId>;
    removeUserTags!: Sequelize.HasManyRemoveAssociationsMixin<UserTag, UserTagId>;
    hasUserTag!: Sequelize.HasManyHasAssociationMixin<UserTag, UserTagId>;
    hasUserTags!: Sequelize.HasManyHasAssociationsMixin<UserTag, UserTagId>;
    countUserTags!: Sequelize.HasManyCountAssociationsMixin;
    // User hasMany Vote via userId
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

    static initModel(sequelize: Sequelize.Sequelize): typeof User {
        return sequelize.define('User', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(191),
            allowNull: false,
            unique: "User_email_key"
        },
        name: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING(191),
            allowNull: false,
            defaultValue: "https:\/\/www.gravatar.com\/avatar\/00000000000000000000000000000000?d=mp&f=y"
        },
        jwtToken: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        expoToken: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        isOnBoarded: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: 'User',
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
                name: "User_email_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "email" },
                ]
            },
        ]
    }) as typeof User;
    }
}
