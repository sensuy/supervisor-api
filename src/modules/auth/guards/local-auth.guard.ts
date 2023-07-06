import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

  handleRequest(err: any, user: any, info: any) {        
    if (err || !user) {
      throw err || new UnauthorizedException(info?.message);
    }

    return user;
  }
} 