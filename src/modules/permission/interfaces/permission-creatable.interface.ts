import { IPermission } from "./permission.interface";

export interface IPermissionCreatable
extends Pick<IPermission, 'name' | 'label'> {}


export interface ICreateRoleResponse
extends Omit<IPermission, 'updatedAt' > {}