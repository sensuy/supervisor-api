import { UserDto } from "@modules/auth/user/dto/user.dto";
import { IntersectionType, OmitType } from "@nestjs/swagger";
import { IProfileResponse } from "../interfaces/profile-response.interface";

export class ProfileResponseDto extends IntersectionType(
  OmitType(UserDto, ['password', 'updatedAt']),
) implements IProfileResponse {}