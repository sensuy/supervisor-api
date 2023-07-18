import { IPermission } from "./permission.interface";

export interface IPermissionCreatable
extends Pick<IPermission, 'permissionid' | 'label' | 'type' > {}


export interface ICreatePermissionResponse
extends Omit<IPermission, 'updatedAt' > {}