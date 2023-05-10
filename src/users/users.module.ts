import { Module } from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';

@Module({
	controllers: [UsersController],
	providers: [UsersService, PrismaService],
})

export class UsersModule { }
