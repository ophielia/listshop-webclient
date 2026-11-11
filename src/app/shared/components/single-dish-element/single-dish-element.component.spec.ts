import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {SingleDishElementComponent} from "./single-dish-element.component";



describe('ManageListsComponent', () => {
  let component: SingleDishElementComponent;
  let fixture: ComponentFixture<SingleDishElementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDishElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDishElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
