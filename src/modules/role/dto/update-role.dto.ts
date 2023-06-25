import { PartialType } from '@nestjs/swagger';
import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { RoleDto } from './role.dto';
import { IRoleCreatable } from '../interfaces';

export class UpdateRoleDto extends IntersectionType(
  PickType(RoleDto, ['name']),
) implements IRoleCreatable {}