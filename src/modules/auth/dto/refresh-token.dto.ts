import { IntersectionType, PickType } from "@nestjs/swagger";
import { AuthResponseDto } from "./auth-response.dto";
import { IRefreshTokenRequest, IRefreshTokenResponse } from "../interfaces/refresh-token.interface";

export class RefreshTokenRequestDto extends IntersectionType(
  PickType(AuthResponseDto, ['refreshToken'])
) implements IRefreshTokenRequest {}

export class RefreshTokenResponseDto extends IntersectionType(
  PickType(AuthResponseDto, ['accessToken'])
) implements IRefreshTokenResponse {}