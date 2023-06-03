import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { Role, User } from '@prisma/client';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(@Req() request: Request): Promise<User[]> {
    console.log(request.body);
    return this.usersService.findAll();
  }



  @Get('/findByEmail')
  @ApiOkResponse({ type: UserEntity })
  async findOneByEmail(@Query('email') email: string): Promise<Role> {
    return (await this.usersService.findOneByEmail(email)).role;
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOneById(@Param() params: { id: string }): Promise<User> {
    return this.usersService.findOne({ id: Number(params.id) });
  }

  @Post('/createUser')
  @ApiCreatedResponse({ type: UserEntity })
  async createUser(@Body() userData: { firstName: string, lastName: string, email: string }): Promise<User> {
    try {
      return this.usersService.createUser(userData);
    } catch (e) {
      console.log(e)
    }
  }
}
