import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStyleComponent } from './update.style.component';

describe('UpdateStyleComponent', () => {
  let component: UpdateStyleComponent;
  let fixture: ComponentFixture<UpdateStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
