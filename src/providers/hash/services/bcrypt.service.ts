import { Injectable } from "@nestjs/common";
import { genSalt, hash, compare } from 'bcrypt';
import { IHashProvider } from "../interfaces/hash.interface";


@Injectable()
export class BcryptService implements IHashProvider {

  async generateSalt(): Promise<string> {
    return genSalt();
  }

  async hash(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

  async verify(password: string, hashedPassword: string, salt: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

}