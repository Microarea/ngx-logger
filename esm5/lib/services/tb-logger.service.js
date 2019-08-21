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
            var error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No instanceKey, no party';
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
            var error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No appId, no party';
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
            var error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No appId, no party';
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
            var error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No appId, no party';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBYyxFQUFFLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUcvRCxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0seUNBQXlDLENBQUM7Ozs7O0lBSTFGLGNBQStCOztBQUNuQyxNQUFNLEtBQU8sTUFBTTs7O0FBQUcsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLENBQUE7Ozs7QUFFMUMsOEJBUUM7OztJQVBHLDJCQUFnQjs7SUFDaEIsbUNBQXdCOztJQUN4QiwrQkFBcUI7O0lBQ3JCLGdDQUFzQjs7SUFDdEIsdUJBQWE7O0lBQ2IsNEJBQWtCOztJQUNsQix5QkFBZ0I7Ozs7SUFJaEIsUUFBUztJQUNULFFBQUs7SUFDTCxPQUFJO0lBQ0osUUFBSzs7Ozs7Ozs7Ozs7O0FBR1QsTUFBTSxVQUFVLFVBQVUsQ0FBQyxPQUFlLEVBQUUsUUFBbUM7SUFBbkMseUJBQUEsRUFBQSxXQUFxQixRQUFRLENBQUMsS0FBSzs7UUFDckUsR0FBRyxHQUFhO1FBQ2xCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLGVBQWUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDcEMsV0FBVyxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFD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QUcsQ0FBaUIsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkksQ0FBQzs7Z0JBbFFKLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozs7Z0RBU2dCLE1BQU0sU0FBQyxLQUFLO2dCQXZEcEIsVUFBVTtnQkFLVixhQUFhOzs7MEJBTnRCO0NBZ1RDLEFBblFELElBbVFDO1NBaFFZLGVBQWU7OztJQUN4QixvQ0FBeUI7O0lBQ3pCLDJDQUFnQzs7Ozs7SUFDaEMsa0NBQXNCOztJQUV0Qiw0Q0FBeUQ7O0lBQ3pELHNEQUF5Rzs7Ozs7SUFnRHpHLHFDQUErRTs7Ozs7SUFDL0UscUNBQ29IOzs7OztJQWhEeEcsOEJBQTBCOzs7OztJQUFFLCtCQUF3Qjs7SUFBRSx1Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBTdG9tcFJTZXJ2aWNlLCBTdG9tcFN0YXRlIH0gZnJvbSAnQHN0b21wL25nMi1zdG9tcGpzJztcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BzdG9tcC9zdG9tcGpzJztcclxuXHJcbmltcG9ydCB7IExvZ2dlck9wZXJhdGlvblJlc3VsdCwgVEJTZXJ2ZXJJbmZvIH0gZnJvbSAnLi4vbW9kZWxzL2xvZ2dlci1vcGVyYXRpb24tcmVzdWx0Lm1vZGVsJztcclxuaW1wb3J0IHsgRW50cmllc1BhcmFtcyB9IGZyb20gJy4uL21vZGVscy9lbnRyaWVzLm1vZGVsJztcclxuaW1wb3J0IHsgTW9uaXRvclBhcmFtcyB9IGZyb20gJy4uL21vZGVscy9tb25pdG9yLm1vZGVsJztcclxuXHJcbmxldCBsb2dnZXJJbnN0YW5jZTogVGJMb2dnZXJTZXJ2aWNlO1xyXG5leHBvcnQgY29uc3QgbG9nZ2VyID0gKCkgPT4gbG9nZ2VySW5zdGFuY2U7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIExvZ0VudHJ5IHtcclxuICAgIE1lc3NhZ2U6IHN0cmluZztcclxuICAgIFJlZ2lzdGVyZWRhcHBpZDogc3RyaW5nO1xyXG4gICAgQWNjb3VudE5hbWU/OiBzdHJpbmc7XHJcbiAgICBTdWJzY3JpcHRpb24/OiBzdHJpbmc7XHJcbiAgICBBcHA/OiBzdHJpbmc7XHJcbiAgICBDYXRlZ29yeT86IHN0cmluZztcclxuICAgIExldmVsOiBMb2dMZXZlbDtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gTG9nTGV2ZWwge1xyXG4gICAgVHJhY2UgPSAwLFxyXG4gICAgRGVidWcsXHJcbiAgICBXYXJuLFxyXG4gICAgRXJyb3JcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVMb2cobWVzc2FnZTogc3RyaW5nLCBsb2dMZXZlbDogTG9nTGV2ZWwgPSBMb2dMZXZlbC5EZWJ1Zykge1xyXG4gICAgY29uc3QgbG9nOiBMb2dFbnRyeSA9IHtcclxuICAgICAgICBNZXNzYWdlOiBtZXNzYWdlLFxyXG4gICAgICAgIFJlZ2lzdGVyZWRhcHBpZDogbG9nZ2VyKCkuZ2V0QXBwSWQoKSxcclxuICAgICAgICBBY2NvdW50TmFtZTogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19hY2NvdW50bmFtZScpLFxyXG4gICAgICAgIFN1YnNjcmlwdGlvbjogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19jb21wYW55JyksXHJcbiAgICAgICAgQ2F0ZWdvcnk6ICdDbGllbnQnLFxyXG4gICAgICAgIExldmVsOiBsb2dMZXZlbFxyXG4gICAgfTtcclxuICAgIHJldHVybiBsb2c7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGJMb2dnZXJTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBsb2dnZXJVcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZXJ2ZXJNb25pdG9yVXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGhvd01hbnkgPSAxMDA7XHJcblxyXG4gICAgcHVibGljIG1xQ29ubmVjdGlvblN0YXRlOiBTdG9tcFN0YXRlID0gU3RvbXBTdGF0ZS5DTE9TRUQ7XHJcbiAgICBwdWJsaWMgbXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlOiBCZWhhdmlvclN1YmplY3Q8U3RvbXBTdGF0ZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFN0b21wU3RhdGUuQ0xPU0VEKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdlbnYnKSBwcml2YXRlIGVudiwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwdWJsaWMgc3RvbXBTZXJ2aWNlOiBTdG9tcFJTZXJ2aWNlKSB7XHJcbiAgICAgICAgbG9nZ2VySW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIGlmIChlbnYuc3RvbXBDb25maWcpIHRoaXMubXFJbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbXFJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmVudi5zdG9tcENvbmZpZykge1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5jb25maWcgPSB0aGlzLmVudi5zdG9tcENvbmZpZztcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2UuaW5pdEFuZENvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2Uuc3RhdGUuc3Vic2NyaWJlKChzdGF0dXM6IFN0b21wU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGUgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZS5uZXh0KHN0YXR1cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJpdG9ybmEgbGEgQXBwIElkIGRlbGwnYXBwbGljYXppb25lIGZyb250ZW5kIGNoZSBzdGEgbG9nZ2FuZG8sXHJcbiAgICAgKiBjYXJpY2F0YSBkYSB1biBmaWxlIGRpIGNvbmZpZ3VyYXppb25lIGNhcmljYXRvIGRpbmFtaWNhbWVudGUgKGFzc2V0cy9lbnZpcm9ubWVudC5qc29uKVxyXG4gICAgICovXHJcbiAgICBnZXRBcHBJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbnYubG9nZ2VyLmFwcElkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUml0b3JuYSBsYSBiYXNlIHVybCBkZWwgbG9nZ2VyLFxyXG4gICAgICogY2FyaWNhdGEgZGEgdW4gZmlsZSBkaSBjb25maWd1cmF6aW9uZSBjYXJpY2F0byBkaW5hbWljYW1lbnRlIChhc3NldHMvZW52aXJvbm1lbnQuanNvbilcclxuICAgICAqL1xyXG4gICAgZ2V0TG9nZ2VyVXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2dlclVybCA/IHRoaXMubG9nZ2VyVXJsIDogdGhpcy5lbnYubG9nZ2VyLnVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJpdG9ybmEgbGEgYXBpIHBlciBpbnNlcmlyZSBsb2cgY29uIGFwcElkIGNvbmZpZ3VyYXRvIGluIGVudmlyb25tZW50Lmpzb25cclxuICAgICAqL1xyXG4gICAgZ2V0TG9nZ2VyUG9zdFVybCgpIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRMb2dnZXJVcmwoKX1lbnRyaWVzLyR7dGhpcy5nZXRBcHBJZCgpfS9gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTTQgQmFja2VuZCBVUkxcclxuICAgICAqL1xyXG4gICAgZ2V0U2VydmVyTW9uaXRvclVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJNb25pdG9yVXJsID8gdGhpcy5zZXJ2ZXJNb25pdG9yVXJsIDogdGhpcy5lbnYuc2VydmVyTW9uaXRvci51cmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2hvdWxkTG9nID0gKGxvZ0xldmVsOiBMb2dMZXZlbCkgPT4gbG9nTGV2ZWwgPj0gdGhpcy5lbnYubG9nZ2VyLmxldmVsO1xyXG4gICAgcHJpdmF0ZSBfc2VydmVyTG9nID0gKGxvZ0xldmVsOiBMb2dMZXZlbCwgbWVzc2FnZTogc3RyaW5nKSA9PlxyXG4gICAgICAgIHRoaXMuX3Nob3VsZExvZyhsb2dMZXZlbCkgJiYgdGhpcy5odHRwLnBvc3QodGhpcy5nZXRMb2dnZXJQb3N0VXJsKCksIHByZXBhcmVMb2cobWVzc2FnZSwgbG9nTGV2ZWwpKS50b1Byb21pc2UoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgbG9nKG1lc3NhZ2U/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvdWxkTG9nKExvZ0xldmVsLlRyYWNlKSkgY29uc29sZS5sb2coYCVjJHttZXNzYWdlfWAsIGBjb2xvcjojM2RhZjY3YCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmVyTG9nKExvZ0xldmVsLlRyYWNlLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZGVidWcobWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRMb2coTG9nTGV2ZWwuRGVidWcpKSBjb25zb2xlLmxvZyhgJWMke21lc3NhZ2V9YCwgYGNvbG9yOiMwMjc3YmRgKTtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJMb2coTG9nTGV2ZWwuRGVidWcsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICB3YXJuKG1lc3NhZ2U/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvdWxkTG9nKExvZ0xldmVsLldhcm4pKSBjb25zb2xlLmxvZyhgJWMke21lc3NhZ2V9YCwgYGNvbG9yOiNGRjk2MzNgKTtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJMb2coTG9nTGV2ZWwuV2FybiwgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGVycm9yKG1lc3NhZ2U/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvdWxkTG9nKExvZ0xldmVsLkVycm9yKSkgY29uc29sZS5lcnJvcihgJWMke21lc3NhZ2V9YCwgYGNvbG9yOnJlZGApO1xyXG4gICAgICAgIHRoaXMuX3NlcnZlckxvZyhMb2dMZXZlbC5FcnJvciwgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb2cgcGVyIHN0YXRpc3RpY2hlIGNsaWVudCAoZXM6IHVzYXRvIGRhIGxvZ2luIHBhZ2UgcGVyIHRyYWNjaWFyZSByaXNvbHV6aW9uZSBzY2hlcm1vKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgc3RhdChtZXNzYWdlPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttZXNzYWdlfWAsIGBjb2xvcjojODg0RUEwYCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmVyTG9nKExvZ0xldmVsLlRyYWNlLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBsb2dzOiBMb2dnZXJPcGVyYXRpb25SZXN1bHRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zOiBFbnRyaWVzUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRMb2dzKHBhcmFtczogRW50cmllc1BhcmFtcyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghcGFyYW1zLmluc3RhbmNlS2V5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5SZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IuTWVzc2FnZSA9ICdFcnJvciAtIE5vIGluc3RhbmNlS2V5LCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzLmdldExvZ2dlclVybCgpJywgdGhpcy5nZXRMb2dnZXJVcmwoKSk7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBlbnRyaWVzLyR7cGFyYW1zLmluc3RhbmNlS2V5fWA7XHJcblxyXG4gICAgICAgIGxldCBwID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgICBwID0gcC5hcHBlbmQoJ2hvd01hbnknLCAnJyArIHRoaXMuaG93TWFueSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hY2NvdW50TmFtZSkgcCA9IHAuYXBwZW5kKCdhY2NvdW50TmFtZScsIHBhcmFtcy5hY2NvdW50TmFtZSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5zdWJzY3JpcHRpb25LZXkpIHAgPSBwLmFwcGVuZCgnc3Vic2NyaXB0aW9uJywgcGFyYW1zLnN1YnNjcmlwdGlvbktleSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jYXRlZ29yeSkgcCA9IHAuYXBwZW5kKCdjYXRlZ29yaWVzJywgcGFyYW1zLmNhdGVnb3J5KTtcclxuICAgICAgICBpZiAocGFyYW1zLmFwcHMpIHAgPSBwLmFwcGVuZCgnYXBwcycsIHBhcmFtcy5hcHBzKTtcclxuICAgICAgICBpZiAocGFyYW1zLmFwcFR5cGVzKSBwID0gcC5hcHBlbmQoJ2FwcFR5cGVzJywgcGFyYW1zLmFwcFR5cGVzKTtcclxuICAgICAgICBpZiAocGFyYW1zLmxldmVscykgcCA9IHAuYXBwZW5kKCdsZXZlbHMnLCBwYXJhbXMubGV2ZWxzKTtcclxuICAgICAgICBpZiAocGFyYW1zLnJhbmdlRGF0ZVN0YXJ0ICYmIHBhcmFtcy5yYW5nZURhdGVFbmQpIHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5yYW5nZURhdGVTdGFydCA9PT0gcGFyYW1zLnJhbmdlRGF0ZUVuZCkgcCA9IHAuYXBwZW5kKCdkYXRlJywgcGFyYW1zLnJhbmdlRGF0ZVN0YXJ0KTtcclxuICAgICAgICAgICAgZWxzZSBwID0gcC5hcHBlbmQoJ2RhdGUnLCBwYXJhbXMucmFuZ2VEYXRlU3RhcnQgKyAnOycgKyBwYXJhbXMucmFuZ2VEYXRlRW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtczogcFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsLCBodHRwT3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0TG9ncycsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldExvZ3MnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFhcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IuUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLk1lc3NhZ2UgPSAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldEFwcHMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEFwcHMnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwVHlwZXMoYXBwSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLlJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5NZXNzYWdlID0gJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwVHlwZXMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwVHlwZXMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEluc3RhbmNlS2V5KCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwSWRzYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZyh1cmwsICdUYkxvZ2dlclNlcnZpY2UuZ2V0SW5zdGFuY2VLZXkgd2l0aCBhcHBJZDogJywgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0SW5zdGFuY2VLZXknLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExlZ2dlIHR1dHRlIGxlIHN1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U3Vic2NyaXB0aW9uS2V5KCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgc3Vic2NyaXB0aW9uS2V5c2A7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRTdWJzY3JpcHRpb25LZXk6ICcsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldFN1YnNjcmlwdGlvbktleScsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDYXRlZ29yaWVzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5SZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IuTWVzc2FnZSA9ICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGNhdGVnb3JpZXMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0Q2F0ZWdvcmllcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0Q2F0ZWdvcmllcycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIEh0dHAgb3BlcmF0aW9uIHRoYXQgZmFpbGVkLlxyXG4gICAgICogTGV0IHRoZSBhcHAgY29udGludWUuXHJcbiAgICAgKiBAcGFyYW0gb3BlcmF0aW9uIC0gbmFtZSBvZiB0aGUgb3BlcmF0aW9uIHRoYXQgZmFpbGVkXHJcbiAgICAgKiBAcGFyYW0gcmVzdWx0IC0gb3B0aW9uYWwgdmFsdWUgdG8gcmV0dXJuIGFzIHRoZSBvYnNlcnZhYmxlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFuZGxlRXJyb3I8VD4ob3BlcmF0aW9uID0gJ29wZXJhdGlvbicsIHJlc3VsdD86IFQpIHtcclxuICAgICAgICByZXR1cm4gKGVycm9yOiBhbnkpOiBPYnNlcnZhYmxlPFQ+ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtvcGVyYXRpb259IGZhaWxlZDogJHtlcnJvci5lcnJvcn1gKTtcclxuXHJcbiAgICAgICAgICAgIC8vIExldCB0aGUgYXBwIGtlZXAgcnVubmluZyBieSByZXR1cm5pbmcgYW4gZW1wdHkgcmVzdWx0LlxyXG4gICAgICAgICAgICByZXR1cm4gb2YocmVzdWx0IGFzIFQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZXNzaW9uZSBhIFJhYmJpdE1RXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtcUNvbm5lY3QocXVldWVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9tcFNlcnZpY2Uuc3Vic2NyaWJlKHF1ZXVlTmFtZSkucGlwZShtYXAoKG1zZzogTWVzc2FnZSkgPT4gSlNPTi5wYXJzZShtc2cuYm9keSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbXFDb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLmNvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG1xRGlzY29ubmVjdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9tcFNlcnZpY2UuZGlzY29ubmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFBBUlRFIFRCU0VSVkVSTU9OSVRPUlxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIGdldFRCSW5mb3NMb2dzKHBhcmFtczogTW9uaXRvclBhcmFtcyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFRCU2VydmVySW5mb1tdPiB7XHJcbiAgICAgICAgbGV0IHAgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLmFjY291bnROYW1lKSBwID0gcC5hcHBlbmQoJ2FjY291bnROYW1lJywgJycgKyBwYXJhbXMuYWNjb3VudE5hbWUpO1xyXG4gICAgICAgIGlmIChwYXJhbXMucHJvY2Vzc05hbWUpIHAgPSBwLmFwcGVuZCgncHJvY2Vzc05hbWUnLCAnJyArIHBhcmFtcy5wcm9jZXNzTmFtZSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5taW51dGVzKSBwID0gcC5hcHBlbmQoJ21pbnV0ZScsICcnICsgcGFyYW1zLm1pbnV0ZXMpO1xyXG5cclxuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IHsgcGFyYW1zOiBwIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0U2VydmVyTW9uaXRvclVybCgpICsgYHRiU2VydmVycy8ke3BhcmFtcy5pbnN0YW5jZUtleX1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxUQlNlcnZlckluZm9bXT4odXJsLCBodHRwT3B0aW9ucykucGlwZShjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRUQkluZm9zTG9ncycsIGZhbHNlKSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==