import { Test, TestingModule } from "@nestjs/testing";
import { LocalStrategy } from "./local-strategy";
import { IAUTH_SERVICE } from "./constants/auth.constants";
import { IAuthService } from "./interfaces/auth-service.interface";
import { UserDto } from "@shared/dto";


describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let mockAuthService: IAuthService ={
    validateUser: jest.fn(),
    jwtSign: jest.fn(),
    jwtRefresh: jest.fn(),
  }

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: IAUTH_SERVICE,
          useValue: mockAuthService
        },
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    mockAuthService = module.get<IAuthService>(IAUTH_SERVICE);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  it('should call validateUser', async () => {
    const mockUser: UserDto = {
      id: '1',
      email: 'test@test.com',
      username: 'Jhon Doe',
      password: 'Aa123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    };

    jest.spyOn(mockAuthService, 'validateUser').mockResolvedValue(mockUser);

    const result = await localStrategy.validate('test@test.com', 'Aa123456');

    expect(result).toEqual(mockUser);
    expect(mockAuthService.validateUser).toHaveBeenCalledTimes(1);

  });
    
  
});