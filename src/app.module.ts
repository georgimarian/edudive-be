import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MasterProgrammeModule } from './masterProgrammes/masterProgrammes.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [UsersModule, MasterProgrammeModule, SubjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
