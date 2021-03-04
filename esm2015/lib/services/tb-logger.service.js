/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, NgZone } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StompRService, StompState } from '@stomp/ng2-stompjs';
import { LoggerOperationResult } from '../models/logger-operation-result.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@stomp/ng2-stompjs";
/** @type {?} */
let loggerInstance;
/** @type {?} */
export const logger = (/**
 * @return {?}
 */
() => loggerInstance);
/**
 * @record
 */
export function LogEntry() { }
if (false) {
    /** @type {?} */
    LogEntry.prototype.Message;
    /** @type {?} */
    LogEntry.prototype.Registeredappid;
    /** @type {?|undefined} */
    LogEntry.prototype.AccountName;
    /** @type {?|undefined} */
    LogEntry.prototype.Subscription;
    /** @type {?|undefined} */
    LogEntry.prototype.App;
    /** @type {?|undefined} */
    LogEntry.prototype.Category;
    /** @type {?} */
    LogEntry.prototype.Level;
}
/** @enum {number} */
const LogLevel = {
    Trace: 0,
    Debug: 1,
    Warn: 2,
    Error: 3,
};
export { LogLevel };
LogLevel[LogLevel.Trace] = 'Trace';
LogLevel[LogLevel.Debug] = 'Debug';
LogLevel[LogLevel.Warn] = 'Warn';
LogLevel[LogLevel.Error] = 'Error';
/**
 * @param {?} message
 * @param {?=} logLevel
 * @return {?}
 */
