import { ConfigType } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConfig } from '@config/jwt.config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt'; 

import { IUserService } from '../user/interfaces';
import { IUSER_SERVICE } from '../user/constants/user-layers.constants';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ProfileResponseDto } from './dto/profile-response.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private config: ConfigType<typeof jwtConfig>,
    @Inject(IUSER_SERVICE)
    private userService: IUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<ProfileResponseDto> {
    const { sub } = payload;
    const user = await this.userService.findById(sub);

    if (!user || !user.active) {
      throw new UnauthorizedException('Invalid user');
    }

    const { password, salt, updatedAt, ...profileResponse } = user;
    return profileResponse;
  }
}
