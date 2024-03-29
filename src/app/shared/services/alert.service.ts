import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {NavigationStart, Router} from "@angular/router";
import {Alert, AlertType} from "../../model/alert";
import {filter} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AlertService {
  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {

        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
        //  this.clear();
        }
      }

    });
  }

  // subscribe to alerts
  getAlert(): Observable<any> {
    return this.subject.asObservable()
        .pipe();
  }

  // convenience methods
  success(message: string) {
    this.alert(new Alert({message, type: AlertType.Success}));
  }

  error(message: string) {
    this.alert(new Alert({message, type: AlertType.Error}));
  }

  info(message: string) {
    this.alert(new Alert({message, type: AlertType.Info}));
  }

  warn(message: string) {
    this.alert(new Alert({message, type: AlertType.Warning}));
  }

  // main alert method
  alert(alert: Alert) {
    this.keepAfterRouteChange = false;
    this.subject.next(alert);
  }

  // clear alerts
  clear(alertId?: string) {
    this.subject.next(new Alert({alertId}));
  }
}
