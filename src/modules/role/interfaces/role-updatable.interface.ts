import { IRole } from "./role.interface";

export interface IRoleUpdatable
extends Pick<IRole, 'name'> {}