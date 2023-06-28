import { RoleDto } from './role.dto';
import { IRoleUpdatable, IRoleUpdatableResponse } from '../interfaces';
import { IntersectionType, OmitType, PartialType, PickType } from '@nestjs/swagger';

export class UpdateRoleDto extends IntersectionType(
  PickType(RoleDto, ['name']),
) implements IRoleUpdatable {}

export class UpdateRoleResponseDto extends IntersectionType(
  OmitType(RoleDto, ['createdAt']),
  PartialType(PickType(RoleDto, ['franchiseid', 'schoolid']))
) implements IRoleUpdatableResponse {}