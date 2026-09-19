import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ILegacyShoppingList} from "../../../model/legacyShoppingList";
import {ListService} from "../../services/list.service";
import {INestedShoppingList} from "../../../model/shoppingList";


@Component({
    selector: 'app-list-select',
    templateUrl: './list-select.component.html',
    styleUrls: ['./list-select.component.scss']
})
export class ListSelectComponent implements OnInit, OnDestroy {
    @Output() listSelected: EventEmitter<ILegacyShoppingList> = new EventEmitter<ILegacyShoppingList>();
    @Output() cancelSelectList: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() currentListId: string;
    @Input() title: string = "Add From List";


    listOfLists: INestedShoppingList[] = [];
    selectedList: any;

    constructor(private listService: ListService) {

    }

    ngOnInit() {
        this.selectedList = null;

        this.listService.getAllLists().subscribe(data => {
            this.listOfLists = data.list_of_lists.filter( l => l.list_id != this.currentListId);
        })
    }


    listIsSelected(event) {

        this.listSelected.emit(event);
        this.selectedList = null;

    }

    cancelListInput() {
        this.cancelSelectList.emit(true);
    }

    ngOnDestroy() {

    }


}


