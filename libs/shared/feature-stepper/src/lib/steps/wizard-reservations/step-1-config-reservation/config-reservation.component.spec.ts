import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigReservationComponent } from './config-reservation.component';

describe('ConfigReservationComponent', () => {
  let component: ConfigReservationComponent;
  let fixture: ComponentFixture<ConfigReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigReservationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
