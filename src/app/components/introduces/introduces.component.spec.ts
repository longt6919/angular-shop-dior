import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroducesComponent } from './introduces.component';

describe('IntroducesComponent', () => {
  let component: IntroducesComponent;
  let fixture: ComponentFixture<IntroducesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroducesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroducesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
