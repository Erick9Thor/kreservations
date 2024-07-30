import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Observable } from 'rxjs';
import { ReservationService } from './reservations.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto): Observable<any> {
    return this.reservationService.createReservation(createReservationDto);
  }

  @Get('available-tables')
  findAvailableTables(
    @Query('date') date: string,
    @Query('hour') hour: string,
    @Query('partySize') partySize: number,
    @Query('sector') sector: string
  ): Observable<any> {
    return this.reservationService.findAvailableTables(
      date,
      hour,
      partySize,
      sector
    );
  }
}
