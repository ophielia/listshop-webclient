import {TestBed} from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import {of} from 'rxjs';
import {ListService} from './list.service';
import {EnvironmentLoaderService} from './environment-loader.service';
import {NGXLogger} from 'ngx-logger';

describe('Shopping list generation request', () => {
  let service: ListService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] });
    http = TestBed.inject(HttpTestingController);
    const config = {getEnvConfigWhenReady: () => of({apiUrl: '/test-api/'})};
    service = new ListService(TestBed.inject(HttpClient), config as EnvironmentLoaderService, {} as NGXLogger);
  });

  afterEach(() => {
    http.verify();
    service.ngOnDestroy();
  });

  it('preserves a supplied list name and generation options', () => {
    service.createListFromParameters(['dish-1'], 'plan-1', true, false, 'Weekend groceries').subscribe();
    const request = http.expectOne('/test-api/v2/shoppinglist');
    expect(request.request.method).toBe('POST');
    expect(JSON.parse(request.request.body)).toEqual({
      dish_sources: ['dish-1'], meal_plan_source: 'plan-1',
      add_from_starter: true, generate_mealplan: false, list_name: 'Weekend groceries'
    });
    request.flush({});
  });

  it('uses the default name when no name is supplied', () => {
    service.createListFromParameters([], null, false, false).subscribe();
    const request = http.expectOne('/test-api/v2/shoppinglist');
    expect(JSON.parse(request.request.body).list_name).toBe(ListService.DEFAULT_LIST_NAME);
    request.flush({});
  });
});
