import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBasicSpinnerDirective } from './spinner/mat-basic-spinner.directive';
import { MatGlowDirective } from './spinner/mat-glow.directive';

@NgModule({
  imports: [CommonModule, MatGlowDirective, MatBasicSpinnerDirective],
  exports: [MatGlowDirective, MatBasicSpinnerDirective],
})
export class DirectivesModule {}
