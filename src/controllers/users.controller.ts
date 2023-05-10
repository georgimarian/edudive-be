import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/services/users.service';
import { User } from 'src/user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  async findAll(@Req() request: Request): Promise<User[]> {
    console.log(request.body);
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: { id: string }): Promise<User> {
    return this.usersService.findOne(params.id);
  }

  @Post('/createUser')
  async createUser(@Body() userData: { firstName: string, lastName: string, email: string }): Promise<User> {
    try {
      return this.usersService.createUser(userData);
    } catch (e) {
      console.log(e)
    }
  }
}
