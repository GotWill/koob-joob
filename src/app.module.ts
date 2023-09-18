import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { PostsModule } from './posts/post.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule, PostsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
