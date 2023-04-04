/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

-- CreateTable
CREATE TABLE "MasterProgramme" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "MasterProgramme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "descriptiveLink" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjecstOnMasterProgrammes" (
    "masterProgrammeId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "SubjecstOnMasterProgrammes_pkey" PRIMARY KEY ("masterProgrammeId","subjectId")
);

-- AddForeignKey
ALTER TABLE "SubjecstOnMasterProgrammes" ADD CONSTRAINT "SubjecstOnMasterProgrammes_masterProgrammeId_fkey" FOREIGN KEY ("masterProgrammeId") REFERENCES "MasterProgramme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjecstOnMasterProgrammes" ADD CONSTRAINT "SubjecstOnMasterProgrammes_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
