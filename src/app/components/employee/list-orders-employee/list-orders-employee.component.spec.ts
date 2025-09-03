import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdersEmployeeComponent } from './list-orders-employee.component';

describe('ListOrdersEmployeeComponent', () => {
  let component: ListOrdersEmployeeComponent;
  let fixture: ComponentFixture<ListOrdersEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrdersEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrdersEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
