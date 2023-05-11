import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IUSER_SERVICE } from './constants/user-layers.constants';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: IUSER_SERVICE,
          useClass: UserService
        },
        {
          provide: IUSER_SERVICE,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findByEmail: jest.fn()
          }
        }

      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
