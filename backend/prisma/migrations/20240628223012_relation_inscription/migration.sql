/*
  Warnings:

  - A unique constraint covering the columns `[courseId]` on the table `Inscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `Inscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inscription_courseId_key" ON "Inscription"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Inscription_studentId_key" ON "Inscription"("studentId");
