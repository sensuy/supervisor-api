import { ApiProperty } from "@nestjs/swagger";
import { IException } from "@shared/interfaces";

export class BadRequestDto implements IException {
  @ApiProperty()
  message: string;
  @ApiProperty({
    example: 400
  })
  statusCode: number;
  @ApiProperty({
    example: 'Bad Request'
  })
  error: string;
}