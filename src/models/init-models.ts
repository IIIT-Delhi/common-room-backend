import type { Sequelize } from "sequelize";
import { Club as _Club } from "./Club";
import type { ClubAttributes, ClubCreationAttributes } from "./Club";
import { ClubCoordinator as _ClubCoordinator } from "./ClubCoordinator";
import type { ClubCoordinatorAttributes, ClubCoordinatorCreationAttributes } from "./ClubCoordinator";
import { ClubEvent as _ClubEvent } from "./ClubEvent";
import type { ClubEventAttributes, ClubEventCreationAttributes } from "./ClubEvent";
import { ClubMember as _ClubMember } from "./ClubMember";
import type { ClubMemberAttributes, ClubMemberCreationAttributes } from "./ClubMember";
import { ClubNotification as _ClubNotification } from "./ClubNotification";
import type { ClubNotificationAttributes, ClubNotificationCreationAttributes } from "./ClubNotification";
import { ClubRank as _ClubRank } from "./ClubRank";
import type { ClubRankAttributes, ClubRankCreationAttributes } from "./ClubRank";
import { ClubTag as _ClubTag } from "./ClubTag";
import type { ClubTagAttributes, ClubTagCreationAttributes } from "./ClubTag";
import { Event as _Event } from "./Event";
import type { EventAttributes, EventCreationAttributes } from "./Event";
import { Notification as _Notification } from "./Notification";
import type { NotificationAttributes, NotificationCreationAttributes } from "./Notification";
import { OTP as _OTP } from "./OTP";
import type { OTPAttributes, OTPCreationAttributes } from "./OTP";
import { Position as _Position } from "./Position";
import type { PositionAttributes, PositionCreationAttributes } from "./Position";
import { RSVPEvent as _RSVPEvent } from "./RSVPEvent";
import type { RSVPEventAttributes, RSVPEventCreationAttributes } from "./RSVPEvent";
import { StudentRank as _StudentRank } from "./StudentRank";
import type { StudentRankAttributes, StudentRankCreationAttributes } from "./StudentRank";
import { Subscription as _Subscription } from "./Subscription";
import type { SubscriptionAttributes, SubscriptionCreationAttributes } from "./Subscription";
import { Tag as _Tag } from "./Tag";
import type { TagAttributes, TagCreationAttributes } from "./Tag";
import { User as _User } from "./User";
import type { UserAttributes, UserCreationAttributes } from "./User";
import { UserNotification as _UserNotification } from "./UserNotification";
import type { UserNotificationAttributes, UserNotificationCreationAttributes } from "./UserNotification";
import { UserTag as _UserTag } from "./UserTag";
import type { UserTagAttributes, UserTagCreationAttributes } from "./UserTag";
import { Vote as _Vote } from "./Vote";
import type { VoteAttributes, VoteCreationAttributes } from "./Vote";

export {
    _Club as Club,
    _ClubCoordinator as ClubCoordinator,
    _ClubEvent as ClubEvent,
    _ClubMember as ClubMember,
    _ClubNotification as ClubNotification,
    _ClubRank as ClubRank,
    _ClubTag as ClubTag,
    _Event as Event,
    _Notification as Notification,
    _OTP as OTP,
    _Position as Position,
    _RSVPEvent as RSVPEvent,
    _StudentRank as StudentRank,
    _Subscription as Subscription,
    _Tag as Tag,
    _User as User,
    _UserNotification as UserNotification,
    _UserTag as UserTag,
    _Vote as Vote,
};

