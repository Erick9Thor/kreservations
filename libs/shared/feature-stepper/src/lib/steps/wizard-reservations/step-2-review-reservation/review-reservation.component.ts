import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '@kreservations/data-access';
import { BaseComponent, StepperUserRservation } from '@kreservations/models';
import { BehaviorSubject, take, takeUntil } from 'rxjs';
import { StepperFacade } from '../../../store/stepper.facade';

@Component({
  selector: 'lib-review-reservation',
  templateUrl: './review-reservation.component.html',
  styleUrl: './review-reservation.component.scss',
})
export class ReviewReservationComponent extends BaseComponent {
  @Output() nextStep = new EventEmitter();
  @Output() previousStep = new EventEmitter();

  userInfoReservation$: BehaviorSubject<StepperUserRservation> =
    new BehaviorSubject<StepperUserRservation>(null);

  loggingSended = false;

  constructor(
    private stepperFacade: StepperFacade,
    private reservationService: ReservationService
  ) {
    super();
  }

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
    this.loggingSended = true;

    this.reservationService
      .createRservation(this.userInfoReservation$.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.nextStep.emit();
        },
        error: () => {
          this.loggingSended = false;
        },
      });
  }
}
