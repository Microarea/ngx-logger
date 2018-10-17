/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild } from '@angular/core';
import { LogStatus } from './../../models/log-status.enum';
import { TbLoggerService } from './../../services/tb-logger.service';
import { EntriesParams } from '../../models/entries.model';
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
export { LoggerViewerComponent };
if (false) {
    /** @type {?} */
    LoggerViewerComponent.prototype.appIdInput;
    /** @type {?} */
    LoggerViewerComponent.prototype.appId;
    /** @type {?} */
    LoggerViewerComponent.prototype.appList;
    /** @type {?} */
    LoggerViewerComponent.prototype.appData;
    /** @type {?} */
    LoggerViewerComponent.prototype.app;
    /** @type {?} */
    LoggerViewerComponent.prototype.appTypeList;
    /** @type {?} */
    LoggerViewerComponent.prototype.appTypeData;
    /** @type {?} */
    LoggerViewerComponent.prototype.appType;
    /** @type {?} */
    LoggerViewerComponent.prototype.logs;
    /** @type {?} */
    LoggerViewerComponent.prototype.logStatus;
    /** @type {?} */
    LoggerViewerComponent.prototype.show;
    /** @type {?} */
    LoggerViewerComponent.prototype.loading;
    /** @type {?} */
    LoggerViewerComponent.prototype.howMany;
    /** @type {?} */
    LoggerViewerComponent.prototype.checked;
    /** @type {?} */
    LoggerViewerComponent.prototype.autoRefresh;
    /** @type {?} */
    LoggerViewerComponent.prototype.autoRefreshInterval;
    /** @type {?} */
    LoggerViewerComponent.prototype.message;
    /** @type {?} */
    LoggerViewerComponent.prototype.loggerUrl;
    /** @type {?} */
    LoggerViewerComponent.prototype.loggerService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbG9nZ2VyLXZpZXdlci9sb2dnZXItdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBSTVFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFJckUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztJQWlHdkQsK0JBQW1CLGFBQThCO1FBQTlCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtxQkExQmpDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7dUJBS2xELEVBQUU7bUJBQ3BCLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7MkJBS3hDLEVBQUU7dUJBQ3BCLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBRTFFLEVBQUU7eUJBQ0osU0FBUztvQkFDZCxLQUFLO3VCQUNGLEtBQUs7dUJBQ0wsR0FBRzt1QkFDSCxLQUFLOzJCQUNELEtBQUs7dUJBRVQsRUFBRTt5QkFFQSxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdB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QUMsYUFBYTs7Z0NBekY1Qjs7U0E0RWEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgTG9nIH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvbG9nLm1vZGVsJztcclxuaW1wb3J0IHsgTG9nU3RhdHVzIH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvbG9nLXN0YXR1cy5lbnVtJztcclxuaW1wb3J0IHsgVGJMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi9zZXJ2aWNlcy90Yi1sb2dnZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IExvZ2dlck9wZXJhdGlvblJlc3VsdCB9IGZyb20gJy4vLi4vLi4vbW9kZWxzL2xvZ2dlci1vcGVyYXRpb24tcmVzdWx0Lm1vZGVsJztcclxuXHJcbmltcG9ydCB7IGRlbGF5LCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgRW50cmllc1BhcmFtcyB9IGZyb20gJy4uLy4uL21vZGVscy9lbnRyaWVzLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd0Yi1sb2dnZXItdmlld2VyJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgIDxsYWJlbCBpZD1cImxvZ2dlci11cmwtbGFiZWxcIiBjbGFzcz1cImgtbGFiZWxcIiBmb3I9XCJsb2dnZXItdXJsXCI+TG9nZ2VyIFVSTDo8L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dCBrZW5kb1RleHRCb3ggaWQ9XCJsb2dnZXItdXJsXCIgWyhuZ01vZGVsKV09XCJsb2dnZXJVcmxcIiAoYmx1cik9XCJzZXRMb2dnZXJVcmwoJGV2ZW50KVwiIChjbGljayk9XCIkZXZlbnQudGFyZ2V0LnNlbGVjdCgpXCIgLz5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImstaWNvbiBrLWktcmVzZXQgXCIgKGNsaWNrKT1cImdldExvZ3MoKVwiPjwvc3Bhbj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImF1dG9yZWZyZXNoXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImF1dG9SZWZyZXNoXCIgY2xhc3M9XCJrLWNoZWNrYm94XCIgW25nTW9kZWxdPVwiY2hlY2tlZFwiIChuZ01vZGVsQ2hhbmdlKT1cImNoZWNrQXV0b1JlZnJlc2goJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJrLWNoZWNrYm94LWxhYmVsXCIgZm9yPVwiYXV0b1JlZnJlc2hcIj5BdXRvIHJlZnJlc2ggKDVzKTwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlclwiPlxyXG4gICAgICAgICAgICA8IS0tIEFQUCBJRCAtLT5cclxuICAgICAgICAgICAgPGxhYmVsIGlkPVwibG9nZ2VyLWFwcC1pZC1sYWJlbFwiIGNsYXNzPVwiaC1sYWJlbFwiIGZvcj1cImxvZ2dlci1hcHAtaWRcIiAoY2xpY2spPVwiYXBwTGlzdEluaXQoKVwiPkluc3RhbmNlIEtleTo8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQga2VuZG9UZXh0Qm94ICNhcHBJZElucHV0IFsobmdNb2RlbCldPVwiYXBwSWRcIiAoYmx1cik9XCJzZXRBcHBJZCgkZXZlbnQpXCIgaWQ9XCJrYS1hcHAtaWRcIiAoY2xpY2spPVwiJGV2ZW50LnRhcmdldC5zZWxlY3QoKVwiXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImUuZy4gMmQxMzZjNjEtYWFjMi00NDJkLTkyNmMtYTUzMWMzNjg1MDM1XCIgLz5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlclwiPlxyXG4gICAgICAgICAgICA8IS0tIEFQUCAtLT5cclxuICAgICAgICAgICAgPGxhYmVsIGlkPVwibG9nZ2VyLWFwcC1sYWJlbFwiIGNsYXNzPVwiaC1sYWJlbFwiIGZvcj1cImxvZ2dlci1hcHBcIj5BcHA6PC9sYWJlbD5cclxuICAgICAgICAgICAgPGtlbmRvLWF1dG9jb21wbGV0ZSAjYXBwTGlzdCBbZGF0YV09XCJhcHBEYXRhXCIgW3N1Z2dlc3RdPVwidHJ1ZVwiIFtwbGFjZWhvbGRlcl09XCInZS5nLiBFUlAsIE1EQywgVEJGJ1wiXHJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImFwcFwiICh2YWx1ZUNoYW5nZSk9XCJzZXRBcHAoJGV2ZW50KVwiIGlkPVwia2EtYXBwXCI+XHJcbiAgICAgICAgICAgIDwva2VuZG8tYXV0b2NvbXBsZXRlPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyXCI+XHJcbiAgICAgICAgICAgIDwhLS0gQVBQIFRZUEUgLS0+XHJcbiAgICAgICAgICAgIDxsYWJlbCBpZD1cImxvZ2dlci1hcHAtdHlwZS1sYWJlbFwiIGNsYXNzPVwiaC1sYWJlbFwiIGZvcj1cImxvZ2dlci1hcHAtdHlwZVwiPkFwcFR5cGU6PC9sYWJlbD5cclxuICAgICAgICAgICAgPGtlbmRvLWF1dG9jb21wbGV0ZSAjYXBwVHlwZUxpc3QgW2RhdGFdPVwiYXBwVHlwZURhdGFcIiBbc3VnZ2VzdF09XCJ0cnVlXCIgW3BsYWNlaG9sZGVyXT1cIidlLmcuIFRCTE9BREVSLCBORVRDT1JFLCBORydcIlxyXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJhcHBUeXBlXCIgKHZhbHVlQ2hhbmdlKT1cInNldEFwcFR5cGUoJGV2ZW50KVwiIGlkPVwia2EtYXBwLXR5cGVcIj5cclxuICAgICAgICAgICAgPC9rZW5kby1hdXRvY29tcGxldGU+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibm90aWZ5XCIgKm5nSWY9XCJtZXNzYWdlXCI+XHJcbiAgICAgICAgPHA+e3ttZXNzYWdlfX08L3A+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwibW9uaXRvclwiPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJsb2FkaW5nXCIgKm5nSWY9XCJsb2FkaW5nXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJrLWljb24gay1pLWxvYWRpbmdcIj48L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8dWwgY2xhc3M9XCJsb2dzXCIgKm5nSWY9XCIhbG9hZGluZ1wiPlxyXG4gICAgICAgIDxsaSAqbmdJZj1cImxvZ3MubGVuZ3RoID09IDBcIiBjbGFzcz1cIm5vLWxvZ3NcIj5ObyBMb2dzIHdpdGggYXBwSWQ6PHN0cm9uZz57e2FwcElkfX08L3N0cm9uZz48L2xpPlxyXG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbG9nIG9mIGxvZ3NcIiBjbGFzcz1cImxvZ1wiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtZGF0ZVwiPnt7bG9nLkxvZ0VudHJ5LkVudHJ5Q3JlYXRlZCB8IGRhdGU6ICdtZWRpdW0nIH19IDwvc3Bhbj4gLVxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtYWNjb3VudC1uYW1lXCI+IHt7bG9nLkxvZ0VudHJ5LkFjY291bnROYW1lIH19IDwvc3Bhbj4gLVxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtYXBwXCIgKm5nSWY9XCJsb2cuTG9nRW50cnkuQXBwXCI+IHt7bG9nLkxvZ0VudHJ5LkFwcCB9fSAtPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtdHlwZVwiICpuZ0lmPVwibG9nLkxvZ0VudHJ5LlJlZ2lzdGVyZWRBcHBUeXBlXCI+IHt7bG9nLkxvZ0VudHJ5LlJlZ2lzdGVyZWRBcHBUeXBlIH19IC08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1jYXRlZ29yeVwiICpuZ0lmPVwibG9nLkxvZ0VudHJ5LkNhdGVnb3J5XCI+IHt7bG9nLkxvZ0VudHJ5LkNhdGVnb3J5IH19IC08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1zdGF0dXMgbGV2ZWwte3tsb2cuTG9nRW50cnkuTGV2ZWx9fVwiPlt7e2xvZ1N0YXR1c1tsb2cuTG9nRW50cnkuTGV2ZWxdfX1dPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtbXNnXCI+IHt7bG9nLkxvZ0VudHJ5Lk1lc3NhZ2V9fSA8L3NwYW4+XHJcbiAgICAgICAgPC9saT5cclxuICAgIDwvdWw+XHJcbjwvZGl2PmAsXHJcbiAgICBzdHlsZXM6IFtgOmhvc3QodGItbG9nZ2VyLXZpZXdlcil7ZmxleDoxO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLm5vdGlmeXtiYWNrZ3JvdW5kOiNmZjBiMGI7cGFkZGluZzo1cHggMTBweDttYXJnaW46MTBweCAwO2NvbG9yOiNmZmZ9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLm5vdGlmeSBwe21hcmdpbjo1cHggMDtmb250LXNpemU6MTJweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVye2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47bWFyZ2luOjMwcHggMCAxMHB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgLnJvd3tkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246cm93O2FsaWduLWl0ZW1zOmNlbnRlcjttYXJnaW46NXB4IDB9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAucm93LmZsZXgtY2VudGVye2p1c3RpZnktY29udGVudDpjZW50ZXJ9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAucm93LmZsZXgtYXJvdW5ke2p1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmR9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAucm93LmZsZXgtYmV0d2VlbntqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIC5yb3cgLmZpbHRlciAja2EtYXBwLWlke3dpZHRoOjMzMHB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgbGFiZWwuaC1sYWJlbHtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjAgMTBweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyICNsb2dnZXItdXJse3dpZHRoOjUwMHB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgLmstY2hlY2tib3gtbGFiZWx7Zm9udC1zaXplOjEycHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLm1vbml0b3J7ZGlzcGxheTpmbGV4O2ZsZXg6MTtiYWNrZ3JvdW5kOiNmMWYxZjE7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO3BhZGRpbmc6MDttYXJnaW46NXB4IDB9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLm1vbml0b3IgLmxvYWRpbmd7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO2ZsZXg6MX06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubW9uaXRvciAubG9hZGluZyAuay1pLWxvYWRpbmd7Zm9udC1zaXplOjM0cHg7Y29sb3I6Izk5OX06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuay1pLXJlc2V0e21hcmdpbi1yaWdodDoxMHB4O2NvbG9yOiMwMjc3YmQ7Ym9yZGVyOm5vbmU7cGFkZGluZzo1cHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmstaS1yZXNldDpob3ZlcntjdXJzb3I6cG9pbnRlcjtjb2xvcjojMjIyfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIGhye2JhY2tncm91bmQ6IzAyNzdiZDtoZWlnaHQ6MXB4O2JvcmRlcjpub25lfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dze21hcmdpbjowO3BhZGRpbmc6NXB4O2xpc3Qtc3R5bGU6bm9uZTtvdmVyZmxvdzphdXRvO2ZsZXg6MX06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubm8tbG9nc3tmb250LXNpemU6MTJweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubm8tbG9ncyBzdHJvbmd7Zm9udC13ZWlnaHQ6NTAwfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2d7Zm9udC1zaXplOjEycHg7bWFyZ2luOjNweCAwfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtZGF0ZXtjb2xvcjojOTk5fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtYWNjb3VudC1uYW1le2NvbG9yOiMwMGZ9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1zdGF0dXN7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO21hcmdpbjowIDNweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLXN0YXR1cy5sZXZlbC0we2NvbG9yOiMwMDB9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1zdGF0dXMubGV2ZWwtMXtjb2xvcjojMDBmfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtc3RhdHVzLmxldmVsLTJ7Y29sb3I6b3JhbmdlfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtc3RhdHVzLmxldmVsLTN7Y29sb3I6cmVkfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtc3RhdHVzLmxldmVsLTR7Y29sb3I6cmVkfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dnZXJWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xyXG4gICAgLy8gaW5zdGFuY2Uga2V5XHJcbiAgICBAVmlld0NoaWxkKCdhcHBJZElucHV0JylcclxuICAgIGFwcElkSW5wdXQ7XHJcbiAgICBhcHBJZDogc3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcElkJykgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwSWQnKSA6ICcnO1xyXG5cclxuICAgIC8vIGFwcFxyXG4gICAgQFZpZXdDaGlsZCgnYXBwTGlzdCcpXHJcbiAgICBhcHBMaXN0O1xyXG4gICAgcHVibGljIGFwcERhdGE6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIGFwcDogc3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcCcpID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcCcpIDogJyc7XHJcblxyXG4gICAgLy8gYXBwIHR5cGVzXHJcbiAgICBAVmlld0NoaWxkKCdhcHBUeXBlTGlzdCcpXHJcbiAgICBhcHBUeXBlTGlzdDtcclxuICAgIHB1YmxpYyBhcHBUeXBlRGF0YTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgYXBwVHlwZTogc3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcFR5cGUnKSA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBUeXBlJykgOiAnJztcclxuXHJcbiAgICBsb2dzOiBMb2dbXSA9IFtdO1xyXG4gICAgbG9nU3RhdHVzID0gTG9nU3RhdHVzO1xyXG4gICAgc2hvdyA9IGZhbHNlO1xyXG4gICAgbG9hZGluZyA9IGZhbHNlO1xyXG4gICAgaG93TWFueSA9IDEwMDtcclxuICAgIGNoZWNrZWQgPSBmYWxzZTtcclxuICAgIGF1dG9SZWZyZXNoID0gZmFsc2U7XHJcbiAgICBhdXRvUmVmcmVzaEludGVydmFsOiBhbnk7XHJcbiAgICBtZXNzYWdlID0gJyc7XHJcblxyXG4gICAgbG9nZ2VyVXJsID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlclVybCcpID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlclVybCcpIDogdGhpcy5sb2dnZXJTZXJ2aWNlLmdldExvZ2dlclVybCgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBsb2dnZXJTZXJ2aWNlOiBUYkxvZ2dlclNlcnZpY2UpIHt9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5hcHBMaXN0SW5pdCgpO1xyXG4gICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHt9XHJcblxyXG4gICAgLy8gbGVnZ28gdHV0dGUgbGUgYXBwLCBnbGkgYXBwSWQgZSBnbGkgYXBwVHlwZSBlIGxpIHNhbHZvIGluIHJpc3BldHRpdmkgYXJyYXlcclxuICAgIC8vIHZlcnJhbm5vIHBvaSBmaWx0cmF0aSBkYWkgY29tcG9uZW50aSBrZW5kb1xyXG4gICAgYXBwTGlzdEluaXQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcElkKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmdldEFwcHModGhpcy5hcHBJZCkuc3Vic2NyaWJlKChvcDogTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwRGF0YSA9IG9wLkNvbnRlbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwTGlzdC5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzKHRoaXMuYXBwSWQpLnN1YnNjcmliZSgob3A6IExvZ2dlck9wZXJhdGlvblJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFwcFR5cGVEYXRhID0gb3AuQ29udGVudDtcclxuICAgICAgICAgICAgdGhpcy5hcHBUeXBlTGlzdC5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldExvZ3MoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFwcElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICdJbnN0YW5jZSBLZXkgbWFuY2FudGUnO1xyXG4gICAgICAgICAgICB0aGlzLmFwcElkSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICBjb25zdCBwYXJhbXMgPSBuZXcgRW50cmllc1BhcmFtcygpO1xyXG4gICAgICAgIHBhcmFtcy5hcHBJZCA9IHRoaXMuYXBwSWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwKSBwYXJhbXMuYXBwcyA9IHRoaXMuYXBwO1xyXG4gICAgICAgIGlmICh0aGlzLmFwcFR5cGUpIHBhcmFtcy5hcHBUeXBlcyA9IHRoaXMuYXBwVHlwZTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2dnZXJTZXJ2aWNlLmdldExvZ3MocGFyYW1zKS5zdWJzY3JpYmUoKG9wOiBMb2dnZXJPcGVyYXRpb25SZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFvcC5SZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9IG9wLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5sb2dzID0gb3AuQ29udGVudDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRMb2dnZXJVcmwoZXZlbnQpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9nZ2VyVXJsJywgdGhpcy5sb2dnZXJVcmwpO1xyXG4gICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRBcHAoJGV2ZW50KSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcCcsIHRoaXMuYXBwKTtcclxuICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QXBwSWQoJGV2ZW50KSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcElkJywgdGhpcy5hcHBJZCk7XHJcbiAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEFwcFR5cGUoJGV2ZW50KSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FwcFR5cGUnLCB0aGlzLmFwcFR5cGUpO1xyXG4gICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZSgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuYXV0b1JlZnJlc2hJbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrQXV0b1JlZnJlc2goZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuYXV0b1JlZnJlc2ggPSAhdGhpcy5hdXRvUmVmcmVzaDtcclxuICAgICAgICBpZiAodGhpcy5hdXRvUmVmcmVzaCkge1xyXG4gICAgICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgICAgICAgICAgdGhpcy5hdXRvUmVmcmVzaEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICAgICAgICAgIH0sIDUwMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9SZWZyZXNoSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hdXRvUmVmcmVzaEludGVydmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=