import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StepperState } from './stepper.state';
import { STEPPER_FEATURE_KEY } from './stepper.reducer';

export const selectFeature =
  createFeatureSelector<StepperState>(STEPPER_FEATURE_KEY);

export const selectSteps = createSelector(
  selectFeature,
  (state: StepperState) => state?.steps
);

export const selectCurrentStep = createSelector(
  selectFeature,
  (state: StepperState) => state?.currentStep
);

export const selectPreviousStep = createSelector(
  selectFeature,
  (state: StepperState) => state?.previousStep
);

export const selectStepData = createSelector(
  selectFeature,
  (state: StepperState) => state?.data
);
