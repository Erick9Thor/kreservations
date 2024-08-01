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
import {
  BaseComponent,
  UserReservation,
  WizardStepperItem,
} from '@kreservations/models';
import { merge, take, takeUntil } from 'rxjs';
import { StepperFacade } from '../../../store/stepper.facade';
import {
  AvailableHourDTO,
  CreateReservationDto,
} from '@kreservations/reservations-back/reservations';

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

  private _data: WizardStepperItem;

  reservationForm: FormGroup;

  // THIS SHOULD BE AN ENDPOINT, WITH INFO AND CAPACITY ETC...
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

  availableHours: AvailableHourDTO[];

  selectedHourIndex = null;
  previuousData: UserReservation = null;

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
    this.loadInitialData();
  }

  /**
   * Initializes the reservation form with validators.
   */
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

  /**
   * Subscribes to form value changes and updates availability accordingly.
   */
  fetchData(): void {
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
          this.handleBirthdayChange(value);
        },
      });

    this.reservationForm
      .get('date')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((date) => this.checkAvailability(date));
  }

  /**
   * Loads initial data into the form.
   */
  private loadInitialData(): void {
    this.stepperFacade.getData$.pipe(take(1)).subscribe((data) => {
      if (data.get(this.data.id)) {
        this.previuousData = data.get(this.data.id);

        this.reservationForm.patchValue(this.previuousData);
      }
    });
  }

  /**
   * Handles changes to the birthday checkbox.
   * @param value - The new value of the birthday checkbox.
   */
  private handleBirthdayChange(value: any): void {
    if (value) {
      this.reservationForm.addControl(
        'birthDayName',
        new FormControl('', Validators.required)
      );
    } else {
      this.reservationForm.removeControl('birthDayName');
    }

    this.isBirthDay = value;
  }

  /**
   * Checks availability of reservation based on selected date.
   * @param date - The selected date.
   */
  private checkAvailability(date: string): void {
    const timestamp = new Date(date).getTime();
    const partySize = this.reservationForm.get('partySize').value;
    const sector = this.reservationForm.get('sector').value;

    this.reservationService
      .checkAvailability(timestamp, partySize, sector)
      .pipe(take(1))
      .subscribe((response) => {
        this.availableHours = response;
        if (this.previuousData && this.previuousData.hour) {
          this.selectedHourIndex = this.availableHours.findIndex(
            (val) => val.title === this.previuousData.hour
          );
        }
      });
  }

  /**
   * Updates the availability of sectors based on form values.
   */
  private updateAvailability(): void {
    this.sectors = this.sectors.map((sector) => ({
      ...sector,
      available: this.isSectorAvailable(sector.title),
    }));
  }

  /**
   * Checks if a sector is available based on form values.
   * @param sector - The sector title.
   * @returns boolean - Availability of the sector.
   */
  private isSectorAvailable(sector: string): boolean {
    const partySize = this.reservationForm.get('partySize').value;
    const smokers = this.reservationForm.get('smokers').value;
    const childrens = this.reservationForm.get('childrens').value;

    switch (sector) {
      case 'Main Hall':
        return partySize <= 12 && !smokers;
      case 'Bar':
        return partySize <= 4 && childrens === 0 && !smokers;
      case 'Riverside':
        return partySize <= 8 && !smokers;
      case 'Riverside (smoking allowed)':
        return partySize <= 6 && childrens === 0 && smokers;
      default:
        return false;
    }
  }

  /**
   * Selects an available hour for reservation.
   * @param hour - The selected hour.
   * @param index - The index of the selected hour.
   */
  selectHour(hour: AvailableHourDTO, index: number): void {
    this.selectedHourIndex = index;
    if (hour && hour.available) {
      this.reservationForm.get('hour').setValue(hour.title);
    }
  }

  /**
   * Saves the current reservation data and emits the next step event.
   */
  saveData(): void {
    const reservation: CreateReservationDto = {
      ...this.reservationForm.value,
      date: new Date(this.reservationForm.value.date).getTime(),
    };

    this.stepperFacade.setStepData(this.data.id, reservation);
    this.nextStep.emit();
  }

  // CUSTOM VALIDATORS

  /**
   * Validator to ensure children count is less than the party size.
   * @returns ValidatorFn
   */
  private childrenLessThanGroupSizeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const groupSize = control.get('partySize')?.value;
      const numChildren = control.get('childrens')?.value;

      return numChildren !== null &&
        groupSize !== null &&
        numChildren >= groupSize
        ? { childrenGreaterThanOrEqualGroupSize: true }
        : null;
    };
  }

  /**
   * Validator to ensure the selected sector is valid based on form values.
   * @returns ValidatorFn
   */
  private sectorValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const form = control.parent;
      if (!form) return null;

      const groupSize = form.get('partySize').value;
      const smoke = form.get('smokers').value;
      const selectedSector = control.value;

      const isValid = this.isSectorAvailableBasedOnValues(
        selectedSector,
        groupSize,
        smoke,
        form.get('childrens').value
      );

      return isValid ? null : { invalidSector: true };
    };
  }

  /**
   * Checks if a sector is valid based on provided values.
   * @param sector - The sector title.
   * @param groupSize - The size of the party.
   * @param smoke - Whether the group includes smokers.
   * @param childrens - The number of children in the group.
   * @returns boolean - Validity of the sector.
   */
  private isSectorAvailableBasedOnValues(
    sector: string,
    groupSize: number,
    smoke: boolean,
    childrens: number
  ): boolean {
    switch (sector) {
      case 'Main Hall':
        return groupSize <= 12 && !smoke;
      case 'Bar':
        return groupSize <= 4 && childrens === 0 && !smoke;
      case 'Riverside':
        return groupSize <= 8 && !smoke;
      case 'Riverside (smoking allowed)':
        return groupSize <= 6 && childrens === 0 && smoke;
      default:
        return true;
    }
  }
}
