/*
  Warnings:

  - You are about to drop the column `isAuthor` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "isAuthor",
ADD COLUMN     "author" TEXT NOT NULL DEFAULT 'Anonymous';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "author",
ADD COLUMN     "isAuthor" BOOLEAN NOT NULL DEFAULT false;
