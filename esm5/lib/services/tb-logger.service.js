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
        return sessionStorage.getItem('_instanceKey') || this.env.logger.appId;
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
     * Console.log in attesa di post to logger
     *
     * @param message
     * @param optionalParams
     */
    /**
     * Console.log in attesa di post to logger
     *
     * @param {?=} message
     * @return {?}
     */
    TbLoggerService.prototype.log = /**
     * Console.log in attesa di post to logger
     *
     * @param {?=} message
     * @return {?}
     */
    function (message) {
        if (this._shouldLog(LogLevel.Trace))
            console.log("%c" + message, "color:#3daf67");
        this._serverLog(LogLevel.Trace, message);
    };
    /**
     * Console.log in attesa di post to logger
     *
     * @param message
     * @param optionalParams
     */
    /**
     * Console.log in attesa di post to logger
     *
     * @param {?=} message
     * @return {?}
     */
    TbLoggerService.prototype.debug = /**
     * Console.log in attesa di post to logger
     *
     * @param {?=} message
     * @return {?}
     */
    function (message) {
        if (this._shouldLog(LogLevel.Trace))
            console.log("%c" + message, "color:#0277bd");
        this._serverLog(LogLevel.Debug, message);
    };
    /**
     * Console.warn in attesa di post to logger
     *
     * @param message
     * @param optionalParams
     */
    /**
     * Console.warn in attesa di post to logger
     *
     * @param {?=} message
     * @return {?}
     */
    TbLoggerService.prototype.warn = /**
     * Console.warn in attesa di post to logger
     *
     * @param {?=} message
     * @return {?}
     */
    function (message) {
        if (this._shouldLog(LogLevel.Trace))
            console.log("%c" + message, "color:#FF9633");
        this._serverLog(LogLevel.Warn, message);
    };
    /**
     * Console.error in attesa di post to logger
     *
     * @param message
     * @param optionalParams
     */
    /**
     * Console.error in attesa di post to logger
     *
     * @param {?=} message
     * @return {?}
     */
    TbLoggerService.prototype.error = /**
     * Console.error in attesa di post to logger
     *
     * @param {?=} message
     * @return {?}
     */
    function (message) {
        if (this._shouldLog(LogLevel.Error))
            console.error("%c" + message, "color:red");
        this._serverLog(LogLevel.Error, message);
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
    /** @nocollapse */ TbLoggerService.ngInjectableDef = i0.defineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(i0.inject("env"), i0.inject(i1.HttpClient), i0.inject(i2.StompRService)); }, token: TbLoggerService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTlELE9BQU8sRUFBYyxFQUFFLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUcvRCxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0seUNBQXlDLENBQUM7Ozs7O0lBSTFGLGNBQStCOztBQUNuQyxNQUFNLEtBQU8sTUFBTTs7O0FBQUcsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLENBQUE7Ozs7QUFFMUMsOEJBUUM7OztJQVBHLDJCQUFnQjs7SUFDaEIsbUNBQXdCOztJQUN4QiwrQkFBcUI7O0lBQ3JCLGdDQUFzQjs7SUFDdEIsdUJBQWE7O0lBQ2IsNEJBQWtCOztJQUNsQix5QkFBZ0I7Ozs7SUFJaEIsUUFBUztJQUNULFFBQUs7SUFDTCxPQUFJO0lBQ0osUUFBSzs7Ozs7Ozs7Ozs7O0FBR1QsTUFBTSxVQUFVLFVBQVUsQ0FBQyxPQUFlLEVBQUUsUUFBbUM7SUFBbkMseUJBQUEsRUFBQSxXQUFxQixRQUFRLENBQUMsS0FBSzs7UUFDckUsR0FBRyxHQUFhO1FBQ2xCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLGVBQWUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDcEMsV0FBVyxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFD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QUM7O2dCQS9QSixVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7O2dEQVNnQixNQUFNLFNBQUMsS0FBSztnQkF2RHBCLFVBQVU7Z0JBS1YsYUFBYTs7OzBCQU50QjtDQTZTQyxBQWhRRCxJQWdRQztTQTdQWSxlQUFlOzs7SUFDeEIsb0NBQXlCOztJQUN6QiwyQ0FBZ0M7Ozs7O0lBQ2hDLGtDQUFzQjs7SUFFdEIsNENBQXlEOztJQUN6RCxzREFBeUc7Ozs7O0lBZ0R6RyxxQ0FBK0U7Ozs7O0lBQy9FLHFDQUNvSDs7Ozs7SUFoRHhHLDhCQUEwQjs7Ozs7SUFBRSwrQkFBd0I7O0lBQUUsdUNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgU3RvbXBSU2VydmljZSwgU3RvbXBTdGF0ZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAc3RvbXAvc3RvbXBqcyc7XHJcblxyXG5pbXBvcnQgeyBMb2dnZXJPcGVyYXRpb25SZXN1bHQsIFRCU2VydmVySW5mbyB9IGZyb20gJy4uL21vZGVscy9sb2dnZXItb3BlcmF0aW9uLXJlc3VsdC5tb2RlbCc7XHJcbmltcG9ydCB7IEVudHJpZXNQYXJhbXMgfSBmcm9tICcuLi9tb2RlbHMvZW50cmllcy5tb2RlbCc7XHJcbmltcG9ydCB7IE1vbml0b3JQYXJhbXMgfSBmcm9tICcuLi9tb2RlbHMvbW9uaXRvci5tb2RlbCc7XHJcblxyXG5sZXQgbG9nZ2VySW5zdGFuY2U6IFRiTG9nZ2VyU2VydmljZTtcclxuZXhwb3J0IGNvbnN0IGxvZ2dlciA9ICgpID0+IGxvZ2dlckluc3RhbmNlO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMb2dFbnRyeSB7XHJcbiAgICBNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBSZWdpc3RlcmVkYXBwaWQ6IHN0cmluZztcclxuICAgIEFjY291bnROYW1lPzogc3RyaW5nO1xyXG4gICAgU3Vic2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gICAgQXBwPzogc3RyaW5nO1xyXG4gICAgQ2F0ZWdvcnk/OiBzdHJpbmc7XHJcbiAgICBMZXZlbDogTG9nTGV2ZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIExvZ0xldmVsIHtcclxuICAgIFRyYWNlID0gMCxcclxuICAgIERlYnVnLFxyXG4gICAgV2FybixcclxuICAgIEVycm9yXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlTG9nKG1lc3NhZ2U6IHN0cmluZywgbG9nTGV2ZWw6IExvZ0xldmVsID0gTG9nTGV2ZWwuRGVidWcpIHtcclxuICAgIGNvbnN0IGxvZzogTG9nRW50cnkgPSB7XHJcbiAgICAgICAgTWVzc2FnZTogbWVzc2FnZSxcclxuICAgICAgICBSZWdpc3RlcmVkYXBwaWQ6IGxvZ2dlcigpLmdldEFwcElkKCksXHJcbiAgICAgICAgQWNjb3VudE5hbWU6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfYWNjb3VudG5hbWUnKSxcclxuICAgICAgICBTdWJzY3JpcHRpb246IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfY29tcGFueScpLFxyXG4gICAgICAgIENhdGVnb3J5OiAnQ2xpZW50JyxcclxuICAgICAgICBMZXZlbDogbG9nTGV2ZWxcclxuICAgIH07XHJcbiAgICByZXR1cm4gbG9nO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyU2VydmljZSB7XHJcbiAgICBwdWJsaWMgbG9nZ2VyVXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VydmVyTW9uaXRvclVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBob3dNYW55ID0gMTAwO1xyXG5cclxuICAgIHB1YmxpYyBtcUNvbm5lY3Rpb25TdGF0ZTogU3RvbXBTdGF0ZSA9IFN0b21wU3RhdGUuQ0xPU0VEO1xyXG4gICAgcHVibGljIG1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZTogQmVoYXZpb3JTdWJqZWN0PFN0b21wU3RhdGU+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChTdG9tcFN0YXRlLkNMT1NFRCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgnZW52JykgcHJpdmF0ZSBlbnYsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHVibGljIHN0b21wU2VydmljZTogU3RvbXBSU2VydmljZSkge1xyXG4gICAgICAgIGxvZ2dlckluc3RhbmNlID0gdGhpcztcclxuICAgICAgICBpZiAoZW52LnN0b21wQ29uZmlnKSB0aGlzLm1xSW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1xSW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5lbnYuc3RvbXBDb25maWcpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2UuY29uZmlnID0gdGhpcy5lbnYuc3RvbXBDb25maWc7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvbXBTZXJ2aWNlLmluaXRBbmRDb25uZWN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvbXBTZXJ2aWNlLnN0YXRlLnN1YnNjcmliZSgoc3RhdHVzOiBTdG9tcFN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlID0gc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tcUNvbm5lY3Rpb25TdGF0ZU9ic2VydmFibGUubmV4dChzdGF0dXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSaXRvcm5hIGxhIEFwcCBJZCBkZWxsJ2FwcGxpY2F6aW9uZSBmcm9udGVuZCBjaGUgc3RhIGxvZ2dhbmRvLFxyXG4gICAgICogY2FyaWNhdGEgZGEgdW4gZmlsZSBkaSBjb25maWd1cmF6aW9uZSBjYXJpY2F0byBkaW5hbWljYW1lbnRlIChhc3NldHMvZW52aXJvbm1lbnQuanNvbilcclxuICAgICAqL1xyXG4gICAgZ2V0QXBwSWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ19pbnN0YW5jZUtleScpIHx8IHRoaXMuZW52LmxvZ2dlci5hcHBJZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJpdG9ybmEgbGEgYmFzZSB1cmwgZGVsIGxvZ2dlcixcclxuICAgICAqIGNhcmljYXRhIGRhIHVuIGZpbGUgZGkgY29uZmlndXJhemlvbmUgY2FyaWNhdG8gZGluYW1pY2FtZW50ZSAoYXNzZXRzL2Vudmlyb25tZW50Lmpzb24pXHJcbiAgICAgKi9cclxuICAgIGdldExvZ2dlclVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2dnZXJVcmwgPyB0aGlzLmxvZ2dlclVybCA6IHRoaXMuZW52LmxvZ2dlci51cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSaXRvcm5hIGxhIGFwaSBwZXIgaW5zZXJpcmUgbG9nIGNvbiBhcHBJZCBjb25maWd1cmF0byBpbiBlbnZpcm9ubWVudC5qc29uXHJcbiAgICAgKi9cclxuICAgIGdldExvZ2dlclBvc3RVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0TG9nZ2VyVXJsKCl9ZW50cmllcy8ke3RoaXMuZ2V0QXBwSWQoKX0vYDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE00IEJhY2tlbmQgVVJMXHJcbiAgICAgKi9cclxuICAgIGdldFNlcnZlck1vbml0b3JVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyTW9uaXRvclVybCA/IHRoaXMuc2VydmVyTW9uaXRvclVybCA6IHRoaXMuZW52LnNlcnZlck1vbml0b3IudXJsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3Nob3VsZExvZyA9IChsb2dMZXZlbDogTG9nTGV2ZWwpID0+IGxvZ0xldmVsID49IHRoaXMuZW52LmxvZ2dlci5sZXZlbDtcclxuICAgIHByaXZhdGUgX3NlcnZlckxvZyA9IChsb2dMZXZlbDogTG9nTGV2ZWwsIG1lc3NhZ2U6IHN0cmluZykgPT5cclxuICAgICAgICB0aGlzLl9zaG91bGRMb2cobG9nTGV2ZWwpICYmIHRoaXMuaHR0cC5wb3N0KHRoaXMuZ2V0TG9nZ2VyUG9zdFVybCgpLCBwcmVwYXJlTG9nKG1lc3NhZ2UsIGxvZ0xldmVsKSkudG9Qcm9taXNlKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLmxvZyBpbiBhdHRlc2EgZGkgcG9zdCB0byBsb2dnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGxvZyhtZXNzYWdlPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Nob3VsZExvZyhMb2dMZXZlbC5UcmFjZSkpIGNvbnNvbGUubG9nKGAlYyR7bWVzc2FnZX1gLCBgY29sb3I6IzNkYWY2N2ApO1xyXG4gICAgICAgIHRoaXMuX3NlcnZlckxvZyhMb2dMZXZlbC5UcmFjZSwgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLmxvZyBpbiBhdHRlc2EgZGkgcG9zdCB0byBsb2dnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGRlYnVnKG1lc3NhZ2U/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc2hvdWxkTG9nKExvZ0xldmVsLlRyYWNlKSkgY29uc29sZS5sb2coYCVjJHttZXNzYWdlfWAsIGBjb2xvcjojMDI3N2JkYCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmVyTG9nKExvZ0xldmVsLkRlYnVnLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnNvbGUud2FybiBpbiBhdHRlc2EgZGkgcG9zdCB0byBsb2dnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIHdhcm4obWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRMb2coTG9nTGV2ZWwuVHJhY2UpKSBjb25zb2xlLmxvZyhgJWMke21lc3NhZ2V9YCwgYGNvbG9yOiNGRjk2MzNgKTtcclxuICAgICAgICB0aGlzLl9zZXJ2ZXJMb2coTG9nTGV2ZWwuV2FybiwgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLmVycm9yIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZXJyb3IobWVzc2FnZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRMb2coTG9nTGV2ZWwuRXJyb3IpKSBjb25zb2xlLmVycm9yKGAlYyR7bWVzc2FnZX1gLCBgY29sb3I6cmVkYCk7XHJcbiAgICAgICAgdGhpcy5fc2VydmVyTG9nKExvZ0xldmVsLkVycm9yLCBtZXNzYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBsb2dzOiBMb2dnZXJPcGVyYXRpb25SZXN1bHRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zOiBFbnRyaWVzUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRMb2dzKHBhcmFtczogRW50cmllc1BhcmFtcyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghcGFyYW1zLmluc3RhbmNlS2V5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5SZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IuTWVzc2FnZSA9ICdFcnJvciAtIE5vIGluc3RhbmNlS2V5LCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzLmdldExvZ2dlclVybCgpJywgdGhpcy5nZXRMb2dnZXJVcmwoKSk7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBlbnRyaWVzLyR7cGFyYW1zLmluc3RhbmNlS2V5fWA7XHJcblxyXG4gICAgICAgIGxldCBwID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgICBwID0gcC5hcHBlbmQoJ2hvd01hbnknLCAnJyArIHRoaXMuaG93TWFueSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hY2NvdW50TmFtZSkgcCA9IHAuYXBwZW5kKCdhY2NvdW50TmFtZScsIHBhcmFtcy5hY2NvdW50TmFtZSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5zdWJzY3JpcHRpb25LZXkpIHAgPSBwLmFwcGVuZCgnc3Vic2NyaXB0aW9uJywgcGFyYW1zLnN1YnNjcmlwdGlvbktleSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5jYXRlZ29yeSkgcCA9IHAuYXBwZW5kKCdjYXRlZ29yaWVzJywgcGFyYW1zLmNhdGVnb3J5KTtcclxuICAgICAgICBpZiAocGFyYW1zLmFwcHMpIHAgPSBwLmFwcGVuZCgnYXBwcycsIHBhcmFtcy5hcHBzKTtcclxuICAgICAgICBpZiAocGFyYW1zLmFwcFR5cGVzKSBwID0gcC5hcHBlbmQoJ2FwcFR5cGVzJywgcGFyYW1zLmFwcFR5cGVzKTtcclxuICAgICAgICBpZiAocGFyYW1zLmxldmVscykgcCA9IHAuYXBwZW5kKCdsZXZlbHMnLCBwYXJhbXMubGV2ZWxzKTtcclxuICAgICAgICBpZiAocGFyYW1zLnJhbmdlRGF0ZVN0YXJ0ICYmIHBhcmFtcy5yYW5nZURhdGVFbmQpIHtcclxuICAgICAgICAgICAgaWYgKHBhcmFtcy5yYW5nZURhdGVTdGFydCA9PT0gcGFyYW1zLnJhbmdlRGF0ZUVuZCkgcCA9IHAuYXBwZW5kKCdkYXRlJywgcGFyYW1zLnJhbmdlRGF0ZVN0YXJ0KTtcclxuICAgICAgICAgICAgZWxzZSBwID0gcC5hcHBlbmQoJ2RhdGUnLCBwYXJhbXMucmFuZ2VEYXRlU3RhcnQgKyAnOycgKyBwYXJhbXMucmFuZ2VEYXRlRW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtczogcFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsLCBodHRwT3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0TG9ncycsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldExvZ3MnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFhcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IuUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLk1lc3NhZ2UgPSAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldEFwcHMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEFwcHMnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwVHlwZXMoYXBwSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLlJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5NZXNzYWdlID0gJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwVHlwZXMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwVHlwZXMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEluc3RhbmNlS2V5KCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwSWRzYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZyh1cmwsICdUYkxvZ2dlclNlcnZpY2UuZ2V0SW5zdGFuY2VLZXkgd2l0aCBhcHBJZDogJywgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0SW5zdGFuY2VLZXknLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExlZ2dlIHR1dHRlIGxlIHN1YnNjcmlwdGlvblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U3Vic2NyaXB0aW9uS2V5KCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgc3Vic2NyaXB0aW9uS2V5c2A7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRTdWJzY3JpcHRpb25LZXk6ICcsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldFN1YnNjcmlwdGlvbktleScsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDYXRlZ29yaWVzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5SZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IuTWVzc2FnZSA9ICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGNhdGVnb3JpZXMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0Q2F0ZWdvcmllcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0Q2F0ZWdvcmllcycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIEh0dHAgb3BlcmF0aW9uIHRoYXQgZmFpbGVkLlxyXG4gICAgICogTGV0IHRoZSBhcHAgY29udGludWUuXHJcbiAgICAgKiBAcGFyYW0gb3BlcmF0aW9uIC0gbmFtZSBvZiB0aGUgb3BlcmF0aW9uIHRoYXQgZmFpbGVkXHJcbiAgICAgKiBAcGFyYW0gcmVzdWx0IC0gb3B0aW9uYWwgdmFsdWUgdG8gcmV0dXJuIGFzIHRoZSBvYnNlcnZhYmxlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFuZGxlRXJyb3I8VD4ob3BlcmF0aW9uID0gJ29wZXJhdGlvbicsIHJlc3VsdD86IFQpIHtcclxuICAgICAgICByZXR1cm4gKGVycm9yOiBhbnkpOiBPYnNlcnZhYmxlPFQ+ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtvcGVyYXRpb259IGZhaWxlZDogJHtlcnJvci5lcnJvcn1gKTtcclxuXHJcbiAgICAgICAgICAgIC8vIExldCB0aGUgYXBwIGtlZXAgcnVubmluZyBieSByZXR1cm5pbmcgYW4gZW1wdHkgcmVzdWx0LlxyXG4gICAgICAgICAgICByZXR1cm4gb2YocmVzdWx0IGFzIFQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZXNzaW9uZSBhIFJhYmJpdE1RXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtcUNvbm5lY3QocXVldWVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9tcFNlcnZpY2Uuc3Vic2NyaWJlKHF1ZXVlTmFtZSkucGlwZShtYXAoKG1zZzogTWVzc2FnZSkgPT4gSlNPTi5wYXJzZShtc2cuYm9keSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbXFDb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLmNvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG1xRGlzY29ubmVjdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9tcFNlcnZpY2UuZGlzY29ubmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8vIFBBUlRFIFRCU0VSVkVSTU9OSVRPUlxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgcHVibGljIGdldFRCSW5mb3NMb2dzKHBhcmFtczogTW9uaXRvclBhcmFtcyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFRCU2VydmVySW5mb1tdPiB7XHJcbiAgICAgICAgbGV0IHAgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG5cclxuICAgICAgICBpZiAocGFyYW1zLmFjY291bnROYW1lKSBwID0gcC5hcHBlbmQoJ2FjY291bnROYW1lJywgJycgKyBwYXJhbXMuYWNjb3VudE5hbWUpO1xyXG4gICAgICAgIGlmIChwYXJhbXMucHJvY2Vzc05hbWUpIHAgPSBwLmFwcGVuZCgncHJvY2Vzc05hbWUnLCAnJyArIHBhcmFtcy5wcm9jZXNzTmFtZSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5taW51dGVzKSBwID0gcC5hcHBlbmQoJ21pbnV0ZScsICcnICsgcGFyYW1zLm1pbnV0ZXMpO1xyXG5cclxuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IHsgcGFyYW1zOiBwIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0U2VydmVyTW9uaXRvclVybCgpICsgYHRiU2VydmVycy8ke3BhcmFtcy5pbnN0YW5jZUtleX1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxUQlNlcnZlckluZm9bXT4odXJsLCBodHRwT3B0aW9ucykucGlwZShjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRUQkluZm9zTG9ncycsIGZhbHNlKSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==