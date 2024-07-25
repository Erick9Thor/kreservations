import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { ConfigReservationComponent } from './step-1-config-reservation/config-reservation.component';
import { ReviewReservationComponent } from './step-2-review-reservation/review-reservation.component';
import { ConfirmComponent } from './step-3-confirm/confirm.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
  ],
  declarations: [
    ConfigReservationComponent,
    ReviewReservationComponent,
    ConfirmComponent,
  ],
})
export class WizardAddMemberModule {}
