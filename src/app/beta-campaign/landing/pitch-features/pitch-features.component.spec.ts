import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchFeaturesComponent } from './pitch-features.component';

describe('PitchFeaturesComponent', () => {
  let component: PitchFeaturesComponent;
  let fixture: ComponentFixture<PitchFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PitchFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
