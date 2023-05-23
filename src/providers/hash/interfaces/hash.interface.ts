export interface IHashProvider {
  generateSalt(): Promise<string>;
    hash(password: string, salt: string): Promise<string>;
    verify(password: string, hashedPassword: string, salt: string): Promise<boolean>;
}