import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUSER_REPOSITORY } from './constants/user-layers.constants';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { IUserRepository } from './interfaces';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { HASH_PROVIDER } from '@shared/constants';
import { IHashProvider } from '@providers/hash/interfaces/hash.interface';
import { IUser } from '@shared/interfaces';
import exp from 'constants';

describe('UserService', () => {

  let userService: UserService;
  let userRepository: IUserRepository;
  let mockHashProvider: IHashProvider;

  const userDto: IUser = {
    email: 'test@test.com',
    username: 'test',
    password: 'password',
    salt: 'salt',
    active: true,
    id: 'id',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const { id, createdAt, updatedAt, ...rest } = userDto;
  const createUserDto: CreateUserDto = rest;

  beforeEach(async () => {


    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUSER_REPOSITORY,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findById: jest.fn(),
          }
        },
        {
          provide: HASH_PROVIDER,
          useValue: {
            generateSalt: jest.fn(),
            hash: jest.fn(),
            verify: jest.fn(),
          }
        }
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<IUserRepository>(IUSER_REPOSITORY);
    mockHashProvider = module.get<IHashProvider>(HASH_PROVIDER);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe(UserService.prototype.create, () => {
    it('should be able to create a user', async () => {

      const testResponseDto: CreateUserResponseDto = { email: userDto.email, username: userDto.username };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(null);
      jest.spyOn(userRepository, 'create').mockResolvedValueOnce(userDto);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(userDto);

      const result = await userService.create(createUserDto);
      expect(result).toEqual(testResponseDto);

    });

    it('should throw a ConflictException if user already exists', async () => {

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(userDto);

      await expect(userService.create(createUserDto)).rejects.toThrow(new ConflictException('The email has already been registered'));
    });
  });

  describe(UserService.prototype.findById, () => {
    it('should be able to find a user by id', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(userDto);

      const result = await userService.findById(userDto.id);
      expect(result).toEqual(userDto);
      expect(userRepository.findById).toHaveBeenCalledWith(userDto.id);
    });

    it('should throw a NotFoundException if user does not exists', async () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(null);

      await expect(userService.findById(userDto.id)).rejects.toThrow(new NotFoundException('User not found'));
    });
  });

  describe(UserService.prototype.validateUserLogin, () => {
    it('should be able to validate a user login', async () => {
      const { email, password } = userDto;

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(userDto);
      jest.spyOn(mockHashProvider, 'verify').mockResolvedValueOnce(true);

      const result = await userService.validateUserLogin(email, password);
      expect(result).toEqual(userDto);
      expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(mockHashProvider.verify).toHaveBeenCalledWith(password, userDto.password, userDto.salt);
    });

    it('should throw a NotFoundException if user does not exists', async () => {
      const { email, password } = userDto;

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(null);

      await expect(userService.validateUserLogin(email, password)).rejects.toThrow(new NotFoundException('email was not registered'));
    });

    it('should throw a UnauthorizedException if password is invalid', async () => {
      const { email, password } = userDto;

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(userDto);
      jest.spyOn(mockHashProvider, 'verify').mockResolvedValueOnce(false);

      await expect(userService.validateUserLogin(email, password)).rejects.toThrow(new NotFoundException('Email or password invalid'));
    });
  });
});
