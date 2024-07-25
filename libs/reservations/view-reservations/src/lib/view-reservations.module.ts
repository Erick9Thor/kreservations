import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLoaderStepperComponent } from './view-loader-stepper/view-loader-stepper.component';
import { RouterModule, Routes } from '@angular/router';
import { FeatureStepperModule } from '@kreservations/feature-stepper';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewLoaderStepperComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FeatureStepperModule],
  declarations: [ViewLoaderStepperComponent],
})
export class ViewReservationsModule {}
