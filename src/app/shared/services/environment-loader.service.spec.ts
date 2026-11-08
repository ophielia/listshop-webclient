import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { EnvironmentLoaderService } from './environment-loader.service';

describe('EnvironmentLoaderService', () => {
  let service: EnvironmentLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(EnvironmentLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('publishes runtime configuration only after initialization completes', async () => {
    const configs = [];
    const subscription = service.getEnvConfigWhenReady().subscribe(config => configs.push(config));
    const loading = service.loadEnvConfig('/assets/config/config.json');
    expect(configs).toEqual([]);
    TestBed.inject(HttpTestingController).expectOne('/assets/config/config.json').flush({
      apiUrl: 'https://example.com/api/', celebrationUrl: '/celebrations.json',
      appStoreLink: '/store', facebookLink: '/facebook', twitterLink: '/twitter'
    });
    await loading;
    expect(configs.length).toBe(1);
    expect(configs[0].apiUrl).toBe('https://example.com/api/');
    expect(service.getEnvConfig().appStoreLink).toBe('/store');
    subscription.unsubscribe();
  });
});
