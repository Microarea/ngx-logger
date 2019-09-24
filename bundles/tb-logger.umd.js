(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('@stomp/ng2-stompjs'), require('@progress/kendo-angular-notification'), require('@angular/common'), require('@angular/forms'), require('@progress/kendo-angular-buttons'), require('@progress/kendo-angular-dropdowns'), require('@progress/kendo-angular-inputs'), require('@progress/kendo-angular-dateinputs')) :
    typeof define === 'function' && define.amd ? define('@tb/logger', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators', '@stomp/ng2-stompjs', '@progress/kendo-angular-notification', '@angular/common', '@angular/forms', '@progress/kendo-angular-buttons', '@progress/kendo-angular-dropdowns', '@progress/kendo-angular-inputs', '@progress/kendo-angular-dateinputs'], factory) :
    (global = global || self, factory((global.tb = global.tb || {}, global.tb.logger = {}), global.ng.core, global.ng.common.http, global.rxjs, global.rxjs.operators, global.ng2Stompjs, global.kendoAngularNotification, global.ng.common, global.ng.forms, global.kendoAngularButtons, global.kendoAngularDropdowns, global.kendoAngularInputs, global.kendoAngularDateinputs));
}(this, function (exports, core, http, rxjs, operators, ng2Stompjs, kendoAngularNotification, common, forms, kendoAngularButtons, kendoAngularDropdowns, kendoAngularInputs, kendoAngularDateinputs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var EntriesParams = /** @class */ (function () {
        function EntriesParams(instanceKey) {
            this.instanceKey = instanceKey;
        }
        return EntriesParams;
    }());
    if (false) {
        /** @type {?} */
        EntriesParams.prototype.instanceKey;
        /** @type {?} */
        EntriesParams.prototype.subscriptionKey;
        /** @type {?} */
        EntriesParams.prototype.apps;
        /** @type {?} */
        EntriesParams.prototype.appTypes;
        /** @type {?} */
        EntriesParams.prototype.category;
        /** @type {?} */
        EntriesParams.prototype.howMany;
        /** @type {?} */
        EntriesParams.prototype.offSet;
        /** @type {?} */
        EntriesParams.prototype.levels;
        /** @type {?} */
        EntriesParams.prototype.textToFind;
        /** @type {?} */
        EntriesParams.prototype.useHistory;
        /** @type {?} */
        EntriesParams.prototype.accountName;
        /** @type {?} */
        EntriesParams.prototype.rangeDateStart;
        /** @type {?} */
        EntriesParams.prototype.rangeDateEnd;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MonitorParams = /** @class */ (function () {
        function MonitorParams(instanceKey, accountName, processName) {
            this.minutes = '1';
            this.instanceKey = instanceKey;
            this.accountName = accountName;
            this.processName = processName;
        }
        return MonitorParams;
    }());
    if (false) {
        /** @type {?} */
        MonitorParams.prototype.instanceKey;
        /** @type {?} */
        MonitorParams.prototype.accountName;
        /** @type {?} */
        MonitorParams.prototype.processName;
        /** @type {?} */
        MonitorParams.prototype.minutes;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LoggerOperationResult = /** @class */ (function () {
        function LoggerOperationResult(Result, Message) {
            this.Result = Result;
        }
        return LoggerOperationResult;
    }());
    if (false) {
        /** @type {?} */
        LoggerOperationResult.prototype.Result;
        /** @type {?} */
        LoggerOperationResult.prototype.Message;
        /** @type {?} */
        LoggerOperationResult.prototype.Code;
        /** @type {?} */
        LoggerOperationResult.prototype.Content;
    }
    /**
     * @record
     */
    function TBServerInfos() { }
    if (false) {
        /** @type {?} */
        TBServerInfos.prototype.tread;
    }
    /**
     * @record
     */
    function TBServerInfo() { }
    if (false) {
        /** @type {?} */
        TBServerInfo.prototype.DateTime;
        /** @type {?} */
        TBServerInfo.prototype.ProcessName;
        /** @type {?|undefined} */
        TBServerInfo.prototype.LoginNumber;
        /** @type {?|undefined} */
        TBServerInfo.prototype.DocumentNumber;
        /** @type {?|undefined} */
        TBServerInfo.prototype.DocMetrics;
        /** @type {?|undefined} */
        TBServerInfo.prototype.LernelMS;
        /** @type {?|undefined} */
        TBServerInfo.prototype.LoginInfos;
        /** @type {?|undefined} */
        TBServerInfo.prototype.PhisicalMemory;
        /** @type {?|undefined} */
        TBServerInfo.prototype.UserMS;
        /** @type {?|undefined} */
        TBServerInfo.prototype.VirtualMemory;
        /** @type {?|undefined} */
        TBServerInfo.prototype.threads;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function Log() { }
    if (false) {
        /** @type {?} */
        Log.prototype._id;
        /** @type {?} */
        Log.prototype.LogEntry;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var loggerInstance;
    /** @type {?} */
    var logger = (/**
     * @return {?}
     */
    function () { return loggerInstance; });
    /**
     * @record
     */
    function LogEntry() { }
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
            this.mqConnectionState = ng2Stompjs.StompState.CLOSED;
            this.mqConnectionStateObservable = new rxjs.BehaviorSubject(ng2Stompjs.StompState.CLOSED);
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
                return rxjs.of(error);
            }
            // console.log('this.getLoggerUrl()', this.getLoggerUrl());
            /** @type {?} */
            var url = this.getLoggerUrl() + ("entries/" + params.instanceKey);
            /** @type {?} */
            var p = new http.HttpParams();
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
            operators.catchError(this.handleError('TbLoggerService.getLogs', new LoggerOperationResult(false, 'Error - getLogs'))));
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
                return rxjs.of(error);
            }
            /** @type {?} */
            var url = this.getLoggerUrl() + ("apps/" + appId);
            return this.http.get(url).pipe(
            // tap(op => console.log('TbLoggerService.getApps with appId: ', appId, op)),
            operators.catchError(this.handleError('TbLoggerService.getApps', new LoggerOperationResult(false, 'Error - getApps'))));
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
                return rxjs.of(error);
            }
            /** @type {?} */
            var url = this.getLoggerUrl() + ("appTypes/" + appId);
            return this.http.get(url).pipe(
            // tap(op => console.log('TbLoggerService.getAppTypes with appId: ', appId, op)),
            operators.catchError(this.handleError('TbLoggerService.getAppTypes', new LoggerOperationResult(false, 'Error - getAppTypes'))));
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
            operators.catchError(this.handleError('TbLoggerService.getInstanceKey', new LoggerOperationResult(false, 'Error - getInstanceKey'))));
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
            operators.catchError(this.handleError('TbLoggerService.getSubscriptionKey', new LoggerOperationResult(false, 'Error - getSubscriptionKey'))));
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
                return rxjs.of(error);
            }
            /** @type {?} */
            var url = this.getLoggerUrl() + ("categories/" + appId);
            return this.http.get(url).pipe(
            // tap(op => console.log('TbLoggerService.getCategories with appId: ', appId, op)),
            operators.catchError(this.handleError('TbLoggerService.getCategories', new LoggerOperationResult(false, 'Error -  getCategories'))));
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
                return rxjs.of((/** @type {?} */ (result)));
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
            return this.stompService.subscribe(queueName).pipe(operators.map((/**
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
            var p = new http.HttpParams();
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        TbLoggerService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: ['env',] }] },
            { type: http.HttpClient },
            { type: ng2Stompjs.StompRService }
        ]; };
        /** @nocollapse */ TbLoggerService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(core.ɵɵinject("env"), core.ɵɵinject(http.HttpClient), core.ɵɵinject(ng2Stompjs.StompRService)); }, token: TbLoggerService, providedIn: "root" });
        return TbLoggerService;
    }());
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        TbNotificationService.ctorParameters = function () { return [
            { type: kendoAngularNotification.NotificationService }
        ]; };
        /** @nocollapse */ TbNotificationService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function TbNotificationService_Factory() { return new TbNotificationService(core.ɵɵinject(kendoAngularNotification.NotificationService)); }, token: TbNotificationService, providedIn: "root" });
        return TbNotificationService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TbNotificationService.prototype.notificationService;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                providers: [ng2Stompjs.StompRService]
            };
        };
        TbLoggerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, kendoAngularNotification.NotificationModule, kendoAngularButtons.ButtonsModule, kendoAngularInputs.InputsModule, kendoAngularDateinputs.DateInputsModule, forms.FormsModule, kendoAngularDropdowns.DropDownsModule],
                        providers: [ng2Stompjs.StompRService]
                    },] }
        ];
        return TbLoggerModule;
    }());

    exports.EntriesParams = EntriesParams;
    exports.LogLevel = LogLevel;
    exports.LogStatus = LogStatus;
    exports.LoggerOperationResult = LoggerOperationResult;
    exports.MonitorParams = MonitorParams;
    exports.TbLoggerModule = TbLoggerModule;
    exports.TbLoggerService = TbLoggerService;
    exports.TbNotificationService = TbNotificationService;
    exports.logger = logger;
    exports.prepareLog = prepareLog;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tb-logger.umd.js.map
