/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewChild } from '@angular/core';
import { LogStatus } from './../../models/log-status.enum';
import { TbLoggerService } from './../../services/tb-logger.service';
import { EntriesParams } from '../../models/entries.model';
export class LoggerViewerComponent {
    /**
     * @param {?} loggerService
     */
    constructor(loggerService) {
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
    ngOnInit() {
        this.appListInit();
        this.getLogs();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() { }
    /**
     * @return {?}
     */
    appListInit() {
        if (!this.appId)
            return false;
        this.loggerService.getApps(this.appId).subscribe((op) => {
            this.appData = op.Content;
            this.appList.loading = false;
        });
        this.loggerService.getAppTypes(this.appId).subscribe((op) => {
            this.appTypeData = op.Content;
            this.appTypeList.loading = false;
        });
    }
    /**
     * @return {?}
     */
    getLogs() {
        if (!this.appId) {
            this.message = 'Instance Key mancante';
            this.appIdInput.nativeElement.focus();
            return;
        }
        this.loading = true;
        /** @type {?} */
        const params = new EntriesParams();
        params.appId = this.appId;
        if (this.app)
            params.apps = this.app;
        if (this.appType)
            params.appTypes = this.appType;
        this.loggerService.getLogs(params).subscribe((op) => {
            if (!op.Result) {
                this.message = op.Message;
                this.logs = [];
                this.loading = false;
                return false;
            }
            this.message = '';
            this.logs = op.Content;
            this.loading = false;
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    setLoggerUrl(event) {
        localStorage.setItem('loggerUrl', this.loggerUrl);
        this.getLogs();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    setApp($event) {
        localStorage.setItem('app', this.app);
        this.getLogs();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    setAppId($event) {
        localStorage.setItem('appId', this.appId);
        this.getLogs();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    setAppType($event) {
        localStorage.setItem('appType', this.appType);
        this.getLogs();
    }
    /**
     * @return {?}
     */
    close() {
        clearInterval(this.autoRefreshInterval);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    checkAutoRefresh(event) {
        this.autoRefresh = !this.autoRefresh;
        if (this.autoRefresh) {
            this.getLogs();
            this.autoRefreshInterval = setInterval(() => {
                this.getLogs();
            }, 5000);
        }
        else {
            if (this.autoRefreshInterval) {
                clearInterval(this.autoRefreshInterval);
            }
        }
    }
}
LoggerViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'tb-logger-viewer',
                template: `<div class="header">
    <div class="row">
        <label id="logger-url-label" class="h-label" for="logger-url">Logger URL:</label>
        <input kendoTextBox id="logger-url" [(ngModel)]="loggerUrl" (blur)="setLoggerUrl($event)" (click)="$event.target.select()" />
        <span class="k-icon k-i-reset " (click)="getLogs()"></span>

        <div class="autorefresh">
            <input type="checkbox" id="autoRefresh" class="k-checkbox" [ngModel]="checked" (ngModelChange)="checkAutoRefresh($event)">
            <label class="k-checkbox-label" for="autoRefresh">Auto refresh (5s)</label>
        </div>
    </div>
    <div class="row">

        <div class="filter">
            <!-- APP ID -->
            <label id="logger-app-id-label" class="h-label" for="logger-app-id" (click)="appListInit()">Instance Key:</label>
            <input kendoTextBox #appIdInput [(ngModel)]="appId" (blur)="setAppId($event)" id="ka-app-id" (click)="$event.target.select()"
                placeholder="e.g. 2d136c61-aac2-442d-926c-a531c3685035" />
        </div>

        <div class="filter">
            <!-- APP -->
            <label id="logger-app-label" class="h-label" for="logger-app">App:</label>
            <kendo-autocomplete #appList [data]="appData" [suggest]="true" [placeholder]="'e.g. ERP, MDC, TBF'"
                [(ngModel)]="app" (valueChange)="setApp($event)" id="ka-app">
            </kendo-autocomplete>
        </div>

        <div class="filter">
            <!-- APP TYPE -->
            <label id="logger-app-type-label" class="h-label" for="logger-app-type">AppType:</label>
            <kendo-autocomplete #appTypeList [data]="appTypeData" [suggest]="true" [placeholder]="'e.g. TBLOADER, NETCORE, NG'"
                [(ngModel)]="appType" (valueChange)="setAppType($event)" id="ka-app-type">
            </kendo-autocomplete>
        </div>

    </div>
    <div class="notify" *ngIf="message">
        <p>{{message}}</p>
    </div>
</div>

<div class="monitor">

    <div class="loading" *ngIf="loading">
        <span class="k-icon k-i-loading"></span>
    </div>

    <ul class="logs" *ngIf="!loading">
        <li *ngIf="logs.length == 0" class="no-logs">No Logs with appId:<strong>{{appId}}</strong></li>
        <li *ngFor="let log of logs" class="log">
            <span class="l-date">{{log.LogEntry.EntryCreated | date: 'medium' }} </span> -
            <span class="l-account-name"> {{log.LogEntry.AccountName }} </span> -
            <span class="l-app" *ngIf="log.LogEntry.App"> {{log.LogEntry.App }} -</span>
            <span class="l-type" *ngIf="log.LogEntry.RegisteredAppType"> {{log.LogEntry.RegisteredAppType }} -</span>
            <span class="l-category" *ngIf="log.LogEntry.Category"> {{log.LogEntry.Category }} -</span>
            <span class="l-status level-{{log.LogEntry.Level}}">[{{logStatus[log.LogEntry.Level]}}]</span>
            <span class="l-msg"> {{log.LogEntry.Message}} </span>
        </li>
    </ul>
</div>`,
                styles: [`:host(tb-logger-viewer){flex:1;display:flex;flex-direction:column}:host(tb-logger-viewer) .notify{background:#ff0b0b;padding:5px 10px;margin:10px 0;color:#fff}:host(tb-logger-viewer) .notify p{margin:5px 0;font-size:12px}:host(tb-logger-viewer) .header{display:flex;flex-direction:column;margin:30px 0 10px}:host(tb-logger-viewer) .header .row{display:flex;flex-direction:row;align-items:center;margin:5px 0}:host(tb-logger-viewer) .header .row.flex-center{justify-content:center}:host(tb-logger-viewer) .header .row.flex-around{justify-content:space-around}:host(tb-logger-viewer) .header .row.flex-between{justify-content:space-between}:host(tb-logger-viewer) .header .row .filter #ka-app-id{width:330px}:host(tb-logger-viewer) .header label.h-label{font-weight:500;font-size:14px;margin:0 10px}:host(tb-logger-viewer) .header #logger-url{width:500px}:host(tb-logger-viewer) .header .k-checkbox-label{font-size:12px}:host(tb-logger-viewer) .monitor{display:flex;flex:1;background:#f1f1f1;border:1px solid #ccc;padding:0;margin:5px 0}:host(tb-logger-viewer) .monitor .loading{display:flex;justify-content:center;align-items:center;flex:1}:host(tb-logger-viewer) .monitor .loading .k-i-loading{font-size:34px;color:#999}:host(tb-logger-viewer) .k-i-reset{margin-right:10px;color:#0277bd;border:none;padding:5px}:host(tb-logger-viewer) .k-i-reset:hover{cursor:pointer;color:#222}:host(tb-logger-viewer) hr{background:#0277bd;height:1px;border:none}:host(tb-logger-viewer) .logs{margin:0;padding:5px;list-style:none;overflow:auto;flex:1}:host(tb-logger-viewer) .logs .no-logs{font-size:12px}:host(tb-logger-viewer) .logs .no-logs strong{font-weight:500}:host(tb-logger-viewer) .logs .log{font-size:12px;margin:3px 0}:host(tb-logger-viewer) .logs .log .l-date{color:#999}:host(tb-logger-viewer) .logs .log .l-account-name{color:#00f}:host(tb-logger-viewer) .logs .log .l-status{text-transform:uppercase;margin:0 3px}:host(tb-logger-viewer) .logs .log .l-status.level-0{color:#000}:host(tb-logger-viewer) .logs .log .l-status.level-1{color:#00f}:host(tb-logger-viewer) .logs .log .l-status.level-2{color:orange}:host(tb-logger-viewer) .logs .log .l-status.level-3{color:red}:host(tb-logger-viewer) .logs .log .l-status.level-4{color:red}`]
            },] },
];
/** @nocollapse */
LoggerViewerComponent.ctorParameters = () => [
    { type: TbLoggerService }
];
LoggerViewerComponent.propDecorators = {
    appIdInput: [{ type: ViewChild, args: ['appIdInput',] }],
    appList: [{ type: ViewChild, args: ['appList',] }],
    appTypeList: [{ type: ViewChild, args: ['appTypeList',] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbG9nZ2VyLXZpZXdlci9sb2dnZXItdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBSTVFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFJckUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBbUUzRCxNQUFNOzs7O0lBOEJGLFlBQW1CLGFBQThCO1FBQTlCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtxQkExQmpDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7dUJBS2xELEVBQUU7bUJBQ3BCLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7MkJBS3hDLEVBQUU7dUJBQ3BCLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBRTFFLEVBQUU7eUJBQ0osU0FBUztvQkFDZCxLQUFLO3VCQUNGLEtBQUs7dUJBQ0wsR0FBRzt1QkFDSCxLQUFLOzJCQUNELEtBQUs7dUJBRVQsRUFBRTt5QkFFQSxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMs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UzswQkFNbkIsU0FBUyxTQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBMb2cgfSBmcm9tICcuLy4uLy4uL21vZGVscy9sb2cubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2dTdGF0dXMgfSBmcm9tICcuLy4uLy4uL21vZGVscy9sb2ctc3RhdHVzLmVudW0nO1xyXG5pbXBvcnQgeyBUYkxvZ2dlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0IH0gZnJvbSAnLi8uLi8uLi9tb2RlbHMvbG9nZ2VyLW9wZXJhdGlvbi1yZXN1bHQubW9kZWwnO1xyXG5cclxuaW1wb3J0IHsgZGVsYXksIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBFbnRyaWVzUGFyYW1zIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2VudHJpZXMubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RiLWxvZ2dlci12aWV3ZXInLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgPGxhYmVsIGlkPVwibG9nZ2VyLXVybC1sYWJlbFwiIGNsYXNzPVwiaC1sYWJlbFwiIGZvcj1cImxvZ2dlci11cmxcIj5Mb2dnZXIgVVJMOjwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IGtlbmRvVGV4dEJveCBpZD1cImxvZ2dlci11cmxcIiBbKG5nTW9kZWwpXT1cImxvZ2dlclVybFwiIChibHVyKT1cInNldExvZ2dlclVybCgkZXZlbnQpXCIgKGNsaWNrKT1cIiRldmVudC50YXJnZXQuc2VsZWN0KClcIiAvPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiay1pY29uIGstaS1yZXNldCBcIiAoY2xpY2spPVwiZ2V0TG9ncygpXCI+PC9zcGFuPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXV0b3JlZnJlc2hcIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiYXV0b1JlZnJlc2hcIiBjbGFzcz1cImstY2hlY2tib3hcIiBbbmdNb2RlbF09XCJjaGVja2VkXCIgKG5nTW9kZWxDaGFuZ2UpPVwiY2hlY2tBdXRvUmVmcmVzaCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImstY2hlY2tib3gtbGFiZWxcIiBmb3I9XCJhdXRvUmVmcmVzaFwiPkF1dG8gcmVmcmVzaCAoNXMpPC9sYWJlbD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyXCI+XHJcbiAgICAgICAgICAgIDwhLS0gQVBQIElEIC0tPlxyXG4gICAgICAgICAgICA8bGFiZWwgaWQ9XCJsb2dnZXItYXBwLWlkLWxhYmVsXCIgY2xhc3M9XCJoLWxhYmVsXCIgZm9yPVwibG9nZ2VyLWFwcC1pZFwiIChjbGljayk9XCJhcHBMaXN0SW5pdCgpXCI+SW5zdGFuY2UgS2V5OjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCBrZW5kb1RleHRCb3ggI2FwcElkSW5wdXQgWyhuZ01vZGVsKV09XCJhcHBJZFwiIChibHVyKT1cInNldEFwcElkKCRldmVudClcIiBpZD1cImthLWFwcC1pZFwiIChjbGljayk9XCIkZXZlbnQudGFyZ2V0LnNlbGVjdCgpXCJcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiZS5nLiAyZDEzNmM2MS1hYWMyLTQ0MmQtOTI2Yy1hNTMxYzM2ODUwMzVcIiAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmlsdGVyXCI+XHJcbiAgICAgICAgICAgIDwhLS0gQVBQIC0tPlxyXG4gICAgICAgICAgICA8bGFiZWwgaWQ9XCJsb2dnZXItYXBwLWxhYmVsXCIgY2xhc3M9XCJoLWxhYmVsXCIgZm9yPVwibG9nZ2VyLWFwcFwiPkFwcDo8L2xhYmVsPlxyXG4gICAgICAgICAgICA8a2VuZG8tYXV0b2NvbXBsZXRlICNhcHBMaXN0IFtkYXRhXT1cImFwcERhdGFcIiBbc3VnZ2VzdF09XCJ0cnVlXCIgW3BsYWNlaG9sZGVyXT1cIidlLmcuIEVSUCwgTURDLCBUQkYnXCJcclxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwiYXBwXCIgKHZhbHVlQ2hhbmdlKT1cInNldEFwcCgkZXZlbnQpXCIgaWQ9XCJrYS1hcHBcIj5cclxuICAgICAgICAgICAgPC9rZW5kby1hdXRvY29tcGxldGU+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmaWx0ZXJcIj5cclxuICAgICAgICAgICAgPCEtLSBBUFAgVFlQRSAtLT5cclxuICAgICAgICAgICAgPGxhYmVsIGlkPVwibG9nZ2VyLWFwcC10eXBlLWxhYmVsXCIgY2xhc3M9XCJoLWxhYmVsXCIgZm9yPVwibG9nZ2VyLWFwcC10eXBlXCI+QXBwVHlwZTo8L2xhYmVsPlxyXG4gICAgICAgICAgICA8a2VuZG8tYXV0b2NvbXBsZXRlICNhcHBUeXBlTGlzdCBbZGF0YV09XCJhcHBUeXBlRGF0YVwiIFtzdWdnZXN0XT1cInRydWVcIiBbcGxhY2Vob2xkZXJdPVwiJ2UuZy4gVEJMT0FERVIsIE5FVENPUkUsIE5HJ1wiXHJcbiAgICAgICAgICAgICAgICBbKG5nTW9kZWwpXT1cImFwcFR5cGVcIiAodmFsdWVDaGFuZ2UpPVwic2V0QXBwVHlwZSgkZXZlbnQpXCIgaWQ9XCJrYS1hcHAtdHlwZVwiPlxyXG4gICAgICAgICAgICA8L2tlbmRvLWF1dG9jb21wbGV0ZT5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJub3RpZnlcIiAqbmdJZj1cIm1lc3NhZ2VcIj5cclxuICAgICAgICA8cD57e21lc3NhZ2V9fTwvcD5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbjxkaXYgY2xhc3M9XCJtb25pdG9yXCI+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImxvYWRpbmdcIiAqbmdJZj1cImxvYWRpbmdcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImstaWNvbiBrLWktbG9hZGluZ1wiPjwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDx1bCBjbGFzcz1cImxvZ3NcIiAqbmdJZj1cIiFsb2FkaW5nXCI+XHJcbiAgICAgICAgPGxpICpuZ0lmPVwibG9ncy5sZW5ndGggPT0gMFwiIGNsYXNzPVwibm8tbG9nc1wiPk5vIExvZ3Mgd2l0aCBhcHBJZDo8c3Ryb25nPnt7YXBwSWR9fTwvc3Ryb25nPjwvbGk+XHJcbiAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBsb2cgb2YgbG9nc1wiIGNsYXNzPVwibG9nXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1kYXRlXCI+e3tsb2cuTG9nRW50cnkuRW50cnlDcmVhdGVkIHwgZGF0ZTogJ21lZGl1bScgfX0gPC9zcGFuPiAtXHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1hY2NvdW50LW5hbWVcIj4ge3tsb2cuTG9nRW50cnkuQWNjb3VudE5hbWUgfX0gPC9zcGFuPiAtXHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1hcHBcIiAqbmdJZj1cImxvZy5Mb2dFbnRyeS5BcHBcIj4ge3tsb2cuTG9nRW50cnkuQXBwIH19IC08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC10eXBlXCIgKm5nSWY9XCJsb2cuTG9nRW50cnkuUmVnaXN0ZXJlZEFwcFR5cGVcIj4ge3tsb2cuTG9nRW50cnkuUmVnaXN0ZXJlZEFwcFR5cGUgfX0gLTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWNhdGVnb3J5XCIgKm5nSWY9XCJsb2cuTG9nRW50cnkuQ2F0ZWdvcnlcIj4ge3tsb2cuTG9nRW50cnkuQ2F0ZWdvcnkgfX0gLTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLXN0YXR1cyBsZXZlbC17e2xvZy5Mb2dFbnRyeS5MZXZlbH19XCI+W3t7bG9nU3RhdHVzW2xvZy5Mb2dFbnRyeS5MZXZlbF19fV08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1tc2dcIj4ge3tsb2cuTG9nRW50cnkuTWVzc2FnZX19IDwvc3Bhbj5cclxuICAgICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuPC9kaXY+YCxcclxuICAgIHN0eWxlczogW2A6aG9zdCh0Yi1sb2dnZXItdmlld2VyKXtmbGV4OjE7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubm90aWZ5e2JhY2tncm91bmQ6I2ZmMGIwYjtwYWRkaW5nOjVweCAxMHB4O21hcmdpbjoxMHB4IDA7Y29sb3I6I2ZmZn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubm90aWZ5IHB7bWFyZ2luOjVweCAwO2ZvbnQtc2l6ZToxMnB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXJ7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjttYXJnaW46MzBweCAwIDEwcHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAucm93e2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbjo1cHggMH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIC5yb3cuZmxleC1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIC5yb3cuZmxleC1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuaGVhZGVyIC5yb3cuZmxleC1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgLnJvdyAuZmlsdGVyICNrYS1hcHAtaWR7d2lkdGg6MzMwcHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciBsYWJlbC5oLWxhYmVse2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MTRweDttYXJnaW46MCAxMHB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5oZWFkZXIgI2xvZ2dlci11cmx7d2lkdGg6NTAwcHh9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmhlYWRlciAuay1jaGVja2JveC1sYWJlbHtmb250LXNpemU6MTJweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubW9uaXRvcntkaXNwbGF5OmZsZXg7ZmxleDoxO2JhY2tncm91bmQ6I2YxZjFmMTtib3JkZXI6MXB4IHNvbGlkICNjY2M7cGFkZGluZzowO21hcmdpbjo1cHggMH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubW9uaXRvciAubG9hZGluZ3tkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7ZmxleDoxfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5tb25pdG9yIC5sb2FkaW5nIC5rLWktbG9hZGluZ3tmb250LXNpemU6MzRweDtjb2xvcjojOTk5fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5rLWktcmVzZXR7bWFyZ2luLXJpZ2h0OjEwcHg7Y29sb3I6IzAyNzdiZDtib3JkZXI6bm9uZTtwYWRkaW5nOjVweH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAuay1pLXJlc2V0OmhvdmVye2N1cnNvcjpwb2ludGVyO2NvbG9yOiMyMjJ9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgaHJ7YmFja2dyb3VuZDojMDI3N2JkO2hlaWdodDoxcHg7Ym9yZGVyOm5vbmV9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3N7bWFyZ2luOjA7cGFkZGluZzo1cHg7bGlzdC1zdHlsZTpub25lO292ZXJmbG93OmF1dG87ZmxleDoxfTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5uby1sb2dze2ZvbnQtc2l6ZToxMnB4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5uby1sb2dzIHN0cm9uZ3tmb250LXdlaWdodDo1MDB9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZ3tmb250LXNpemU6MTJweDttYXJnaW46M3B4IDB9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1kYXRle2NvbG9yOiM5OTl9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1hY2NvdW50LW5hbWV7Y29sb3I6IzAwZn06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLXN0YXR1c3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bWFyZ2luOjAgM3B4fTpob3N0KHRiLWxvZ2dlci12aWV3ZXIpIC5sb2dzIC5sb2cgLmwtc3RhdHVzLmxldmVsLTB7Y29sb3I6IzAwMH06aG9zdCh0Yi1sb2dnZXItdmlld2VyKSAubG9ncyAubG9nIC5sLXN0YXR1cy5sZXZlbC0xe2NvbG9yOiMwMGZ9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1zdGF0dXMubGV2ZWwtMntjb2xvcjpvcmFuZ2V9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1zdGF0dXMubGV2ZWwtM3tjb2xvcjpyZWR9Omhvc3QodGItbG9nZ2VyLXZpZXdlcikgLmxvZ3MgLmxvZyAubC1zdGF0dXMubGV2ZWwtNHtjb2xvcjpyZWR9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2dlclZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICAvLyBpbnN0YW5jZSBrZXlcclxuICAgIEBWaWV3Q2hpbGQoJ2FwcElkSW5wdXQnKVxyXG4gICAgYXBwSWRJbnB1dDtcclxuICAgIGFwcElkOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwSWQnKSA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhcHBJZCcpIDogJyc7XHJcblxyXG4gICAgLy8gYXBwXHJcbiAgICBAVmlld0NoaWxkKCdhcHBMaXN0JylcclxuICAgIGFwcExpc3Q7XHJcbiAgICBwdWJsaWMgYXBwRGF0YTogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgYXBwOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwJykgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwJykgOiAnJztcclxuXHJcbiAgICAvLyBhcHAgdHlwZXNcclxuICAgIEBWaWV3Q2hpbGQoJ2FwcFR5cGVMaXN0JylcclxuICAgIGFwcFR5cGVMaXN0O1xyXG4gICAgcHVibGljIGFwcFR5cGVEYXRhOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBhcHBUeXBlOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXBwVHlwZScpID8gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FwcFR5cGUnKSA6ICcnO1xyXG5cclxuICAgIGxvZ3M6IExvZ1tdID0gW107XHJcbiAgICBsb2dTdGF0dXMgPSBMb2dTdGF0dXM7XHJcbiAgICBzaG93ID0gZmFsc2U7XHJcbiAgICBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICBob3dNYW55ID0gMTAwO1xyXG4gICAgY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgYXV0b1JlZnJlc2ggPSBmYWxzZTtcclxuICAgIGF1dG9SZWZyZXNoSW50ZXJ2YWw6IGFueTtcclxuICAgIG1lc3NhZ2UgPSAnJztcclxuXHJcbiAgICBsb2dnZXJVcmwgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9nZ2VyVXJsJykgPyBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9nZ2VyVXJsJykgOiB0aGlzLmxvZ2dlclNlcnZpY2UuZ2V0TG9nZ2VyVXJsKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIGxvZ2dlclNlcnZpY2U6IFRiTG9nZ2VyU2VydmljZSkge31cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLmFwcExpc3RJbml0KCk7XHJcbiAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge31cclxuXHJcbiAgICAvLyBsZWdnbyB0dXR0ZSBsZSBhcHAsIGdsaSBhcHBJZCBlIGdsaSBhcHBUeXBlIGUgbGkgc2Fsdm8gaW4gcmlzcGV0dGl2aSBhcnJheVxyXG4gICAgLy8gdmVycmFubm8gcG9pIGZpbHRyYXRpIGRhaSBjb21wb25lbnRpIGtlbmRvXHJcbiAgICBhcHBMaXN0SW5pdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXBwSWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UuZ2V0QXBwcyh0aGlzLmFwcElkKS5zdWJzY3JpYmUoKG9wOiBMb2dnZXJPcGVyYXRpb25SZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hcHBEYXRhID0gb3AuQ29udGVudDtcclxuICAgICAgICAgICAgdGhpcy5hcHBMaXN0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UuZ2V0QXBwVHlwZXModGhpcy5hcHBJZCkuc3Vic2NyaWJlKChvcDogTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwVHlwZURhdGEgPSBvcC5Db250ZW50O1xyXG4gICAgICAgICAgICB0aGlzLmFwcFR5cGVMaXN0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0TG9ncygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXBwSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gJ0luc3RhbmNlIEtleSBtYW5jYW50ZSc7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwSWRJbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBFbnRyaWVzUGFyYW1zKCk7XHJcbiAgICAgICAgcGFyYW1zLmFwcElkID0gdGhpcy5hcHBJZDtcclxuICAgICAgICBpZiAodGhpcy5hcHApIHBhcmFtcy5hcHBzID0gdGhpcy5hcHA7XHJcbiAgICAgICAgaWYgKHRoaXMuYXBwVHlwZSkgcGFyYW1zLmFwcFR5cGVzID0gdGhpcy5hcHBUeXBlO1xyXG5cclxuICAgICAgICB0aGlzLmxvZ2dlclNlcnZpY2UuZ2V0TG9ncyhwYXJhbXMpLnN1YnNjcmliZSgob3A6IExvZ2dlck9wZXJhdGlvblJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIW9wLlJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlID0gb3AuTWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ3MgPSBvcC5Db250ZW50O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldExvZ2dlclVybChldmVudCkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dnZXJVcmwnLCB0aGlzLmxvZ2dlclVybCk7XHJcbiAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEFwcCgkZXZlbnQpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXBwJywgdGhpcy5hcHApO1xyXG4gICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRBcHBJZCgkZXZlbnQpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXBwSWQnLCB0aGlzLmFwcElkKTtcclxuICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0QXBwVHlwZSgkZXZlbnQpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYXBwVHlwZScsIHRoaXMuYXBwVHlwZSk7XHJcbiAgICAgICAgdGhpcy5nZXRMb2dzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hdXRvUmVmcmVzaEludGVydmFsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2tBdXRvUmVmcmVzaChldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5hdXRvUmVmcmVzaCA9ICF0aGlzLmF1dG9SZWZyZXNoO1xyXG4gICAgICAgIGlmICh0aGlzLmF1dG9SZWZyZXNoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0TG9ncygpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dG9SZWZyZXNoSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldExvZ3MoKTtcclxuICAgICAgICAgICAgfSwgNTAwMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1JlZnJlc2hJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmF1dG9SZWZyZXNoSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==