export function prepareLog(message, logLevel = LogLevel.Debug) {
    /** @type {?} */
    const log = {
        Message: message,
        Registeredappid: logger().getAppId(),
        AccountName: localStorage.getItem('_accountname'),
        Subscription: localStorage.getItem('_company'),
        Category: 'Client',
        Level: logLevel
    };
    return log;
}
export class TbLoggerService {
    /**
     * @param {?} env
     * @param {?} http
     * @param {?} stompService
     * @param {?} ngZone
     */
    constructor(env, http, stompService, ngZone) {
        this.env = env;
        this.http = http;
        this.stompService = stompService;
        this.ngZone = ngZone;
        this.date = new Date();
        this.timeZoneOffSet = (/**
         * @return {?}
         */
        () => -this.date.getTimezoneOffset() / 60);
        this.mqConnectionState = StompState.CLOSED;
        this.mqConnectionStateObservable = new BehaviorSubject(StompState.CLOSED);
        this._shouldLog = (/**
         * @param {?} logLevel
         * @return {?}
         */
        (logLevel) => logLevel >= this.env.logger.level);
        this._serverLog = (/**
         * @param {?} logLevel
         * @param {?} message
         * @return {?}
         */
        (logLevel, message) => this._shouldLog(logLevel) && this.sendLog(message, logLevel));
        loggerInstance = this;
        this.loggerUrl = this.env.logger && this.env.logger.url;
        this.serverMonitorUrl = this.env.serverMonitor && this.env.serverMonitor.url;
        if (env.stompConfig)
            this.mqInit();
    }
    /**
     * @return {?}
     */
    mqInit() {
        if (this.env.stompConfig) {
            this.stompService.config = this.env.stompConfig;
            this.stompService.initAndConnect();
            this.stompService.state.subscribe((/**
             * @param {?} status
             * @return {?}
             */
            (status) => {
                this.mqConnectionState = status;
                this.mqConnectionStateObservable.next(status);
            }));
        }
    }
    /**
     * Ritorna la App Id dell'applicazione frontend che sta loggando,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     * @return {?}
     */
    getAppId() {
        return this.env.logger.appId;
    }
    /**
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     * @return {?}
     */
    getLoggerUrl() {
        return this.loggerUrl ? this.loggerUrl : this.env.logger.url;
    }
    /**
     * Ritorna la api per inserire log con appId configurato in environment.json
     * @return {?}
     */
    getLoggerPostUrl() {
        return `${this.getLoggerUrl()}entries/${this.getAppId()}/`;
    }
    /**
     * M4 Backend URL
     * @return {?}
     */
    getServerMonitorUrl() {
        return this.serverMonitorUrl ? this.serverMonitorUrl : this.env.serverMonitor.url;
    }
    /**
     * @private
     * @param {?} message
     * @param {?} logLevel
     * @return {?}
     */
    sendLog(message, logLevel) {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.http
                .post(this.getLoggerPostUrl(), prepareLog(message, logLevel))
                .toPromise()
                .then((/**
             * @param {?} __
             * @return {?}
             */
            __ => { }), (/**
             * @param {?} err
             * @return {?}
             */
            err => true));
        }));
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    log(message) {
        if (this._shouldLog(LogLevel.Trace))
            console.log(`%c${message}`, `color:#3daf67`);
        this._serverLog(LogLevel.Trace, message);
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    debug(message) {
        if (this._shouldLog(LogLevel.Debug))
            console.log(`%c${message}`, `color:#0277bd`);
        this._serverLog(LogLevel.Debug, message);
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    warn(message) {
        if (this._shouldLog(LogLevel.Warn))
            console.log(`%c${message}`, `color:#FF9633`);
        this._serverLog(LogLevel.Warn, message);
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    error(message) {
        if (this._shouldLog(LogLevel.Error))
            console.error(`%c${message}`, `color:red`);
        this._serverLog(LogLevel.Error, message);
    }
    /**
     * Log per statistiche client (es: usato da login page per tracciare risoluzione schermo)
     *
     * @param {?=} message
     * @return {?}
     */
    stat(message) {
        console.log(`%c${message}`, `color:#884EA0`);
        this._serverLog(LogLevel.Trace, message);
    }
    /**
     * Return logs: LoggerOperationResult
     *
     * @param {?} params
     * @return {?}
     */
    getLogs(params) {
        if (!params.instanceKey) {
            /** @type {?} */
            const error = new LoggerOperationResult(false, 'Error - No instanceKey, no party');
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `entries/${params.instanceKey}`;
        /** @type {?} */
        let p = new HttpParams();
        if (params.howMany)
            p = p.append('howMany', params.howMany);
        if (params.offSet)
            p = p.append('offSet', params.offSet);
        if (params.accountName)
            p = p.append('accountName', params.accountName);
        if (params.subscriptionKey)
            p = p.append('subscription', params.subscriptionKey);
        if (params.category)
            p = p.append('categories', params.category);
        if (params.apps)
            p = p.append('apps', params.apps);
        if (params.appTypes)
            p = p.append('appTypes', params.appTypes);
        if (params.levels)
            p = p.append('levels', params.levels);
        if (params.rangeDateStart && params.rangeDateEnd) {
            if (params.rangeDateStart === params.rangeDateEnd)
                p = p.append('date', params.rangeDateStart + ';' + params.rangeDateEnd);
            else
                p = p.append('date', params.rangeDateStart + ';' + params.rangeDateEnd);
            p = p.append('timeZoneOffSet', this.timeZoneOffSet().toString()); //con il timezoneoffSet non prende l'ora desiderata senza invece si
        }
        /** @type {?} */
        const httpOptions = {
            params: p
        };
        return this.http.get(url, httpOptions).pipe(
        // tap(op => console.log('TbLoggerService.getLogs', op)),
        catchError(this.handleError('TbLoggerService.getLogs', new LoggerOperationResult(false, 'Error - getLogs'))));
    }
    /**
     * @param {?} appId
     * @return {?}
     */
    getApps(appId) {
        if (!appId) {
            /** @type {?} */
            const error = new LoggerOperationResult(false, 'Error - No appId, no party');
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `apps/${appId}`;
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getApps with appId: ', appId, op)),
        catchError(this.handleError('TbLoggerService.getApps', new LoggerOperationResult(false, 'Error - getApps'))));
    }
    /**
     * @param {?} appId
     * @return {?}
     */
    getAppTypes(appId) {
        if (!appId) {
            /** @type {?} */
            const error = new LoggerOperationResult(false, 'Error - No appId, no party');
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `appTypes/${appId}`;
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getAppTypes with appId: ', appId, op)),
        catchError(this.handleError('TbLoggerService.getAppTypes', new LoggerOperationResult(false, 'Error - getAppTypes'))));
    }
    /**
     * @return {?}
     */
    getInstanceKey() {
        /** @type {?} */
        const url = this.getLoggerUrl() + `appIds`;
        return this.http.get(url).pipe(
        // tap(op => console.log(url, 'TbLoggerService.getInstanceKey with appId: ', op)),
        catchError(this.handleError('TbLoggerService.getInstanceKey', new LoggerOperationResult(false, 'Error - getInstanceKey'))));
    }
    /**
     * Legge tutte le subscription
     * @return {?}
     */
    getSubscriptionKey() {
        /** @type {?} */
        const url = this.getLoggerUrl() + `subscriptionKeys`;
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getSubscriptionKey: ', op)),
        catchError(this.handleError('TbLoggerService.getSubscriptionKey', new LoggerOperationResult(false, 'Error - getSubscriptionKey'))));
    }
    /**
     * @param {?} appId
     * @return {?}
     */
    getCategories(appId) {
        if (!appId) {
            /** @type {?} */
            const error = new LoggerOperationResult(false, 'Error - No appId, no party');
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `categories/${appId}`;
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getCategories with appId: ', appId, op)),
        catchError(this.handleError('TbLoggerService.getCategories', new LoggerOperationResult(false, 'Error -  getCategories'))));
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @template T
     * @param {?=} operation - name of the operation that failed
     * @param {?=} result - optional value to return as the observable result
     * @return {?}
     */
    handleError(operation = 'operation', result) {
        return (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.error(`${operation} failed: ${error.error}`);
            // Let the app keep running by returning an empty result.
            return of((/** @type {?} */ (result)));
        });
    }
    /**
     * Connessione a RabbitMQ
     * @param {?} queueName
     * @return {?}
     */
    mqConnect(queueName) {
        return this.stompService.subscribe(queueName).pipe(map((/**
         * @param {?} msg
         * @return {?}
         */
        (msg) => JSON.parse(msg.body))));
    }
    /**
     * @return {?}
     */
    mqConnected() {
        return this.stompService.connected();
    }
    /**
     * @return {?}
     */
    mqDisconnect() {
        return this.stompService.disconnect();
    }
    // -------------------------------------------------------------------------------------------------------
    // PARTE TBSERVERMONITOR
    // -------------------------------------------------------------------------------------------------------
    /**
     * @param {?} params
     * @return {?}
     */
    getTBInfosLogs(params) {
        /** @type {?} */
        let p = new HttpParams();
        if (params.accountName)
            p = p.append('accountName', '' + params.accountName);
        if (params.processName)
            p = p.append('processName', '' + params.processName);
        if (params.minutes)
            p = p.append('minute', '' + params.minutes);
        /** @type {?} */
        const httpOptions = { params: p };
        /** @type {?} */
        const url = this.getServerMonitorUrl() + `tbServers/${params.instanceKey}`;
        return this.http.get(url, httpOptions).pipe(catchError(this.handleError('TbLoggerService.getTBInfosLogs', [])));
    }
}
TbLoggerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
TbLoggerService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['env',] }] },
    { type: HttpClient },
    { type: StompRService },
    { type: NgZone }
];
/** @nocollapse */ TbLoggerService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(i0.ɵɵinject("env"), i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.StompRService), i0.ɵɵinject(i0.NgZone)); }, token: TbLoggerService, providedIn: "root" });
if (false) {
    /** @type {?} */
    TbLoggerService.prototype.loggerUrl;
    /** @type {?} */
    TbLoggerService.prototype.serverMonitorUrl;
    /** @type {?} */
    TbLoggerService.prototype.date;
    /** @type {?} */
    TbLoggerService.prototype.timeZoneOffSet;
    /** @type {?} */
    TbLoggerService.prototype.mqConnectionState;
    /** @type {?} */
    TbLoggerService.prototype.mqConnectionStateObservable;
    /**
     * @type {?}
     * @private
     */
    TbLoggerService.prototype._shouldLog;
    /**
     * @type {?}
     * @private
     */
    TbLoggerService.prototype._serverLog;
    /**
     * @type {?}
     * @private
     */
    TbLoggerService.prototype.env;
    /**
     * @type {?}
     * @private
     */
    TbLoggerService.prototype.http;
    /** @type {?} */
    TbLoggerService.prototype.stompService;
    /**
     * @type {?}
     * @private
     */
    TbLoggerService.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU5RCxPQUFPLEVBQWMsRUFBRSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHL0QsT0FBTyxFQUFFLHFCQUFxQixFQUFnQixNQUFNLHlDQUF5QyxDQUFDOzs7OztJQUsxRixjQUErQjs7QUFDbkMsTUFBTSxPQUFPLE1BQU07OztBQUFHLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQTs7OztBQUUxQyw4QkFRQzs7O0lBUEcsMkJBQWdCOztJQUNoQixtQ0FBd0I7O0lBQ3hCLCtCQUE0Qjs7SUFDNUIsZ0NBQTZCOztJQUM3Qix1QkFBYTs7SUFDYiw0QkFBa0I7O0lBQ2xCLHlCQUFnQjs7OztJQUloQixRQUFTO0lBQ1QsUUFBSztJQUNMLE9BQUk7SUFDSixRQUFLOzs7Ozs7Ozs7Ozs7QUFHVCxNQUFNLFVBQVUsVUFBVSxDQUFDLE9BQWUsRUFBRSxXQUFxQixRQUFRLENBQUMsS0FBSzs7VUFDckUsR0FBRyxHQUFhO1FBQ2xCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLGVBQWUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDcEMsV0FBVyxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQ2pELFlBQVksRUFBRSxZ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fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgU3RvbXBSU2VydmljZSwgU3RvbXBTdGF0ZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAc3RvbXAvc3RvbXBqcyc7XHJcblxyXG5pbXBvcnQgeyBMb2dnZXJPcGVyYXRpb25SZXN1bHQsIFRCU2VydmVySW5mbyB9IGZyb20gJy4uL21vZGVscy9sb2dnZXItb3BlcmF0aW9uLXJlc3VsdC5tb2RlbCc7XHJcbmltcG9ydCB7IEVudHJpZXNQYXJhbXMgfSBmcm9tICcuLi9tb2RlbHMvZW50cmllcy5tb2RlbCc7XHJcbmltcG9ydCB7IE1vbml0b3JQYXJhbXMgfSBmcm9tICcuLi9tb2RlbHMvbW9uaXRvci5tb2RlbCc7XHJcbmltcG9ydCB7IFRiTG9nZ2VyRW52aXJvbm1lbnQgfSBmcm9tICcuLi9tb2RlbHMvbG9nZ2VyLWVudmlyb25tZW50JztcclxuXHJcbmxldCBsb2dnZXJJbnN0YW5jZTogVGJMb2dnZXJTZXJ2aWNlO1xyXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gKCkgPT4gbG9nZ2VySW5zdGFuY2U7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExvZ0VudHJ5IHtcclxuICAgIE1lc3NhZ2U6IHN0cmluZztcclxuICAgIFJlZ2lzdGVyZWRhcHBpZDogc3RyaW5nO1xyXG4gICAgQWNjb3VudE5hbWU/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgU3Vic2NyaXB0aW9uPzogc3RyaW5nIHwgbnVsbDtcclxuICAgIEFwcD86IHN0cmluZztcclxuICAgIENhdGVnb3J5Pzogc3RyaW5nO1xyXG4gICAgTGV2ZWw6IExvZ0xldmVsO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBMb2dMZXZlbCB7XHJcbiAgICBUcmFjZSA9IDAsXHJcbiAgICBEZWJ1ZyxcclxuICAgIFdhcm4sXHJcbiAgICBFcnJvclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZUxvZyhtZXNzYWdlOiBzdHJpbmcsIGxvZ0xldmVsOiBMb2dMZXZlbCA9IExvZ0xldmVsLkRlYnVnKSB7XHJcbiAgICBjb25zdCBsb2c6IExvZ0VudHJ5ID0ge1xyXG4gICAgICAgIE1lc3NhZ2U6IG1lc3NhZ2UsXHJcbiAgICAgICAgUmVnaXN0ZXJlZGFwcGlkOiBsb2dnZXIoKS5nZXRBcHBJZCgpLFxyXG4gICAgICAgIEFjY291bnROYW1lOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnX2FjY291bnRuYW1lJyksXHJcbiAgICAgICAgU3Vic2NyaXB0aW9uOiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnX2NvbXBhbnknKSxcclxuICAgICAgICBDYXRlZ29yeTogJ0NsaWVudCcsXHJcbiAgICAgICAgTGV2ZWw6IGxvZ0xldmVsXHJcbiAgICB9OyBcclxuICAgIHJldHVybiBsb2c7XHJcbn0gXHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyU2VydmljZSB7XHJcbiAgICBsb2dnZXJVcmw6IHN0cmluZztcclxuICAgIHNlcnZlck1vbml0b3JVcmw6IHN0cmluZztcclxuICAgIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdGltZVpvbmVPZmZTZXQgPSAoKSA9PiAtdGhpcy5kYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkgLyA2MDtcclxuXHJcbiAgICBtcUNvbm5lY3Rpb25TdGF0ZTogU3RvbXBTdGF0ZSA9IFN0b21wU3RhdGUuQ0xPU0VEO1xyXG4gICAgbXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoU3RvbXBTdGF0ZS5DTE9TRUQpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIEBJbmplY3QoJ2VudicpIHByaXZhdGUgZW52OiBUYkxvZ2dlckVudmlyb25tZW50LFxyXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgXHJcbiAgICAgICAgcHVibGljIHN0b21wU2VydmljZTogU3RvbXBSU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lXHJcbiAgICApIHtcclxuICAgICAgICBsb2dnZXJJbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5sb2dnZXJVcmwgPSB0aGlzLmVudi5sb2dnZXIgJiYgdGhpcy5lbnYubG9nZ2VyLnVybDtcclxuICAgICAgICB0aGlzLnNlcnZlck1vbml0b3JVcmwgPSB0aGlzLmVudi5zZXJ2ZXJNb25pdG9yICYmIHRoaXMuZW52LnNlcnZlck1vbml0b3IudXJsO1xyXG4gICAgICAgIGlmIChlbnYuc3RvbXBDb25maWcpIHRoaXMubXFJbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbXFJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmVudi5zdG9tcENvbmZpZykge1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5jb25maWcgPSB0aGlzLmVudi5zdG9tcENvbmZpZztcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2UuaW5pdEFuZENvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2Uuc3RhdGUuc3Vic2NyaWJlKChzdGF0dXM6IFN0b21wU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGUgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZS5uZXh0KHN0YXR1cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSaXRvcm5hIGxhIEFwcCBJZCBkZWxsJ2FwcGxpY2F6aW9uZSBmcm9udGVuZCBjaGUgc3RhIGxvZ2dhbmRvLFxyXG4gICAgICogY2FyaWNhdGEgZGEgdW4gZmlsZSBkaSBjb25maWd1cmF6aW9uZSBjYXJpY2F0byBkaW5hbWljYW1lbnRlIChhc3NldHMvZW52aXJvbm1lbnQuanNvbilcclxuICAgICAqL1xyXG4gICAgZ2V0QXBwSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW52LmxvZ2dlci5hcHBJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJpdG9ybmEgbGEgYmFzZSB1cmwgZGVsIGxvZ2dlcixcclxuICAgICAqIGNhcmljYXRhIGRhIHVuIGZpbGUgZGkgY29uZmlndXJhemlvbmUgY2FyaWNhdG8gZGluYW1pY2FtZW50ZSAoYXNzZXRzL2Vudmlyb25tZW50Lmpzb24pXHJcbiAgICAgKi9cclxuICAgIGdldExvZ2dlclVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2dnZXJVcmwgPyB0aGlzLmxvZ2dlclVybCA6IHRoaXMuZW52LmxvZ2dlci51cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSaXRvcm5hIGxhIGFwaSBwZXIgaW5zZXJpcmUgbG9nIGNvbiBhcHBJZCBjb25maWd1cmF0byBpbiBlbnZpcm9ubWVudC5qc29uXHJcbiAgICAgKi9cclxuICAgIGdldExvZ2dlclBvc3RVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0TG9nZ2VyVXJsKCl9ZW50cmllcy8ke3RoaXMuZ2V0QXBwSWQoKX0vYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE00IEJhY2tlbmQgVVJMXHJcbiAgICAgKi9cclxuICAgIGdldFNlcnZlck1vbml0b3JVcmwoKSB7IFxyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlck1vbml0b3JVcmwgPyB0aGlzLnNlcnZlck1vbml0b3JVcmwgOiB0aGlzLmVudi5zZXJ2ZXJNb25pdG9yLnVybDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zaG91bGRMb2cgPSAobG9nTGV2ZWw6IExvZ0xldmVsKSA9PiBsb2dMZXZlbCA+PSB0aGlzLmVudi5sb2dnZXIubGV2ZWw7XHJcbiAgICBwcml2YXRlIF9zZXJ2ZXJMb2cgPSAobG9nTGV2ZWw6IExvZ0xldmVsLCBtZXNzYWdlOiBzdHJpbmcpID0+IHRoaXMuX3Nob3VsZExvZyhsb2dMZXZlbCkgJiYgdGhpcy5zZW5kTG9nKG1lc3NhZ2UsIGxvZ0xldmVsKTtcclxuXHJcbiAgICBwcml2YXRlIHNlbmRMb2cobWVzc2FnZTogc3RyaW5nLCBsb2dMZXZlbDogTG9nTGV2ZWwpIHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaHR0cFxyXG4gICAgICAgICAgICAgICAgLnBvc3QodGhpcy5nZXRMb2dnZXJQb3N0VXJsKCksIHByZXBhcmVMb2cobWVzc2FnZSwgbG9nTGV2ZWwpKVxyXG4gICAgICAgICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihfXyA9PiB7fSwgZXJyID0+IHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBsb2cobWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRMb2coTG9nTGV2ZWwuVHJhY2UpKSBjb25zb2xlLmxvZyhgJWMke21lc3NhZ2V9YCwgYGNvbG9yOiMzZGFmNjdgKTtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJMb2coTG9nTGV2ZWwuVHJhY2UsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBkZWJ1ZyhtZXNzYWdlPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3VsZExvZyhMb2dMZXZlbC5EZWJ1ZykpIGNvbnNvbGUubG9nKGAlYyR7bWVzc2FnZX1gLCBgY29sb3I6IzAyNzdiZGApO1xyXG4gICAgICAgIHRoaXMuX3NlcnZlckxvZyhMb2dMZXZlbC5EZWJ1ZywgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIHdhcm4obWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRMb2coTG9nTGV2ZWwuV2FybikpIGNvbnNvbGUubG9nKGAlYyR7bWVzc2FnZX1gLCBgY29sb3I6I0ZGOTYzM2ApO1xyXG4gICAgICAgIHRoaXMuX3NlcnZlckxvZyhMb2dMZXZlbC5XYXJuLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZXJyb3IobWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRMb2coTG9nTGV2ZWwuRXJyb3IpKSBjb25zb2xlLmVycm9yKGAlYyR7bWVzc2FnZX1gLCBgY29sb3I6cmVkYCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmVyTG9nKExvZ0xldmVsLkVycm9yLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZyBwZXIgc3RhdGlzdGljaGUgY2xpZW50IChlczogdXNhdG8gZGEgbG9naW4gcGFnZSBwZXIgdHJhY2NpYXJlIHJpc29sdXppb25lIHNjaGVybW8pXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBzdGF0KG1lc3NhZ2U/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21lc3NhZ2V9YCwgYGNvbG9yOiM4ODRFQTBgKTtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJMb2coTG9nTGV2ZWwuVHJhY2UsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGxvZ3M6IExvZ2dlck9wZXJhdGlvblJlc3VsdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbXM6IEVudHJpZXNQYXJhbXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExvZ3MocGFyYW1zOiBFbnRyaWVzUGFyYW1zKTogT2JzZXJ2YWJsZTxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIXBhcmFtcy5pbnN0YW5jZUtleSkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoZmFsc2UsICdFcnJvciAtIE5vIGluc3RhbmNlS2V5LCBubyBwYXJ0eScpO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBlbnRyaWVzLyR7cGFyYW1zLmluc3RhbmNlS2V5fWA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHAgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuaG93TWFueSkgcCA9IHAuYXBwZW5kKCdob3dNYW55JywgcGFyYW1zLmhvd01hbnkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMub2ZmU2V0KSBwID0gcC5hcHBlbmQoJ29mZlNldCcsIHBhcmFtcy5vZmZTZXQpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYWNjb3VudE5hbWUpIHAgPSBwLmFwcGVuZCgnYWNjb3VudE5hbWUnLCBwYXJhbXMuYWNjb3VudE5hbWUpOyBcclxuICAgICAgICBpZiAocGFyYW1zLnN1YnNjcmlwdGlvbktleSkgcCA9IHAuYXBwZW5kKCdzdWJzY3JpcHRpb24nLCBwYXJhbXMuc3Vic2NyaXB0aW9uS2V5KTtcclxuICAgICAgICBpZiAocGFyYW1zLmNhdGVnb3J5KSBwID0gcC5hcHBlbmQoJ2NhdGVnb3JpZXMnLCBwYXJhbXMuY2F0ZWdvcnkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXBwcykgcCA9IHAuYXBwZW5kKCdhcHBzJywgcGFyYW1zLmFwcHMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXBwVHlwZXMpIHAgPSBwLmFwcGVuZCgnYXBwVHlwZXMnLCBwYXJhbXMuYXBwVHlwZXMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMubGV2ZWxzKSBwID0gcC5hcHBlbmQoJ2xldmVscycsIHBhcmFtcy5sZXZlbHMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMucmFuZ2VEYXRlU3RhcnQgJiYgcGFyYW1zLnJhbmdlRGF0ZUVuZCkge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnJhbmdlRGF0ZVN0YXJ0ID09PSBwYXJhbXMucmFuZ2VEYXRlRW5kKSBwID0gcC5hcHBlbmQoJ2RhdGUnLCBwYXJhbXMucmFuZ2VEYXRlU3RhcnQgKyAnOycgKyBwYXJhbXMucmFuZ2VEYXRlRW5kKTtcclxuICAgICAgICAgICAgZWxzZSBwID0gcC5hcHBlbmQoJ2RhdGUnLCBwYXJhbXMucmFuZ2VEYXRlU3RhcnQgKyAnOycgKyBwYXJhbXMucmFuZ2VEYXRlRW5kKTtcclxuICAgICAgICBwID0gcC5hcHBlbmQoJ3RpbWVab25lT2ZmU2V0JywgdGhpcy50aW1lWm9uZU9mZlNldCgpLnRvU3RyaW5nKCkpOy8vY29uIGlsIHRpbWV6b25lb2ZmU2V0IG5vbiBwcmVuZGUgbCdvcmEgZGVzaWRlcmF0YSBzZW56YSBpbnZlY2Ugc2lcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCwgaHR0cE9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldExvZ3MnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRMb2dzJywgbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdChmYWxzZSwgJ0Vycm9yIC0gZ2V0TG9ncycpKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KGZhbHNlLCAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwcy8ke2FwcElkfWA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldEFwcHMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEFwcHMnLCBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KGZhbHNlLCAnRXJyb3IgLSBnZXRBcHBzJykpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFwcFR5cGVzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KGZhbHNlLCAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwVHlwZXMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwVHlwZXMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzJywgbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdChmYWxzZSwgJ0Vycm9yIC0gZ2V0QXBwVHlwZXMnKSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW5zdGFuY2VLZXkoKTogT2JzZXJ2YWJsZTxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBJZHNgO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKHVybCwgJ1RiTG9nZ2VyU2VydmljZS5nZXRJbnN0YW5jZUtleSB3aXRoIGFwcElkOiAnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRJbnN0YW5jZUtleScsIG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoZmFsc2UsICdFcnJvciAtIGdldEluc3RhbmNlS2V5JykpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMZWdnZSB0dXR0ZSBsZSBzdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFN1YnNjcmlwdGlvbktleSgpOiBPYnNlcnZhYmxlPExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgc3Vic2NyaXB0aW9uS2V5c2A7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRTdWJzY3JpcHRpb25LZXk6ICcsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0U3Vic2NyaXB0aW9uS2V5JywgbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdChmYWxzZSwgJ0Vycm9yIC0gZ2V0U3Vic2NyaXB0aW9uS2V5JykpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDYXRlZ29yaWVzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KGZhbHNlLCAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgY2F0ZWdvcmllcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRDYXRlZ29yaWVzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRDYXRlZ29yaWVzJywgbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdChmYWxzZSwgJ0Vycm9yIC0gIGdldENhdGVnb3JpZXMnKSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBIdHRwIG9wZXJhdGlvbiB0aGF0IGZhaWxlZC5cclxuICAgICAqIExldCB0aGUgYXBwIGNvbnRpbnVlLlxyXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiAtIG5hbWUgb2YgdGhlIG9wZXJhdGlvbiB0aGF0IGZhaWxlZFxyXG4gICAgICogQHBhcmFtIHJlc3VsdCAtIG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBhcyB0aGUgb2JzZXJ2YWJsZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUVycm9yPFQ+KG9wZXJhdGlvbiA9ICdvcGVyYXRpb24nLCByZXN1bHQ/OiBUKSB7XHJcbiAgICAgICAgcmV0dXJuIChlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxUPiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7b3BlcmF0aW9ufSBmYWlsZWQ6ICR7ZXJyb3IuZXJyb3J9YCk7XHJcblxyXG4gICAgICAgICAgICAvLyBMZXQgdGhlIGFwcCBrZWVwIHJ1bm5pbmcgYnkgcmV0dXJuaW5nIGFuIGVtcHR5IHJlc3VsdC5cclxuICAgICAgICAgICAgcmV0dXJuIG9mKHJlc3VsdCBhcyBUKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVzc2lvbmUgYSBSYWJiaXRNUVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXFDb25uZWN0KHF1ZXVlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLnN1YnNjcmliZShxdWV1ZU5hbWUpLnBpcGUobWFwKChtc2c6IE1lc3NhZ2UpID0+IEpTT04ucGFyc2UobXNnLmJvZHkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1xQ29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBtcURpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBQQVJURSBUQlNFUlZFUk1PTklUT1JcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHB1YmxpYyBnZXRUQkluZm9zTG9ncyhwYXJhbXM6IE1vbml0b3JQYXJhbXMpOiBPYnNlcnZhYmxlPFRCU2VydmVySW5mb1tdPiB7XHJcbiAgICAgICAgbGV0IHAgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLmFjY291bnROYW1lKSBwID0gcC5hcHBlbmQoJ2FjY291bnROYW1lJywgJycgKyBwYXJhbXMuYWNjb3VudE5hbWUpO1xyXG4gICAgICAgIGlmIChwYXJhbXMucHJvY2Vzc05hbWUpIHAgPSBwLmFwcGVuZCgncHJvY2Vzc05hbWUnLCAnJyArIHBhcmFtcy5wcm9jZXNzTmFtZSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5taW51dGVzKSBwID0gcC5hcHBlbmQoJ21pbnV0ZScsICcnICsgcGFyYW1zLm1pbnV0ZXMpO1xyXG5cclxuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IHsgcGFyYW1zOiBwIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0U2VydmVyTW9uaXRvclVybCgpICsgYHRiU2VydmVycy8ke3BhcmFtcy5pbnN0YW5jZUtleX1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxUQlNlcnZlckluZm9bXT4odXJsLCBodHRwT3B0aW9ucykucGlwZShjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRUQkluZm9zTG9ncycsIFtdKSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==