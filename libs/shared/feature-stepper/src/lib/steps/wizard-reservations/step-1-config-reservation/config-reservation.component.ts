import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '@kreservations/data-access';

@Component({
  selector: 'lib-config-reservation',
  templateUrl: './config-reservation.component.html',
  styleUrl: './config-reservation.component.scss',
})
export class ConfigReservationComponent {
  reservationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      partySize: ['', [Validators.required, Validators.max(12)]],
      region: ['', Validators.required],
      children: [0, Validators.required],
      smoking: [false],
      birthday: [false],
      birthdayName: [''],
    });
  }

  onSubmit() {
    if (this.reservationService.checkAvailability(this.reservationForm.value)) {
      this.reservationService.setReservationDetails(this.reservationForm.value);
      this.router.navigate(['/review']);
    } else {
      alert('Selected slot is not available. Please choose another.');
    }
  }
}
