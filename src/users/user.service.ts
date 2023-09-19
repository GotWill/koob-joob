import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
// import { PrismaService } from '../../src/prisma/prisma.service'; ao executar os teste descomentar esse linha e comentar a inha abaixo
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const { name, email, biography, creationDate, dateOfBirth } = data;

    const emailExits = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (emailExits) {
      throw new ConflictException('Email already exists');
    }

    return await this.prisma.user.create({
      data: {
        name,
        email,
        biography,
        dateOfBirth: new Date(dateOfBirth),
        creationDate,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async userDetails(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('User does not exists!');
    }

    return this.prisma.user.findMany({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: Prisma.UserCreateInput) {
    const { name, email, biography, dateOfBirth } = data;

    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error('User does not exists!');
    }

    return await this.prisma.user.update({
      data: {
        name,
        email,
        biography,
        dateOfBirth: new Date(dateOfBirth),
      },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User does not exists!');
    }

    await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      message: 'User deleted successfully!',
    };
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findUserById(id: string) {
    const userId = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return userId;
  }
}
