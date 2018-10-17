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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AdGIvbG9nZ2VyL2xpYi9tb2RlbHMvZW50cmllcy5tb2RlbC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL29wZXJhdGlvbi1yZXN1bHQubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9sb2dnZXItb3BlcmF0aW9uLXJlc3VsdC5tb2RlbC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL2xvZy5tb2RlbC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL2xvZy1zdGF0dXMuZW51bS50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvc2VydmljZXMvdGItbG9nZ2VyLnNlcnZpY2UudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL2NvbXBvbmVudHMvbG9nZ2VyLXZpZXdlci9sb2dnZXItdmlld2VyLmNvbXBvbmVudC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL2NvbXBvbmVudHMvcmFiYml0LXZpZXdlci9yYWJiaXQtdmlld2VyLmNvbXBvbmVudC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvdGItbG9nZ2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRW50cmllc1BhcmFtcyB7XHJcbiAgICBhcHBJZDogc3RyaW5nO1xyXG4gICAgYXBwczogc3RyaW5nO1xyXG4gICAgYXBwVHlwZXM6IHN0cmluZztcclxuICAgIGNhdGVnb3JpZXM6IHN0cmluZztcclxuICAgIGhvd01hbnk6IHN0cmluZztcclxuICAgIG9mZlNldDogc3RyaW5nO1xyXG4gICAgbGV2ZWxzOiBzdHJpbmc7XHJcbiAgICB0ZXh0VG9GaW5kOiBzdHJpbmc7XHJcbiAgICB1c2VIaXN0b3J5OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBPcGVyYXRpb25SZXN1bHQge1xyXG4gICAgUmVzdWx0OiBib29sZWFuO1xyXG4gICAgTWVzc2FnZT86IHN0cmluZztcclxuICAgIENvZGU/OiBudW1iZXI7XHJcbiAgICBDb250ZW50PzogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0IHtcclxuICAgIFJlc3VsdDogYm9vbGVhbjtcclxuICAgIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgICBDb2RlPzogbnVtYmVyO1xyXG4gICAgQ29udGVudD86IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIExvZyB7XHJcbiAgICBfaWQ6IHN0cmluZztcclxuICAgIExvZ0VudHJ5OiB7XHJcbiAgICAgICAgQXBwOiBzdHJpbmc7IC8vIEVSUCwgUEFJLCBNREMsIFRCRlxyXG4gICAgICAgIFJlZ2lzdGVyZWRBcHBJZDogc3RyaW5nOyAvLyBpbnN0YW5jZSBrZXlcclxuICAgICAgICBSZWdpc3RlcmVkQXBwVHlwZTogc3RyaW5nOyAvLyBUQkxPQURFUiwgTkVUQ09SRSwgTkcsIFBST1ZJU0lPTklOR1xyXG4gICAgICAgIENhdGVnb3J5OiBzdHJpbmc7IC8vXHJcbiAgICAgICAgTW9kdWxlOiBzdHJpbmc7XHJcbiAgICAgICAgU3ViTW9kdWxlOiBzdHJpbmc7XHJcbiAgICAgICAgRG9jdW1lbnQ6IHN0cmluZztcclxuICAgICAgICBTdWJzY3JpcHRpb246IHN0cmluZztcclxuICAgICAgICBBY2NvdW50TmFtZTogc3RyaW5nO1xyXG4gICAgICAgIExpZmV0aW1lOiBzdHJpbmc7XHJcbiAgICAgICAgT3BlcmF0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgQ29udGV4dERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgTWV0aG9kOiBzdHJpbmc7XHJcbiAgICAgICAgRW50cnlDcmVhdGVkOiBzdHJpbmc7XHJcbiAgICAgICAgTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgICAgIExldmVsOiBudW1iZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgZW51bSBMb2dTdGF0dXMge1xyXG4gICAgSW5mbyA9IDAsXHJcbiAgICBEZWJ1ZyA9IDEsXHJcbiAgICBXYXJuID0gMixcclxuICAgIEVycm9yID0gMyxcclxuICAgIEZhdGFsID0gNFxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgRW50cmllc1BhcmFtcyB9IGZyb20gJy4uL21vZGVscy9lbnRyaWVzLm1vZGVsJztcclxuaW1wb3J0IHsgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL2xvZ2dlci1vcGVyYXRpb24tcmVzdWx0Lm1vZGVsJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgdGFwLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU3RvbXBSU2VydmljZSwgU3RvbXBDb25maWcsIFN0b21wU3RhdGUgfSBmcm9tICdAc3RvbXAvbmcyLXN0b21wanMnO1xyXG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnQHN0b21wL3N0b21wanMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYkxvZ2dlclNlcnZpY2Uge1xyXG4gICAgcHVibGljIGxvZ2dlclVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBob3dNYW55ID0gMTAwO1xyXG5cclxuICAgIHB1YmxpYyBtcUNvbm5lY3Rpb25TdGF0ZTogU3RvbXBTdGF0ZSA9IFN0b21wU3RhdGUuQ0xPU0VEO1xyXG4gICAgcHVibGljIG1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZTogQmVoYXZpb3JTdWJqZWN0PFN0b21wU3RhdGU+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChTdG9tcFN0YXRlLkNMT1NFRCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgnZW52JykgcHJpdmF0ZSBlbnYsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHVibGljIHN0b21wU2VydmljZTogU3RvbXBSU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMubXFJbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbXFJbml0KCkge1xyXG4gICAgICAgIHRoaXMuc3RvbXBTZXJ2aWNlLmNvbmZpZyA9IHRoaXMuZW52LnN0b21wQ29uZmlnO1xyXG4gICAgICAgIHRoaXMuc3RvbXBTZXJ2aWNlLmluaXRBbmRDb25uZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zdG9tcFNlcnZpY2Uuc3RhdGUuc3Vic2NyaWJlKChzdGF0dXM6IFN0b21wU3RhdGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tcUNvbm5lY3Rpb25TdGF0ZSA9IHN0YXR1cztcclxuICAgICAgICAgICAgdGhpcy5tcUNvbm5lY3Rpb25TdGF0ZU9ic2VydmFibGUubmV4dChzdGF0dXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUml0b3JuYSBsYSBiYXNlIHVybCBkZWwgbG9nZ2VyLFxyXG4gICAgICogY2FyaWNhdGEgZGEgdW4gZmlsZSBkaSBjb25maWd1cmF6aW9uZSBjYXJpY2F0byBkaW5hbWljYW1lbnRlIChhc3NldHMvZW52aXJvbm1lbnQuanNvbilcclxuICAgICAqL1xyXG4gICAgZ2V0TG9nZ2VyVXJsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2dlclVybCA/IHRoaXMubG9nZ2VyVXJsIDogdGhpcy5lbnYubG9nZ2VyLnVybDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnNvbGUubG9nIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgbG9nKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnNvbGUubG9nIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZGVidWcobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS53YXJuIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgd2FybihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS5lcnJvciBpbiBhdHRlc2EgZGkgcG9zdCB0byBsb2dnZXJcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zXHJcbiAgICAgKi9cclxuICAgIGVycm9yKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJuIGxvZ3M6IExvZ2dlck9wZXJhdGlvblJlc3VsdFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbXM6IEVudHJpZXNQYXJhbXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldExvZ3MocGFyYW1zOiBFbnRyaWVzUGFyYW1zKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFwYXJhbXMuYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLlJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5NZXNzYWdlID0gJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgZW50cmllcy8ke3BhcmFtcy5hcHBJZH1gO1xyXG5cclxuICAgICAgICBsZXQgcCA9IG5ldyBIdHRwUGFyYW1zKCk7XHJcbiAgICAgICAgcCA9IHAuYXBwZW5kKCdob3dNYW55JywgJycgKyB0aGlzLmhvd01hbnkpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXBwcykgcCA9IHAuYXBwZW5kKCdhcHBzJywgcGFyYW1zLmFwcHMpO1xyXG4gICAgICAgIGlmIChwYXJhbXMuYXBwVHlwZXMpIHAgPSBwLmFwcGVuZCgnYXBwVHlwZXMnLCBwYXJhbXMuYXBwVHlwZXMpO1xyXG5cclxuICAgICAgICBjb25zdCBodHRwT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgcGFyYW1zOiBwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwsIGh0dHBPcHRpb25zKS5waXBlKFxyXG4gICAgICAgICAgICB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRMb2dzJywgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0TG9ncycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5SZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IuTWVzc2FnZSA9ICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcHMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwcycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBcHBUeXBlcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFhcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IuUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLk1lc3NhZ2UgPSAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBUeXBlcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcyB3aXRoIGFwcElkOiAnLCBhcHBJZCwgb3ApKSxcclxuICAgICAgICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwVHlwZXMnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBIdHRwIG9wZXJhdGlvbiB0aGF0IGZhaWxlZC5cclxuICAgICAqIExldCB0aGUgYXBwIGNvbnRpbnVlLlxyXG4gICAgICogQHBhcmFtIG9wZXJhdGlvbiAtIG5hbWUgb2YgdGhlIG9wZXJhdGlvbiB0aGF0IGZhaWxlZFxyXG4gICAgICogQHBhcmFtIHJlc3VsdCAtIG9wdGlvbmFsIHZhbHVlIHRvIHJldHVybiBhcyB0aGUgb2JzZXJ2YWJsZSByZXN1bHRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGhhbmRsZUVycm9yPFQ+KG9wZXJhdGlvbiA9ICdvcGVyYXRpb24nLCByZXN1bHQ/OiBUKSB7XHJcbiAgICAgICAgcmV0dXJuIChlcnJvcjogYW55KTogT2JzZXJ2YWJsZTxUPiA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7b3BlcmF0aW9ufSBmYWlsZWQ6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuXHJcbiAgICAgICAgICAgIC8vIExldCB0aGUgYXBwIGtlZXAgcnVubmluZyBieSByZXR1cm5pbmcgYW4gZW1wdHkgcmVzdWx0LlxyXG4gICAgICAgICAgICByZXR1cm4gb2YocmVzdWx0IGFzIFQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25uZXNzaW9uZSBhIFJhYmJpdE1RXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtcUNvbm5lY3QocXVldWVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9tcFNlcnZpY2Uuc3Vic2NyaWJlKHF1ZXVlTmFtZSkucGlwZShtYXAoKG1zZzogTWVzc2FnZSkgPT4gSlNPTi5wYXJzZShtc2cuYm9keSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbXFDb25uZWN0ZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvbXBTZXJ2aWNlLmNvbm5lY3RlZCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG1xRGlzY29ubmVjdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9tcFNlcnZpY2UuZGlzY29ubmVjdCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IExvZyB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL2xvZy5tb2RlbCc7XHJcbmltcG9ydCB7IExvZ1N0YXR1cyB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL2xvZy1zdGF0dXMuZW51bSc7XHJcbmltcG9ydCB7IFRiTG9nZ2VyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvdGItbG9nZ2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMb2dnZXJPcGVyYXRpb25SZXN1bHQgfSBmcm9tICcuLy4uLy4uL21vZGVscy9sb2dnZXItb3BlcmF0aW9uLXJlc3VsdC5tb2RlbCc7XHJcblxyXG5pbXBvcnQgeyBkZWxheSwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEVudHJpZXNQYXJhbXMgfSBmcm9tICcuLi8uLi9tb2RlbHMvZW50cmllcy5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGItbG9nZ2VyLXZpZXdlcicsXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8bGFiZWwgaWQ9XCJsb2dnZXItdXJsLWxhYmVsXCIgY2xhc3M9XCJoLWxhYmVsXCIgZm9yPVwibG9nZ2VyLXVybFwiPkxvZ2dlciBVUkw6PC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQga2VuZG9UZXh0Qm94IGlkPVwibG9nZ2VyLXVybFwiIFsobmdNb2RlbCldPVwibG9nZ2VyVXJsXCIgKGJsdXIpPVwic2V0TG9nZ2VyVXJsKCRldmVudClcIiAoY2xpY2spPVwiJGV2ZW50LnRhcmdldC5zZWxlY3QoKVwiIC8+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJrLWljb24gay1pLXJlc2V0IFwiIChjbGljayk9XCJnZXRMb2dzKClcIj48L3NwYW4+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhdXRvcmVmcmVzaFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJhdXRvUmVmcmVzaFwiIGNsYXNzPVwiay1jaGVja2JveFwiIFtuZ01vZGVsXT1cImNoZWNrZWRcIiAobmdNb2RlbENoYW5nZSk9XCJjaGVja0F1dG9SZWZyZXNoKCRldmVudClcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiay1jaGVja2JveC1sYWJlbFwiIGZvcj1cImF1dG9SZWZyZXNoXCI+QXV0byByZWZyZXNoICg1cyk8L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJcIj5cclxuICAgICAgICAgICAgPCEtLSBBUFAgSUQgLS0+XHJcbiAgICAgICAgICAgIDxsYWJlbCBpZD1cImxvZ2dlci1hcHAtaWQtbGFiZWxcIiBjbGFzcz1cImgtbGFiZWxcIiBmb3I9XCJsb2dnZXItYXBwLWlkXCIgKGNsaWNrKT1cImFwcExpc3RJbml0KClcIj5JbnN0YW5jZSBLZXk6PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IGtlbmRvVGV4dEJveCAjYXBwSWRJbnB1dCBbKG5nTW9kZWwpXT1cImFwcElkXCIgKGJsdXIpPVwic2V0QXBwSWQoJGV2ZW50KVwiIGlkPVwia2EtYXBwLWlkXCIgKGNsaWNrKT1cIiRldmVudC50YXJnZXQuc2VsZWN0KClcIlxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIDJkMTM2YzYxLWFhYzItNDQyZC05MjZjLWE1MzFjMzY4NTAzNVwiIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJcIj5cclxuICAgICAgICAgICAgPCEtLSBBUFAgLS0+XHJcbiAgICAgICAgICAgIDxsYWJlbCBpZD1cImxvZ2dlci1hcHAtbGFiZWxcIiBjbGFzcz1cImgtbGFiZWxcIiBmb3I9XCJsb2dnZXItYXBwXCI+QXBwOjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxrZW5kby1hdXRvY29tcGxldGUgI2FwcExpc3QgW2RhdGFdPVwiYXBwRGF0YVwiIFtzdWdnZXN0XT1cInRydWVcIiBbcGxhY2Vob2xkZXJdPVwiJ2UuZy4gRVJQLCBNREMsIFRCRidcIlxyXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJhcHBcIiAodmFsdWVDaGFuZ2UpPVwic2V0QXBwKCRldmVudClcIiBpZD1cImthLWFwcFwiPlxyXG4gICAgICAgICAgICA8L2tlbmRvLWF1dG9jb21wbGV0ZT5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlclwiPlxyXG4gICAgICAgICAgICA8IS0tIEFQUCBUWVBFIC0tPlxyXG4gICAgICAgICAgICA8bGFiZWwgaWQ9XCJsb2dnZXItYXBwLXR5cGUtbGFiZWxcIiBjbGFzcz1cImgtbGFiZWxcIiBmb3I9XCJsb2dnZXItYXBwLXR5cGVcIj5BcHBUeXBlOjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxrZW5kby1hdXRvY29tcGxldGUgI2FwcFR5cGVMaXN0IFtkYXRhXT1cImFwcFR5cGVEYXRhXCIgW3N1Z2dlc3RdPVwidHJ1ZVwiIFtwbGFjZWhvbGRlcl09XCInZS5nLiBUQkxPQURFUiwgTkVUQ09SRSwgTkcnXCJcclxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiYXBwVHlwZVwiICh2YWx1ZUNoYW5nZSk9XCJzZXRBcHBUeXBlKCRldmVudClcIiBpZD1cImthLWFwcC10eXBlXCI+XHJcbiAgICAgICAgICAgIDwva2VuZG8tYXV0b2NvbXBsZXRlPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm5vdGlmeVwiICpuZ0lmPVwibWVzc2FnZVwiPlxyXG4gICAgICAgIDxwPnt7bWVzc2FnZX19PC9wPlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiBjbGFzcz1cIm1vbml0b3JcIj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwibG9hZGluZ1wiICpuZ0lmPVwibG9hZGluZ1wiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiay1pY29uIGstaS1sb2FkaW5nXCI+PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPHVsIGNsYXNzPVwibG9nc1wiICpuZ0lmPVwiIWxvYWRpbmdcIj5cclxuICAgICAgICA8bGkgKm5nSWY9XCJsb2dzLmxlbmd0aCA9PSAwXCIgY2xhc3M9XCJuby1sb2dzXCI+Tm8gTG9ncyB3aXRoIGFwcElkOjxzdHJvbmc+e3thcHBJZH19PC9zdHJvbmc+PC9saT5cclxuICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGxvZyBvZiBsb2dzXCIgY2xhc3M9XCJsb2dcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWRhdGVcIj57e2xvZy5Mb2dFbnRyeS5FbnRyeUNyZWF0ZWQgfCBkYXRlOiAnbWVkaXVtJyB9fSA8L3NwYW4+IC1cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWFjY291bnQtbmFtZVwiPiB7e2xvZy5Mb2dFbnRyeS5BY2NvdW50TmFtZSB9fSA8L3NwYW4+IC1cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWFwcFwiICpuZ0lmPVwibG9nLkxvZ0VudHJ5LkFwcFwiPiB7e2xvZy5Mb2dFbnRyeS5BcHAgfX0gLTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLXR5cGVcIiAqbmdJZj1cImxvZy5Mb2dFbnRyeS5SZWdpc3RlcmVkQXBwVHlwZVwiPiB7e2xvZy5Mb2dFbnRyeS5SZWdpc3RlcmVkQXBwVHlwZSB9fSAtPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtY2F0ZWdvcnlcIiAqbmdJZj1cImxvZy5Mb2dFbnRyeS5DYXRlZ29yeVwiPiB7e2xvZy5Mb2dFbnRyeS5DYXRlZ29yeSB9fSAtPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtc3RhdHVzIGxldmVsLXt7bG9nLkxvZ0VudHJ5LkxldmVsfX1cIj5be3tsb2dTdGF0dXNbbG9nLkxvZ0VudHJ5LkxldmVsXX19XTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLW1zZ1wiPiB7e2xvZy5Mb2dFbnRyeS5NZXNzYWdlfX0gPC9zcGFuPlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICA8L3VsPlxyXG48L2Rpdj5gLFxyXG4gICAgc3R5bGVzOiBbYDpob3N0KHRiLWxvZ2dlci12aWV3ZXIpe2ZsZXg6MTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1ufTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5ub3RpZnl7YmFja2dyb3VuZDojZmYwYjBiO3BhZGRpbmc6NXB4IDEwcHg7bWFyZ2luOjEwcHggMDtjb2xvcjojZmZmfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5ub3RpZnkgcHttYXJnaW46NXB4IDA7Zm9udC1zaXplOjEycHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlcntkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO21hcmdpbjozMHB4IDAgMTBweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIC5yb3d7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOnJvdzthbGlnbi1pdGVtczpjZW50ZXI7bWFyZ2luOjVweCAwfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgLnJvdy5mbGV4LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgLnJvdy5mbGV4LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgLnJvdy5mbGV4LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAucm93IC5maWx0ZXIgI2thLWFwcC1pZHt3aWR0aDozMzBweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIGxhYmVsLmgtbGFiZWx7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToxNHB4O21hcmdpbjowIDEwcHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAjbG9nZ2VyLXVybHt3aWR0aDo1MDBweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIC5rLWNoZWNrYm94LWxhYmVse2ZvbnQtc2l6ZToxMnB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5tb25pdG9ye2Rpc3BsYXk6ZmxleDtmbGV4OjE7YmFja2dyb3VuZDojZjFmMWYxO2JvcmRlcjoxcHggc29saWQgI2NjYztwYWRkaW5nOjA7bWFyZ2luOjVweCAwfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5tb25pdG9yIC5sb2FkaW5ne2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtmbGV4OjF9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLm1vbml0b3IgLmxvYWRpbmcgLmstaS1sb2FkaW5ne2ZvbnQtc2l6ZTozNHB4O2NvbG9yOiM5OTl9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmstaS1yZXNldHttYXJnaW4tcmlnaHQ6MTBweDtjb2xvcjojMDI3N2JkO2JvcmRlcjpub25lO3BhZGRpbmc6NXB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5rLWktcmVzZXQ6aG92ZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6IzIyMn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSBocntiYWNrZ3JvdW5kOiMwMjc3YmQ7aGVpZ2h0OjFweDtib3JkZXI6bm9uZX06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9nc3ttYXJnaW46MDtwYWRkaW5nOjVweDtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6YXV0bztmbGV4OjF9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLm5vLWxvZ3N7Zm9udC1zaXplOjEycHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLm5vLWxvZ3Mgc3Ryb25ne2ZvbnQtd2VpZ2h0OjUwMH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9ne2ZvbnQtc2l6ZToxMnB4O21hcmdpbjozcHggMH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLWRhdGV7Y29sb3I6Izk5OX06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLWFjY291bnQtbmFtZXtjb2xvcjojMDBmfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtc3RhdHVze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTttYXJnaW46MCAzcHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1zdGF0dXMubGV2ZWwtMHtjb2xvcjojMDAwfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtc3RhdHVzLmxldmVsLTF7Y29sb3I6IzAwZn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLXN0YXR1cy5sZXZlbC0ye2NvbG9yOm9yYW5nZX06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLXN0YXR1cy5sZXZlbC0ze2NvbG9yOnJlZH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLXN0YXR1cy5sZXZlbC00e2NvbG9yOnJlZH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9nZ2VyVmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICAgIC8vIGluc3RhbmNlIGtleVxyXG4gICAgQFZpZXdDaGlsZCgnYXBwSWRJbnB1dCcpXHJcbiAgICBhcHBJZElucHV0O1xyXG4gICAgYXBwSWQ6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBJZCcpID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcElkJykgOiAnJztcclxuXHJcbiAgICAvLyBhcHBcclxuICAgIEBWaWV3Q2hpbGQoJ2FwcExpc3QnKVxyXG4gICAgYXBwTGlzdDtcclxuICAgIHB1YmxpYyBhcHBEYXRhOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBhcHA6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHAnKSA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHAnKSA6ICcnO1xyXG5cclxuICAgIC8vIGFwcCB0eXBlc1xyXG4gICAgQFZpZXdDaGlsZCgnYXBwVHlwZUxpc3QnKVxyXG4gICAgYXBwVHlwZUxpc3Q7XHJcbiAgICBwdWJsaWMgYXBwVHlwZURhdGE6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIGFwcFR5cGU6IHN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBUeXBlJykgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwVHlwZScpIDogJyc7XHJcblxyXG4gICAgbG9nczogTG9nW10gPSBbXTtcclxuICAgIGxvZ1N0YXR1cyA9IExvZ1N0YXR1cztcclxuICAgIHNob3cgPSBmYWxzZTtcclxuICAgIGxvYWRpbmcgPSBmYWxzZTtcclxuICAgIGhvd01hbnkgPSAxMDA7XHJcbiAgICBjaGVja2VkID0gZmFsc2U7XHJcbiAgICBhdXRvUmVmcmVzaCA9IGZhbHNlO1xyXG4gICAgYXV0b1JlZnJlc2hJbnRlcnZhbDogYW55O1xyXG4gICAgbWVzc2FnZSA9ICcnO1xyXG5cclxuICAgIGxvZ2dlclVybCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZXJVcmwnKSA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZXJVcmwnKSA6IHRoaXMubG9nZ2VyU2VydmljZS5nZXRMb2dnZXJVcmwoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9nZ2VyU2VydmljZTogVGJMb2dnZXJTZXJ2aWNlKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuYXBwTGlzdEluaXQoKTtcclxuICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7fVxyXG5cclxuICAgIC8vIGxlZ2dvIHR1dHRlIGxlIGFwcCwgZ2xpIGFwcElkIGUgZ2xpIGFwcFR5cGUgZSBsaSBzYWx2byBpbiByaXNwZXR0aXZpIGFycmF5XHJcbiAgICAvLyB2ZXJyYW5ubyBwb2kgZmlsdHJhdGkgZGFpIGNvbXBvbmVudGkga2VuZG9cclxuICAgIGFwcExpc3RJbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hcHBJZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5nZXRBcHBzKHRoaXMuYXBwSWQpLnN1YnNjcmliZSgob3A6IExvZ2dlck9wZXJhdGlvblJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFwcERhdGEgPSBvcC5Db250ZW50O1xyXG4gICAgICAgICAgICB0aGlzLmFwcExpc3QubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcyh0aGlzLmFwcElkKS5zdWJzY3JpYmUoKG9wOiBMb2dnZXJPcGVyYXRpb25SZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hcHBUeXBlRGF0YSA9IG9wLkNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwVHlwZUxpc3QubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRMb2dzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hcHBJZCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnSW5zdGFuY2UgS2V5IG1hbmNhbnRlJztcclxuICAgICAgICAgICAgdGhpcy5hcHBJZElucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IEVudHJpZXNQYXJhbXMoKTtcclxuICAgICAgICBwYXJhbXMuYXBwSWQgPSB0aGlzLmFwcElkO1xyXG4gICAgICAgIGlmICh0aGlzLmFwcCkgcGFyYW1zLmFwcHMgPSB0aGlzLmFwcDtcclxuICAgICAgICBpZiAodGhpcy5hcHBUeXBlKSBwYXJhbXMuYXBwVHlwZXMgPSB0aGlzLmFwcFR5cGU7XHJcblxyXG4gICAgICAgIHRoaXMubG9nZ2VyU2VydmljZS5nZXRMb2dzKHBhcmFtcykuc3Vic2NyaWJlKChvcDogTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghb3AuUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBvcC5NZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMubG9ncyA9IG9wLkNvbnRlbnQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0TG9nZ2VyVXJsKGV2ZW50KSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2dlclVybCcsIHRoaXMubG9nZ2VyVXJsKTtcclxuICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QXBwKCRldmVudCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhcHAnLCB0aGlzLmFwcCk7XHJcbiAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEFwcElkKCRldmVudCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhcHBJZCcsIHRoaXMuYXBwSWQpO1xyXG4gICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRBcHBUeXBlKCRldmVudCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhcHBUeXBlJywgdGhpcy5hcHBUeXBlKTtcclxuICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmF1dG9SZWZyZXNoSW50ZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjaGVja0F1dG9SZWZyZXNoKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmF1dG9SZWZyZXNoID0gIXRoaXMuYXV0b1JlZnJlc2g7XHJcbiAgICAgICAgaWYgKHRoaXMuYXV0b1JlZnJlc2gpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0b1JlZnJlc2hJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgICAgICAgICB9LCA1MDAwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvUmVmcmVzaEludGVydmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuYXV0b1JlZnJlc2hJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItbm90aWZpY2F0aW9uJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGJOb3RpZmljYXRpb25TZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge31cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhtc2csIHN0eWxlOiBhbnkgPSAnbm9uZScpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvdyh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IG1zZyxcclxuICAgICAgICAgICAgYW5pbWF0aW9uOiB7IHR5cGU6ICdzbGlkZScsIGR1cmF0aW9uOiAyMDAgfSxcclxuICAgICAgICAgICAgcG9zaXRpb246IHsgaG9yaXpvbnRhbDogJ3JpZ2h0JywgdmVydGljYWw6ICdib3R0b20nIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IHsgc3R5bGU6IHN0eWxlLCBpY29uOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIGhpZGVBZnRlcjogNDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTdG9tcFN0YXRlIH0gZnJvbSAnQHN0b21wL25nMi1zdG9tcGpzJztcclxuXHJcbmltcG9ydCB7IExvZ1N0YXR1cyB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL2xvZy1zdGF0dXMuZW51bSc7XHJcbmltcG9ydCB7IFRiTG9nZ2VyU2VydmljZSB9IGZyb20gJy4vLi4vLi4vc2VydmljZXMvdGItbG9nZ2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUYk5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3RpZmljYXRpb24uc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndGItcmFiYml0LXZpZXdlcicsXHJcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8bGFiZWwgaWQ9XCJtcS1xdWV1ZS1uYW1lLWxhYmVsXCIgY2xhc3M9XCJoLWxhYmVsXCIgZm9yPVwibXEtY29ubmVjdGlvbi1zdGF0ZVwiPk1RIENvbm5lY3Rpb24gc3RhdGU6PC9sYWJlbD5cclxuICAgICAgICA8cCBpZD1cIm1xLWNvbm5lY3Rpb24tc3RhdGVcIj57e3N0b21wU3RhdGVbbG9nZ2VyU2VydmljZS5tcUNvbm5lY3Rpb25TdGF0ZV19fTwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgIDxsYWJlbCBpZD1cIm1xLXF1ZXVlLW5hbWUtbGFiZWxcIiBjbGFzcz1cImgtbGFiZWxcIiBmb3I9XCJtcS1xdWV1ZVwiPlF1ZXVlIE5hbWU6PC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQga2VuZG9UZXh0Qm94IGlkPVwibXEtcXVldWUtbmFtZVwiIFsobmdNb2RlbCldPVwibXFRdWV1ZU5hbWVcIiAoY2xpY2spPVwiJGV2ZW50LnRhcmdldC5zZWxlY3QoKVwiIC8+XHJcbiAgICAgICAgPGJ1dHRvbiBrZW5kb0J1dHRvbiAoY2xpY2spPVwibXFTdWJzY3JpYmUoKVwiIFtkaXNhYmxlZF09XCJsb2dnZXJTZXJ2aWNlLm1xQ29ubmVjdGlvblN0YXRlICE9PSBzdG9tcFN0YXRlLkNPTk5FQ1RFRFwiPkNvbm5lY3Q8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiBjbGFzcz1cIm1vbml0b3JcIj5cclxuICAgIDx1bCBjbGFzcz1cIm1lc3NhZ2VzXCI+XHJcbiAgICAgICAgPGxpICpuZ0lmPVwibXFNZXNzYWdlcy5sZW5ndGggPT0gMFwiIGNsYXNzPVwibm8tbWVzc2FnZXNcIj5ObyBtZXNzYWdlcyBpbiBxdWV1ZTo8c3Ryb25nPnt7bXFRdWV1ZU5hbWV9fTwvc3Ryb25nPjwvbGk+XHJcbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBtIG9mIG1xTWVzc2FnZXNcIiBjbGFzcz1cIm1lc3NhZ2VcIj5cclxuICAgICAgICAgICAgPCEtLSA8c3BhbiBjbGFzcz1cImwtbXNnXCI+IHt7bS5VUE1lc3NhZ2V9fSA8L3NwYW4+IC0tPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtZGF0ZVwiPnt7bS5VUENvbnRlbnQuRW50cnlDcmVhdGVkIHwgZGF0ZTogJ21lZGl1bScgfX0gPC9zcGFuPiAtXHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1hY2NvdW50LW5hbWVcIj4ge3ttLlVQQ29udGVudC5BY2NvdW50TmFtZSB9fSA8L3NwYW4+IC1cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWFwcFwiICpuZ0lmPVwibS5VUENvbnRlbnQuQXBwXCI+IHt7bS5VUENvbnRlbnQuQXBwIH19IC08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC10eXBlXCIgKm5nSWY9XCJtLlVQQ29udGVudC5SZWdpc3RlcmVkQXBwVHlwZVwiPiB7e20uVVBDb250ZW50LlJlZ2lzdGVyZWRBcHBUeXBlIH19IC08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1jYXRlZ29yeVwiICpuZ0lmPVwibS5VUENvbnRlbnQuQ2F0ZWdvcnlcIj4ge3ttLlVQQ29udGVudC5DYXRlZ29yeSB9fSAtPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtc3RhdHVzIGxldmVsLXt7bS5VUENvbnRlbnQuTGV2ZWx9fVwiPiBbe3tsb2dTdGF0dXNbbS5VUENvbnRlbnQuTGV2ZWxdfX1dPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtbXNnXCI+IHt7bS5VUENvbnRlbnQuTWVzc2FnZX19IDwvc3Bhbj5cclxuICAgICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuPC9kaXY+YCxcclxuICAgIHN0eWxlczogW2A6aG9zdCh0Yi1yYWJiaXQtdmlld2VyKXtmbGV4OjE7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubm90aWZ5e2JhY2tncm91bmQ6I2ZmMGIwYjtwYWRkaW5nOjVweCAxMHB4O21hcmdpbjoxMHB4IDA7Y29sb3I6I2ZmZn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubm90aWZ5IHB7bWFyZ2luOjVweCAwO2ZvbnQtc2l6ZToxMnB4fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXJ7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIC5yb3d7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOnJvdzthbGlnbi1pdGVtczpjZW50ZXI7bWFyZ2luOjVweCAwfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXIgLnJvdy5mbGV4LWNlbnRlcntqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXIgLnJvdy5mbGV4LWFyb3VuZHtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXIgLnJvdy5mbGV4LWJldHdlZW57anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW59Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmhlYWRlciAucm93ICNtcS1xdWV1ZS1uYW1le3dpZHRoOjUwMHB4fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXIgbGFiZWwuaC1sYWJlbHtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjAgMTBweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIC5rLWNoZWNrYm94LWxhYmVse2ZvbnQtc2l6ZToxMnB4fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tb25pdG9ye2Rpc3BsYXk6ZmxleDtmbGV4OjE7YmFja2dyb3VuZDojZjFmMWYxO2JvcmRlcjoxcHggc29saWQgI2NjYztwYWRkaW5nOjA7bWFyZ2luOjVweCAwfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tb25pdG9yIC5sb2FkaW5ne2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtmbGV4OjF9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1vbml0b3IgLmxvYWRpbmcgLmstaS1sb2FkaW5ne2ZvbnQtc2l6ZTozNHB4O2NvbG9yOiM5OTl9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmstaS1yZXNldHttYXJnaW4tcmlnaHQ6MTBweDtjb2xvcjojMDI3N2JkO2JvcmRlcjpub25lO3BhZGRpbmc6NXB4fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5rLWktcmVzZXQ6aG92ZXJ7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6IzIyMn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSBocntiYWNrZ3JvdW5kOiMwMjc3YmQ7aGVpZ2h0OjFweDtib3JkZXI6bm9uZX06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXN7bWFyZ2luOjA7cGFkZGluZzo1cHg7bGlzdC1zdHlsZTpub25lO292ZXJmbG93OmF1dG87ZmxleDoxfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubm8tbG9nc3tmb250LXNpemU6MTJweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm5vLWxvZ3Mgc3Ryb25ne2ZvbnQtd2VpZ2h0OjUwMH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2V7Zm9udC1zaXplOjEycHg7bWFyZ2luOjNweCAwfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1kYXRle2NvbG9yOiM5OTl9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLWFjY291bnQtbmFtZXtjb2xvcjojMDBmfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1zdGF0dXN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO21hcmdpbjowIDNweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtc3RhdHVzLmxldmVsLTB7Y29sb3I6IzAwMH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtc3RhdHVzLmxldmVsLTF7Y29sb3I6IzAwZn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtc3RhdHVzLmxldmVsLTJ7Y29sb3I6b3JhbmdlfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1zdGF0dXMubGV2ZWwtM3tjb2xvcjpyZWR9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLXN0YXR1cy5sZXZlbC00e2NvbG9yOnJlZH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmFiYml0Vmlld2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcclxuICAgIHN0b21wU3RhdGUgPSBTdG9tcFN0YXRlO1xyXG4gICAgbG9nU3RhdHVzID0gTG9nU3RhdHVzO1xyXG5cclxuICAgIG1xQ29ubmVjdGlvblN0YXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgICBtcUNvbm5lY3Rpb25TdGF0ZTogU3RvbXBTdGF0ZTtcclxuXHJcbiAgICBtcVF1ZXVlOiBTdWJzY3JpcHRpb247XHJcbiAgICBtcVF1ZXVlTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtcVF1ZXVlTmFtZScpID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21xUXVldWVOYW1lJykgOiAnJztcclxuXHJcbiAgICBwdWJsaWMgbXFNZXNzYWdlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2dnZXJTZXJ2aWNlOiBUYkxvZ2dlclNlcnZpY2UsIHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogVGJOb3RpZmljYXRpb25TZXJ2aWNlKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMubXFDb25uZWN0aW9uU3RhdGVTdWJzY3JpcHRpb24gPSB0aGlzLmxvZ2dlclNlcnZpY2UubXFDb25uZWN0aW9uU3RhdGVPYnNlcnZhYmxlLnN1YnNjcmliZShzdGF0dXMgPT5cclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZU1xU3RhdGUoc3RhdHVzKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge31cclxuXHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlTXFTdGF0ZShzdGF0dXM6IFN0b21wU3RhdGUpIHtcclxuICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlID0gc3RhdHVzO1xyXG5cclxuICAgICAgICBpZiAoc3RhdHVzID09PSBTdG9tcFN0YXRlLkNPTk5FQ1RFRCAmJiB0aGlzLm1xUXVldWVOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXFTdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1xU3Vic2NyaWJlKCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtcVF1ZXVlTmFtZScsIHRoaXMubXFRdWV1ZU5hbWUpO1xyXG4gICAgICAgIGNvbnN0IHF1ZXVlTmFtZSA9IGAvcXVldWUvJHt0aGlzLm1xUXVldWVOYW1lfWA7XHJcbiAgICAgICAgdGhpcy5tcVF1ZXVlID0gdGhpcy5sb2dnZXJTZXJ2aWNlLm1xQ29ubmVjdChxdWV1ZU5hbWUpLnN1YnNjcmliZShtc2cgPT4gdGhpcy5vbk1lc3NhZ2UobXNnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1lc3NhZ2UobXNnKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1JhYmJpdFZpZXdlckNvbXBvbmVudC5vbk1lc3NhZ2UnLCBtc2cpO1xyXG5cclxuICAgICAgICB0aGlzLm1xTWVzc2FnZXMucHVzaChtc2cpO1xyXG5cclxuICAgICAgICBsZXQgc3R5bGUgPSAnbm9uZSc7XHJcbiAgICAgICAgaWYgKG1zZy5VUENvbnRlbnQpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChtc2cuVVBDb250ZW50LkxldmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIExvZ1N0YXR1cy5XYXJuOlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0gJ3dhcm5pbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBMb2dTdGF0dXMuRXJyb3I6XHJcbiAgICAgICAgICAgICAgICBjYXNlIExvZ1N0YXR1cy5GYXRhbDpcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9ICdlcnJvcic7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93KG1zZy5VUE1lc3NhZ2UsIHN0eWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEJ1dHRvbnNNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1idXR0b25zJztcclxuaW1wb3J0IHsgRHJvcERvd25zTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItZHJvcGRvd25zJztcclxuaW1wb3J0IHsgSW5wdXRzTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItaW5wdXRzJztcclxuaW1wb3J0IHsgRGF0ZUlucHV0c01vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLWRhdGVpbnB1dHMnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1ub3RpZmljYXRpb24nO1xyXG5cclxuaW1wb3J0IHsgU3RvbXBSU2VydmljZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcblxyXG5pbXBvcnQgeyBMb2dnZXJWaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbG9nZ2VyLXZpZXdlci9sb2dnZXItdmlld2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFJhYmJpdFZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9yYWJiaXQtdmlld2VyL3JhYmJpdC12aWV3ZXIuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBOb3RpZmljYXRpb25Nb2R1bGUsIEJ1dHRvbnNNb2R1bGUsIElucHV0c01vZHVsZSwgRGF0ZUlucHV0c01vZHVsZSwgRm9ybXNNb2R1bGUsIERyb3BEb3duc01vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtMb2dnZXJWaWV3ZXJDb21wb25lbnQsIFJhYmJpdFZpZXdlckNvbXBvbmVudF0sXHJcbiAgICBleHBvcnRzOiBbTG9nZ2VyVmlld2VyQ29tcG9uZW50LCBSYWJiaXRWaWV3ZXJDb21wb25lbnRdLFxyXG4gICAgcHJvdmlkZXJzOiBbU3RvbXBSU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyTW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBUYkxvZ2dlck1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbU3RvbXBSU2VydmljZV1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBO0lBV0k7S0FBZ0I7d0JBWHBCO0lBWUM7Ozs7OztBQ1pELElBQUE7SUFNSTtLQUFnQjswQkFOcEI7SUFPQzs7Ozs7O0FDUEQsSUFBQTtJQU1JO0tBQWdCO2dDQU5wQjtJQU9DOzs7Ozs7QUNQRCxJQUFBO0lBcUJJO0tBQWdCO2NBckJwQjtJQXNCQzs7Ozs7Ozs7SUNyQkcsT0FBUTtJQUNSLFFBQVM7SUFDVCxPQUFRO0lBQ1IsUUFBUztJQUNULFFBQVM7O29CQUpULElBQUk7b0JBQ0osS0FBSztvQkFDTCxJQUFJO29CQUNKLEtBQUs7b0JBQ0wsS0FBSzs7Ozs7OztJQ2VMLHlCQUFtQyxHQUFHLEVBQVUsSUFBZ0IsRUFBUyxZQUEyQjtRQUFqRSxRQUFHLEdBQUgsR0FBRyxDQUFBO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFlO3VCQUxsRixHQUFHO2lDQUVrQixVQUFVLENBQUMsTUFBTTsyQ0FDVSxJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBR3BHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNqQjs7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