import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUser } from './decorators/auth-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IAUTH_SERVICE } from './constants/auth.constants';
import { IAuthService } from './interfaces/auth-service.interface';
import { User } from '../user/repositories/typeorm/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserDto } from '../user/dto/user.dto';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    @Inject(IAUTH_SERVICE) 
    private readonly authService: IAuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login') 
  async login(@AuthUser() user: User): Promise<AuthResponseDto> {
    return this.authService.jwtSign(user);
  }

  @Post('/refresh')
  refresh(@Body() authRefreshDto: any): Promise<AuthResponseDto> {
    return this.authService.jwtRefresh(authRefreshDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@AuthUser() user: ProfileResponseDto) {
    return user;
  }
}
