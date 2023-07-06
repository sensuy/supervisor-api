import { ApiProperty } from '@nestjs/swagger';
import { IAuthResponse } from '../interfaces/auth-response.interface';

export class AuthResponseDto implements IAuthResponse{
  @ApiProperty({
    example: 'eyJhbGciOiJIUz.0NzgwNjIsImV4cCI6MTY4NjQ3ODA4Mn0.kNTh7hQqrhkuCL2ao8In3g',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUz.0NzgwNjIsImV4cCI6MTY4NjU2NDQ2Mn0.sdfhsRT50a0Fe7Gb3ZDeMLQo',
  })
  refreshToken: string;
}
