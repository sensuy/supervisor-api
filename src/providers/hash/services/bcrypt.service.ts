import { Injectable } from "@nestjs/common";
import {genSalt, hash, compare} from 'bcrypt';
import { IHashProvider } from "../interfaces/hash.interface";


@Injectable()
export class BcryptService implements IHashProvider {

  async createSalt(): Promise<string> {
    return genSalt();
  }

  async encrypt(password: string): Promise<string> {
    const salt = await this.createSalt();
    return hash(password, salt);
  }

  async verify(password: string, encrypted: string): Promise<boolean> {
    return compare(password, encrypted);
  }

}