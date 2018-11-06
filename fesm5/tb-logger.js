import { __spread } from 'tslib';
import { Injectable, Inject, Component, ViewChild, NgModule, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var EntriesParams = /** @class */ (function () {
    function EntriesParams() {
    }
    return EntriesParams;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var OperationResult = /** @class */ (function () {
    function OperationResult() {
    }
    return OperationResult;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LoggerOperationResult = /** @class */ (function () {
    function LoggerOperationResult() {
    }
    return LoggerOperationResult;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var Log = /** @class */ (function () {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            return of(error);
        }
        /** @type {?} */
        var url = this.getLoggerUrl() + ("entries/" + params.appId);
        /** @type {?} */
        var p = new HttpParams();
        p = p.append('howMany', '' + this.howMany);
        if (params.apps)
            p = p.append('apps', params.apps);
        if (params.appTypes)
            p = p.append('appTypes', params.appTypes);
        /** @type {?} */
        var httpOptions = {
            params: p
        };
        return this.http.get(url, httpOptions).pipe(tap(function (op) { return console.log('TbLoggerService.getLogs', op); }), catchError(this.handleError('TbLoggerService.getLogs', false)));
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
        return this.http.get(url).pipe(tap(function (op) { return console.log('TbLoggerService.getApps with appId: ', appId, op); }), catchError(this.handleError('TbLoggerService.getApps', false)));
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
        return this.http.get(url).pipe(tap(function (op) { return console.log('TbLoggerService.getAppTypes with appId: ', appId, op); }), catchError(this.handleError('TbLoggerService.getAppTypes', false)));
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
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.error(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return of(/** @type {?} */ (result));
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
        return this.stompService.subscribe(queueName).pipe(map(function (msg) { return JSON.parse(msg.body); }));
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LoggerViewerComponent = /** @class */ (function () {
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
        { type: Component, args: [{
                    selector: 'tb-logger-viewer',
                    template: "<div class=\"header\">\n    <div class=\"row\">\n        <label id=\"logger-url-label\" class=\"h-label\" for=\"logger-url\">Logger URL:</label>\n        <input kendoTextBox id=\"logger-url\" [(ngModel)]=\"loggerUrl\" (blur)=\"setLoggerUrl($event)\" (click)=\"$event.target.select()\" />\n        <span class=\"k-icon k-i-reset \" (click)=\"getLogs()\"></span>\n\n        <div class=\"autorefresh\">\n            <input type=\"checkbox\" id=\"autoRefresh\" class=\"k-checkbox\" [ngModel]=\"checked\" (ngModelChange)=\"checkAutoRefresh($event)\">\n            <label class=\"k-checkbox-label\" for=\"autoRefresh\">Auto refresh (5s)</label>\n        </div>\n    </div>\n    <div class=\"row\">\n\n        <div class=\"filter\">\n            <!-- APP ID -->\n            <label id=\"logger-app-id-label\" class=\"h-label\" for=\"logger-app-id\" (click)=\"appListInit()\">Instance Key:</label>\n            <input kendoTextBox #appIdInput [(ngModel)]=\"appId\" (blur)=\"setAppId($event)\" id=\"ka-app-id\" (click)=\"$event.target.select()\"\n                placeholder=\"e.g. 2d136c61-aac2-442d-926c-a531c3685035\" />\n        </div>\n\n        <div class=\"filter\">\n            <!-- APP -->\n            <label id=\"logger-app-label\" class=\"h-label\" for=\"logger-app\">App:</label>\n            <kendo-autocomplete #appList [data]=\"appData\" [suggest]=\"true\" [placeholder]=\"'e.g. ERP, MDC, TBF'\"\n                [(ngModel)]=\"app\" (valueChange)=\"setApp($event)\" id=\"ka-app\">\n            </kendo-autocomplete>\n        </div>\n\n        <div class=\"filter\">\n            <!-- APP TYPE -->\n            <label id=\"logger-app-type-label\" class=\"h-label\" for=\"logger-app-type\">AppType:</label>\n            <kendo-autocomplete #appTypeList [data]=\"appTypeData\" [suggest]=\"true\" [placeholder]=\"'e.g. TBLOADER, NETCORE, NG'\"\n                [(ngModel)]=\"appType\" (valueChange)=\"setAppType($event)\" id=\"ka-app-type\">\n            </kendo-autocomplete>\n        </div>\n\n    </div>\n    <div class=\"notify\" *ngIf=\"message\">\n        <p>{{message}}</p>\n    </div>\n</div>\n\n<div class=\"monitor\">\n\n    <div class=\"loading\" *ngIf=\"loading\">\n        <span class=\"k-icon k-i-loading\"></span>\n    </div>\n\n    <ul class=\"logs\" *ngIf=\"!loading\">\n        <li *ngIf=\"logs.length == 0\" class=\"no-logs\">No Logs with appId:<strong>{{appId}}</strong></li>\n        <li *ngFor=\"let log of logs\" class=\"log\">\n            <span class=\"l-date\">{{log.LogEntry.EntryCreated | date: 'medium' }} </span> -\n            <span class=\"l-account-name\"> {{log.LogEntry.AccountName }} </span> -\n            <span class=\"l-app\" *ngIf=\"log.LogEntry.App\"> {{log.LogEntry.App }} -</span>\n            <span class=\"l-type\" *ngIf=\"log.LogEntry.RegisteredAppType\"> {{log.LogEntry.RegisteredAppType }} -</span>\n            <span class=\"l-category\" *ngIf=\"log.LogEntry.Category\"> {{log.LogEntry.Category }} -</span>\n            <span class=\"l-status level-{{log.LogEntry.Level}}\">[{{logStatus[log.LogEntry.Level]}}]</span>\n            <span class=\"l-msg\"> {{log.LogEntry.Message}} </span>\n        </li>\n    </ul>\n</div>",
                    styles: [":host(tb-logger-viewer){flex:1;display:flex;flex-direction:column}:host(tb-logger-viewer) .notify{background:#ff0b0b;padding:5px 10px;margin:10px 0;color:#fff}:host(tb-logger-viewer) .notify p{margin:5px 0;font-size:12px}:host(tb-logger-viewer) .header{display:flex;flex-direction:column;margin:30px 0 10px}:host(tb-logger-viewer) .header .row{display:flex;flex-direction:row;align-items:center;margin:5px 0}:host(tb-logger-viewer) .header .row.flex-center{justify-content:center}:host(tb-logger-viewer) .header .row.flex-around{justify-content:space-around}:host(tb-logger-viewer) .header .row.flex-between{justify-content:space-between}:host(tb-logger-viewer) .header .row .filter #ka-app-id{width:330px}:host(tb-logger-viewer) .header label.h-label{font-weight:500;font-size:14px;margin:0 10px}:host(tb-logger-viewer) .header #logger-url{width:500px}:host(tb-logger-viewer) .header .k-checkbox-label{font-size:12px}:host(tb-logger-viewer) .monitor{display:flex;flex:1;background:#f1f1f1;border:1px solid #ccc;padding:0;margin:5px 0}:host(tb-logger-viewer) .monitor .loading{display:flex;justify-content:center;align-items:center;flex:1}:host(tb-logger-viewer) .monitor .loading .k-i-loading{font-size:34px;color:#999}:host(tb-logger-viewer) .k-i-reset{margin-right:10px;color:#0277bd;border:none;padding:5px}:host(tb-logger-viewer) .k-i-reset:hover{cursor:pointer;color:#222}:host(tb-logger-viewer) hr{background:#0277bd;height:1px;border:none}:host(tb-logger-viewer) .logs{margin:0;padding:5px;list-style:none;overflow:auto;flex:1}:host(tb-logger-viewer) .logs .no-logs{font-size:12px}:host(tb-logger-viewer) .logs .no-logs strong{font-weight:500}:host(tb-logger-viewer) .logs .log{font-size:12px;margin:3px 0}:host(tb-logger-viewer) .logs .log .l-date{color:#999}:host(tb-logger-viewer) .logs .log .l-account-name{color:#00f}:host(tb-logger-viewer) .logs .log .l-status{text-transform:uppercase;margin:0 3px}:host(tb-logger-viewer) .logs .log .l-status.level-0{color:#000}:host(tb-logger-viewer) .logs .log .l-status.level-1{color:#00f}:host(tb-logger-viewer) .logs .log .l-status.level-2{color:orange}:host(tb-logger-viewer) .logs .log .l-status.level-3{color:red}:host(tb-logger-viewer) .logs .log .l-status.level-4{color:red}"]
                },] },
    ];
    /** @nocollapse */
    LoggerViewerComponent.ctorParameters = function () { return [
        { type: TbLoggerService }
    ]; };
    LoggerViewerComponent.propDecorators = {
        appIdInput: [{ type: ViewChild, args: ['appIdInput',] }],
        appList: [{ type: ViewChild, args: ['appList',] }],
        appTypeList: [{ type: ViewChild, args: ['appTypeList',] }]
    };
    return LoggerViewerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var RabbitViewerComponent = /** @class */ (function () {
    function RabbitViewerComponent(loggerService, notificationService) {
        this.loggerService = loggerService;
        this.notificationService = notificationService;
        this.stompState = StompState;
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
        if (status === StompState.CONNECTED && this.mqQueueName) {
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
        { type: Component, args: [{
                    selector: 'tb-rabbit-viewer',
                    template: "<div class=\"header\">\n    <div class=\"row\">\n        <label id=\"mq-queue-name-label\" class=\"h-label\" for=\"mq-connection-state\">MQ Connection state:</label>\n        <p id=\"mq-connection-state\">{{stompState[loggerService.mqConnectionState]}}</p>\n    </div>\n    <div class=\"row\">\n        <label id=\"mq-queue-name-label\" class=\"h-label\" for=\"mq-queue\">Queue Name:</label>\n        <input kendoTextBox id=\"mq-queue-name\" [(ngModel)]=\"mqQueueName\" (click)=\"$event.target.select()\" />\n        <button kendoButton (click)=\"mqSubscribe()\" [disabled]=\"loggerService.mqConnectionState !== stompState.CONNECTED\">Connect</button>\n    </div>\n</div>\n<div class=\"monitor\">\n    <ul class=\"messages\">\n        <li *ngIf=\"mqMessages.length == 0\" class=\"no-messages\">No messages in queue:<strong>{{mqQueueName}}</strong></li>\n        <li *ngFor=\"let m of mqMessages\" class=\"message\">\n            <!-- <span class=\"l-msg\"> {{m.UPMessage}} </span> -->\n            <span class=\"l-date\">{{m.UPContent.EntryCreated | date: 'medium' }} </span> -\n            <span class=\"l-account-name\"> {{m.UPContent.AccountName }} </span> -\n            <span class=\"l-app\" *ngIf=\"m.UPContent.App\"> {{m.UPContent.App }} -</span>\n            <span class=\"l-type\" *ngIf=\"m.UPContent.RegisteredAppType\"> {{m.UPContent.RegisteredAppType }} -</span>\n            <span class=\"l-category\" *ngIf=\"m.UPContent.Category\"> {{m.UPContent.Category }} -</span>\n            <span class=\"l-status level-{{m.UPContent.Level}}\"> [{{logStatus[m.UPContent.Level]}}]</span>\n            <span class=\"l-msg\"> {{m.UPContent.Message}} </span>\n        </li>\n    </ul>\n</div>",
                    styles: [":host(tb-rabbit-viewer){flex:1;display:flex;flex-direction:column}:host(tb-rabbit-viewer) .notify{background:#ff0b0b;padding:5px 10px;margin:10px 0;color:#fff}:host(tb-rabbit-viewer) .notify p{margin:5px 0;font-size:12px}:host(tb-rabbit-viewer) .header{display:flex;flex-direction:column}:host(tb-rabbit-viewer) .header .row{display:flex;flex-direction:row;align-items:center;margin:5px 0}:host(tb-rabbit-viewer) .header .row.flex-center{justify-content:center}:host(tb-rabbit-viewer) .header .row.flex-around{justify-content:space-around}:host(tb-rabbit-viewer) .header .row.flex-between{justify-content:space-between}:host(tb-rabbit-viewer) .header .row #mq-queue-name{width:500px}:host(tb-rabbit-viewer) .header label.h-label{font-weight:500;font-size:14px;margin:0 10px}:host(tb-rabbit-viewer) .header .k-checkbox-label{font-size:12px}:host(tb-rabbit-viewer) .monitor{display:flex;flex:1;background:#f1f1f1;border:1px solid #ccc;padding:0;margin:5px 0}:host(tb-rabbit-viewer) .monitor .loading{display:flex;justify-content:center;align-items:center;flex:1}:host(tb-rabbit-viewer) .monitor .loading .k-i-loading{font-size:34px;color:#999}:host(tb-rabbit-viewer) .k-i-reset{margin-right:10px;color:#0277bd;border:none;padding:5px}:host(tb-rabbit-viewer) .k-i-reset:hover{cursor:pointer;color:#222}:host(tb-rabbit-viewer) hr{background:#0277bd;height:1px;border:none}:host(tb-rabbit-viewer) .messages{margin:0;padding:5px;list-style:none;overflow:auto;flex:1}:host(tb-rabbit-viewer) .messages .no-logs{font-size:12px}:host(tb-rabbit-viewer) .messages .no-logs strong{font-weight:500}:host(tb-rabbit-viewer) .messages .message{font-size:12px;margin:3px 0}:host(tb-rabbit-viewer) .messages .message .l-date{color:#999}:host(tb-rabbit-viewer) .messages .message .l-account-name{color:#00f}:host(tb-rabbit-viewer) .messages .message .l-status{text-transform:uppercase;margin:0 3px}:host(tb-rabbit-viewer) .messages .message .l-status.level-0{color:#000}:host(tb-rabbit-viewer) .messages .message .l-status.level-1{color:#00f}:host(tb-rabbit-viewer) .messages .message .l-status.level-2{color:orange}:host(tb-rabbit-viewer) .messages .message .l-status.level-3{color:red}:host(tb-rabbit-viewer) .messages .message .l-status.level-4{color:red}"]
                },] },
    ];
    /** @nocollapse */
    RabbitViewerComponent.ctorParameters = function () { return [
        { type: TbLoggerService },
        { type: TbNotificationService }
    ]; };
    return RabbitViewerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    declarations: [LoggerViewerComponent, RabbitViewerComponent],
                    exports: [LoggerViewerComponent, RabbitViewerComponent],
                    providers: [StompRService]
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

export { EntriesParams, OperationResult, LoggerOperationResult, Log, LogStatus, TbLoggerService, TbLoggerModule, LoggerViewerComponent as ɵa, RabbitViewerComponent as ɵb, TbNotificationService as ɵc };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AdGIvbG9nZ2VyL2xpYi9tb2RlbHMvZW50cmllcy5tb2RlbC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL29wZXJhdGlvbi1yZXN1bHQubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9sb2dnZXItb3BlcmF0aW9uLXJlc3VsdC5tb2RlbC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL2xvZy5tb2RlbC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL2xvZy1zdGF0dXMuZW51bS50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvc2VydmljZXMvdGItbG9nZ2VyLnNlcnZpY2UudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL2NvbXBvbmVudHMvbG9nZ2VyLXZpZXdlci9sb2dnZXItdmlld2VyLmNvbXBvbmVudC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL2NvbXBvbmVudHMvcmFiYml0LXZpZXdlci9yYWJiaXQtdmlld2VyLmNvbXBvbmVudC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvdGItbG9nZ2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRW50cmllc1BhcmFtcyB7XHJcbiAgICBhcHBJZDogc3RyaW5nO1xyXG4gICAgYXBwczogc3RyaW5nO1xyXG4gICAgYXBwVHlwZXM6IHN0cmluZztcclxuICAgIGNhdGVnb3JpZXM6IHN0cmluZztcclxuICAgIGhvd01hbnk6IHN0cmluZztcclxuICAgIG9mZlNldDogc3RyaW5nO1xyXG4gICAgbGV2ZWxzOiBzdHJpbmc7XHJcbiAgICB0ZXh0VG9GaW5kOiBzdHJpbmc7XHJcbiAgICB1c2VIaXN0b3J5OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBPcGVyYXRpb25SZXN1bHQge1xyXG4gICAgUmVzdWx0OiBib29sZWFuO1xyXG4gICAgTWVzc2FnZT86IHN0cmluZztcclxuICAgIENvZGU/OiBudW1iZXI7XHJcbiAgICBDb250ZW50PzogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0IHtcclxuICAgIFJlc3VsdDogYm9vbGVhbjtcclxuICAgIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgICBDb2RlPzogbnVtYmVyO1xyXG4gICAgQ29udGVudD86IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIExvZyB7XHJcbiAgICBfaWQ6IHN0cmluZztcclxuICAgIExvZ0VudHJ5OiB7XHJcbiAgICAgICAgQXBwOiBzdHJpbmc7IC8vIEVSUCwgUEFJLCBNREMsIFRCRlxyXG4gICAgICAgIFJlZ2lzdGVyZWRBcHBJZDogc3RyaW5nOyAvLyBpbnN0YW5jZSBrZXlcclxuICAgICAgICBSZWdpc3RlcmVkQXBwVHlwZTogc3RyaW5nOyAvLyBUQkxPQURFUiwgTkVUQ09SRSwgTkcsIFBST1ZJU0lPTklOR1xyXG4gICAgICAgIENhdGVnb3J5OiBzdHJpbmc7IC8vXHJcbiAgICAgICAgTW9kdWxlOiBzdHJpbmc7XHJcbiAgICAgICAgU3ViTW9kdWxlOiBzdHJpbmc7XHJcbiAgICAgICAgRG9jdW1lbnQ6IHN0cmluZztcclxuICAgICAgICBTdWJzY3JpcHRpb246IHN0cmluZztcclxuICAgICAgICBBY2NvdW50TmFtZTogc3RyaW5nO1xyXG4gICAgICAgIExpZmV0aW1lOiBzdHJpbmc7XHJcbiAgICAgICAgT3BlcmF0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgQ29udGV4dERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgTWV0aG9kOiBzdHJpbmc7XHJcbiAgICAgICAgRW50cnlDcmVhdGVkOiBzdHJpbmc7XHJcbiAgICAgICAgTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgICAgIExldmVsOiBudW1iZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgZW51bSBMb2dTdGF0dXMge1xyXG4gICAgSW5mbyA9IDAsXHJcbiAgICBEZWJ1ZyA9IDEsXHJcbiAgICBXYXJuID0gMixcclxuICAgIEVycm9yID0gMyxcclxuICAgIEZhdGFsID0gNFxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgRW50cmllc1BhcmFtcyB9IGZyb20gJy4uL21vZGVscy9lbnRyaWVzLm1vZGVsJztcclxuaW1wb3J0IHsgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL2xvZ2dlci1vcGVyYXRpb24tcmVzdWx0Lm1vZGVsJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgdGFwLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU3RvbXBSU2VydmljZSwgU3RvbXBDb25maWcsIFN0b21wU3RhdGUgfSBmcm9tICdAc3RvbXAvbmcyLXN0b21wanMnO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnQHN0b21wL3N0b21wanMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYkxvZ2dlclNlcnZpY2Uge1xyXG4gICAgcHVibGljIGxvZ2dlclVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBob3dNYW55ID0gMTAwO1xyXG5cclxuICAgIHB1YmxpYyBtcUNvbm5lY3Rpb25TdGF0ZTogU3RvbXBTdGF0ZSA9IFN0b21wU3RhdGUuQ0xPU0VEO1xyXG4gICAgcHVibGljIG1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZTogQmVoYXZpb3JTdWJqZWN0PFN0b21wU3RhdGU+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChTdG9tcFN0YXRlLkNMT1NFRCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgnZW52JykgcHJpdmF0ZSBlbnYsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHVibGljIHN0b21wU2VydmljZTogU3RvbXBSU2VydmljZSkge1xyXG4gICAgICAgIGlmIChlbnYuc3RvbXBDb25maWcpIHRoaXMubXFJbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbXFJbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmVudi5zdG9tcENvbmZpZykge1xyXG4gICAgICAgICAgICB0aGlzLnN0b21wU2VydmljZS5jb25maWcgPSB0aGlzLmVudi5zdG9tcENvbmZpZztcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2UuaW5pdEFuZENvbm5lY3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2Uuc3RhdGUuc3Vic2NyaWJlKChzdGF0dXM6IFN0b21wU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGUgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZS5uZXh0KHN0YXR1cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJpdG9ybmEgbGEgYmFzZSB1cmwgZGVsIGxvZ2dlcixcclxuICAgICAqIGNhcmljYXRhIGRhIHVuIGZpbGUgZGkgY29uZmlndXJhemlvbmUgY2FyaWNhdG8gZGluYW1pY2FtZW50ZSAoYXNzZXRzL2Vudmlyb25tZW50Lmpzb24pXHJcbiAgICAgKi9cclxuICAgIGdldExvZ2dlclVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2dnZXJVcmwgPyB0aGlzLmxvZ2dlclVybCA6IHRoaXMuZW52LmxvZ2dlci51cmw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLmxvZyBpbiBhdHRlc2EgZGkgcG9zdCB0byBsb2dnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGxvZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLmxvZyBpbiBhdHRlc2EgZGkgcG9zdCB0byBsb2dnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGRlYnVnKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnNvbGUud2FybiBpbiBhdHRlc2EgZGkgcG9zdCB0byBsb2dnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIHdhcm4obWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnNvbGUuZXJyb3IgaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBlcnJvcihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybiBsb2dzOiBMb2dnZXJPcGVyYXRpb25SZXN1bHRcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zOiBFbnRyaWVzUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRMb2dzKHBhcmFtczogRW50cmllc1BhcmFtcyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghcGFyYW1zLmFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5SZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IuTWVzc2FnZSA9ICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGVudHJpZXMvJHtwYXJhbXMuYXBwSWR9YDtcclxuXHJcbiAgICAgICAgbGV0IHAgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICAgIHAgPSBwLmFwcGVuZCgnaG93TWFueScsICcnICsgdGhpcy5ob3dNYW55KTtcclxuICAgICAgICBpZiAocGFyYW1zLmFwcHMpIHAgPSBwLmFwcGVuZCgnYXBwcycsIHBhcmFtcy5hcHBzKTtcclxuICAgICAgICBpZiAocGFyYW1zLmFwcFR5cGVzKSBwID0gcC5hcHBlbmQoJ2FwcFR5cGVzJywgcGFyYW1zLmFwcFR5cGVzKTtcclxuXHJcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtczogcFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsLCBodHRwT3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0TG9ncycsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldExvZ3MnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFhcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IuUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLk1lc3NhZ2UgPSAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldEFwcHMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEFwcHMnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwVHlwZXMoYXBwSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLlJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5NZXNzYWdlID0gJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwVHlwZXMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwVHlwZXMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgSHR0cCBvcGVyYXRpb24gdGhhdCBmYWlsZWQuXHJcbiAgICAgKiBMZXQgdGhlIGFwcCBjb250aW51ZS5cclxuICAgICAqIEBwYXJhbSBvcGVyYXRpb24gLSBuYW1lIG9mIHRoZSBvcGVyYXRpb24gdGhhdCBmYWlsZWRcclxuICAgICAqIEBwYXJhbSByZXN1bHQgLSBvcHRpb25hbCB2YWx1ZSB0byByZXR1cm4gYXMgdGhlIG9ic2VydmFibGUgcmVzdWx0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYW5kbGVFcnJvcjxUPihvcGVyYXRpb24gPSAnb3BlcmF0aW9uJywgcmVzdWx0PzogVCkge1xyXG4gICAgICAgIHJldHVybiAoZXJyb3I6IGFueSk6IE9ic2VydmFibGU8VD4gPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke29wZXJhdGlvbn0gZmFpbGVkOiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcblxyXG4gICAgICAgICAgICAvLyBMZXQgdGhlIGFwcCBrZWVwIHJ1bm5pbmcgYnkgcmV0dXJuaW5nIGFuIGVtcHR5IHJlc3VsdC5cclxuICAgICAgICAgICAgcmV0dXJuIG9mKHJlc3VsdCBhcyBUKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29ubmVzc2lvbmUgYSBSYWJiaXRNUVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbXFDb25uZWN0KHF1ZXVlTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLnN1YnNjcmliZShxdWV1ZU5hbWUpLnBpcGUobWFwKChtc2c6IE1lc3NhZ2UpID0+IEpTT04ucGFyc2UobXNnLmJvZHkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1xQ29ubmVjdGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b21wU2VydmljZS5jb25uZWN0ZWQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBtcURpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuLy4uLy4uL21vZGVscy9sb2cubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2dTdGF0dXMgfSBmcm9tICcuLy4uLy4uL21vZGVscy9sb2ctc3RhdHVzLmVudW0nO1xyXG5pbXBvcnQgeyBUYkxvZ2dlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0IH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvbG9nZ2VyLW9wZXJhdGlvbi1yZXN1bHQubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgZGVsYXksIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBFbnRyaWVzUGFyYW1zIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2VudHJpZXMubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RiLWxvZ2dlci12aWV3ZXInLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgPGxhYmVsIGlkPVwibG9nZ2VyLXVybC1sYWJlbFwiIGNsYXNzPVwiaC1sYWJlbFwiIGZvcj1cImxvZ2dlci11cmxcIj5Mb2dnZXIgVVJMOjwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IGtlbmRvVGV4dEJveCBpZD1cImxvZ2dlci11cmxcIiBbKG5nTW9kZWwpXT1cImxvZ2dlclVybFwiIChibHVyKT1cInNldExvZ2dlclVybCgkZXZlbnQpXCIgKGNsaWNrKT1cIiRldmVudC50YXJnZXQuc2VsZWN0KClcIiAvPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiay1pY29uIGstaS1yZXNldCBcIiAoY2xpY2spPVwiZ2V0TG9ncygpXCI+PC9zcGFuPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0b3JlZnJlc2hcIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiYXV0b1JlZnJlc2hcIiBjbGFzcz1cImstY2hlY2tib3hcIiBbbmdNb2RlbF09XCJjaGVja2VkXCIgKG5nTW9kZWxDaGFuZ2UpPVwiY2hlY2tBdXRvUmVmcmVzaCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImstY2hlY2tib3gtbGFiZWxcIiBmb3I9XCJhdXRvUmVmcmVzaFwiPkF1dG8gcmVmcmVzaCAoNXMpPC9sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyXCI+XHJcbiAgICAgICAgICAgIDwhLS0gQVBQIElEIC0tPlxyXG4gICAgICAgICAgICA8bGFiZWwgaWQ9XCJsb2dnZXItYXBwLWlkLWxhYmVsXCIgY2xhc3M9XCJoLWxhYmVsXCIgZm9yPVwibG9nZ2VyLWFwcC1pZFwiIChjbGljayk9XCJhcHBMaXN0SW5pdCgpXCI+SW5zdGFuY2UgS2V5OjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBrZW5kb1RleHRCb3ggI2FwcElkSW5wdXQgWyhuZ01vZGVsKV09XCJhcHBJZFwiIChibHVyKT1cInNldEFwcElkKCRldmVudClcIiBpZD1cImthLWFwcC1pZFwiIChjbGljayk9XCIkZXZlbnQudGFyZ2V0LnNlbGVjdCgpXCJcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiAyZDEzNmM2MS1hYWMyLTQ0MmQtOTI2Yy1hNTMxYzM2ODUwMzVcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyXCI+XHJcbiAgICAgICAgICAgIDwhLS0gQVBQIC0tPlxyXG4gICAgICAgICAgICA8bGFiZWwgaWQ9XCJsb2dnZXItYXBwLWxhYmVsXCIgY2xhc3M9XCJoLWxhYmVsXCIgZm9yPVwibG9nZ2VyLWFwcFwiPkFwcDo8L2xhYmVsPlxyXG4gICAgICAgICAgICA8a2VuZG8tYXV0b2NvbXBsZXRlICNhcHBMaXN0IFtkYXRhXT1cImFwcERhdGFcIiBbc3VnZ2VzdF09XCJ0cnVlXCIgW3BsYWNlaG9sZGVyXT1cIidlLmcuIEVSUCwgTURDLCBUQkYnXCJcclxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiYXBwXCIgKHZhbHVlQ2hhbmdlKT1cInNldEFwcCgkZXZlbnQpXCIgaWQ9XCJrYS1hcHBcIj5cclxuICAgICAgICAgICAgPC9rZW5kby1hdXRvY29tcGxldGU+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJcIj5cclxuICAgICAgICAgICAgPCEtLSBBUFAgVFlQRSAtLT5cclxuICAgICAgICAgICAgPGxhYmVsIGlkPVwibG9nZ2VyLWFwcC10eXBlLWxhYmVsXCIgY2xhc3M9XCJoLWxhYmVsXCIgZm9yPVwibG9nZ2VyLWFwcC10eXBlXCI+QXBwVHlwZTo8L2xhYmVsPlxyXG4gICAgICAgICAgICA8a2VuZG8tYXV0b2NvbXBsZXRlICNhcHBUeXBlTGlzdCBbZGF0YV09XCJhcHBUeXBlRGF0YVwiIFtzdWdnZXN0XT1cInRydWVcIiBbcGxhY2Vob2xkZXJdPVwiJ2UuZy4gVEJMT0FERVIsIE5FVENPUkUsIE5HJ1wiXHJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImFwcFR5cGVcIiAodmFsdWVDaGFuZ2UpPVwic2V0QXBwVHlwZSgkZXZlbnQpXCIgaWQ9XCJrYS1hcHAtdHlwZVwiPlxyXG4gICAgICAgICAgICA8L2tlbmRvLWF1dG9jb21wbGV0ZT5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJub3RpZnlcIiAqbmdJZj1cIm1lc3NhZ2VcIj5cclxuICAgICAgICA8cD57e21lc3NhZ2V9fTwvcD5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbjxkaXYgY2xhc3M9XCJtb25pdG9yXCI+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImxvYWRpbmdcIiAqbmdJZj1cImxvYWRpbmdcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImstaWNvbiBrLWktbG9hZGluZ1wiPjwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDx1bCBjbGFzcz1cImxvZ3NcIiAqbmdJZj1cIiFsb2FkaW5nXCI+XHJcbiAgICAgICAgPGxpICpuZ0lmPVwibG9ncy5sZW5ndGggPT0gMFwiIGNsYXNzPVwibm8tbG9nc1wiPk5vIExvZ3Mgd2l0aCBhcHBJZDo8c3Ryb25nPnt7YXBwSWR9fTwvc3Ryb25nPjwvbGk+XHJcbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBsb2cgb2YgbG9nc1wiIGNsYXNzPVwibG9nXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1kYXRlXCI+e3tsb2cuTG9nRW50cnkuRW50cnlDcmVhdGVkIHwgZGF0ZTogJ21lZGl1bScgfX0gPC9zcGFuPiAtXHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1hY2NvdW50LW5hbWVcIj4ge3tsb2cuTG9nRW50cnkuQWNjb3VudE5hbWUgfX0gPC9zcGFuPiAtXHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1hcHBcIiAqbmdJZj1cImxvZy5Mb2dFbnRyeS5BcHBcIj4ge3tsb2cuTG9nRW50cnkuQXBwIH19IC08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC10eXBlXCIgKm5nSWY9XCJsb2cuTG9nRW50cnkuUmVnaXN0ZXJlZEFwcFR5cGVcIj4ge3tsb2cuTG9nRW50cnkuUmVnaXN0ZXJlZEFwcFR5cGUgfX0gLTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWNhdGVnb3J5XCIgKm5nSWY9XCJsb2cuTG9nRW50cnkuQ2F0ZWdvcnlcIj4ge3tsb2cuTG9nRW50cnkuQ2F0ZWdvcnkgfX0gLTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLXN0YXR1cyBsZXZlbC17e2xvZy5Mb2dFbnRyeS5MZXZlbH19XCI+W3t7bG9nU3RhdHVzW2xvZy5Mb2dFbnRyeS5MZXZlbF19fV08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1tc2dcIj4ge3tsb2cuTG9nRW50cnkuTWVzc2FnZX19IDwvc3Bhbj5cclxuICAgICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuPC9kaXY+YCxcclxuICAgIHN0eWxlczogW2A6aG9zdCh0Yi1sb2dnZXItdmlld2VyKXtmbGV4OjE7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubm90aWZ5e2JhY2tncm91bmQ6I2ZmMGIwYjtwYWRkaW5nOjVweCAxMHB4O21hcmdpbjoxMHB4IDA7Y29sb3I6I2ZmZn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubm90aWZ5IHB7bWFyZ2luOjVweCAwO2ZvbnQtc2l6ZToxMnB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXJ7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttYXJnaW46MzBweCAwIDEwcHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAucm93e2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbjo1cHggMH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIC5yb3cuZmxleC1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIC5yb3cuZmxleC1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIC5yb3cuZmxleC1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgLnJvdyAuZmlsdGVyICNrYS1hcHAtaWR7d2lkdGg6MzMwcHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciBsYWJlbC5oLWxhYmVse2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MTRweDttYXJnaW46MCAxMHB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgI2xvZ2dlci11cmx7d2lkdGg6NTAwcHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAuay1jaGVja2JveC1sYWJlbHtmb250LXNpemU6MTJweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubW9uaXRvcntkaXNwbGF5OmZsZXg7ZmxleDoxO2JhY2tncm91bmQ6I2YxZjFmMTtib3JkZXI6MXB4IHNvbGlkICNjY2M7cGFkZGluZzowO21hcmdpbjo1cHggMH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubW9uaXRvciAubG9hZGluZ3tkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7ZmxleDoxfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5tb25pdG9yIC5sb2FkaW5nIC5rLWktbG9hZGluZ3tmb250LXNpemU6MzRweDtjb2xvcjojOTk5fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5rLWktcmVzZXR7bWFyZ2luLXJpZ2h0OjEwcHg7Y29sb3I6IzAyNzdiZDtib3JkZXI6bm9uZTtwYWRkaW5nOjVweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuay1pLXJlc2V0OmhvdmVye2N1cnNvcjpwb2ludGVyO2NvbG9yOiMyMjJ9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgaHJ7YmFja2dyb3VuZDojMDI3N2JkO2hlaWdodDoxcHg7Ym9yZGVyOm5vbmV9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3N7bWFyZ2luOjA7cGFkZGluZzo1cHg7bGlzdC1zdHlsZTpub25lO292ZXJmbG93OmF1dG87ZmxleDoxfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5uby1sb2dze2ZvbnQtc2l6ZToxMnB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5uby1sb2dzIHN0cm9uZ3tmb250LXdlaWdodDo1MDB9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZ3tmb250LXNpemU6MTJweDttYXJnaW46M3B4IDB9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1kYXRle2NvbG9yOiM5OTl9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1hY2NvdW50LW5hbWV7Y29sb3I6IzAwZn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLXN0YXR1c3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bWFyZ2luOjAgM3B4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtc3RhdHVzLmxldmVsLTB7Y29sb3I6IzAwMH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLXN0YXR1cy5sZXZlbC0xe2NvbG9yOiMwMGZ9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1zdGF0dXMubGV2ZWwtMntjb2xvcjpvcmFuZ2V9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1zdGF0dXMubGV2ZWwtM3tjb2xvcjpyZWR9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1zdGF0dXMubGV2ZWwtNHtjb2xvcjpyZWR9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2dlclZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICAvLyBpbnN0YW5jZSBrZXlcclxuICAgIEBWaWV3Q2hpbGQoJ2FwcElkSW5wdXQnKVxyXG4gICAgYXBwSWRJbnB1dDtcclxuICAgIGFwcElkOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwSWQnKSA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBJZCcpIDogJyc7XHJcblxyXG4gICAgLy8gYXBwXHJcbiAgICBAVmlld0NoaWxkKCdhcHBMaXN0JylcclxuICAgIGFwcExpc3Q7XHJcbiAgICBwdWJsaWMgYXBwRGF0YTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgYXBwOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwJykgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwJykgOiAnJztcclxuXHJcbiAgICAvLyBhcHAgdHlwZXNcclxuICAgIEBWaWV3Q2hpbGQoJ2FwcFR5cGVMaXN0JylcclxuICAgIGFwcFR5cGVMaXN0O1xyXG4gICAgcHVibGljIGFwcFR5cGVEYXRhOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBhcHBUeXBlOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwVHlwZScpID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcFR5cGUnKSA6ICcnO1xyXG5cclxuICAgIGxvZ3M6IExvZ1tdID0gW107XHJcbiAgICBsb2dTdGF0dXMgPSBMb2dTdGF0dXM7XHJcbiAgICBzaG93ID0gZmFsc2U7XHJcbiAgICBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICBob3dNYW55ID0gMTAwO1xyXG4gICAgY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgYXV0b1JlZnJlc2ggPSBmYWxzZTtcclxuICAgIGF1dG9SZWZyZXNoSW50ZXJ2YWw6IGFueTtcclxuICAgIG1lc3NhZ2UgPSAnJztcclxuXHJcbiAgICBsb2dnZXJVcmwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9nZ2VyVXJsJykgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9nZ2VyVXJsJykgOiB0aGlzLmxvZ2dlclNlcnZpY2UuZ2V0TG9nZ2VyVXJsKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGxvZ2dlclNlcnZpY2U6IFRiTG9nZ2VyU2VydmljZSkge31cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmFwcExpc3RJbml0KCk7XHJcbiAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge31cclxuXHJcbiAgICAvLyBsZWdnbyB0dXR0ZSBsZSBhcHAsIGdsaSBhcHBJZCBlIGdsaSBhcHBUeXBlIGUgbGkgc2Fsdm8gaW4gcmlzcGV0dGl2aSBhcnJheVxyXG4gICAgLy8gdmVycmFubm8gcG9pIGZpbHRyYXRpIGRhaSBjb21wb25lbnRpIGtlbmRvXHJcbiAgICBhcHBMaXN0SW5pdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXBwSWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UuZ2V0QXBwcyh0aGlzLmFwcElkKS5zdWJzY3JpYmUoKG9wOiBMb2dnZXJPcGVyYXRpb25SZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hcHBEYXRhID0gb3AuQ29udGVudDtcclxuICAgICAgICAgICAgdGhpcy5hcHBMaXN0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UuZ2V0QXBwVHlwZXModGhpcy5hcHBJZCkuc3Vic2NyaWJlKChvcDogTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwVHlwZURhdGEgPSBvcC5Db250ZW50O1xyXG4gICAgICAgICAgICB0aGlzLmFwcFR5cGVMaXN0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TG9ncygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXBwSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gJ0luc3RhbmNlIEtleSBtYW5jYW50ZSc7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwSWRJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBFbnRyaWVzUGFyYW1zKCk7XHJcbiAgICAgICAgcGFyYW1zLmFwcElkID0gdGhpcy5hcHBJZDtcclxuICAgICAgICBpZiAodGhpcy5hcHApIHBhcmFtcy5hcHBzID0gdGhpcy5hcHA7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwVHlwZSkgcGFyYW1zLmFwcFR5cGVzID0gdGhpcy5hcHBUeXBlO1xyXG5cclxuICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UuZ2V0TG9ncyhwYXJhbXMpLnN1YnNjcmliZSgob3A6IExvZ2dlck9wZXJhdGlvblJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIW9wLlJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gb3AuTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ3MgPSBvcC5Db250ZW50O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldExvZ2dlclVybChldmVudCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dnZXJVcmwnLCB0aGlzLmxvZ2dlclVybCk7XHJcbiAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEFwcCgkZXZlbnQpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXBwJywgdGhpcy5hcHApO1xyXG4gICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRBcHBJZCgkZXZlbnQpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXBwSWQnLCB0aGlzLmFwcElkKTtcclxuICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QXBwVHlwZSgkZXZlbnQpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXBwVHlwZScsIHRoaXMuYXBwVHlwZSk7XHJcbiAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hdXRvUmVmcmVzaEludGVydmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tBdXRvUmVmcmVzaChldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5hdXRvUmVmcmVzaCA9ICF0aGlzLmF1dG9SZWZyZXNoO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9SZWZyZXNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9SZWZyZXNoSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgICAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1JlZnJlc2hJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmF1dG9SZWZyZXNoSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLW5vdGlmaWNhdGlvbic7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTm90aWZpY2F0aW9uU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHt9XHJcblxyXG4gICAgcHVibGljIHNob3cobXNnLCBzdHlsZTogYW55ID0gJ25vbmUnKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3coe1xyXG4gICAgICAgICAgICBjb250ZW50OiBtc2csXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbjogeyB0eXBlOiAnc2xpZGUnLCBkdXJhdGlvbjogMjAwIH0sXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7IGhvcml6b250YWw6ICdyaWdodCcsIHZlcnRpY2FsOiAnYm90dG9tJyB9LFxyXG4gICAgICAgICAgICB0eXBlOiB7IHN0eWxlOiBzdHlsZSwgaWNvbjogdHJ1ZSB9LFxyXG4gICAgICAgICAgICBoaWRlQWZ0ZXI6IDQwMDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU3RvbXBTdGF0ZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcblxyXG5pbXBvcnQgeyBMb2dTdGF0dXMgfSBmcm9tICcuLy4uLy4uL21vZGVscy9sb2ctc3RhdHVzLmVudW0nO1xyXG5pbXBvcnQgeyBUYkxvZ2dlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGJOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RiLXJhYmJpdC12aWV3ZXInLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgPGxhYmVsIGlkPVwibXEtcXVldWUtbmFtZS1sYWJlbFwiIGNsYXNzPVwiaC1sYWJlbFwiIGZvcj1cIm1xLWNvbm5lY3Rpb24tc3RhdGVcIj5NUSBDb25uZWN0aW9uIHN0YXRlOjwvbGFiZWw+XHJcbiAgICAgICAgPHAgaWQ9XCJtcS1jb25uZWN0aW9uLXN0YXRlXCI+e3tzdG9tcFN0YXRlW2xvZ2dlclNlcnZpY2UubXFDb25uZWN0aW9uU3RhdGVdfX08L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8bGFiZWwgaWQ9XCJtcS1xdWV1ZS1uYW1lLWxhYmVsXCIgY2xhc3M9XCJoLWxhYmVsXCIgZm9yPVwibXEtcXVldWVcIj5RdWV1ZSBOYW1lOjwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IGtlbmRvVGV4dEJveCBpZD1cIm1xLXF1ZXVlLW5hbWVcIiBbKG5nTW9kZWwpXT1cIm1xUXVldWVOYW1lXCIgKGNsaWNrKT1cIiRldmVudC50YXJnZXQuc2VsZWN0KClcIiAvPlxyXG4gICAgICAgIDxidXR0b24ga2VuZG9CdXR0b24gKGNsaWNrKT1cIm1xU3Vic2NyaWJlKClcIiBbZGlzYWJsZWRdPVwibG9nZ2VyU2VydmljZS5tcUNvbm5lY3Rpb25TdGF0ZSAhPT0gc3RvbXBTdGF0ZS5DT05ORUNURURcIj5Db25uZWN0PC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJtb25pdG9yXCI+XHJcbiAgICA8dWwgY2xhc3M9XCJtZXNzYWdlc1wiPlxyXG4gICAgICAgIDxsaSAqbmdJZj1cIm1xTWVzc2FnZXMubGVuZ3RoID09IDBcIiBjbGFzcz1cIm5vLW1lc3NhZ2VzXCI+Tm8gbWVzc2FnZXMgaW4gcXVldWU6PHN0cm9uZz57e21xUXVldWVOYW1lfX08L3N0cm9uZz48L2xpPlxyXG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbSBvZiBtcU1lc3NhZ2VzXCIgY2xhc3M9XCJtZXNzYWdlXCI+XHJcbiAgICAgICAgICAgIDwhLS0gPHNwYW4gY2xhc3M9XCJsLW1zZ1wiPiB7e20uVVBNZXNzYWdlfX0gPC9zcGFuPiAtLT5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWRhdGVcIj57e20uVVBDb250ZW50LkVudHJ5Q3JlYXRlZCB8IGRhdGU6ICdtZWRpdW0nIH19IDwvc3Bhbj4gLVxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtYWNjb3VudC1uYW1lXCI+IHt7bS5VUENvbnRlbnQuQWNjb3VudE5hbWUgfX0gPC9zcGFuPiAtXHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1hcHBcIiAqbmdJZj1cIm0uVVBDb250ZW50LkFwcFwiPiB7e20uVVBDb250ZW50LkFwcCB9fSAtPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtdHlwZVwiICpuZ0lmPVwibS5VUENvbnRlbnQuUmVnaXN0ZXJlZEFwcFR5cGVcIj4ge3ttLlVQQ29udGVudC5SZWdpc3RlcmVkQXBwVHlwZSB9fSAtPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtY2F0ZWdvcnlcIiAqbmdJZj1cIm0uVVBDb250ZW50LkNhdGVnb3J5XCI+IHt7bS5VUENvbnRlbnQuQ2F0ZWdvcnkgfX0gLTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLXN0YXR1cyBsZXZlbC17e20uVVBDb250ZW50LkxldmVsfX1cIj4gW3t7bG9nU3RhdHVzW20uVVBDb250ZW50LkxldmVsXX19XTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLW1zZ1wiPiB7e20uVVBDb250ZW50Lk1lc3NhZ2V9fSA8L3NwYW4+XHJcbiAgICAgICAgPC9saT5cclxuICAgIDwvdWw+XHJcbjwvZGl2PmAsXHJcbiAgICBzdHlsZXM6IFtgOmhvc3QodGItcmFiYml0LXZpZXdlcil7ZmxleDoxO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm5vdGlmeXtiYWNrZ3JvdW5kOiNmZjBiMGI7cGFkZGluZzo1cHggMTBweDttYXJnaW46MTBweCAwO2NvbG9yOiNmZmZ9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm5vdGlmeSBwe21hcmdpbjo1cHggMDtmb250LXNpemU6MTJweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVye2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmhlYWRlciAucm93e2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbjo1cHggMH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIC5yb3cuZmxleC1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIC5yb3cuZmxleC1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIC5yb3cuZmxleC1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXIgLnJvdyAjbXEtcXVldWUtbmFtZXt3aWR0aDo1MDBweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIGxhYmVsLmgtbGFiZWx7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToxNHB4O21hcmdpbjowIDEwcHh9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmhlYWRlciAuay1jaGVja2JveC1sYWJlbHtmb250LXNpemU6MTJweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubW9uaXRvcntkaXNwbGF5OmZsZXg7ZmxleDoxO2JhY2tncm91bmQ6I2YxZjFmMTtib3JkZXI6MXB4IHNvbGlkICNjY2M7cGFkZGluZzowO21hcmdpbjo1cHggMH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubW9uaXRvciAubG9hZGluZ3tkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7ZmxleDoxfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tb25pdG9yIC5sb2FkaW5nIC5rLWktbG9hZGluZ3tmb250LXNpemU6MzRweDtjb2xvcjojOTk5fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5rLWktcmVzZXR7bWFyZ2luLXJpZ2h0OjEwcHg7Y29sb3I6IzAyNzdiZDtib3JkZXI6bm9uZTtwYWRkaW5nOjVweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuay1pLXJlc2V0OmhvdmVye2N1cnNvcjpwb2ludGVyO2NvbG9yOiMyMjJ9Omhvc3QodGItcmFiYml0LXZpZXdlcikgaHJ7YmFja2dyb3VuZDojMDI3N2JkO2hlaWdodDoxcHg7Ym9yZGVyOm5vbmV9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2Vze21hcmdpbjowO3BhZGRpbmc6NXB4O2xpc3Qtc3R5bGU6bm9uZTtvdmVyZmxvdzphdXRvO2ZsZXg6MX06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm5vLWxvZ3N7Zm9udC1zaXplOjEycHh9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5uby1sb2dzIHN0cm9uZ3tmb250LXdlaWdodDo1MDB9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdle2ZvbnQtc2l6ZToxMnB4O21hcmdpbjozcHggMH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtZGF0ZXtjb2xvcjojOTk5fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1hY2NvdW50LW5hbWV7Y29sb3I6IzAwZn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtc3RhdHVze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTttYXJnaW46MCAzcHh9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLXN0YXR1cy5sZXZlbC0we2NvbG9yOiMwMDB9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLXN0YXR1cy5sZXZlbC0xe2NvbG9yOiMwMGZ9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLXN0YXR1cy5sZXZlbC0ye2NvbG9yOm9yYW5nZX06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtc3RhdHVzLmxldmVsLTN7Y29sb3I6cmVkfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1zdGF0dXMubGV2ZWwtNHtjb2xvcjpyZWR9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJhYmJpdFZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBzdG9tcFN0YXRlID0gU3RvbXBTdGF0ZTtcclxuICAgIGxvZ1N0YXR1cyA9IExvZ1N0YXR1cztcclxuXHJcbiAgICBtcUNvbm5lY3Rpb25TdGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgbXFDb25uZWN0aW9uU3RhdGU6IFN0b21wU3RhdGU7XHJcblxyXG4gICAgbXFRdWV1ZTogU3Vic2NyaXB0aW9uO1xyXG4gICAgbXFRdWV1ZU5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbXFRdWV1ZU5hbWUnKSA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtcVF1ZXVlTmFtZScpIDogJyc7XHJcblxyXG4gICAgcHVibGljIG1xTWVzc2FnZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9nZ2VyU2VydmljZTogVGJMb2dnZXJTZXJ2aWNlLCBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IFRiTm90aWZpY2F0aW9uU2VydmljZSkge31cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlU3Vic2NyaXB0aW9uID0gdGhpcy5sb2dnZXJTZXJ2aWNlLm1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZS5zdWJzY3JpYmUoc3RhdHVzID0+XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VNcVN0YXRlKHN0YXR1cylcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHt9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZU1xU3RhdGUoc3RhdHVzOiBTdG9tcFN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5tcUNvbm5lY3Rpb25TdGF0ZSA9IHN0YXR1cztcclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gU3RvbXBTdGF0ZS5DT05ORUNURUQgJiYgdGhpcy5tcVF1ZXVlTmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1xU3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtcVN1YnNjcmliZSgpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbXFRdWV1ZU5hbWUnLCB0aGlzLm1xUXVldWVOYW1lKTtcclxuICAgICAgICBjb25zdCBxdWV1ZU5hbWUgPSBgL3F1ZXVlLyR7dGhpcy5tcVF1ZXVlTmFtZX1gO1xyXG4gICAgICAgIHRoaXMubXFRdWV1ZSA9IHRoaXMubG9nZ2VyU2VydmljZS5tcUNvbm5lY3QocXVldWVOYW1lKS5zdWJzY3JpYmUobXNnID0+IHRoaXMub25NZXNzYWdlKG1zZykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25NZXNzYWdlKG1zZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSYWJiaXRWaWV3ZXJDb21wb25lbnQub25NZXNzYWdlJywgbXNnKTtcclxuXHJcbiAgICAgICAgdGhpcy5tcU1lc3NhZ2VzLnB1c2gobXNnKTtcclxuXHJcbiAgICAgICAgbGV0IHN0eWxlID0gJ25vbmUnO1xyXG4gICAgICAgIGlmIChtc2cuVVBDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobXNnLlVQQ29udGVudC5MZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBMb2dTdGF0dXMuV2FybjpcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9ICd3YXJuaW5nJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9nU3RhdHVzLkVycm9yOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBMb2dTdGF0dXMuRmF0YWw6XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSAnZXJyb3InO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvdyhtc2cuVVBNZXNzYWdlLCBzdHlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBCdXR0b25zTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItYnV0dG9ucyc7XHJcbmltcG9ydCB7IERyb3BEb3duc01vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLWRyb3Bkb3ducyc7XHJcbmltcG9ydCB7IElucHV0c01vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLWlucHV0cyc7XHJcbmltcG9ydCB7IERhdGVJbnB1dHNNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1kYXRlaW5wdXRzJztcclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItbm90aWZpY2F0aW9uJztcclxuXHJcbmltcG9ydCB7IFN0b21wUlNlcnZpY2UgfSBmcm9tICdAc3RvbXAvbmcyLXN0b21wanMnO1xyXG5cclxuaW1wb3J0IHsgTG9nZ2VyVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvZ2dlci12aWV3ZXIvbG9nZ2VyLXZpZXdlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBSYWJiaXRWaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcmFiYml0LXZpZXdlci9yYWJiaXQtdmlld2VyLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm90aWZpY2F0aW9uTW9kdWxlLCBCdXR0b25zTW9kdWxlLCBJbnB1dHNNb2R1bGUsIERhdGVJbnB1dHNNb2R1bGUsIEZvcm1zTW9kdWxlLCBEcm9wRG93bnNNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbTG9nZ2VyVmlld2VyQ29tcG9uZW50LCBSYWJiaXRWaWV3ZXJDb21wb25lbnRdLFxyXG4gICAgZXhwb3J0czogW0xvZ2dlclZpZXdlckNvbXBvbmVudCwgUmFiYml0Vmlld2VyQ29tcG9uZW50XSxcclxuICAgIHByb3ZpZGVyczogW1N0b21wUlNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYkxvZ2dlck1vZHVsZSB7XHJcbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogVGJMb2dnZXJNb2R1bGUsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1N0b21wUlNlcnZpY2VdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQTtJQVdJO0tBQWdCO3dCQVhwQjtJQVlDOzs7Ozs7QUNaRCxJQUFBO0lBTUk7S0FBZ0I7MEJBTnBCO0lBT0M7Ozs7OztBQ1BELElBQUE7SUFNSTtLQUFnQjtnQ0FOcEI7SUFPQzs7Ozs7O0FDUEQsSUFBQTtJQXFCSTtLQUFnQjtjQXJCcEI7SUFzQkM7Ozs7Ozs7O0lDckJHLE9BQVE7SUFDUixRQUFTO0lBQ1QsT0FBUTtJQUNSLFFBQVM7SUFDVCxRQUFTOztvQkFKVCxJQUFJO29CQUNKLEtBQUs7b0JBQ0wsSUFBSTtvQkFDSixLQUFLO29CQUNMLEtBQUs7Ozs7Ozs7SUNlTCx5QkFBbUMsR0FBRyxFQUFVLElBQWdCLEVBQVMsWUFBMkI7UUFBakUsUUFBRyxHQUFILEdBQUcsQ0FBQTtRQUFVLFNBQUksR0FBSixJQUFJLENBQVk7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBZTt1QkFMbEYsR0FBRztpQ0FF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