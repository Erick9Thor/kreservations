import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '@kreservations/data-access';
import { StepperUserRservation } from '@kreservations/models';
import { BehaviorSubject, take } from 'rxjs';
import { StepperFacade } from '../../../store/stepper.facade';

@Component({
  selector: 'lib-review-reservation',
  templateUrl: './review-reservation.component.html',
  styleUrl: './review-reservation.component.scss',
})
export class ReviewReservationComponent {
  @Output() nextStep = new EventEmitter();
  @Output() previousStep = new EventEmitter();

  userInfoReservation$: BehaviorSubject<StepperUserRservation> =
    new BehaviorSubject<StepperUserRservation>(null);

  constructor(
    private stepperFacade: StepperFacade,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.stepperFacade.getData$.pipe(take(1)).subscribe((data) => {
      this.userInfoReservation$.next(data.get('config-reservation'));
    });
  }

  stepBack(): void {
    if (this.previousStep) {
      this.previousStep.emit();
    }
  }

  finalize() {
    this.reservationService
      .confirmReservation(this.userInfoReservation$.value)
      .subscribe({
        next: (responese) => {
          console.log(responese);
        },
      });
  }
}
