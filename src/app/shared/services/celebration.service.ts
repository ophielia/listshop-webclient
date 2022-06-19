import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {TagService} from "./tag.service";
import {NGXLogger} from "ngx-logger";
import {Celebration, ICelebration} from "../../model/celebration";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import MappingUtils from "../../model/mapping-utils";

@Injectable({providedIn: 'root'})
export class CelebrationService implements OnDestroy {
    static instance: CelebrationService;
    static refreshPeriod = 5 * 60 * 1000;

    celebrationChangeSubject: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

    unsubscribe: Subscription[] = [];

    private _currentCelbration: Celebration;
    private _hostessCount: number;
    private _hostessEnabled: boolean;
    private _confettiCount: number;
    private _endCelebration: number;
    private _celebrationUrl: string;
    private _celebrationRefreshMillis: number;
    private _rawCelebrations: ICelebration[];
    private _configRefreshTime: number;

    constructor(private tagService: TagService,
                private httpClient: HttpClient,
                private logger: NGXLogger) {
        // If the static reference doesn't exist
        // (i.e. the class has never been instantiated before)
        // set it to the newly instantiated object of this class
        if (!CelebrationService.instance) {
            this._celebrationUrl = environment.celebrationUrl
            this._celebrationRefreshMillis = environment.celebrationRefreshMinutes * 60 * 1000;
            this.loadConfigurations();

            CelebrationService.instance = this;
        }

        // Return the static instance of the class
        // Which will only ever be the first instance
        // Due to the if statement above
        return CelebrationService.instance;
    }


    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());
    }

    private loadConfigurations() {
        this._configRefreshTime = new Date().getTime() + CelebrationService.refreshPeriod;


        this.checkExpiredCelebration()

        return this.getJSONConfig()
            .subscribe(data => {
                this._rawCelebrations = this.mapCelebrations(data);
                this.processRetrievedCelebrations();
            });
    }

    private refreshConfigurationIfNeeded() {
        if (new Date().getTime() > this._configRefreshTime) {
            this.loadConfigurations();
        }
    }

    private processRetrievedCelebrations() {
        if (this.currentCelebration() != null) {
            var currentFromConfig = this._rawCelebrations
                .filter(r => r.handle == this._currentCelbration.handle);
            if (!currentFromConfig || currentFromConfig.length == 0) {
                this.stopCelebration();
            } else {
                var cel = currentFromConfig[0];
                var end = new Date(cel.end_date);
                if ((new Date().getTime()) > end.getTime()) {
                    this.stopCelebration();
                }
            }

        }

        for (let c of this._rawCelebrations) {
            let start = c.start_date;
            let end = c.end_date;
            let startDate = new Date(start);
            let endDate = new Date(end);
            let now = new Date();
            if (startDate < now && endDate > now) {
                this.startCelebration(c);
                break;
            }
        }
    }

    private getJSONConfig(): Observable<any> {
        return this.httpClient.get(this._celebrationUrl);
    }

    private startCelebration(celebration: Celebration) {
        this._currentCelbration = celebration;
        this._hostessCount = 0;
        this._hostessEnabled = celebration.hostess_display;
        this._confettiCount = 0;
        var end = new Date(celebration.start_date)
        this._endCelebration = end.getTime();
        this.celebrationChangeSubject.next(true);
    }

    private stopCelebration() {
        this._currentCelbration = null;
        this._hostessCount = 0;
        this._hostessEnabled = false;
        this._confettiCount = 0;
        this._endCelebration = 0;
        this.celebrationChangeSubject.next(true);
    }

    public weAreCelebrating(): boolean {
        this.refreshConfigurationIfNeeded();
        // return value is currentCelebration exists and before end date or not
        return this._currentCelbration != null;
    }

    public celebrationChange(): Observable<Boolean> {
        return this.celebrationChangeSubject.asObservable();
    }

    private checkExpiredCelebration() {
        if (this._currentCelbration) {
            let currentTime = new Date().getTime();
            if (this._endCelebration < currentTime) {
                this.stopCelebration();
            }
        }
    }

    public currentCelebration(): Celebration {
        return this._currentCelbration;
    }

    public doDisplayHostess(): boolean {
        return this._hostessEnabled;
    }

    public doThrowConfetti(): boolean {
        this._confettiCount++;
        return this._confettiCount <= this._currentCelbration.throw_confetti_count;
    }

    private mapCelebrations(response: Object): Celebration[] {
        let object = response["celebrations"];
        if (object) {
            return object.map(MappingUtils.toCelebration);
        }
        return null;
    }

}
