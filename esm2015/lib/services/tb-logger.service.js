/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        (logLevel, message) => this._shouldLog(logLevel) && this.http.post(this.getLoggerPostUrl(), prepareLog(message, logLevel)).toPromise());
        loggerInstance = this;
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
        return sessionStorage.getItem('_instanceKey') || this.env.logger.appId;
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
     * Console.log in attesa di post to logger
     *
     * @param {?=} message
     * @return {?}
     */
    log(message) {
        if (this._shouldLog(LogLevel.Trace))
            console.log(`%c${message}`, `color:#3daf67`);
        this._serverLog(LogLevel.Trace, message);
    }
    /**
     * Console.log in attesa di post to logger
     *
     * @param {?=} message
     * @return {?}
     */
    debug(message) {
        if (this._shouldLog(LogLevel.Trace))
            console.log(`%c${message}`, `color:#0277bd`);
        this._serverLog(LogLevel.Debug, message);
    }
    /**
     * Console.warn in attesa di post to logger
     *
     * @param {?=} message
     * @return {?}
     */
    warn(message) {
        if (this._shouldLog(LogLevel.Trace))
            console.log(`%c${message}`, `color:#FF9633`);
        this._serverLog(LogLevel.Warn, message);
    }
    /**
     * Console.error in attesa di post to logger
     *
     * @param {?=} message
     * @return {?}
     */
    error(message) {
        if (this._shouldLog(LogLevel.Error))
            console.error(`%c${message}`, `color:red`);
        this._serverLog(LogLevel.Error, message);
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
            const error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No instanceKey, no party';
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
        catchError(this.handleError('TbLoggerService.getLogs', false)));
    }
    /**
     * @param {?} appId
     * @return {?}
     */
    getApps(appId) {
        if (!appId) {
            /** @type {?} */
            const error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No appId, no party';
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `apps/${appId}`;
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getApps with appId: ', appId, op)),
        catchError(this.handleError('TbLoggerService.getApps', false)));
    }
    /**
     * @param {?} appId
     * @return {?}
     */
    getAppTypes(appId) {
        if (!appId) {
            /** @type {?} */
            const error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No appId, no party';
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `appTypes/${appId}`;
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getAppTypes with appId: ', appId, op)),
        catchError(this.handleError('TbLoggerService.getAppTypes', false)));
    }
    /**
     * @return {?}
     */
    getInstanceKey() {
        /** @type {?} */
        const url = this.getLoggerUrl() + `appIds`;
        return this.http.get(url).pipe(
        // tap(op => console.log(url, 'TbLoggerService.getInstanceKey with appId: ', op)),
        catchError(this.handleError('TbLoggerService.getInstanceKey', false)));
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
        catchError(this.handleError('TbLoggerService.getSubscriptionKey', false)));
    }
    /**
     * @param {?} appId
     * @return {?}
     */
    getCategories(appId) {
        if (!appId) {
            /** @type {?} */
            const error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No appId, no party';
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `categories/${appId}`;
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getCategories with appId: ', appId, op)),
        catchError(this.handleError('TbLoggerService.getCategories', false)));
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
/** @nocollapse */ TbLoggerService.ngInjectableDef = i0.defineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(i0.inject("env"), i0.inject(i1.HttpClient), i0.inject(i2.StompRService)); }, token: TbLoggerService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBYyxFQUFFLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUcvRCxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0seUNBQXlDLENBQUM7Ozs7O0lBSTFGLGNBQStCOztBQUNuQyxNQUFNLE9BQU8sTUFBTTs7O0FBQUcsR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFBOzs7O0FBRTFDLDhCQVFDOzs7SUFQRywyQkFBZ0I7O0lBQ2hCLG1DQUF3Qjs7SUFDeEIsK0JBQXFCOztJQUNyQixnQ0FBc0I7O0lBQ3RCLHVCQUFhOztJQUNiLDRCQUFrQjs7SUFDbEIseUJBQWdCOzs7O0lBSWhCLFFBQVM7SUFDVCxRQUFLO0lBQ0wsT0FBSTtJQUNKLFFBQUs7Ozs7Ozs7Ozs7OztBQUdULE1BQU0sVUFBVSxVQUFVLENBQUMsT0FBZSxFQUFFLFdBQXFCLFFBQVEsQ0FBQyxLQUFLOztVQUNyRSxHQUFHLEdBQWE7UUFDbEIsT0FBTyxFQUFFLE9BQU87UUFDaEIsZUFBZSxFQUFFLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNwQyxXQUFXLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7UUFDakQsWUFBWSxFQUFFLFlBQVksQ0FBQyxP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VyxDQUFDLENBQUM7UUFDN0UsSUFBSSxNQUFNLENBQUMsV0FBVztZQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdFLElBQUksTUFBTSxDQUFDLE9BQU87WUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Y0FFMUQsV0FBVyxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTs7Y0FFM0IsR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLGFBQWEsTUFBTSxDQUFDLFdBQVcsRUFBRTtRQUUxRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFpQixHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2SSxDQUFDOzs7WUEvUEosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7OzRDQVNnQixNQUFNLFNBQUMsS0FBSztZQXZEcEIsVUFBVTtZQUtWLGFBQWE7Ozs7O0lBMkNsQixvQ0FBeUI7O0lBQ3pCLDJDQUFnQzs7Ozs7SUFDaEMsa0NBQXNCOztJQUV0Qiw0Q0FBeUQ7O0lBQ3pELHNEQUF5Rzs7Ozs7SUFnRHpHLHFDQUErRTs7Ozs7SUFDL0UscUNBQ29IOzs7OztJQWhEeEcsOEJBQTBCOzs7OztJQUFFLCtCQUF3Qjs7SUFBRSx1Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBTdG9tcFJTZXJ2aWNlLCBTdG9tcFN0YXRlIH0gZnJvbSAnQHN0b21wL25nMi1zdG9tcGpzJztcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BzdG9tcC9zdG9tcGpzJztcclxuXHJcbmltcG9ydCB7IExvZ2dlck9wZXJhdGlvblJlc3VsdCwgVEJTZXJ2ZXJJbmZvIH0gZnJvbSAnLi4vbW9kZWxzL2xvZ2dlci1vcGVyYXRpb24tcmVzdWx0Lm1vZGVsJztcclxuaW1wb3J0IHsgRW50cmllc1BhcmFtcyB9IGZyb20gJy4uL21vZGVscy9lbnRyaWVzLm1vZGVsJztcclxuaW1wb3J0IHsgTW9uaXRvclBhcmFtcyB9IGZyb20gJy4uL21vZGVscy9tb25pdG9yLm1vZGVsJztcclxuXHJcbmxldCBsb2dnZXJJbnN0YW5jZTogVGJMb2dnZXJTZXJ2aWNlO1xyXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gKCkgPT4gbG9nZ2VySW5zdGFuY2U7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExvZ0VudHJ5IHtcclxuICAgIE1lc3NhZ2U6IHN0cmluZztcclxuICAgIFJlZ2lzdGVyZWRhcHBpZDogc3RyaW5nO1xyXG4gICAgQWNjb3VudE5hbWU/OiBzdHJpbmc7XHJcbiAgICBTdWJzY3JpcHRpb24/OiBzdHJpbmc7XHJcbiAgICBBcHA/OiBzdHJpbmc7XHJcbiAgICBDYXRlZ29yeT86IHN0cmluZztcclxuICAgIExldmVsOiBMb2dMZXZlbDtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gTG9nTGV2ZWwge1xyXG4gICAgVHJhY2UgPSAwLFxyXG4gICAgRGVidWcsXHJcbiAgICBXYXJuLFxyXG4gICAgRXJyb3JcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVMb2cobWVzc2FnZTogc3RyaW5nLCBsb2dMZXZlbDogTG9nTGV2ZWwgPSBMb2dMZXZlbC5EZWJ1Zykge1xyXG4gICAgY29uc3QgbG9nOiBMb2dFbnRyeSA9IHtcclxuICAgICAgICBNZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICAgIFJlZ2lzdGVyZWRhcHBpZDogbG9nZ2VyKCkuZ2V0QXBwSWQoKSxcclxuICAgICAgICBBY2NvdW50TmFtZTogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19hY2NvdW50bmFtZScpLFxyXG4gICAgICAgIFN1YnNjcmlwdGlvbjogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19jb21wYW55JyksXHJcbiAgICAgICAgQ2F0ZWdvcnk6ICdDbGllbnQnLFxyXG4gICAgICAgIExldmVsOiBsb2dMZXZlbFxyXG4gICAgfTtcclxuICAgIHJldHVybiBsb2c7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGJMb2dnZXJTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBsb2dnZXJVcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZXJ2ZXJNb25pdG9yVXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGhvd01hbnkgPSAxMDA7XHJcblxyXG4gICAgcHVibGljIG1xQ29ubmVjdGlvblN0YXRlOiBTdG9tcFN0YXRlID0gU3RvbXBTdGF0ZS5DTE9TRUQ7XHJcbiAgICBwdWJsaWMgbXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlOiBCZWhhdmlvclN1YmplY3Q8U3RvbXBTdGF0ZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFN0b21wU3RhdGUuQ0xPU0VEKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdlbnYnKSBwcml2YXRlIGVudiwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwdWJsaWMgc3RvbXBTZXJ2aWNlOiBTdG9tcFJTZXJ2aWNlKSB7XHJcbiAgICAgICAgbG9nZ2VySW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIGlmIChlbnYuc3RvbXBDb25maWcpIHRoaXMubXFJbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbXFJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmVudi5zdG9tcENvbmZpZykge1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5jb25maWcgPSB0aGlzLmVudi5zdG9tcENvbmZpZztcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2UuaW5pdEFuZENvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2Uuc3RhdGUuc3Vic2NyaWJlKChzdGF0dXM6IFN0b21wU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGUgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZS5uZXh0KHN0YXR1cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJpdG9ybmEgbGEgQXBwIElkIGRlbGwnYXBwbGljYXppb25lIGZyb250ZW5kIGNoZSBzdGEgbG9nZ2FuZG8sXHJcbiAgICAgKiBjYXJpY2F0YSBkYSB1biBmaWxlIGRpIGNvbmZpZ3VyYXppb25lIGNhcmljYXRvIGRpbmFtaWNhbWVudGUgKGFzc2V0cy9lbnZpcm9ubWVudC5qc29uKVxyXG4gICAgICovXHJcbiAgICBnZXRBcHBJZCgpIHtcclxuICAgICAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnX2luc3RhbmNlS2V5JykgfHwgdGhpcy5lbnYubG9nZ2VyLmFwcElkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUml0b3JuYSBsYSBiYXNlIHVybCBkZWwgbG9nZ2VyLFxyXG4gICAgICogY2FyaWNhdGEgZGEgdW4gZmlsZSBkaSBjb25maWd1cmF6aW9uZSBjYXJpY2F0byBkaW5hbWljYW1lbnRlIChhc3NldHMvZW52aXJvbm1lbnQuanNvbilcclxuICAgICAqL1xyXG4gICAgZ2V0TG9nZ2VyVXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2dlclVybCA/IHRoaXMubG9nZ2VyVXJsIDogdGhpcy5lbnYubG9nZ2VyLnVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJpdG9ybmEgbGEgYXBpIHBlciBpbnNlcmlyZSBsb2cgY29uIGFwcElkIGNvbmZpZ3VyYXRvIGluIGVudmlyb25tZW50Lmpzb25cclxuICAgICAqL1xyXG4gICAgZ2V0TG9nZ2VyUG9zdFVybCgpIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRMb2dnZXJVcmwoKX1lbnRyaWVzLyR7dGhpcy5nZXRBcHBJZCgpfS9gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTTQgQmFja2VuZCBVUkxcclxuICAgICAqL1xyXG4gICAgZ2V0U2VydmVyTW9uaXRvclVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJNb25pdG9yVXJsID8gdGhpcy5zZXJ2ZXJNb25pdG9yVXJsIDogdGhpcy5lbnYuc2VydmVyTW9uaXRvci51cmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2hvdWxkTG9nID0gKGxvZ0xldmVsOiBMb2dMZXZlbCkgPT4gbG9nTGV2ZWwgPj0gdGhpcy5lbnYubG9nZ2VyLmxldmVsO1xyXG4gICAgcHJpdmF0ZSBfc2VydmVyTG9nID0gKGxvZ0xldmVsOiBMb2dMZXZlbCwgbWVzc2FnZTogc3RyaW5nKSA9PlxyXG4gICAgICAgIHRoaXMuX3Nob3VsZExvZyhsb2dMZXZlbCkgJiYgdGhpcy5odHRwLnBvc3QodGhpcy5nZXRMb2dnZXJQb3N0VXJsKCksIHByZXBhcmVMb2cobWVzc2FnZSwgbG9nTGV2ZWwpKS50b1Byb21pc2UoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnNvbGUubG9nIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgbG9nKG1lc3NhZ2U/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvdWxkTG9nKExvZ0xldmVsLlRyYWNlKSkgY29uc29sZS5sb2coYCVjJHttZXNzYWdlfWAsIGBjb2xvcjojM2RhZjY3YCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmVyTG9nKExvZ0xldmVsLlRyYWNlLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnNvbGUubG9nIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZGVidWcobWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRMb2coTG9nTGV2ZWwuVHJhY2UpKSBjb25zb2xlLmxvZyhgJWMke21lc3NhZ2V9YCwgYGNvbG9yOiMwMjc3YmRgKTtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJMb2coTG9nTGV2ZWwuRGVidWcsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS53YXJuIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgd2FybihtZXNzYWdlPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3VsZExvZyhMb2dMZXZlbC5UcmFjZSkpIGNvbnNvbGUubG9nKGAlYyR7bWVzc2FnZX1gLCBgY29sb3I6I0ZGOTYzM2ApO1xyXG4gICAgICAgIHRoaXMuX3NlcnZlckxvZyhMb2dMZXZlbC5XYXJuLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnNvbGUuZXJyb3IgaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBlcnJvcihtZXNzYWdlPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3VsZExvZyhMb2dMZXZlbC5FcnJvcikpIGNvbnNvbGUuZXJyb3IoYCVjJHttZXNzYWdlfWAsIGBjb2xvcjpyZWRgKTtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJMb2coTG9nTGV2ZWwuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGxvZ3M6IExvZ2dlck9wZXJhdGlvblJlc3VsdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbXM6IEVudHJpZXNQYXJhbXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExvZ3MocGFyYW1zOiBFbnRyaWVzUGFyYW1zKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFwYXJhbXMuaW5zdGFuY2VLZXkpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLlJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5NZXNzYWdlID0gJ0Vycm9yIC0gTm8gaW5zdGFuY2VLZXksIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMuZ2V0TG9nZ2VyVXJsKCknLCB0aGlzLmdldExvZ2dlclVybCgpKTtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGVudHJpZXMvJHtwYXJhbXMuaW5zdGFuY2VLZXl9YDtcclxuXHJcbiAgICAgICAgbGV0IHAgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICAgIHAgPSBwLmFwcGVuZCgnaG93TWFueScsICcnICsgdGhpcy5ob3dNYW55KTtcclxuICAgICAgICBpZiAocGFyYW1zLmFjY291bnROYW1lKSBwID0gcC5hcHBlbmQoJ2FjY291bnROYW1lJywgcGFyYW1zLmFjY291bnROYW1lKTtcclxuICAgICAgICBpZiAocGFyYW1zLnN1YnNjcmlwdGlvbktleSkgcCA9IHAuYXBwZW5kKCdzdWJzY3JpcHRpb24nLCBwYXJhbXMuc3Vic2NyaXB0aW9uS2V5KTtcclxuICAgICAgICBpZiAocGFyYW1zLmNhdGVnb3J5KSBwID0gcC5hcHBlbmQoJ2NhdGVnb3JpZXMnLCBwYXJhbXMuY2F0ZWdvcnkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXBwcykgcCA9IHAuYXBwZW5kKCdhcHBzJywgcGFyYW1zLmFwcHMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXBwVHlwZXMpIHAgPSBwLmFwcGVuZCgnYXBwVHlwZXMnLCBwYXJhbXMuYXBwVHlwZXMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMubGV2ZWxzKSBwID0gcC5hcHBlbmQoJ2xldmVscycsIHBhcmFtcy5sZXZlbHMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMucmFuZ2VEYXRlU3RhcnQgJiYgcGFyYW1zLnJhbmdlRGF0ZUVuZCkge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnJhbmdlRGF0ZVN0YXJ0ID09PSBwYXJhbXMucmFuZ2VEYXRlRW5kKSBwID0gcC5hcHBlbmQoJ2RhdGUnLCBwYXJhbXMucmFuZ2VEYXRlU3RhcnQpO1xyXG4gICAgICAgICAgICBlbHNlIHAgPSBwLmFwcGVuZCgnZGF0ZScsIHBhcmFtcy5yYW5nZURhdGVTdGFydCArICc7JyArIHBhcmFtcy5yYW5nZURhdGVFbmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgcGFyYW1zOiBwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwsIGh0dHBPcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRMb2dzJywgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0TG9ncycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5SZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IuTWVzc2FnZSA9ICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcHMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwcycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBUeXBlcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFhcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IuUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLk1lc3NhZ2UgPSAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBUeXBlcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwVHlwZXMnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW5zdGFuY2VLZXkoKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBJZHNgO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKHVybCwgJ1RiTG9nZ2VyU2VydmljZS5nZXRJbnN0YW5jZUtleSB3aXRoIGFwcElkOiAnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRJbnN0YW5jZUtleScsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGVnZ2UgdHV0dGUgbGUgc3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTdWJzY3JpcHRpb25LZXkoKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBzdWJzY3JpcHRpb25LZXlzYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldFN1YnNjcmlwdGlvbktleTogJywgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0U3Vic2NyaXB0aW9uS2V5JywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENhdGVnb3JpZXMoYXBwSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLlJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5NZXNzYWdlID0gJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgY2F0ZWdvcmllcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRDYXRlZ29yaWVzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRDYXRlZ29yaWVzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgSHR0cCBvcGVyYXRpb24gdGhhdCBmYWlsZWQuXHJcbiAgICAgKiBMZXQgdGhlIGFwcCBjb250aW51ZS5cclxuICAgICAqIEBwYXJhbSBvcGVyYXRpb24gLSBuYW1lIG9mIHRoZSBvcGVyYXRpb24gdGhhdCBmYWlsZWRcclxuICAgICAqIEBwYXJhbSByZXN1bHQgLSBvcHRpb25hbCB2YWx1ZSB0byByZXR1cm4gYXMgdGhlIG9ic2VydmFibGUgcmVzdWx0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYW5kbGVFcnJvcjxUPihvcGVyYXRpb24gPSAnb3BlcmF0aW9uJywgcmVzdWx0PzogVCkge1xyXG4gICAgICAgIHJldHVybiAoZXJyb3I6IGFueSk6IE9ic2VydmFibGU8VD4gPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke29wZXJhdGlvbn0gZmFpbGVkOiAke2Vycm9yLmVycm9yfWApO1xyXG5cclxuICAgICAgICAgICAgLy8gTGV0IHRoZSBhcHAga2VlcCBydW5uaW5nIGJ5IHJldHVybmluZyBhbiBlbXB0eSByZXN1bHQuXHJcbiAgICAgICAgICAgIHJldHVybiBvZihyZXN1bHQgYXMgVCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lc3Npb25lIGEgUmFiYml0TVFcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1xQ29ubmVjdChxdWV1ZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5zdWJzY3JpYmUocXVldWVOYW1lKS5waXBlKG1hcCgobXNnOiBNZXNzYWdlKSA9PiBKU09OLnBhcnNlKG1zZy5ib2R5KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtcUNvbm5lY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9tcFNlcnZpY2UuY29ubmVjdGVkKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbXFEaXNjb25uZWN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gUEFSVEUgVEJTRVJWRVJNT05JVE9SXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwdWJsaWMgZ2V0VEJJbmZvc0xvZ3MocGFyYW1zOiBNb25pdG9yUGFyYW1zKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVEJTZXJ2ZXJJbmZvW10+IHtcclxuICAgICAgICBsZXQgcCA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMuYWNjb3VudE5hbWUpIHAgPSBwLmFwcGVuZCgnYWNjb3VudE5hbWUnLCAnJyArIHBhcmFtcy5hY2NvdW50TmFtZSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5wcm9jZXNzTmFtZSkgcCA9IHAuYXBwZW5kKCdwcm9jZXNzTmFtZScsICcnICsgcGFyYW1zLnByb2Nlc3NOYW1lKTtcclxuICAgICAgICBpZiAocGFyYW1zLm1pbnV0ZXMpIHAgPSBwLmFwcGVuZCgnbWludXRlJywgJycgKyBwYXJhbXMubWludXRlcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGh0dHBPcHRpb25zID0geyBwYXJhbXM6IHAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRTZXJ2ZXJNb25pdG9yVXJsKCkgKyBgdGJTZXJ2ZXJzLyR7cGFyYW1zLmluc3RhbmNlS2V5fWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFRCU2VydmVySW5mb1tdPih1cmwsIGh0dHBPcHRpb25zKS5waXBlKGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldFRCSW5mb3NMb2dzJywgZmFsc2UpKSk7XHJcbiAgICB9XHJcbn1cclxuIl19