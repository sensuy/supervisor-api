import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { jwtConfig } from '@config/jwt.config';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtStrategy } from './jwt-strategy';
import { IUser } from '@shared/interfaces';
import { UserService } from '@modules/user/user.service';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userService: UserService;

  const user: IUser = {
    id: 'testId',
    active: true,
    password: 'password',
    salt: 'salt',
    updatedAt: new Date(),
    createdAt: new Date(),
    email: '',
    username: '',
  };

  beforeEach(async () => {


    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: jwtConfig.KEY,
          useValue: { secret: 'testSecret' }
        },
        {
          provide: UserService,
          useValue: {
            findById: jest.fn(),
          }
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('should validate and return user data', async () => {
    const payload: JwtPayload = { sub: 'testId' };
   

    jest.spyOn(userService, 'findById').mockResolvedValueOnce(user);
    
    const { password, salt, updatedAt, ...profileResponse } = user;

    const result = await jwtStrategy.validate(payload);
    expect(result).toEqual(profileResponse);
  });

  it('should throw UnauthorizedException when user is not found', async () => {
    const payload: JwtPayload = { sub: 'testId' };

    jest.spyOn(userService, 'findById').mockResolvedValueOnce(null);
    
    await expect(jwtStrategy.validate(payload)).rejects.toThrow(new UnauthorizedException('Invalid user'));

  });

  it('should throw UnauthorizedException when user is not active', async () => {
    const payload: JwtPayload = { sub: 'testId' };
    const inactiveUser = {...user, active: false };

    jest.spyOn(userService, 'findById').mockResolvedValueOnce(inactiveUser);

    await expect(jwtStrategy.validate(payload)).rejects.toThrow(new UnauthorizedException('Invalid user'));
  });
});
