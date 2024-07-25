import { createAction, props } from '@ngrx/store';
import { WizardStepperItem } from '@kreservations/models';

export const initStepper = createAction(
  '[STEPPER] Init Stepper',
  props<{ steps: WizardStepperItem[] }>()
);

export const moveToStep = createAction(
  '[STEPPER] Move To Step',
  props<{ id: string }>()
);

export const moveToCustomStep = createAction(
  '[STEPPER] Move To Step',
  props<{ id: string }>()
);

export const nextStep = createAction('[STEPPER] Go To Next Step');

export const stepBack = createAction('[STEPPER] Go Step Back');

export const resetStepper = createAction('[STEPPER] Reset Stepper');

export const resetOnIndex = createAction(
  '[STEPPER] Reset Stepper on index',
  props<{ id: string }>()
);

export const blockStepper = createAction(
  '[STEPPER] Block Stepper on index',
  props<{ id: string }>()
);

export const updateData = createAction(
  '[STEPPER] Update Data',
  props<{ id: string; data: any }>()
);

export const cleanData = createAction('[STEPPER] Clean Data');
