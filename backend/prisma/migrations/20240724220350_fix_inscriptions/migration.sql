/*
  Warnings:

  - A unique constraint covering the columns `[courseId,studentId]` on the table `Inscription` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Inscription_courseId_key";

-- DropIndex
DROP INDEX "Inscription_studentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Inscription_courseId_studentId_key" ON "Inscription"("courseId", "studentId");
