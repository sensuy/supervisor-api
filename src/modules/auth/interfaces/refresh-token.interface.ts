import { IAuthResponse } from "./auth-response.interface";

export interface IRefreshTokenRequest
extends Pick<IAuthResponse, 'refreshToken'> {}

export interface IRefreshTokenResponse
extends Pick<IAuthResponse, 'accessToken'> {}