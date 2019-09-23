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
var loggerInstance;
/** @type {?} */
export var logger = (/**
 * @return {?}
 */
function () { return loggerInstance; });
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
var LogLevel = {
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
export function prepareLog(message, logLevel) {
    if (logLevel === void 0) { logLevel = LogLevel.Debug; }
    /** @type {?} */
    var log = {
        Message: message,
        Registeredappid: logger().getAppId(),
        AccountName: localStorage.getItem('_accountname'),
        Subscription: localStorage.getItem('_company'),
        Category: 'Client',
        Level: logLevel
    };
    return log;
}
var TbLoggerService = /** @class */ (function () {
    function TbLoggerService(env, http, stompService) {
        var _this = this;
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
        function (logLevel) { return logLevel >= _this.env.logger.level; });
        this._serverLog = (/**
         * @param {?} logLevel
         * @param {?} message
         * @return {?}
         */
        function (logLevel, message) {
            return _this._shouldLog(logLevel) && _this.http.post(_this.getLoggerPostUrl(), prepareLog(message, logLevel)).toPromise();
        });
        loggerInstance = this;
        this.loggerUrl = this.env.logger.url;
        this.serverMonitorUrl = this.env.serverMonitor.url;
        if (env.stompConfig)
            this.mqInit();
    }
    /**
     * @return {?}
     */
    TbLoggerService.prototype.mqInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.env.stompConfig) {
            this.stompService.config = this.env.stompConfig;
            this.stompService.initAndConnect();
            this.stompService.state.subscribe((/**
             * @param {?} status
             * @return {?}
             */
            function (status) {
                _this.mqConnectionState = status;
                _this.mqConnectionStateObservable.next(status);
            }));
        }
    };
    /**
     * Ritorna la App Id dell'applicazione frontend che sta loggando,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     */
    /**
     * Ritorna la App Id dell'applicazione frontend che sta loggando,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     * @return {?}
     */
    TbLoggerService.prototype.getAppId = /**
     * Ritorna la App Id dell'applicazione frontend che sta loggando,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     * @return {?}
     */
    function () {
        return this.env.logger.appId;
    };
    /**
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     */
    /**
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     * @return {?}
     */
    TbLoggerService.prototype.getLoggerUrl = /**
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     * @return {?}
     */
    function () {
        return this.loggerUrl ? this.loggerUrl : this.env.logger.url;
    };
    /**
     * Ritorna la api per inserire log con appId configurato in environment.json
     */
    /**
     * Ritorna la api per inserire log con appId configurato in environment.json
     * @return {?}
     */
    TbLoggerService.prototype.getLoggerPostUrl = /**
     * Ritorna la api per inserire log con appId configurato in environment.json
     * @return {?}
     */
    function () {
        return this.getLoggerUrl() + "entries/" + this.getAppId() + "/";
    };
    /**
     * M4 Backend URL
     */
    /**
     * M4 Backend URL
     * @return {?}
     */
    TbLoggerService.prototype.getServerMonitorUrl = /**
     * M4 Backend URL
     * @return {?}
     */
    function () {
        return this.serverMonitorUrl ? this.serverMonitorUrl : this.env.serverMonitor.url;
    };
    /**
     * @param message
     * @param optionalParams
     */
    /**
     * @param {?=} message
     * @return {?}
     */
    TbLoggerService.prototype.log = /**
     * @param {?=} message
     * @return {?}
     */
    function (message) {
        if (this._shouldLog(LogLevel.Trace))
            console.log("%c" + message, "color:#3daf67");
        this._serverLog(LogLevel.Trace, message);
    };
    /**
     * @param message
     * @param optionalParams
     */
    /**
     * @param {?=} message
     * @return {?}
     */
    TbLoggerService.prototype.debug = /**
     * @param {?=} message
     * @return {?}
     */
    function (message) {
        if (this._shouldLog(LogLevel.Debug))
            console.log("%c" + message, "color:#0277bd");
        this._serverLog(LogLevel.Debug, message);
    };
    /**
     * @param message
     * @param optionalParams
     */
    /**
     * @param {?=} message
     * @return {?}
     */
    TbLoggerService.prototype.warn = /**
     * @param {?=} message
     * @return {?}
     */
    function (message) {
        if (this._shouldLog(LogLevel.Warn))
            console.log("%c" + message, "color:#FF9633");
        this._serverLog(LogLevel.Warn, message);
    };
    /**
     * @param message
     * @param optionalParams
     */
    /**
     * @param {?=} message
     * @return {?}
     */
    TbLoggerService.prototype.error = /**
     * @param {?=} message
     * @return {?}
     */
    function (message) {
        if (this._shouldLog(LogLevel.Error))
            console.error("%c" + message, "color:red");
        this._serverLog(LogLevel.Error, message);
    };
    /**
     * Log per statistiche client (es: usato da login page per tracciare risoluzione schermo)
     *
     * @param message
     * @param optionalParams
     */
    /**
     * Log per statistiche client (es: usato da login page per tracciare risoluzione schermo)
     *
     * @param {?=} message
     * @return {?}
     */
    TbLoggerService.prototype.stat = /**
     * Log per statistiche client (es: usato da login page per tracciare risoluzione schermo)
     *
     * @param {?=} message
     * @return {?}
     */
    function (message) {
        console.log("%c" + message, "color:#884EA0");
        this._serverLog(LogLevel.Trace, message);
    };
    /**
     * Return logs: LoggerOperationResult
     *
     * @param params: EntriesParams
     */
    /**
     * Return logs: LoggerOperationResult
     *
     * @param {?} params
     * @return {?}
     */
    TbLoggerService.prototype.getLogs = /**
     * Return logs: LoggerOperationResult
     *
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (!params.instanceKey) {
            /** @type {?} */
            var error = new LoggerOperationResult(false, 'Error - No instanceKey, no party');
            return of(error);
        }
        // console.log('this.getLoggerUrl()', this.getLoggerUrl());
        /** @type {?} */
        var url = this.getLoggerUrl() + ("entries/" + params.instanceKey);
        /** @type {?} */
        var p = new HttpParams();
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
        var httpOptions = {
            params: p
        };
        return this.http.get(url, httpOptions).pipe(
        // tap(op => console.log('TbLoggerService.getLogs', op)),
        catchError(this.handleError('TbLoggerService.getLogs', false)));
    };
    /**
     * @param {?} appId
     * @return {?}
     */
    TbLoggerService.prototype.getApps = /**
     * @param {?} appId
     * @return {?}
     */
    function (appId) {
        if (!appId) {
            /** @type {?} */
            var error = new LoggerOperationResult(false, 'Error - No appId, no party');
            return of(error);
        }
        /** @type {?} */
        var url = this.getLoggerUrl() + ("apps/" + appId);
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getApps with appId: ', appId, op)),
        catchError(this.handleError('TbLoggerService.getApps', false)));
    };
    /**
     * @param {?} appId
     * @return {?}
     */
    TbLoggerService.prototype.getAppTypes = /**
     * @param {?} appId
     * @return {?}
     */
    function (appId) {
        if (!appId) {
            /** @type {?} */
            var error = new LoggerOperationResult(false, 'Error - No appId, no party');
            return of(error);
        }
        /** @type {?} */
        var url = this.getLoggerUrl() + ("appTypes/" + appId);
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getAppTypes with appId: ', appId, op)),
        catchError(this.handleError('TbLoggerService.getAppTypes', false)));
    };
    /**
     * @return {?}
     */
    TbLoggerService.prototype.getInstanceKey = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.getLoggerUrl() + "appIds";
        return this.http.get(url).pipe(
        // tap(op => console.log(url, 'TbLoggerService.getInstanceKey with appId: ', op)),
        catchError(this.handleError('TbLoggerService.getInstanceKey', false)));
    };
    /**
     * Legge tutte le subscription
     */
    /**
     * Legge tutte le subscription
     * @return {?}
     */
    TbLoggerService.prototype.getSubscriptionKey = /**
     * Legge tutte le subscription
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.getLoggerUrl() + "subscriptionKeys";
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getSubscriptionKey: ', op)),
        catchError(this.handleError('TbLoggerService.getSubscriptionKey', false)));
    };
    /**
     * @param {?} appId
     * @return {?}
     */
    TbLoggerService.prototype.getCategories = /**
     * @param {?} appId
     * @return {?}
     */
    function (appId) {
        if (!appId) {
            /** @type {?} */
            var error = new LoggerOperationResult(false, 'Error - No appId, no party');
            return of(error);
        }
        /** @type {?} */
        var url = this.getLoggerUrl() + ("categories/" + appId);
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getCategories with appId: ', appId, op)),
        catchError(this.handleError('TbLoggerService.getCategories', false)));
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @template T
     * @param {?=} operation - name of the operation that failed
     * @param {?=} result - optional value to return as the observable result
     * @return {?}
     */
    TbLoggerService.prototype.handleError = /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @template T
     * @param {?=} operation - name of the operation that failed
     * @param {?=} result - optional value to return as the observable result
     * @return {?}
     */
    function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.error(operation + " failed: " + error.error);
            // Let the app keep running by returning an empty result.
            return of((/** @type {?} */ (result)));
        });
    };
    /**
     * Connessione a RabbitMQ
     */
    /**
     * Connessione a RabbitMQ
     * @param {?} queueName
     * @return {?}
     */
    TbLoggerService.prototype.mqConnect = /**
     * Connessione a RabbitMQ
     * @param {?} queueName
     * @return {?}
     */
    function (queueName) {
        return this.stompService.subscribe(queueName).pipe(map((/**
         * @param {?} msg
         * @return {?}
         */
        function (msg) { return JSON.parse(msg.body); })));
    };
    /**
     * @return {?}
     */
    TbLoggerService.prototype.mqConnected = /**
     * @return {?}
     */
    function () {
        return this.stompService.connected();
    };
    /**
     * @return {?}
     */
    TbLoggerService.prototype.mqDisconnect = /**
     * @return {?}
     */
    function () {
        return this.stompService.disconnect();
    };
    // -------------------------------------------------------------------------------------------------------
    // PARTE TBSERVERMONITOR
    // -------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------------------
    // PARTE TBSERVERMONITOR
    // -------------------------------------------------------------------------------------------------------
    /**
     * @param {?} params
     * @return {?}
     */
    TbLoggerService.prototype.getTBInfosLogs = 
    // -------------------------------------------------------------------------------------------------------
    // PARTE TBSERVERMONITOR
    // -------------------------------------------------------------------------------------------------------
    /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        /** @type {?} */
        var p = new HttpParams();
        if (params.accountName)
            p = p.append('accountName', '' + params.accountName);
        if (params.processName)
            p = p.append('processName', '' + params.processName);
        if (params.minutes)
            p = p.append('minute', '' + params.minutes);
        /** @type {?} */
        var httpOptions = { params: p };
        /** @type {?} */
        var url = this.getServerMonitorUrl() + ("tbServers/" + params.instanceKey);
        return this.http.get(url, httpOptions).pipe(catchError(this.handleError('TbLoggerService.getTBInfosLogs', false)));
    };
    TbLoggerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    TbLoggerService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['env',] }] },
        { type: HttpClient },
        { type: StompRService }
    ]; };
    /** @nocollapse */ TbLoggerService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(i0.ɵɵinject("env"), i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.StompRService)); }, token: TbLoggerService, providedIn: "root" });
    return TbLoggerService;
}());
export { TbLoggerService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBYyxFQUFFLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUcvRCxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0seUNBQXlDLENBQUM7Ozs7O0lBSzFGLGNBQStCOztBQUNuQyxNQUFNLEtBQU8sTUFBTTs7O0FBQUcsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLENBQUE7Ozs7QUFFMUMsOEJBUUM7OztJQVBHLDJCQUFnQjs7SUFDaEIsbUNBQXdCOztJQUN4QiwrQkFBNEI7O0lBQzVCLGdDQUE2Qjs7SUFDN0IsdUJBQWE7O0lBQ2IsNEJBQWtCOztJQUNsQix5QkFBZ0I7Ozs7SUFJaEIsUUFBUztJQUNULFFBQUs7SUFDTCxPQUFJO0lBQ0osUUFBSzs7Ozs7Ozs7Ozs7O0FBR1QsTUFBTSxVQUFVLFVBQVUsQ0FBQyxPQUFlLEVBQUUsUUFBbUM7SUFBbkMseUJBQUEsRUFBQSxXQUFxQixRQUFRLENBQUMsS0FBSzs7UUFDckUsR0FBRyxHQUFhO1FBQ2xCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLGVBQWUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDcEMsV0FBVyxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFD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QyxnQ0FBZ0MsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkksQ0FBQzs7Z0JBNVBKLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozs7Z0RBU2dCLE1BQU0sU0FBQyxLQUFLO2dCQXhEcEIsVUFBVTtnQkFLVixhQUFhOzs7MEJBTnRCO0NBMlNDLEFBN1BELElBNlBDO1NBMVBZLGVBQWU7OztJQUN4QixvQ0FBeUI7O0lBQ3pCLDJDQUFnQzs7Ozs7SUFDaEMsa0NBQXNCOztJQUV0Qiw0Q0FBeUQ7O0lBQ3pELHNEQUFxRzs7Ozs7SUFrRHJHLHFDQUErRTs7Ozs7SUFDL0UscUNBQ29IOzs7OztJQWxEeEcsOEJBQStDOzs7OztJQUFFLCtCQUF3Qjs7SUFBRSx1Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBTdG9tcFJTZXJ2aWNlLCBTdG9tcFN0YXRlIH0gZnJvbSAnQHN0b21wL25nMi1zdG9tcGpzJztcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BzdG9tcC9zdG9tcGpzJztcclxuXHJcbmltcG9ydCB7IExvZ2dlck9wZXJhdGlvblJlc3VsdCwgVEJTZXJ2ZXJJbmZvIH0gZnJvbSAnLi4vbW9kZWxzL2xvZ2dlci1vcGVyYXRpb24tcmVzdWx0Lm1vZGVsJztcclxuaW1wb3J0IHsgRW50cmllc1BhcmFtcyB9IGZyb20gJy4uL21vZGVscy9lbnRyaWVzLm1vZGVsJztcclxuaW1wb3J0IHsgTW9uaXRvclBhcmFtcyB9IGZyb20gJy4uL21vZGVscy9tb25pdG9yLm1vZGVsJztcclxuaW1wb3J0IHsgVGJMb2dnZXJFbnZpcm9ubWVudCB9IGZyb20gJy4uL21vZGVscy9sb2dnZXItZW52aXJvbm1lbnQnO1xyXG5cclxubGV0IGxvZ2dlckluc3RhbmNlOiBUYkxvZ2dlclNlcnZpY2U7XHJcbmV4cG9ydCBjb25zdCBsb2dnZXIgPSAoKSA9PiBsb2dnZXJJbnN0YW5jZTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9nRW50cnkge1xyXG4gICAgTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgUmVnaXN0ZXJlZGFwcGlkOiBzdHJpbmc7XHJcbiAgICBBY2NvdW50TmFtZT86IHN0cmluZyB8IG51bGw7XHJcbiAgICBTdWJzY3JpcHRpb24/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgQXBwPzogc3RyaW5nO1xyXG4gICAgQ2F0ZWdvcnk/OiBzdHJpbmc7XHJcbiAgICBMZXZlbDogTG9nTGV2ZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIExvZ0xldmVsIHtcclxuICAgIFRyYWNlID0gMCxcclxuICAgIERlYnVnLFxyXG4gICAgV2FybixcclxuICAgIEVycm9yXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlTG9nKG1lc3NhZ2U6IHN0cmluZywgbG9nTGV2ZWw6IExvZ0xldmVsID0gTG9nTGV2ZWwuRGVidWcpIHtcclxuICAgIGNvbnN0IGxvZzogTG9nRW50cnkgPSB7XHJcbiAgICAgICAgTWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgICBSZWdpc3RlcmVkYXBwaWQ6IGxvZ2dlcigpLmdldEFwcElkKCksXHJcbiAgICAgICAgQWNjb3VudE5hbWU6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfYWNjb3VudG5hbWUnKSxcclxuICAgICAgICBTdWJzY3JpcHRpb246IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfY29tcGFueScpLFxyXG4gICAgICAgIENhdGVnb3J5OiAnQ2xpZW50JyxcclxuICAgICAgICBMZXZlbDogbG9nTGV2ZWxcclxuICAgIH07XHJcbiAgICByZXR1cm4gbG9nO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyU2VydmljZSB7XHJcbiAgICBwdWJsaWMgbG9nZ2VyVXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VydmVyTW9uaXRvclVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBob3dNYW55ID0gMTAwO1xyXG5cclxuICAgIHB1YmxpYyBtcUNvbm5lY3Rpb25TdGF0ZTogU3RvbXBTdGF0ZSA9IFN0b21wU3RhdGUuQ0xPU0VEO1xyXG4gICAgcHVibGljIG1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZTogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFN0b21wU3RhdGUuQ0xPU0VEKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdlbnYnKSBwcml2YXRlIGVudjogVGJMb2dnZXJFbnZpcm9ubWVudCwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwdWJsaWMgc3RvbXBTZXJ2aWNlOiBTdG9tcFJTZXJ2aWNlKSB7XHJcbiAgICAgICAgbG9nZ2VySW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubG9nZ2VyVXJsID0gdGhpcy5lbnYubG9nZ2VyLnVybDtcclxuICAgICAgICB0aGlzLnNlcnZlck1vbml0b3JVcmwgPSB0aGlzLmVudi5zZXJ2ZXJNb25pdG9yLnVybDtcclxuICAgICAgICBpZiAoZW52LnN0b21wQ29uZmlnKSB0aGlzLm1xSW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1xSW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5lbnYuc3RvbXBDb25maWcpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2UuY29uZmlnID0gdGhpcy5lbnYuc3RvbXBDb25maWc7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvbXBTZXJ2aWNlLmluaXRBbmRDb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvbXBTZXJ2aWNlLnN0YXRlLnN1YnNjcmliZSgoc3RhdHVzOiBTdG9tcFN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlID0gc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tcUNvbm5lY3Rpb25TdGF0ZU9ic2VydmFibGUubmV4dChzdGF0dXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSaXRvcm5hIGxhIEFwcCBJZCBkZWxsJ2FwcGxpY2F6aW9uZSBmcm9udGVuZCBjaGUgc3RhIGxvZ2dhbmRvLFxyXG4gICAgICogY2FyaWNhdGEgZGEgdW4gZmlsZSBkaSBjb25maWd1cmF6aW9uZSBjYXJpY2F0byBkaW5hbWljYW1lbnRlIChhc3NldHMvZW52aXJvbm1lbnQuanNvbilcclxuICAgICAqL1xyXG4gICAgZ2V0QXBwSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZW52LmxvZ2dlci5hcHBJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJpdG9ybmEgbGEgYmFzZSB1cmwgZGVsIGxvZ2dlcixcclxuICAgICAqIGNhcmljYXRhIGRhIHVuIGZpbGUgZGkgY29uZmlndXJhemlvbmUgY2FyaWNhdG8gZGluYW1pY2FtZW50ZSAoYXNzZXRzL2Vudmlyb25tZW50Lmpzb24pXHJcbiAgICAgKi9cclxuICAgIGdldExvZ2dlclVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2dnZXJVcmwgPyB0aGlzLmxvZ2dlclVybCA6IHRoaXMuZW52LmxvZ2dlci51cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSaXRvcm5hIGxhIGFwaSBwZXIgaW5zZXJpcmUgbG9nIGNvbiBhcHBJZCBjb25maWd1cmF0byBpbiBlbnZpcm9ubWVudC5qc29uXHJcbiAgICAgKi9cclxuICAgIGdldExvZ2dlclBvc3RVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0TG9nZ2VyVXJsKCl9ZW50cmllcy8ke3RoaXMuZ2V0QXBwSWQoKX0vYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE00IEJhY2tlbmQgVVJMXHJcbiAgICAgKi9cclxuICAgIGdldFNlcnZlck1vbml0b3JVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyTW9uaXRvclVybCA/IHRoaXMuc2VydmVyTW9uaXRvclVybCA6IHRoaXMuZW52LnNlcnZlck1vbml0b3IudXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Nob3VsZExvZyA9IChsb2dMZXZlbDogTG9nTGV2ZWwpID0+IGxvZ0xldmVsID49IHRoaXMuZW52LmxvZ2dlci5sZXZlbDtcclxuICAgIHByaXZhdGUgX3NlcnZlckxvZyA9IChsb2dMZXZlbDogTG9nTGV2ZWwsIG1lc3NhZ2U6IHN0cmluZykgPT5cclxuICAgICAgICB0aGlzLl9zaG91bGRMb2cobG9nTGV2ZWwpICYmIHRoaXMuaHR0cC5wb3N0KHRoaXMuZ2V0TG9nZ2VyUG9zdFVybCgpLCBwcmVwYXJlTG9nKG1lc3NhZ2UsIGxvZ0xldmVsKSkudG9Qcm9taXNlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGxvZyhtZXNzYWdlPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3VsZExvZyhMb2dMZXZlbC5UcmFjZSkpIGNvbnNvbGUubG9nKGAlYyR7bWVzc2FnZX1gLCBgY29sb3I6IzNkYWY2N2ApO1xyXG4gICAgICAgIHRoaXMuX3NlcnZlckxvZyhMb2dMZXZlbC5UcmFjZSwgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGRlYnVnKG1lc3NhZ2U/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvdWxkTG9nKExvZ0xldmVsLkRlYnVnKSkgY29uc29sZS5sb2coYCVjJHttZXNzYWdlfWAsIGBjb2xvcjojMDI3N2JkYCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmVyTG9nKExvZ0xldmVsLkRlYnVnLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgd2FybihtZXNzYWdlPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3VsZExvZyhMb2dMZXZlbC5XYXJuKSkgY29uc29sZS5sb2coYCVjJHttZXNzYWdlfWAsIGBjb2xvcjojRkY5NjMzYCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmVyTG9nKExvZ0xldmVsLldhcm4sIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBlcnJvcihtZXNzYWdlPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3VsZExvZyhMb2dMZXZlbC5FcnJvcikpIGNvbnNvbGUuZXJyb3IoYCVjJHttZXNzYWdlfWAsIGBjb2xvcjpyZWRgKTtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJMb2coTG9nTGV2ZWwuRXJyb3IsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9nIHBlciBzdGF0aXN0aWNoZSBjbGllbnQgKGVzOiB1c2F0byBkYSBsb2dpbiBwYWdlIHBlciB0cmFjY2lhcmUgcmlzb2x1emlvbmUgc2NoZXJtbylcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIHN0YXQobWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGAlYyR7bWVzc2FnZX1gLCBgY29sb3I6Izg4NEVBMGApO1xyXG4gICAgICAgIHRoaXMuX3NlcnZlckxvZyhMb2dMZXZlbC5UcmFjZSwgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gbG9nczogTG9nZ2VyT3BlcmF0aW9uUmVzdWx0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhcmFtczogRW50cmllc1BhcmFtc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TG9ncyhwYXJhbXM6IEVudHJpZXNQYXJhbXMpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIXBhcmFtcy5pbnN0YW5jZUtleSkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoZmFsc2UsICdFcnJvciAtIE5vIGluc3RhbmNlS2V5LCBubyBwYXJ0eScpO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcy5nZXRMb2dnZXJVcmwoKScsIHRoaXMuZ2V0TG9nZ2VyVXJsKCkpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgZW50cmllcy8ke3BhcmFtcy5pbnN0YW5jZUtleX1gO1xyXG5cclxuICAgICAgICBsZXQgcCA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICAgICAgcCA9IHAuYXBwZW5kKCdob3dNYW55JywgJycgKyB0aGlzLmhvd01hbnkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYWNjb3VudE5hbWUpIHAgPSBwLmFwcGVuZCgnYWNjb3VudE5hbWUnLCBwYXJhbXMuYWNjb3VudE5hbWUpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuc3Vic2NyaXB0aW9uS2V5KSBwID0gcC5hcHBlbmQoJ3N1YnNjcmlwdGlvbicsIHBhcmFtcy5zdWJzY3JpcHRpb25LZXkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuY2F0ZWdvcnkpIHAgPSBwLmFwcGVuZCgnY2F0ZWdvcmllcycsIHBhcmFtcy5jYXRlZ29yeSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcHBzKSBwID0gcC5hcHBlbmQoJ2FwcHMnLCBwYXJhbXMuYXBwcyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcHBUeXBlcykgcCA9IHAuYXBwZW5kKCdhcHBUeXBlcycsIHBhcmFtcy5hcHBUeXBlcyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5sZXZlbHMpIHAgPSBwLmFwcGVuZCgnbGV2ZWxzJywgcGFyYW1zLmxldmVscyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5yYW5nZURhdGVTdGFydCAmJiBwYXJhbXMucmFuZ2VEYXRlRW5kKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMucmFuZ2VEYXRlU3RhcnQgPT09IHBhcmFtcy5yYW5nZURhdGVFbmQpIHAgPSBwLmFwcGVuZCgnZGF0ZScsIHBhcmFtcy5yYW5nZURhdGVTdGFydCk7XHJcbiAgICAgICAgICAgIGVsc2UgcCA9IHAuYXBwZW5kKCdkYXRlJywgcGFyYW1zLnJhbmdlRGF0ZVN0YXJ0ICsgJzsnICsgcGFyYW1zLnJhbmdlRGF0ZUVuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCwgaHR0cE9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldExvZ3MnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRMb2dzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFwcHMoYXBwSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KGZhbHNlLCAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFwcFR5cGVzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdChmYWxzZSwgJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcFR5cGVzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbnN0YW5jZUtleSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcElkc2A7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2codXJsLCAnVGJMb2dnZXJTZXJ2aWNlLmdldEluc3RhbmNlS2V5IHdpdGggYXBwSWQ6ICcsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEluc3RhbmNlS2V5JywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMZWdnZSB0dXR0ZSBsZSBzdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFN1YnNjcmlwdGlvbktleSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYHN1YnNjcmlwdGlvbktleXNgO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0U3Vic2NyaXB0aW9uS2V5OiAnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRTdWJzY3JpcHRpb25LZXknLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2F0ZWdvcmllcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFhcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoZmFsc2UsICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eScpO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBjYXRlZ29yaWVzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldENhdGVnb3JpZXMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldENhdGVnb3JpZXMnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBIdHRwIG9wZXJhdGlvbiB0aGF0IGZhaWxlZC5cclxuICAgICAqIExldCB0aGUgYXBwIGNvbnRpbnVlLlxyXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiAtIG5hbWUgb2YgdGhlIG9wZXJhdGlvbiB0aGF0IGZhaWxlZFxyXG4gICAgICogQHBhcmFtIHJlc3VsdCAtIG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBhcyB0aGUgb2JzZXJ2YWJsZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUVycm9yPFQ+KG9wZXJhdGlvbiA9ICdvcGVyYXRpb24nLCByZXN1bHQ/OiBUKSB7XHJcbiAgICAgICAgcmV0dXJuIChlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxUPiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7b3BlcmF0aW9ufSBmYWlsZWQ6ICR7ZXJyb3IuZXJyb3J9YCk7XHJcblxyXG4gICAgICAgICAgICAvLyBMZXQgdGhlIGFwcCBrZWVwIHJ1bm5pbmcgYnkgcmV0dXJuaW5nIGFuIGVtcHR5IHJlc3VsdC5cclxuICAgICAgICAgICAgcmV0dXJuIG9mKHJlc3VsdCBhcyBUKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVzc2lvbmUgYSBSYWJiaXRNUVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXFDb25uZWN0KHF1ZXVlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLnN1YnNjcmliZShxdWV1ZU5hbWUpLnBpcGUobWFwKChtc2c6IE1lc3NhZ2UpID0+IEpTT04ucGFyc2UobXNnLmJvZHkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1xQ29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBtcURpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBQQVJURSBUQlNFUlZFUk1PTklUT1JcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHB1YmxpYyBnZXRUQkluZm9zTG9ncyhwYXJhbXM6IE1vbml0b3JQYXJhbXMpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBUQlNlcnZlckluZm9bXT4ge1xyXG4gICAgICAgIGxldCBwID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5hY2NvdW50TmFtZSkgcCA9IHAuYXBwZW5kKCdhY2NvdW50TmFtZScsICcnICsgcGFyYW1zLmFjY291bnROYW1lKTtcclxuICAgICAgICBpZiAocGFyYW1zLnByb2Nlc3NOYW1lKSBwID0gcC5hcHBlbmQoJ3Byb2Nlc3NOYW1lJywgJycgKyBwYXJhbXMucHJvY2Vzc05hbWUpO1xyXG4gICAgICAgIGlmIChwYXJhbXMubWludXRlcykgcCA9IHAuYXBwZW5kKCdtaW51dGUnLCAnJyArIHBhcmFtcy5taW51dGVzKTtcclxuXHJcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7IHBhcmFtczogcCB9O1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldFNlcnZlck1vbml0b3JVcmwoKSArIGB0YlNlcnZlcnMvJHtwYXJhbXMuaW5zdGFuY2VLZXl9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8VEJTZXJ2ZXJJbmZvW10+KHVybCwgaHR0cE9wdGlvbnMpLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0VEJJbmZvc0xvZ3MnLCBmYWxzZSkpKTtcclxuICAgIH1cclxufVxyXG4iXX0=