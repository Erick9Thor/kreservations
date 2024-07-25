import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AddStep, WizardStepperItem } from '@kreservations/models';
import { BehaviorSubject, Subject, take, takeUntil } from 'rxjs';
import { StepperFacade } from '../store/stepper.facade';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import { StepperUserBuilderService } from '../services/stepper.builder.service';

@Component({
  selector: 'reservations-stepper',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ViewComponent implements AfterViewInit, OnDestroy {
  @Input() linear = true;
  @Input() labelPosition: 'bottom' | 'end' = 'bottom';
  @Input() hideReset: boolean;

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;

  @ViewChild('stepper') stepper: MatStepper;

  lastStep: number;
  currentStep = 0;

  steps$ = new BehaviorSubject<AddStep[]>([]);

  ngUnsubscribe$ = new Subject();
  ngDestroy$ = new Subject();

  constructor(
    private stepperFacade: StepperFacade,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private stepperUserBuilderService: StepperUserBuilderService
  ) {}

  ngAfterViewInit() {
    this.createStepProcess();

    this.steps$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((steps) => {
      if (steps.length > 0) {
        this.initStepper();
      }
    });
  }

  ngOnDestroy(): void {
    this.ngDestroy$.complete();
    this.ngUnsubscribe$.next(1);
    this.ngUnsubscribe$.complete();
  }

  createStepProcess() {
    this.stepperFacade?.steps$
      .pipe(takeUntil(this.ngUnsubscribe$), take(1))
      .subscribe((steps: WizardStepperItem[]) => {
        if (steps && steps.length > 0) {
          this.lastStep = steps.length;

          if (steps && steps.length > 0) {
            this.steps$.next(
              steps.map(
                (stepItem: WizardStepperItem) =>
                  new AddStep(
                    this.stepperUserBuilderService.getStepComponent(
                      stepItem.id
                    ),
                    {
                      ...stepItem,
                      id: stepItem.id,
                      stepController: new FormGroup([]),
                    }
                  )
              )
            );
          }

          this.cdr.detectChanges();
        }
      });
  }

  initStepper() {
    this.stepperFacade.currentStep$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((currentStep) => {
        const currentPath = decodeURIComponent(
          window.location.pathname.toString()
        );

        this.currentStep = currentStep;

        if (currentStep === 0) {
          this.stepperNavigate(currentPath, 0);
        } else if (currentStep === 1) {
          this.stepperNavigate(currentPath, this.currentStep);
          this.stepperFacade.resetOnIndex('1');
        } else {
          this.stepperNavigate(currentPath, this.currentStep);
        }

        this.loadComponent();
      });
  }

  private stepperNavigate(path: string, currentStep: number): void {
    if (this.currentStep !== this.lastStep) {
      this.route.queryParams.pipe(take(1)).subscribe((queryParams) => {
        this.router.navigate([path], {
          queryParams: { ...queryParams, s: currentStep + 1 },
          replaceUrl: currentStep + 1 === 1,
        });
      });
    }
  }

  private loadComponent() {
    const step = this.steps$.value[this.currentStep];

    if (step == null) return;

    const viewContainerRef = this.container;

    if (viewContainerRef) viewContainerRef.clear();
    else return;

    if (step.component === null) return;
    const componentRef = viewContainerRef?.createComponent(step.component);

    componentRef.instance.data = step.data;

    componentRef.instance.nextStep?.pipe(take(1)).subscribe(() => {
      this.nextStep();
    });

    componentRef.instance.previousStep?.pipe(take(1)).subscribe(() => {
      this.previousStep();
    });

    componentRef.instance.resetStepper?.pipe(take(1)).subscribe(() => {
      this.resetStepper();
    });

    this.cdr.detectChanges();
  }

  nextStep() {
    this.stepperFacade.nextStep();
    this.stepper.next();
  }

  previousStep() {
    this.stepperFacade.stepBack();
    this.stepper.previous();
  }

  goToStepIndex(index: number) {
    if (
      this.steps$.value[index].data.id ===
      this.steps$.value[this.currentStep].data.id
    ) {
      return;
    }
    this.stepperFacade.moveToStep(this.steps$.value[index].data.id);
  }

  resetStepper() {
    this.stepperFacade.resetStepper();
    this.stepper.reset();
  }
}
