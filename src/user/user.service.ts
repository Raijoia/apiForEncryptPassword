import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { comparetor, encryptPassword } from 'src/utils/encrypt';
import { ErrorResponse } from 'src/interface/errorResponse';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
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
      return { message: 'User not found' };
    }

    return await comparetor(
      data.password.toString(),
      userLogin.password,
      userLogin,
    );
  }
}
