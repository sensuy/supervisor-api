import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from './decorators/auth-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@AuthUser('username') user: any) {
    // console.log('user', user);
    
    return user;
  }
}
