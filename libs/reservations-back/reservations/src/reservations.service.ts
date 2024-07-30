import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { from, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>
  ) {}

  createReservation(createReservationDto: CreateReservationDto) {
    return this.validateReservation(createReservationDto).pipe(
      switchMap((isValid) => {
        if (!isValid) {
          return throwError(() => new Error('Invalid reservation request'));
        }
        const newReservation =
          this.reservationRepository.create(createReservationDto);
        return from(this.reservationRepository.save(newReservation));
      }),
      tap((reservation) => console.log('Reservation created:', reservation)),
      catchError((error) => {
        console.error('Error creating reservation:', error);
        return throwError(() => new Error('Failed to create reservation'));
      })
    );
  }

  findAvailableTables(
    date: string,
    hour: string,
    partySize: number,
    sector: string
  ) {
    return from(this.getAvailableTables(date, hour, partySize, sector)).pipe(
      map((tables) => {
        return tables;
      }),
      catchError((error) => {
        console.error('Error finding available tables:', error);
        return throwError(() => new Error('Failed to find available tables'));
      })
    );
  }

  validateReservation(createReservationDto: CreateReservationDto) {
    return of(true);
  }

  private getAvailableTables(
    date: string,
    hour: string,
    partySize: number,
    sector: string
  ) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          { id: 1, sector, seatingCapacity: partySize, available: true },
          { id: 2, sector, seatingCapacity: partySize, available: true },
        ]);
      }, 1000);
    });
  }
}
