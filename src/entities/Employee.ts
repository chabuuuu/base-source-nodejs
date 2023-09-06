import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Employee' })
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    full_name: string;

    @Column()
    date_of_birth: Date;

    @Column({ default: 'Nam' })
    gender: string;

    @Column()
    address: string;

    @Column()
    phone_number: string;

    @Column({ nullable: true })
    email: string;

    @Column()
    job_title: string;

    @Column()
    start_date: Date;

    @Column()
    salary: number;

    @Column({ nullable: true })
    profile_picture: string;

    @Column()
    password: string;
}
