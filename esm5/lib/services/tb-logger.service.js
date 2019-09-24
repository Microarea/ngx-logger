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
        function (logLevel, message) { return _this._shouldLog(logLevel) && _this.sendLog(message, logLevel); });
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
     * @private
     * @param {?} message
     * @param {?} logLevel
     * @return {?}
     */
    TbLoggerService.prototype.sendLog = /**
     * @private
     * @param {?} message
     * @param {?} logLevel
     * @return {?}
     */
    function (message, logLevel) {
        this.http
            .post(this.getLoggerPostUrl(), prepareLog(message, logLevel))
            .toPromise()
            .then((/**
         * @param {?} __
         * @return {?}
         */
        function (__) { }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { }));
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
        catchError(this.handleError('TbLoggerService.getLogs', new LoggerOperationResult(false, 'Error - getLogs'))));
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
        catchError(this.handleError('TbLoggerService.getApps', new LoggerOperationResult(false, 'Error - getApps'))));
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
        catchError(this.handleError('TbLoggerService.getAppTypes', new LoggerOperationResult(false, 'Error - getAppTypes'))));
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
        catchError(this.handleError('TbLoggerService.getInstanceKey', new LoggerOperationResult(false, 'Error - getInstanceKey'))));
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
        catchError(this.handleError('TbLoggerService.getSubscriptionKey', new LoggerOperationResult(false, 'Error - getSubscriptionKey'))));
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
        catchError(this.handleError('TbLoggerService.getCategories', new LoggerOperationResult(false, 'Error -  getCategories'))));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBYyxFQUFFLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUcvRCxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0seUNBQXlDLENBQUM7Ozs7O0lBSzFGLGNBQStCOztBQUNuQyxNQUFNLEtBQU8sTUFBTTs7O0FBQUcsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLENBQUE7Ozs7QUFFMUMsOEJBUUM7OztJQVBHLDJCQUFnQjs7SUFDaEIsbUNBQXdCOztJQUN4QiwrQkFBNEI7O0lBQzVCLGdDQUE2Qjs7SUFDN0IsdUJBQWE7O0lBQ2IsNEJBQWtCOztJQUNsQix5QkFBZ0I7Ozs7SUFJaEIsUUFBUztJQUNULFFBQUs7SUFDTCxPQUFJO0lBQ0osUUFBSzs7Ozs7Ozs7Ozs7O0FBR1QsTUFBTSxVQUFVLFVBQVUsQ0FBQyxPQUFlLEVBQUUsUUFBbUM7SUFBbkMseUJBQUEsRUFBQSxXQUFxQixRQUFRLENBQUMsS0FBSzs7UUFDckUsR0FBRyxHQUFhO1FBQ2xCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLGVBQWUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDcEMsV0FBVyxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQ2pELFlBQVksRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUM5QyxRQUFRLEVBQUUsUUFBUTtRQUNsQixLQUFLLEVBQUUsUUFBUTtLQUNsQjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUVEO0lBV0kseUJBQW1DLEdBQXdCLEVBQVUsSUFBZ0IsRUFBUyxZQUEyQjtRQUF6SCxpQkFLQztRQUxrQyxRQUFHLEdBQUgsR0FBRyxDQUFxQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVk7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBZTtRQUxqSCxZQUFPLEdBQUcsR0FBRyxDQUFDO1FBRXRCLHNCQUFpQixHQUFlLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbEQsZ0NBQTJCLEdBQTRCLElBQUksZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQWtEdEYsZUFBVTs7OztRQUFHLFVBQUMsUUFBa0IsSUFBSyxPQUFBLFFBQVEsSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQWpDLENBQWlDLEVBQUM7UUFDdkUsZUFBVTs7Ozs7UUFBRyxVQUFDLFFBQWtCLEVBQUUsT0FBZSxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBNUQsQ0FBNEQsRUFBQztRQWhEdkgsY0FBYyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO1FBQ25ELElBQUksR0FBRyxDQUFDLFdBQVc7WUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkMsQ0FBQzs7OztJQUVELGdDQUFNOzs7SUFBTjtRQUFBLGlCQVNDO1FBUkcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztZQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFDLE1BQWtCO2dCQUNqRCxLQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO2dCQUNoQyxLQUFJLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xELENBQUMsRUFBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxrQ0FBUTs7Ozs7SUFBUjtRQUNJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILHNDQUFZOzs7OztJQUFaO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDakUsQ0FBQztJQUVEOztPQUVHOzs7OztJQUNILDBDQUFnQjs7OztJQUFoQjtRQUNJLE9BQVUsSUFBSSxDQUFDLFlBQVksRUFBRSxnQkFBVyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQUcsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsNkNBQW1COzs7O0lBQW5CO1FBQ0ksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO0lBQ3RGLENBQUM7Ozs7Ozs7SUFLTyxpQ0FBTzs7Ozs7O0lBQWYsVUFBZ0IsT0FBZSxFQUFFLFFBQWtCO1FBQy9DLElBQUksQ0FBQyxJQUFJO2FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFVBQVUsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDNUQsU0FBUyxFQUFFO2FBQ1gsSUFBSTs7OztRQUFDLFVBQUEsRUFBRSxJQUFLLENBQUM7Ozs7UUFBRSxVQUFBLEdBQUcsSUFBSyxDQUFDLEVBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNILDZCQUFHOzs7O0lBQUgsVUFBSSxPQUFhO1FBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssT0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNILCtCQUFLOzs7O0lBQUwsVUFBTSxPQUFhO1FBQ2YsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssT0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNILDhCQUFJOzs7O0lBQUosVUFBSyxPQUFhO1FBQ2QsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssT0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNILCtCQUFLOzs7O0lBQUwsVUFBTSxPQUFhO1FBQ2YsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQUssT0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7SUFDSCw4QkFBSTs7Ozs7O0lBQUosVUFBSyxPQUFhO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFLLE9BQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSSxpQ0FBTzs7Ozs7O0lBQWQsVUFBZSxNQUFxQjtRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTs7Z0JBQ2YsS0FBSyxHQUFHLElBQUkscUJBQXFCLENBQUMsS0FBSyxFQUFFLGtDQUFrQyxDQUFDO1lBQ2xGLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCOzs7WUFFSyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFHLGFBQVcsTUFBTSxDQUFDLFdBQWEsQ0FBQTs7WUFFN0QsQ0FBQyxHQUFHLElBQUksVUFBVSxFQUFFO1FBQ3hCLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLElBQUksTUFBTSxDQUFDLFdBQVc7WUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hFLElBQUksTUFBTSxDQUFDLGVBQWU7WUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pGLElBQUksTUFBTSxDQUFDLFFBQVE7WUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksTUFBTSxDQUFDLElBQUk7WUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksTUFBTSxDQUFDLFFBQVE7WUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9ELElBQUksTUFBTSxDQUFDLE1BQU07WUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELElBQUksTUFBTSxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQzlDLElBQUksTUFBTSxDQUFDLGNBQWMsS0FBSyxNQUFNLENBQUMsWUFBWTtnQkFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDOztnQkFDMUYsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxjQUFjLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNoRjs7WUFDSyxXQUFXLEdBQUc7WUFDaEIsTUFBTSxFQUFFLENBQUM7U0FDWjtRQUVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQXdCLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJO1FBQzlELHlEQUF5RDtRQUN6RCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLHFCQUFxQixDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FDL0csQ0FBQztJQUNOLENBQUM7Ozs7O0lBRU0saUNBQU87Ozs7SUFBZCxVQUFlLEtBQWE7UUFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRTs7Z0JBQ0YsS0FBSyxHQUFHLElBQUkscUJBQXFCLENBQUMsS0FBSyxFQUFFLDRCQUE0QixDQUFDO1lBQzVFLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCOztZQUVLLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUcsVUFBUSxLQUFPLENBQUE7UUFFakQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBd0IsR0FBRyxDQUFDLENBQUMsSUFBSTtRQUNqRCw2RUFBNkU7UUFDN0UsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMseUJBQXlCLEVBQUUsSUFBSSxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQy9HLENBQUM7SUFDTixDQUFDOzs7OztJQUVNLHFDQUFXOzs7O0lBQWxCLFVBQW1CLEtBQWE7UUFDNUIsSUFBSSxDQUFDLEtBQUssRUFBRTs7Z0JBQ0YsS0FBSyxHQUFHLElBQUkscUJBQXFCLENBQUMsS0FBSyxFQUFFLDRCQUE0QixDQUFDO1lBQzVFLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCOztZQUVLLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUcsY0FBWSxLQUFPLENBQUE7UUFFckQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBd0IsR0FBRyxDQUFDLENBQUMsSUFBSTtRQUNqRCxpRkFBaUY7UUFDakYsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsNkJBQTZCLEVBQUUsSUFBSSxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQ3ZILENBQUM7SUFDTixDQUFDOzs7O0lBRU0sd0NBQWM7OztJQUFyQjs7WUFDVSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLFFBQVE7UUFFMUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBd0IsR0FBRyxDQUFDLENBQUMsSUFBSTtRQUNqRCxrRkFBa0Y7UUFDbEYsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQzdILENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0ksNENBQWtCOzs7O0lBQXpCOztZQUNVLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsa0JBQWtCO1FBRXBELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQXdCLEdBQUcsQ0FBQyxDQUFDLElBQUk7UUFDakQsc0VBQXNFO1FBQ3RFLFVBQVUsQ0FDTixJQUFJLENBQUMsV0FBVyxDQUFDLG9DQUFvQyxFQUFFLElBQUkscUJBQXFCLENBQUMsS0FBSyxFQUFFLDRCQUE0QixDQUFDLENBQUMsQ0FDekgsQ0FDSixDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFTSx1Q0FBYTs7OztJQUFwQixVQUFxQixLQUFhO1FBQzlCLElBQUksQ0FBQyxLQUFLLEVBQUU7O2dCQUNGLEtBQUssR0FBRyxJQUFJLHFCQUFxQixDQUFDLEtBQUssRUFBRSw0QkFBNEIsQ0FBQztZQUM1RSxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQjs7WUFFSyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFHLGdCQUFjLEtBQU8sQ0FBQTtRQUV2RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUF3QixHQUFHLENBQUMsQ0FBQyxJQUFJO1FBQ2pELG1GQUFtRjtRQUNuRixVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQywrQkFBK0IsRUFBRSxJQUFJLHFCQUFxQixDQUFDLEtBQUssRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FDNUgsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7T0FLRzs7Ozs7Ozs7O0lBQ0kscUNBQVc7Ozs7Ozs7O0lBQWxCLFVBQXNCLFNBQXVCLEVBQUUsTUFBVTtRQUFuQywwQkFBQSxFQUFBLHVCQUF1QjtRQUN6Qzs7OztRQUFPLFVBQUMsS0FBVTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUksU0FBUyxpQkFBWSxLQUFLLENBQUMsS0FBTyxDQUFDLENBQUM7WUFFckQseURBQXlEO1lBQ3pELE9BQU8sRUFBRSxDQUFDLG1CQUFBLE1BQU0sRUFBSyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxFQUFDO0lBQ04sQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSSxtQ0FBUzs7Ozs7SUFBaEIsVUFBaUIsU0FBaUI7UUFDOUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztRQUFDLFVBQUMsR0FBWSxJQUFLLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQXBCLENBQW9CLEVBQUMsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7Ozs7SUFFTSxxQ0FBVzs7O0lBQWxCO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFDTSxzQ0FBWTs7O0lBQW5CO1FBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRCwwR0FBMEc7SUFDMUcsd0JBQXdCO0lBQ3hCLDBHQUEwRzs7Ozs7Ozs7SUFDbkcsd0NBQWM7Ozs7Ozs7O0lBQXJCLFVBQXNCLE1BQXFCOztZQUNuQyxDQUFDLEdBQUcsSUFBSSxVQUFVLEVBQUU7UUFFeEIsSUFBSSxNQUFNLENBQUMsV0FBVztZQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdFLElBQUksTUFBTSxDQUFDLFdBQVc7WUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3RSxJQUFJLE1BQU0sQ0FBQyxPQUFPO1lBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7O1lBRTFELFdBQVcsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUU7O1lBRTNCLEdBQUcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBRyxlQUFhLE1BQU0sQ0FBQyxXQUFhLENBQUE7UUFFMUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBaUIsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkksQ0FBQzs7Z0JBcFFKLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozs7Z0RBU2dCLE1BQU0sU0FBQyxLQUFLO2dCQXhEcEIsVUFBVTtnQkFLVixhQUFhOzs7MEJBTnRCO0NBbVRDLEFBclFELElBcVFDO1NBbFFZLGVBQWU7OztJQUN4QixvQ0FBa0I7O0lBQ2xCLDJDQUF5Qjs7Ozs7SUFDekIsa0NBQXNCOztJQUV0Qiw0Q0FBa0Q7O0lBQ2xELHNEQUE4Rjs7Ozs7SUFrRDlGLHFDQUErRTs7Ozs7SUFDL0UscUNBQTJIOzs7OztJQWpEL0csOEJBQStDOzs7OztJQUFFLCtCQUF3Qjs7SUFBRSx1Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5pbXBvcnQgeyBTdG9tcFJTZXJ2aWNlLCBTdG9tcFN0YXRlIH0gZnJvbSAnQHN0b21wL25nMi1zdG9tcGpzJztcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BzdG9tcC9zdG9tcGpzJztcclxuXHJcbmltcG9ydCB7IExvZ2dlck9wZXJhdGlvblJlc3VsdCwgVEJTZXJ2ZXJJbmZvIH0gZnJvbSAnLi4vbW9kZWxzL2xvZ2dlci1vcGVyYXRpb24tcmVzdWx0Lm1vZGVsJztcclxuaW1wb3J0IHsgRW50cmllc1BhcmFtcyB9IGZyb20gJy4uL21vZGVscy9lbnRyaWVzLm1vZGVsJztcclxuaW1wb3J0IHsgTW9uaXRvclBhcmFtcyB9IGZyb20gJy4uL21vZGVscy9tb25pdG9yLm1vZGVsJztcclxuaW1wb3J0IHsgVGJMb2dnZXJFbnZpcm9ubWVudCB9IGZyb20gJy4uL21vZGVscy9sb2dnZXItZW52aXJvbm1lbnQnO1xyXG5cclxubGV0IGxvZ2dlckluc3RhbmNlOiBUYkxvZ2dlclNlcnZpY2U7XHJcbmV4cG9ydCBjb25zdCBsb2dnZXIgPSAoKSA9PiBsb2dnZXJJbnN0YW5jZTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTG9nRW50cnkge1xyXG4gICAgTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgUmVnaXN0ZXJlZGFwcGlkOiBzdHJpbmc7XHJcbiAgICBBY2NvdW50TmFtZT86IHN0cmluZyB8IG51bGw7XHJcbiAgICBTdWJzY3JpcHRpb24/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgQXBwPzogc3RyaW5nO1xyXG4gICAgQ2F0ZWdvcnk/OiBzdHJpbmc7XHJcbiAgICBMZXZlbDogTG9nTGV2ZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIExvZ0xldmVsIHtcclxuICAgIFRyYWNlID0gMCxcclxuICAgIERlYnVnLFxyXG4gICAgV2FybixcclxuICAgIEVycm9yXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlTG9nKG1lc3NhZ2U6IHN0cmluZywgbG9nTGV2ZWw6IExvZ0xldmVsID0gTG9nTGV2ZWwuRGVidWcpIHtcclxuICAgIGNvbnN0IGxvZzogTG9nRW50cnkgPSB7XHJcbiAgICAgICAgTWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgICBSZWdpc3RlcmVkYXBwaWQ6IGxvZ2dlcigpLmdldEFwcElkKCksXHJcbiAgICAgICAgQWNjb3VudE5hbWU6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfYWNjb3VudG5hbWUnKSxcclxuICAgICAgICBTdWJzY3JpcHRpb246IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfY29tcGFueScpLFxyXG4gICAgICAgIENhdGVnb3J5OiAnQ2xpZW50JyxcclxuICAgICAgICBMZXZlbDogbG9nTGV2ZWxcclxuICAgIH07XHJcbiAgICByZXR1cm4gbG9nO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyU2VydmljZSB7XHJcbiAgICBsb2dnZXJVcmw6IHN0cmluZztcclxuICAgIHNlcnZlck1vbml0b3JVcmw6IHN0cmluZztcclxuICAgIHByaXZhdGUgaG93TWFueSA9IDEwMDtcclxuXHJcbiAgICBtcUNvbm5lY3Rpb25TdGF0ZTogU3RvbXBTdGF0ZSA9IFN0b21wU3RhdGUuQ0xPU0VEO1xyXG4gICAgbXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3QoU3RvbXBTdGF0ZS5DTE9TRUQpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoJ2VudicpIHByaXZhdGUgZW52OiBUYkxvZ2dlckVudmlyb25tZW50LCBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHB1YmxpYyBzdG9tcFNlcnZpY2U6IFN0b21wUlNlcnZpY2UpIHtcclxuICAgICAgICBsb2dnZXJJbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5sb2dnZXJVcmwgPSB0aGlzLmVudi5sb2dnZXIudXJsO1xyXG4gICAgICAgIHRoaXMuc2VydmVyTW9uaXRvclVybCA9IHRoaXMuZW52LnNlcnZlck1vbml0b3IudXJsO1xyXG4gICAgICAgIGlmIChlbnYuc3RvbXBDb25maWcpIHRoaXMubXFJbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbXFJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmVudi5zdG9tcENvbmZpZykge1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5jb25maWcgPSB0aGlzLmVudi5zdG9tcENvbmZpZztcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2UuaW5pdEFuZENvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2Uuc3RhdGUuc3Vic2NyaWJlKChzdGF0dXM6IFN0b21wU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGUgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZS5uZXh0KHN0YXR1cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJpdG9ybmEgbGEgQXBwIElkIGRlbGwnYXBwbGljYXppb25lIGZyb250ZW5kIGNoZSBzdGEgbG9nZ2FuZG8sXHJcbiAgICAgKiBjYXJpY2F0YSBkYSB1biBmaWxlIGRpIGNvbmZpZ3VyYXppb25lIGNhcmljYXRvIGRpbmFtaWNhbWVudGUgKGFzc2V0cy9lbnZpcm9ubWVudC5qc29uKVxyXG4gICAgICovXHJcbiAgICBnZXRBcHBJZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbnYubG9nZ2VyLmFwcElkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUml0b3JuYSBsYSBiYXNlIHVybCBkZWwgbG9nZ2VyLFxyXG4gICAgICogY2FyaWNhdGEgZGEgdW4gZmlsZSBkaSBjb25maWd1cmF6aW9uZSBjYXJpY2F0byBkaW5hbWljYW1lbnRlIChhc3NldHMvZW52aXJvbm1lbnQuanNvbilcclxuICAgICAqL1xyXG4gICAgZ2V0TG9nZ2VyVXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2dlclVybCA/IHRoaXMubG9nZ2VyVXJsIDogdGhpcy5lbnYubG9nZ2VyLnVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJpdG9ybmEgbGEgYXBpIHBlciBpbnNlcmlyZSBsb2cgY29uIGFwcElkIGNvbmZpZ3VyYXRvIGluIGVudmlyb25tZW50Lmpzb25cclxuICAgICAqL1xyXG4gICAgZ2V0TG9nZ2VyUG9zdFVybCgpIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5nZXRMb2dnZXJVcmwoKX1lbnRyaWVzLyR7dGhpcy5nZXRBcHBJZCgpfS9gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTTQgQmFja2VuZCBVUkxcclxuICAgICAqL1xyXG4gICAgZ2V0U2VydmVyTW9uaXRvclVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2ZXJNb25pdG9yVXJsID8gdGhpcy5zZXJ2ZXJNb25pdG9yVXJsIDogdGhpcy5lbnYuc2VydmVyTW9uaXRvci51cmw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2hvdWxkTG9nID0gKGxvZ0xldmVsOiBMb2dMZXZlbCkgPT4gbG9nTGV2ZWwgPj0gdGhpcy5lbnYubG9nZ2VyLmxldmVsO1xyXG4gICAgcHJpdmF0ZSBfc2VydmVyTG9nID0gKGxvZ0xldmVsOiBMb2dMZXZlbCwgbWVzc2FnZTogc3RyaW5nKSA9PiB0aGlzLl9zaG91bGRMb2cobG9nTGV2ZWwpICYmIHRoaXMuc2VuZExvZyhtZXNzYWdlLCBsb2dMZXZlbCk7XHJcblxyXG4gICAgcHJpdmF0ZSBzZW5kTG9nKG1lc3NhZ2U6IHN0cmluZywgbG9nTGV2ZWw6IExvZ0xldmVsKSB7XHJcbiAgICAgICAgdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5wb3N0KHRoaXMuZ2V0TG9nZ2VyUG9zdFVybCgpLCBwcmVwYXJlTG9nKG1lc3NhZ2UsIGxvZ0xldmVsKSlcclxuICAgICAgICAgICAgLnRvUHJvbWlzZSgpXHJcbiAgICAgICAgICAgIC50aGVuKF9fID0+IHt9LCBlcnIgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBsb2cobWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRMb2coTG9nTGV2ZWwuVHJhY2UpKSBjb25zb2xlLmxvZyhgJWMke21lc3NhZ2V9YCwgYGNvbG9yOiMzZGFmNjdgKTtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJMb2coTG9nTGV2ZWwuVHJhY2UsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBkZWJ1ZyhtZXNzYWdlPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3VsZExvZyhMb2dMZXZlbC5EZWJ1ZykpIGNvbnNvbGUubG9nKGAlYyR7bWVzc2FnZX1gLCBgY29sb3I6IzAyNzdiZGApO1xyXG4gICAgICAgIHRoaXMuX3NlcnZlckxvZyhMb2dMZXZlbC5EZWJ1ZywgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIHdhcm4obWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRMb2coTG9nTGV2ZWwuV2FybikpIGNvbnNvbGUubG9nKGAlYyR7bWVzc2FnZX1gLCBgY29sb3I6I0ZGOTYzM2ApO1xyXG4gICAgICAgIHRoaXMuX3NlcnZlckxvZyhMb2dMZXZlbC5XYXJuLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZXJyb3IobWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRMb2coTG9nTGV2ZWwuRXJyb3IpKSBjb25zb2xlLmVycm9yKGAlYyR7bWVzc2FnZX1gLCBgY29sb3I6cmVkYCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmVyTG9nKExvZ0xldmVsLkVycm9yLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZyBwZXIgc3RhdGlzdGljaGUgY2xpZW50IChlczogdXNhdG8gZGEgbG9naW4gcGFnZSBwZXIgdHJhY2NpYXJlIHJpc29sdXppb25lIHNjaGVybW8pXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBzdGF0KG1lc3NhZ2U/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21lc3NhZ2V9YCwgYGNvbG9yOiM4ODRFQTBgKTtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJMb2coTG9nTGV2ZWwuVHJhY2UsIG1lc3NhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGxvZ3M6IExvZ2dlck9wZXJhdGlvblJlc3VsdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbXM6IEVudHJpZXNQYXJhbXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExvZ3MocGFyYW1zOiBFbnRyaWVzUGFyYW1zKTogT2JzZXJ2YWJsZTxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIXBhcmFtcy5pbnN0YW5jZUtleSkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoZmFsc2UsICdFcnJvciAtIE5vIGluc3RhbmNlS2V5LCBubyBwYXJ0eScpO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcy5nZXRMb2dnZXJVcmwoKScsIHRoaXMuZ2V0TG9nZ2VyVXJsKCkpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgZW50cmllcy8ke3BhcmFtcy5pbnN0YW5jZUtleX1gO1xyXG5cclxuICAgICAgICBsZXQgcCA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICAgICAgcCA9IHAuYXBwZW5kKCdob3dNYW55JywgJycgKyB0aGlzLmhvd01hbnkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYWNjb3VudE5hbWUpIHAgPSBwLmFwcGVuZCgnYWNjb3VudE5hbWUnLCBwYXJhbXMuYWNjb3VudE5hbWUpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuc3Vic2NyaXB0aW9uS2V5KSBwID0gcC5hcHBlbmQoJ3N1YnNjcmlwdGlvbicsIHBhcmFtcy5zdWJzY3JpcHRpb25LZXkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuY2F0ZWdvcnkpIHAgPSBwLmFwcGVuZCgnY2F0ZWdvcmllcycsIHBhcmFtcy5jYXRlZ29yeSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcHBzKSBwID0gcC5hcHBlbmQoJ2FwcHMnLCBwYXJhbXMuYXBwcyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcHBUeXBlcykgcCA9IHAuYXBwZW5kKCdhcHBUeXBlcycsIHBhcmFtcy5hcHBUeXBlcyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5sZXZlbHMpIHAgPSBwLmFwcGVuZCgnbGV2ZWxzJywgcGFyYW1zLmxldmVscyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5yYW5nZURhdGVTdGFydCAmJiBwYXJhbXMucmFuZ2VEYXRlRW5kKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMucmFuZ2VEYXRlU3RhcnQgPT09IHBhcmFtcy5yYW5nZURhdGVFbmQpIHAgPSBwLmFwcGVuZCgnZGF0ZScsIHBhcmFtcy5yYW5nZURhdGVTdGFydCk7XHJcbiAgICAgICAgICAgIGVsc2UgcCA9IHAuYXBwZW5kKCdkYXRlJywgcGFyYW1zLnJhbmdlRGF0ZVN0YXJ0ICsgJzsnICsgcGFyYW1zLnJhbmdlRGF0ZUVuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCwgaHR0cE9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldExvZ3MnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRMb2dzJywgbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdChmYWxzZSwgJ0Vycm9yIC0gZ2V0TG9ncycpKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KGZhbHNlLCAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBzJywgbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdChmYWxzZSwgJ0Vycm9yIC0gZ2V0QXBwcycpKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBUeXBlcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdChmYWxzZSwgJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5Jyk7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcFR5cGVzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcycsIG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoZmFsc2UsICdFcnJvciAtIGdldEFwcFR5cGVzJykpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEluc3RhbmNlS2V5KCk6IE9ic2VydmFibGU8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBJZHNgO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKHVybCwgJ1RiTG9nZ2VyU2VydmljZS5nZXRJbnN0YW5jZUtleSB3aXRoIGFwcElkOiAnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRJbnN0YW5jZUtleScsIG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoZmFsc2UsICdFcnJvciAtIGdldEluc3RhbmNlS2V5JykpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMZWdnZSB0dXR0ZSBsZSBzdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFN1YnNjcmlwdGlvbktleSgpOiBPYnNlcnZhYmxlPExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgc3Vic2NyaXB0aW9uS2V5c2A7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRTdWJzY3JpcHRpb25LZXk6ICcsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0U3Vic2NyaXB0aW9uS2V5JywgbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdChmYWxzZSwgJ0Vycm9yIC0gZ2V0U3Vic2NyaXB0aW9uS2V5JykpXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDYXRlZ29yaWVzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KGZhbHNlLCAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknKTtcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgY2F0ZWdvcmllcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRDYXRlZ29yaWVzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRDYXRlZ29yaWVzJywgbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdChmYWxzZSwgJ0Vycm9yIC0gIGdldENhdGVnb3JpZXMnKSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBIdHRwIG9wZXJhdGlvbiB0aGF0IGZhaWxlZC5cclxuICAgICAqIExldCB0aGUgYXBwIGNvbnRpbnVlLlxyXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiAtIG5hbWUgb2YgdGhlIG9wZXJhdGlvbiB0aGF0IGZhaWxlZFxyXG4gICAgICogQHBhcmFtIHJlc3VsdCAtIG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBhcyB0aGUgb2JzZXJ2YWJsZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUVycm9yPFQ+KG9wZXJhdGlvbiA9ICdvcGVyYXRpb24nLCByZXN1bHQ/OiBUKSB7XHJcbiAgICAgICAgcmV0dXJuIChlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxUPiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7b3BlcmF0aW9ufSBmYWlsZWQ6ICR7ZXJyb3IuZXJyb3J9YCk7XHJcblxyXG4gICAgICAgICAgICAvLyBMZXQgdGhlIGFwcCBrZWVwIHJ1bm5pbmcgYnkgcmV0dXJuaW5nIGFuIGVtcHR5IHJlc3VsdC5cclxuICAgICAgICAgICAgcmV0dXJuIG9mKHJlc3VsdCBhcyBUKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVzc2lvbmUgYSBSYWJiaXRNUVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXFDb25uZWN0KHF1ZXVlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLnN1YnNjcmliZShxdWV1ZU5hbWUpLnBpcGUobWFwKChtc2c6IE1lc3NhZ2UpID0+IEpTT04ucGFyc2UobXNnLmJvZHkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1xQ29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBtcURpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBQQVJURSBUQlNFUlZFUk1PTklUT1JcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHB1YmxpYyBnZXRUQkluZm9zTG9ncyhwYXJhbXM6IE1vbml0b3JQYXJhbXMpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBUQlNlcnZlckluZm9bXT4ge1xyXG4gICAgICAgIGxldCBwID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5hY2NvdW50TmFtZSkgcCA9IHAuYXBwZW5kKCdhY2NvdW50TmFtZScsICcnICsgcGFyYW1zLmFjY291bnROYW1lKTtcclxuICAgICAgICBpZiAocGFyYW1zLnByb2Nlc3NOYW1lKSBwID0gcC5hcHBlbmQoJ3Byb2Nlc3NOYW1lJywgJycgKyBwYXJhbXMucHJvY2Vzc05hbWUpO1xyXG4gICAgICAgIGlmIChwYXJhbXMubWludXRlcykgcCA9IHAuYXBwZW5kKCdtaW51dGUnLCAnJyArIHBhcmFtcy5taW51dGVzKTtcclxuXHJcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7IHBhcmFtczogcCB9O1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldFNlcnZlck1vbml0b3JVcmwoKSArIGB0YlNlcnZlcnMvJHtwYXJhbXMuaW5zdGFuY2VLZXl9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8VEJTZXJ2ZXJJbmZvW10+KHVybCwgaHR0cE9wdGlvbnMpLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0VEJJbmZvc0xvZ3MnLCBmYWxzZSkpKTtcclxuICAgIH1cclxufVxyXG4iXX0=