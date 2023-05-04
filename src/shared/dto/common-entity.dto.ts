import { ApiProperty } from "@nestjs/swagger";
import { CommonEntityInterface } from "../interfaces";


export class CommonEntityDto implements CommonEntityInterface {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    title: 'id',
    description: 'Unique identifier for the record',
  })
  id: string;

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
}