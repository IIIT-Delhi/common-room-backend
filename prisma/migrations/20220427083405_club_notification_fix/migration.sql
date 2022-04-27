/*
  Warnings:

  - You are about to drop the column `clubId` on the `Notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_clubId_fkey`;

-- AlterTable
ALTER TABLE `Notification` DROP COLUMN `clubId`;

-- CreateTable
CREATE TABLE `ClubNotification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clubId` INTEGER NOT NULL,
    `notificationId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `ClubNotification_clubId_notificationId_key`(`clubId`, `notificationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClubNotification` ADD CONSTRAINT `ClubNotification_clubId_fkey` FOREIGN KEY (`clubId`) REFERENCES `Club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClubNotification` ADD CONSTRAINT `ClubNotification_notificationId_fkey` FOREIGN KEY (`notificationId`) REFERENCES `Notification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
