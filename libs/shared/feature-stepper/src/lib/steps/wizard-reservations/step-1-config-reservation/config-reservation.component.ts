import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '@kreservations/data-access';
import { WizardStepperItem } from '@kreservations/models';
import { merge } from 'rxjs';

@Component({
  selector: 'lib-config-reservation',
  templateUrl: './config-reservation.component.html',
  styleUrl: './config-reservation.component.scss',
})
export class ConfigReservationComponent implements OnInit {
  @Output() nextStep = new EventEmitter();

  @Input()
  set data(value: WizardStepperItem) {
    this._data = value;
  }

  get data(): WizardStepperItem {
    return this._data;
  }

  _data: WizardStepperItem;

  reservationForm: FormGroup;
  sectors: { title: string; available: boolean }[] = [
    {
      title: 'Main Hall',
      available: true,
    },
    {
      title: 'Bar',
      available: true,
    },
    {
      title: 'Riverside',
      available: true,
    },
    {
      title: 'Riverside (smoking allowed)',
      available: true,
    },
  ];

  isBirthDay = false;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchData();
  }

  fetchData() {
    merge(
      this.reservationForm.get('partySize').valueChanges,
      this.reservationForm.get('smokers').valueChanges,
      this.reservationForm.get('childrens').valueChanges
    ).subscribe({
      next: () => {
        this.reservationForm.get('sector').enable();
        this.updateAvailability();
      },
    });

    this.reservationForm.get('birthdays').valueChanges.subscribe({
      next: (value) => {
        if (value) {
          this.reservationForm.addControl(
            'birthDayName',
            new FormControl('', Validators.required)
          );
        } else {
          this.reservationForm.removeControl('birthDayName');
        }

        this.isBirthDay = value;
      },
    });
  }

  initForm() {
    this.reservationForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required,
        Validators.maxLength(100),
      ]),
      phone: new FormControl('', [Validators.required]),

      partySize: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(12),
      ]),
      sector: new FormControl('', Validators.required),
      childrens: new FormControl(0, [
        Validators.required,
        this.childrenLessThanGroupSizeValidator(),
      ]),

      smokers: new FormControl(false, Validators.required),
      birthdays: new FormControl(false, Validators.required),
    });

    this.reservationForm.get('sector').disable();
  }

  updateAvailability() {
    this.sectors = this.sectors.map((sector) => {
      let available = false;
      switch (sector.title) {
        case 'Main Hall':
          available =
            this.reservationForm.get('partySize').value <= 12 &&
            !this.reservationForm.get('smokers').value;
          break;
        case 'Bar':
          available =
            this.reservationForm.get('partySize').value <= 4 &&
            this.reservationForm.get('childrens').value === 0 &&
            !this.reservationForm.get('smokers').value;
          break;
        case 'Riverside':
          available =
            this.reservationForm.get('partySize').value <= 8 &&
            !this.reservationForm.get('smokers').value;
          break;
        case 'Riverside (smoking allowed)':
          available =
            this.reservationForm.get('partySize').value <= 6 &&
            this.reservationForm.get('childrens').value === 0 &&
            this.reservationForm.get('smokers').value;
          break;
      }
      return { ...sector, available };
    });
  }

  onSubmit() {}

  childrenLessThanGroupSizeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const grupSize = control.get('partySize')?.value;
      const numChildren = control.get('childrens')?.value;

      return numChildren !== null &&
        grupSize !== null &&
        numChildren >= grupSize
        ? { childrenGreaterThanOrEqualGroupSize: true }
        : null;
    };
  }
}
