-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://www.gravatar.com/avatar/',
    "link" TEXT,
    "deadline" DATETIME,
    "eventStartDate" DATETIME,
    "eventEndDate" DATETIME,
    "venue" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_Event" ("createdAt", "deadline", "deletedAt", "description", "eventEndDate", "eventStartDate", "id", "link", "name", "updatedAt", "venue") SELECT "createdAt", "deadline", "deletedAt", "description", "eventEndDate", "eventStartDate", "id", "link", "name", "updatedAt", "venue" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE TABLE "new_Club" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "links" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://www.gravatar.com/avatar/',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
INSERT INTO "new_Club" ("createdAt", "deletedAt", "description", "id", "links", "name", "updatedAt") SELECT "createdAt", "deletedAt", "description", "id", "links", "name", "updatedAt" FROM "Club";
DROP TABLE "Club";
ALTER TABLE "new_Club" RENAME TO "Club";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
