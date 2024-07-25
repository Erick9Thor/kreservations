import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '@kreservations/data-access';

@Component({
  selector: 'lib-review-reservation',
  templateUrl: './review-reservation.component.html',
  styleUrl: './review-reservation.component.scss',
})
export class ReviewReservationComponent {
  reservationDetails: any;

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reservationService.getReservationDetails().subscribe((details) => {
      this.reservationDetails = details;
    });
  }

  confirm() {
    if (this.reservationService.confirmReservation(this.reservationDetails)) {
      this.router.navigate(['/confirmation']);
    } else {
      alert('Could not confirm reservation. Please try again.');
    }
  }

  editDetail() {
    this.router.navigate(['/reservation']);
  }
}
