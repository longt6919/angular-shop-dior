import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEmployeeComponent } from './product.employee.component';

describe('ProductEmployeeComponent', () => {
  let component: ProductEmployeeComponent;
  let fixture: ComponentFixture<ProductEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
