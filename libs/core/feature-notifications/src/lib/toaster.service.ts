import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ToasterService {
  constructor(private readonly snackBar: MatSnackBar) {}

  /**
   * Presents a toast displaying the message with a green background
   * @param message Message to display
   * @example
   * this.ToastrService.success("confirm oked");
   */
  success(message: string) {
    this.openSnackBar(message, '', 'success-snackbar');
  }

  /**
   * Presents a toast displaying the message with a red background
   * @param message Message to display
   * @example
   * this.ToastrService.error("confirm canceled");
   */
  error(message: string) {
    this.openSnackBar(message, '', 'error-snackbar');
  }

  /**
   * Presents a toast displaying the message with a yellow background
   * @param message Message to display
   * @example
   * this.ToastrService.warning("confirm canceled");
   */
  warning(message: string) {
    this.openSnackBar(message, '', 'warning-snackbar');
  }

  /**
   * Displays a toast with provided message
   * @param message Message to display
   * @param action Action text, e.g. Close, Done, etc
   * @param className Optional extra css class to apply
   * @param duration Optional number of SECONDS to display the notification for
   */
  openSnackBar(
    message: string,
    action: string,
    className = '',
    duration = 3000
  ) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: [className],
    });
  }
}
