import {ElementRef} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {Subject} from 'rxjs';
import {EditPlanComponent} from './edit-plan.component';
import {MealPlan} from '../../model/mealplan';

describe('Meal plan list generation loading state', () => {
  let component: EditPlanComponent;
  let response: Subject<HttpResponse<Object>>;
  let dialog: HTMLDialogElement;
  let listService: any;
  let router: any;

  beforeEach(() => {
    response = new Subject<HttpResponse<Object>>();
    listService = {createListFromMealPlan: jasmine.createSpy().and.returnValue(response)};
    router = {navigateByUrl: jasmine.createSpy()};
    component = new EditPlanComponent(null, null, null, null, router, listService, null, null, null, null);
    component.mealPlan = {meal_plan_id: 'plan-1'} as MealPlan;
    dialog = document.createElement('dialog');
    document.body.appendChild(dialog);
    component.generationDialog = new ElementRef(dialog);
  });

  afterEach(() => {
    component.ngOnDestroy();
    dialog.remove();
  });

  it('opens a screen-blocking modal immediately and prevents duplicate requests', () => {
    component.generateList();
    component.generateList();
    expect(dialog.matches(':modal')).toBe(true);
    expect(component.isGeneratingList).toBe(true);
    expect(listService.createListFromMealPlan).toHaveBeenCalledTimes(1);
    expect(listService.createListFromMealPlan).toHaveBeenCalledWith('plan-1', true);
  });

  it('navigates to the generated list and closes the modal on completion', () => {
    component.generateList();
    response.next(new HttpResponse({headers: new HttpHeaders({Location: '/shoppinglist/list-1'})}));
    response.complete();
    expect(router.navigateByUrl).toHaveBeenCalledWith('lists/edit/list-1');
    expect(dialog.open).toBe(false);
    expect(component.isGeneratingList).toBe(false);
  });

  it('unblocks the page after failure and clears the error on retry', () => {
    component.generateList();
    response.error(new Error('Server unavailable'));
    expect(dialog.open).toBe(false);
    expect(component.isGeneratingList).toBe(false);
    expect(component.generationError).toContain('Please try again');
    listService.createListFromMealPlan.and.returnValue(new Subject());
    component.generateList();
    expect(component.generationError).toBeNull();
    expect(dialog.matches(':modal')).toBe(true);
  });

  it('removes the modal when destroyed during a pending request', () => {
    component.generateList();
    component.ngOnDestroy();
    expect(dialog.open).toBe(false);
    expect(component.isGeneratingList).toBe(false);
    expect(response.observers.length).toBe(0);
  });
});
