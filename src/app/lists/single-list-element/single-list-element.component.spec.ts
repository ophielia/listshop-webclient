import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleListElementComponent } from './manage-lists.component';

describe('ManageListsComponent', () => {
  let component: SingleListElementComponent;
  let fixture: ComponentFixture<SingleListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
