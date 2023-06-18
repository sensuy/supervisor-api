import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { jwtConfig } from '@config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '@shared/interfaces';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';

describe('AuthService', () => {
  const user: IUser = {
    id: '1',
    email: 'email@test.com',
    username: '',
    password: 'test1234',
    salt: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    active: true
  };

  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            validateUserLogin: jest.fn(),
            findById: jest.fn(),
          }
        },
        {
          provide: jwtConfig.KEY,
          useValue: {
            access: jest.fn(),
            refresh: jest.fn()
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
            verifyAsync: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(AuthService.prototype.validateUser, () => {
    it('should be able to validate a user', async () => {
      const loginData = { email: 'email@test.com', password: 'test1234' };
      jest.spyOn(userService, 'validateUserLogin').mockResolvedValueOnce(user);

      const result = await service.validateUser(loginData.email, loginData.password);

      expect(result).toEqual(user);
      expect(userService.validateUserLogin).toHaveBeenCalledWith(loginData.email, loginData.password);

    });

    it('should be able to generate the access token and the refresh token', async () => {
      const authResponse: AuthResponseDto = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
      };

      jest.spyOn(jwtService, 'sign').mockImplementationOnce(() => 'accessToken')
      jest.spyOn(jwtService, 'sign').mockImplementationOnce(() => 'refreshToken')

      const result = await service.jwtSign(user);

      expect(result).toEqual(authResponse)
      expect(jwtService.sign).toHaveBeenCalledTimes(2);
    });

    it('should be able to generate a new access token with the refresh token', async () => {

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValueOnce({ sub: user.id });
      jest.spyOn(userService, 'findById').mockResolvedValueOnce(user);
      jest.spyOn(jwtService, 'sign').mockImplementationOnce(() => 'accessToken'); 


      const result = await service.jwtRefresh('refreshToken');
      
      expect(result).toEqual({accessToken: 'accessToken'});
    });

    it('should be able to trhow an error when the refresh token is invalid', async () => {
        
        jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new Error('is invalid'));
  
        await expect(service.jwtRefresh('refreshToken')).rejects.toThrow(new UnauthorizedException('refresh token is invalid'));
    });
  });

});
