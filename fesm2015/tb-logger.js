import { Injectable, Inject, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StompState, StompRService } from '@stomp/ng2-stompjs';
import { NotificationService, NotificationModule } from '@progress/kendo-angular-notification';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EntriesParams {
    /**
     * @param {?} instanceKey
     */
    constructor(instanceKey) {
        this.instanceKey = instanceKey;
    }
}
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
class MonitorParams {
    /**
     * @param {?} instanceKey
     * @param {?} accountName
     * @param {?} processName
     */
    constructor(instanceKey, accountName, processName) {
        this.minutes = '1';
        this.instanceKey = instanceKey;
        this.accountName = accountName;
        this.processName = processName;
    }
}
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
class LoggerOperationResult {
    /**
     * @param {?} Result
     * @param {?} Message
     */
    constructor(Result, Message) {
        this.Result = Result;
    }
}
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
const LogStatus = {
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
let loggerInstance;
/** @type {?} */
const logger = (/**
 * @return {?}
 */
() => loggerInstance);
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
const LogLevel = {
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
function prepareLog(message, logLevel = LogLevel.Debug) {
    /** @type {?} */
    const log = {
        Message: message,
        Registeredappid: logger().getAppId(),
        AccountName: localStorage.getItem('_accountname'),
        Subscription: localStorage.getItem('_company'),
        Category: 'Client',
        Level: logLevel
    };
    return log;
}
class TbLoggerService {
    /**
     * @param {?} env
     * @param {?} http
     * @param {?} stompService
     */
    constructor(env, http, stompService) {
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
        (logLevel) => logLevel >= this.env.logger.level);
        this._serverLog = (/**
         * @param {?} logLevel
         * @param {?} message
         * @return {?}
         */
        (logLevel, message) => this._shouldLog(logLevel) && this.sendLog(message, logLevel));
        loggerInstance = this;
        this.loggerUrl = this.env.logger.url;
        this.serverMonitorUrl = this.env.serverMonitor.url;
        if (env.stompConfig)
            this.mqInit();
    }
    /**
     * @return {?}
     */
    mqInit() {
        if (this.env.stompConfig) {
            this.stompService.config = this.env.stompConfig;
            this.stompService.initAndConnect();
            this.stompService.state.subscribe((/**
             * @param {?} status
             * @return {?}
             */
            (status) => {
                this.mqConnectionState = status;
                this.mqConnectionStateObservable.next(status);
            }));
        }
    }
    /**
     * Ritorna la App Id dell'applicazione frontend che sta loggando,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     * @return {?}
     */
    getAppId() {
        return this.env.logger.appId;
    }
    /**
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     * @return {?}
     */
    getLoggerUrl() {
        return this.loggerUrl ? this.loggerUrl : this.env.logger.url;
    }
    /**
     * Ritorna la api per inserire log con appId configurato in environment.json
     * @return {?}
     */
    getLoggerPostUrl() {
        return `${this.getLoggerUrl()}entries/${this.getAppId()}/`;
    }
    /**
     * M4 Backend URL
     * @return {?}
     */
    getServerMonitorUrl() {
        return this.serverMonitorUrl ? this.serverMonitorUrl : this.env.serverMonitor.url;
    }
    /**
     * @private
     * @param {?} message
     * @param {?} logLevel
     * @return {?}
     */
    sendLog(message, logLevel) {
        this.http
            .post(this.getLoggerPostUrl(), prepareLog(message, logLevel))
            .toPromise()
            .then((/**
         * @param {?} __
         * @return {?}
         */
        __ => { }), (/**
         * @param {?} err
         * @return {?}
         */
        err => { }));
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    log(message) {
        if (this._shouldLog(LogLevel.Trace))
            console.log(`%c${message}`, `color:#3daf67`);
        this._serverLog(LogLevel.Trace, message);
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    debug(message) {
        if (this._shouldLog(LogLevel.Debug))
            console.log(`%c${message}`, `color:#0277bd`);
        this._serverLog(LogLevel.Debug, message);
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    warn(message) {
        if (this._shouldLog(LogLevel.Warn))
            console.log(`%c${message}`, `color:#FF9633`);
        this._serverLog(LogLevel.Warn, message);
    }
    /**
     * @param {?=} message
     * @return {?}
     */
    error(message) {
        if (this._shouldLog(LogLevel.Error))
            console.error(`%c${message}`, `color:red`);
        this._serverLog(LogLevel.Error, message);
    }
    /**
     * Log per statistiche client (es: usato da login page per tracciare risoluzione schermo)
     *
     * @param {?=} message
     * @return {?}
     */
    stat(message) {
        console.log(`%c${message}`, `color:#884EA0`);
        this._serverLog(LogLevel.Trace, message);
    }
    /**
     * Return logs: LoggerOperationResult
     *
     * @param {?} params
     * @return {?}
     */
    getLogs(params) {
        if (!params.instanceKey) {
            /** @type {?} */
            const error = new LoggerOperationResult(false, 'Error - No instanceKey, no party');
            return of(error);
        }
        // console.log('this.getLoggerUrl()', this.getLoggerUrl());
        /** @type {?} */
        const url = this.getLoggerUrl() + `entries/${params.instanceKey}`;
        /** @type {?} */
        let p = new HttpParams();
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
        const httpOptions = {
            params: p
        };
        return this.http.get(url, httpOptions).pipe(
        // tap(op => console.log('TbLoggerService.getLogs', op)),
        catchError(this.handleError('TbLoggerService.getLogs', new LoggerOperationResult(false, 'Error - getLogs'))));
    }
    /**
     * @param {?} appId
     * @return {?}
     */
    getApps(appId) {
        if (!appId) {
            /** @type {?} */
            const error = new LoggerOperationResult(false, 'Error - No appId, no party');
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `apps/${appId}`;
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getApps with appId: ', appId, op)),
        catchError(this.handleError('TbLoggerService.getApps', new LoggerOperationResult(false, 'Error - getApps'))));
    }
    /**
     * @param {?} appId
     * @return {?}
     */
    getAppTypes(appId) {
        if (!appId) {
            /** @type {?} */
            const error = new LoggerOperationResult(false, 'Error - No appId, no party');
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `appTypes/${appId}`;
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getAppTypes with appId: ', appId, op)),
        catchError(this.handleError('TbLoggerService.getAppTypes', new LoggerOperationResult(false, 'Error - getAppTypes'))));
    }
    /**
     * @return {?}
     */
    getInstanceKey() {
        /** @type {?} */
        const url = this.getLoggerUrl() + `appIds`;
        return this.http.get(url).pipe(
        // tap(op => console.log(url, 'TbLoggerService.getInstanceKey with appId: ', op)),
        catchError(this.handleError('TbLoggerService.getInstanceKey', new LoggerOperationResult(false, 'Error - getInstanceKey'))));
    }
    /**
     * Legge tutte le subscription
     * @return {?}
     */
    getSubscriptionKey() {
        /** @type {?} */
        const url = this.getLoggerUrl() + `subscriptionKeys`;
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getSubscriptionKey: ', op)),
        catchError(this.handleError('TbLoggerService.getSubscriptionKey', new LoggerOperationResult(false, 'Error - getSubscriptionKey'))));
    }
    /**
     * @param {?} appId
     * @return {?}
     */
    getCategories(appId) {
        if (!appId) {
            /** @type {?} */
            const error = new LoggerOperationResult(false, 'Error - No appId, no party');
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `categories/${appId}`;
        return this.http.get(url).pipe(
        // tap(op => console.log('TbLoggerService.getCategories with appId: ', appId, op)),
        catchError(this.handleError('TbLoggerService.getCategories', new LoggerOperationResult(false, 'Error -  getCategories'))));
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @template T
     * @param {?=} operation - name of the operation that failed
     * @param {?=} result - optional value to return as the observable result
     * @return {?}
     */
    handleError(operation = 'operation', result) {
        return (/**
         * @param {?} error
         * @return {?}
         */
        (error) => {
            console.error(`${operation} failed: ${error.error}`);
            // Let the app keep running by returning an empty result.
            return of((/** @type {?} */ (result)));
        });
    }
    /**
     * Connessione a RabbitMQ
     * @param {?} queueName
     * @return {?}
     */
    mqConnect(queueName) {
        return this.stompService.subscribe(queueName).pipe(map((/**
         * @param {?} msg
         * @return {?}
         */
        (msg) => JSON.parse(msg.body))));
    }
    /**
     * @return {?}
     */
    mqConnected() {
        return this.stompService.connected();
    }
    /**
     * @return {?}
     */
    mqDisconnect() {
        return this.stompService.disconnect();
    }
    // -------------------------------------------------------------------------------------------------------
    // PARTE TBSERVERMONITOR
    // -------------------------------------------------------------------------------------------------------
    /**
     * @param {?} params
     * @return {?}
     */
    getTBInfosLogs(params) {
        /** @type {?} */
        let p = new HttpParams();
        if (params.accountName)
            p = p.append('accountName', '' + params.accountName);
        if (params.processName)
            p = p.append('processName', '' + params.processName);
        if (params.minutes)
            p = p.append('minute', '' + params.minutes);
        /** @type {?} */
        const httpOptions = { params: p };
        /** @type {?} */
        const url = this.getServerMonitorUrl() + `tbServers/${params.instanceKey}`;
        return this.http.get(url, httpOptions).pipe(catchError(this.handleError('TbLoggerService.getTBInfosLogs', false)));
    }
}
TbLoggerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
TbLoggerService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['env',] }] },
    { type: HttpClient },
    { type: StompRService }
];
/** @nocollapse */ TbLoggerService.ngInjectableDef = ɵɵdefineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(ɵɵinject("env"), ɵɵinject(HttpClient), ɵɵinject(StompRService)); }, token: TbLoggerService, providedIn: "root" });
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
class TbNotificationService {
    /**
     * @param {?} notificationService
     */
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    /**
     * @param {?} msg
     * @param {?=} style
     * @return {?}
     */
    show(msg, style = 'none') {
        this.notificationService.show({
            content: msg,
            animation: { type: 'slide', duration: 200 },
            position: { horizontal: 'right', vertical: 'bottom' },
            type: { style: style, icon: true },
            hideAfter: 4000
        });
    }
}
TbNotificationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
TbNotificationService.ctorParameters = () => [
    { type: NotificationService }
];
/** @nocollapse */ TbNotificationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function TbNotificationService_Factory() { return new TbNotificationService(ɵɵinject(NotificationService)); }, token: TbNotificationService, providedIn: "root" });
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
class TbLoggerModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: TbLoggerModule,
            providers: [StompRService]
        };
    }
}
TbLoggerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NotificationModule, ButtonsModule, InputsModule, DateInputsModule, FormsModule, DropDownsModule],
                providers: [StompRService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { EntriesParams, LogLevel, LogStatus, LoggerOperationResult, MonitorParams, TbLoggerModule, TbLoggerService, TbNotificationService, logger, prepareLog };
//# sourceMappingURL=tb-logger.js.map
