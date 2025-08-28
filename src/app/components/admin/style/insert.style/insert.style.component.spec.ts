import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertStyleComponent } from './insert.style.component';

describe('InsertStyleComponent', () => {
  let component: InsertStyleComponent;
  let fixture: ComponentFixture<InsertStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertStyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
