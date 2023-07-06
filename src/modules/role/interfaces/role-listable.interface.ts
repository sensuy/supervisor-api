import { IRole } from "./role.interface";

export interface IRoleListable
extends Pick<IRole, 'name' | 'roleid'> {}