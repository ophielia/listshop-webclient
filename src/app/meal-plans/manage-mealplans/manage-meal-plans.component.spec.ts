import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMealPlansComponent } from './manage-lists.component';

describe('ManageListsComponent', () => {
  let component: ManageMealPlansComponent;
  let fixture: ComponentFixture<ManageMealPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMealPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMealPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
