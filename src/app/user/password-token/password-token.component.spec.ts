import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PasswordTokenComponent} from './password-token.component';

describe('PasswordTokenComponent', () => {
  let component: PasswordTokenComponent;
  let fixture: ComponentFixture<PasswordTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordTokenComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
