import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITag} from "../../../model/tag";
import {TagTreeService} from "../../services/tag-tree.service";
import {ContentType, GroupType, TagTree} from "../../services/tag-tree.object";
import {Subscription} from "rxjs";
import TagType from "../../../model/tag-type";
import {TagService} from "../../services/tag.service";

@Component({
  selector: 'app-create-tag-dialog',
  templateUrl: './create-tag-dialog.component.html',
  styleUrls: ['./create-tag-dialog.component.scss']
})
export class CreateTagDialogComponent implements OnInit {
  @Output() createdTagId: EventEmitter<string> = new EventEmitter<string>();
  @Input() addTargetString: string;
  @Input() tagName: string;
  @Input() tagType: TagType;
  unsubscribe: Subscription[] = [];

  contentList: ITag[] = [];
  navigationList: ITag[] = [];
  stepOne: boolean = true;
  stepTwo: boolean = false;
  stepThree: boolean = false;

  selectedCategoryId = TagTree.BASE_GROUP;
  selectedCategoryName = "";

  constructor(
      private tagTreeService: TagTreeService,
      private tagService: TagService
  ) { }

  ngOnInit(): void {

  }

  moveToStepTwo() {
    this.setContentListForTagId(TagTree.BASE_GROUP);
    this.stepOne = false;
    this.stepTwo = true;
    this.stepThree = false;
  }

  moveToStepThree() {
    this.stepOne = false;
    this.stepTwo = false;
    this.stepThree = true;

  }

  moveToStepOne() {
    this.stepOne = true;
    this.stepTwo = false;
    this.stepThree = false;

  }

  categoryIsSelected() {
    return this.selectedCategoryId != TagTree.BASE_GROUP;
  }

  drillDown(tag_id: string) {
    this.setSelected(tag_id);
    this.setContentListForTagId(tag_id);
    this.setNavigationListForTagId(tag_id);
  }

  setSelected(tag_id: string) {
    this.selectedCategoryId = tag_id;
    let tag = this.tagTreeService.retrieveTag(tag_id);
    this.selectedCategoryName = tag.name;

  }
  setContentListForTagId(tag_id: string) {
    let $sub = this.tagTreeService.allContentList(tag_id,
        ContentType.Direct, GroupType.GroupsOnly, [this.tagType])
        .subscribe(data => {
          this.contentList = data;
        });
    this.unsubscribe.push($sub);
  }
  setNavigationListForTagId(tag_id: string) {
    let $sub = this.tagTreeService.navigationList(tag_id)
        .subscribe(data => {
          this.navigationList = data;
        });
    this.unsubscribe.push($sub);
  }


  createTag() {

            var $sub = this.tagService.addTagToParent(this.tagName, this.selectedCategoryId, this.tagType)
                .subscribe(r => {
                    var headers = r.headers;
                    var location = headers.get("Location");
                    var splitlocation = location.split("/");
                    var id = splitlocation[splitlocation.length - 1];
                    this.createdTagId.emit(id);
                  this.stepOne=true;
                  this.stepTwo = false;
                  this.stepThree = false;
                });
            this.unsubscribe.push($sub);

  }
}
