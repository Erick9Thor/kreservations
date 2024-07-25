import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewReservationComponent } from './review-reservation.component';

describe('ReviewReservationComponent', () => {
  let component: ReviewReservationComponent;
  let fixture: ComponentFixture<ReviewReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewReservationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
