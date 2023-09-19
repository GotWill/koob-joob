import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() data: Prisma.PostCreateInput) {
    return this.postService.create(data);
  }

  @Get()
  async findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  async postDetails(@Param('id') id: string) {
    return this.postService.postDetails(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.PostCreateInput) {
    return this.postService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postService.delete(id);
  }
}
