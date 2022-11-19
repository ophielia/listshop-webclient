import { Injectable } from '@angular/core';
import {EnvConfig} from "../../model/env-config";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EnvironmentLoaderService {

  private envConfig: EnvConfig


  constructor(private readonly httpClient : HttpClient) { }

  async loadEnvConfig(configPath: string): Promise<void> {
    let promise = this.loadConfig(configPath).toPromise();
    promise.then(data => {
      this.envConfig = data;
    })
  }

  loadConfig(configPath: string): Observable<EnvConfig> {
    return this.httpClient.get(configPath, {observe: 'response'})
        .pipe(map((response: HttpResponse<any>) => {
          let readEnvConfig = new EnvConfig();
            readEnvConfig.apiUrl = response.body.apiUrl;
            readEnvConfig.celebrationUrl = "cat";
            readEnvConfig.celebrationRefreshInterval = 2;

          return readEnvConfig;

        }));
  }

  getEnvConfig(): EnvConfig {
    return this.envConfig;
  }

}
