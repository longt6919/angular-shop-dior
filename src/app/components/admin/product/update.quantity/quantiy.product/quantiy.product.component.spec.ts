import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantiyProductComponent } from './quantiy.product.component';

describe('QuantiyProductComponent', () => {
  let component: QuantiyProductComponent;
  let fixture: ComponentFixture<QuantiyProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantiyProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantiyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
