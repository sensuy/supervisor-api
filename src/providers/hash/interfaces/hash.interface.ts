export interface IHashProvider {
    createSalt(): Promise<string>;
    encrypt(data: string): Promise<string>;
    verify(data: string, encrypted: string): Promise<boolean>;
}