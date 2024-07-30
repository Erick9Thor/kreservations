import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Sector,
  Reservation,
  ReservationModule,
  Table,
} from '@kreservations/reservations-back/reservations';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data.db',
      entities: [Reservation, Sector, Table],
      synchronize: true,
    }),
    ReservationModule,
  ],
})
export class AppModule {}
