import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@kreservations/environment';
import { UserReservation } from '@kreservations/models';
import { AvailableHourDTO } from '@kreservations/reservations-back/reservations';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  checkAvailability(
    date: number,
    partySize: number,
    sector: string
  ): Observable<AvailableHourDTO[]> {
    const params = new HttpParams()
      .set('date', date)
      .set('partySize', partySize.toString())
      .set('sector', sector);

    return this.http.get<AvailableHourDTO[]>(
      `${environment.serverApi}/reservations/available-tables`,
      { params }
    );
  }

  createRservation(details: UserReservation): Observable<string> {
    return this.http.post<string>(
      `${environment.serverApi}/reservations`,
      details
    );
  }

  getReservationById(id: number): Observable<UserReservation> {
    return this.http.get<UserReservation>(
      `${environment.serverApi}/reservations/${id}`
    );
  }

  cancelReservationById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(
      `${environment.serverApi}/reservations/${id}`
    );
  }
}
