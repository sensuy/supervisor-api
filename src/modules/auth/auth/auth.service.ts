import { Inject, Injectable } from "@nestjs/common";
import { IAuthService } from "./interfaces/auth-service.interface";
import { User } from "../user/repositories/typeorm/user.entity";
import { IUSER_SERVICE } from "../user/constants/user-layers.constants";
import { IUserService } from "../user/interfaces";
import { JwtService } from "@nestjs/jwt";
import { jwtConfig } from "@config/jwt.config";
import { ConfigType } from "@nestjs/config";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService  implements IAuthService{

  constructor(
    private jwtService: JwtService,
    @Inject(IUSER_SERVICE) 
    private readonly userService: IUserService,
    @Inject(jwtConfig.KEY)
    private config: ConfigType<typeof jwtConfig>
  ) { }

  validateUser(email: string, password: string): Promise<User> {
    return this.userService.validateUserLogin({email, password});
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

  
}