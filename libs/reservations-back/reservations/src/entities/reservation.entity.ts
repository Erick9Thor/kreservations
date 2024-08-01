import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: number;

  @Column()
  hour: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  partySize: number;

  @Column()
  sector: string;

  @Column()
  childrens: number;

  @Column()
  smokers: boolean;

  @Column()
  birthdays: boolean;

  @Column({ nullable: true })
  birthDayName: string;

  @CreateDateColumn()
  createdAt: Date;
}
