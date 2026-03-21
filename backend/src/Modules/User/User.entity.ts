import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    enrollment: string;

    @Column({ unique: true })
    email: string;

    @Column()
    course: string;

    @Column()
    password: string;
}