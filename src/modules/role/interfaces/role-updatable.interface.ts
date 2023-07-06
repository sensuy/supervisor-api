import { IRole } from "./role.interface";

export interface IRoleUpdatable
extends Pick<IRole, 'name'> {}


export interface IRoleUpdatableResponse
extends Omit<IRole, 'createdAt'>,
Partial<Pick<IRole, 'franchiseid' | 'schoolid'>>{}