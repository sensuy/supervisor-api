import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUSER_REPOSITORY, IUSER_SERVICE } from './constants/user-layers.constants';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: IUSER_REPOSITORY,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findByEmail: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
