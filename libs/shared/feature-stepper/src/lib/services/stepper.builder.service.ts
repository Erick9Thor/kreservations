import { Injectable, Type } from '@angular/core';
import { SteppersType, WizardStepperItem } from '@kreservations/models';
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
      SteppersType.WIZARD_RESERVATIONS,
      [
        {
          id: 'config-reservation',
          isActive: true,
          isPast: false,
          title: 'Config reservation',
        },
        {
          id: 'review-reservation',
          isActive: false,
          isPast: false,
          title: 'Review reservation',
        },
        {
          id: 'confirm',
          isActive: false,
          isPast: false,
          title: 'Confirm reservation',
        },
      ],
    ],
  ]);

  stepsList = new Map<string, Type<any>>([
    ['config-reservation', ConfigReservationComponent],
    ['review-reservation', ReviewReservationComponent],
    ['confirme', ConfirmComponent],
  ]);

  getWizardSteps(id: string): WizardStepperItem[] | undefined {
    return this.wizardsConfig.get(id);
  }

  getStepComponent(id: string): Type<any> {
    return this.stepsList.get(id);
  }
}
