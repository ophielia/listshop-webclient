import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {NGXLogger} from 'ngx-logger';
import {of} from 'rxjs';
import {TagSelectComponent} from './tag-select.component';
import {TagSelectInlineComponent} from '../tag-select-inline/tag-select-inline.component';
import {DishSelectComponent} from '../dish-select/dish-select.component';
import {TagService} from '../../services/tag.service';
import {TagTreeService} from '../../services/tag-tree.service';

[TagSelectComponent, TagSelectInlineComponent].forEach(component => {
describe(component.name + ' autocomplete integration', () => {
  let fixture: ComponentFixture<TagSelectComponent | TagSelectInlineComponent>;
  const tags = [{tag_id: '1', name: 'Carrot', tag_type: 'Ingredient'}];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagSelectComponent, TagSelectInlineComponent],
      imports: [FormsModule, AutoCompleteModule, NoopAnimationsModule],
      providers: [
        {provide: NGXLogger, useValue: {debug: () => {}}},
        {provide: TagService, useValue: {}},
        {provide: TagTreeService, useValue: {allContentList: () => of(tags)}}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent<TagSelectComponent | TagSelectInlineComponent>(component);
    fixture.componentInstance.tagTypes = 'Ingredient';
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => fixture.destroy());

  it('filters typed text, selects a suggestion and clears the input', fakeAsync(() => {
    const selected = spyOn(fixture.componentInstance.tagSelected, 'emit');
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.focus();
    input.value = 'carr';
    input.dispatchEvent(new Event('input'));
    tick(250);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const suggestion: HTMLElement = fixture.nativeElement.querySelector('.p-autocomplete-option');
    expect(suggestion.textContent).toContain('Carrot');
    suggestion.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(selected).toHaveBeenCalledWith(jasmine.objectContaining({tag_id: '1', name: 'Carrot'}));
    expect(input.value).toBe('');
    flush();
  }));

  it('offers creation for unmatched text and lets the user cancel', fakeAsync(() => {
    fixture.componentInstance.allowAdd = true;
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'New ingredient';
    input.dispatchEvent(new Event('input'));
    tick(250);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.add-link').textContent).toContain('Ingredient');
    fixture.nativeElement.querySelector('.cancel-link').click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(input.value).toBe('');
    expect(fixture.nativeElement.querySelector('.ls-panel')).toBeNull();
    flush();
  }));

  it('selects the sole matching tag with Enter', fakeAsync(() => {
    const selected = spyOn(fixture.componentInstance.tagSelected, 'emit');
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.focus();
    input.value = 'carr';
    input.dispatchEvent(new Event('input'));
    tick(250);
    fixture.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter', bubbles: true}));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(selected.calls.count()).toBe(1);
    expect(selected).toHaveBeenCalledWith(jasmine.objectContaining({tag_id: '1', name: 'Carrot'}));
    expect(input.value).toBe('');
    flush();
  }));
});
});

describe('Shared dish autocomplete integration', () => {
  let fixture: ComponentFixture<DishSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DishSelectComponent],
      imports: [FormsModule, AutoCompleteModule, NoopAnimationsModule],
      providers: [{provide: NGXLogger, useValue: {debug: () => {}}}]
    }).compileComponents();
    fixture = TestBed.createComponent(DishSelectComponent);
    fixture.componentInstance.dishList = [{
      dish_id: '42', name: 'Carrot soup', user_id: '1', description: '',
      last_added: 0, reference: '', tags: [], ingredients: [], ratings: []
    }];
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => fixture.destroy());

  it('emits the selected dish and clears the input', fakeAsync(() => {
    const selected = spyOn(fixture.componentInstance.dishSelected, 'emit');
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.focus();
    input.value = 'soup';
    input.dispatchEvent(new Event('input'));
    tick(350);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const suggestion: HTMLElement = fixture.nativeElement.querySelector('.p-autocomplete-option');
    expect(suggestion.textContent).toContain('Carrot soup');
    suggestion.click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(selected).toHaveBeenCalledWith(jasmine.objectContaining({dish_id: '42', name: 'Carrot soup'}));
    expect(input.value).toBe('');
    flush();
  }));
});
