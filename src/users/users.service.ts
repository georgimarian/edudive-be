import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Prisma } from '@prisma/client';


@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(userUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({ where: userUniqueInput });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        email: email
      }
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data
    })
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { data, where } = params;
    return this.prisma.user.update({
      data, where
    })
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where })
  }
}
