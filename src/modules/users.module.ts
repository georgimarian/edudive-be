import { Module } from '@nestjs/common';
import { UsersController } from 'src/controllers/users.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/services/users.service';

@Module({
	controllers: [UsersController],
	providers: [UsersService, PrismaService],
})

export class UsersModule { }
