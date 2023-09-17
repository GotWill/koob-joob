import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PostCreateInput) {
    return this.prisma.post.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      include: {
        User: true,
      },
    });
  }

  async postDetails(id: string) {
    const postExists = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!postExists) {
      throw new Error('Post does not exists!');
    }

    return this.prisma.post.findMany({
      where: {
        id,
      },
      include: {
        User: true,
      },
    });
  }

  async update(id: string, data: Prisma.PostCreateInput) {
    const postExists = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!postExists) {
      throw new NotFoundException('Post does not exists!');
    }

    return await this.prisma.post.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const postExists = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!postExists) {
      throw new NotFoundException('Post does not exists!');
    }

    await this.prisma.post.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Post deleted successfully!',
    };
  }
}
