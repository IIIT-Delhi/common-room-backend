import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Club, ClubId } from './Club';

export interface OTPAttributes {
    id: number;
    clubId: number;
    otp: string;
    expiredAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type OTPPk = "id";
export type OTPId = OTP[OTPPk];
export type OTPOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type OTPCreationAttributes = Optional<OTPAttributes, OTPOptionalAttributes>;

export class OTP extends Model<OTPAttributes, OTPCreationAttributes> implements OTPAttributes {
    id!: number;
    clubId!: number;
    otp!: string;
    expiredAt!: Date;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // OTP belongsTo Club via clubId
    club!: Club;
    getClub!: Sequelize.BelongsToGetAssociationMixin<Club>;
    setClub!: Sequelize.BelongsToSetAssociationMixin<Club, ClubId>;
    createClub!: Sequelize.BelongsToCreateAssociationMixin<Club>;

    static initModel(sequelize: Sequelize.Sequelize): typeof OTP {
        return sequelize.define('OTP', {
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
            unique: "OTP_clubId_fkey"
        },
        otp: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        expiredAt: {
            type: DataTypes.DATE(3),
            allowNull: false
        }
    }, {
        tableName: 'OTP',
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
                name: "OTP_clubId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "clubId" },
                ]
            },
        ]
    }) as typeof OTP;
    }
}
