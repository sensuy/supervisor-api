import { IRole } from "./role.interface";

export interface IRoleCreatable
extends Pick<IRole, 'name' | 'franchiseid' | 'schoolid'> {}

export interface ICreateRoleResponse
extends Omit<IRole, 'updatedAt' > {}