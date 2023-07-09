import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPitchComponent } from './main-pitch.component';

describe('MainPitchComponent', () => {
  let component: MainPitchComponent;
  let fixture: ComponentFixture<MainPitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
