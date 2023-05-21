import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { IUSER_SERVICE } from './constants/user-layers.constants';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: IUSER_SERVICE,
          useValue: {
            create: jest.fn().mockImplementation((user: CreateUserDto) => {
              return { username: user.username, email: user.email };
            })
          }
        }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to create user', async () => {
    const user: CreateUserDto = {
      username: 'John Doe',
      email: 'johndoe@email.com',
      password: 'JhonDoe123@',
    };

    const result = await controller.create(user);

    expect(result).toEqual({ username: user.username, email: user.email });
  });

});
