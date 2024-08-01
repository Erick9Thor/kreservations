import { Component, OnInit } from '@angular/core';
import { ReservationService } from '@kreservations/data-access';
import { StepperFacade } from '../../../store/stepper.facade';
import { BehaviorSubject, take, takeUntil } from 'rxjs';
import { BaseComponent, UserReservation } from '@kreservations/models';

@Component({
  selector: 'lib-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss',
})
export class ConfirmComponent extends BaseComponent implements OnInit {
  userInfoReservation$: BehaviorSubject<UserReservation> =
    new BehaviorSubject<UserReservation>(null);

  constructor(
    private reservationService: ReservationService,
    private stepperFacade: StepperFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.stepperFacade.getData$.pipe(take(1)).subscribe((data) => {
      const reservationId = data.get('review-reservation').id;

      this.reservationService
        .getReservationById(reservationId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (value: UserReservation) => {
            this.userInfoReservation$.next(value);
          },
        });
    });
  }
}
