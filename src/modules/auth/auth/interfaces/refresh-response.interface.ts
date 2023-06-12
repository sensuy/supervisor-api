import { IAuthResponse } from "./auth-response.interface";

export interface IRefreshResponse
extends Pick<IAuthResponse, 'accessToken'> {}