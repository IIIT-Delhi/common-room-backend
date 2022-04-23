import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';

export interface StudentRankAttributes {
    id: number;
    userId: number;
    rank: number;
    eventCount: number;
    moneyEarned: number;
    firstCount: number;
    secondCount: number;
    thirdCount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export type StudentRankPk = "id";
export type StudentRankId = StudentRank[StudentRankPk];
export type StudentRankOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type StudentRankCreationAttributes = Optional<StudentRankAttributes, StudentRankOptionalAttributes>;

export class StudentRank extends Model<StudentRankAttributes, StudentRankCreationAttributes> implements StudentRankAttributes {
    id!: number;
    userId!: number;
    rank!: number;
    eventCount!: number;
    moneyEarned!: number;
    firstCount!: number;
    secondCount!: number;
    thirdCount!: number;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt?: Date;

    // StudentRank belongsTo User via userId
    user!: User;
    getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
    setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
    createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

    static initModel(sequelize: Sequelize.Sequelize): typeof StudentRank {
        return sequelize.define('StudentRank', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
            unique: "StudentRank_userId_fkey"
        },
        rank: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        eventCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        moneyEarned: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        firstCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        secondCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        thirdCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'StudentRank',
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
                name: "StudentRank_userId_key",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "userId" },
                ]
            },
        ]
    }) as typeof StudentRank;
    }
}
