import { CommonEntityDto } from "@shared/dto";
import { IRole } from "../interfaces";
import { ApiProperty } from "@nestjs/swagger";
import { ROLE_NAME_MAX_LENGTH, ROLE_NAME_MIN_LENGTH } from "../constants/role.constants";



export class RoleDto
  extends CommonEntityDto
  implements IRole {
  @ApiProperty({
    type: 'number',
    title: 'roleid',
    description: 'Unique identifier for the role',
  })
  roleid: number;

  @ApiProperty({
    title: 'name',
    description: 'The role label',
    minLength: ROLE_NAME_MIN_LENGTH,
    maxLength: ROLE_NAME_MAX_LENGTH,
    example: 'Principal'
  })
  name: string;

  @ApiProperty({
    title: 'Franchise ID',
    description: 'The franchise ID with which the role is associated',
    example: 'f0a5e3c0-6c7b-11eb-9439-0242ac130001'
  })
  idfranchise: string;

  @ApiProperty({
    title: 'School ID',
    description: 'The school ID with which the role is associated',
    example: 'f0a5e3c0-6c7b-11eb-9439-0242ac130003'
  })
  idschool: string;
}