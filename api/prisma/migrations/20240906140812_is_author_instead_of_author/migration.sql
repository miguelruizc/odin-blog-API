/*
  Warnings:

  - You are about to drop the column `author` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "author",
ADD COLUMN     "isAuthor" TEXT NOT NULL DEFAULT 'Anonymous';
