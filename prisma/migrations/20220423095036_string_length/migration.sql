-- AlterTable
ALTER TABLE `Club` MODIFY `description` MEDIUMTEXT NOT NULL,
    MODIFY `links` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `Event` MODIFY `description` MEDIUMTEXT NOT NULL,
    MODIFY `link` MEDIUMTEXT NULL;

-- AlterTable
ALTER TABLE `Notification` MODIFY `message` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `jwtToken` MEDIUMTEXT NULL,
    MODIFY `expoToken` MEDIUMTEXT NULL;
