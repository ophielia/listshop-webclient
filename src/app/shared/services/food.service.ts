import {Injectable, OnDestroy} from '@angular/core';
import {Subscription, throwError} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {EnvironmentLoaderService} from "./environment-loader.service";
import {NGXLogger} from "ngx-logger";
import MappingUtils from "../../model/mapping-utils";
import {ISuggestion} from "../../model/suggestion";
import {catchError, map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class FoodService implements OnDestroy {
    private amountUrl;

    unsubscribe: Subscription[] = [];


    constructor(
        private httpClient: HttpClient,
        private envLoader: EnvironmentLoaderService,
        private logger: NGXLogger
    ) {
        this.loadConfig();
    }

    ngOnDestroy() {
        this.unsubscribe.forEach(s => s.unsubscribe());
    }

    loadConfig() {
        let sub$ = this.envLoader
            .getEnvConfigWhenReady()
            .subscribe(config => {
                if (config) {
                    this.amountUrl = config.apiUrl + "amount";
                }
            });
        this.unsubscribe.push(sub$);
    }


    getSuggestionsForTag(tagId: string, isLiquid: boolean): Promise<ISuggestion[]> {
        this.logger.debug("Retrieving all suggestions for tag.");
        var url = this.amountUrl + "/suggestions/" + tagId
        var requestParams = new Array<string>();
        if (isLiquid && isLiquid != null) {
            requestParams.push("liquid=" + isLiquid);
            url += "?" + requestParams[0];
        }


        return this.httpClient.get(url)
            .pipe(map((response: HttpResponse<any>) => {
                    // map and return
                    return this.mapSuggestions(response);
                }),
                catchError(this.handleError))
            .toPromise();
    }


    mapSuggestions(object: Object): ISuggestion[] {
        let embeddedObj = object["_embedded"];
        if (embeddedObj) {
            return embeddedObj["unit_displays"].map(MappingUtils.toSuggestion);
        }
        return null;
    }


    handleError(error: any) {
        // log error
        // could be something more sophisticated
        let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);

        // throw an application level error
        return throwError(error);
    }

}
