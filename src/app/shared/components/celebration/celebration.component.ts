import {Component, OnInit} from '@angular/core';
import {CelebrationService} from "../../services/celebration.service";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
    selector: 'app-celebration',
    templateUrl: './celebration.component.html',
    styleUrls: ['./celebration.component.scss']
})
export class CelebrationComponent implements OnInit {

    constructor(private celebrationService: CelebrationService,
                router: Router) {
        router.events
            .pipe(
                filter(event => event instanceof NavigationStart)
            ).subscribe(val => {
            this.checkCelebrations();
        });
    }

    public areCelebrating: boolean = false;
    public showHostess: boolean = false;
    public throwConfetti: boolean = false;

    ngOnInit(): void {
        this.checkCelebrations();
        this.celebrationService.celebrationChange().subscribe(
            changed => {
                if (changed) {
                    this.checkCelebrations();
                }
            }
        )
    }


    private checkCelebrations() {
        if (this.celebrationService.weAreCelebrating()) {
            this.areCelebrating = true;
            this.showHostess = this.celebrationService.doDisplayHostess();
            this.throwConfetti = this.celebrationService.doThrowConfetti();

        }
    }
}
