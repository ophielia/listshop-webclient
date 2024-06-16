import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientInlineComponent } from './add-ingredient-inline.component';

describe('AddIngredientInlineComponent', () => {
  let component: AddIngredientInlineComponent;
  let fixture: ComponentFixture<AddIngredientInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIngredientInlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIngredientInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
