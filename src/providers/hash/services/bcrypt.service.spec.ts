import { Test, TestingModule } from "@nestjs/testing";
import { BcryptService } from "./bcrypt.service";


describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be able to create a salt', async () => {
    let salt: string = null;
    salt = await service.generateSalt();

    expect(salt).not.toBeNull();
    expect(salt.length).toBeGreaterThan(0);
  });


  it('Should be able to hash a password', async () => {
    let salt: string = null;
    let hash: string = null;
    salt = await service.generateSalt();
    hash = await service.hash('123456', salt);

    expect(hash).not.toBeNull();
    expect(hash).not.toBeNull();
    expect(hash.length).toBeGreaterThan(0);
  });

  it('Should be able to verify a password', async () => {
    let salt: string = null;
    let hash: string = null;
    salt = await service.generateSalt();
    hash = await service.hash('123456', salt);
    const isPasswordValid = await service.verify('123456', hash, salt);

    expect(salt.length).toBeGreaterThan(0);
    expect(hash.length).toBeGreaterThan(0);
    expect(isPasswordValid).toBe(true);
  });
});