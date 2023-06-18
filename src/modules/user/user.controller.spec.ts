import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn()
          }
        }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
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

    jest.spyOn(service, 'create').mockResolvedValueOnce({ username: user.username, email: user.email });

    const result = await controller.create(user);

    expect(result).toEqual({ username: user.username, email: user.email });
  });

});
