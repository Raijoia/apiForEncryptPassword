import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @Post('register')
  async registerUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<User> {
    console.log(createUserDto);
    return this.userService.createUser(createUserDto);
  }
}
