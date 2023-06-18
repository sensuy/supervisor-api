import { IntersectionType, PickType } from "@nestjs/swagger";
import { AuthResponseDto } from "./auth-response.dto";
import { IRefreshResponse } from "../interfaces/refresh-response.interface";

export class RefreshResponseDto extends IntersectionType(
  PickType(AuthResponseDto, ['accessToken'])
) implements IRefreshResponse {}