import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOriginComponent } from './update.origin.component';

describe('UpdateOriginComponent', () => {
  let component: UpdateOriginComponent;
  let fixture: ComponentFixture<UpdateOriginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOriginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
