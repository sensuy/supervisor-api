import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IAuthService } from "./interfaces/auth-service.interface";
import { User } from "../user/repositories/typeorm/user.entity";
import { IUSER_SERVICE } from "../user/constants/user-layers.constants";
import { IUserService } from "../user/interfaces";
import { JwtService } from "@nestjs/jwt";
import { jwtConfig } from "@config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import e from "express";

@Injectable()
export class AuthService implements IAuthService {

  constructor(
    private jwtService: JwtService,
    @Inject(IUSER_SERVICE)
    private readonly userService: IUserService,
    @Inject(jwtConfig.KEY)
    private config: ConfigType<typeof jwtConfig>
  ) { }

  validateUser(email: string, password: string): Promise<User> {
    return this.userService.validateUserLogin({ email, password });
  }

  async jwtSign(user: User): Promise<AuthResponseDto> {
    const accessConfig = this.config.access;
    const refreshConfig = this.config.refresh;

    const payload: JwtPayload = { sub: user.id };

    const accessToken = this.jwtService.sign(
      payload,
      accessConfig?.signOptions
    );

    const refreshToken = this.jwtService.sign(
      payload,
      refreshConfig?.signOptions
    );

    const tokens: AuthResponseDto = {
      accessToken,
      refreshToken
    };

    return tokens;
  }

  async jwtRefresh(authRefreshDto: any): Promise<any> {
    const refreshConfig = this.config.refresh;
    let verified: JwtPayload;
    try {
      verified = await this.jwtService.verifyAsync<JwtPayload>(
        authRefreshDto.refreshToken,
        refreshConfig?.verifyOptions
      );
    } catch (error) {
      throw new UnauthorizedException(`refresh token ${error.message}`);
    }

    const id = verified.sub;
    const user = await this.userService.findById(id);
    const { accessToken } = await this.jwtSign(user);
    return { accessToken }

  }


}