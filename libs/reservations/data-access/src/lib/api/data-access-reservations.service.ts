import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@kreservations/environment';
import { UserReservation } from '@kreservations/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  checkAvailability(
    date: string,
    partySize: number,
    sector: string
  ): Observable<{ title: string; available: boolean }[]> {
    const params = new HttpParams()
      .set('date', date)
      .set('partySize', partySize.toString())
      .set('sector', sector);

    return this.http.get<{ title: string; available: boolean }[]>(
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

  getReservationById(id: string): Observable<UserReservation> {
    return this.http.get<UserReservation>(
      `${environment.serverApi}/reservations/${id}`
    );
  }
}
