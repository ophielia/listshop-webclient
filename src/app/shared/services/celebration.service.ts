import {Injectable, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {TagService} from "./tag.service";
import {NGXLogger} from "ngx-logger";
import {Celebration} from "../../model/celebration";

@Injectable({providedIn: 'root'})
export class CelebrationService implements OnDestroy {
    static instance: CelebrationService;
    static refreshPeriod = 5 * 60 * 1000;

    unsubscribe: Subscription[] = [];

    private _currentCelbration: Celebration;
    private _hostessCount: number;
    private _confettiCount: number;
    private _endCelebration: Date;

    constructor(private tagService: TagService,
                private logger: NGXLogger) {
        // If the static reference doesn't exist
        // (i.e. the class has never been instantiated before)
        // set it to the newly instantiated object of this class
        if (!CelebrationService.instance) {
            CelebrationService.instance = this;
        }

        this.loadConfigurations();
        // Return the static instance of the class
        // Which will only ever be the first instance
        // Due to the if statement above
        return CelebrationService.instance;
    }


    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());
    }

    private loadConfigurations() {
        // loads configurations from server
        // by calling static resource on server
        // https://nastyvarmits.fr/api/static/features.json


        //dummy code
        var celebration = new Celebration();
        celebration.handle = "bob";
        celebration.throw_confetti_count = 2;
        this.startCelebration(celebration);
    }

    private startCelebration(celebration: Celebration) {
        this._currentCelbration = celebration;
        this._hostessCount = 0;
        this._confettiCount = 0;
    }

    private stopCelebration() {
        this._currentCelbration = null;
        this._hostessCount = 0;
        this._confettiCount = 0;
    }

    public weAreCelebrating(): boolean {
        // return value is currentCelebration exists and before end date or not
        var celebrating = this._currentCelbration != null;
        // refresh celebrations
        return celebrating;
    }

    public currentCelebration(): Celebration {
        return this._currentCelbration;
    }

    public doDisplayHostess(): boolean {
        this._hostessCount++;
        return this._hostessCount == 1;
    }

    public doThrowConfetti(): boolean {
        this._confettiCount++;
        return this._confettiCount <= this._currentCelbration.throw_confetti_count;
    }


}
