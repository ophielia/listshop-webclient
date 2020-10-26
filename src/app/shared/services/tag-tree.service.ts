import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import TagType from "../../model/tag-type";
import {ITag} from "../../model/tag";
import {BehaviorSubject, Observable, of, pipe, Subject, Subscription} from "rxjs";
import {catchError, filter, map, tap} from "rxjs/operators";
import 'rxjs/add/observable/of';
import {ContentType, GroupType, TagTree} from "./tag-tree.object";
import {TagService} from "./tag.service";
import {NGXLogger} from "ngx-logger";
import {HttpResponse} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class TagTreeService implements OnDestroy {
    static instance: TagTreeService;
    static refreshPeriod = 5 * 60 * 1000;

    loadingEvent: EventEmitter<Boolean> = new EventEmitter<Boolean>();
    isLoadingSubject: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(true);
    private isLoading: boolean = false;
    unsubscribe: Subscription[] = [];
    private _tagTree: TagTree;
    private _lastLoaded: number;

    constructor(private tagService: TagService,
                private logger: NGXLogger) {
        // If the static reference doesn't exist
        // (i.e. the class has never been instantiated before)
        // set it to the newly instantiated object of this class
        if (!TagTreeService.instance) {
            this.createOrRefreshTagTree();
            TagTreeService.instance = this;
        }

        // Return the static instance of the class
        // Which will only ever be the first instance
        // Due to the if statement above
        return TagTreeService.instance;
    }


    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());
    }

    async navigationList(tagId: string): Promise<ITag[]> {
        await this.finishedLoading();

        return this._tagTree.navigationList(tagId);
    }

    // MM make into async, which awaits tag tree
     allContentList(id: string, contentType: ContentType, isAbbreviated: boolean, groupType: GroupType,
                   tagTypes: TagType[]): Observable<ITag[]> {
        this.logger.debug("in all contentlist - before loading gateway");
        let observable =   this.isLoadingSubject.asObservable()
             .pipe(tap( result => this.logger.debug("in observable, finishedLoading: " + result)))
             .pipe(filter( value => value == false))
             .pipe(tap( result => this.logger.debug("after filter:" + result)));

        return observable.pipe(map((response: boolean) => {
            this.logger.debug("loaded, now returning." + this._tagTree.reveal());
            return this._tagTree.contentList(id, contentType, isAbbreviated, groupType, tagTypes);
            }));




    }

    //MM make into promise - which awaits loading event
    async tagTree(): Promise<TagTree> {
        await this.finishedLoading()

        return this._tagTree;

    }

    finishedLoading() {
        if (this.isLoadingSubject.getValue()) {


        this.logger.debug("about to check the loading subject");
        this.logger.debug(" value of isLoadingSubject" + this.isLoadingSubject.getValue());
        return this.isLoadingSubject.asObservable()
            .pipe(tap( result => this.logger.debug("in observable, finishedLoading: " + result)))
            .pipe(filter( value => value == false))
            .pipe(tap( result => this.logger.debug("after filter:" + result)))
            .toPromise();
        }

        return Observable.of(false).toPromise();

    }

    private createOrRefreshTagTree() {
        // MM the isLoading / loadingEvent will need to be made into a subject
        this.isLoadingSubject.next(true);
        this.isLoading = true;

        const promise = this.tagService.getAllExtendedAsPromise();
        console.log(promise);
        promise.then((data)=>{
            this.logger.debug("in createOrRefreshTagTree: promise completed. data:" + data.length)
            this._tagTree = new TagTree(data);
            this._lastLoaded = new Date().getTime();
            this.isLoading = false;
            this.isLoadingSubject.next(false);
            this.logger.debug("just updated loading subject to false")
            this.loadingEvent.emit(false);
        }).catch((error)=>{
            console.log("Promise rejected with " + JSON.stringify(error));
        });


    }

    private tagTreeNeedsRefresh() {
        var limit = this._lastLoaded + TagTreeService.refreshPeriod;
        return (new Date().getTime()) > limit;
    }

    refreshTagTree() {
        this.createOrRefreshTagTree();
    }
}
