import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToasterService } from './toaster.service';

@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  providers: [ToasterService],
})
export class FeatureNotificationsModule {}
