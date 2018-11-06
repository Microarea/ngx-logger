(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs/operators'), require('rxjs'), require('@stomp/ng2-stompjs'), require('@progress/kendo-angular-notification'), require('@angular/common'), require('@angular/forms'), require('@progress/kendo-angular-buttons'), require('@progress/kendo-angular-dropdowns'), require('@progress/kendo-angular-inputs'), require('@progress/kendo-angular-dateinputs')) :
    typeof define === 'function' && define.amd ? define('@tb/logger', ['exports', '@angular/core', '@angular/common/http', 'rxjs/operators', 'rxjs', '@stomp/ng2-stompjs', '@progress/kendo-angular-notification', '@angular/common', '@angular/forms', '@progress/kendo-angular-buttons', '@progress/kendo-angular-dropdowns', '@progress/kendo-angular-inputs', '@progress/kendo-angular-dateinputs'], factory) :
    (factory((global.tb = global.tb || {}, global.tb.logger = {}),global.ng.core,global.ng.common.http,global.rxjs.operators,global.rxjs,null,null,global.ng.common,global.ng.forms,null,null,null,null));
}(this, (function (exports,i0,i1,operators,rxjs,i2,i1$1,common,forms,kendoAngularButtons,kendoAngularDropdowns,kendoAngularInputs,kendoAngularDateinputs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var EntriesParams = (function () {
        function EntriesParams() {
        }
        return EntriesParams;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var OperationResult = (function () {
        function OperationResult() {
        }
        return OperationResult;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LoggerOperationResult = (function () {
        function LoggerOperationResult() {
        }
        return LoggerOperationResult;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var Log = (function () {
        function Log() {
        }
        return Log;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TbLoggerService = (function () {
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
                    this.stompService.state.subscribe(function (status) {
                        _this.mqConnectionState = status;
                        _this.mqConnectionStateObservable.next(status);
                    });
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
                if (!params.appId) {
                    /** @type {?} */
                    var error = new LoggerOperationResult();
                    error.Result = false;
                    error.Message = 'Error - No appId, no party';
                    return rxjs.of(error);
                }
                /** @type {?} */
                var url = this.getLoggerUrl() + ("entries/" + params.appId);
                /** @type {?} */
                var p = new i1.HttpParams();
                p = p.append('howMany', '' + this.howMany);
                if (params.apps)
                    p = p.append('apps', params.apps);
                if (params.appTypes)
                    p = p.append('appTypes', params.appTypes);
                /** @type {?} */
                var httpOptions = {
                    params: p
                };
                return this.http.get(url, httpOptions).pipe(operators.tap(function (op) { return console.log('TbLoggerService.getLogs', op); }), operators.catchError(this.handleError('TbLoggerService.getLogs', false)));
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
                return this.http.get(url).pipe(operators.tap(function (op) { return console.log('TbLoggerService.getApps with appId: ', appId, op); }), operators.catchError(this.handleError('TbLoggerService.getApps', false)));
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
                return this.http.get(url).pipe(operators.tap(function (op) { return console.log('TbLoggerService.getAppTypes with appId: ', appId, op); }), operators.catchError(this.handleError('TbLoggerService.getAppTypes', false)));
            };
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
                return function (error) {
                    console.error(operation + " failed: " + error.message);
                    // Let the app keep running by returning an empty result.
                    return rxjs.of(/** @type {?} */ (result));
                };
            };
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
                return this.stompService.subscribe(queueName).pipe(operators.map(function (msg) { return JSON.parse(msg.body); }));
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LoggerViewerComponent = (function () {
        function LoggerViewerComponent(loggerService) {
            this.loggerService = loggerService;
            this.appId = localStorage.getItem('appId') ? localStorage.getItem('appId') : '';
            this.appData = [];
            this.app = localStorage.getItem('app') ? localStorage.getItem('app') : '';
            this.appTypeData = [];
            this.appType = localStorage.getItem('appType') ? localStorage.getItem('appType') : '';
            this.logs = [];
            this.logStatus = LogStatus;
            this.show = false;
            this.loading = false;
            this.howMany = 100;
            this.checked = false;
            this.autoRefresh = false;
            this.message = '';
            this.loggerUrl = localStorage.getItem('loggerUrl') ? localStorage.getItem('loggerUrl') : this.loggerService.getLoggerUrl();
        }
        /**
         * @return {?}
         */
        LoggerViewerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.appListInit();
                this.getLogs();
            };
        /**
         * @return {?}
         */
        LoggerViewerComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () { };
        // leggo tutte le app, gli appId e gli appType e li salvo in rispettivi array
        // verranno poi filtrati dai componenti kendo
        /**
         * @return {?}
         */
        LoggerViewerComponent.prototype.appListInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.appId)
                    return false;
                this.loggerService.getApps(this.appId).subscribe(function (op) {
                    _this.appData = op.Content;
                    _this.appList.loading = false;
                });
                this.loggerService.getAppTypes(this.appId).subscribe(function (op) {
                    _this.appTypeData = op.Content;
                    _this.appTypeList.loading = false;
                });
            };
        /**
         * @return {?}
         */
        LoggerViewerComponent.prototype.getLogs = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.appId) {
                    this.message = 'Instance Key mancante';
                    this.appIdInput.nativeElement.focus();
                    return;
                }
                this.loading = true;
                /** @type {?} */
                var params = new EntriesParams();
                params.appId = this.appId;
                if (this.app)
                    params.apps = this.app;
                if (this.appType)
                    params.appTypes = this.appType;
                this.loggerService.getLogs(params).subscribe(function (op) {
                    if (!op.Result) {
                        _this.message = op.Message;
                        _this.logs = [];
                        _this.loading = false;
                        return false;
                    }
                    _this.message = '';
                    _this.logs = op.Content;
                    _this.loading = false;
                });
            };
        /**
         * @param {?} event
         * @return {?}
         */
        LoggerViewerComponent.prototype.setLoggerUrl = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                localStorage.setItem('loggerUrl', this.loggerUrl);
                this.getLogs();
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        LoggerViewerComponent.prototype.setApp = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                localStorage.setItem('app', this.app);
                this.getLogs();
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        LoggerViewerComponent.prototype.setAppId = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                localStorage.setItem('appId', this.appId);
                this.getLogs();
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        LoggerViewerComponent.prototype.setAppType = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                localStorage.setItem('appType', this.appType);
                this.getLogs();
            };
        /**
         * @return {?}
         */
        LoggerViewerComponent.prototype.close = /**
         * @return {?}
         */
            function () {
                clearInterval(this.autoRefreshInterval);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        LoggerViewerComponent.prototype.checkAutoRefresh = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                var _this = this;
                this.autoRefresh = !this.autoRefresh;
                if (this.autoRefresh) {
                    this.getLogs();
                    this.autoRefreshInterval = setInterval(function () {
                        _this.getLogs();
                    }, 5000);
                }
                else {
                    if (this.autoRefreshInterval) {
                        clearInterval(this.autoRefreshInterval);
                    }
                }
            };
        LoggerViewerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'tb-logger-viewer',
                        template: "<div class=\"header\">\n    <div class=\"row\">\n        <label id=\"logger-url-label\" class=\"h-label\" for=\"logger-url\">Logger URL:</label>\n        <input kendoTextBox id=\"logger-url\" [(ngModel)]=\"loggerUrl\" (blur)=\"setLoggerUrl($event)\" (click)=\"$event.target.select()\" />\n        <span class=\"k-icon k-i-reset \" (click)=\"getLogs()\"></span>\n\n        <div class=\"autorefresh\">\n            <input type=\"checkbox\" id=\"autoRefresh\" class=\"k-checkbox\" [ngModel]=\"checked\" (ngModelChange)=\"checkAutoRefresh($event)\">\n            <label class=\"k-checkbox-label\" for=\"autoRefresh\">Auto refresh (5s)</label>\n        </div>\n    </div>\n    <div class=\"row\">\n\n        <div class=\"filter\">\n            <!-- APP ID -->\n            <label id=\"logger-app-id-label\" class=\"h-label\" for=\"logger-app-id\" (click)=\"appListInit()\">Instance Key:</label>\n            <input kendoTextBox #appIdInput [(ngModel)]=\"appId\" (blur)=\"setAppId($event)\" id=\"ka-app-id\" (click)=\"$event.target.select()\"\n                placeholder=\"e.g. 2d136c61-aac2-442d-926c-a531c3685035\" />\n        </div>\n\n        <div class=\"filter\">\n            <!-- APP -->\n            <label id=\"logger-app-label\" class=\"h-label\" for=\"logger-app\">App:</label>\n            <kendo-autocomplete #appList [data]=\"appData\" [suggest]=\"true\" [placeholder]=\"'e.g. ERP, MDC, TBF'\"\n                [(ngModel)]=\"app\" (valueChange)=\"setApp($event)\" id=\"ka-app\">\n            </kendo-autocomplete>\n        </div>\n\n        <div class=\"filter\">\n            <!-- APP TYPE -->\n            <label id=\"logger-app-type-label\" class=\"h-label\" for=\"logger-app-type\">AppType:</label>\n            <kendo-autocomplete #appTypeList [data]=\"appTypeData\" [suggest]=\"true\" [placeholder]=\"'e.g. TBLOADER, NETCORE, NG'\"\n                [(ngModel)]=\"appType\" (valueChange)=\"setAppType($event)\" id=\"ka-app-type\">\n            </kendo-autocomplete>\n        </div>\n\n    </div>\n    <div class=\"notify\" *ngIf=\"message\">\n        <p>{{message}}</p>\n    </div>\n</div>\n\n<div class=\"monitor\">\n\n    <div class=\"loading\" *ngIf=\"loading\">\n        <span class=\"k-icon k-i-loading\"></span>\n    </div>\n\n    <ul class=\"logs\" *ngIf=\"!loading\">\n        <li *ngIf=\"logs.length == 0\" class=\"no-logs\">No Logs with appId:<strong>{{appId}}</strong></li>\n        <li *ngFor=\"let log of logs\" class=\"log\">\n            <span class=\"l-date\">{{log.LogEntry.EntryCreated | date: 'medium' }} </span> -\n            <span class=\"l-account-name\"> {{log.LogEntry.AccountName }} </span> -\n            <span class=\"l-app\" *ngIf=\"log.LogEntry.App\"> {{log.LogEntry.App }} -</span>\n            <span class=\"l-type\" *ngIf=\"log.LogEntry.RegisteredAppType\"> {{log.LogEntry.RegisteredAppType }} -</span>\n            <span class=\"l-category\" *ngIf=\"log.LogEntry.Category\"> {{log.LogEntry.Category }} -</span>\n            <span class=\"l-status level-{{log.LogEntry.Level}}\">[{{logStatus[log.LogEntry.Level]}}]</span>\n            <span class=\"l-msg\"> {{log.LogEntry.Message}} </span>\n        </li>\n    </ul>\n</div>",
                        styles: [":host(tb-logger-viewer){flex:1;display:flex;flex-direction:column}:host(tb-logger-viewer) .notify{background:#ff0b0b;padding:5px 10px;margin:10px 0;color:#fff}:host(tb-logger-viewer) .notify p{margin:5px 0;font-size:12px}:host(tb-logger-viewer) .header{display:flex;flex-direction:column;margin:30px 0 10px}:host(tb-logger-viewer) .header .row{display:flex;flex-direction:row;align-items:center;margin:5px 0}:host(tb-logger-viewer) .header .row.flex-center{justify-content:center}:host(tb-logger-viewer) .header .row.flex-around{justify-content:space-around}:host(tb-logger-viewer) .header .row.flex-between{justify-content:space-between}:host(tb-logger-viewer) .header .row .filter #ka-app-id{width:330px}:host(tb-logger-viewer) .header label.h-label{font-weight:500;font-size:14px;margin:0 10px}:host(tb-logger-viewer) .header #logger-url{width:500px}:host(tb-logger-viewer) .header .k-checkbox-label{font-size:12px}:host(tb-logger-viewer) .monitor{display:flex;flex:1;background:#f1f1f1;border:1px solid #ccc;padding:0;margin:5px 0}:host(tb-logger-viewer) .monitor .loading{display:flex;justify-content:center;align-items:center;flex:1}:host(tb-logger-viewer) .monitor .loading .k-i-loading{font-size:34px;color:#999}:host(tb-logger-viewer) .k-i-reset{margin-right:10px;color:#0277bd;border:none;padding:5px}:host(tb-logger-viewer) .k-i-reset:hover{cursor:pointer;color:#222}:host(tb-logger-viewer) hr{background:#0277bd;height:1px;border:none}:host(tb-logger-viewer) .logs{margin:0;padding:5px;list-style:none;overflow:auto;flex:1}:host(tb-logger-viewer) .logs .no-logs{font-size:12px}:host(tb-logger-viewer) .logs .no-logs strong{font-weight:500}:host(tb-logger-viewer) .logs .log{font-size:12px;margin:3px 0}:host(tb-logger-viewer) .logs .log .l-date{color:#999}:host(tb-logger-viewer) .logs .log .l-account-name{color:#00f}:host(tb-logger-viewer) .logs .log .l-status{text-transform:uppercase;margin:0 3px}:host(tb-logger-viewer) .logs .log .l-status.level-0{color:#000}:host(tb-logger-viewer) .logs .log .l-status.level-1{color:#00f}:host(tb-logger-viewer) .logs .log .l-status.level-2{color:orange}:host(tb-logger-viewer) .logs .log .l-status.level-3{color:red}:host(tb-logger-viewer) .logs .log .l-status.level-4{color:red}"]
                    },] },
        ];
        /** @nocollapse */
        LoggerViewerComponent.ctorParameters = function () {
            return [
                { type: TbLoggerService }
            ];
        };
        LoggerViewerComponent.propDecorators = {
            appIdInput: [{ type: i0.ViewChild, args: ['appIdInput',] }],
            appList: [{ type: i0.ViewChild, args: ['appList',] }],
            appTypeList: [{ type: i0.ViewChild, args: ['appTypeList',] }]
        };
        return LoggerViewerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TbNotificationService = (function () {
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var RabbitViewerComponent = (function () {
        function RabbitViewerComponent(loggerService, notificationService) {
            this.loggerService = loggerService;
            this.notificationService = notificationService;
            this.stompState = i2.StompState;
            this.logStatus = LogStatus;
            this.mqQueueName = localStorage.getItem('mqQueueName') ? localStorage.getItem('mqQueueName') : '';
            this.mqMessages = [];
        }
        /**
         * @return {?}
         */
        RabbitViewerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.mqConnectionStateSubscription = this.loggerService.mqConnectionStateObservable.subscribe(function (status) {
                    return _this.onChangeMqState(status);
                });
            };
        /**
         * @return {?}
         */
        RabbitViewerComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () { };
        /**
         * @param {?} status
         * @return {?}
         */
        RabbitViewerComponent.prototype.onChangeMqState = /**
         * @param {?} status
         * @return {?}
         */
            function (status) {
                this.mqConnectionState = status;
                if (status === i2.StompState.CONNECTED && this.mqQueueName) {
                    this.mqSubscribe();
                }
            };
        /**
         * @return {?}
         */
        RabbitViewerComponent.prototype.mqSubscribe = /**
         * @return {?}
         */
            function () {
                var _this = this;
                localStorage.setItem('mqQueueName', this.mqQueueName);
                /** @type {?} */
                var queueName = "/queue/" + this.mqQueueName;
                this.mqQueue = this.loggerService.mqConnect(queueName).subscribe(function (msg) { return _this.onMessage(msg); });
            };
        /**
         * @param {?} msg
         * @return {?}
         */
        RabbitViewerComponent.prototype.onMessage = /**
         * @param {?} msg
         * @return {?}
         */
            function (msg) {
                console.log('RabbitViewerComponent.onMessage', msg);
                this.mqMessages.push(msg);
                /** @type {?} */
                var style = 'none';
                if (msg.UPContent) {
                    switch (msg.UPContent.Level) {
                        case LogStatus.Warn:
                            style = 'warning';
                            break;
                        case LogStatus.Error:
                        case LogStatus.Fatal:
                            style = 'error';
                            break;
                        default:
                            style = 'none';
                    }
                    this.notificationService.show(msg.UPMessage, style);
                }
            };
        RabbitViewerComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'tb-rabbit-viewer',
                        template: "<div class=\"header\">\n    <div class=\"row\">\n        <label id=\"mq-queue-name-label\" class=\"h-label\" for=\"mq-connection-state\">MQ Connection state:</label>\n        <p id=\"mq-connection-state\">{{stompState[loggerService.mqConnectionState]}}</p>\n    </div>\n    <div class=\"row\">\n        <label id=\"mq-queue-name-label\" class=\"h-label\" for=\"mq-queue\">Queue Name:</label>\n        <input kendoTextBox id=\"mq-queue-name\" [(ngModel)]=\"mqQueueName\" (click)=\"$event.target.select()\" />\n        <button kendoButton (click)=\"mqSubscribe()\" [disabled]=\"loggerService.mqConnectionState !== stompState.CONNECTED\">Connect</button>\n    </div>\n</div>\n<div class=\"monitor\">\n    <ul class=\"messages\">\n        <li *ngIf=\"mqMessages.length == 0\" class=\"no-messages\">No messages in queue:<strong>{{mqQueueName}}</strong></li>\n        <li *ngFor=\"let m of mqMessages\" class=\"message\">\n            <!-- <span class=\"l-msg\"> {{m.UPMessage}} </span> -->\n            <span class=\"l-date\">{{m.UPContent.EntryCreated | date: 'medium' }} </span> -\n            <span class=\"l-account-name\"> {{m.UPContent.AccountName }} </span> -\n            <span class=\"l-app\" *ngIf=\"m.UPContent.App\"> {{m.UPContent.App }} -</span>\n            <span class=\"l-type\" *ngIf=\"m.UPContent.RegisteredAppType\"> {{m.UPContent.RegisteredAppType }} -</span>\n            <span class=\"l-category\" *ngIf=\"m.UPContent.Category\"> {{m.UPContent.Category }} -</span>\n            <span class=\"l-status level-{{m.UPContent.Level}}\"> [{{logStatus[m.UPContent.Level]}}]</span>\n            <span class=\"l-msg\"> {{m.UPContent.Message}} </span>\n        </li>\n    </ul>\n</div>",
                        styles: [":host(tb-rabbit-viewer){flex:1;display:flex;flex-direction:column}:host(tb-rabbit-viewer) .notify{background:#ff0b0b;padding:5px 10px;margin:10px 0;color:#fff}:host(tb-rabbit-viewer) .notify p{margin:5px 0;font-size:12px}:host(tb-rabbit-viewer) .header{display:flex;flex-direction:column}:host(tb-rabbit-viewer) .header .row{display:flex;flex-direction:row;align-items:center;margin:5px 0}:host(tb-rabbit-viewer) .header .row.flex-center{justify-content:center}:host(tb-rabbit-viewer) .header .row.flex-around{justify-content:space-around}:host(tb-rabbit-viewer) .header .row.flex-between{justify-content:space-between}:host(tb-rabbit-viewer) .header .row #mq-queue-name{width:500px}:host(tb-rabbit-viewer) .header label.h-label{font-weight:500;font-size:14px;margin:0 10px}:host(tb-rabbit-viewer) .header .k-checkbox-label{font-size:12px}:host(tb-rabbit-viewer) .monitor{display:flex;flex:1;background:#f1f1f1;border:1px solid #ccc;padding:0;margin:5px 0}:host(tb-rabbit-viewer) .monitor .loading{display:flex;justify-content:center;align-items:center;flex:1}:host(tb-rabbit-viewer) .monitor .loading .k-i-loading{font-size:34px;color:#999}:host(tb-rabbit-viewer) .k-i-reset{margin-right:10px;color:#0277bd;border:none;padding:5px}:host(tb-rabbit-viewer) .k-i-reset:hover{cursor:pointer;color:#222}:host(tb-rabbit-viewer) hr{background:#0277bd;height:1px;border:none}:host(tb-rabbit-viewer) .messages{margin:0;padding:5px;list-style:none;overflow:auto;flex:1}:host(tb-rabbit-viewer) .messages .no-logs{font-size:12px}:host(tb-rabbit-viewer) .messages .no-logs strong{font-weight:500}:host(tb-rabbit-viewer) .messages .message{font-size:12px;margin:3px 0}:host(tb-rabbit-viewer) .messages .message .l-date{color:#999}:host(tb-rabbit-viewer) .messages .message .l-account-name{color:#00f}:host(tb-rabbit-viewer) .messages .message .l-status{text-transform:uppercase;margin:0 3px}:host(tb-rabbit-viewer) .messages .message .l-status.level-0{color:#000}:host(tb-rabbit-viewer) .messages .message .l-status.level-1{color:#00f}:host(tb-rabbit-viewer) .messages .message .l-status.level-2{color:orange}:host(tb-rabbit-viewer) .messages .message .l-status.level-3{color:red}:host(tb-rabbit-viewer) .messages .message .l-status.level-4{color:red}"]
                    },] },
        ];
        /** @nocollapse */
        RabbitViewerComponent.ctorParameters = function () {
            return [
                { type: TbLoggerService },
                { type: TbNotificationService }
            ];
        };
        return RabbitViewerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TbLoggerModule = (function () {
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
                        declarations: [LoggerViewerComponent, RabbitViewerComponent],
                        exports: [LoggerViewerComponent, RabbitViewerComponent],
                        providers: [i2.StompRService]
                    },] },
        ];
        return TbLoggerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.EntriesParams = EntriesParams;
    exports.OperationResult = OperationResult;
    exports.LoggerOperationResult = LoggerOperationResult;
    exports.Log = Log;
    exports.LogStatus = LogStatus;
    exports.TbLoggerService = TbLoggerService;
    exports.TbLoggerModule = TbLoggerModule;
    exports.ɵa = LoggerViewerComponent;
    exports.ɵb = RabbitViewerComponent;
    exports.ɵc = TbNotificationService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL2VudHJpZXMubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9vcGVyYXRpb24tcmVzdWx0Lm1vZGVsLnRzIiwibmc6Ly9AdGIvbG9nZ2VyL2xpYi9tb2RlbHMvbG9nZ2VyLW9wZXJhdGlvbi1yZXN1bHQubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9sb2cubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9sb2ctc3RhdHVzLmVudW0udHMiLG51bGwsIm5nOi8vQHRiL2xvZ2dlci9saWIvc2VydmljZXMvdGItbG9nZ2VyLnNlcnZpY2UudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL2NvbXBvbmVudHMvbG9nZ2VyLXZpZXdlci9sb2dnZXItdmlld2VyLmNvbXBvbmVudC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL2NvbXBvbmVudHMvcmFiYml0LXZpZXdlci9yYWJiaXQtdmlld2VyLmNvbXBvbmVudC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvdGItbG9nZ2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRW50cmllc1BhcmFtcyB7XHJcbiAgICBhcHBJZDogc3RyaW5nO1xyXG4gICAgYXBwczogc3RyaW5nO1xyXG4gICAgYXBwVHlwZXM6IHN0cmluZztcclxuICAgIGNhdGVnb3JpZXM6IHN0cmluZztcclxuICAgIGhvd01hbnk6IHN0cmluZztcclxuICAgIG9mZlNldDogc3RyaW5nO1xyXG4gICAgbGV2ZWxzOiBzdHJpbmc7XHJcbiAgICB0ZXh0VG9GaW5kOiBzdHJpbmc7XHJcbiAgICB1c2VIaXN0b3J5OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBPcGVyYXRpb25SZXN1bHQge1xyXG4gICAgUmVzdWx0OiBib29sZWFuO1xyXG4gICAgTWVzc2FnZT86IHN0cmluZztcclxuICAgIENvZGU/OiBudW1iZXI7XHJcbiAgICBDb250ZW50PzogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0IHtcclxuICAgIFJlc3VsdDogYm9vbGVhbjtcclxuICAgIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgICBDb2RlPzogbnVtYmVyO1xyXG4gICAgQ29udGVudD86IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIExvZyB7XHJcbiAgICBfaWQ6IHN0cmluZztcclxuICAgIExvZ0VudHJ5OiB7XHJcbiAgICAgICAgQXBwOiBzdHJpbmc7IC8vIEVSUCwgUEFJLCBNREMsIFRCRlxyXG4gICAgICAgIFJlZ2lzdGVyZWRBcHBJZDogc3RyaW5nOyAvLyBpbnN0YW5jZSBrZXlcclxuICAgICAgICBSZWdpc3RlcmVkQXBwVHlwZTogc3RyaW5nOyAvLyBUQkxPQURFUiwgTkVUQ09SRSwgTkcsIFBST1ZJU0lPTklOR1xyXG4gICAgICAgIENhdGVnb3J5OiBzdHJpbmc7IC8vXHJcbiAgICAgICAgTW9kdWxlOiBzdHJpbmc7XHJcbiAgICAgICAgU3ViTW9kdWxlOiBzdHJpbmc7XHJcbiAgICAgICAgRG9jdW1lbnQ6IHN0cmluZztcclxuICAgICAgICBTdWJzY3JpcHRpb246IHN0cmluZztcclxuICAgICAgICBBY2NvdW50TmFtZTogc3RyaW5nO1xyXG4gICAgICAgIExpZmV0aW1lOiBzdHJpbmc7XHJcbiAgICAgICAgT3BlcmF0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgQ29udGV4dERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgTWV0aG9kOiBzdHJpbmc7XHJcbiAgICAgICAgRW50cnlDcmVhdGVkOiBzdHJpbmc7XHJcbiAgICAgICAgTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgICAgIExldmVsOiBudW1iZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgZW51bSBMb2dTdGF0dXMge1xyXG4gICAgSW5mbyA9IDAsXHJcbiAgICBEZWJ1ZyA9IDEsXHJcbiAgICBXYXJuID0gMixcclxuICAgIEVycm9yID0gMyxcclxuICAgIEZhdGFsID0gNFxyXG59XHJcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBFbnRyaWVzUGFyYW1zIH0gZnJvbSAnLi4vbW9kZWxzL2VudHJpZXMubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2dnZXJPcGVyYXRpb25SZXN1bHQgfSBmcm9tICcuLi9tb2RlbHMvbG9nZ2VyLW9wZXJhdGlvbi1yZXN1bHQubW9kZWwnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCB0YXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTdG9tcFJTZXJ2aWNlLCBTdG9tcENvbmZpZywgU3RvbXBTdGF0ZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAc3RvbXAvc3RvbXBqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyU2VydmljZSB7XHJcbiAgICBwdWJsaWMgbG9nZ2VyVXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGhvd01hbnkgPSAxMDA7XHJcblxyXG4gICAgcHVibGljIG1xQ29ubmVjdGlvblN0YXRlOiBTdG9tcFN0YXRlID0gU3RvbXBTdGF0ZS5DTE9TRUQ7XHJcbiAgICBwdWJsaWMgbXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlOiBCZWhhdmlvclN1YmplY3Q8U3RvbXBTdGF0ZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFN0b21wU3RhdGUuQ0xPU0VEKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdlbnYnKSBwcml2YXRlIGVudiwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwdWJsaWMgc3RvbXBTZXJ2aWNlOiBTdG9tcFJTZXJ2aWNlKSB7XHJcbiAgICAgICAgaWYgKGVudi5zdG9tcENvbmZpZykgdGhpcy5tcUluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtcUluaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZW52LnN0b21wQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvbXBTZXJ2aWNlLmNvbmZpZyA9IHRoaXMuZW52LnN0b21wQ29uZmlnO1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5pbml0QW5kQ29ubmVjdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5zdGF0ZS5zdWJzY3JpYmUoKHN0YXR1czogU3RvbXBTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tcUNvbm5lY3Rpb25TdGF0ZSA9IHN0YXR1cztcclxuICAgICAgICAgICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlLm5leHQoc3RhdHVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUml0b3JuYSBsYSBiYXNlIHVybCBkZWwgbG9nZ2VyLFxyXG4gICAgICogY2FyaWNhdGEgZGEgdW4gZmlsZSBkaSBjb25maWd1cmF6aW9uZSBjYXJpY2F0byBkaW5hbWljYW1lbnRlIChhc3NldHMvZW52aXJvbm1lbnQuanNvbilcclxuICAgICAqL1xyXG4gICAgZ2V0TG9nZ2VyVXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2dlclVybCA/IHRoaXMubG9nZ2VyVXJsIDogdGhpcy5lbnYubG9nZ2VyLnVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnNvbGUubG9nIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgbG9nKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnNvbGUubG9nIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZGVidWcobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS53YXJuIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgd2FybihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS5lcnJvciBpbiBhdHRlc2EgZGkgcG9zdCB0byBsb2dnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGVycm9yKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGxvZ3M6IExvZ2dlck9wZXJhdGlvblJlc3VsdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbXM6IEVudHJpZXNQYXJhbXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExvZ3MocGFyYW1zOiBFbnRyaWVzUGFyYW1zKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFwYXJhbXMuYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLlJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5NZXNzYWdlID0gJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgZW50cmllcy8ke3BhcmFtcy5hcHBJZH1gO1xyXG5cclxuICAgICAgICBsZXQgcCA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICAgICAgcCA9IHAuYXBwZW5kKCdob3dNYW55JywgJycgKyB0aGlzLmhvd01hbnkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXBwcykgcCA9IHAuYXBwZW5kKCdhcHBzJywgcGFyYW1zLmFwcHMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXBwVHlwZXMpIHAgPSBwLmFwcGVuZCgnYXBwVHlwZXMnLCBwYXJhbXMuYXBwVHlwZXMpO1xyXG5cclxuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgcGFyYW1zOiBwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwsIGh0dHBPcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRMb2dzJywgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0TG9ncycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5SZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IuTWVzc2FnZSA9ICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcHMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwcycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBUeXBlcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFhcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IuUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLk1lc3NhZ2UgPSAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBUeXBlcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwVHlwZXMnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBIdHRwIG9wZXJhdGlvbiB0aGF0IGZhaWxlZC5cclxuICAgICAqIExldCB0aGUgYXBwIGNvbnRpbnVlLlxyXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiAtIG5hbWUgb2YgdGhlIG9wZXJhdGlvbiB0aGF0IGZhaWxlZFxyXG4gICAgICogQHBhcmFtIHJlc3VsdCAtIG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBhcyB0aGUgb2JzZXJ2YWJsZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUVycm9yPFQ+KG9wZXJhdGlvbiA9ICdvcGVyYXRpb24nLCByZXN1bHQ/OiBUKSB7XHJcbiAgICAgICAgcmV0dXJuIChlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxUPiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7b3BlcmF0aW9ufSBmYWlsZWQ6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuXHJcbiAgICAgICAgICAgIC8vIExldCB0aGUgYXBwIGtlZXAgcnVubmluZyBieSByZXR1cm5pbmcgYW4gZW1wdHkgcmVzdWx0LlxyXG4gICAgICAgICAgICByZXR1cm4gb2YocmVzdWx0IGFzIFQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZXNzaW9uZSBhIFJhYmJpdE1RXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtcUNvbm5lY3QocXVldWVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9tcFNlcnZpY2Uuc3Vic2NyaWJlKHF1ZXVlTmFtZSkucGlwZShtYXAoKG1zZzogTWVzc2FnZSkgPT4gSlNPTi5wYXJzZShtc2cuYm9keSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbXFDb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLmNvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG1xRGlzY29ubmVjdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9tcFNlcnZpY2UuZGlzY29ubmVjdCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IExvZyB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL2xvZy5tb2RlbCc7XHJcbmltcG9ydCB7IExvZ1N0YXR1cyB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL2xvZy1zdGF0dXMuZW51bSc7XHJcbmltcG9ydCB7IFRiTG9nZ2VyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvdGItbG9nZ2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2dnZXJPcGVyYXRpb25SZXN1bHQgfSBmcm9tICcuLy4uLy4uL21vZGVscy9sb2dnZXItb3BlcmF0aW9uLXJlc3VsdC5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBkZWxheSwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEVudHJpZXNQYXJhbXMgfSBmcm9tICcuLi8uLi9tb2RlbHMvZW50cmllcy5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGItbG9nZ2VyLXZpZXdlcicsXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8bGFiZWwgaWQ9XCJsb2dnZXItdXJsLWxhYmVsXCIgY2xhc3M9XCJoLWxhYmVsXCIgZm9yPVwibG9nZ2VyLXVybFwiPkxvZ2dlciBVUkw6PC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQga2VuZG9UZXh0Qm94IGlkPVwibG9nZ2VyLXVybFwiIFsobmdNb2RlbCldPVwibG9nZ2VyVXJsXCIgKGJsdXIpPVwic2V0TG9nZ2VyVXJsKCRldmVudClcIiAoY2xpY2spPVwiJGV2ZW50LnRhcmdldC5zZWxlY3QoKVwiIC8+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJrLWljb24gay1pLXJlc2V0IFwiIChjbGljayk9XCJnZXRMb2dzKClcIj48L3NwYW4+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhdXRvcmVmcmVzaFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJhdXRvUmVmcmVzaFwiIGNsYXNzPVwiay1jaGVja2JveFwiIFtuZ01vZGVsXT1cImNoZWNrZWRcIiAobmdNb2RlbENoYW5nZSk9XCJjaGVja0F1dG9SZWZyZXNoKCRldmVudClcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiay1jaGVja2JveC1sYWJlbFwiIGZvcj1cImF1dG9SZWZyZXNoXCI+QXV0byByZWZyZXNoICg1cyk8L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJcIj5cclxuICAgICAgICAgICAgPCEtLSBBUFAgSUQgLS0+XHJcbiAgICAgICAgICAgIDxsYWJlbCBpZD1cImxvZ2dlci1hcHAtaWQtbGFiZWxcIiBjbGFzcz1cImgtbGFiZWxcIiBmb3I9XCJsb2dnZXItYXBwLWlkXCIgKGNsaWNrKT1cImFwcExpc3RJbml0KClcIj5JbnN0YW5jZSBLZXk6PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGtlbmRvVGV4dEJveCAjYXBwSWRJbnB1dCBbKG5nTW9kZWwpXT1cImFwcElkXCIgKGJsdXIpPVwic2V0QXBwSWQoJGV2ZW50KVwiIGlkPVwia2EtYXBwLWlkXCIgKGNsaWNrKT1cIiRldmVudC50YXJnZXQuc2VsZWN0KClcIlxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIDJkMTM2YzYxLWFhYzItNDQyZC05MjZjLWE1MzFjMzY4NTAzNVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJcIj5cclxuICAgICAgICAgICAgPCEtLSBBUFAgLS0+XHJcbiAgICAgICAgICAgIDxsYWJlbCBpZD1cImxvZ2dlci1hcHAtbGFiZWxcIiBjbGFzcz1cImgtbGFiZWxcIiBmb3I9XCJsb2dnZXItYXBwXCI+QXBwOjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxrZW5kby1hdXRvY29tcGxldGUgI2FwcExpc3QgW2RhdGFdPVwiYXBwRGF0YVwiIFtzdWdnZXN0XT1cInRydWVcIiBbcGxhY2Vob2xkZXJdPVwiJ2UuZy4gRVJQLCBNREMsIFRCRidcIlxyXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJhcHBcIiAodmFsdWVDaGFuZ2UpPVwic2V0QXBwKCRldmVudClcIiBpZD1cImthLWFwcFwiPlxyXG4gICAgICAgICAgICA8L2tlbmRvLWF1dG9jb21wbGV0ZT5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlclwiPlxyXG4gICAgICAgICAgICA8IS0tIEFQUCBUWVBFIC0tPlxyXG4gICAgICAgICAgICA8bGFiZWwgaWQ9XCJsb2dnZXItYXBwLXR5cGUtbGFiZWxcIiBjbGFzcz1cImgtbGFiZWxcIiBmb3I9XCJsb2dnZXItYXBwLXR5cGVcIj5BcHBUeXBlOjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxrZW5kby1hdXRvY29tcGxldGUgI2FwcFR5cGVMaXN0IFtkYXRhXT1cImFwcFR5cGVEYXRhXCIgW3N1Z2dlc3RdPVwidHJ1ZVwiIFtwbGFjZWhvbGRlcl09XCInZS5nLiBUQkxPQURFUiwgTkVUQ09SRSwgTkcnXCJcclxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiYXBwVHlwZVwiICh2YWx1ZUNoYW5nZSk9XCJzZXRBcHBUeXBlKCRldmVudClcIiBpZD1cImthLWFwcC10eXBlXCI+XHJcbiAgICAgICAgICAgIDwva2VuZG8tYXV0b2NvbXBsZXRlPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm5vdGlmeVwiICpuZ0lmPVwibWVzc2FnZVwiPlxyXG4gICAgICAgIDxwPnt7bWVzc2FnZX19PC9wPlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiBjbGFzcz1cIm1vbml0b3JcIj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwibG9hZGluZ1wiICpuZ0lmPVwibG9hZGluZ1wiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiay1pY29uIGstaS1sb2FkaW5nXCI+PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPHVsIGNsYXNzPVwibG9nc1wiICpuZ0lmPVwiIWxvYWRpbmdcIj5cclxuICAgICAgICA8bGkgKm5nSWY9XCJsb2dzLmxlbmd0aCA9PSAwXCIgY2xhc3M9XCJuby1sb2dzXCI+Tm8gTG9ncyB3aXRoIGFwcElkOjxzdHJvbmc+e3thcHBJZH19PC9zdHJvbmc+PC9saT5cclxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGxvZyBvZiBsb2dzXCIgY2xhc3M9XCJsb2dcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWRhdGVcIj57e2xvZy5Mb2dFbnRyeS5FbnRyeUNyZWF0ZWQgfCBkYXRlOiAnbWVkaXVtJyB9fSA8L3NwYW4+IC1cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWFjY291bnQtbmFtZVwiPiB7e2xvZy5Mb2dFbnRyeS5BY2NvdW50TmFtZSB9fSA8L3NwYW4+IC1cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWFwcFwiICpuZ0lmPVwibG9nLkxvZ0VudHJ5LkFwcFwiPiB7e2xvZy5Mb2dFbnRyeS5BcHAgfX0gLTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLXR5cGVcIiAqbmdJZj1cImxvZy5Mb2dFbnRyeS5SZWdpc3RlcmVkQXBwVHlwZVwiPiB7e2xvZy5Mb2dFbnRyeS5SZWdpc3RlcmVkQXBwVHlwZSB9fSAtPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtY2F0ZWdvcnlcIiAqbmdJZj1cImxvZy5Mb2dFbnRyeS5DYXRlZ29yeVwiPiB7e2xvZy5Mb2dFbnRyeS5DYXRlZ29yeSB9fSAtPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtc3RhdHVzIGxldmVsLXt7bG9nLkxvZ0VudHJ5LkxldmVsfX1cIj5be3tsb2dTdGF0dXNbbG9nLkxvZ0VudHJ5LkxldmVsXX19XTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLW1zZ1wiPiB7e2xvZy5Mb2dFbnRyeS5NZXNzYWdlfX0gPC9zcGFuPlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG48L2Rpdj5gLFxyXG4gICAgc3R5bGVzOiBbYDpob3N0KHRiLWxvZ2dlci12aWV3ZXIpe2ZsZXg6MTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5ub3RpZnl7YmFja2dyb3VuZDojZmYwYjBiO3BhZGRpbmc6NXB4IDEwcHg7bWFyZ2luOjEwcHggMDtjb2xvcjojZmZmfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5ub3RpZnkgcHttYXJnaW46NXB4IDA7Zm9udC1zaXplOjEycHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlcntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO21hcmdpbjozMHB4IDAgMTBweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIC5yb3d7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOnJvdzthbGlnbi1pdGVtczpjZW50ZXI7bWFyZ2luOjVweCAwfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgLnJvdy5mbGV4LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgLnJvdy5mbGV4LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgLnJvdy5mbGV4LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAucm93IC5maWx0ZXIgI2thLWFwcC1pZHt3aWR0aDozMzBweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIGxhYmVsLmgtbGFiZWx7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToxNHB4O21hcmdpbjowIDEwcHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAjbG9nZ2VyLXVybHt3aWR0aDo1MDBweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIC5rLWNoZWNrYm94LWxhYmVse2ZvbnQtc2l6ZToxMnB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5tb25pdG9ye2Rpc3BsYXk6ZmxleDtmbGV4OjE7YmFja2dyb3VuZDojZjFmMWYxO2JvcmRlcjoxcHggc29saWQgI2NjYztwYWRkaW5nOjA7bWFyZ2luOjVweCAwfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5tb25pdG9yIC5sb2FkaW5ne2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtmbGV4OjF9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLm1vbml0b3IgLmxvYWRpbmcgLmstaS1sb2FkaW5ne2ZvbnQtc2l6ZTozNHB4O2NvbG9yOiM5OTl9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmstaS1yZXNldHttYXJnaW4tcmlnaHQ6MTBweDtjb2xvcjojMDI3N2JkO2JvcmRlcjpub25lO3BhZGRpbmc6NXB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5rLWktcmVzZXQ6aG92ZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6IzIyMn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSBocntiYWNrZ3JvdW5kOiMwMjc3YmQ7aGVpZ2h0OjFweDtib3JkZXI6bm9uZX06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9nc3ttYXJnaW46MDtwYWRkaW5nOjVweDtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6YXV0bztmbGV4OjF9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLm5vLWxvZ3N7Zm9udC1zaXplOjEycHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLm5vLWxvZ3Mgc3Ryb25ne2ZvbnQtd2VpZ2h0OjUwMH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9ne2ZvbnQtc2l6ZToxMnB4O21hcmdpbjozcHggMH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLWRhdGV7Y29sb3I6Izk5OX06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLWFjY291bnQtbmFtZXtjb2xvcjojMDBmfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtc3RhdHVze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTttYXJnaW46MCAzcHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1zdGF0dXMubGV2ZWwtMHtjb2xvcjojMDAwfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtc3RhdHVzLmxldmVsLTF7Y29sb3I6IzAwZn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLXN0YXR1cy5sZXZlbC0ye2NvbG9yOm9yYW5nZX06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLXN0YXR1cy5sZXZlbC0ze2NvbG9yOnJlZH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLXN0YXR1cy5sZXZlbC00e2NvbG9yOnJlZH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9nZ2VyVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICAgIC8vIGluc3RhbmNlIGtleVxyXG4gICAgQFZpZXdDaGlsZCgnYXBwSWRJbnB1dCcpXHJcbiAgICBhcHBJZElucHV0O1xyXG4gICAgYXBwSWQ6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBJZCcpID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcElkJykgOiAnJztcclxuXHJcbiAgICAvLyBhcHBcclxuICAgIEBWaWV3Q2hpbGQoJ2FwcExpc3QnKVxyXG4gICAgYXBwTGlzdDtcclxuICAgIHB1YmxpYyBhcHBEYXRhOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBhcHA6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHAnKSA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHAnKSA6ICcnO1xyXG5cclxuICAgIC8vIGFwcCB0eXBlc1xyXG4gICAgQFZpZXdDaGlsZCgnYXBwVHlwZUxpc3QnKVxyXG4gICAgYXBwVHlwZUxpc3Q7XHJcbiAgICBwdWJsaWMgYXBwVHlwZURhdGE6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIGFwcFR5cGU6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBUeXBlJykgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwVHlwZScpIDogJyc7XHJcblxyXG4gICAgbG9nczogTG9nW10gPSBbXTtcclxuICAgIGxvZ1N0YXR1cyA9IExvZ1N0YXR1cztcclxuICAgIHNob3cgPSBmYWxzZTtcclxuICAgIGxvYWRpbmcgPSBmYWxzZTtcclxuICAgIGhvd01hbnkgPSAxMDA7XHJcbiAgICBjaGVja2VkID0gZmFsc2U7XHJcbiAgICBhdXRvUmVmcmVzaCA9IGZhbHNlO1xyXG4gICAgYXV0b1JlZnJlc2hJbnRlcnZhbDogYW55O1xyXG4gICAgbWVzc2FnZSA9ICcnO1xyXG5cclxuICAgIGxvZ2dlclVybCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZXJVcmwnKSA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZXJVcmwnKSA6IHRoaXMubG9nZ2VyU2VydmljZS5nZXRMb2dnZXJVcmwoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9nZ2VyU2VydmljZTogVGJMb2dnZXJTZXJ2aWNlKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuYXBwTGlzdEluaXQoKTtcclxuICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7fVxyXG5cclxuICAgIC8vIGxlZ2dvIHR1dHRlIGxlIGFwcCwgZ2xpIGFwcElkIGUgZ2xpIGFwcFR5cGUgZSBsaSBzYWx2byBpbiByaXNwZXR0aXZpIGFycmF5XHJcbiAgICAvLyB2ZXJyYW5ubyBwb2kgZmlsdHJhdGkgZGFpIGNvbXBvbmVudGkga2VuZG9cclxuICAgIGFwcExpc3RJbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hcHBJZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5nZXRBcHBzKHRoaXMuYXBwSWQpLnN1YnNjcmliZSgob3A6IExvZ2dlck9wZXJhdGlvblJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFwcERhdGEgPSBvcC5Db250ZW50O1xyXG4gICAgICAgICAgICB0aGlzLmFwcExpc3QubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcyh0aGlzLmFwcElkKS5zdWJzY3JpYmUoKG9wOiBMb2dnZXJPcGVyYXRpb25SZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hcHBUeXBlRGF0YSA9IG9wLkNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwVHlwZUxpc3QubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRMb2dzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hcHBJZCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnSW5zdGFuY2UgS2V5IG1hbmNhbnRlJztcclxuICAgICAgICAgICAgdGhpcy5hcHBJZElucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IEVudHJpZXNQYXJhbXMoKTtcclxuICAgICAgICBwYXJhbXMuYXBwSWQgPSB0aGlzLmFwcElkO1xyXG4gICAgICAgIGlmICh0aGlzLmFwcCkgcGFyYW1zLmFwcHMgPSB0aGlzLmFwcDtcclxuICAgICAgICBpZiAodGhpcy5hcHBUeXBlKSBwYXJhbXMuYXBwVHlwZXMgPSB0aGlzLmFwcFR5cGU7XHJcblxyXG4gICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5nZXRMb2dzKHBhcmFtcykuc3Vic2NyaWJlKChvcDogTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghb3AuUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBvcC5NZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMubG9ncyA9IG9wLkNvbnRlbnQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TG9nZ2VyVXJsKGV2ZW50KSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2dlclVybCcsIHRoaXMubG9nZ2VyVXJsKTtcclxuICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QXBwKCRldmVudCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhcHAnLCB0aGlzLmFwcCk7XHJcbiAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEFwcElkKCRldmVudCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhcHBJZCcsIHRoaXMuYXBwSWQpO1xyXG4gICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRBcHBUeXBlKCRldmVudCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhcHBUeXBlJywgdGhpcy5hcHBUeXBlKTtcclxuICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmF1dG9SZWZyZXNoSW50ZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0F1dG9SZWZyZXNoKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmF1dG9SZWZyZXNoID0gIXRoaXMuYXV0b1JlZnJlc2g7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b1JlZnJlc2gpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b1JlZnJlc2hJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVmcmVzaEludGVydmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuYXV0b1JlZnJlc2hJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItbm90aWZpY2F0aW9uJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGJOb3RpZmljYXRpb25TZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge31cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhtc2csIHN0eWxlOiBhbnkgPSAnbm9uZScpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvdyh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IG1zZyxcclxuICAgICAgICAgICAgYW5pbWF0aW9uOiB7IHR5cGU6ICdzbGlkZScsIGR1cmF0aW9uOiAyMDAgfSxcclxuICAgICAgICAgICAgcG9zaXRpb246IHsgaG9yaXpvbnRhbDogJ3JpZ2h0JywgdmVydGljYWw6ICdib3R0b20nIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IHsgc3R5bGU6IHN0eWxlLCBpY29uOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIGhpZGVBZnRlcjogNDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTdG9tcFN0YXRlIH0gZnJvbSAnQHN0b21wL25nMi1zdG9tcGpzJztcclxuXHJcbmltcG9ydCB7IExvZ1N0YXR1cyB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL2xvZy1zdGF0dXMuZW51bSc7XHJcbmltcG9ydCB7IFRiTG9nZ2VyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvdGItbG9nZ2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUYk5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3RpZmljYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGItcmFiYml0LXZpZXdlcicsXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8bGFiZWwgaWQ9XCJtcS1xdWV1ZS1uYW1lLWxhYmVsXCIgY2xhc3M9XCJoLWxhYmVsXCIgZm9yPVwibXEtY29ubmVjdGlvbi1zdGF0ZVwiPk1RIENvbm5lY3Rpb24gc3RhdGU6PC9sYWJlbD5cclxuICAgICAgICA8cCBpZD1cIm1xLWNvbm5lY3Rpb24tc3RhdGVcIj57e3N0b21wU3RhdGVbbG9nZ2VyU2VydmljZS5tcUNvbm5lY3Rpb25TdGF0ZV19fTwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgIDxsYWJlbCBpZD1cIm1xLXF1ZXVlLW5hbWUtbGFiZWxcIiBjbGFzcz1cImgtbGFiZWxcIiBmb3I9XCJtcS1xdWV1ZVwiPlF1ZXVlIE5hbWU6PC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQga2VuZG9UZXh0Qm94IGlkPVwibXEtcXVldWUtbmFtZVwiIFsobmdNb2RlbCldPVwibXFRdWV1ZU5hbWVcIiAoY2xpY2spPVwiJGV2ZW50LnRhcmdldC5zZWxlY3QoKVwiIC8+XHJcbiAgICAgICAgPGJ1dHRvbiBrZW5kb0J1dHRvbiAoY2xpY2spPVwibXFTdWJzY3JpYmUoKVwiIFtkaXNhYmxlZF09XCJsb2dnZXJTZXJ2aWNlLm1xQ29ubmVjdGlvblN0YXRlICE9PSBzdG9tcFN0YXRlLkNPTk5FQ1RFRFwiPkNvbm5lY3Q8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiBjbGFzcz1cIm1vbml0b3JcIj5cclxuICAgIDx1bCBjbGFzcz1cIm1lc3NhZ2VzXCI+XHJcbiAgICAgICAgPGxpICpuZ0lmPVwibXFNZXNzYWdlcy5sZW5ndGggPT0gMFwiIGNsYXNzPVwibm8tbWVzc2FnZXNcIj5ObyBtZXNzYWdlcyBpbiBxdWV1ZTo8c3Ryb25nPnt7bXFRdWV1ZU5hbWV9fTwvc3Ryb25nPjwvbGk+XHJcbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBtIG9mIG1xTWVzc2FnZXNcIiBjbGFzcz1cIm1lc3NhZ2VcIj5cclxuICAgICAgICAgICAgPCEtLSA8c3BhbiBjbGFzcz1cImwtbXNnXCI+IHt7bS5VUE1lc3NhZ2V9fSA8L3NwYW4+IC0tPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtZGF0ZVwiPnt7bS5VUENvbnRlbnQuRW50cnlDcmVhdGVkIHwgZGF0ZTogJ21lZGl1bScgfX0gPC9zcGFuPiAtXHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1hY2NvdW50LW5hbWVcIj4ge3ttLlVQQ29udGVudC5BY2NvdW50TmFtZSB9fSA8L3NwYW4+IC1cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWFwcFwiICpuZ0lmPVwibS5VUENvbnRlbnQuQXBwXCI+IHt7bS5VUENvbnRlbnQuQXBwIH19IC08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC10eXBlXCIgKm5nSWY9XCJtLlVQQ29udGVudC5SZWdpc3RlcmVkQXBwVHlwZVwiPiB7e20uVVBDb250ZW50LlJlZ2lzdGVyZWRBcHBUeXBlIH19IC08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1jYXRlZ29yeVwiICpuZ0lmPVwibS5VUENvbnRlbnQuQ2F0ZWdvcnlcIj4ge3ttLlVQQ29udGVudC5DYXRlZ29yeSB9fSAtPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtc3RhdHVzIGxldmVsLXt7bS5VUENvbnRlbnQuTGV2ZWx9fVwiPiBbe3tsb2dTdGF0dXNbbS5VUENvbnRlbnQuTGV2ZWxdfX1dPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtbXNnXCI+IHt7bS5VUENvbnRlbnQuTWVzc2FnZX19IDwvc3Bhbj5cclxuICAgICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuPC9kaXY+YCxcclxuICAgIHN0eWxlczogW2A6aG9zdCh0Yi1yYWJiaXQtdmlld2VyKXtmbGV4OjE7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubm90aWZ5e2JhY2tncm91bmQ6I2ZmMGIwYjtwYWRkaW5nOjVweCAxMHB4O21hcmdpbjoxMHB4IDA7Y29sb3I6I2ZmZn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubm90aWZ5IHB7bWFyZ2luOjVweCAwO2ZvbnQtc2l6ZToxMnB4fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXJ7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIC5yb3d7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOnJvdzthbGlnbi1pdGVtczpjZW50ZXI7bWFyZ2luOjVweCAwfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXIgLnJvdy5mbGV4LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXIgLnJvdy5mbGV4LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXIgLnJvdy5mbGV4LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmhlYWRlciAucm93ICNtcS1xdWV1ZS1uYW1le3dpZHRoOjUwMHB4fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXIgbGFiZWwuaC1sYWJlbHtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjAgMTBweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIC5rLWNoZWNrYm94LWxhYmVse2ZvbnQtc2l6ZToxMnB4fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tb25pdG9ye2Rpc3BsYXk6ZmxleDtmbGV4OjE7YmFja2dyb3VuZDojZjFmMWYxO2JvcmRlcjoxcHggc29saWQgI2NjYztwYWRkaW5nOjA7bWFyZ2luOjVweCAwfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tb25pdG9yIC5sb2FkaW5ne2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtmbGV4OjF9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1vbml0b3IgLmxvYWRpbmcgLmstaS1sb2FkaW5ne2ZvbnQtc2l6ZTozNHB4O2NvbG9yOiM5OTl9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmstaS1yZXNldHttYXJnaW4tcmlnaHQ6MTBweDtjb2xvcjojMDI3N2JkO2JvcmRlcjpub25lO3BhZGRpbmc6NXB4fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5rLWktcmVzZXQ6aG92ZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6IzIyMn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSBocntiYWNrZ3JvdW5kOiMwMjc3YmQ7aGVpZ2h0OjFweDtib3JkZXI6bm9uZX06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXN7bWFyZ2luOjA7cGFkZGluZzo1cHg7bGlzdC1zdHlsZTpub25lO292ZXJmbG93OmF1dG87ZmxleDoxfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubm8tbG9nc3tmb250LXNpemU6MTJweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm5vLWxvZ3Mgc3Ryb25ne2ZvbnQtd2VpZ2h0OjUwMH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2V7Zm9udC1zaXplOjEycHg7bWFyZ2luOjNweCAwfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1kYXRle2NvbG9yOiM5OTl9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLWFjY291bnQtbmFtZXtjb2xvcjojMDBmfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1zdGF0dXN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO21hcmdpbjowIDNweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtc3RhdHVzLmxldmVsLTB7Y29sb3I6IzAwMH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtc3RhdHVzLmxldmVsLTF7Y29sb3I6IzAwZn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtc3RhdHVzLmxldmVsLTJ7Y29sb3I6b3JhbmdlfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1zdGF0dXMubGV2ZWwtM3tjb2xvcjpyZWR9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLXN0YXR1cy5sZXZlbC00e2NvbG9yOnJlZH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmFiYml0Vmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICAgIHN0b21wU3RhdGUgPSBTdG9tcFN0YXRlO1xyXG4gICAgbG9nU3RhdHVzID0gTG9nU3RhdHVzO1xyXG5cclxuICAgIG1xQ29ubmVjdGlvblN0YXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgICBtcUNvbm5lY3Rpb25TdGF0ZTogU3RvbXBTdGF0ZTtcclxuXHJcbiAgICBtcVF1ZXVlOiBTdWJzY3JpcHRpb247XHJcbiAgICBtcVF1ZXVlTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtcVF1ZXVlTmFtZScpID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21xUXVldWVOYW1lJykgOiAnJztcclxuXHJcbiAgICBwdWJsaWMgbXFNZXNzYWdlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2dnZXJTZXJ2aWNlOiBUYkxvZ2dlclNlcnZpY2UsIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogVGJOb3RpZmljYXRpb25TZXJ2aWNlKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGVTdWJzY3JpcHRpb24gPSB0aGlzLmxvZ2dlclNlcnZpY2UubXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlLnN1YnNjcmliZShzdGF0dXMgPT5cclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZU1xU3RhdGUoc3RhdHVzKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge31cclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlTXFTdGF0ZShzdGF0dXM6IFN0b21wU3RhdGUpIHtcclxuICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlID0gc3RhdHVzO1xyXG5cclxuICAgICAgICBpZiAoc3RhdHVzID09PSBTdG9tcFN0YXRlLkNPTk5FQ1RFRCAmJiB0aGlzLm1xUXVldWVOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXFTdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1xU3Vic2NyaWJlKCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtcVF1ZXVlTmFtZScsIHRoaXMubXFRdWV1ZU5hbWUpO1xyXG4gICAgICAgIGNvbnN0IHF1ZXVlTmFtZSA9IGAvcXVldWUvJHt0aGlzLm1xUXVldWVOYW1lfWA7XHJcbiAgICAgICAgdGhpcy5tcVF1ZXVlID0gdGhpcy5sb2dnZXJTZXJ2aWNlLm1xQ29ubmVjdChxdWV1ZU5hbWUpLnN1YnNjcmliZShtc2cgPT4gdGhpcy5vbk1lc3NhZ2UobXNnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1lc3NhZ2UobXNnKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1JhYmJpdFZpZXdlckNvbXBvbmVudC5vbk1lc3NhZ2UnLCBtc2cpO1xyXG5cclxuICAgICAgICB0aGlzLm1xTWVzc2FnZXMucHVzaChtc2cpO1xyXG5cclxuICAgICAgICBsZXQgc3R5bGUgPSAnbm9uZSc7XHJcbiAgICAgICAgaWYgKG1zZy5VUENvbnRlbnQpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChtc2cuVVBDb250ZW50LkxldmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIExvZ1N0YXR1cy5XYXJuOlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0gJ3dhcm5pbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBMb2dTdGF0dXMuRXJyb3I6XHJcbiAgICAgICAgICAgICAgICBjYXNlIExvZ1N0YXR1cy5GYXRhbDpcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9ICdlcnJvcic7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93KG1zZy5VUE1lc3NhZ2UsIHN0eWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEJ1dHRvbnNNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1idXR0b25zJztcclxuaW1wb3J0IHsgRHJvcERvd25zTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItZHJvcGRvd25zJztcclxuaW1wb3J0IHsgSW5wdXRzTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItaW5wdXRzJztcclxuaW1wb3J0IHsgRGF0ZUlucHV0c01vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLWRhdGVpbnB1dHMnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1ub3RpZmljYXRpb24nO1xyXG5cclxuaW1wb3J0IHsgU3RvbXBSU2VydmljZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcblxyXG5pbXBvcnQgeyBMb2dnZXJWaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9nZ2VyLXZpZXdlci9sb2dnZXItdmlld2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJhYmJpdFZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yYWJiaXQtdmlld2VyL3JhYmJpdC12aWV3ZXIuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3RpZmljYXRpb25Nb2R1bGUsIEJ1dHRvbnNNb2R1bGUsIElucHV0c01vZHVsZSwgRGF0ZUlucHV0c01vZHVsZSwgRm9ybXNNb2R1bGUsIERyb3BEb3duc01vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtMb2dnZXJWaWV3ZXJDb21wb25lbnQsIFJhYmJpdFZpZXdlckNvbXBvbmVudF0sXHJcbiAgICBleHBvcnRzOiBbTG9nZ2VyVmlld2VyQ29tcG9uZW50LCBSYWJiaXRWaWV3ZXJDb21wb25lbnRdLFxyXG4gICAgcHJvdmlkZXJzOiBbU3RvbXBSU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyTW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBUYkxvZ2dlck1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbU3RvbXBSU2VydmljZV1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJTdG9tcFN0YXRlIiwiQmVoYXZpb3JTdWJqZWN0Iiwib2YiLCJIdHRwUGFyYW1zIiwidGFwIiwiY2F0Y2hFcnJvciIsIm1hcCIsIkluamVjdGFibGUiLCJJbmplY3QiLCJIdHRwQ2xpZW50IiwiU3RvbXBSU2VydmljZSIsIkNvbXBvbmVudCIsIlZpZXdDaGlsZCIsIk5vdGlmaWNhdGlvblNlcnZpY2UiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIk5vdGlmaWNhdGlvbk1vZHVsZSIsIkJ1dHRvbnNNb2R1bGUiLCJJbnB1dHNNb2R1bGUiLCJEYXRlSW5wdXRzTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJEcm9wRG93bnNNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxRQUFBO1FBV0k7U0FBZ0I7NEJBWHBCO1FBWUM7Ozs7OztBQ1pELFFBQUE7UUFNSTtTQUFnQjs4QkFOcEI7UUFPQzs7Ozs7O0FDUEQsUUFBQTtRQU1JO1NBQWdCO29DQU5wQjtRQU9DOzs7Ozs7QUNQRCxRQUFBO1FBcUJJO1NBQWdCO2tCQXJCcEI7UUFzQkM7Ozs7Ozs7O1FDckJHLE9BQVE7UUFDUixRQUFTO1FBQ1QsT0FBUTtRQUNSLFFBQVM7UUFDVCxRQUFTOzt3QkFKVCxJQUFJO3dCQUNKLEtBQUs7d0JBQ0wsSUFBSTt3QkFDSixLQUFLO3dCQUNMLEtBQUs7O0lDTFQ7Ozs7Ozs7Ozs7Ozs7O0FBY0Esb0JBdUd1QixDQUFDLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFF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