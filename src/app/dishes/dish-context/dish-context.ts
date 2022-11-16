import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {ITag} from "../../model/tag";
import {SortKey} from "../../model/sort-key";
import {SortDirection} from "../../model/sort-direction";


@Injectable()
export class DishContext implements OnDestroy {

    private dishIds : string[];
    private _searchValue: string;
    private _filterTags: ITag[];
    private _sortKey: SortKey = SortKey.LastUsed;
    private _sortDirection: SortDirection = SortDirection.Up;

    constructor(
        private logger: NGXLogger
    ) {

    }

    ngOnDestroy(): void {
        this.dishIds = null;
    }

    public setDishIds(dishIds: string[] ) {
        this.dishIds = dishIds;
    }

    public getNextDishId(dishId: string): string {
        let currentIndex = this.getIndex(dishId);
        if (currentIndex == this.dishIds.length - 1) {
            return null;
        }
        return this.dishIds[currentIndex + 1];
    }

    public getPreviousDishId(dishId: string): string {
        let currentIndex = this.getIndex(dishId);
        if (currentIndex == 0) {
            return null;
        }
        return this.dishIds[currentIndex - 1];
    }

    private getIndex(dishId: String) {
        var index = 0;
        for (let id of this.dishIds) {
            if (id == dishId) {
                return index;
            }
            index++;
        }
    }


    get searchValue(): string {
        return this._searchValue;
    }

    set searchValue(value: string) {
        this._searchValue = value;
    }

    get filterTags(): ITag[] {
        return this._filterTags;
    }

    set filterTags(value: ITag[]) {
        this._filterTags = value;
    }

    get sortKey(): SortKey {
        return this._sortKey;
    }

    set sortKey(value: SortKey) {
        this._sortKey = value;
    }

    get sortDirection(): SortDirection {
        return this._sortDirection;
    }

    set sortDirection(value: SortDirection) {
        this._sortDirection = value;
    }
}
