import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';
import { WasteCategory } from '../waste/waste-category.entity';

@Entity('RecyclingRecords')
export class RecyclingRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @Column()
  wasteName!: string;

  @ManyToOne(() => WasteCategory)
  category!: WasteCategory;

  @Column()
  quantity!: number;

  @Column()
  pointsEarned!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recycledAt!: Date;

  @Column({ type: 'text', nullable: true })
  notes!: string;
}
