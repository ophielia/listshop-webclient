import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {UserService} from "../../shared/services/user.service";
import {UserProperty} from "../../model/userproperty";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-beta-test',
  templateUrl: './beta-test.component.html',
  styleUrls: ['./beta-test.component.scss']
})
export class BetaTestComponent implements OnInit {
  @ViewChild('notification') notificationConfirmModal;
  @ViewChild('testemailsent') testEmailConfirmModal;

  public isLoggedIn: boolean;
  public signedUpForNotify: boolean = false;
  public testEmailCount: number = 0;

  constructor(private authorizationService : AuthenticationService,
              private spinner: NgxSpinnerService,
              private userService : UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authorizationService.isAuthenticated();
    this.loadUserProperties();
  }

  signUpForNotification() {
    var notifProperty = new UserProperty();
    notifProperty.key = UserService.NOTIFIED_ON_RELEASE;
    notifProperty.value = "true";

    let promise = this.userService.setUserProperty(notifProperty);
    promise.then(data => {
      this.notificationConfirmModal.show();
      this.loadUserProperties();
    })
  }

  sendTestInformation() {
    this.spinner.show();
    var notifProperty = new UserProperty();
    notifProperty.key = UserService.REQUEST_TEST_INFO;
    notifProperty.value = "true";

    let promise = this.userService.setUserProperty(notifProperty);
    promise.then(data => {
      this.spinner.hide();
      this.testEmailConfirmModal.show();
      this.loadUserProperties();
    })
  }

  private loadUserProperties() {

    let promise = this.userService.getUserProperties();
    promise.then(data => {
      let notifiedProperty = data.filter( l => l.key == UserService.NOTIFIED_ON_RELEASE);
      this.signedUpForNotify = notifiedProperty.length > 0;
      let testSent = data.filter( l => l.key == UserService.TEST_EMAILS_SENT);
      if (testSent.length > 0) {
        let prop = testSent[0];
        this.testEmailCount = parseInt(prop.value);
      }
    })
  }
}
