import { IntersectionType, PickType } from "@nestjs/swagger";
import { PermissionDto } from "./permission.dto";
import { IListPermissionResponse } from "../interfaces/permission-listable.interface";


export class ListPermissionDto extends IntersectionType(
  PickType(PermissionDto, ['permissionid', 'label']),
) implements IListPermissionResponse {}