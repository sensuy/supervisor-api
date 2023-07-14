import { IntersectionType, OmitType, PickType } from "@nestjs/swagger";
import { PermissionDto } from "./permission.dto";
import { ICreatePermissionResponse, IPermissionCreatable } from "../interfaces/permission-creatable.interface";


export class CreatePermissionDto extends IntersectionType(
  PickType(PermissionDto, ['permissionid', 'label', 'type' ]),
) implements IPermissionCreatable {}


export class CreatePermissionResponseDto extends IntersectionType(
  OmitType(PermissionDto, ['updatedAt']),
) implements ICreatePermissionResponse {}