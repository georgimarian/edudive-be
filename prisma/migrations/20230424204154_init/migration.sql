-- CreateTable
CREATE TABLE "Step" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "nexStepId" INTEGER,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillOnStep" (
    "skillId" INTEGER NOT NULL,
    "stepId" INTEGER NOT NULL,

    CONSTRAINT "SkillOnStep_pkey" PRIMARY KEY ("stepId","skillId")
);

-- AddForeignKey
ALTER TABLE "SkillOnStep" ADD CONSTRAINT "SkillOnStep_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillOnStep" ADD CONSTRAINT "SkillOnStep_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
