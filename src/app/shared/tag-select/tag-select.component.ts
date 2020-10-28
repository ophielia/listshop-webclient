import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ITag} from "../../model/tag";
import TagSelectType from "../../model/tag-select-type";
import {Dish} from "../../model/dish";
import TagType from "../../model/tag-type";
import {Subscription} from "rxjs";
import {TagService} from "../services/tag.service";
import {TagTreeService} from "../services/tag-tree.service";
import {ContentType, GroupType, TagTree} from "../services/tag-tree.object";
import {NGXLogger} from "ngx-logger";


@Component({
    selector: 'app-tag-select',
    templateUrl: './tag-select.component.html',
    styleUrls: ['./tag-select.component.scss']
})
export class TagSelectComponent implements OnInit, OnDestroy {
    unsubscribe: Subscription[] = [];
    @Output() tagSelected: EventEmitter<ITag> = new EventEmitter<ITag>();
    @Output() cancelAddTag: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() tagTypes: string;
    @Input() selectType: string = TagSelectType.Assign;

    @Input() showCancelButton: boolean = false;
    @Input() allowAdd: boolean = false;
    @Input() placeholderText: string;

    /*

        @Input() passedInputStyle: any;
        @Input() showAsInputGroup: any = true;
    */
    tagList: ITag[];

    autoSelectedTag: any;
    filteredTags: ITag[];

    name: string;
    loaded: boolean = false;

    dish: Dish = <Dish>{dish_id: "", name: "", description: ""};
    currentSelect: string;
    showAddTags: boolean;

    allTagTypes: string[];


    constructor(private logger: NGXLogger,
                private tagService: TagService,
                private tagTreeService: TagTreeService) {
        this.allTagTypes = TagType.listAll();
    }

    ngOnInit() {
        this.autoSelectedTag = null;
        this.showAddTags = false;

        this.currentSelect = this.selectType;

        let tagTypesAsArray = this.tagTypes.split(",")

        let $sub = this.tagTreeService.allContentList(TagTree.BASE_GROUP,
            ContentType.All, false, GroupType.ExcludeGroups, tagTypesAsArray)
            .subscribe(data => {
                this.logger.debug("in subscribe in tag-select. data: " + data.length)
                this.tagList = data;
                this.loaded = true;
            });
        this.unsubscribe.push($sub);

    }

    filterTags(event) {
        this.logger.debug('query:' + event.query);
        if (event.query && this.loaded) {
            if (this.tagList) {
                let filterBy = event.query.toLocaleLowerCase();
                this.filteredTags = this.tagList.filter((tag: ITag) =>
                    tag.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
                this.showAddTags = this.filteredTags.length == 0 && this.allowAdd;
            }
        } else {
            this.filteredTags = null;
            this.showAddTags = false;
        }
    }

    bingo(event) {
        this.tagSelected.emit(event);
        this.autoSelectedTag = null;
        this.filteredTags = null;
        if (event) {
            event.panelVisible = false;
        }
    }

    cancelAdd() {
        this.showAddTags = false;
        this.autoSelectedTag = null;
        this.filteredTags = null;
    }

    checkSearchEnter(el) {
        // when the user clicks on return from the search box
        // if only one tag is in the list, select this tag
        if (this.filteredTags && this.filteredTags.length == 1) {
            this.bingo(this.filteredTags[0]);
            if (el) {
                el.panelVisible = false;
            }
        }
    }

    isIncluded(tagtype: string) {
        if (!this.allowAdd) {
            return false;
        }
        return this.tagTypes.indexOf(tagtype) >= 0;

    }

    cancelSelectTag() {
        this.cancelAddTag.emit(true);
    }

    add(tagtype: string) {
        var $sub = this.tagService.addTag(this.autoSelectedTag, tagtype)
             .subscribe(r => {
                 this.autoSelectedTag = null;
                 var headers = r.headers;
                 var location = headers.get("Location");
                 var splitlocation = location.split("/");
                 var id = splitlocation[splitlocation.length - 1];
                 let promise = this.tagService.getById(id);
                 promise.then(data => {
                     this.showAddTags = false;
                     this.autoSelectedTag = null;
                     this.tagSelected.emit(data);
                 })
             });
         this.unsubscribe.push($sub);
    }

    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());

    }

}


