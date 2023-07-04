import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { env } from 'process';
import { PrismaService } from 'src/prisma.service';
import { PredefinedSkill } from '@prisma/client';
import { map, firstValueFrom } from 'rxjs'

@Injectable()
export class NlpService {
  constructor(private readonly httpService: HttpService, private prisma: PrismaService) { }


  create() {
    return 'This action adds a new nlp';
  }

  findAll() {
    return this.httpService.get(env.ML_SERVICE_URL);
  }

  async uploadFile(file, studentId) {
    const student = await this.prisma.user.findFirst({ where: { firebaseId: studentId } })

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const FormData = require("form-data");
    const formData = new FormData();
    // attach buffer to formdata
    formData.append('file', file.buffer, { filename: file.originalname });
    const predefinedSkills = await this.prisma.predefinedSkill.findMany();
    const response = await firstValueFrom(
      this.httpService.post(
        env.ML_SERVICE_URL,
        formData,
        { params: { skills: predefinedSkills.map(skill => skill.name).join(','), isPdp: true } }
      )
    );
    console.log(response)
    const goodSkills = new Set(response.data.filter(elem => elem.score >= 0.25).map(el => el.skill))
    const addedSkills = goodSkills.forEach(async (goodSkill) => {
      const newSkill = await this.prisma.skill.findFirst({ where: { predefinedSkill: { name: goodSkill } } })
      console.log(student.id, newSkill.id)
      const s = await this.prisma.studentOnSkill.upsert({
        where: { studentId_skillId: { studentId: student.id, skillId: newSkill.id } },
        update: {
          currentStepId: 1,
          percentageToCompletion: 1,
        },
        create: {
          student: {
            connect: { id: student.id }
          },
          skill: {
            connect: { id: newSkill.id },
          },
          currentStepId: 0,
          percentageToCompletion: 0,
        }
      });
      return s;
    })
    return addedSkills
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
    const soft = await this.prisma.skill.findFirst({ where: { predefinedSkill: { name: softSkills } } });
    const hard = await this.prisma.skill.findFirst({ where: { predefinedSkill: { name: hardSkills } } });
    const s = await this.prisma.studentOnSkill.create({
      data: {
        student: {
          connect: { id: student.id }
        },
        skill: {
          connect: { id: soft.id },
        },
        currentStepId: 0,
        percentageToCompletion: 0,
      }
    });
    const h = await this.prisma.studentOnSkill.create({
      data: {
        student: {
          connect: { id: student.id }
        },
        skill: {
          connect: { id: hard.id },
        },
        currentStepId: 0,
        percentageToCompletion: 0,
      }
    });
    return [s, h]
  }

}
