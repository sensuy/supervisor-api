import { User } from "@modules/auth/user/repositories/typeorm/user.entity";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { RefreshResponseDto } from "../dto/refresh-response.dto";

export interface IAuthService {
  validateUser(email: string, password: string): Promise<User>;
  jwtSign(user: User): Promise<AuthResponseDto>;
  jwtRefresh(authRefreshDto: string): Promise<RefreshResponseDto>;
}