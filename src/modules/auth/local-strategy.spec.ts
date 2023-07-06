import { Test, TestingModule } from "@nestjs/testing";
import { LocalStrategy } from "./local-strategy";
import { UserDto } from "@shared/dto";
import { AuthService } from "./auth.service";


describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  let authService: AuthService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            jwtSign: jest.fn(),
            jwtRefresh: jest.fn(),
          }
        },
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  it('should call validateUser', async () => {
    const mockUser: UserDto = {
      userid: '1',
      email: 'test@test.com',
      username: 'Jhon Doe',
      password: 'Aa123456',
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
    };

    jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);

    const result = await localStrategy.validate('test@test.com', 'Aa123456');

    expect(result).toEqual(mockUser);
    expect(authService.validateUser).toHaveBeenCalledTimes(1);

  });
    
  
});