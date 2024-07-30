import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@kreservations/environment';
import { StepperUserRservation } from '@kreservations/models';
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

  createRservation(details: StepperUserRservation): Observable<object> {
    return this.http.post(`${environment.serverApi}/reservations`, details);
  }
}
