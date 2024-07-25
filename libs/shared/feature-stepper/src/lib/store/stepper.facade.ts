import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StepperUserBuilderService } from '../services/stepper.builder.service';
import * as fromStepperSelector from '../store/stepper.selectors';
import {
  blockStepper,
  cleanData,
  initStepper,
  moveToCustomStep,
  moveToStep,
  nextStep,
  resetOnIndex,
  resetStepper,
  stepBack,
  updateData,
} from './stepper.actions';

@Injectable({
  providedIn: 'root',
})
export class StepperFacade {
  currentStep$ = this.store.select(fromStepperSelector.selectCurrentStep);
  previousStep$ = this.store.select(fromStepperSelector.selectPreviousStep);
  steps$ = this.store.select(fromStepperSelector.selectSteps);
  getData$ = this.store.select(fromStepperSelector.selectStepData);

  constructor(
    private store: Store,
    private stepperUserBuilderService: StepperUserBuilderService
  ) {}

  initStepper(id: string): void {
    this.store.dispatch(
      initStepper({
        steps: this.stepperUserBuilderService.getWizardSteps(id),
      })
    );
  }

  moveToStep(id: string): void {
    this.store.dispatch(moveToStep({ id }));
  }

  moveToCustomStep(id: string): void {
    this.store.dispatch(moveToCustomStep({ id }));
  }

  nextStep(): void {
    this.store.dispatch(nextStep());
  }

  stepBack(): void {
    this.store.dispatch(stepBack());
  }

  resetStepper(): void {
    this.store.dispatch(resetStepper());
  }

  resetOnIndex(id: string): void {
    this.store.dispatch(resetOnIndex({ id }));
  }

  blockStepper(id: string): void {
    this.store.dispatch(blockStepper({ id }));
  }

  setStepData(id: string, data: any): void {
    this.store.dispatch(updateData({ id, data }));
  }

  setStepDataFiles(id: string, data: any): void {
    this.store.dispatch(updateData({ id, data: Object.freeze(data) }));
  }

  cleanData(): void {
    this.store.dispatch(cleanData());
  }
}
