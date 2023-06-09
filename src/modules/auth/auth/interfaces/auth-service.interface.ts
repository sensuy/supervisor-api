import { User } from "@modules/auth/user/repositories/typeorm/user.entity";

export interface IAuthService {
  validateUser(email: string, password: string): Promise<User>;
  jwtSign(user: User): Promise<any>;
}