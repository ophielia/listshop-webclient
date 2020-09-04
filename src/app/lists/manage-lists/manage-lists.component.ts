import {Component, OnDestroy, OnInit} from '@angular/core';
import {LandingFixService} from "../../shared/services/landing-fix.service";
import {ActivatedRoute} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {ListService} from "../../shared/services/list.service";
import {Subscription} from "rxjs";
import {ShoppingList} from "../../model/shoppinglist";

@Component({
    selector: 'app-manage-lists',
    templateUrl: './manage-lists.component.html',
    styleUrls: ['./manage-lists.component.css']
})
export class ManageListsComponent implements OnInit, OnDestroy {
    unsubscribe: Subscription[] = [];

    lists: ShoppingList[];

    constructor(
        private fix: LandingFixService,
        private route: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private listService: ListService
    ) {
    }

    ngOnInit() {
        // this.fix.addFixBlogDetails();
        this.title.setTitle(this.route.snapshot.data['title']);
        this.getShoppingLists()
    }

    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());
    }


    getShoppingLists() {

        let sub$ = this.listService
            .getAllLists()
            .subscribe(p => {
                if (p) {
                    this.lists = p
                }
            });
        this.unsubscribe.push(sub$);
    }

}
