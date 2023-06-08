import { Inject, Injectable } from "@nestjs/common";
import { IAuthService } from "./interfaces/auth-service.interface";
import { User } from "../user/repositories/typeorm/user.entity";
import { IUSER_SERVICE } from "../user/constants/user-layers.constants";
import { IUserService } from "../user/interfaces";

@Injectable()
export class AuthService  implements IAuthService{

  constructor(
    @Inject(IUSER_SERVICE) 
    private readonly userService: IUserService
  ) { }

  validateUser(email: string, password: string): Promise<User> {
    console.log('LocalStrategy.validate');
    
    return this.userService.validateUserLogin({email, password});
  }
}