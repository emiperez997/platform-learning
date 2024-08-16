/*
  Warnings:

  - You are about to drop the column `categories` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `classNumber` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `currentClass` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "categories",
DROP COLUMN "classNumber",
DROP COLUMN "currentClass";
