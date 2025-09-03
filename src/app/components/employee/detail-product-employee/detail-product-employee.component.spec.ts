import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProductEmployeeComponent } from './detail-product-employee.component';

describe('DetailProductEmployeeComponent', () => {
  let component: DetailProductEmployeeComponent;
  let fixture: ComponentFixture<DetailProductEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailProductEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProductEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
