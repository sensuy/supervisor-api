import { Injectable } from "@nestjs/common";
import { IAuthService } from "./interfaces/auth-service.interface";

@Injectable()
export class AuthService  implements IAuthService{
  validateUser(username: string, password: string): any {
    throw new Error("Method not implemented.");
  }
}