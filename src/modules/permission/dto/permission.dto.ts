import { CommonEntityDto } from "@shared/dto";
import { ApiProperty } from "@nestjs/swagger";
import { IPermission } from "../interfaces/permission.interface";
import {
  PERMISSION_ID_MAX_LENGTH,
  PERMISSION_ID_MIN_LENGTH,
  PERMISSION_LABEL_MAX_LENGTH,
  PERMISSION_LABEL_MIN_LENGTH
} from "../constants/permission.constants";
import { PermissionOriginEnum } from "../enum/permission-type.enum";



export class PermissionDto
  extends CommonEntityDto
  implements IPermission {
  @ApiProperty({
    title: 'permissionid',
    minLength: PERMISSION_ID_MIN_LENGTH,
    maxLength: PERMISSION_ID_MAX_LENGTH,
    description: 'Unique identifier for the permission',
    example: 'CREATE_SCHOOL'
  })
  permissionid: string;

  @ApiProperty({
    title: 'label',
    minLength: PERMISSION_LABEL_MIN_LENGTH,
    maxLength: PERMISSION_LABEL_MAX_LENGTH,
    description: 'Label for the permission',
    example: 'Create Franchise\'s School'
  })
  label: string;

  @ApiProperty({
    title: 'type',
    description: 'The type of permission',
    example: 'FRANCHISE'
  })
  type: PermissionOriginEnum;

}