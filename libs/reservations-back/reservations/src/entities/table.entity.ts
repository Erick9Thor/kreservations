import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  regionId: number;

  @Column()
  seatingCapacity: number;

  @Column()
  available: boolean;

  @Column()
  date: string;

  @Column()
  hour: string;
}
