/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
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
     */
    constructor(env, http, stompService) {
        this.env = env;
        this.http = http;
        this.stompService = stompService;
        this.howMany = 100;
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
        // console.log('this.getLoggerUrl()', this.getLoggerUrl());
        /** @type {?} */
        const url = this.getLoggerUrl() + `entries/${params.instanceKey}`;
        /** @type {?} */
        let p = new HttpParams();
        p = p.append('howMany', '' + this.howMany);
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
                p = p.append('date', params.rangeDateStart);
            else
                p = p.append('date', params.rangeDateStart + ';' + params.rangeDateEnd);
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
        return this.http.get(url, httpOptions).pipe(catchError(this.handleError('TbLoggerService.getTBInfosLogs', false)));
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
    { type: StompRService }
];
/** @nocollapse */ TbLoggerService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(i0.ɵɵinject("env"), i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.StompRService)); }, token: TbLoggerService, providedIn: "root" });
if (false) {
    /** @type {?} */
    TbLoggerService.prototype.loggerUrl;
    /** @type {?} */
    TbLoggerService.prototype.serverMonitorUrl;
    /**
     * @type {?}
     * @private
     */
    TbLoggerService.prototype.howMany;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBYyxFQUFFLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUcvRCxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0seUNBQXlDLENBQUM7Ozs7O0lBSzFGLGNBQStCOztBQUNuQyxNQUFNLE9BQU8sTUFBTTs7O0FBQUcsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFBOzs7O0FBRTFDLDhCQVFDOzs7SUFQRywyQkFBZ0I7O0lBQ2hCLG1DQUF3Qjs7SUFDeEIsK0JBQTRCOztJQUM1QixnQ0FBNkI7O0lBQzdCLHVCQUFhOztJQUNiLDRCQUFrQjs7SUFDbEIseUJBQWdCOzs7O0lBSWhCLFFBQVM7SUFDVCxRQUFLO0lBQ0wsT0FBSTtJQUNKLFFBQUs7Ozs7Ozs7Ozs7OztBQUdULE1BQU0sVUFBVSxVQUFVLENBQUMsT0FBZSxFQUFFLFdBQXFCLFFBQVEsQ0FBQyxLQUFLOztVQUNyRSxHQUFHLEdBQWE7UUFDbEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsZUFBZSxFQUFFLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNwQyxXQUFXLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDakQsWUFBWSxFQUFFLFlBQVksQ0FBQyxP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VUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZJLENBQUM7OztZQXBRSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7Ozs7NENBU2dCLE1BQU0sU0FBQyxLQUFLO1lBeERwQixVQUFVO1lBS1YsYUFBYTs7Ozs7SUE0Q2xCLG9DQUFrQjs7SUFDbEIsMkNBQXlCOzs7OztJQUN6QixrQ0FBc0I7O0lBRXRCLDRDQUFrRDs7SUFDbEQsc0RBQThGOzs7OztJQWtEOUYscUNBQStFOzs7OztJQUMvRSxxQ0FBMkg7Ozs7O0lBakQvRyw4QkFBK0M7Ozs7O0lBQUUsK0JBQXdCOztJQUFFLHVDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuXHJcbmltcG9ydCB7IFN0b21wUlNlcnZpY2UsIFN0b21wU3RhdGUgfSBmcm9tICdAc3RvbXAvbmcyLXN0b21wanMnO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnQHN0b21wL3N0b21wanMnO1xyXG5cclxuaW1wb3J0IHsgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0LCBUQlNlcnZlckluZm8gfSBmcm9tICcuLi9tb2RlbHMvbG9nZ2VyLW9wZXJhdGlvbi1yZXN1bHQubW9kZWwnO1xyXG5pbXBvcnQgeyBFbnRyaWVzUGFyYW1zIH0gZnJvbSAnLi4vbW9kZWxzL2VudHJpZXMubW9kZWwnO1xyXG5pbXBvcnQgeyBNb25pdG9yUGFyYW1zIH0gZnJvbSAnLi4vbW9kZWxzL21vbml0b3IubW9kZWwnO1xyXG5pbXBvcnQgeyBUYkxvZ2dlckVudmlyb25tZW50IH0gZnJvbSAnLi4vbW9kZWxzL2xvZ2dlci1lbnZpcm9ubWVudCc7XHJcblxyXG5sZXQgbG9nZ2VySW5zdGFuY2U6IFRiTG9nZ2VyU2VydmljZTtcclxuZXhwb3J0IGNvbnN0IGxvZ2dlciA9ICgpID0+IGxvZ2dlckluc3RhbmNlO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMb2dFbnRyeSB7XHJcbiAgICBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBSZWdpc3RlcmVkYXBwaWQ6IHN0cmluZztcclxuICAgIEFjY291bnROYW1lPzogc3RyaW5nIHwgbnVsbDtcclxuICAgIFN1YnNjcmlwdGlvbj86IHN0cmluZyB8IG51bGw7XHJcbiAgICBBcHA/OiBzdHJpbmc7XHJcbiAgICBDYXRlZ29yeT86IHN0cmluZztcclxuICAgIExldmVsOiBMb2dMZXZlbDtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gTG9nTGV2ZWwge1xyXG4gICAgVHJhY2UgPSAwLFxyXG4gICAgRGVidWcsXHJcbiAgICBXYXJuLFxyXG4gICAgRXJyb3JcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVMb2cobWVzc2FnZTogc3RyaW5nLCBsb2dMZXZlbDogTG9nTGV2ZWwgPSBMb2dMZXZlbC5EZWJ1Zykge1xyXG4gICAgY29uc3QgbG9nOiBMb2dFbnRyeSA9IHtcclxuICAgICAgICBNZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICAgIFJlZ2lzdGVyZWRhcHBpZDogbG9nZ2VyKCkuZ2V0QXBwSWQoKSxcclxuICAgICAgICBBY2NvdW50TmFtZTogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19hY2NvdW50bmFtZScpLFxyXG4gICAgICAgIFN1YnNjcmlwdGlvbjogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19jb21wYW55JyksXHJcbiAgICAgICAgQ2F0ZWdvcnk6ICdDbGllbnQnLFxyXG4gICAgICAgIExldmVsOiBsb2dMZXZlbFxyXG4gICAgfTtcclxuICAgIHJldHVybiBsb2c7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGJMb2dnZXJTZXJ2aWNlIHtcclxuICAgIGxvZ2dlclVybDogc3RyaW5nO1xyXG4gICAgc2VydmVyTW9uaXRvclVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBob3dNYW55ID0gMTAwO1xyXG5cclxuICAgIG1xQ29ubmVjdGlvblN0YXRlOiBTdG9tcFN0YXRlID0gU3RvbXBTdGF0ZS5DTE9TRUQ7XHJcbiAgICBtcUNvbm5lY3Rpb25TdGF0ZU9ic2VydmFibGU6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChTdG9tcFN0YXRlLkNMT1NFRCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgnZW52JykgcHJpdmF0ZSBlbnY6IFRiTG9nZ2VyRW52aXJvbm1lbnQsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHVibGljIHN0b21wU2VydmljZTogU3RvbXBSU2VydmljZSkge1xyXG4gICAgICAgIGxvZ2dlckluc3RhbmNlID0gdGhpcztcclxuICAgICAgICB0aGlzLmxvZ2dlclVybCA9IHRoaXMuZW52LmxvZ2dlciAmJiB0aGlzLmVudi5sb2dnZXIudXJsO1xyXG4gICAgICAgIHRoaXMuc2VydmVyTW9uaXRvclVybCA9IHRoaXMuZW52LnNlcnZlck1vbml0b3IgJiYgdGhpcy5lbnYuc2VydmVyTW9uaXRvci51cmw7XHJcbiAgICAgICAgaWYgKGVudi5zdG9tcENvbmZpZykgdGhpcy5tcUluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtcUluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW52LnN0b21wQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvbXBTZXJ2aWNlLmNvbmZpZyA9IHRoaXMuZW52LnN0b21wQ29uZmlnO1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5pbml0QW5kQ29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5zdGF0ZS5zdWJzY3JpYmUoKHN0YXR1czogU3RvbXBTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tcUNvbm5lY3Rpb25TdGF0ZSA9IHN0YXR1cztcclxuICAgICAgICAgICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlLm5leHQoc3RhdHVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUml0b3JuYSBsYSBBcHAgSWQgZGVsbCdhcHBsaWNhemlvbmUgZnJvbnRlbmQgY2hlIHN0YSBsb2dnYW5kbyxcclxuICAgICAqIGNhcmljYXRhIGRhIHVuIGZpbGUgZGkgY29uZmlndXJhemlvbmUgY2FyaWNhdG8gZGluYW1pY2FtZW50ZSAoYXNzZXRzL2Vudmlyb25tZW50Lmpzb24pXHJcbiAgICAgKi9cclxuICAgIGdldEFwcElkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVudi5sb2dnZXIuYXBwSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSaXRvcm5hIGxhIGJhc2UgdXJsIGRlbCBsb2dnZXIsXHJcbiAgICAgKiBjYXJpY2F0YSBkYSB1biBmaWxlIGRpIGNvbmZpZ3VyYXppb25lIGNhcmljYXRvIGRpbmFtaWNhbWVudGUgKGFzc2V0cy9lbnZpcm9ubWVudC5qc29uKVxyXG4gICAgICovXHJcbiAgICBnZXRMb2dnZXJVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nZ2VyVXJsID8gdGhpcy5sb2dnZXJVcmwgOiB0aGlzLmVudi5sb2dnZXIudXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUml0b3JuYSBsYSBhcGkgcGVyIGluc2VyaXJlIGxvZyBjb24gYXBwSWQgY29uZmlndXJhdG8gaW4gZW52aXJvbm1lbnQuanNvblxyXG4gICAgICovXHJcbiAgICBnZXRMb2dnZXJQb3N0VXJsKCkge1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLmdldExvZ2dlclVybCgpfWVudHJpZXMvJHt0aGlzLmdldEFwcElkKCl9L2A7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNNCBCYWNrZW5kIFVSTFxyXG4gICAgICovXHJcbiAgICBnZXRTZXJ2ZXJNb25pdG9yVXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlck1vbml0b3JVcmwgPyB0aGlzLnNlcnZlck1vbml0b3JVcmwgOiB0aGlzLmVudi5zZXJ2ZXJNb25pdG9yLnVybDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zaG91bGRMb2cgPSAobG9nTGV2ZWw6IExvZ0xldmVsKSA9PiBsb2dMZXZlbCA+PSB0aGlzLmVudi5sb2dnZXIubGV2ZWw7XHJcbiAgICBwcml2YXRlIF9zZXJ2ZXJMb2cgPSAobG9nTGV2ZWw6IExvZ0xldmVsLCBtZXNzYWdlOiBzdHJpbmcpID0+IHRoaXMuX3Nob3VsZExvZyhsb2dMZXZlbCkgJiYgdGhpcy5zZW5kTG9nKG1lc3NhZ2UsIGxvZ0xldmVsKTtcclxuXHJcbiAgICBwcml2YXRlIHNlbmRMb2cobWVzc2FnZTogc3RyaW5nLCBsb2dMZXZlbDogTG9nTGV2ZWwpIHtcclxuICAgICAgICB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLnBvc3QodGhpcy5nZXRMb2dnZXJQb3N0VXJsKCksIHByZXBhcmVMb2cobWVzc2FnZSwgbG9nTGV2ZWwpKVxyXG4gICAgICAgICAgICAudG9Qcm9taXNlKClcclxuICAgICAgICAgICAgLnRoZW4oX18gPT4ge30sIGVyciA9PiB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgbG9nKG1lc3NhZ2U/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvdWxkTG9nKExvZ0xldmVsLlRyYWNlKSkgY29uc29sZS5sb2coYCVjJHttZXNzYWdlfWAsIGBjb2xvcjojM2RhZjY3YCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmVyTG9nKExvZ0xldmVsLlRyYWNlLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZGVidWcobWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRMb2coTG9nTGV2ZWwuRGVidWcpKSBjb25zb2xlLmxvZyhgJWMke21lc3NhZ2V9YCwgYGNvbG9yOiMwMjc3YmRgKTtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJMb2coTG9nTGV2ZWwuRGVidWcsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICB3YXJuKG1lc3NhZ2U/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvdWxkTG9nKExvZ0xldmVsLldhcm4pKSBjb25zb2xlLmxvZyhgJWMke21lc3NhZ2V9YCwgYGNvbG9yOiNGRjk2MzNgKTtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJMb2coTG9nTGV2ZWwuV2FybiwgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGVycm9yKG1lc3NhZ2U/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvdWxkTG9nKExvZ0xldmVsLkVycm9yKSkgY29uc29sZS5lcnJvcihgJWMke21lc3NhZ2V9YCwgYGNvbG9yOnJlZGApO1xyXG4gICAgICAgIHRoaXMuX3NlcnZlckxvZyhMb2dMZXZlbC5FcnJvciwgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2cgcGVyIHN0YXRpc3RpY2hlIGNsaWVudCAoZXM6IHVzYXRvIGRhIGxvZ2luIHBhZ2UgcGVyIHRyYWNjaWFyZSByaXNvbHV6aW9uZSBzY2hlcm1vKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgc3RhdChtZXNzYWdlPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttZXNzYWdlfWAsIGBjb2xvcjojODg0RUEwYCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmVyTG9nKExvZ0xldmVsLlRyYWNlLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBsb2dzOiBMb2dnZXJPcGVyYXRpb25SZXN1bHRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zOiBFbnRyaWVzUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRMb2dzKHBhcmFtczogRW50cmllc1BhcmFtcyk6IE9ic2VydmFibGU8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFwYXJhbXMuaW5zdGFuY2VLZXkpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KGZhbHNlLCAnRXJyb3IgLSBObyBpbnN0YW5jZUtleSwgbm8gcGFydHknKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMuZ2V0TG9nZ2VyVXJsKCknLCB0aGlzLmdldExvZ2dlclVybCgpKTtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGVudHJpZXMvJHtwYXJhbXMuaW5zdGFuY2VLZXl9YDtcclxuXHJcbiAgICAgICAgbGV0IHAgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICAgIHAgPSBwLmFwcGVuZCgnaG93TWFueScsICcnICsgdGhpcy5ob3dNYW55KTtcclxuICAgICAgICBpZiAocGFyYW1zLmFjY291bnROYW1lKSBwID0gcC5hcHBlbmQoJ2FjY291bnROYW1lJywgcGFyYW1zLmFjY291bnROYW1lKTtcclxuICAgICAgICBpZiAocGFyYW1zLnN1YnNjcmlwdGlvbktleSkgcCA9IHAuYXBwZW5kKCdzdWJzY3JpcHRpb24nLCBwYXJhbXMuc3Vic2NyaXB0aW9uS2V5KTtcclxuICAgICAgICBpZiAocGFyYW1zLmNhdGVnb3J5KSBwID0gcC5hcHBlbmQoJ2NhdGVnb3JpZXMnLCBwYXJhbXMuY2F0ZWdvcnkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXBwcykgcCA9IHAuYXBwZW5kKCdhcHBzJywgcGFyYW1zLmFwcHMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXBwVHlwZXMpIHAgPSBwLmFwcGVuZCgnYXBwVHlwZXMnLCBwYXJhbXMuYXBwVHlwZXMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMubGV2ZWxzKSBwID0gcC5hcHBlbmQoJ2xldmVscycsIHBhcmFtcy5sZXZlbHMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMucmFuZ2VEYXRlU3RhcnQgJiYgcGFyYW1zLnJhbmdlRGF0ZUVuZCkge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnJhbmdlRGF0ZVN0YXJ0ID09PSBwYXJhbXMucmFuZ2VEYXRlRW5kKSBwID0gcC5hcHBlbmQoJ2RhdGUnLCBwYXJhbXMucmFuZ2VEYXRlU3RhcnQpO1xyXG4gICAgICAgICAgICBlbHNlIHAgPSBwLmFwcGVuZCgnZGF0ZScsIHBhcmFtcy5yYW5nZURhdGVTdGFydCArICc7JyArIHBhcmFtcy5yYW5nZURhdGVFbmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgcGFyYW1zOiBwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwsIGh0dHBPcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRMb2dzJywgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0TG9ncycsIG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoZmFsc2UsICdFcnJvciAtIGdldExvZ3MnKSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdChmYWxzZSwgJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcHMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwcycsIG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoZmFsc2UsICdFcnJvciAtIGdldEFwcHMnKSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwVHlwZXMoYXBwSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFhcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoZmFsc2UsICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eScpO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBUeXBlcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwVHlwZXMnLCBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KGZhbHNlLCAnRXJyb3IgLSBnZXRBcHBUeXBlcycpKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbnN0YW5jZUtleSgpOiBPYnNlcnZhYmxlPExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwSWRzYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZyh1cmwsICdUYkxvZ2dlclNlcnZpY2UuZ2V0SW5zdGFuY2VLZXkgd2l0aCBhcHBJZDogJywgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0SW5zdGFuY2VLZXknLCBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KGZhbHNlLCAnRXJyb3IgLSBnZXRJbnN0YW5jZUtleScpKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGVnZ2UgdHV0dGUgbGUgc3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTdWJzY3JpcHRpb25LZXkoKTogT2JzZXJ2YWJsZTxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYHN1YnNjcmlwdGlvbktleXNgO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0U3Vic2NyaXB0aW9uS2V5OiAnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldFN1YnNjcmlwdGlvbktleScsIG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoZmFsc2UsICdFcnJvciAtIGdldFN1YnNjcmlwdGlvbktleScpKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2F0ZWdvcmllcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdChmYWxzZSwgJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGNhdGVnb3JpZXMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0Q2F0ZWdvcmllcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0Q2F0ZWdvcmllcycsIG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoZmFsc2UsICdFcnJvciAtICBnZXRDYXRlZ29yaWVzJykpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgSHR0cCBvcGVyYXRpb24gdGhhdCBmYWlsZWQuXHJcbiAgICAgKiBMZXQgdGhlIGFwcCBjb250aW51ZS5cclxuICAgICAqIEBwYXJhbSBvcGVyYXRpb24gLSBuYW1lIG9mIHRoZSBvcGVyYXRpb24gdGhhdCBmYWlsZWRcclxuICAgICAqIEBwYXJhbSByZXN1bHQgLSBvcHRpb25hbCB2YWx1ZSB0byByZXR1cm4gYXMgdGhlIG9ic2VydmFibGUgcmVzdWx0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYW5kbGVFcnJvcjxUPihvcGVyYXRpb24gPSAnb3BlcmF0aW9uJywgcmVzdWx0PzogVCkge1xyXG4gICAgICAgIHJldHVybiAoZXJyb3I6IGFueSk6IE9ic2VydmFibGU8VD4gPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke29wZXJhdGlvbn0gZmFpbGVkOiAke2Vycm9yLmVycm9yfWApO1xyXG5cclxuICAgICAgICAgICAgLy8gTGV0IHRoZSBhcHAga2VlcCBydW5uaW5nIGJ5IHJldHVybmluZyBhbiBlbXB0eSByZXN1bHQuXHJcbiAgICAgICAgICAgIHJldHVybiBvZihyZXN1bHQgYXMgVCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lc3Npb25lIGEgUmFiYml0TVFcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1xQ29ubmVjdChxdWV1ZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5zdWJzY3JpYmUocXVldWVOYW1lKS5waXBlKG1hcCgobXNnOiBNZXNzYWdlKSA9PiBKU09OLnBhcnNlKG1zZy5ib2R5KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtcUNvbm5lY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9tcFNlcnZpY2UuY29ubmVjdGVkKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbXFEaXNjb25uZWN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gUEFSVEUgVEJTRVJWRVJNT05JVE9SXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwdWJsaWMgZ2V0VEJJbmZvc0xvZ3MocGFyYW1zOiBNb25pdG9yUGFyYW1zKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVEJTZXJ2ZXJJbmZvW10+IHtcclxuICAgICAgICBsZXQgcCA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMuYWNjb3VudE5hbWUpIHAgPSBwLmFwcGVuZCgnYWNjb3VudE5hbWUnLCAnJyArIHBhcmFtcy5hY2NvdW50TmFtZSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5wcm9jZXNzTmFtZSkgcCA9IHAuYXBwZW5kKCdwcm9jZXNzTmFtZScsICcnICsgcGFyYW1zLnByb2Nlc3NOYW1lKTtcclxuICAgICAgICBpZiAocGFyYW1zLm1pbnV0ZXMpIHAgPSBwLmFwcGVuZCgnbWludXRlJywgJycgKyBwYXJhbXMubWludXRlcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGh0dHBPcHRpb25zID0geyBwYXJhbXM6IHAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRTZXJ2ZXJNb25pdG9yVXJsKCkgKyBgdGJTZXJ2ZXJzLyR7cGFyYW1zLmluc3RhbmNlS2V5fWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFRCU2VydmVySW5mb1tdPih1cmwsIGh0dHBPcHRpb25zKS5waXBlKGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldFRCSW5mb3NMb2dzJywgZmFsc2UpKSk7XHJcbiAgICB9XHJcbn1cclxuIl19