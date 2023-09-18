import { PrismaService } from '../../src/prisma/prisma.service';
import { UserService } from '../users/user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UsersService', () => {
  let userService: UserService;
  let userId: string;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a new user [POST]', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      biography: 'John Doe',
      dateOfBirth: new Date('1990-01-01'),
    };

    const existingUser = await userService.findUserByEmail(newUser.email);

    expect(existingUser).toBeDefined();

    if (existingUser) {
      expect(existingUser).not.toBe(newUser);
    } else {
      const createdUser = await userService.create(newUser);
      userId = createdUser.id;
      expect(createdUser).toBeDefined();
      expect(createdUser.name).toEqual('John Doe');
      expect(createdUser.email).toEqual('john.doe@example.com');
      expect(createdUser.biography).toEqual('John Doe');
      expect(createdUser.dateOfBirth).toEqual(
        new Date('1990-01-01T00:00:00.000Z'),
      );
    }
  });

  it('should list all users [GET]', async () => {
    const usersList = await userService.findAll();
    expect(usersList).toBeDefined();
    usersList.map((user) => {
      expect(user.name).toEqual('John Doe');
      expect(user.email).toEqual('john.doe@example.com');
      expect(user.biography).toEqual('John Doe');
      expect(user.dateOfBirth).toEqual(new Date('1990-01-01T00:00:00.000Z'));
    });
  });

  it('should update user [UPDATE]', async () => {
    const updateuser = {
      name: 'John Doe 2',
      email: 'john.doe@example.com',
      biography: 'John Doe',
      dateOfBirth: new Date('1990-01-01'),
    };

    const response = await userService.update(userId, updateuser);
    expect(response.name).toEqual('John Doe 2');
  });

  it('should remover user [DELETE]', async () => {
    const existingUser = await userService.findUserById(userId);
    expect(existingUser).toBeDefined();
    const userDelete = await userService.delete(`${userId}`);
    expect(userDelete).toBeDefined();
  });
});
