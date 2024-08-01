import { Component, OnInit } from '@angular/core';
import { ReservationService } from '@kreservations/data-access';
import { StepperFacade } from '../../../store/stepper.facade';
import { BehaviorSubject, take, takeUntil } from 'rxjs';
import { BaseComponent, UserReservation } from '@kreservations/models';
import { ToasterService } from '@kreservations/feature-notifications';

@Component({
  selector: 'lib-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent extends BaseComponent implements OnInit {
  userInfoReservation$: BehaviorSubject<UserReservation> =
    new BehaviorSubject<UserReservation>(null);
  reservationId: number;

  constructor(
    private reservationService: ReservationService,
    private stepperFacade: StepperFacade,
    private toastService: ToasterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.stepperFacade.getData$.pipe(take(1)).subscribe((data) => {
      this.reservationId = data.get('review-reservation').id;

      this.reservationService
        .getReservationById(this.reservationId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (value: UserReservation) => {
            this.userInfoReservation$.next(value);
          },
          error: () => {
            this.toastService.error(
              'There was an error generating your reservation.'
            );
          },
        });
    });
  }

  cancelReservation() {
    this.reservationService
      .cancelReservationById(this.reservationId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toastService.success('Reservation successfully canceled.');
        },
        error: () => {
          this.toastService.error(
            'There was an error canceling your reservation.'
          );
        },
      });
  }
}
