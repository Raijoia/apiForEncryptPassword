import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { comparetor, encryptPassword } from 'src/utils/encrypt';
import { ErrorResponse } from 'src/interface/errorResponse';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const haveUser = await this.prisma.user.findUnique({
      where: { email: data.email.toString() },
    });

    if (haveUser) {
      throw new UnauthorizedException('User already exists');
    }

    data.password = await encryptPassword(data.password);

    return this.prisma.user.create({
      data,
    });
  }

  async login(
    data: Prisma.UserWhereUniqueInput,
  ): Promise<User | ErrorResponse> {
    const userLogin = await this.prisma.user.findUnique({
      where: { email: data.email.toString() },
    });

    if (!userLogin) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await comparetor(
      data.password.toString(),
      userLogin.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return userLogin;
  }
}
