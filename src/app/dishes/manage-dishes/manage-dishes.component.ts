import {Component, OnDestroy, OnInit} from '@angular/core';
import {LandingFixService} from "../../shared/services/landing-fix.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {ListService} from "../../shared/services/list.service";
import {Subscription} from "rxjs";
import {ShoppingList} from "../../model/shoppinglist";

@Component({
    selector: 'app-manage-dishes',
    templateUrl: './manage-dishes.component.html',
    styleUrls: ['./manage-dishes.component.css']
})
export class ManageDishesComponent implements OnInit, OnDestroy {
    unsubscribe: Subscription[] = [];

    lists: ShoppingList[];

    constructor(
        private fix: LandingFixService,
        private route: ActivatedRoute,
        private router: Router,
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

    deleteShoppingList(listId: string) {
        let sub$ = this.listService
            .deleteList(listId)
            .subscribe(l => this.getShoppingLists());
        this.unsubscribe.push(sub$);
    }

    editShoppingList(listId: String) {
       // console.log("listId + " + listId)
        var url = "lists/edit/" +  listId;
        this.router.navigateByUrl(url);

    }

    createShoppingList() {
        let sub$ = this.listService
            .createList(ListService.DEFAULT_LIST_NAME)
            .subscribe(l => this.getShoppingLists());
        this.unsubscribe.push(sub$);
    }

}
