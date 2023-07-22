import { RoleDto } from './role.dto';
import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { IRoleAssignPermission } from '../interfaces/role-assign-permission.interface';

export class RoleAssignPermissionDto extends IntersectionType(
  PickType(RoleDto, ['roleid']),
) implements IRoleAssignPermission {

  @ApiProperty({
    title: 'permissionid',
    description: 'The permissions IDs with which the role is going to be associated',
    example: ['FRANCHISE_READ', 'FRANCHISE_WRITE']
  })
  permissions: string[];
}