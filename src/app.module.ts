import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MasterProgrammeModule } from './masterProgrammes/masterProgrammes.module';
import { SubjectsModule } from './subjects/subjects.module';
import { SkillsModule } from './skills/skills.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { CalendarEventsModule } from './calendar-events/calendar-events.module';
import { StepsModule } from './steps/steps.module';
import { NlpModule } from './nlp/nlp.module';

@Module({
  imports: [UsersModule, MasterProgrammeModule, SubjectsModule, SkillsModule, AssessmentsModule, CalendarEventsModule, StepsModule, NlpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
