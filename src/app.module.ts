import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { PostsModule } from './posts/post.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { AuthenticateController } from './controller/authenticate.controller';
import { PostService } from './posts/post.service';
import { UserService } from './users/user.service';

@Module({
  imports: [
    UserModule,
    PostsModule,
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [AuthenticateController],
  providers: [PrismaService, PostService, UserService],
})
export class AppModule {}
