import { IntersectionType, PickType } from "@nestjs/swagger";
import { RoleDto } from "./role.dto";
import { IRoleListable } from "../interfaces";


export class ListRoleDto extends IntersectionType(
  PickType(RoleDto, ['roleid', 'name']),
) implements IRoleListable {}