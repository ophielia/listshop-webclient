import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPartyComponent } from './landing-party.component';

describe('LandingPartyComponent', () => {
  let component: LandingPartyComponent;
  let fixture: ComponentFixture<LandingPartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
