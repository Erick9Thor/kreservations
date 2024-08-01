import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Reservation } from './entities/reservation.entity';

export type Sector =
  | 'Main Hall'
  | 'Bar'
  | 'Riverside'
  | 'Riverside (smoking allowed)';

@Injectable()
export class ReservationService {
  private readonly sectorConstraints: Record<Sector, number> = {
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

  findAvailableTables(date: string, partySize: number, sector: Sector) {
    return from(this.getAvailableTables(date, partySize, sector)).pipe(
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
    const { date, hour, partySize, sector } = createReservationDto;

    // Check if the sector is valid
    const maxSize = this.sectorConstraints[sector as Sector];
    if (!maxSize) {
      return of(false);
    }

    // Check if party size is acceptable for the sector
    if (partySize > maxSize) {
      return of(false);
    }

    // Check if the date and hour are valid
    const reservationDate = new Date(date);
    const currentDate = new Date();
    const isDateValid = reservationDate >= currentDate;
    if (!isDateValid) {
      return of(false);
    }

    // MORE VALIDATIONS

    return of(true);
  }

  private async getAvailableTables(
    date: string,
    partySize: number,
    sector: Sector
  ): Promise<any[]> {
    const maxSize = this.sectorConstraints[sector as Sector];
    if (!maxSize) {
      throw new Error('Invalid sector');
    }

    // Find reservations that overlap with the requested time and sector
    const reservations = await this.reservationRepository.find({
      where: {
        date,
        sector,
        partySize: partySize <= maxSize ? partySize : maxSize, // Ensure the party size fits within the sector's constraints
      },
    });

    // For simplicity, this example assumes that tables are always available.
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
}
