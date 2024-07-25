import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservationDetails = new BehaviorSubject<any>(null);

  constructor() {}

  setReservationDetails(details: any) {
    this.reservationDetails.next(details);
  }

  getReservationDetails() {
    return this.reservationDetails.asObservable();
  }

  // Simulate backend check
  checkAvailability(details: any): boolean {
    // Implementar lógica para verificar la disponibilidad
    return true;
  }

  confirmReservation(details: any): boolean {
    // Implementar lógica para confirmar la reserva
    return true;
  }
}
