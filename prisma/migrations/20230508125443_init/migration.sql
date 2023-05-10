-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "ChecklistStep" (
    "id" SERIAL NOT NULL,
    "description" TEXT,

    CONSTRAINT "ChecklistStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillOnChecklistStep" (
    "skillId" INTEGER NOT NULL,
    "checklistStepId" INTEGER NOT NULL,

    CONSTRAINT "SkillOnChecklistStep_pkey" PRIMARY KEY ("checklistStepId","skillId")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "finalGradePercentage" INTEGER NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectOnAssessment" (
    "subjectId" INTEGER NOT NULL,
    "assessmentId" INTEGER NOT NULL,

    CONSTRAINT "SubjectOnAssessment_pkey" PRIMARY KEY ("subjectId","assessmentId")
);

-- CreateTable
CREATE TABLE "CalendarEvent" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalendarEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectOnCalendarEvent" (
    "subjectId" INTEGER NOT NULL,
    "calendarEventId" INTEGER NOT NULL,

    CONSTRAINT "SubjectOnCalendarEvent_pkey" PRIMARY KEY ("subjectId","calendarEventId")
);

-- CreateTable
CREATE TABLE "StudentOnSkill" (
    "studentId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    "currentStepId" INTEGER NOT NULL,
    "percentageToCompletion" INTEGER NOT NULL,

    CONSTRAINT "StudentOnSkill_pkey" PRIMARY KEY ("studentId","skillId")
);

-- CreateTable
CREATE TABLE "TeacherOnSubject" (
    "teacherId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "TeacherOnSubject_pkey" PRIMARY KEY ("teacherId","subjectId")
);

-- AddForeignKey
ALTER TABLE "SkillOnChecklistStep" ADD CONSTRAINT "SkillOnChecklistStep_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillOnChecklistStep" ADD CONSTRAINT "SkillOnChecklistStep_checklistStepId_fkey" FOREIGN KEY ("checklistStepId") REFERENCES "ChecklistStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectOnAssessment" ADD CONSTRAINT "SubjectOnAssessment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectOnAssessment" ADD CONSTRAINT "SubjectOnAssessment_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectOnCalendarEvent" ADD CONSTRAINT "SubjectOnCalendarEvent_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectOnCalendarEvent" ADD CONSTRAINT "SubjectOnCalendarEvent_calendarEventId_fkey" FOREIGN KEY ("calendarEventId") REFERENCES "CalendarEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnSkill" ADD CONSTRAINT "StudentOnSkill_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnSkill" ADD CONSTRAINT "StudentOnSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherOnSubject" ADD CONSTRAINT "TeacherOnSubject_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherOnSubject" ADD CONSTRAINT "TeacherOnSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
