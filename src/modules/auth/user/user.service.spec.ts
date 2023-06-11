import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUSER_REPOSITORY } from './constants/user-layers.constants';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { IUserRepository } from './interfaces';
import { ConflictException } from '@nestjs/common';
import { HASH_PROVIDER } from '@shared/constants';
import { IHashProvider } from '@providers/hash/interfaces/hash.interface';

describe('UserService', () => {

  let service: UserService;
  let mockRepository: IUserRepository;
  let mockHashProvider: IHashProvider;

  beforeEach(async () => {
    mockRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      findById: jest.fn(),
    };

    mockHashProvider = {
      generateSalt: jest.fn(),
      hash: jest.fn(),
      verify: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUSER_REPOSITORY,
          useValue: mockRepository
        },
        {
          provide: HASH_PROVIDER,
          useValue: mockHashProvider
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(UserService.prototype.create, () => {
    it('should be able to create a user', () => {
      const testUserDto: CreateUserDto = { email: 'test@test.com', username: 'test', password: 'password' };
      const testResponseDto: CreateUserResponseDto = { email: testUserDto.email, username: testUserDto.username };

      mockRepository.findByEmail = jest.fn().mockResolvedValueOnce(null);
      mockRepository.create = jest.fn().mockResolvedValue(testUserDto);
      mockRepository.save = jest.fn().mockResolvedValue(testResponseDto);

      expect(service.create(testUserDto)).resolves.toEqual(testResponseDto);

    });

    it('should throw a ConflictException if user already exists', async () => {
      const testUserDto: CreateUserDto = { email: 'test@test.com', username: 'test', password: 'password' };
      mockRepository.findByEmail = jest.fn().mockResolvedValueOnce(testUserDto);

      await expect(service.create(testUserDto)).rejects.toThrow(ConflictException);
    });


  });
});
