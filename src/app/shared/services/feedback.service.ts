import { Injectable } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {EnvironmentLoaderService} from "./environment-loader.service";
import {NGXLogger} from "ngx-logger";
import {IShoppingList} from "../../model/shoppinglist";
import {catchError, map} from "rxjs/operators";
import {CampaignFeedback} from "../../model/campaignfeedback";
import {toPromise} from "rxjs-compat/operator/toPromise";

@Injectable()
export class FeedbackService {
  private feedbackUrl;

  unsubscribe: Subscription[] = [];
  constructor(
      private httpClient: HttpClient,
      private envLoader: EnvironmentLoaderService,
      private logger: NGXLogger
  ) {
    this.loadConfig();
  }

  loadConfig() {
    let sub$ = this.envLoader
        .getEnvConfigWhenReady()
        .subscribe(config => {
          if (config) {
            this.feedbackUrl =  config.apiUrl + "campaign";
          }
        });
    this.unsubscribe.push(sub$);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach(s => s.unsubscribe());
  }

  publishFeedback(email: string, text: string): Observable<HttpResponse<Object>> {
    this.logger.debug("Sending feeback info.");

    var cleanedEmail = email == null ? "" : email;
    cleanedEmail = cleanedEmail.substr(0,50);
    var cleanedText = text == null ? "" : text;
    cleanedText = cleanedText.substr(0,1000);


    var campaignPut = new CampaignFeedback();
    campaignPut.email = cleanedEmail;
    campaignPut.text = cleanedText;
    campaignPut.campaign = "beta_feedback";

    return this
        .httpClient
        .post(this.feedbackUrl,
            JSON.stringify(campaignPut), {observe: 'response'});

  }

}
