import { WizardStepperItem } from '@kreservations/models';

export interface StepperState {
  steps: WizardStepperItem[];
  currentStep: number;
  previousStep: number;
  data: Map<string, any>;
}

export const initialState: StepperState = {
  steps: [],
  currentStep: 0,
  previousStep: 0,
  data: new Map<string, any>(),
};
