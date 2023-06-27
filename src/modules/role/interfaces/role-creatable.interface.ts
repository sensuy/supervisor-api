import { IRole } from "./role.interface";

export interface IRoleCreatable
extends Pick<IRole, 'name'>,
Partial<Pick<IRole, 'franchiseid' | 'schoolid'>> {}