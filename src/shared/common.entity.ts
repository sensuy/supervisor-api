import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ICommonEntity } from './interfaces';

export abstract class CommonEntity implements ICommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'boolean', nullable: false, default: true })
  active: boolean;

  @UpdateDateColumn()
  updatedAt: Date;  
}