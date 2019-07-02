/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoggerOperationResult } from '../models/logger-operation-result.model';
import { catchError, map } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { StompRService, StompState } from '@stomp/ng2-stompjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@stomp/ng2-stompjs";
var TbLoggerService = /** @class */ (function () {
    function TbLoggerService(env, http, stompService) {
        this.env = env;
        this.http = http;
        this.stompService = stompService;
        this.howMany = 100;
        this.mqConnectionState = StompState.CLOSED;
        this.mqConnectionStateObservable = new BehaviorSubject(StompState.CLOSED);
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
     * @param {...?} optionalParams
     * @return {?}
     */
    TbLoggerService.prototype.log = /**
     * Console.log in attesa di post to logger
     *
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.log.apply(console, tslib_1.__spread([message], optionalParams));
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
     * @param {...?} optionalParams
     * @return {?}
     */
    TbLoggerService.prototype.debug = /**
     * Console.log in attesa di post to logger
     *
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.log.apply(console, tslib_1.__spread([message], optionalParams));
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
     * @param {...?} optionalParams
     * @return {?}
     */
    TbLoggerService.prototype.warn = /**
     * Console.warn in attesa di post to logger
     *
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.warn.apply(console, tslib_1.__spread([message], optionalParams));
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
     * @param {...?} optionalParams
     * @return {?}
     */
    TbLoggerService.prototype.error = /**
     * Console.error in attesa di post to logger
     *
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.error.apply(console, tslib_1.__spread([message], optionalParams));
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
            error.result = false;
            error.message = 'Error - No instanceKey, no party';
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
            error.result = false;
            error.message = 'Error - No appId, no party';
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
            error.result = false;
            error.message = 'Error - No appId, no party';
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
            error.result = false;
            error.message = 'Error - No appId, no party';
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
                },] },
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
    TbLoggerService.prototype.env;
    /**
     * @type {?}
     * @private
     */
    TbLoggerService.prototype.http;
    /** @type {?} */
    TbLoggerService.prototype.stompService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUc5RCxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0seUNBQXlDLENBQUM7QUFDOUYsT0FBTyxFQUFFLFVBQVUsRUFBTyxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQWMsRUFBRSxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFlLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7O0FBSTVFO0lBV0kseUJBQW1DLEdBQUcsRUFBVSxJQUFnQixFQUFTLFlBQTJCO1FBQWpFLFFBQUcsR0FBSCxHQUFHLENBQUE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVMsaUJBQVksR0FBWixZQUFZLENBQWU7UUFMNUYsWUFBTyxHQUFHLEdBQUcsQ0FBQztRQUVmLHNCQUFpQixHQUFlLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbEQsZ0NBQTJCLEdBQWdDLElBQUksZUFBZSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUdyRyxJQUFJLEdBQUcsQ0FBQyxXQUFXO1lBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFFRCxnQ0FBTTs7O0lBQU47UUFBQSxpQkFTQztRQVJHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxX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TSxDQUFDLE9BQU87WUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7WUFFMUQsV0FBVyxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTs7WUFFM0IsR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFHLGVBQWEsTUFBTSxDQUFDLFdBQWEsQ0FBQTtRQUUxRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFpQixHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2SSxDQUFDOztnQkF0T0osVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnREFTZ0IsTUFBTSxTQUFDLEtBQUs7Z0JBckJwQixVQUFVO2dCQU1WLGFBQWE7OzswQkFQdEI7Q0FrUEMsQUF2T0QsSUF1T0M7U0FwT1ksZUFBZTs7O0lBQ3hCLG9DQUF5Qjs7SUFDekIsMkNBQWdDOzs7OztJQUNoQyxrQ0FBc0I7O0lBRXRCLDRDQUF5RDs7SUFDekQsc0RBQXlHOzs7OztJQUU3Riw4QkFBMEI7Ozs7O0lBQUUsK0JBQXdCOztJQUFFLHVDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgRW50cmllc1BhcmFtcyB9IGZyb20gJy4uL21vZGVscy9lbnRyaWVzLm1vZGVsJztcclxuaW1wb3J0IHsgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0LCBUQlNlcnZlckluZm8gfSBmcm9tICcuLi9tb2RlbHMvbG9nZ2VyLW9wZXJhdGlvbi1yZXN1bHQubW9kZWwnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCB0YXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTdG9tcFJTZXJ2aWNlLCBTdG9tcENvbmZpZywgU3RvbXBTdGF0ZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAc3RvbXAvc3RvbXBqcyc7XHJcbmltcG9ydCB7IE1vbml0b3JQYXJhbXMgfSBmcm9tICcuLi9tb2RlbHMvbW9uaXRvci5tb2RlbCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyU2VydmljZSB7XHJcbiAgICBwdWJsaWMgbG9nZ2VyVXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc2VydmVyTW9uaXRvclVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBob3dNYW55ID0gMTAwO1xyXG5cclxuICAgIHB1YmxpYyBtcUNvbm5lY3Rpb25TdGF0ZTogU3RvbXBTdGF0ZSA9IFN0b21wU3RhdGUuQ0xPU0VEO1xyXG4gICAgcHVibGljIG1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZTogQmVoYXZpb3JTdWJqZWN0PFN0b21wU3RhdGU+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChTdG9tcFN0YXRlLkNMT1NFRCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgnZW52JykgcHJpdmF0ZSBlbnYsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHVibGljIHN0b21wU2VydmljZTogU3RvbXBSU2VydmljZSkge1xyXG4gICAgICAgIGlmIChlbnYuc3RvbXBDb25maWcpIHRoaXMubXFJbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbXFJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmVudi5zdG9tcENvbmZpZykge1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5jb25maWcgPSB0aGlzLmVudi5zdG9tcENvbmZpZztcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2UuaW5pdEFuZENvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2Uuc3RhdGUuc3Vic2NyaWJlKChzdGF0dXM6IFN0b21wU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGUgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZS5uZXh0KHN0YXR1cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJpdG9ybmEgbGEgYmFzZSB1cmwgZGVsIGxvZ2dlcixcclxuICAgICAqIGNhcmljYXRhIGRhIHVuIGZpbGUgZGkgY29uZmlndXJhemlvbmUgY2FyaWNhdG8gZGluYW1pY2FtZW50ZSAoYXNzZXRzL2Vudmlyb25tZW50Lmpzb24pXHJcbiAgICAgKi9cclxuICAgIGdldExvZ2dlclVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2dnZXJVcmwgPyB0aGlzLmxvZ2dlclVybCA6IHRoaXMuZW52LmxvZ2dlci51cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNNCBCYWNrZW5kIFVSTFxyXG4gICAgICovXHJcbiAgICBnZXRTZXJ2ZXJNb25pdG9yVXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlck1vbml0b3JVcmwgPyB0aGlzLnNlcnZlck1vbml0b3JVcmwgOiB0aGlzLmVudi5zZXJ2ZXJNb25pdG9yLnVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnNvbGUubG9nIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgbG9nKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnNvbGUubG9nIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZGVidWcobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS53YXJuIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgd2FybihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS5lcnJvciBpbiBhdHRlc2EgZGkgcG9zdCB0byBsb2dnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGVycm9yKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGxvZ3M6IExvZ2dlck9wZXJhdGlvblJlc3VsdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbXM6IEVudHJpZXNQYXJhbXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExvZ3MocGFyYW1zOiBFbnRyaWVzUGFyYW1zKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFwYXJhbXMuaW5zdGFuY2VLZXkpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLnJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gJ0Vycm9yIC0gTm8gaW5zdGFuY2VLZXksIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMuZ2V0TG9nZ2VyVXJsKCknLCB0aGlzLmdldExvZ2dlclVybCgpKTtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGVudHJpZXMvJHtwYXJhbXMuaW5zdGFuY2VLZXl9YDtcclxuXHJcbiAgICAgICAgbGV0IHAgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICAgIHAgPSBwLmFwcGVuZCgnaG93TWFueScsICcnICsgdGhpcy5ob3dNYW55KTtcclxuICAgICAgICBpZiAocGFyYW1zLmFjY291bnROYW1lKSBwID0gcC5hcHBlbmQoJ2FjY291bnROYW1lJywgcGFyYW1zLmFjY291bnROYW1lKTtcclxuICAgICAgICBpZiAocGFyYW1zLnN1YnNjcmlwdGlvbktleSkgcCA9IHAuYXBwZW5kKCdzdWJzY3JpcHRpb24nLCBwYXJhbXMuc3Vic2NyaXB0aW9uS2V5KTtcclxuICAgICAgICBpZiAocGFyYW1zLmNhdGVnb3J5KSBwID0gcC5hcHBlbmQoJ2NhdGVnb3JpZXMnLCBwYXJhbXMuY2F0ZWdvcnkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXBwcykgcCA9IHAuYXBwZW5kKCdhcHBzJywgcGFyYW1zLmFwcHMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXBwVHlwZXMpIHAgPSBwLmFwcGVuZCgnYXBwVHlwZXMnLCBwYXJhbXMuYXBwVHlwZXMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMubGV2ZWxzKSBwID0gcC5hcHBlbmQoJ2xldmVscycsIHBhcmFtcy5sZXZlbHMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMucmFuZ2VEYXRlU3RhcnQgJiYgcGFyYW1zLnJhbmdlRGF0ZUVuZCkge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zLnJhbmdlRGF0ZVN0YXJ0ID09PSBwYXJhbXMucmFuZ2VEYXRlRW5kKSBwID0gcC5hcHBlbmQoJ2RhdGUnLCBwYXJhbXMucmFuZ2VEYXRlU3RhcnQpO1xyXG4gICAgICAgICAgICBlbHNlIHAgPSBwLmFwcGVuZCgnZGF0ZScsIHBhcmFtcy5yYW5nZURhdGVTdGFydCArICc7JyArIHBhcmFtcy5yYW5nZURhdGVFbmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgcGFyYW1zOiBwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwsIGh0dHBPcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRMb2dzJywgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0TG9ncycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5yZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9ICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcHMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwcycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBUeXBlcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFhcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IucmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBUeXBlcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwVHlwZXMnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW5zdGFuY2VLZXkoKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBJZHNgO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKHVybCwgJ1RiTG9nZ2VyU2VydmljZS5nZXRJbnN0YW5jZUtleSB3aXRoIGFwcElkOiAnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRJbnN0YW5jZUtleScsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTGVnZ2UgdHV0dGUgbGUgc3Vic2NyaXB0aW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTdWJzY3JpcHRpb25LZXkoKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBzdWJzY3JpcHRpb25LZXlzYDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldFN1YnNjcmlwdGlvbktleTogJywgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0U3Vic2NyaXB0aW9uS2V5JywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENhdGVnb3JpZXMoYXBwSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLnJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgY2F0ZWdvcmllcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRDYXRlZ29yaWVzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRDYXRlZ29yaWVzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgSHR0cCBvcGVyYXRpb24gdGhhdCBmYWlsZWQuXHJcbiAgICAgKiBMZXQgdGhlIGFwcCBjb250aW51ZS5cclxuICAgICAqIEBwYXJhbSBvcGVyYXRpb24gLSBuYW1lIG9mIHRoZSBvcGVyYXRpb24gdGhhdCBmYWlsZWRcclxuICAgICAqIEBwYXJhbSByZXN1bHQgLSBvcHRpb25hbCB2YWx1ZSB0byByZXR1cm4gYXMgdGhlIG9ic2VydmFibGUgcmVzdWx0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYW5kbGVFcnJvcjxUPihvcGVyYXRpb24gPSAnb3BlcmF0aW9uJywgcmVzdWx0PzogVCkge1xyXG4gICAgICAgIHJldHVybiAoZXJyb3I6IGFueSk6IE9ic2VydmFibGU8VD4gPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke29wZXJhdGlvbn0gZmFpbGVkOiAke2Vycm9yLmVycm9yfWApO1xyXG5cclxuICAgICAgICAgICAgLy8gTGV0IHRoZSBhcHAga2VlcCBydW5uaW5nIGJ5IHJldHVybmluZyBhbiBlbXB0eSByZXN1bHQuXHJcbiAgICAgICAgICAgIHJldHVybiBvZihyZXN1bHQgYXMgVCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lc3Npb25lIGEgUmFiYml0TVFcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1xQ29ubmVjdChxdWV1ZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5zdWJzY3JpYmUocXVldWVOYW1lKS5waXBlKG1hcCgobXNnOiBNZXNzYWdlKSA9PiBKU09OLnBhcnNlKG1zZy5ib2R5KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtcUNvbm5lY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9tcFNlcnZpY2UuY29ubmVjdGVkKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbXFEaXNjb25uZWN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8gUEFSVEUgVEJTRVJWRVJNT05JVE9SXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICBwdWJsaWMgZ2V0VEJJbmZvc0xvZ3MocGFyYW1zOiBNb25pdG9yUGFyYW1zKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVEJTZXJ2ZXJJbmZvW10+IHtcclxuICAgICAgICBsZXQgcCA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMucHJvY2Vzc05hbWUpIHAgPSBwLmFwcGVuZCgncHJvY2Vzc05hbWUnLCAnJyArIHBhcmFtcy5wcm9jZXNzTmFtZSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5taW51dGVzKSBwID0gcC5hcHBlbmQoJ21pbnV0ZScsICcnICsgcGFyYW1zLm1pbnV0ZXMpO1xyXG5cclxuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IHsgcGFyYW1zOiBwIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0U2VydmVyTW9uaXRvclVybCgpICsgYHRiU2VydmVycy8ke3BhcmFtcy5pbnN0YW5jZUtleX1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxUQlNlcnZlckluZm9bXT4odXJsLCBodHRwT3B0aW9ucykucGlwZShjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRUQkluZm9zTG9ncycsIGZhbHNlKSkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==