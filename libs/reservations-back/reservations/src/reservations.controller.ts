import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Observable } from 'rxjs';
import { ReservationService, Sector } from './reservations.service';
import { Reservation } from './entities/reservation.entity';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto
  ): Observable<Reservation> {
    return this.reservationService.createReservation(createReservationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Reservation> {
    return this.reservationService.getReservationById(id);
  }

  @Get('available-tables')
  findAvailableTables(
    @Query('date') date: string,
    @Query('partySize') partySize: number,
    @Query('sector') sector: string
  ): Observable<any[]> {
    return this.reservationService.findAvailableTables(
      date,
      partySize,
      sector as Sector
    );
  }
}
