
import { RoleDto } from "./role.dto";
import { IRoleCreatable } from "../interfaces";
import { IntersectionType, OmitType, PartialType, PickType } from "@nestjs/swagger";

export class CreateRoleDto extends IntersectionType(
  PickType(RoleDto, ['name']),
  PartialType(PickType(RoleDto, ['franchiseid', 'schoolid'])),
) implements IRoleCreatable {}


export class CreateRoleResponseDto extends IntersectionType(
  OmitType(CreateRoleDto, ['updatedAt']),
) {}