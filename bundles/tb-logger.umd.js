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
                this.stompService.config = this.env.stompConfig;
                this.stompService.initAndConnect();
                this.stompService.state.subscribe(function (status) {
                    _this.mqConnectionState = status;
                    _this.mqConnectionStateObservable.next(status);
                });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL2VudHJpZXMubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9vcGVyYXRpb24tcmVzdWx0Lm1vZGVsLnRzIiwibmc6Ly9AdGIvbG9nZ2VyL2xpYi9tb2RlbHMvbG9nZ2VyLW9wZXJhdGlvbi1yZXN1bHQubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9sb2cubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9sb2ctc3RhdHVzLmVudW0udHMiLG51bGwsIm5nOi8vQHRiL2xvZ2dlci9saWIvc2VydmljZXMvdGItbG9nZ2VyLnNlcnZpY2UudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL2NvbXBvbmVudHMvbG9nZ2VyLXZpZXdlci9sb2dnZXItdmlld2VyLmNvbXBvbmVudC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL2NvbXBvbmVudHMvcmFiYml0LXZpZXdlci9yYWJiaXQtdmlld2VyLmNvbXBvbmVudC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvdGItbG9nZ2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRW50cmllc1BhcmFtcyB7XHJcbiAgICBhcHBJZDogc3RyaW5nO1xyXG4gICAgYXBwczogc3RyaW5nO1xyXG4gICAgYXBwVHlwZXM6IHN0cmluZztcclxuICAgIGNhdGVnb3JpZXM6IHN0cmluZztcclxuICAgIGhvd01hbnk6IHN0cmluZztcclxuICAgIG9mZlNldDogc3RyaW5nO1xyXG4gICAgbGV2ZWxzOiBzdHJpbmc7XHJcbiAgICB0ZXh0VG9GaW5kOiBzdHJpbmc7XHJcbiAgICB1c2VIaXN0b3J5OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBPcGVyYXRpb25SZXN1bHQge1xyXG4gICAgUmVzdWx0OiBib29sZWFuO1xyXG4gICAgTWVzc2FnZT86IHN0cmluZztcclxuICAgIENvZGU/OiBudW1iZXI7XHJcbiAgICBDb250ZW50PzogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0IHtcclxuICAgIFJlc3VsdDogYm9vbGVhbjtcclxuICAgIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgICBDb2RlPzogbnVtYmVyO1xyXG4gICAgQ29udGVudD86IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIExvZyB7XHJcbiAgICBfaWQ6IHN0cmluZztcclxuICAgIExvZ0VudHJ5OiB7XHJcbiAgICAgICAgQXBwOiBzdHJpbmc7IC8vIEVSUCwgUEFJLCBNREMsIFRCRlxyXG4gICAgICAgIFJlZ2lzdGVyZWRBcHBJZDogc3RyaW5nOyAvLyBpbnN0YW5jZSBrZXlcclxuICAgICAgICBSZWdpc3RlcmVkQXBwVHlwZTogc3RyaW5nOyAvLyBUQkxPQURFUiwgTkVUQ09SRSwgTkcsIFBST1ZJU0lPTklOR1xyXG4gICAgICAgIENhdGVnb3J5OiBzdHJpbmc7IC8vXHJcbiAgICAgICAgTW9kdWxlOiBzdHJpbmc7XHJcbiAgICAgICAgU3ViTW9kdWxlOiBzdHJpbmc7XHJcbiAgICAgICAgRG9jdW1lbnQ6IHN0cmluZztcclxuICAgICAgICBTdWJzY3JpcHRpb246IHN0cmluZztcclxuICAgICAgICBBY2NvdW50TmFtZTogc3RyaW5nO1xyXG4gICAgICAgIExpZmV0aW1lOiBzdHJpbmc7XHJcbiAgICAgICAgT3BlcmF0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgQ29udGV4dERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgTWV0aG9kOiBzdHJpbmc7XHJcbiAgICAgICAgRW50cnlDcmVhdGVkOiBzdHJpbmc7XHJcbiAgICAgICAgTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgICAgIExldmVsOiBudW1iZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgZW51bSBMb2dTdGF0dXMge1xyXG4gICAgSW5mbyA9IDAsXHJcbiAgICBEZWJ1ZyA9IDEsXHJcbiAgICBXYXJuID0gMixcclxuICAgIEVycm9yID0gMyxcclxuICAgIEZhdGFsID0gNFxyXG59XHJcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBFbnRyaWVzUGFyYW1zIH0gZnJvbSAnLi4vbW9kZWxzL2VudHJpZXMubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2dnZXJPcGVyYXRpb25SZXN1bHQgfSBmcm9tICcuLi9tb2RlbHMvbG9nZ2VyLW9wZXJhdGlvbi1yZXN1bHQubW9kZWwnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCB0YXAsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTdG9tcFJTZXJ2aWNlLCBTdG9tcENvbmZpZywgU3RvbXBTdGF0ZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICdAc3RvbXAvc3RvbXBqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyU2VydmljZSB7XHJcbiAgICBwdWJsaWMgbG9nZ2VyVXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGhvd01hbnkgPSAxMDA7XHJcblxyXG4gICAgcHVibGljIG1xQ29ubmVjdGlvblN0YXRlOiBTdG9tcFN0YXRlID0gU3RvbXBTdGF0ZS5DTE9TRUQ7XHJcbiAgICBwdWJsaWMgbXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlOiBCZWhhdmlvclN1YmplY3Q8U3RvbXBTdGF0ZT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFN0b21wU3RhdGUuQ0xPU0VEKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdlbnYnKSBwcml2YXRlIGVudiwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwdWJsaWMgc3RvbXBTZXJ2aWNlOiBTdG9tcFJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5tcUluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtcUluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2UuY29uZmlnID0gdGhpcy5lbnYuc3RvbXBDb25maWc7XHJcbiAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2UuaW5pdEFuZENvbm5lY3QoKTtcclxuICAgICAgICB0aGlzLnN0b21wU2VydmljZS5zdGF0ZS5zdWJzY3JpYmUoKHN0YXR1czogU3RvbXBTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlID0gc3RhdHVzO1xyXG4gICAgICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZS5uZXh0KHN0YXR1cyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSaXRvcm5hIGxhIGJhc2UgdXJsIGRlbCBsb2dnZXIsXHJcbiAgICAgKiBjYXJpY2F0YSBkYSB1biBmaWxlIGRpIGNvbmZpZ3VyYXppb25lIGNhcmljYXRvIGRpbmFtaWNhbWVudGUgKGFzc2V0cy9lbnZpcm9ubWVudC5qc29uKVxyXG4gICAgICovXHJcbiAgICBnZXRMb2dnZXJVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nZ2VyVXJsID8gdGhpcy5sb2dnZXJVcmwgOiB0aGlzLmVudi5sb2dnZXIudXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS5sb2cgaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBsb2cobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS5sb2cgaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBkZWJ1ZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLndhcm4gaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICB3YXJuKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLmVycm9yIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZXJyb3IobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gbG9nczogTG9nZ2VyT3BlcmF0aW9uUmVzdWx0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhcmFtczogRW50cmllc1BhcmFtc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TG9ncyhwYXJhbXM6IEVudHJpZXNQYXJhbXMpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIXBhcmFtcy5hcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IuUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLk1lc3NhZ2UgPSAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBlbnRyaWVzLyR7cGFyYW1zLmFwcElkfWA7XHJcblxyXG4gICAgICAgIGxldCBwID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgICBwID0gcC5hcHBlbmQoJ2hvd01hbnknLCAnJyArIHRoaXMuaG93TWFueSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcHBzKSBwID0gcC5hcHBlbmQoJ2FwcHMnLCBwYXJhbXMuYXBwcyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcHBUeXBlcykgcCA9IHAuYXBwZW5kKCdhcHBUeXBlcycsIHBhcmFtcy5hcHBUeXBlcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCwgaHR0cE9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldExvZ3MnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRMb2dzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFwcHMoYXBwSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLlJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5NZXNzYWdlID0gJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFwcFR5cGVzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5SZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IuTWVzc2FnZSA9ICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcFR5cGVzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIEh0dHAgb3BlcmF0aW9uIHRoYXQgZmFpbGVkLlxyXG4gICAgICogTGV0IHRoZSBhcHAgY29udGludWUuXHJcbiAgICAgKiBAcGFyYW0gb3BlcmF0aW9uIC0gbmFtZSBvZiB0aGUgb3BlcmF0aW9uIHRoYXQgZmFpbGVkXHJcbiAgICAgKiBAcGFyYW0gcmVzdWx0IC0gb3B0aW9uYWwgdmFsdWUgdG8gcmV0dXJuIGFzIHRoZSBvYnNlcnZhYmxlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFuZGxlRXJyb3I8VD4ob3BlcmF0aW9uID0gJ29wZXJhdGlvbicsIHJlc3VsdD86IFQpIHtcclxuICAgICAgICByZXR1cm4gKGVycm9yOiBhbnkpOiBPYnNlcnZhYmxlPFQ+ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtvcGVyYXRpb259IGZhaWxlZDogJHtlcnJvci5tZXNzYWdlfWApO1xyXG5cclxuICAgICAgICAgICAgLy8gTGV0IHRoZSBhcHAga2VlcCBydW5uaW5nIGJ5IHJldHVybmluZyBhbiBlbXB0eSByZXN1bHQuXHJcbiAgICAgICAgICAgIHJldHVybiBvZihyZXN1bHQgYXMgVCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbm5lc3Npb25lIGEgUmFiYml0TVFcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1xQ29ubmVjdChxdWV1ZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5zdWJzY3JpYmUocXVldWVOYW1lKS5waXBlKG1hcCgobXNnOiBNZXNzYWdlKSA9PiBKU09OLnBhcnNlKG1zZy5ib2R5KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtcUNvbm5lY3RlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9tcFNlcnZpY2UuY29ubmVjdGVkKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbXFEaXNjb25uZWN0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvbG9nLm1vZGVsJztcclxuaW1wb3J0IHsgTG9nU3RhdHVzIH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvbG9nLXN0YXR1cy5lbnVtJztcclxuaW1wb3J0IHsgVGJMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy90Yi1sb2dnZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IExvZ2dlck9wZXJhdGlvblJlc3VsdCB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL2xvZ2dlci1vcGVyYXRpb24tcmVzdWx0Lm1vZGVsJztcclxuXHJcbmltcG9ydCB7IGRlbGF5LCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgRW50cmllc1BhcmFtcyB9IGZyb20gJy4uLy4uL21vZGVscy9lbnRyaWVzLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0Yi1sb2dnZXItdmlld2VyJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgIDxsYWJlbCBpZD1cImxvZ2dlci11cmwtbGFiZWxcIiBjbGFzcz1cImgtbGFiZWxcIiBmb3I9XCJsb2dnZXItdXJsXCI+TG9nZ2VyIFVSTDo8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBrZW5kb1RleHRCb3ggaWQ9XCJsb2dnZXItdXJsXCIgWyhuZ01vZGVsKV09XCJsb2dnZXJVcmxcIiAoYmx1cik9XCJzZXRMb2dnZXJVcmwoJGV2ZW50KVwiIChjbGljayk9XCIkZXZlbnQudGFyZ2V0LnNlbGVjdCgpXCIgLz5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImstaWNvbiBrLWktcmVzZXQgXCIgKGNsaWNrKT1cImdldExvZ3MoKVwiPjwvc3Bhbj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImF1dG9yZWZyZXNoXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImF1dG9SZWZyZXNoXCIgY2xhc3M9XCJrLWNoZWNrYm94XCIgW25nTW9kZWxdPVwiY2hlY2tlZFwiIChuZ01vZGVsQ2hhbmdlKT1cImNoZWNrQXV0b1JlZnJlc2goJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJrLWNoZWNrYm94LWxhYmVsXCIgZm9yPVwiYXV0b1JlZnJlc2hcIj5BdXRvIHJlZnJlc2ggKDVzKTwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlclwiPlxyXG4gICAgICAgICAgICA8IS0tIEFQUCBJRCAtLT5cclxuICAgICAgICAgICAgPGxhYmVsIGlkPVwibG9nZ2VyLWFwcC1pZC1sYWJlbFwiIGNsYXNzPVwiaC1sYWJlbFwiIGZvcj1cImxvZ2dlci1hcHAtaWRcIiAoY2xpY2spPVwiYXBwTGlzdEluaXQoKVwiPkluc3RhbmNlIEtleTo8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQga2VuZG9UZXh0Qm94ICNhcHBJZElucHV0IFsobmdNb2RlbCldPVwiYXBwSWRcIiAoYmx1cik9XCJzZXRBcHBJZCgkZXZlbnQpXCIgaWQ9XCJrYS1hcHAtaWRcIiAoY2xpY2spPVwiJGV2ZW50LnRhcmdldC5zZWxlY3QoKVwiXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImUuZy4gMmQxMzZjNjEtYWFjMi00NDJkLTkyNmMtYTUzMWMzNjg1MDM1XCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlclwiPlxyXG4gICAgICAgICAgICA8IS0tIEFQUCAtLT5cclxuICAgICAgICAgICAgPGxhYmVsIGlkPVwibG9nZ2VyLWFwcC1sYWJlbFwiIGNsYXNzPVwiaC1sYWJlbFwiIGZvcj1cImxvZ2dlci1hcHBcIj5BcHA6PC9sYWJlbD5cclxuICAgICAgICAgICAgPGtlbmRvLWF1dG9jb21wbGV0ZSAjYXBwTGlzdCBbZGF0YV09XCJhcHBEYXRhXCIgW3N1Z2dlc3RdPVwidHJ1ZVwiIFtwbGFjZWhvbGRlcl09XCInZS5nLiBFUlAsIE1EQywgVEJGJ1wiXHJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImFwcFwiICh2YWx1ZUNoYW5nZSk9XCJzZXRBcHAoJGV2ZW50KVwiIGlkPVwia2EtYXBwXCI+XHJcbiAgICAgICAgICAgIDwva2VuZG8tYXV0b2NvbXBsZXRlPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyXCI+XHJcbiAgICAgICAgICAgIDwhLS0gQVBQIFRZUEUgLS0+XHJcbiAgICAgICAgICAgIDxsYWJlbCBpZD1cImxvZ2dlci1hcHAtdHlwZS1sYWJlbFwiIGNsYXNzPVwiaC1sYWJlbFwiIGZvcj1cImxvZ2dlci1hcHAtdHlwZVwiPkFwcFR5cGU6PC9sYWJlbD5cclxuICAgICAgICAgICAgPGtlbmRvLWF1dG9jb21wbGV0ZSAjYXBwVHlwZUxpc3QgW2RhdGFdPVwiYXBwVHlwZURhdGFcIiBbc3VnZ2VzdF09XCJ0cnVlXCIgW3BsYWNlaG9sZGVyXT1cIidlLmcuIFRCTE9BREVSLCBORVRDT1JFLCBORydcIlxyXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJhcHBUeXBlXCIgKHZhbHVlQ2hhbmdlKT1cInNldEFwcFR5cGUoJGV2ZW50KVwiIGlkPVwia2EtYXBwLXR5cGVcIj5cclxuICAgICAgICAgICAgPC9rZW5kby1hdXRvY29tcGxldGU+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibm90aWZ5XCIgKm5nSWY9XCJtZXNzYWdlXCI+XHJcbiAgICAgICAgPHA+e3ttZXNzYWdlfX08L3A+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwibW9uaXRvclwiPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nXCIgKm5nSWY9XCJsb2FkaW5nXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJrLWljb24gay1pLWxvYWRpbmdcIj48L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8dWwgY2xhc3M9XCJsb2dzXCIgKm5nSWY9XCIhbG9hZGluZ1wiPlxyXG4gICAgICAgIDxsaSAqbmdJZj1cImxvZ3MubGVuZ3RoID09IDBcIiBjbGFzcz1cIm5vLWxvZ3NcIj5ObyBMb2dzIHdpdGggYXBwSWQ6PHN0cm9uZz57e2FwcElkfX08L3N0cm9uZz48L2xpPlxyXG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbG9nIG9mIGxvZ3NcIiBjbGFzcz1cImxvZ1wiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtZGF0ZVwiPnt7bG9nLkxvZ0VudHJ5LkVudHJ5Q3JlYXRlZCB8IGRhdGU6ICdtZWRpdW0nIH19IDwvc3Bhbj4gLVxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtYWNjb3VudC1uYW1lXCI+IHt7bG9nLkxvZ0VudHJ5LkFjY291bnROYW1lIH19IDwvc3Bhbj4gLVxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtYXBwXCIgKm5nSWY9XCJsb2cuTG9nRW50cnkuQXBwXCI+IHt7bG9nLkxvZ0VudHJ5LkFwcCB9fSAtPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtdHlwZVwiICpuZ0lmPVwibG9nLkxvZ0VudHJ5LlJlZ2lzdGVyZWRBcHBUeXBlXCI+IHt7bG9nLkxvZ0VudHJ5LlJlZ2lzdGVyZWRBcHBUeXBlIH19IC08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1jYXRlZ29yeVwiICpuZ0lmPVwibG9nLkxvZ0VudHJ5LkNhdGVnb3J5XCI+IHt7bG9nLkxvZ0VudHJ5LkNhdGVnb3J5IH19IC08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1zdGF0dXMgbGV2ZWwte3tsb2cuTG9nRW50cnkuTGV2ZWx9fVwiPlt7e2xvZ1N0YXR1c1tsb2cuTG9nRW50cnkuTGV2ZWxdfX1dPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtbXNnXCI+IHt7bG9nLkxvZ0VudHJ5Lk1lc3NhZ2V9fSA8L3NwYW4+XHJcbiAgICAgICAgPC9saT5cclxuICAgIDwvdWw+XHJcbjwvZGl2PmAsXHJcbiAgICBzdHlsZXM6IFtgOmhvc3QodGItbG9nZ2VyLXZpZXdlcil7ZmxleDoxO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLm5vdGlmeXtiYWNrZ3JvdW5kOiNmZjBiMGI7cGFkZGluZzo1cHggMTBweDttYXJnaW46MTBweCAwO2NvbG9yOiNmZmZ9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLm5vdGlmeSBwe21hcmdpbjo1cHggMDtmb250LXNpemU6MTJweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVye2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47bWFyZ2luOjMwcHggMCAxMHB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgLnJvd3tkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2FsaWduLWl0ZW1zOmNlbnRlcjttYXJnaW46NXB4IDB9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAucm93LmZsZXgtY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAucm93LmZsZXgtYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAucm93LmZsZXgtYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIC5yb3cgLmZpbHRlciAja2EtYXBwLWlke3dpZHRoOjMzMHB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgbGFiZWwuaC1sYWJlbHtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjAgMTBweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyICNsb2dnZXItdXJse3dpZHRoOjUwMHB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgLmstY2hlY2tib3gtbGFiZWx7Zm9udC1zaXplOjEycHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLm1vbml0b3J7ZGlzcGxheTpmbGV4O2ZsZXg6MTtiYWNrZ3JvdW5kOiNmMWYxZjE7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO3BhZGRpbmc6MDttYXJnaW46NXB4IDB9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLm1vbml0b3IgLmxvYWRpbmd7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2ZsZXg6MX06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubW9uaXRvciAubG9hZGluZyAuay1pLWxvYWRpbmd7Zm9udC1zaXplOjM0cHg7Y29sb3I6Izk5OX06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuay1pLXJlc2V0e21hcmdpbi1yaWdodDoxMHB4O2NvbG9yOiMwMjc3YmQ7Ym9yZGVyOm5vbmU7cGFkZGluZzo1cHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmstaS1yZXNldDpob3ZlcntjdXJzb3I6cG9pbnRlcjtjb2xvcjojMjIyfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIGhye2JhY2tncm91bmQ6IzAyNzdiZDtoZWlnaHQ6MXB4O2JvcmRlcjpub25lfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dze21hcmdpbjowO3BhZGRpbmc6NXB4O2xpc3Qtc3R5bGU6bm9uZTtvdmVyZmxvdzphdXRvO2ZsZXg6MX06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubm8tbG9nc3tmb250LXNpemU6MTJweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubm8tbG9ncyBzdHJvbmd7Zm9udC13ZWlnaHQ6NTAwfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2d7Zm9udC1zaXplOjEycHg7bWFyZ2luOjNweCAwfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtZGF0ZXtjb2xvcjojOTk5fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtYWNjb3VudC1uYW1le2NvbG9yOiMwMGZ9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1zdGF0dXN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO21hcmdpbjowIDNweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLXN0YXR1cy5sZXZlbC0we2NvbG9yOiMwMDB9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1zdGF0dXMubGV2ZWwtMXtjb2xvcjojMDBmfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtc3RhdHVzLmxldmVsLTJ7Y29sb3I6b3JhbmdlfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtc3RhdHVzLmxldmVsLTN7Y29sb3I6cmVkfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtc3RhdHVzLmxldmVsLTR7Y29sb3I6cmVkfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dnZXJWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gICAgLy8gaW5zdGFuY2Uga2V5XHJcbiAgICBAVmlld0NoaWxkKCdhcHBJZElucHV0JylcclxuICAgIGFwcElkSW5wdXQ7XHJcbiAgICBhcHBJZDogc3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcElkJykgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwSWQnKSA6ICcnO1xyXG5cclxuICAgIC8vIGFwcFxyXG4gICAgQFZpZXdDaGlsZCgnYXBwTGlzdCcpXHJcbiAgICBhcHBMaXN0O1xyXG4gICAgcHVibGljIGFwcERhdGE6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIGFwcDogc3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcCcpID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcCcpIDogJyc7XHJcblxyXG4gICAgLy8gYXBwIHR5cGVzXHJcbiAgICBAVmlld0NoaWxkKCdhcHBUeXBlTGlzdCcpXHJcbiAgICBhcHBUeXBlTGlzdDtcclxuICAgIHB1YmxpYyBhcHBUeXBlRGF0YTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgYXBwVHlwZTogc3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcFR5cGUnKSA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBUeXBlJykgOiAnJztcclxuXHJcbiAgICBsb2dzOiBMb2dbXSA9IFtdO1xyXG4gICAgbG9nU3RhdHVzID0gTG9nU3RhdHVzO1xyXG4gICAgc2hvdyA9IGZhbHNlO1xyXG4gICAgbG9hZGluZyA9IGZhbHNlO1xyXG4gICAgaG93TWFueSA9IDEwMDtcclxuICAgIGNoZWNrZWQgPSBmYWxzZTtcclxuICAgIGF1dG9SZWZyZXNoID0gZmFsc2U7XHJcbiAgICBhdXRvUmVmcmVzaEludGVydmFsOiBhbnk7XHJcbiAgICBtZXNzYWdlID0gJyc7XHJcblxyXG4gICAgbG9nZ2VyVXJsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlclVybCcpID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlclVybCcpIDogdGhpcy5sb2dnZXJTZXJ2aWNlLmdldExvZ2dlclVybCgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2dnZXJTZXJ2aWNlOiBUYkxvZ2dlclNlcnZpY2UpIHt9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5hcHBMaXN0SW5pdCgpO1xyXG4gICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHt9XHJcblxyXG4gICAgLy8gbGVnZ28gdHV0dGUgbGUgYXBwLCBnbGkgYXBwSWQgZSBnbGkgYXBwVHlwZSBlIGxpIHNhbHZvIGluIHJpc3BldHRpdmkgYXJyYXlcclxuICAgIC8vIHZlcnJhbm5vIHBvaSBmaWx0cmF0aSBkYWkgY29tcG9uZW50aSBrZW5kb1xyXG4gICAgYXBwTGlzdEluaXQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcElkKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmdldEFwcHModGhpcy5hcHBJZCkuc3Vic2NyaWJlKChvcDogTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwRGF0YSA9IG9wLkNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwTGlzdC5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzKHRoaXMuYXBwSWQpLnN1YnNjcmliZSgob3A6IExvZ2dlck9wZXJhdGlvblJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFwcFR5cGVEYXRhID0gb3AuQ29udGVudDtcclxuICAgICAgICAgICAgdGhpcy5hcHBUeXBlTGlzdC5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldExvZ3MoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICdJbnN0YW5jZSBLZXkgbWFuY2FudGUnO1xyXG4gICAgICAgICAgICB0aGlzLmFwcElkSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgRW50cmllc1BhcmFtcygpO1xyXG4gICAgICAgIHBhcmFtcy5hcHBJZCA9IHRoaXMuYXBwSWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwKSBwYXJhbXMuYXBwcyA9IHRoaXMuYXBwO1xyXG4gICAgICAgIGlmICh0aGlzLmFwcFR5cGUpIHBhcmFtcy5hcHBUeXBlcyA9IHRoaXMuYXBwVHlwZTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmdldExvZ3MocGFyYW1zKS5zdWJzY3JpYmUoKG9wOiBMb2dnZXJPcGVyYXRpb25SZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFvcC5SZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IG9wLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5sb2dzID0gb3AuQ29udGVudDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRMb2dnZXJVcmwoZXZlbnQpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9nZ2VyVXJsJywgdGhpcy5sb2dnZXJVcmwpO1xyXG4gICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRBcHAoJGV2ZW50KSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcCcsIHRoaXMuYXBwKTtcclxuICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QXBwSWQoJGV2ZW50KSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcElkJywgdGhpcy5hcHBJZCk7XHJcbiAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEFwcFR5cGUoJGV2ZW50KSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcFR5cGUnLCB0aGlzLmFwcFR5cGUpO1xyXG4gICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuYXV0b1JlZnJlc2hJbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrQXV0b1JlZnJlc2goZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuYXV0b1JlZnJlc2ggPSAhdGhpcy5hdXRvUmVmcmVzaDtcclxuICAgICAgICBpZiAodGhpcy5hdXRvUmVmcmVzaCkge1xyXG4gICAgICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRvUmVmcmVzaEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9SZWZyZXNoSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hdXRvUmVmcmVzaEludGVydmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1ub3RpZmljYXRpb24nO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYk5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7fVxyXG5cclxuICAgIHB1YmxpYyBzaG93KG1zZywgc3R5bGU6IGFueSA9ICdub25lJyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93KHtcclxuICAgICAgICAgICAgY29udGVudDogbXNnLFxyXG4gICAgICAgICAgICBhbmltYXRpb246IHsgdHlwZTogJ3NsaWRlJywgZHVyYXRpb246IDIwMCB9LFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogeyBob3Jpem9udGFsOiAncmlnaHQnLCB2ZXJ0aWNhbDogJ2JvdHRvbScgfSxcclxuICAgICAgICAgICAgdHlwZTogeyBzdHlsZTogc3R5bGUsIGljb246IHRydWUgfSxcclxuICAgICAgICAgICAgaGlkZUFmdGVyOiA0MDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFN0b21wU3RhdGUgfSBmcm9tICdAc3RvbXAvbmcyLXN0b21wanMnO1xyXG5cclxuaW1wb3J0IHsgTG9nU3RhdHVzIH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvbG9nLXN0YXR1cy5lbnVtJztcclxuaW1wb3J0IHsgVGJMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy90Yi1sb2dnZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFRiTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0Yi1yYWJiaXQtdmlld2VyJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgIDxsYWJlbCBpZD1cIm1xLXF1ZXVlLW5hbWUtbGFiZWxcIiBjbGFzcz1cImgtbGFiZWxcIiBmb3I9XCJtcS1jb25uZWN0aW9uLXN0YXRlXCI+TVEgQ29ubmVjdGlvbiBzdGF0ZTo8L2xhYmVsPlxyXG4gICAgICAgIDxwIGlkPVwibXEtY29ubmVjdGlvbi1zdGF0ZVwiPnt7c3RvbXBTdGF0ZVtsb2dnZXJTZXJ2aWNlLm1xQ29ubmVjdGlvblN0YXRlXX19PC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgPGxhYmVsIGlkPVwibXEtcXVldWUtbmFtZS1sYWJlbFwiIGNsYXNzPVwiaC1sYWJlbFwiIGZvcj1cIm1xLXF1ZXVlXCI+UXVldWUgTmFtZTo8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBrZW5kb1RleHRCb3ggaWQ9XCJtcS1xdWV1ZS1uYW1lXCIgWyhuZ01vZGVsKV09XCJtcVF1ZXVlTmFtZVwiIChjbGljayk9XCIkZXZlbnQudGFyZ2V0LnNlbGVjdCgpXCIgLz5cclxuICAgICAgICA8YnV0dG9uIGtlbmRvQnV0dG9uIChjbGljayk9XCJtcVN1YnNjcmliZSgpXCIgW2Rpc2FibGVkXT1cImxvZ2dlclNlcnZpY2UubXFDb25uZWN0aW9uU3RhdGUgIT09IHN0b21wU3RhdGUuQ09OTkVDVEVEXCI+Q29ubmVjdDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG48ZGl2IGNsYXNzPVwibW9uaXRvclwiPlxyXG4gICAgPHVsIGNsYXNzPVwibWVzc2FnZXNcIj5cclxuICAgICAgICA8bGkgKm5nSWY9XCJtcU1lc3NhZ2VzLmxlbmd0aCA9PSAwXCIgY2xhc3M9XCJuby1tZXNzYWdlc1wiPk5vIG1lc3NhZ2VzIGluIHF1ZXVlOjxzdHJvbmc+e3ttcVF1ZXVlTmFtZX19PC9zdHJvbmc+PC9saT5cclxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG0gb2YgbXFNZXNzYWdlc1wiIGNsYXNzPVwibWVzc2FnZVwiPlxyXG4gICAgICAgICAgICA8IS0tIDxzcGFuIGNsYXNzPVwibC1tc2dcIj4ge3ttLlVQTWVzc2FnZX19IDwvc3Bhbj4gLS0+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1kYXRlXCI+e3ttLlVQQ29udGVudC5FbnRyeUNyZWF0ZWQgfCBkYXRlOiAnbWVkaXVtJyB9fSA8L3NwYW4+IC1cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWFjY291bnQtbmFtZVwiPiB7e20uVVBDb250ZW50LkFjY291bnROYW1lIH19IDwvc3Bhbj4gLVxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtYXBwXCIgKm5nSWY9XCJtLlVQQ29udGVudC5BcHBcIj4ge3ttLlVQQ29udGVudC5BcHAgfX0gLTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLXR5cGVcIiAqbmdJZj1cIm0uVVBDb250ZW50LlJlZ2lzdGVyZWRBcHBUeXBlXCI+IHt7bS5VUENvbnRlbnQuUmVnaXN0ZXJlZEFwcFR5cGUgfX0gLTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWNhdGVnb3J5XCIgKm5nSWY9XCJtLlVQQ29udGVudC5DYXRlZ29yeVwiPiB7e20uVVBDb250ZW50LkNhdGVnb3J5IH19IC08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1zdGF0dXMgbGV2ZWwte3ttLlVQQ29udGVudC5MZXZlbH19XCI+IFt7e2xvZ1N0YXR1c1ttLlVQQ29udGVudC5MZXZlbF19fV08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1tc2dcIj4ge3ttLlVQQ29udGVudC5NZXNzYWdlfX0gPC9zcGFuPlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG48L2Rpdj5gLFxyXG4gICAgc3R5bGVzOiBbYDpob3N0KHRiLXJhYmJpdC12aWV3ZXIpe2ZsZXg6MTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5ub3RpZnl7YmFja2dyb3VuZDojZmYwYjBiO3BhZGRpbmc6NXB4IDEwcHg7bWFyZ2luOjEwcHggMDtjb2xvcjojZmZmfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5ub3RpZnkgcHttYXJnaW46NXB4IDA7Zm9udC1zaXplOjEycHh9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmhlYWRlcntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXIgLnJvd3tkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2FsaWduLWl0ZW1zOmNlbnRlcjttYXJnaW46NXB4IDB9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmhlYWRlciAucm93LmZsZXgtY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmhlYWRlciAucm93LmZsZXgtYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmhlYWRlciAucm93LmZsZXgtYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIC5yb3cgI21xLXF1ZXVlLW5hbWV7d2lkdGg6NTAwcHh9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmhlYWRlciBsYWJlbC5oLWxhYmVse2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MTRweDttYXJnaW46MCAxMHB4fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXIgLmstY2hlY2tib3gtbGFiZWx7Zm9udC1zaXplOjEycHh9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1vbml0b3J7ZGlzcGxheTpmbGV4O2ZsZXg6MTtiYWNrZ3JvdW5kOiNmMWYxZjE7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO3BhZGRpbmc6MDttYXJnaW46NXB4IDB9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1vbml0b3IgLmxvYWRpbmd7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2ZsZXg6MX06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubW9uaXRvciAubG9hZGluZyAuay1pLWxvYWRpbmd7Zm9udC1zaXplOjM0cHg7Y29sb3I6Izk5OX06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuay1pLXJlc2V0e21hcmdpbi1yaWdodDoxMHB4O2NvbG9yOiMwMjc3YmQ7Ym9yZGVyOm5vbmU7cGFkZGluZzo1cHh9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmstaS1yZXNldDpob3ZlcntjdXJzb3I6cG9pbnRlcjtjb2xvcjojMjIyfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIGhye2JhY2tncm91bmQ6IzAyNzdiZDtoZWlnaHQ6MXB4O2JvcmRlcjpub25lfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlc3ttYXJnaW46MDtwYWRkaW5nOjVweDtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6YXV0bztmbGV4OjF9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5uby1sb2dze2ZvbnQtc2l6ZToxMnB4fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubm8tbG9ncyBzdHJvbmd7Zm9udC13ZWlnaHQ6NTAwfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZXtmb250LXNpemU6MTJweDttYXJnaW46M3B4IDB9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLWRhdGV7Y29sb3I6Izk5OX06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtYWNjb3VudC1uYW1le2NvbG9yOiMwMGZ9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLXN0YXR1c3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bWFyZ2luOjAgM3B4fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1zdGF0dXMubGV2ZWwtMHtjb2xvcjojMDAwfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1zdGF0dXMubGV2ZWwtMXtjb2xvcjojMDBmfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1zdGF0dXMubGV2ZWwtMntjb2xvcjpvcmFuZ2V9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLXN0YXR1cy5sZXZlbC0ze2NvbG9yOnJlZH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtc3RhdHVzLmxldmVsLTR7Y29sb3I6cmVkfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSYWJiaXRWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gICAgc3RvbXBTdGF0ZSA9IFN0b21wU3RhdGU7XHJcbiAgICBsb2dTdGF0dXMgPSBMb2dTdGF0dXM7XHJcblxyXG4gICAgbXFDb25uZWN0aW9uU3RhdGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIG1xQ29ubmVjdGlvblN0YXRlOiBTdG9tcFN0YXRlO1xyXG5cclxuICAgIG1xUXVldWU6IFN1YnNjcmlwdGlvbjtcclxuICAgIG1xUXVldWVOYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21xUXVldWVOYW1lJykgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbXFRdWV1ZU5hbWUnKSA6ICcnO1xyXG5cclxuICAgIHB1YmxpYyBtcU1lc3NhZ2VzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGxvZ2dlclNlcnZpY2U6IFRiTG9nZ2VyU2VydmljZSwgcHJpdmF0ZSBub3RpZmljYXRpb25TZXJ2aWNlOiBUYk5vdGlmaWNhdGlvblNlcnZpY2UpIHt9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5tcUNvbm5lY3Rpb25TdGF0ZVN1YnNjcmlwdGlvbiA9IHRoaXMubG9nZ2VyU2VydmljZS5tcUNvbm5lY3Rpb25TdGF0ZU9ic2VydmFibGUuc3Vic2NyaWJlKHN0YXR1cyA9PlxyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlTXFTdGF0ZShzdGF0dXMpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7fVxyXG5cclxuICAgIHByaXZhdGUgb25DaGFuZ2VNcVN0YXRlKHN0YXR1czogU3RvbXBTdGF0ZSkge1xyXG4gICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGUgPSBzdGF0dXM7XHJcblxyXG4gICAgICAgIGlmIChzdGF0dXMgPT09IFN0b21wU3RhdGUuQ09OTkVDVEVEICYmIHRoaXMubXFRdWV1ZU5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5tcVN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbXFTdWJzY3JpYmUoKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ21xUXVldWVOYW1lJywgdGhpcy5tcVF1ZXVlTmFtZSk7XHJcbiAgICAgICAgY29uc3QgcXVldWVOYW1lID0gYC9xdWV1ZS8ke3RoaXMubXFRdWV1ZU5hbWV9YDtcclxuICAgICAgICB0aGlzLm1xUXVldWUgPSB0aGlzLmxvZ2dlclNlcnZpY2UubXFDb25uZWN0KHF1ZXVlTmFtZSkuc3Vic2NyaWJlKG1zZyA9PiB0aGlzLm9uTWVzc2FnZShtc2cpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTWVzc2FnZShtc2cpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUmFiYml0Vmlld2VyQ29tcG9uZW50Lm9uTWVzc2FnZScsIG1zZyk7XHJcblxyXG4gICAgICAgIHRoaXMubXFNZXNzYWdlcy5wdXNoKG1zZyk7XHJcblxyXG4gICAgICAgIGxldCBzdHlsZSA9ICdub25lJztcclxuICAgICAgICBpZiAobXNnLlVQQ29udGVudCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG1zZy5VUENvbnRlbnQuTGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9nU3RhdHVzLldhcm46XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSAnd2FybmluZyc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIExvZ1N0YXR1cy5FcnJvcjpcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9nU3RhdHVzLkZhdGFsOlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0gJ2Vycm9yJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3cobXNnLlVQTWVzc2FnZSwgc3R5bGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQnV0dG9uc01vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLWJ1dHRvbnMnO1xyXG5pbXBvcnQgeyBEcm9wRG93bnNNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1kcm9wZG93bnMnO1xyXG5pbXBvcnQgeyBJbnB1dHNNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1pbnB1dHMnO1xyXG5pbXBvcnQgeyBEYXRlSW5wdXRzTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItZGF0ZWlucHV0cyc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbk1vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLW5vdGlmaWNhdGlvbic7XHJcblxyXG5pbXBvcnQgeyBTdG9tcFJTZXJ2aWNlIH0gZnJvbSAnQHN0b21wL25nMi1zdG9tcGpzJztcclxuXHJcbmltcG9ydCB7IExvZ2dlclZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9sb2dnZXItdmlld2VyL2xvZ2dlci12aWV3ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUmFiYml0Vmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3JhYmJpdC12aWV3ZXIvcmFiYml0LXZpZXdlci5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE5vdGlmaWNhdGlvbk1vZHVsZSwgQnV0dG9uc01vZHVsZSwgSW5wdXRzTW9kdWxlLCBEYXRlSW5wdXRzTW9kdWxlLCBGb3Jtc01vZHVsZSwgRHJvcERvd25zTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW0xvZ2dlclZpZXdlckNvbXBvbmVudCwgUmFiYml0Vmlld2VyQ29tcG9uZW50XSxcclxuICAgIGV4cG9ydHM6IFtMb2dnZXJWaWV3ZXJDb21wb25lbnQsIFJhYmJpdFZpZXdlckNvbXBvbmVudF0sXHJcbiAgICBwcm92aWRlcnM6IFtTdG9tcFJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGJMb2dnZXJNb2R1bGUge1xyXG4gICAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmdNb2R1bGU6IFRiTG9nZ2VyTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtTdG9tcFJTZXJ2aWNlXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlN0b21wU3RhdGUiLCJCZWhhdmlvclN1YmplY3QiLCJvZiIsIkh0dHBQYXJhbXMiLCJ0YXAiLCJjYXRjaEVycm9yIiwibWFwIiwiSW5qZWN0YWJsZSIsIkluamVjdCIsIkh0dHBDbGllbnQiLCJTdG9tcFJTZXJ2aWNlIiwiQ29tcG9uZW50IiwiVmlld0NoaWxkIiwiTm90aWZpY2F0aW9uU2VydmljZSIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiTm90aWZpY2F0aW9uTW9kdWxlIiwiQnV0dG9uc01vZHVsZSIsIklucHV0c01vZHVsZSIsIkRhdGVJbnB1dHNNb2R1bGUiLCJGb3Jtc01vZHVsZSIsIkRyb3BEb3duc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFFBQUE7UUFXSTtTQUFnQjs0QkFYcEI7UUFZQzs7Ozs7O0FDWkQsUUFBQTtRQU1JO1NBQWdCOzhCQU5wQjtRQU9DOzs7Ozs7QUNQRCxRQUFBO1FBTUk7U0FBZ0I7b0NBTnBCO1FBT0M7Ozs7OztBQ1BELFFBQUE7UUFxQkk7U0FBZ0I7a0JBckJwQjtRQXNCQzs7Ozs7Ozs7UUNyQkcsT0FBUTtRQUNSLFFBQVM7UUFDVCxPQUFRO1FBQ1IsUUFBUztRQUNULFFBQVM7O3dCQUpULElBQUk7d0JBQ0osS0FBSzt3QkFDTCxJQUFJO3dCQUNKLEtBQUs7d0JBQ0wsS0FBSzs7SUNMVDs7Ozs7Ozs7Ozs7Ozs7QUFjQSxvQkF1R3VCLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSTtZQUNBLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUk7Z0JBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUU7UUFDRCxPQUFPLEtBQUssRUFBRTtZQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztTQUFFO2dCQUMvQjtZQUNKLElBQUk7Z0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRDtvQkFDTztnQkFBRSxJQUFJLENBQUM7b0JBQUUsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQUU7U0FDcEM7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7QUFFRDtRQUNJLEtBQUssSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQzlDLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7OztRQ3RIRyx5QkFBbUMsR0FBRyxFQUFVLElBQWdCLEVBQVMsWUFBMkI7WUFBakUsUUFBRyxHQUFILEdBQUcsQ0FBQTtZQUFVLFNBQUksR0FBSixJQUFJLENBQVk7WUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBZTsyQkFMbEYsR0FBRztxQ0FFa0JBLGFBQVUsQ0FBQyxNQUFNOytDQUNVLElBQUlDLG9CQUFlLENBQUNELGFBQVUsQ0FBQyxNQUFNLENBQUM7WUFHcEcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCOzs7O1FBRUQsZ0NBQU07OztZQUFOO2dCQUFBLGlCQU9DO2dCQU5HLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQyxNQUFrQjtvQkFDakQsS0FBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztvQkFDaEMsS0FBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDakQsQ0FBQyxDQUFDO2FBQ047Ozs7Ozs7Ozs7UUFNRCxzQ0FBWTs7Ozs7WUFBWjtnQkFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDaEU7Ozs7Ozs7Ozs7Ozs7O1FBUUQsNkJBQUc7Ozs7Ozs7WUFBSCxVQUFJLE9BQWE7Z0JBQUUsd0JBQXdCO3FCQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7b0JBQXhCLHVDQUF3Qjs7Z0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLE9BQVgsT0FBTyxZQUFLLE9BQU8sR0FBSyxjQUFjLEdBQUU7YUFDM0M7Ozs7Ozs7Ozs7Ozs7O1FBUUQsK0JBQUs7Ozs7Ozs7WUFBTCxVQUFNLE9BQWE7Z0JBQUUsd0JBQXdCO3FCQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7b0JBQXhCLHVDQUF3Qjs7Z0JBQ3pDLE9BQU8sQ0FBQyxHQUFHLE9BQVgsT0FBTyxZQUFLLE9BQU8sR0FBSyxjQUFjLEdBQUU7YUFDM0M7Ozs7Ozs7Ozs7Ozs7O1FBUUQsOEJBQUk7Ozs7Ozs7WUFBSixVQUFLLE9BQWE7Z0JBQUUsd0JBQXdCO3FCQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7b0JBQXhCLHVDQUF3Qjs7Z0JBQ3hDLE9BQU8sQ0FBQyxJQUFJLE9BQVosT0FBTyxZQUFNLE9BQU8sR0FBSyxjQUFjLEdBQUU7YUFDNUM7Ozs7Ozs7Ozs7Ozs7O1FBUUQsK0JBQUs7Ozs7Ozs7WUFBTCxVQUFNLE9BQWE7Z0JBQUUsd0JBQXdCO3FCQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7b0JBQXhCLHVDQUF3Qjs7Z0JBQ3pDLE9BQU8sQ0FBQyxLQUFLLE9BQWIsT0FBTyxZQUFPLE9BQU8sR0FBSyxjQUFjLEdBQUU7YUFDN0M7Ozs7Ozs7UUFPTSxpQ0FBTzs7Ozs7O3NCQUFDLE1BQXFCO2dCQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTs7b0JBQ2YsSUFBTSxLQUFLLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO29CQUMxQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDckIsS0FBSyxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztvQkFDN0MsT0FBT0UsT0FBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNwQjs7Z0JBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFHLGFBQVcsTUFBTSxDQUFDLEtBQU8sQ0FBQSxDQUFDOztnQkFFNUQsSUFBSSxDQUFDLEdBQUcsSUFBSUMsYUFBVSxFQUFFLENBQUM7Z0JBQ3pCLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLE1BQU0sQ0FBQyxJQUFJO29CQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELElBQUksTUFBTSxDQUFDLFFBQVE7b0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Z0JBRS9ELElBQU0sV0FBVyxHQUFHO29CQUNoQixNQUFNLEVBQUUsQ0FBQztpQkFDWixDQUFDO2dCQUVGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQXdCLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQzlEQyxhQUFHLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLEVBQUUsQ0FBQyxHQUFBLENBQUMsRUFDckRDLG9CQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUNqRSxDQUFDOzs7Ozs7UUFHQyxpQ0FBTzs7OztzQkFBQyxLQUFhO2dCQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFOztvQkFDUixJQUFNLEtBQUssR0FBRyxJQUFJLHFCQUFxQixFQUFFLENBQUM7b0JBQzFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNyQixLQUFLLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO29CQUM3QyxPQUFPSCxPQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3BCOztnQkFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUcsVUFBUSxLQUFPLENBQUEsQ0FBQztnQkFFbEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBd0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUNqREUsYUFBRyxDQUFDLFVBQUEsRUFBRSxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUEsQ0FBQyxFQUN6RUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLHlCQUF5QixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQ2pFLENBQUM7Ozs7OztRQUdDLHFDQUFXOzs7O3NCQUFDLEtBQWE7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUU7O29CQUNSLElBQU0sS0FBSyxHQUFHLElBQUkscUJBQXFCLEVBQUUsQ0FBQztvQkFDMUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7b0JBQ3JCLEtBQUssQ0FBQyxPQUFPLEdBQUcsNEJBQTRCLENBQUM7b0JBQzdDLE9BQU9ILE9BQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDcEI7O2dCQUVELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBRyxjQUFZLEtBQU8sQ0FBQSxDQUFDO2dCQUV0RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUF3QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ2pERSxhQUFHLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBQSxDQUFDLEVBQzdFQyxvQkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FDckUsQ0FBQzs7Ozs7Ozs7OztRQVNDLHFDQUFXOzs7Ozs7OztzQkFBSSxTQUF1QixFQUFFLE1BQVU7Z0JBQW5DLDBCQUFBO29CQUFBLHVCQUF1Qjs7Z0JBQ3pDLE9BQU8sVUFBQyxLQUFVO29CQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUksU0FBUyxpQkFBWSxLQUFLLENBQUMsT0FBUyxDQUFDLENBQUM7O29CQUd2RCxPQUFPSCxPQUFFLG1CQUFDLE1BQVcsRUFBQyxDQUFDO2lCQUMxQixDQUFDOzs7Ozs7O1FBTUMsbUNBQVM7Ozs7O3NCQUFDLFNBQWlCO2dCQUM5QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQ0ksYUFBRyxDQUFDLFVBQUMsR0FBWSxJQUFLLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBRzdGLHFDQUFXOzs7O2dCQUNkLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7UUFFbEMsc0NBQVk7Ozs7Z0JBQ2YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDOzs7b0JBL0o3Q0MsYUFBVSxTQUFDO3dCQUNSLFVBQVUsRUFBRSxNQUFNO3FCQUNyQjs7Ozs7d0RBUWdCQyxTQUFNLFNBQUMsS0FBSzt3QkFuQnBCQyxhQUFVO3dCQU1WQyxnQkFBYTs7Ozs4QkFQdEI7Ozs7Ozs7QUNBQTtRQTBHSSwrQkFBbUIsYUFBOEI7WUFBOUIsa0JBQWEsR0FBYixhQUFhLENBQWlCO3lCQTFCakMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7MkJBS2xELEVBQUU7dUJBQ3BCLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFOytCQUt4QyxFQUFFOzJCQUNwQixZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTt3QkFFMUUsRUFBRTs2QkFDSixTQUFTO3dCQUNkLEtBQUs7MkJBQ0YsS0FBSzsyQkFDTCxHQUFHOzJCQUNILEtBQUs7K0JBQ0QsS0FBSzsyQkFFVCxFQUFFOzZCQUVBLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRTtTQUVoRTs7OztRQUVyRCx3Q0FBUTs7O1lBQVI7Z0JBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbEI7Ozs7UUFFRCwrQ0FBZTs7O1lBQWYsZUFBb0I7Ozs7OztRQUlwQiwyQ0FBVzs7O1lBQVg7Z0JBQUEsaUJBVUM7Z0JBVEcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUM5QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsRUFBeUI7b0JBQ3ZFLEtBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFDMUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2lCQUNoQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEVBQXlCO29CQUMzRSxLQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7b0JBQzlCLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztpQkFDcEMsQ0FBQyxDQUFDO2FBQ047Ozs7UUFFTSx1Q0FBTzs7Ozs7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3RDLE9BQU87aUJBQ1Y7Z0JBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O2dCQUVwQixJQUFNLE1BQU0sR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO2dCQUNuQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzFCLElBQUksSUFBSSxDQUFDLEdBQUc7b0JBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNyQyxJQUFJLElBQUksQ0FBQyxPQUFPO29CQUFFLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFFakQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsRUFBeUI7b0JBQ25FLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFO3dCQUNaLEtBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQzt3QkFDMUIsS0FBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7d0JBQ2YsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7d0JBQ3JCLE9BQU8sS0FBSyxDQUFDO3FCQUNoQjtvQkFFRCxLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztvQkFDbEIsS0FBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUV2QixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztpQkFDeEIsQ0FBQyxDQUFDOzs7Ozs7UUFHQSw0Q0FBWTs7OztzQkFBQyxLQUFLO2dCQUNyQixZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7Ozs7O1FBR1osc0NBQU07Ozs7c0JBQUMsTUFBTTtnQkFDaEIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7OztRQUdaLHdDQUFROzs7O3NCQUFDLE1BQU07Z0JBQ2xCLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7Ozs7UUFHWiwwQ0FBVTs7OztzQkFBQyxNQUFNO2dCQUNwQixZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7Ozs7UUFHWixxQ0FBSzs7OztnQkFDUixhQUFhLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Ozs7OztRQUdyQyxnREFBZ0I7Ozs7c0JBQUMsS0FBVTs7Z0JBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNyQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDZixJQUFJLENBQUMsbUJBQW1CLEdBQUcsV0FBVyxDQUFDO3dCQUNuQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7cUJBQ2xCLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ1o7cUJBQU07b0JBQ0gsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7d0JBQzFCLGFBQWEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztxQkFDM0M7aUJBQ0o7OztvQkF0TFJDLFlBQVMsU0FBQzt3QkFDUCxRQUFRLEVBQUUsa0JBQWtCO3dCQUM1QixRQUFRLEVBQUUsc21HQTREUDt3QkFDSCxNQUFNLEVBQUUsQ0FBQywyckVBQTJyRSxDQUFDO3FCQUN4c0U7Ozs7O3dCQXRFUSxlQUFlOzs7O2lDQXlFbkJDLFlBQVMsU0FBQyxZQUFZOzhCQUt0QkEsWUFBUyxTQUFDLFNBQVM7a0NBTW5CQSxZQUFTLFNBQUMsYUFBYTs7b0NBekY1Qjs7Ozs7OztBQ0FBO1FBUUksK0JBQW9CLG1CQUF3QztZQUF4Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1NBQUk7Ozs7OztRQUV6RCxvQ0FBSTs7Ozs7c0JBQUMsR0FBRyxFQUFFLEtBQW1CO2dCQUFuQixzQkFBQTtvQkFBQSxjQUFtQjs7Z0JBQ2hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7b0JBQzFCLE9BQU8sRUFBRSxHQUFHO29CQUNaLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtvQkFDM0MsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO29CQUNyRCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7b0JBQ2xDLFNBQVMsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUM7OztvQkFiVkwsYUFBVSxTQUFDO3dCQUNSLFVBQVUsRUFBRSxNQUFNO3FCQUNyQjs7Ozs7d0JBSlFNLHdCQUFtQjs7OztvQ0FGNUI7Ozs7Ozs7QUNBQTtRQW1ESSwrQkFBbUIsYUFBOEIsRUFBVSxtQkFBMEM7WUFBbEYsa0JBQWEsR0FBYixhQUFhLENBQWlCO1lBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF1Qjs4QkFYeEZiLGFBQVU7NkJBQ1gsU0FBUzsrQkFNUCxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRTs4QkFFekQsRUFBRTtTQUVvRTs7OztRQUV6Ryx3Q0FBUTs7O1lBQVI7Z0JBQUEsaUJBSUM7Z0JBSEcsSUFBSSxDQUFDLDZCQUE2QixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtvQkFDaEcsT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQztpQkFBQSxDQUMvQixDQUFDO2FBQ0w7Ozs7UUFFRCwrQ0FBZTs7O1lBQWYsZUFBb0I7Ozs7O1FBRVosK0NBQWU7Ozs7c0JBQUMsTUFBa0I7Z0JBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUM7Z0JBRWhDLElBQUksTUFBTSxLQUFLQSxhQUFVLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3JELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDdEI7Ozs7O1FBR0UsMkNBQVc7Ozs7O2dCQUNkLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Z0JBQ3RELElBQU0sU0FBUyxHQUFHLFlBQVUsSUFBSSxDQUFDLFdBQWEsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsQ0FBQzs7Ozs7O1FBR3pGLHlDQUFTOzs7O3NCQUFDLEdBQUc7Z0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRXBELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztnQkFFMUIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO2dCQUNuQixJQUFJLEdBQUcsQ0FBQyxTQUFTLEVBQUU7b0JBQ2YsUUFBUSxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUs7d0JBQ3ZCLEtBQUssU0FBUyxDQUFDLElBQUk7NEJBQ2YsS0FBSyxHQUFHLFNBQVMsQ0FBQzs0QkFDbEIsTUFBTTt3QkFDVixLQUFLLFNBQVMsQ0FBQyxLQUFLLENBQUM7d0JBQ3JCLEtBQUssU0FBUyxDQUFDLEtBQUs7NEJBQ2hCLEtBQUssR0FBRyxPQUFPLENBQUM7NEJBQ2hCLE1BQU07d0JBQ1Y7NEJBQ0ksS0FBSyxHQUFHLE1BQU0sQ0FBQztxQkFDdEI7b0JBQ0QsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUN2RDs7O29CQXJGUlcsWUFBUyxTQUFDO3dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7d0JBQzVCLFFBQVEsRUFBRSw4cERBeUJQO3dCQUNILE1BQU0sRUFBRSxDQUFDLGdzRUFBZ3NFLENBQUM7cUJBQzdzRTs7Ozs7d0JBaENRLGVBQWU7d0JBQ2YscUJBQXFCOzs7b0NBUDlCOzs7Ozs7O0FDQUE7Ozs7OztRQXNCVyxzQkFBTzs7O1lBQWQ7Z0JBQ0ksT0FBTztvQkFDSCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsU0FBUyxFQUFFLENBQUNELGdCQUFhLENBQUM7aUJBQzdCLENBQUM7YUFDTDs7b0JBWkpJLFdBQVEsU0FBQzt3QkFDTixPQUFPLEVBQUUsQ0FBQ0MsbUJBQVksRUFBRUMsdUJBQWtCLEVBQUVDLGlDQUFhLEVBQUVDLCtCQUFZLEVBQUVDLHVDQUFnQixFQUFFQyxpQkFBVyxFQUFFQyxxQ0FBZSxDQUFDO3dCQUN4SCxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxxQkFBcUIsQ0FBQzt3QkFDNUQsT0FBTyxFQUFFLENBQUMscUJBQXFCLEVBQUUscUJBQXFCLENBQUM7d0JBQ3ZELFNBQVMsRUFBRSxDQUFDWCxnQkFBYSxDQUFDO3FCQUM3Qjs7NkJBcEJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==