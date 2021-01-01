import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
    selector: 'app-list-shop-header',
    templateUrl: './list-shop-header.component.html',
    styleUrls: ['./list-shop-header.component.css']
})
export class ListShopHeaderComponent implements OnInit {

    constructor(private router: Router,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
    }

    logout(): void {
        this.authenticationService.logout().subscribe(t => {
                this.router.navigateByUrl('home');
            },
            error => {
                this.router.navigateByUrl('home');
            });
    }
}
