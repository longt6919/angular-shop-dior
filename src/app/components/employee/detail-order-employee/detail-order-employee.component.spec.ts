import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderEmployeeComponent } from './detail-order-employee.component';

describe('DetailOrderEmployeeComponent', () => {
  let component: DetailOrderEmployeeComponent;
  let fixture: ComponentFixture<DetailOrderEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOrderEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailOrderEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
