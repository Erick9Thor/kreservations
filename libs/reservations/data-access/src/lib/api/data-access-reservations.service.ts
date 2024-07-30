import { Injectable } from '@angular/core';
import { StepperUserRservation } from '@kreservations/models';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor() {}

  checkAvailability(
    day: string
  ): Observable<{ title: string; available: boolean }[]> {
    return of([
      {
        title: '6:00 p.m.',
        available: true,
      },
      {
        title: '6:30 p.m.',
        available: true,
      },
      {
        title: '7:00 p.m.',
        available: true,
      },
      {
        title: '7:30 p.m.',
        available: true,
      },
      {
        title: '8:00 p.m.',
        available: true,
      },
      {
        title: '8:30 p.m.',
        available: true,
      },
      {
        title: '9:00 p.m.',
        available: true,
      },
      {
        title: '9:30 p.m.',
        available: true,
      },
    ]);
  }

  confirmReservation(details: StepperUserRservation): Observable<boolean> {
    return of(true);
  }
}
