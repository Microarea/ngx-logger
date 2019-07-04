import { __spread } from 'tslib';
import { Injectable, Inject, NgModule, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { StompRService, StompState } from '@stomp/ng2-stompjs';
import { NotificationService, NotificationModule } from '@progress/kendo-angular-notification';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var EntriesParams = /** @class */ (function () {
    function EntriesParams() {
    }
    return EntriesParams;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MonitorParams = /** @class */ (function () {
    function MonitorParams() {
    }
    return MonitorParams;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var OperationResult = /** @class */ (function () {
    function OperationResult() {
    }
    return OperationResult;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoggerOperationResult = /** @class */ (function () {
    function LoggerOperationResult() {
    }
    return LoggerOperationResult;
}());
var TBServerInfos = /** @class */ (function () {
    function TBServerInfos() {
    }
    return TBServerInfos;
}());
var TBServerInfo = /** @class */ (function () {
    function TBServerInfo() {
    }
    return TBServerInfo;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Log = /** @class */ (function () {
    function Log() {
    }
    return Log;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var LogStatus = {
    Info: 0,
    Debug: 1,
    Warn: 2,
    Error: 3,
    Fatal: 4,
};
LogStatus[LogStatus.Info] = 'Info';
LogStatus[LogStatus.Debug] = 'Debug';
LogStatus[LogStatus.Warn] = 'Warn';
LogStatus[LogStatus.Error] = 'Error';
LogStatus[LogStatus.Fatal] = 'Fatal';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        console.log.apply(console, __spread([message], optionalParams));
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
        console.log.apply(console, __spread([message], optionalParams));
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
        console.warn.apply(console, __spread([message], optionalParams));
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
        console.error.apply(console, __spread([message], optionalParams));
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
                },] },
    ];
    /** @nocollapse */
    TbLoggerService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['env',] }] },
        { type: HttpClient },
        { type: StompRService }
    ]; };
    /** @nocollapse */ TbLoggerService.ngInjectableDef = defineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(inject("env"), inject(HttpClient), inject(StompRService)); }, token: TbLoggerService, providedIn: "root" });
    return TbLoggerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TbNotificationService = /** @class */ (function () {
    function TbNotificationService(notificationService) {
        this.notificationService = notificationService;
    }
    /**
     * @param {?} msg
     * @param {?=} style
     * @return {?}
     */
    TbNotificationService.prototype.show = /**
     * @param {?} msg
     * @param {?=} style
     * @return {?}
     */
    function (msg, style) {
        if (style === void 0) { style = 'none'; }
        this.notificationService.show({
            content: msg,
            animation: { type: 'slide', duration: 200 },
            position: { horizontal: 'right', vertical: 'bottom' },
            type: { style: style, icon: true },
            hideAfter: 4000
        });
    };
    TbNotificationService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    TbNotificationService.ctorParameters = function () { return [
        { type: NotificationService }
    ]; };
    /** @nocollapse */ TbNotificationService.ngInjectableDef = defineInjectable({ factory: function TbNotificationService_Factory() { return new TbNotificationService(inject(NotificationService)); }, token: TbNotificationService, providedIn: "root" });
    return TbNotificationService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TbLoggerModule = /** @class */ (function () {
    function TbLoggerModule() {
    }
    /**
     * @return {?}
     */
    TbLoggerModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: TbLoggerModule,
            providers: [StompRService]
        };
    };
    TbLoggerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, NotificationModule, ButtonsModule, InputsModule, DateInputsModule, FormsModule, DropDownsModule],
                    providers: [StompRService]
                },] },
    ];
    return TbLoggerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { EntriesParams, MonitorParams, OperationResult, LoggerOperationResult, TBServerInfos, TBServerInfo, Log, LogStatus, TbLoggerService, TbNotificationService, TbLoggerModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AdGIvbG9nZ2VyL2xpYi9tb2RlbHMvZW50cmllcy5tb2RlbC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL21vbml0b3IubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9vcGVyYXRpb24tcmVzdWx0Lm1vZGVsLnRzIiwibmc6Ly9AdGIvbG9nZ2VyL2xpYi9tb2RlbHMvbG9nZ2VyLW9wZXJhdGlvbi1yZXN1bHQubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9sb2cubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9sb2ctc3RhdHVzLmVudW0udHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIiwibmc6Ly9AdGIvbG9nZ2VyL2xpYi9zZXJ2aWNlcy9ub3RpZmljYXRpb24uc2VydmljZS50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvdGItbG9nZ2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRW50cmllc1BhcmFtcyB7XHJcbiAgICBpbnN0YW5jZUtleTogc3RyaW5nO1xyXG4gICAgc3Vic2NyaXB0aW9uS2V5OiBzdHJpbmc7XHJcbiAgICBhcHBzOiBzdHJpbmc7XHJcbiAgICBhcHBUeXBlczogc3RyaW5nO1xyXG4gICAgY2F0ZWdvcnk6IHN0cmluZztcclxuICAgIGhvd01hbnk6IHN0cmluZztcclxuICAgIG9mZlNldDogc3RyaW5nO1xyXG4gICAgbGV2ZWxzOiBzdHJpbmc7XHJcbiAgICB0ZXh0VG9GaW5kOiBzdHJpbmc7XHJcbiAgICB1c2VIaXN0b3J5OiBzdHJpbmc7XHJcbiAgICBhY2NvdW50TmFtZTogc3RyaW5nO1xyXG4gICAgcmFuZ2VEYXRlU3RhcnQ6IHN0cmluZztcclxuICAgIHJhbmdlRGF0ZUVuZDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTW9uaXRvclBhcmFtcyB7XHJcbiAgICBhY2NvdW50TmFtZTogc3RyaW5nO1xyXG4gICAgaW5zdGFuY2VLZXk6IHN0cmluZztcclxuICAgIHByb2Nlc3NOYW1lOiBzdHJpbmc7XHJcbiAgICBtaW51dGVzOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBPcGVyYXRpb25SZXN1bHQge1xyXG4gICAgUmVzdWx0OiBib29sZWFuO1xyXG4gICAgTWVzc2FnZT86IHN0cmluZztcclxuICAgIENvZGU/OiBudW1iZXI7XHJcbiAgICBDb250ZW50PzogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0IHtcclxuICAgIHJlc3VsdDogYm9vbGVhbjtcclxuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgICBjb2RlPzogbnVtYmVyO1xyXG4gICAgY29udGVudD86IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUQlNlcnZlckluZm9zIHtcclxuICAgIHRyZWFkOiBUQlNlcnZlckluZm9bXTtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRCU2VydmVySW5mbyB7XHJcbiAgICBEYXRlVGltZTogc3RyaW5nO1xyXG4gICAgUHJvY2Vzc05hbWU6IHN0cmluZztcclxuICAgIExvZ2luTnVtYmVyPzogbnVtYmVyO1xyXG4gICAgRG9jdW1lbnROdW1iZXI/OiBudW1iZXI7XHJcblxyXG4gICAgRG9jTWV0cmljcz86IGFueVtdO1xyXG4gICAgTGVybmVsTVM/OiBudW1iZXI7XHJcbiAgICBMb2dpbkluZm9zPzogYW55W107XHJcbiAgICBQaGlzaWNhbE1lbW9yeT86IG51bWJlcjtcclxuICAgIFVzZXJNUz86IG51bWJlcjtcclxuICAgIFZpcnR1YWxNZW1vcnk/OiBudW1iZXI7XHJcblxyXG4gICAgdGhyZWFkcz86IGFueVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTG9nIHtcclxuICAgIF9pZDogc3RyaW5nO1xyXG4gICAgbG9nRW50cnk6IHtcclxuICAgICAgICBhcHA6IHN0cmluZzsgLy8gRVJQLCBQQUksIE1EQywgVEJGXHJcbiAgICAgICAgcmVnaXN0ZXJlZEFwcElkOiBzdHJpbmc7IC8vIGluc3RhbmNlIGtleVxyXG4gICAgICAgIHJlZ2lzdGVyZWRBcHBUeXBlOiBzdHJpbmc7IC8vIFRCTE9BREVSLCBORVRDT1JFLCBORywgUFJPVklTSU9OSU5HXHJcbiAgICAgICAgY2F0ZWdvcnk6IHN0cmluZzsgLy9cclxuICAgICAgICBtb2R1bGU6IHN0cmluZztcclxuICAgICAgICBzdWJNb2R1bGU6IHN0cmluZztcclxuICAgICAgICBkb2N1bWVudDogc3RyaW5nO1xyXG4gICAgICAgIHN1YnNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgICAgIGFjY291bnROYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgbGlmZXRpbWU6IHN0cmluZztcclxuICAgICAgICBvcGVyYXRpb246IHN0cmluZztcclxuICAgICAgICBjb250ZXh0RGVzY3JpcHRpb246IHN0cmluZztcclxuICAgICAgICBtZXRob2Q6IHN0cmluZztcclxuICAgICAgICBlbnRyeUNyZWF0ZWQ6IHN0cmluZztcclxuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICAgICAgbGV2ZWw6IG51bWJlcjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiIsImV4cG9ydCBlbnVtIExvZ1N0YXR1cyB7XHJcbiAgICBJbmZvID0gMCxcclxuICAgIERlYnVnID0gMSxcclxuICAgIFdhcm4gPSAyLFxyXG4gICAgRXJyb3IgPSAzLFxyXG4gICAgRmF0YWwgPSA0XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBFbnRyaWVzUGFyYW1zIH0gZnJvbSAnLi4vbW9kZWxzL2VudHJpZXMubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2dnZXJPcGVyYXRpb25SZXN1bHQsIFRCU2VydmVySW5mbyB9IGZyb20gJy4uL21vZGVscy9sb2dnZXItb3BlcmF0aW9uLXJlc3VsdC5tb2RlbCc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHRhcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFN0b21wUlNlcnZpY2UsIFN0b21wQ29uZmlnLCBTdG9tcFN0YXRlIH0gZnJvbSAnQHN0b21wL25nMi1zdG9tcGpzJztcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BzdG9tcC9zdG9tcGpzJztcclxuaW1wb3J0IHsgTW9uaXRvclBhcmFtcyB9IGZyb20gJy4uL21vZGVscy9tb25pdG9yLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGJMb2dnZXJTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBsb2dnZXJVcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZXJ2ZXJNb25pdG9yVXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGhvd01hbnkgPSAxMDA7XHJcblxyXG4gICAgcHVibGljIG1xQ29ubmVjdGlvblN0YXRlOiBTdG9tcFN0YXRlID0gU3RvbXBTdGF0ZS5DTE9TRUQ7XHJcbiAgICBwdWJsaWMgbXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlOiBCZWhhdmlvclN1YmplY3Q8U3RvbXBTdGF0ZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFN0b21wU3RhdGUuQ0xPU0VEKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdlbnYnKSBwcml2YXRlIGVudiwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwdWJsaWMgc3RvbXBTZXJ2aWNlOiBTdG9tcFJTZXJ2aWNlKSB7XHJcbiAgICAgICAgaWYgKGVudi5zdG9tcENvbmZpZykgdGhpcy5tcUluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtcUluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW52LnN0b21wQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvbXBTZXJ2aWNlLmNvbmZpZyA9IHRoaXMuZW52LnN0b21wQ29uZmlnO1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5pbml0QW5kQ29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5zdGF0ZS5zdWJzY3JpYmUoKHN0YXR1czogU3RvbXBTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tcUNvbm5lY3Rpb25TdGF0ZSA9IHN0YXR1cztcclxuICAgICAgICAgICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlLm5leHQoc3RhdHVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUml0b3JuYSBsYSBiYXNlIHVybCBkZWwgbG9nZ2VyLFxyXG4gICAgICogY2FyaWNhdGEgZGEgdW4gZmlsZSBkaSBjb25maWd1cmF6aW9uZSBjYXJpY2F0byBkaW5hbWljYW1lbnRlIChhc3NldHMvZW52aXJvbm1lbnQuanNvbilcclxuICAgICAqL1xyXG4gICAgZ2V0TG9nZ2VyVXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2dlclVybCA/IHRoaXMubG9nZ2VyVXJsIDogdGhpcy5lbnYubG9nZ2VyLnVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE00IEJhY2tlbmQgVVJMXHJcbiAgICAgKi9cclxuICAgIGdldFNlcnZlck1vbml0b3JVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyTW9uaXRvclVybCA/IHRoaXMuc2VydmVyTW9uaXRvclVybCA6IHRoaXMuZW52LnNlcnZlck1vbml0b3IudXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS5sb2cgaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBsb2cobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS5sb2cgaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBkZWJ1ZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLndhcm4gaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICB3YXJuKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLmVycm9yIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZXJyb3IobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gbG9nczogTG9nZ2VyT3BlcmF0aW9uUmVzdWx0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhcmFtczogRW50cmllc1BhcmFtc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TG9ncyhwYXJhbXM6IEVudHJpZXNQYXJhbXMpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIXBhcmFtcy5pbnN0YW5jZUtleSkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IucmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSAnRXJyb3IgLSBObyBpbnN0YW5jZUtleSwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcy5nZXRMb2dnZXJVcmwoKScsIHRoaXMuZ2V0TG9nZ2VyVXJsKCkpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgZW50cmllcy8ke3BhcmFtcy5pbnN0YW5jZUtleX1gO1xyXG5cclxuICAgICAgICBsZXQgcCA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICAgICAgcCA9IHAuYXBwZW5kKCdob3dNYW55JywgJycgKyB0aGlzLmhvd01hbnkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYWNjb3VudE5hbWUpIHAgPSBwLmFwcGVuZCgnYWNjb3VudE5hbWUnLCBwYXJhbXMuYWNjb3VudE5hbWUpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuc3Vic2NyaXB0aW9uS2V5KSBwID0gcC5hcHBlbmQoJ3N1YnNjcmlwdGlvbicsIHBhcmFtcy5zdWJzY3JpcHRpb25LZXkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuY2F0ZWdvcnkpIHAgPSBwLmFwcGVuZCgnY2F0ZWdvcmllcycsIHBhcmFtcy5jYXRlZ29yeSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcHBzKSBwID0gcC5hcHBlbmQoJ2FwcHMnLCBwYXJhbXMuYXBwcyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcHBUeXBlcykgcCA9IHAuYXBwZW5kKCdhcHBUeXBlcycsIHBhcmFtcy5hcHBUeXBlcyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5sZXZlbHMpIHAgPSBwLmFwcGVuZCgnbGV2ZWxzJywgcGFyYW1zLmxldmVscyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5yYW5nZURhdGVTdGFydCAmJiBwYXJhbXMucmFuZ2VEYXRlRW5kKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMucmFuZ2VEYXRlU3RhcnQgPT09IHBhcmFtcy5yYW5nZURhdGVFbmQpIHAgPSBwLmFwcGVuZCgnZGF0ZScsIHBhcmFtcy5yYW5nZURhdGVTdGFydCk7XHJcbiAgICAgICAgICAgIGVsc2UgcCA9IHAuYXBwZW5kKCdkYXRlJywgcGFyYW1zLnJhbmdlRGF0ZVN0YXJ0ICsgJzsnICsgcGFyYW1zLnJhbmdlRGF0ZUVuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCwgaHR0cE9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldExvZ3MnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRMb2dzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFwcHMoYXBwSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLnJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFwcFR5cGVzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5yZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9ICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcFR5cGVzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbnN0YW5jZUtleSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcElkc2A7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2codXJsLCAnVGJMb2dnZXJTZXJ2aWNlLmdldEluc3RhbmNlS2V5IHdpdGggYXBwSWQ6ICcsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEluc3RhbmNlS2V5JywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMZWdnZSB0dXR0ZSBsZSBzdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFN1YnNjcmlwdGlvbktleSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYHN1YnNjcmlwdGlvbktleXNgO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0U3Vic2NyaXB0aW9uS2V5OiAnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRTdWJzY3JpcHRpb25LZXknLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2F0ZWdvcmllcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFhcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IucmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBjYXRlZ29yaWVzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldENhdGVnb3JpZXMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldENhdGVnb3JpZXMnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBIdHRwIG9wZXJhdGlvbiB0aGF0IGZhaWxlZC5cclxuICAgICAqIExldCB0aGUgYXBwIGNvbnRpbnVlLlxyXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiAtIG5hbWUgb2YgdGhlIG9wZXJhdGlvbiB0aGF0IGZhaWxlZFxyXG4gICAgICogQHBhcmFtIHJlc3VsdCAtIG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBhcyB0aGUgb2JzZXJ2YWJsZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUVycm9yPFQ+KG9wZXJhdGlvbiA9ICdvcGVyYXRpb24nLCByZXN1bHQ/OiBUKSB7XHJcbiAgICAgICAgcmV0dXJuIChlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxUPiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7b3BlcmF0aW9ufSBmYWlsZWQ6ICR7ZXJyb3IuZXJyb3J9YCk7XHJcblxyXG4gICAgICAgICAgICAvLyBMZXQgdGhlIGFwcCBrZWVwIHJ1bm5pbmcgYnkgcmV0dXJuaW5nIGFuIGVtcHR5IHJlc3VsdC5cclxuICAgICAgICAgICAgcmV0dXJuIG9mKHJlc3VsdCBhcyBUKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVzc2lvbmUgYSBSYWJiaXRNUVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXFDb25uZWN0KHF1ZXVlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLnN1YnNjcmliZShxdWV1ZU5hbWUpLnBpcGUobWFwKChtc2c6IE1lc3NhZ2UpID0+IEpTT04ucGFyc2UobXNnLmJvZHkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1xQ29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBtcURpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBQQVJURSBUQlNFUlZFUk1PTklUT1JcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHB1YmxpYyBnZXRUQkluZm9zTG9ncyhwYXJhbXM6IE1vbml0b3JQYXJhbXMpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBUQlNlcnZlckluZm9bXT4ge1xyXG4gICAgICAgIGxldCBwID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5hY2NvdW50TmFtZSkgcCA9IHAuYXBwZW5kKCdhY2NvdW50TmFtZScsICcnICsgcGFyYW1zLmFjY291bnROYW1lKTtcclxuICAgICAgICBpZiAocGFyYW1zLnByb2Nlc3NOYW1lKSBwID0gcC5hcHBlbmQoJ3Byb2Nlc3NOYW1lJywgJycgKyBwYXJhbXMucHJvY2Vzc05hbWUpO1xyXG4gICAgICAgIGlmIChwYXJhbXMubWludXRlcykgcCA9IHAuYXBwZW5kKCdtaW51dGUnLCAnJyArIHBhcmFtcy5taW51dGVzKTtcclxuXHJcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7IHBhcmFtczogcCB9O1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldFNlcnZlck1vbml0b3JVcmwoKSArIGB0YlNlcnZlcnMvJHtwYXJhbXMuaW5zdGFuY2VLZXl9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8VEJTZXJ2ZXJJbmZvW10+KHVybCwgaHR0cE9wdGlvbnMpLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0VEJJbmZvc0xvZ3MnLCBmYWxzZSkpKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1ub3RpZmljYXRpb24nO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYk5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7fVxyXG5cclxuICAgIHB1YmxpYyBzaG93KG1zZywgc3R5bGU6IGFueSA9ICdub25lJyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93KHtcclxuICAgICAgICAgICAgY29udGVudDogbXNnLFxyXG4gICAgICAgICAgICBhbmltYXRpb246IHsgdHlwZTogJ3NsaWRlJywgZHVyYXRpb246IDIwMCB9LFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogeyBob3Jpem9udGFsOiAncmlnaHQnLCB2ZXJ0aWNhbDogJ2JvdHRvbScgfSxcclxuICAgICAgICAgICAgdHlwZTogeyBzdHlsZTogc3R5bGUsIGljb246IHRydWUgfSxcclxuICAgICAgICAgICAgaGlkZUFmdGVyOiA0MDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEJ1dHRvbnNNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1idXR0b25zJztcclxuaW1wb3J0IHsgRHJvcERvd25zTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItZHJvcGRvd25zJztcclxuaW1wb3J0IHsgSW5wdXRzTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItaW5wdXRzJztcclxuaW1wb3J0IHsgRGF0ZUlucHV0c01vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLWRhdGVpbnB1dHMnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1ub3RpZmljYXRpb24nO1xyXG5cclxuaW1wb3J0IHsgU3RvbXBSU2VydmljZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm90aWZpY2F0aW9uTW9kdWxlLCBCdXR0b25zTW9kdWxlLCBJbnB1dHNNb2R1bGUsIERhdGVJbnB1dHNNb2R1bGUsIEZvcm1zTW9kdWxlLCBEcm9wRG93bnNNb2R1bGVdLFxyXG4gICAgcHJvdmlkZXJzOiBbU3RvbXBSU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyTW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBUYkxvZ2dlck1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbU3RvbXBSU2VydmljZV1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQWVJO0tBQWdCO0lBQ3BCLG9CQUFDO0NBQUE7Ozs7OztBQ2hCRDtJQU1JO0tBQWdCO0lBQ3BCLG9CQUFDO0NBQUE7Ozs7OztBQ1BEO0lBTUk7S0FBZ0I7SUFDcEIsc0JBQUM7Q0FBQTs7Ozs7O0FDUEQ7SUFNSTtLQUFnQjtJQUNwQiw0QkFBQztDQUFBLElBQUE7O0lBSUc7S0FBZ0I7SUFDcEIsb0JBQUM7Q0FBQSxJQUFBOztJQWlCRztLQUFnQjtJQUNwQixtQkFBQztDQUFBOzs7Ozs7QUM5QkQ7SUFxQkk7S0FBZ0I7SUFDcEIsVUFBQztDQUFBOzs7Ozs7OztJQ3JCRyxPQUFRO0lBQ1IsUUFBUztJQUNULE9BQVE7SUFDUixRQUFTO0lBQ1QsUUFBUzs7Ozs7Ozs7Ozs7OztJQ2lCVCx5QkFBbUMsR0FBRyxF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