import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { env } from 'process';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NlpService {
  constructor(private readonly httpService: HttpService, private prisma: PrismaService) { }


  create() {
    return 'This action adds a new nlp';
  }

  findAll() {
    return this.httpService.get(env.ML_SERVICE_URL);
  }

  findOne(id: number) {
    return `This action returns a #${id} nlp`;
  }

  update(id: number) {
    return `This action updates a #${id} nlp`;
  }

  remove(id: number) {
    return `This action removes a #${id} nlp`;
  }

  async saveUserPreferences(studentId: string, softSkills: string, hardSkills: string) {
    const student = await this.prisma.user.findFirst({ where: { firebaseId: studentId } })
    const skill = await this.prisma.skill.findFirst({ where: { name: softSkills } });
    this.prisma.studentOnSkill.create({
      data: {
        student: {
          connect: { id: student.id }
        },
        skill: {
          connect: { id: skill.id }
        },
        currentStepId: 0,
        percentageToCompletion: 0,
      }
    });
  }

  fileUpload() {
    return null;
  }
}
