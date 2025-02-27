import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { MatCardModule } from '@angular/material/card';
import { DirectivesModule } from '@kreservations/directives';

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
    MtxDatetimepickerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    DirectivesModule,
  ],
  declarations: [
    ConfigReservationComponent,
    ReviewReservationComponent,
    ConfirmComponent,
  ],
  providers: [DatePipe],
})
export class WizardAddMemberModule {}
