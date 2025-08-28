import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertOriginComponent } from './insert.origin.component';

describe('InsertOriginComponent', () => {
  let component: InsertOriginComponent;
  let fixture: ComponentFixture<InsertOriginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertOriginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
