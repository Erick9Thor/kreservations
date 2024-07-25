import { Component, OnInit } from '@angular/core';
import { StepperFacade } from '@kreservations/feature-stepper';
import { SteppersType } from '@kreservations/models';

@Component({
  selector: 'lib-view-loader-stepper',
  templateUrl: './view-loader-stepper.component.html',
  styleUrl: './view-loader-stepper.component.scss',
})
export class ViewLoaderStepperComponent implements OnInit {
  constructor(private stepperFacade: StepperFacade) {}

  ngOnInit(): void {
    this.stepperFacade.initStepper(SteppersType.WIZARD_RESERVATIONS);
  }
}
