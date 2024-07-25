import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [CommonModule, MatStepperModule],
  declarations: [ViewComponent],
  exports: [ViewComponent],
})
export class FeatureStepperModule {}
