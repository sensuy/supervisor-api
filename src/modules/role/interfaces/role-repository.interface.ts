import { CreateRoleDto } from "../dto/create-role.dto";
import { IRole } from "./role.interface";


export interface IRoleRepository {
  create(createUserDto: CreateRoleDto): Promise<IRole>;
  save(role: IRole): Promise<IRole>;
  findAllFranchiseRoles(idfranchise: string): Promise<IRole[]>;
  findAllSchoolRoles(idschool: string): Promise<IRole[]>;
}