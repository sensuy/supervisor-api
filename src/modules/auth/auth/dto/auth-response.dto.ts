import { ApiProperty } from '@nestjs/swagger';
import { IAuthResponse } from '../interfaces/auth-response.interface';

export class AuthResponseDto implements IAuthResponse{
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  refreshToken: string;
}
