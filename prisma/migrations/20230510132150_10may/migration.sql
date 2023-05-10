/*
  Warnings:

  - Made the column `name` on table `MasterProgramme` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MasterProgramme" ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "StudentOnMasterProgramme" (
    "studentId" INTEGER NOT NULL,
    "masterProgrammeId" INTEGER NOT NULL,
    "yearOfStudy" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "StudentOnMasterProgramme_pkey" PRIMARY KEY ("studentId","masterProgrammeId")
);

-- AddForeignKey
ALTER TABLE "StudentOnMasterProgramme" ADD CONSTRAINT "StudentOnMasterProgramme_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnMasterProgramme" ADD CONSTRAINT "StudentOnMasterProgramme_masterProgrammeId_fkey" FOREIGN KEY ("masterProgrammeId") REFERENCES "MasterProgramme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
