import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShopHeaderComponent } from './list-shop-header.component';

describe('ListShopHeaderComponent', () => {
  let component: ListShopHeaderComponent;
  let fixture: ComponentFixture<ListShopHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListShopHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListShopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
