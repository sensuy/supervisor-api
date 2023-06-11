import { ApiProperty } from "@nestjs/swagger";
import { IException } from "@shared/interfaces";

export class ForbiddenDto implements IException {
  @ApiProperty()
  message: string;
  @ApiProperty({
    example: 403
  })
  statusCode: number;
  @ApiProperty({
    example: 'Forbidden'
  })
  error: string;
}