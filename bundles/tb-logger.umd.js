(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs/operators'), require('rxjs'), require('@stomp/ng2-stompjs'), require('@progress/kendo-angular-notification'), require('@angular/common'), require('@angular/forms'), require('@progress/kendo-angular-buttons'), require('@progress/kendo-angular-dropdowns'), require('@progress/kendo-angular-inputs'), require('@progress/kendo-angular-dateinputs')) :
    typeof define === 'function' && define.amd ? define('@tb/logger', ['exports', '@angular/core', '@angular/common/http', 'rxjs/operators', 'rxjs', '@stomp/ng2-stompjs', '@progress/kendo-angular-notification', '@angular/common', '@angular/forms', '@progress/kendo-angular-buttons', '@progress/kendo-angular-dropdowns', '@progress/kendo-angular-inputs', '@progress/kendo-angular-dateinputs'], factory) :
    (factory((global.tb = global.tb || {}, global.tb.logger = {}),global.ng.core,global.ng.common.http,global.rxjs.operators,global.rxjs,null,null,global.ng.common,global.ng.forms,null,null,null,null));
}(this, (function (exports,i0,i1,operators,rxjs,i2,i1$1,common,forms,kendoAngularButtons,kendoAngularDropdowns,kendoAngularInputs,kendoAngularDateinputs) { 'use strict';

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

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
            this.mqConnectionState = i2.StompState.CLOSED;
            this.mqConnectionStateObservable = new rxjs.BehaviorSubject(i2.StompState.CLOSED);
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
                    this.stompService.state.subscribe(( /**
                     * @param {?} status
                     * @return {?}
                     */function (status) {
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
                    return rxjs.of(error);
                }
                // console.log('this.getLoggerUrl()', this.getLoggerUrl());
                /** @type {?} */
                var url = this.getLoggerUrl() + ("entries/" + params.instanceKey);
                /** @type {?} */
                var p = new i1.HttpParams();
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
                operators.catchError(this.handleError('TbLoggerService.getLogs', false)));
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
                    return rxjs.of(error);
                }
                /** @type {?} */
                var url = this.getLoggerUrl() + ("apps/" + appId);
                return this.http.get(url).pipe(
                // tap(op => console.log('TbLoggerService.getApps with appId: ', appId, op)),
                operators.catchError(this.handleError('TbLoggerService.getApps', false)));
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
                    return rxjs.of(error);
                }
                /** @type {?} */
                var url = this.getLoggerUrl() + ("appTypes/" + appId);
                return this.http.get(url).pipe(
                // tap(op => console.log('TbLoggerService.getAppTypes with appId: ', appId, op)),
                operators.catchError(this.handleError('TbLoggerService.getAppTypes', false)));
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
                operators.catchError(this.handleError('TbLoggerService.getInstanceKey', false)));
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
                operators.catchError(this.handleError('TbLoggerService.getSubscriptionKey', false)));
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
                    return rxjs.of(error);
                }
                /** @type {?} */
                var url = this.getLoggerUrl() + ("categories/" + appId);
                return this.http.get(url).pipe(
                // tap(op => console.log('TbLoggerService.getCategories with appId: ', appId, op)),
                operators.catchError(this.handleError('TbLoggerService.getCategories', false)));
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
                if (operation === void 0) {
                    operation = 'operation';
                }
                return ( /**
                 * @param {?} error
                 * @return {?}
                 */function (error) {
                    console.error(operation + " failed: " + error.error);
                    // Let the app keep running by returning an empty result.
                    return rxjs.of(( /** @type {?} */(result)));
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
                return this.stompService.subscribe(queueName).pipe(operators.map(( /**
                 * @param {?} msg
                 * @return {?}
                 */function (msg) { return JSON.parse(msg.body); })));
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
                var p = new i1.HttpParams();
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
                return this.http.get(url, httpOptions).pipe(operators.catchError(this.handleError('TbLoggerService.getTBInfosLogs', false)));
            };
        TbLoggerService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        TbLoggerService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Inject, args: ['env',] }] },
                { type: i1.HttpClient },
                { type: i2.StompRService }
            ];
        };
        /** @nocollapse */ TbLoggerService.ngInjectableDef = i0.defineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(i0.inject("env"), i0.inject(i1.HttpClient), i0.inject(i2.StompRService)); }, token: TbLoggerService, providedIn: "root" });
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
                if (style === void 0) {
                    style = 'none';
                }
                this.notificationService.show({
                    content: msg,
                    animation: { type: 'slide', duration: 200 },
                    position: { horizontal: 'right', vertical: 'bottom' },
                    type: { style: style, icon: true },
                    hideAfter: 4000
                });
            };
        TbNotificationService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        TbNotificationService.ctorParameters = function () {
            return [
                { type: i1$1.NotificationService }
            ];
        };
        /** @nocollapse */ TbNotificationService.ngInjectableDef = i0.defineInjectable({ factory: function TbNotificationService_Factory() { return new TbNotificationService(i0.inject(i1$1.NotificationService)); }, token: TbNotificationService, providedIn: "root" });
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
                    providers: [i2.StompRService]
                };
            };
        TbLoggerModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [common.CommonModule, i1$1.NotificationModule, kendoAngularButtons.ButtonsModule, kendoAngularInputs.InputsModule, kendoAngularDateinputs.DateInputsModule, forms.FormsModule, kendoAngularDropdowns.DropDownsModule],
                        providers: [i2.StompRService]
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

    exports.EntriesParams = EntriesParams;
    exports.MonitorParams = MonitorParams;
    exports.OperationResult = OperationResult;
    exports.LoggerOperationResult = LoggerOperationResult;
    exports.TBServerInfos = TBServerInfos;
    exports.TBServerInfo = TBServerInfo;
    exports.Log = Log;
    exports.LogStatus = LogStatus;
    exports.TbLoggerService = TbLoggerService;
    exports.TbNotificationService = TbNotificationService;
    exports.TbLoggerModule = TbLoggerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL2VudHJpZXMubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9tb25pdG9yLm1vZGVsLnRzIiwibmc6Ly9AdGIvbG9nZ2VyL2xpYi9tb2RlbHMvb3BlcmF0aW9uLXJlc3VsdC5tb2RlbC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL2xvZ2dlci1vcGVyYXRpb24tcmVzdWx0Lm1vZGVsLnRzIiwibmc6Ly9AdGIvbG9nZ2VyL2xpYi9tb2RlbHMvbG9nLm1vZGVsLnRzIiwibmc6Ly9AdGIvbG9nZ2VyL2xpYi9tb2RlbHMvbG9nLXN0YXR1cy5lbnVtLnRzIixudWxsLCJuZzovL0B0Yi9sb2dnZXIvbGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIiwibmc6Ly9AdGIvbG9nZ2VyL2xpYi9zZXJ2aWNlcy9ub3RpZmljYXRpb24uc2VydmljZS50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvdGItbG9nZ2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRW50cmllc1BhcmFtcyB7XHJcbiAgICBpbnN0YW5jZUtleTogc3RyaW5nO1xyXG4gICAgc3Vic2NyaXB0aW9uS2V5OiBzdHJpbmc7XHJcbiAgICBhcHBzOiBzdHJpbmc7XHJcbiAgICBhcHBUeXBlczogc3RyaW5nO1xyXG4gICAgY2F0ZWdvcnk6IHN0cmluZztcclxuICAgIGhvd01hbnk6IHN0cmluZztcclxuICAgIG9mZlNldDogc3RyaW5nO1xyXG4gICAgbGV2ZWxzOiBzdHJpbmc7XHJcbiAgICB0ZXh0VG9GaW5kOiBzdHJpbmc7XHJcbiAgICB1c2VIaXN0b3J5OiBzdHJpbmc7XHJcbiAgICBhY2NvdW50TmFtZTogc3RyaW5nO1xyXG4gICAgcmFuZ2VEYXRlU3RhcnQ6IHN0cmluZztcclxuICAgIHJhbmdlRGF0ZUVuZDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTW9uaXRvclBhcmFtcyB7XHJcbiAgICBhY2NvdW50TmFtZTogc3RyaW5nO1xyXG4gICAgaW5zdGFuY2VLZXk6IHN0cmluZztcclxuICAgIHByb2Nlc3NOYW1lOiBzdHJpbmc7XHJcbiAgICBtaW51dGVzOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBPcGVyYXRpb25SZXN1bHQge1xyXG4gICAgUmVzdWx0OiBib29sZWFuO1xyXG4gICAgTWVzc2FnZT86IHN0cmluZztcclxuICAgIENvZGU/OiBudW1iZXI7XHJcbiAgICBDb250ZW50PzogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0IHtcclxuICAgIHJlc3VsdDogYm9vbGVhbjtcclxuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgICBjb2RlPzogbnVtYmVyO1xyXG4gICAgY29udGVudD86IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUQlNlcnZlckluZm9zIHtcclxuICAgIHRyZWFkOiBUQlNlcnZlckluZm9bXTtcclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRCU2VydmVySW5mbyB7XHJcbiAgICBEYXRlVGltZTogc3RyaW5nO1xyXG4gICAgUHJvY2Vzc05hbWU6IHN0cmluZztcclxuICAgIExvZ2luTnVtYmVyPzogbnVtYmVyO1xyXG4gICAgRG9jdW1lbnROdW1iZXI/OiBudW1iZXI7XHJcblxyXG4gICAgRG9jTWV0cmljcz86IGFueVtdO1xyXG4gICAgTGVybmVsTVM/OiBudW1iZXI7XHJcbiAgICBMb2dpbkluZm9zPzogYW55W107XHJcbiAgICBQaGlzaWNhbE1lbW9yeT86IG51bWJlcjtcclxuICAgIFVzZXJNUz86IG51bWJlcjtcclxuICAgIFZpcnR1YWxNZW1vcnk/OiBudW1iZXI7XHJcblxyXG4gICAgdGhyZWFkcz86IGFueVtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTG9nIHtcclxuICAgIF9pZDogc3RyaW5nO1xyXG4gICAgbG9nRW50cnk6IHtcclxuICAgICAgICBhcHA6IHN0cmluZzsgLy8gRVJQLCBQQUksIE1EQywgVEJGXHJcbiAgICAgICAgcmVnaXN0ZXJlZEFwcElkOiBzdHJpbmc7IC8vIGluc3RhbmNlIGtleVxyXG4gICAgICAgIHJlZ2lzdGVyZWRBcHBUeXBlOiBzdHJpbmc7IC8vIFRCTE9BREVSLCBORVRDT1JFLCBORywgUFJPVklTSU9OSU5HXHJcbiAgICAgICAgY2F0ZWdvcnk6IHN0cmluZzsgLy9cclxuICAgICAgICBtb2R1bGU6IHN0cmluZztcclxuICAgICAgICBzdWJNb2R1bGU6IHN0cmluZztcclxuICAgICAgICBkb2N1bWVudDogc3RyaW5nO1xyXG4gICAgICAgIHN1YnNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgICAgIGFjY291bnROYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgbGlmZXRpbWU6IHN0cmluZztcclxuICAgICAgICBvcGVyYXRpb246IHN0cmluZztcclxuICAgICAgICBjb250ZXh0RGVzY3JpcHRpb246IHN0cmluZztcclxuICAgICAgICBtZXRob2Q6IHN0cmluZztcclxuICAgICAgICBlbnRyeUNyZWF0ZWQ6IHN0cmluZztcclxuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICAgICAgbGV2ZWw6IG51bWJlcjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiIsImV4cG9ydCBlbnVtIExvZ1N0YXR1cyB7XHJcbiAgICBJbmZvID0gMCxcclxuICAgIERlYnVnID0gMSxcclxuICAgIFdhcm4gPSAyLFxyXG4gICAgRXJyb3IgPSAzLFxyXG4gICAgRmF0YWwgPSA0XHJcbn1cclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBFbnRyaWVzUGFyYW1zIH0gZnJvbSAnLi4vbW9kZWxzL2VudHJpZXMubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2dnZXJPcGVyYXRpb25SZXN1bHQsIFRCU2VydmVySW5mbyB9IGZyb20gJy4uL21vZGVscy9sb2dnZXItb3BlcmF0aW9uLXJlc3VsdC5tb2RlbCc7XHJcbmltcG9ydCB7IGNhdGNoRXJyb3IsIHRhcCwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFN0b21wUlNlcnZpY2UsIFN0b21wQ29uZmlnLCBTdG9tcFN0YXRlIH0gZnJvbSAnQHN0b21wL25nMi1zdG9tcGpzJztcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ0BzdG9tcC9zdG9tcGpzJztcclxuaW1wb3J0IHsgTW9uaXRvclBhcmFtcyB9IGZyb20gJy4uL21vZGVscy9tb25pdG9yLm1vZGVsJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGJMb2dnZXJTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBsb2dnZXJVcmw6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZXJ2ZXJNb25pdG9yVXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGhvd01hbnkgPSAxMDA7XHJcblxyXG4gICAgcHVibGljIG1xQ29ubmVjdGlvblN0YXRlOiBTdG9tcFN0YXRlID0gU3RvbXBTdGF0ZS5DTE9TRUQ7XHJcbiAgICBwdWJsaWMgbXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlOiBCZWhhdmlvclN1YmplY3Q8U3RvbXBTdGF0ZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFN0b21wU3RhdGUuQ0xPU0VEKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdlbnYnKSBwcml2YXRlIGVudiwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwdWJsaWMgc3RvbXBTZXJ2aWNlOiBTdG9tcFJTZXJ2aWNlKSB7XHJcbiAgICAgICAgaWYgKGVudi5zdG9tcENvbmZpZykgdGhpcy5tcUluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtcUluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW52LnN0b21wQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvbXBTZXJ2aWNlLmNvbmZpZyA9IHRoaXMuZW52LnN0b21wQ29uZmlnO1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5pbml0QW5kQ29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5zdGF0ZS5zdWJzY3JpYmUoKHN0YXR1czogU3RvbXBTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tcUNvbm5lY3Rpb25TdGF0ZSA9IHN0YXR1cztcclxuICAgICAgICAgICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlLm5leHQoc3RhdHVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUml0b3JuYSBsYSBiYXNlIHVybCBkZWwgbG9nZ2VyLFxyXG4gICAgICogY2FyaWNhdGEgZGEgdW4gZmlsZSBkaSBjb25maWd1cmF6aW9uZSBjYXJpY2F0byBkaW5hbWljYW1lbnRlIChhc3NldHMvZW52aXJvbm1lbnQuanNvbilcclxuICAgICAqL1xyXG4gICAgZ2V0TG9nZ2VyVXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2dlclVybCA/IHRoaXMubG9nZ2VyVXJsIDogdGhpcy5lbnYubG9nZ2VyLnVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE00IEJhY2tlbmQgVVJMXHJcbiAgICAgKi9cclxuICAgIGdldFNlcnZlck1vbml0b3JVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyTW9uaXRvclVybCA/IHRoaXMuc2VydmVyTW9uaXRvclVybCA6IHRoaXMuZW52LnNlcnZlck1vbml0b3IudXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS5sb2cgaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBsb2cobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS5sb2cgaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBkZWJ1ZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLndhcm4gaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICB3YXJuKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLmVycm9yIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZXJyb3IobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gbG9nczogTG9nZ2VyT3BlcmF0aW9uUmVzdWx0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhcmFtczogRW50cmllc1BhcmFtc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TG9ncyhwYXJhbXM6IEVudHJpZXNQYXJhbXMpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIXBhcmFtcy5pbnN0YW5jZUtleSkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IucmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSAnRXJyb3IgLSBObyBpbnN0YW5jZUtleSwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcy5nZXRMb2dnZXJVcmwoKScsIHRoaXMuZ2V0TG9nZ2VyVXJsKCkpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgZW50cmllcy8ke3BhcmFtcy5pbnN0YW5jZUtleX1gO1xyXG5cclxuICAgICAgICBsZXQgcCA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICAgICAgcCA9IHAuYXBwZW5kKCdob3dNYW55JywgJycgKyB0aGlzLmhvd01hbnkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYWNjb3VudE5hbWUpIHAgPSBwLmFwcGVuZCgnYWNjb3VudE5hbWUnLCBwYXJhbXMuYWNjb3VudE5hbWUpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuc3Vic2NyaXB0aW9uS2V5KSBwID0gcC5hcHBlbmQoJ3N1YnNjcmlwdGlvbicsIHBhcmFtcy5zdWJzY3JpcHRpb25LZXkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuY2F0ZWdvcnkpIHAgPSBwLmFwcGVuZCgnY2F0ZWdvcmllcycsIHBhcmFtcy5jYXRlZ29yeSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcHBzKSBwID0gcC5hcHBlbmQoJ2FwcHMnLCBwYXJhbXMuYXBwcyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcHBUeXBlcykgcCA9IHAuYXBwZW5kKCdhcHBUeXBlcycsIHBhcmFtcy5hcHBUeXBlcyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5sZXZlbHMpIHAgPSBwLmFwcGVuZCgnbGV2ZWxzJywgcGFyYW1zLmxldmVscyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5yYW5nZURhdGVTdGFydCAmJiBwYXJhbXMucmFuZ2VEYXRlRW5kKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJhbXMucmFuZ2VEYXRlU3RhcnQgPT09IHBhcmFtcy5yYW5nZURhdGVFbmQpIHAgPSBwLmFwcGVuZCgnZGF0ZScsIHBhcmFtcy5yYW5nZURhdGVTdGFydCk7XHJcbiAgICAgICAgICAgIGVsc2UgcCA9IHAuYXBwZW5kKCdkYXRlJywgcGFyYW1zLnJhbmdlRGF0ZVN0YXJ0ICsgJzsnICsgcGFyYW1zLnJhbmdlRGF0ZUVuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCwgaHR0cE9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldExvZ3MnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRMb2dzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFwcHMoYXBwSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLnJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFwcFR5cGVzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5yZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSA9ICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcFR5cGVzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRJbnN0YW5jZUtleSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcElkc2A7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICAvLyB0YXAob3AgPT4gY29uc29sZS5sb2codXJsLCAnVGJMb2dnZXJTZXJ2aWNlLmdldEluc3RhbmNlS2V5IHdpdGggYXBwSWQ6ICcsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEluc3RhbmNlS2V5JywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMZWdnZSB0dXR0ZSBsZSBzdWJzY3JpcHRpb25cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFN1YnNjcmlwdGlvbktleSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYHN1YnNjcmlwdGlvbktleXNgO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgLy8gdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0U3Vic2NyaXB0aW9uS2V5OiAnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRTdWJzY3JpcHRpb25LZXknLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q2F0ZWdvcmllcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFhcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IucmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgPSAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBjYXRlZ29yaWVzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIC8vIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldENhdGVnb3JpZXMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldENhdGVnb3JpZXMnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBIdHRwIG9wZXJhdGlvbiB0aGF0IGZhaWxlZC5cclxuICAgICAqIExldCB0aGUgYXBwIGNvbnRpbnVlLlxyXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiAtIG5hbWUgb2YgdGhlIG9wZXJhdGlvbiB0aGF0IGZhaWxlZFxyXG4gICAgICogQHBhcmFtIHJlc3VsdCAtIG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBhcyB0aGUgb2JzZXJ2YWJsZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUVycm9yPFQ+KG9wZXJhdGlvbiA9ICdvcGVyYXRpb24nLCByZXN1bHQ/OiBUKSB7XHJcbiAgICAgICAgcmV0dXJuIChlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxUPiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7b3BlcmF0aW9ufSBmYWlsZWQ6ICR7ZXJyb3IuZXJyb3J9YCk7XHJcblxyXG4gICAgICAgICAgICAvLyBMZXQgdGhlIGFwcCBrZWVwIHJ1bm5pbmcgYnkgcmV0dXJuaW5nIGFuIGVtcHR5IHJlc3VsdC5cclxuICAgICAgICAgICAgcmV0dXJuIG9mKHJlc3VsdCBhcyBUKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVzc2lvbmUgYSBSYWJiaXRNUVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXFDb25uZWN0KHF1ZXVlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLnN1YnNjcmliZShxdWV1ZU5hbWUpLnBpcGUobWFwKChtc2c6IE1lc3NhZ2UpID0+IEpTT04ucGFyc2UobXNnLmJvZHkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1xQ29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBtcURpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyBQQVJURSBUQlNFUlZFUk1PTklUT1JcclxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIHB1YmxpYyBnZXRUQkluZm9zTG9ncyhwYXJhbXM6IE1vbml0b3JQYXJhbXMpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBUQlNlcnZlckluZm9bXT4ge1xyXG4gICAgICAgIGxldCBwID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5hY2NvdW50TmFtZSkgcCA9IHAuYXBwZW5kKCdhY2NvdW50TmFtZScsICcnICsgcGFyYW1zLmFjY291bnROYW1lKTtcclxuICAgICAgICBpZiAocGFyYW1zLnByb2Nlc3NOYW1lKSBwID0gcC5hcHBlbmQoJ3Byb2Nlc3NOYW1lJywgJycgKyBwYXJhbXMucHJvY2Vzc05hbWUpO1xyXG4gICAgICAgIGlmIChwYXJhbXMubWludXRlcykgcCA9IHAuYXBwZW5kKCdtaW51dGUnLCAnJyArIHBhcmFtcy5taW51dGVzKTtcclxuXHJcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7IHBhcmFtczogcCB9O1xyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldFNlcnZlck1vbml0b3JVcmwoKSArIGB0YlNlcnZlcnMvJHtwYXJhbXMuaW5zdGFuY2VLZXl9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8VEJTZXJ2ZXJJbmZvW10+KHVybCwgaHR0cE9wdGlvbnMpLnBpcGUoY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0VEJJbmZvc0xvZ3MnLCBmYWxzZSkpKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1ub3RpZmljYXRpb24nO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYk5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7fVxyXG5cclxuICAgIHB1YmxpYyBzaG93KG1zZywgc3R5bGU6IGFueSA9ICdub25lJyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93KHtcclxuICAgICAgICAgICAgY29udGVudDogbXNnLFxyXG4gICAgICAgICAgICBhbmltYXRpb246IHsgdHlwZTogJ3NsaWRlJywgZHVyYXRpb246IDIwMCB9LFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogeyBob3Jpem9udGFsOiAncmlnaHQnLCB2ZXJ0aWNhbDogJ2JvdHRvbScgfSxcclxuICAgICAgICAgICAgdHlwZTogeyBzdHlsZTogc3R5bGUsIGljb246IHRydWUgfSxcclxuICAgICAgICAgICAgaGlkZUFmdGVyOiA0MDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEJ1dHRvbnNNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1idXR0b25zJztcclxuaW1wb3J0IHsgRHJvcERvd25zTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItZHJvcGRvd25zJztcclxuaW1wb3J0IHsgSW5wdXRzTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItaW5wdXRzJztcclxuaW1wb3J0IHsgRGF0ZUlucHV0c01vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLWRhdGVpbnB1dHMnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1ub3RpZmljYXRpb24nO1xyXG5cclxuaW1wb3J0IHsgU3RvbXBSU2VydmljZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm90aWZpY2F0aW9uTW9kdWxlLCBCdXR0b25zTW9kdWxlLCBJbnB1dHNNb2R1bGUsIERhdGVJbnB1dHNNb2R1bGUsIEZvcm1zTW9kdWxlLCBEcm9wRG93bnNNb2R1bGVdLFxyXG4gICAgcHJvdmlkZXJzOiBbU3RvbXBSU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyTW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBUYkxvZ2dlck1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbU3RvbXBSU2VydmljZV1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJTdG9tcFN0YXRlIiwiQmVoYXZpb3JTdWJqZWN0Iiwib2YiLCJIdHRwUGFyYW1zIiwiY2F0Y2hFcnJvciIsIm1hcCIsIkluamVjdGFibGUiLCJJbmplY3QiLCJIdHRwQ2xpZW50IiwiU3RvbXBSU2VydmljZSIsIk5vdGlmaWNhdGlvblNlcnZpY2UiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIk5vdGlmaWNhdGlvbk1vZHVsZSIsIkJ1dHRvbnNNb2R1bGUiLCJJbnB1dHNNb2R1bGUiLCJEYXRlSW5wdXRzTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJEcm9wRG93bnNNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQWVJO1NBQWdCO1FBQ3BCLG9CQUFDO0lBQUQsQ0FBQzs7Ozs7O0FDaEJEO1FBTUk7U0FBZ0I7UUFDcEIsb0JBQUM7SUFBRCxD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