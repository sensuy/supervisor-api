import { Test, TestingModule } from '@nestjs/testing';
import { PermissionRoleService } from './permission-role.service';

describe('PermissionRoleService', () => {
  let service: PermissionRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionRoleService],
    }).compile();

    service = module.get<PermissionRoleService>(PermissionRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
