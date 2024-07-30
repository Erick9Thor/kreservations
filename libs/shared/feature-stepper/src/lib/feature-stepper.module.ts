import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { ViewComponent } from './view/view.component';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDatetimeAdapter } from '@ng-matero/extensions/core';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatStepperModule, MatSelectModule],
  declarations: [ViewComponent],
  exports: [ViewComponent],
  providers: [provideNativeDatetimeAdapter()],
})
export class FeatureStepperModule {}
