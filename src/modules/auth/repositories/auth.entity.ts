import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "@shared/common.entity";
import { Role } from "@modules/role/repositories/typeorm/role.entity";
import { IAuth } from "../interfaces/auth.interface";
import { User } from "@modules/user/repositories/typeorm/user.entity";

@Entity('auth')
export class Auth extends CommonEntity implements IAuth {
  @PrimaryGeneratedColumn('increment')
  authid: number;

  @Column({ name: 'fk_franchiseid', type: 'text' })
  franchiseid: string;

  @Column({ name: 'fk_schoolid', type: 'text' })
  schoolid: string;

  @ManyToOne(() => User, user => user.authorizations)
  @JoinColumn({ name: 'fk_userid' })
  user: User;

  @ManyToOne(() => Role, role => role.authorizations)
  @JoinColumn({ name: 'fk_roleid' })
  role: Role;

}
