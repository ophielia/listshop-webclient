import { Injectable } from '@angular/core';
import {EnvConfig} from "../../model/env-config";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {filter, map} from "rxjs/operators";
import {NGXLogger} from "ngx-logger";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentLoaderService {

  private envConfig: EnvConfig


  constructor(private readonly httpClient : HttpClient) { }

  isLoadingSubject: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(true);

  async loadEnvConfig(configPath: string): Promise<void> {
    let promise = this.loadConfig(configPath).toPromise();
    promise.then(data => {
      this.envConfig = data;
        this.isLoadingSubject.next(false);
    })
  }

  loadConfig(configPath: string): Observable<EnvConfig> {
    return this.httpClient.get(configPath, {observe: 'response'})
        .pipe(map((response: HttpResponse<any>) => {
          let readEnvConfig = new EnvConfig();
            readEnvConfig.apiUrl = response.body.apiUrl;
            readEnvConfig.celebrationUrl = response.body.celebrationUrl;
            readEnvConfig.celebrationRefreshInterval = 2;
            readEnvConfig.appStoreLink = response.body.appStoreLink ;
            readEnvConfig.facebookLink = response.body.facebookLink ;
            readEnvConfig.twitterLink = response.body.twitterLink ;
          return readEnvConfig;

        }));
  }

  getEnvConfig(): EnvConfig {
    return this.envConfig;
  }

  getEnvConfigWhenReady(): Observable<EnvConfig> {
     return this.isLoadingSubject.asObservable()
        .pipe(
            filter(value => value == false)
        )
         .pipe(map((response: boolean) => {
           return this.getEnvConfig()
         }));



  }
}
