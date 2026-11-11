import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpErrorResponse} from '@angular/common/http';
import {LoggerModule, NGXLogger, NgxLoggerLevel} from 'ngx-logger';
import {ListShopErrorHandler} from './list-shop-error-handler';
import {AlertService} from '../services/alert.service';

describe('Application error handling with the Ivy logger', () => {
  let alerts: {error: jasmine.Spy};

  beforeEach(() => {
    alerts = {error: jasmine.createSpy('error')};
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoggerModule.forRoot({
          level: NgxLoggerLevel.ERROR,
          serverLogLevel: NgxLoggerLevel.ERROR,
          disableConsoleLogging: false
        })
      ],
      providers: [ListShopErrorHandler, {provide: AlertService, useValue: alerts}]
    });
  });

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('suppresses debug messages and writes errors without sending HTTP logs', () => {
    const debug = spyOn(console, 'debug');
    const error = spyOn(console, 'error');
    const logger = TestBed.inject(NGXLogger);
    logger.debug('hidden diagnostic');
    logger.error('upgrade error diagnostic');
    expect(debug).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalled();
    expect(JSON.stringify(error.calls.allArgs())).toContain('upgrade error diagnostic');
  });

  it('keeps authentication failure alerts working with the real logger', fakeAsync(() => {
    spyOn(console, 'error');
    const handler = TestBed.inject(ListShopErrorHandler);
    tick();
    handler.handleError(new HttpErrorResponse({
      status: 401, error: {status: 401, message: 'Unauthorized'}
    }));
    expect(alerts.error).toHaveBeenCalledWith("That combination didn't work.  Please try again.");
    expect(console.error).toHaveBeenCalled();
  }));
});
