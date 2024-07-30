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
import { ReservationService } from '@kreservations/data-access';
import { BaseComponent, WizardStepperItem } from '@kreservations/models';
import { merge, take, takeUntil } from 'rxjs';
import { StepperFacade } from '../../../store/stepper.facade';

@Component({
  selector: 'lib-config-reservation',
  templateUrl: './config-reservation.component.html',
  styleUrl: './config-reservation.component.scss',
})
export class ConfigReservationComponent
  extends BaseComponent
  implements OnInit
{
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

  // DATE TIME CONTROL. JUST FORCE THE DATES FROM SPECS
  minDate = new Date('2024-07-24'); // YYYY-MM-DDTHH:mm:ss.sssZ
  maxDate = new Date('2024-07-31');

  availableHours: { title: string; available: boolean }[];

  selectedDateIndex = null;

  constructor(
    private fb: FormBuilder,
    private stepperFacade: StepperFacade,
    private reservationService: ReservationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.fetchData();
  }

  fetchData() {
    merge(
      this.reservationForm.get('partySize').valueChanges,
      this.reservationForm.get('smokers').valueChanges,
      this.reservationForm.get('childrens').valueChanges
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          if (this.reservationForm.get('sector').disabled) {
            this.reservationForm.get('sector').enable();
          }

          this.updateAvailability();

          this.reservationForm.get('sector').updateValueAndValidity();
        },
      });

    this.reservationForm
      .get('birthdays')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe({
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

    this.reservationForm
      .get('date')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (date) => {
          this.reservationService
            .checkAvailability(date)
            .pipe(take(1))
            .subscribe({
              next: (response) => (this.availableHours = response),
            });
        },
      });

    this.stepperFacade.getData$.pipe(take(1)).subscribe((data) => {
      if (data.get(this.data.id)) {
        this.reservationForm.patchValue(data.get(this.data.id));

        // TODO
        this.selectedDateIndex = 0;
      }
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
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      phone: new FormControl('', [Validators.required]),

      partySize: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(12),
      ]),
      sector: new FormControl('', [
        Validators.required,
        this.sectorValidator(),
      ]),
      childrens: new FormControl(0, [
        Validators.required,
        this.childrenLessThanGroupSizeValidator(),
      ]),

      smokers: new FormControl(false, Validators.required),
      birthdays: new FormControl(false, Validators.required),

      date: new FormControl('', Validators.required),
      hour: new FormControl('', Validators.required),
    });

    this.data.stepController = this.reservationForm;

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

  selectHour(hour: { title: string; available: boolean }) {
    if (hour && hour.available) {
      this.reservationForm.get('hour').setValue(hour.title);
    }
  }

  saveData() {
    this.stepperFacade.setStepData(this.data.id, this.reservationForm.value);
    this.nextStep.emit();
  }

  // CUSTOM VALIDATORS

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

  sectorValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control.parent;
      if (!form) {
        return null;
      }

      const grupSize = form.get('partySize').value;
      const smoke = form.get('smokers').value;
      const selectedSector = control.value;

      let isValid = false;

      switch (selectedSector) {
        case 'Main Hall':
          isValid = grupSize <= 12 && !smoke;
          break;
        case 'Bar':
          isValid =
            grupSize <= 4 && form.get('childrens').value === 0 && !smoke;
          break;
        case 'Riverside':
          isValid = grupSize <= 8 && !smoke;
          break;
        case 'Riverside (smoking allowed)':
          isValid = grupSize <= 6 && form.get('childrens').value === 0 && smoke;
          break;
        default:
          isValid = true;
      }

      return isValid ? null : { invalidSector: true };
    };
  }
}
