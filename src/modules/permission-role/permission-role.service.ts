import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionRoleService {
  constructor() {}

  async relatePermissionsToRole(roleid: number, permissionids: string[]) {
    return null;
  }
}
