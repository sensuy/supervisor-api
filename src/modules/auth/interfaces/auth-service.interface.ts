import { IUser } from "@shared/interfaces";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { RefreshResponseDto } from "../dto/refresh-response.dto";
import { UserDto } from "@shared/dto";

export interface IAuthService {
  validateUser(email: string, password: string): Promise<UserDto>;
  jwtSign(user: IUser): Promise<AuthResponseDto>;
  jwtRefresh(authRefreshDto: string): Promise<RefreshResponseDto>;
}