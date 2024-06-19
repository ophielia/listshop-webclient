import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ITag, Tag} from "../../../model/tag";
import {Dish} from "../../../model/dish";
import TagType from "../../../model/tag-type";
import {Subscription} from "rxjs";
import {TagService} from "../../services/tag.service";
import {TagTreeService} from "../../services/tag-tree.service";
import {ContentType, GroupType, TagTree} from "../../services/tag-tree.object";
import {NGXLogger} from "ngx-logger";


@Component({
    selector: 'app-tag-select-inline',
    templateUrl: './tag-select-inline.component.html',
    styleUrls: ['./tag-select-inline.component.scss']
})
export class TagSelectInlineComponent implements OnInit, OnDestroy {
    unsubscribe: Subscription[] = [];
    @Output() tagSelected: EventEmitter<ITag> = new EventEmitter<ITag>();
    @Output() cancelAddTag: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() createTag: EventEmitter<ITag> = new EventEmitter<ITag>();
    @Input() tagTypes: string;
    @Input() groupType: GroupType = GroupType.All;

    @Input() showCancelButton: boolean = false;
    @Input() allowAdd: boolean = false;
    @Input() placeholderText: string;

    tagList: ITag[];

    autoSelectedTag: ITag;
    filteredTags: ITag[];

    name: string;
    loaded: boolean = false;

    dish: Dish = <Dish>{dish_id: "", name: "", description: ""};
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

        let tagTypesAsArray = this.tagTypes.split(",")

        let $sub = this.tagTreeService.allContentList(TagTree.BASE_GROUP,
            ContentType.All, this.groupType, tagTypesAsArray)
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
        let tag = new Tag();
        tag.tag_type = tagtype;
        tag.name = this.autoSelectedTag.name;
        this.createTag.emit(tag);
        this.cancelAdd();
    }

    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());

    }

    isRatingTag(tag_type: any) {
        return tag_type == TagType.Rating;
    }
}


