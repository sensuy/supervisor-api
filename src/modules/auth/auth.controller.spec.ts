import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { IAUTH_SERVICE } from './constants/auth.constants';
import { IAuthService } from './interfaces/auth-service.interface';
import { IUser } from '@shared/interfaces';
import { ProfileResponseDto } from './dto/profile-response.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: IAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      controllers: [AuthController],
      providers: [
        {
          provide: IAUTH_SERVICE,
          useValue: {
            jwtSign: jest.fn(),
            jwtRefresh: jest.fn(),
          }
        }
      ],

    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<IAuthService>(IAUTH_SERVICE);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('User should be able to login', async () => {
    jest.spyOn(service, 'jwtSign').mockResolvedValueOnce({ accessToken: 'test', refreshToken: 'test' });

    const user: IUser = {
      id: '1',
      email: 'test@gmail.com',
      password: '123456',
      username: 'test',
      createdAt: new Date(),
      updatedAt: new Date(),
      salt: 'test',
      active: true,
    }

    const result = await controller.login(user);

    expect(result).toEqual({ accessToken: 'test', refreshToken: 'test' })
  });

  it('User should be able to refresh token', async () => {
    const refreshToken = 'refreshTokenExampl';
    jest.spyOn(service, 'jwtRefresh').mockResolvedValueOnce({ accessToken: 'accessTokenExample' });

    const result = await controller.refresh(refreshToken);

    expect(result).toEqual({ accessToken: 'accessTokenExample' });
  });

  it('Should be able to get a profile with a access token', () => {
    const user: ProfileResponseDto = {
      id: '1',
      email: 'email@test.com',
      username: 'test',
      createdAt: new Date(),
      active: true
    }

    const result = controller.getProfile(user);

    expect(result).toEqual(user);
    
  });
})
