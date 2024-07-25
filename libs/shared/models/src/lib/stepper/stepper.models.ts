import { Type } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface WizardStepperItem {
  id: string;
  title: string;
  isPast: boolean;
  isActive: boolean;
  stepController?: FormGroup | FormControl;
  stepComponent: Type<any>;
}

export class AddStep {
  completed: boolean;
  label: string;

  constructor(public component: Type<any>, public data: any) {}
}

export enum SteppersType {
  WIZARD_RESERVATIONS = 'wizard-reservations',
}
