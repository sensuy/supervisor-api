import { ConfigType } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConfig } from '@config/jwt.config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ProfileResponseDto } from './dto/profile-response.dto';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private config: ConfigType<typeof jwtConfig>,
    private userService: UserService,
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
