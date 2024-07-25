import { createReducer, on, Action } from '@ngrx/store';

import * as StepperActions from './stepper.actions';
import { initialState, StepperState } from './stepper.state';

export const STEPPER_FEATURE_KEY = 'stepper';

const stepperReducer = createReducer(
  initialState,
  on(StepperActions.initStepper, (state, { steps }) => ({
    ...state,
    currentStep: 0,
    previousStep: 0,
    steps: steps,
    data: new Map<string, any>()
  })),
  on(StepperActions.resetStepper, (state) => ({
    ...state,
    currentStep: 0,
    previousStep: 0,
    data: new Map<string, any>(),
    steps: state.steps.map((step, index) => {
      if (index === 0) {
        return {
          ...step,
          isActive: true,
          isPast: true
        };
      } else {
        return {
          ...step,
          isActive: false,
          isPast: false
        };
      }
    })
  })),
  on(StepperActions.moveToStep, (state, { id }) => ({
    ...state,
    previousStep: state.currentStep,
    currentStep: state.steps.map((e) => e.id).indexOf(id),
    steps: state.steps.map((step, index) => {
      if (id === step.id) {
        return {
          ...step,
          isActive: true
        };
      } else {
        return {
          ...step,
          isActive: false
        };
      }
    })
  })),
  on(StepperActions.moveToCustomStep, (state, { id }) => ({
    ...state,
    previousStep: state.currentStep,
    currentStep: state.steps.map((e) => e.id).indexOf(id),
    steps: state.steps.map((step, index) => {
      const stepIndex = state.steps.map((e) => e.id).indexOf(id);
      if (index <= stepIndex) {
        return {
          ...step,
          isPast: true
        };
      } else {
        return {
          ...step,
          isPast: false
        };
      }
    })
  })),
  on(StepperActions.resetOnIndex, (state, { id }) => ({
    ...state,
    previousStep: +id - 1,
    currentStep: +id,
    steps: state.steps.map((step, index) => {
      if (+id === index) {
        return {
          ...step,
          isActive: true
        };
      } else if (index === +id - 1) {
        return {
          ...step,
          isPast: true,
          isActive: false
        };
      } else {
        return {
          ...step,
          isActive: false,
          isPast: false
        };
      }
    })
  })),
  on(StepperActions.blockStepper, (state, { id }) => ({
    ...state,
    steps: state.steps.map((step, index) => {
      if (index <= +id - 1) {
        return {
          ...step,
          isPast: true
        };
      } else {
        return {
          ...step,
          isPast: false
        };
      }
    })
  })),
  on(StepperActions.nextStep, (state) => ({
    ...state,
    previousStep: state.currentStep,
    currentStep: state.currentStep + 1,
    steps: state.steps.map((step, index) => {
      if (state.currentStep === index) {
        return {
          ...step,
          isActive: false
        };
      } else if (state.currentStep + 1 === index) {
        return {
          ...step,
          isActive: true,
          isPast: true
        };
      } else {
        return step;
      }
    })
  })),
  on(StepperActions.stepBack, (state) => ({
    ...state,
    previousStep: state.currentStep,
    currentStep:
      state.currentStep === 0 ? state.currentStep : state.currentStep - 1,
    steps: state.steps.map((step, index) => {
      if (state.currentStep === index) {
        return {
          ...step,
          isActive: false
        };
      } else if (state.currentStep - 1 === index) {
        return {
          ...step,
          isActive: true,
          isPast: true
        };
      } else {
        return step;
      }
    })
  })),
  on(StepperActions.updateData, (state, { id, data }) => ({
    ...state,
    data: state.data.set(id, data)
  })),
  on(StepperActions.cleanData, (state) => ({
    ...state,
    data: new Map<string, any>()
  }))
);

export function reducer(state: StepperState | undefined, action: Action) {
  return stepperReducer(state, action);
}
