import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XLModalComponent } from './xlmodal.component';

describe('XLModalComponent', () => {
  let component: XLModalComponent;
  let fixture: ComponentFixture<XLModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XLModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XLModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
