import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Reservation } from './entities/reservation.entity';

export type SectorType =
  | 'Main Hall'
  | 'Bar'
  | 'Riverside'
  | 'Riverside (smoking allowed)';

@Injectable()
export class ReservationService {
  private readonly sectorConstraints: Record<SectorType, number> = {
    'Main Hall': 12,
    Bar: 4,
    Riverside: 8,
    'Riverside (smoking allowed)': 6,
  };

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

  findAvailableTables(date: number, partySize: number, sector: SectorType) {
    return from(this.getAvailableTables(date, partySize, sector)).pipe(
      map((tables) => tables),
      catchError((error) => {
        console.error('Error finding available tables:', error);
        return throwError(() => new Error('Failed to find available tables'));
      })
    );
  }

  validateReservation(createReservationDto: CreateReservationDto) {
    //  VALIDATIONS
    return of(true);
  }

  private async getAvailableTables(
    date: number,
    partySize: number,
    sector: SectorType
  ): Promise<any[]> {
    const maxSize = this.sectorConstraints[sector];
    if (!maxSize) {
      throw new Error('Invalid sector');
    }

    const reservations = await this.reservationRepository.find({
      where: {
        date,
        sector,
        partySize: partySize <= maxSize ? partySize : maxSize,
      },
    });

    // SImplificated version
    const availableTables = [
      {
        id: 1,
        sector,
        seatingCapacity: partySize,
        available: true,
        title: '6:00 p.m.',
      },
      {
        id: 2,
        sector,
        seatingCapacity: partySize,
        available: true,
        title: '6:30 p.m.',
      },
      {
        id: 3,
        sector,
        seatingCapacity: partySize,
        available: true,
        title: '7:00 p.m.',
      },
      {
        id: 4,
        sector,
        seatingCapacity: partySize,
        available: true,
        title: '7:30 p.m.',
      },
      {
        id: 5,
        sector,
        seatingCapacity: partySize,
        available: true,
        title: '8:00 p.m.',
      },
      {
        id: 6,
        sector,
        seatingCapacity: partySize,
        available: true,
        title: '8:30 p.m.',
      },
      {
        id: 7,
        sector,
        seatingCapacity: partySize,
        available: true,
        title: '9:00 p.m.',
      },
      {
        id: 8,
        sector,
        seatingCapacity: partySize,
        available: true,
        title: '9:30 p.m.',
      },
    ];

    if (reservations.length > 0) {
      const notAvailableHours = reservations.map((val) => val.hour);
      availableTables.forEach((table) => {
        if (notAvailableHours.includes(table.title)) {
          table.available = false;
        }
      });
    }

    return availableTables.filter(
      (table) => table.seatingCapacity >= partySize
    );
  }

  getReservationById(id: number): Observable<Reservation> {
    return from(this.reservationRepository.findOneBy({ id })).pipe(
      map((reservation) => {
        if (!reservation) {
          throw new Error(`Reservation with id ${id} not found`);
        }
        return reservation;
      }),
      catchError((error) => {
        console.error('Error finding reservation:', error);
        return throwError(() => new Error('Failed to find reservation'));
      })
    );
  }

  cancelReservation(id: number) {
    return from(this.reservationRepository.delete({ id })).pipe(
      map((reservation) => {
        if (!reservation) {
          throw new Error(`Reservation with id ${id} not found`);
        }
        return { success: true };
      }),
      catchError((error) => {
        console.error('Error finding reservation:', error);
        return throwError(() => new Error('Failed to find reservation'));
      })
    );
  }
}
