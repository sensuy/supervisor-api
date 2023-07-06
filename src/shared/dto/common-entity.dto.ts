import { ApiProperty } from "@nestjs/swagger";
import { ICommonEntity } from "@shared/interfaces";


export class CommonEntityDto implements ICommonEntity {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    title: 'Created At',
    description: 'The date and time at which the resource was created.',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    title: 'Updated At',
    description: 'The date and time at which the resource was updated',
  })
  updatedAt: Date;

  @ApiProperty({
    title: 'Active',
    description: 'The flag to inform if this register is active or not.',
  })
  active: boolean;
}