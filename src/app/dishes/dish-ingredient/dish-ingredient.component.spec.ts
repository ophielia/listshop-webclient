import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishIngredientComponent } from './dish-ingredient.component';

describe('DishIngredientComponent', () => {
  let component: DishIngredientComponent;
  let fixture: ComponentFixture<DishIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
