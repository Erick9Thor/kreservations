import { Injectable, Type } from '@angular/core';
import { WizardStepperItem } from '@kreservations/models';
import {
  ConfigReservationComponent,
  ConfirmComponent,
  ReviewReservationComponent,
} from '../steps';

@Injectable({
  providedIn: 'root',
})
export class StepperUserBuilderService {
  wizardsConfig = new Map<string, WizardStepperItem[]>([
    [
      'wizard-reservations',
      [
        {
          id: 'config-reservation',
          isActive: true,
          isPast: false,
          title: 'Config reservation',
          stepComponent: ConfigReservationComponent,
        },
        {
          id: 'review-reservation',
          isActive: false,
          isPast: false,
          title: 'Review reservation',
          stepComponent: ReviewReservationComponent,
        },
        {
          id: 'confirm',
          isActive: false,
          isPast: false,
          title: 'Confirm reservation',
          stepComponent: ConfirmComponent,
        },
      ],
    ],
  ]);

  getWizardSteps(id: string): WizardStepperItem[] {
    return this.wizardsConfig.get(id);
  }
}
