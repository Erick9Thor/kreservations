import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewLoaderStepperComponent } from './view-loader-stepper.component';

describe('ViewLoaderStepperComponent', () => {
  let component: ViewLoaderStepperComponent;
  let fixture: ComponentFixture<ViewLoaderStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewLoaderStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewLoaderStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
