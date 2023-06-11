import { Inject, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '../user/repositories/typeorm/user.entity';
import { IAUTH_SERVICE } from './constants/auth.constants';
import { IAuthService } from './interfaces/auth-service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IAUTH_SERVICE) 
    private readonly authService: IAuthService
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return this.authService.validateUser(email, password);
  }
}
