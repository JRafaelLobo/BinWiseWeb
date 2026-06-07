import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('WasteCategories')
export class WasteCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ nullable: true })
  color!: string;
}
