import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIngredientInlineComponent } from './edit-ingredient-inline.component';

describe('AddIngredientInlineComponent', () => {
  let component: EditIngredientInlineComponent;
  let fixture: ComponentFixture<EditIngredientInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIngredientInlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIngredientInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
