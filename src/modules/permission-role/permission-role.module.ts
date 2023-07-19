import { Module } from '@nestjs/common';
import { PermissionRoleService } from './permission-role.service';

@Module({
  controllers: [],
  providers: [PermissionRoleService]
})
export class PermissionRoleModule {}
