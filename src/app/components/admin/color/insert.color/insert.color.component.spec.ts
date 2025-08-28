import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertColorComponent } from './insert.color.component';

describe('InsertColorComponent', () => {
  let component: InsertColorComponent;
  let fixture: ComponentFixture<InsertColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
