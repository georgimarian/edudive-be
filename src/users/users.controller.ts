import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { Role, User } from '@prisma/client';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) { }


  @Get('/findByEmail')
  @ApiOkResponse({ type: UserEntity })
  async findOneByEmail(@Query('email') email: string): Promise<Role> {
    return (await this.usersService.findOneByEmail(email)).role;
  }

  @Get()
  @ApiOkResponse({ type: UserEntity })
  async findOneById(@Query('firebaseId') firebaseId: string): Promise<User> {
    return this.usersService.findOne(firebaseId);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('/createUser')
  @ApiCreatedResponse({ type: UserEntity })
  async createUser(@Body() userData: { firstName: string, lastName: string, email: string, firebaseId: string }): Promise<User> {
    try {
      return this.usersService.createUser(userData);
    } catch (e) {
      return (e)
    }
  }
}
