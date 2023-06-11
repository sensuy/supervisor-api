import { ApiProperty } from "@nestjs/swagger";
import { IException } from "@shared/interfaces";

export class UnauthorizedDto implements IException {
  @ApiProperty()
  message: string;
  @ApiProperty({
    example: 401
  })
  statusCode: number;
  @ApiProperty({
    example: 'Unauthorized'
  })
  error: string;
}