import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;
}
