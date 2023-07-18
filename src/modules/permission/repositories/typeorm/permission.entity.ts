import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "@shared/common.entity";
import { IPermission } from "@modules/permission/interfaces/permission.interface";
import { PermissionOriginEnum } from "@modules/permission/enum/permission-type.enum";

@Entity('permission')
export class Permission extends CommonEntity implements IPermission {
  @PrimaryColumn()
  permissionid: string;

  @Column({ type: 'text' })
  label: string;

  @Column({
    type: "enum",
    enum: PermissionOriginEnum,
  })
  type: PermissionOriginEnum;
}
