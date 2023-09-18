import { PrismaService } from '../../src/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { UserService } from '../../src/users/user.service';

describe('PostsService', () => {
  let postService: PostService;
  let userService: UserService;
  let userId: string;
  let postId: string;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, PrismaService, UserService],
    }).compile();

    postService = module.get<PostService>(PostService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });

  it('should create new post and user [POST]', async () => {
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

    const newPost = {
      content: 'Novo Post',
      userId,
    };

    const createPost = await postService.create(newPost as any);

    postId = createPost.id;

    expect(createPost).toBeDefined();
    expect(createPost.content).toEqual('Novo Post');
    expect(createPost.userId).toEqual(userId);
  });

  it('should list all posts [GET]', async () => {
    const postList = await postService.findAll();

    expect(postList).toBeDefined();
    expect(postList[0].content).toEqual('Novo Post');
    expect(postList[0].userId).toEqual(userId);
  });

  it('should update Post [UPDATE]', async () => {
    const updatePost = {
      content: 'Novo Post 2',
      userId,
    };

    const response = await postService.update(postId, updatePost as any);
    expect(response).toBeDefined();
    expect(response.content).toEqual('Novo Post 2');
  });

  it('should remove post [DELETE]', async () => {
    const postDelete = await postService.delete(`${postId}`);
    expect(postDelete).toBeDefined();
  });
});
