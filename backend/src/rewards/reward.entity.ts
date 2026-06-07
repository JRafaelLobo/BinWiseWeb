import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Rewards')
export class Reward {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column()
  type!: string;

  @Column({ default: 0 })
  pointsRequired!: number;
}
