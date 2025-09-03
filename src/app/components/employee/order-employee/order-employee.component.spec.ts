import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEmployeeComponent } from './order-employee.component';

describe('OrderEmployeeComponent', () => {
  let component: OrderEmployeeComponent;
  let fixture: ComponentFixture<OrderEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