export type {
    ClubAttributes,
    ClubCreationAttributes,
    ClubCoordinatorAttributes,
    ClubCoordinatorCreationAttributes,
    ClubEventAttributes,
    ClubEventCreationAttributes,
    ClubMemberAttributes,
    ClubMemberCreationAttributes,
    ClubNotificationAttributes,
    ClubNotificationCreationAttributes,
    ClubRankAttributes,
    ClubRankCreationAttributes,
    ClubTagAttributes,
    ClubTagCreationAttributes,
    EventAttributes,
    EventCreationAttributes,
    NotificationAttributes,
    NotificationCreationAttributes,
    OTPAttributes,
    OTPCreationAttributes,
    PositionAttributes,
    PositionCreationAttributes,
    RSVPEventAttributes,
    RSVPEventCreationAttributes,
    StudentRankAttributes,
    StudentRankCreationAttributes,
    SubscriptionAttributes,
    SubscriptionCreationAttributes,
    TagAttributes,
    TagCreationAttributes,
    UserAttributes,
    UserCreationAttributes,
    UserNotificationAttributes,
    UserNotificationCreationAttributes,
    UserTagAttributes,
    UserTagCreationAttributes,
    VoteAttributes,
    VoteCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
    const Club = _Club.initModel(sequelize);
    const ClubCoordinator = _ClubCoordinator.initModel(sequelize);
    const ClubEvent = _ClubEvent.initModel(sequelize);
    const ClubMember = _ClubMember.initModel(sequelize);
    const ClubNotification = _ClubNotification.initModel(sequelize);
    const ClubRank = _ClubRank.initModel(sequelize);
    const ClubTag = _ClubTag.initModel(sequelize);
    const Event = _Event.initModel(sequelize);
    const Notification = _Notification.initModel(sequelize);
    const OTP = _OTP.initModel(sequelize);
    const Position = _Position.initModel(sequelize);
    const RSVPEvent = _RSVPEvent.initModel(sequelize);
    const StudentRank = _StudentRank.initModel(sequelize);
    const Subscription = _Subscription.initModel(sequelize);
    const Tag = _Tag.initModel(sequelize);
    const User = _User.initModel(sequelize);
    const UserNotification = _UserNotification.initModel(sequelize);
    const UserTag = _UserTag.initModel(sequelize);
    const Vote = _Vote.initModel(sequelize);

    ClubCoordinator.belongsTo(Club, { as: "club", foreignKey: "clubId"});
    Club.hasMany(ClubCoordinator, { as: "ClubCoordinators", foreignKey: "clubId"});
    ClubEvent.belongsTo(Club, { as: "club", foreignKey: "clubId"});
    Club.hasMany(ClubEvent, { as: "ClubEvents", foreignKey: "clubId"});
    ClubMember.belongsTo(Club, { as: "club", foreignKey: "clubId"});
    Club.hasMany(ClubMember, { as: "ClubMembers", foreignKey: "clubId"});
    ClubNotification.belongsTo(Club, { as: "club", foreignKey: "clubId"});
    Club.hasMany(ClubNotification, { as: "ClubNotifications", foreignKey: "clubId"});
    ClubRank.belongsTo(Club, { as: "club", foreignKey: "clubId"});
    Club.hasOne(ClubRank, { as: "ClubRank", foreignKey: "clubId"});
    ClubTag.belongsTo(Club, { as: "club", foreignKey: "clubId"});
    Club.hasMany(ClubTag, { as: "ClubTags", foreignKey: "clubId"});
    OTP.belongsTo(Club, { as: "club", foreignKey: "clubId"});
    Club.hasOne(OTP, { as: "OTP", foreignKey: "clubId"});
    Subscription.belongsTo(Club, { as: "club", foreignKey: "clubId"});
    Club.hasMany(Subscription, { as: "Subscriptions", foreignKey: "clubId"});
    ClubEvent.belongsTo(Event, { as: "event", foreignKey: "eventId"});
    Event.hasMany(ClubEvent, { as: "ClubEvents", foreignKey: "eventId"});
    Position.belongsTo(Event, { as: "event", foreignKey: "eventId"});
    Event.hasMany(Position, { as: "Positions", foreignKey: "eventId"});
    RSVPEvent.belongsTo(Event, { as: "event", foreignKey: "eventId"});
    Event.hasMany(RSVPEvent, { as: "RSVPEvents", foreignKey: "eventId"});
    Vote.belongsTo(Event, { as: "event", foreignKey: "eventId"});
    Event.hasMany(Vote, { as: "Votes", foreignKey: "eventId"});
    ClubNotification.belongsTo(Notification, { as: "notification", foreignKey: "notificationId"});
    Notification.hasMany(ClubNotification, { as: "ClubNotifications", foreignKey: "notificationId"});
    UserNotification.belongsTo(Notification, { as: "notification", foreignKey: "notificationId"});
    Notification.hasMany(UserNotification, { as: "UserNotifications", foreignKey: "notificationId"});
    ClubTag.belongsTo(Tag, { as: "tag", foreignKey: "tagId"});
    Tag.hasMany(ClubTag, { as: "ClubTags", foreignKey: "tagId"});
    UserTag.belongsTo(Tag, { as: "tag", foreignKey: "tagId"});
    Tag.hasMany(UserTag, { as: "UserTags", foreignKey: "tagId"});
    ClubCoordinator.belongsTo(User, { as: "user", foreignKey: "userId"});
    User.hasMany(ClubCoordinator, { as: "ClubCoordinators", foreignKey: "userId"});
    ClubMember.belongsTo(User, { as: "user", foreignKey: "userId"});
    User.hasMany(ClubMember, { as: "ClubMembers", foreignKey: "userId"});
    Position.belongsTo(User, { as: "user", foreignKey: "userId"});
    User.hasMany(Position, { as: "Positions", foreignKey: "userId"});
    RSVPEvent.belongsTo(User, { as: "user", foreignKey: "userId"});
    User.hasMany(RSVPEvent, { as: "RSVPEvents", foreignKey: "userId"});
    StudentRank.belongsTo(User, { as: "user", foreignKey: "userId"});
    User.hasOne(StudentRank, { as: "StudentRank", foreignKey: "userId"});
    Subscription.belongsTo(User, { as: "user", foreignKey: "userId"});
    User.hasMany(Subscription, { as: "Subscriptions", foreignKey: "userId"});
    UserNotification.belongsTo(User, { as: "user", foreignKey: "userId"});
    User.hasMany(UserNotification, { as: "UserNotifications", foreignKey: "userId"});
    UserTag.belongsTo(User, { as: "user", foreignKey: "userId"});
    User.hasMany(UserTag, { as: "UserTags", foreignKey: "userId"});
    Vote.belongsTo(User, { as: "user", foreignKey: "userId"});
    User.hasMany(Vote, { as: "Votes", foreignKey: "userId"});

    return {
        Club: Club,
        ClubCoordinator: ClubCoordinator,
        ClubEvent: ClubEvent,
        ClubMember: ClubMember,
        ClubNotification: ClubNotification,
        ClubRank: ClubRank,
        ClubTag: ClubTag,
        Event: Event,
        Notification: Notification,
        OTP: OTP,
        Position: Position,
        RSVPEvent: RSVPEvent,
        StudentRank: StudentRank,
        Subscription: Subscription,
        Tag: Tag,
        User: User,
        UserNotification: UserNotification,
        UserTag: UserTag,
        Vote: Vote,
    };
}
