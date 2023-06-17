import { ApiProperty } from "@nestjs/swagger";
import { IException } from "@shared/interfaces";

export class NotFoundDto implements IException {
  @ApiProperty()
  message: string;
  @ApiProperty({
    example: 404
  })
  statusCode: number;
  @ApiProperty({
    example: 'Not Found'
  })
  error: string;
}