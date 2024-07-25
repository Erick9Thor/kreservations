import { Component } from '@angular/core';
import { ReservationService } from '@kreservations/data-access';

@Component({
  selector: 'lib-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent {
  reservationDetails: any;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.getReservationDetails().subscribe((details) => {
      this.reservationDetails = details;
    });
  }
}
