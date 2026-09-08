import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ILegacyDish} from "../../../model/legacyDish";
import {NGXLogger} from "ngx-logger";

@Component({
    selector: 'app-dish-select',
    templateUrl: './dish-select.component.html',
    styleUrls: ['./dish-select.component.scss']
})
export class DishSelectComponent implements OnInit, OnDestroy {
    @Output() dishSelected: EventEmitter<ILegacyDish> = new EventEmitter<ILegacyDish>();
    @Output() cancelSelectDish: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() showText: string;
    @Input() showCancelButton: boolean = false;
    @Input() dishList: ILegacyDish[];


    autoSelectedDish: any;
    filteredDishList: ILegacyDish[];


    constructor(private logger: NGXLogger) {

    }

    ngOnInit() {
        this.autoSelectedDish = null;
    }

    filterDishes(event) {
        this.logger.debug("in filter dishes: " + event.query)
        if (event.query) {
            if (this.dishList) {
                let filterBy = event.query.toLocaleLowerCase();
                this.filteredDishList = this.dishList.filter((dish: ILegacyDish) =>
                    dish.name != null && dish.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
                this.logger.debug("filtered dishes length: " + this.filteredDishList.length)
            }
        } else {
            this.filteredDishList = null;
        }
    }

    bingo(event) {
        this.logger.debug("was in bingo");
        this.logger.debug("event is: " + event)
        this.dishSelected.emit(event);
        this.autoSelectedDish = null;
        this.filteredDishList = null;
        if (event) {
            event.panelVisible = false;
        }
    }

    cancelDishInput() {
        this.cancelSelectDish.emit(true);
    }

    ngOnDestroy() {

    }

}


