import { Entity, Column, ManyToOne, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Client extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'float', nullable: false })
  companyValue: number;

  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  @Column({ type: 'boolean', default: false })
  isSelect: boolean;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
