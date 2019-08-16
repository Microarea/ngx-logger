(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@progress/kendo-angular-buttons'), require('@progress/kendo-angular-dropdowns'), require('@progress/kendo-angular-inputs'), require('@progress/kendo-angular-dateinputs'), require('@progress/kendo-angular-notification'), require('@stomp/ng2-stompjs')) :
    typeof define === 'function' && define.amd ? define('@tb/logger', ['exports', '@angular/common/http', 'rxjs', 'rxjs/operators', '@angular/core', '@angular/common', '@angular/forms', '@progress/kendo-angular-buttons', '@progress/kendo-angular-dropdowns', '@progress/kendo-angular-inputs', '@progress/kendo-angular-dateinputs', '@progress/kendo-angular-notification', '@stomp/ng2-stompjs'], factory) :
    (factory((global.tb = global.tb || {}, global.tb.logger = {}),global.ng.common.http,global.rxjs,global.rxjs.operators,global.ng.core,global.ng.common,global.ng.forms,global.kendoAngularButtons,global.kendoAngularDropdowns,global.kendoAngularInputs,global.kendoAngularDateinputs,global.i1$1,global.i2));
}(this, (function (exports,i1,rxjs,operators,i0,common,forms,kendoAngularButtons,kendoAngularDropdowns,kendoAngularInputs,kendoAngularDateinputs,i1$1,i2) { 'use strict';

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
    /** @type {?} */
    var loggerInstance;
    /** @type {?} */
    var logger = ( /**
     * @return {?}
     */function () { return loggerInstance; });
    /** @enum {number} */
    var LogLevel = {
        Trace: 0,
        Debug: 1,
        Warn: 2,
        Error: 3,
    };
    LogLevel[LogLevel.Trace] = 'Trace';
    LogLevel[LogLevel.Debug] = 'Debug';
    LogLevel[LogLevel.Warn] = 'Warn';
    LogLevel[LogLevel.Error] = 'Error';
    /**
     * @param {?} message
     * @param {?=} logLevel
     * @return {?}
     */
    function prepareLog(message, logLevel) {
        if (logLevel === void 0) {
            logLevel = LogLevel.Debug;
        }
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
            this.mqConnectionState = i2.StompState.CLOSED;
            this.mqConnectionStateObservable = new rxjs.BehaviorSubject(i2.StompState.CLOSED);
            this._shouldLog = ( /**
             * @param {?} logLevel
             * @return {?}
             */function (logLevel) { return logLevel >= _this.env.logger.level; });
            this._serverLog = ( /**
             * @param {?} logLevel
             * @param {?} message
             * @return {?}
             */function (logLevel, message) {
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
                    error.Result = false;
                    error.Message = 'Error - No appId, no party';
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
                    error.Result = false;
                    error.Message = 'Error - No appId, no party';
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
                    error.Result = false;
                    error.Message = 'Error - No appId, no party';
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
                    },] }
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
                    },] }
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
                    },] }
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
    exports.prepareLog = prepareLog;
    exports.logger = logger;
    exports.LogLevel = LogLevel;
    exports.TbLoggerService = TbLoggerService;
    exports.TbNotificationService = TbNotificationService;
    exports.TbLoggerModule = TbLoggerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=tb-logger.umd.js.map