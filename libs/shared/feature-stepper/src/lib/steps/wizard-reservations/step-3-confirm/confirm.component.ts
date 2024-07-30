import { Component } from '@angular/core';
import { ReservationService } from '@kreservations/data-access';

@Component({
  selector: 'lib-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent {
  constructor(private reservationService: ReservationService) {}
}
