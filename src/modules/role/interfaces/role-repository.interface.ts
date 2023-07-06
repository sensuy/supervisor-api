import { CreateRoleDto } from "../dto/create-role.dto";
import { ListRoleDto } from "../dto/list-role.dto";
import { IRole } from "./role.interface";


export interface IRoleRepository {
  create(createUserDto: CreateRoleDto): Promise<IRole>;
  save(role: IRole): Promise<IRole>;
  findById(roleid: number): Promise<IRole>;
  update(roleid: number, role: IRole): Promise<IRole>;
  findAllFranchiseRoles(idfranchise: string): Promise<ListRoleDto[]>;
  findAllSchoolRoles(idschool: string): Promise<ListRoleDto[]>;
}