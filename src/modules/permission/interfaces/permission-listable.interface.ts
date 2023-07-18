import { IPermission } from "./permission.interface";

export interface IPermissionListable
extends Pick<IPermission, 'type' > {}


export interface IListPermissionResponse
extends Pick<IPermission, 'permissionid' | 'label'> {}