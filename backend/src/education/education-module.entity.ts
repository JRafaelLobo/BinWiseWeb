import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('EducationModules')
export class EducationModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  estimatedMinutes: number;

  @Column('text')
  content: string;
}
