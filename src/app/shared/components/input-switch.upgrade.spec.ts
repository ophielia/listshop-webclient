import {Component} from '@angular/core';
import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {ToggleSwitchModule} from 'primeng/toggleswitch';

@Component({
    template: '<p-toggleswitch [(ngModel)]="enabled" [disabled]="disabled" (onChange)="selected = $event.checked"></p-toggleswitch>',
    standalone: false
})
class SwitchHostComponent {
  enabled = false;
  disabled = false;
  selected: boolean;
}

describe('List and meal-plan switch integration', () => {
  it('updates the form model and event value, and respects disabled state', fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SwitchHostComponent], imports: [FormsModule, ToggleSwitchModule]
    });
    const fixture = TestBed.createComponent(SwitchHostComponent);
    fixture.detectChanges();
    tick();
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.click();
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.enabled).toBe(true);
    expect(fixture.componentInstance.selected).toBe(true);
    input.click();
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.enabled).toBe(false);
    expect(fixture.componentInstance.selected).toBe(false);
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    tick();
    expect(input.disabled).toBe(true);
    input.click();
    expect(fixture.componentInstance.enabled).toBe(false);
    fixture.destroy();
  }));
});
