import {Directive, ViewContainerRef} from '@angular/core';
import {CelebrationService} from "../services/celebration.service";

@Directive({
  selector: '[appMyIsParty]'
})
export class MyIsPartyDirective {
  private hasView = false;

  constructor(private celebrationService: CelebrationService,
              private viewContainer: ViewContainerRef) {
    this.celebrationService.celebrationChange().subscribe(
        changed => {
          if (changed) {
            this.showOrHideElement();
          }
        }
    )
  }

  private showOrHideElement() {
    if (!this.hasView && this.celebrationService.weAreCelebrating()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
