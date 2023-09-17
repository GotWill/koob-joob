import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from '../users/user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UsersService', () => {
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });
});
