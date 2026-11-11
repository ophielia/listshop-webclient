import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';

import {TokenGatewayComponent} from './token-gateway.component';

describe('TokenGatewayComponent', () => {
  let component: TokenGatewayComponent;
  let fixture: ComponentFixture<TokenGatewayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TokenGatewayComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
