import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '@kreservations/data-access';
import {
  BaseComponent,
  UserReservation,
  WizardStepperItem,
} from '@kreservations/models';
import { BehaviorSubject, take, takeUntil } from 'rxjs';
import { StepperFacade } from '../../../store/stepper.facade';

@Component({
  selector: 'lib-review-reservation',
  templateUrl: './review-reservation.component.html',
  styleUrl: './review-reservation.component.scss',
})
export class ReviewReservationComponent
  extends BaseComponent
  implements OnInit
{
  @Output() nextStep = new EventEmitter();
  @Output() previousStep = new EventEmitter();

  @Input()
  set data(value: WizardStepperItem) {
    this._data = value;
  }

  get data(): WizardStepperItem {
    return this._data;
  }

  _data: WizardStepperItem;

  userInfoReservation$: BehaviorSubject<UserReservation> =
    new BehaviorSubject<UserReservation>(null);

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
        next: (id: string) => {
          this.stepperFacade.setStepData(this.data.id, id);

          this.nextStep.emit();
        },
        error: () => {
          this.loggingSended = false;
        },
      });
  }
}
