import {Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import {CelebrationService} from "../../services/celebration.service";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";

class CelebrateService {
}

@Component({
    selector: 'app-celebration',
    templateUrl: './celebration.component.html',
    styleUrls: ['./celebration.component.scss']
})
export class CelebrationComponent implements OnInit {
    @ViewChild('hostess') hostess;

    public areCelebrating: boolean = false;
    public showHostess: boolean = false;
    public throwConfetti: boolean = false;
    public hostessShown: boolean = false;

    public defaultHostessTitle = "We're Celebrating!"
    public defaultHostessText = ""
    public hostessTitle = "We're Celebrating!"
    public hostessText = ""

    canvas: HTMLCanvasElement; // the reusable canvas element

    confettiCanvas; // the canvas function from confetti-canvas library

    confettiLib;

    constructor(private celebrationService: CelebrationService,
                router: Router,
                @Inject(PLATFORM_ID) private platformID: Object,
                private renderer2: Renderer2,
                private elementRef: ElementRef) {
        router.events
            .pipe(
                filter(event => event instanceof NavigationStart)
            ).subscribe(val => {
            this.checkConfetti();
        });
    }


    ngOnInit(): void {

        this.celebrationService.celebrationChange().subscribe(
            changed => {
                if (changed) {
                    this.checkConfetti();
                    this.checkHostess();
                }
            }
        )
    }

    checkHostess() {
        let celebration = this.celebrationService.currentCelebration();
        if (!celebration) {
            return;
        }
        this.showHostess = this.celebrationService.doDisplayHostess();
        this.setCelebrationText(celebration);

        if (this.showHostess && !this.hostessShown) {
            setTimeout(() => {
                this.popupHostess();
                this.hostessShown = true;
            }, 100);
        }
    }

    popupHostess() {
        this.hostess.show();
    }

    private setCelebrationText(celebration) {
        this.hostessTitle = celebration.hostess_greeting_title ? celebration.hostess_greeting_title : this.defaultHostessTitle;
        this.hostessText = celebration.hostess_greeting ? celebration.hostess_greeting : this.defaultHostessText;
    }

    private checkConfetti() {
        if (this.celebrationService.weAreCelebrating()) {
            this.areCelebrating = true;
            this.throwConfetti = this.celebrationService.doThrowConfetti();
        } else {
            this.areCelebrating = false;
            this.throwConfetti = false;
        }

        if (this.throwConfetti) {
            setTimeout(() => {
                this.throwThatConfetti();

            }, 500);
        }
    }

    async importCanvas(): Promise<any> {
        this.confettiLib = await import('canvas-confetti');
        this.canvas = this.renderer2.createElement('canvas');
        this.renderer2.addClass(this.canvas, 'confetti-canvas');
    }

    throwThatConfetti() {
        let checkCanvasConfettiExists = async () => Promise.resolve(); // set this to resolve regardless if confetti already exists
        if (!this.confettiCanvas) { // if not already imported, replace with importing function
            checkCanvasConfettiExists = this.importCanvas;
        }

        function finishAnimation() {
            setTimeout(() => {
                // return this.renderer2.removeChild(this.elementRef.nativeElement, this.canvas); // remove the canvas from the DOM
            }, 1000);

        }

        checkCanvasConfettiExists.call(this) // bind to 'this' as the importCanvas function will need the correct 'this'
            .then(() => {
                this.renderer2.appendChild(this.elementRef.nativeElement, this.canvas); // append the canvas

                this.confettiCanvas = this.confettiLib.create(this.canvas, {resize: true}); // create the confetti canvas
                const end = Date.now() + (3 * 1000); // set the end time
                const interval = setInterval(() => {
                    if (Date.now() > end) { // if time reached then clear the interval
                        clearInterval(interval);
                        finishAnimation();

                    }
                    this.confettiCanvas({ // if time hasn't passed then call the start the confetti
                        startVelocity: 30,
                        spread: 360,
                        ticks: 60,
                        colors: ['#e56d04', '#ffffff', '#e6b321', '#F23C16', '#e6b321', '#F23C16',
                            '#e6b321', '#F23C16', '#e6b321', '#e56d04', '#ffffff'],

                        shapes: ['square'],
                        zIndex: 2000,
                        origin: {
                            x: Math.random(),
                            // since they fall down, start a bit higher than random
                            y: Math.random() - 0.2
                        }
                    });
                }, 200);
            });
    }

}
