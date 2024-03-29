import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "@shared/common.entity";
import { IUser } from "@shared/interfaces";
import { Auth } from "@modules/auth/repositories/auth.entity";

@Entity('user')
export class User extends CommonEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  userid: string; 
  @Column({ type: 'text', nullable: false })
  username: string;
  @Column({ type: 'text', nullable: false })
  email: string; 
  @Column({ type: 'text', nullable: false })
  password: string;
  @Column({ type: 'text', nullable: false })
  salt: string;
  @OneToMany(() => Auth, auth => auth.user)
  authorizations?: Auth[];
}
