import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('disciplines')
export class Discipline {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('int')
  semester: number;

  @Column({ type: 'enum', enum: ['cc', 'si'], default: 'cc' })
  course: 'cc' | 'si';

  @ManyToMany(() => Discipline, (discipline) => discipline.dependents, {
    cascade: true,
  })
  @JoinTable({
    name: 'discipline_prerequisites',
    joinColumn: { name: 'discipline_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'prerequisite_id', referencedColumnName: 'id' },
  })
  prerequisites: Discipline[];

  @ManyToMany(() => Discipline, (discipline) => discipline.prerequisites)
  dependents: Discipline[];

  @ManyToMany(() => Discipline, (discipline) => discipline.corequisites, {
    cascade: true,
  })
  @JoinTable({
    name: 'discipline_corequisites',
    joinColumn: { name: 'discipline_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'corequisite_id', referencedColumnName: 'id' },
  })
  corequisites: Discipline[];
}
