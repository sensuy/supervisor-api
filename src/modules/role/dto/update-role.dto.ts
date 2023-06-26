import { RoleDto } from './role.dto';
import { IRoleCreatable } from '../interfaces';
import { IntersectionType, PickType } from '@nestjs/swagger';

export class UpdateRoleDto extends IntersectionType(
  PickType(RoleDto, ['name']),
) implements IRoleCreatable {}