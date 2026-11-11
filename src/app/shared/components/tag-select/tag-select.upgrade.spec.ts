import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {NGXLogger} from 'ngx-logger';
import {of} from 'rxjs';
import {TagSelectComponent} from './tag-select.component';
import {TagService} from '../../services/tag.service';
import {TagTreeService} from '../../services/tag-tree.service';

describe('Shared tag autocomplete integration', () => {
  let fixture: ComponentFixture<TagSelectComponent>;
  const tags = [{tag_id: '1', name: 'Carrot', tag_type: 'Ingredient'}];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagSelectComponent],
      imports: [FormsModule, AutoCompleteModule, NoopAnimationsModule],
      providers: [
        {provide: NGXLogger, useValue: {debug: () => {}}},
        {provide: TagService, useValue: {}},
        {provide: TagTreeService, useValue: {allContentList: () => of(tags)}}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TagSelectComponent);
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
    const suggestion: HTMLElement = fixture.nativeElement.querySelector('.p-autocomplete-item');
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
    expect(fixture.nativeElement.textContent).toContain('Add as Ingredient');
    fixture.nativeElement.querySelector('.cancel-link').click();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(input.value).toBe('');
    expect(fixture.nativeElement.querySelector('.ls-panel')).toBeNull();
  }));
});
