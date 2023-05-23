
export interface IAuthService {
  validateUser(username: string, password: string): any;
}