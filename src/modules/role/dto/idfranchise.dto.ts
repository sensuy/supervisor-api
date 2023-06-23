import { IntersectionType, PickType } from "@nestjs/mapped-types";
import { RoleDto } from "./role.dto";
import { Iidfranchise } from "../interfaces/idfranchise.interface";

export class IdfranchiseDto extends IntersectionType(
  PickType(RoleDto, ['idfranchise']),
) implements Iidfranchise {}