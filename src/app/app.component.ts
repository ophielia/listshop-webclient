import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./shared/services/authentication.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    loading = true;

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.authService.checkAuthenticationOnInitialize().subscribe(logged => {
                this.loading = false;
            },
            error => {
                this.loading = false;
            }, () => {
                this.loading = false;
                console.log("its an error");
            });
    }

}
