/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { StompState } from '@stomp/ng2-stompjs';
import { LogStatus } from './../../models/log-status.enum';
import { TbLoggerService } from './../../services/tb-logger.service';
import { TbNotificationService } from '../../services/notification.service';
export class RabbitViewerComponent {
    /**
     * @param {?} loggerService
     * @param {?} notificationService
     */
    constructor(loggerService, notificationService) {
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
    ngOnInit() {
        this.mqConnectionStateSubscription = this.loggerService.mqConnectionStateObservable.subscribe(status => this.onChangeMqState(status));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() { }
    /**
     * @param {?} status
     * @return {?}
     */
    onChangeMqState(status) {
        this.mqConnectionState = status;
        if (status === StompState.CONNECTED && this.mqQueueName) {
            this.mqSubscribe();
        }
    }
    /**
     * @return {?}
     */
    mqSubscribe() {
        localStorage.setItem('mqQueueName', this.mqQueueName);
        /** @type {?} */
        const queueName = `/queue/${this.mqQueueName}`;
        this.mqQueue = this.loggerService.mqConnect(queueName).subscribe(msg => this.onMessage(msg));
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    onMessage(msg) {
        console.log('RabbitViewerComponent.onMessage', msg);
        this.mqMessages.push(msg);
        /** @type {?} */
        let style = 'none';
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
    }
}
RabbitViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'tb-rabbit-viewer',
                template: `<div class="header">
    <div class="row">
        <label id="mq-queue-name-label" class="h-label" for="mq-connection-state">MQ Connection state:</label>
        <p id="mq-connection-state">{{stompState[loggerService.mqConnectionState]}}</p>
    </div>
    <div class="row">
        <label id="mq-queue-name-label" class="h-label" for="mq-queue">Queue Name:</label>
        <input kendoTextBox id="mq-queue-name" [(ngModel)]="mqQueueName" (click)="$event.target.select()" />
        <button kendoButton (click)="mqSubscribe()" [disabled]="loggerService.mqConnectionState !== stompState.CONNECTED">Connect</button>
    </div>
</div>
<div class="monitor">
    <ul class="messages">
        <li *ngIf="mqMessages.length == 0" class="no-messages">No messages in queue:<strong>{{mqQueueName}}</strong></li>
        <li *ngFor="let m of mqMessages" class="message">
            <!-- <span class="l-msg"> {{m.UPMessage}} </span> -->
            <span class="l-date">{{m.UPContent.EntryCreated | date: 'medium' }} </span> -
            <span class="l-account-name"> {{m.UPContent.AccountName }} </span> -
            <span class="l-app" *ngIf="m.UPContent.App"> {{m.UPContent.App }} -</span>
            <span class="l-type" *ngIf="m.UPContent.RegisteredAppType"> {{m.UPContent.RegisteredAppType }} -</span>
            <span class="l-category" *ngIf="m.UPContent.Category"> {{m.UPContent.Category }} -</span>
            <span class="l-status level-{{m.UPContent.Level}}"> [{{logStatus[m.UPContent.Level]}}]</span>
            <span class="l-msg"> {{m.UPContent.Message}} </span>
        </li>
    </ul>
</div>`,
                styles: [`:host(tb-rabbit-viewer){flex:1;display:flex;flex-direction:column}:host(tb-rabbit-viewer) .notify{background:#ff0b0b;padding:5px 10px;margin:10px 0;color:#fff}:host(tb-rabbit-viewer) .notify p{margin:5px 0;font-size:12px}:host(tb-rabbit-viewer) .header{display:flex;flex-direction:column}:host(tb-rabbit-viewer) .header .row{display:flex;flex-direction:row;align-items:center;margin:5px 0}:host(tb-rabbit-viewer) .header .row.flex-center{justify-content:center}:host(tb-rabbit-viewer) .header .row.flex-around{justify-content:space-around}:host(tb-rabbit-viewer) .header .row.flex-between{justify-content:space-between}:host(tb-rabbit-viewer) .header .row #mq-queue-name{width:500px}:host(tb-rabbit-viewer) .header label.h-label{font-weight:500;font-size:14px;margin:0 10px}:host(tb-rabbit-viewer) .header .k-checkbox-label{font-size:12px}:host(tb-rabbit-viewer) .monitor{display:flex;flex:1;background:#f1f1f1;border:1px solid #ccc;padding:0;margin:5px 0}:host(tb-rabbit-viewer) .monitor .loading{display:flex;justify-content:center;align-items:center;flex:1}:host(tb-rabbit-viewer) .monitor .loading .k-i-loading{font-size:34px;color:#999}:host(tb-rabbit-viewer) .k-i-reset{margin-right:10px;color:#0277bd;border:none;padding:5px}:host(tb-rabbit-viewer) .k-i-reset:hover{cursor:pointer;color:#222}:host(tb-rabbit-viewer) hr{background:#0277bd;height:1px;border:none}:host(tb-rabbit-viewer) .messages{margin:0;padding:5px;list-style:none;overflow:auto;flex:1}:host(tb-rabbit-viewer) .messages .no-logs{font-size:12px}:host(tb-rabbit-viewer) .messages .no-logs strong{font-weight:500}:host(tb-rabbit-viewer) .messages .message{font-size:12px;margin:3px 0}:host(tb-rabbit-viewer) .messages .message .l-date{color:#999}:host(tb-rabbit-viewer) .messages .message .l-account-name{color:#00f}:host(tb-rabbit-viewer) .messages .message .l-status{text-transform:uppercase;margin:0 3px}:host(tb-rabbit-viewer) .messages .message .l-status.level-0{color:#000}:host(tb-rabbit-viewer) .messages .message .l-status.level-1{color:#00f}:host(tb-rabbit-viewer) .messages .message .l-status.level-2{color:orange}:host(tb-rabbit-viewer) .messages .message .l-status.level-3{color:red}:host(tb-rabbit-viewer) .messages .message .l-status.level-4{color:red}`]
            },] },
];
/** @nocollapse */
RabbitViewerComponent.ctorParameters = () => [
    { type: TbLoggerService },
    { type: TbNotificationService }
];
if (false) {
    /** @type {?} */
    RabbitViewerComponent.prototype.stompState;
    /** @type {?} */
    RabbitViewerComponent.prototype.logStatus;
    /** @type {?} */
    RabbitViewerComponent.prototype.mqConnectionStateSubscription;
    /** @type {?} */
    RabbitViewerComponent.prototype.mqConnectionState;
    /** @type {?} */
    RabbitViewerComponent.prototype.mqQueue;
    /** @type {?} */
    RabbitViewerComponent.prototype.mqQueueName;
    /** @type {?} */
    RabbitViewerComponent.prototype.mqMessages;
    /** @type {?} */
    RabbitViewerComponent.prototype.loggerService;
    /** @type {?} */
    RabbitViewerComponent.prototype.notificationService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFiYml0LXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvcmFiYml0LXZpZXdlci9yYWJiaXQtdmlld2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFHNUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWhELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDckUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFnQzVFLE1BQU07Ozs7O0lBWUYsWUFBbUIsYUFBOEIsRUFBVSxtQkFBMEM7UUFBbEYsa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUF1QjswQkFYeEYsVUFBVTt5QkFDWCxTQUFTOzJCQU1QLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7MEJBRXpELEVBQUU7S0FFb0U7Ozs7SUFFekcsUUFBUTtRQUNKLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLDJCQUEyQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUNuRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUMvQixDQUFDO0tBQ0w7Ozs7SUFFRCxlQUFlLE1BQUs7Ozs7O0lBRVosZUFBZSxDQUFDLE1BQWtCO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUM7UUFFaEMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCOzs7OztJQUdFLFdBQVc7UUFDZCxZQUFZLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7O1FBQ3RELE1BQU0sU0FBUyxHQUFHLFVBQVUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFHekYsU0FBUyxDQUFDLEdBQUc7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFFMUIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsS0FBSyxTQUFTLENBQUMsSUFBSTtvQkFDZixLQUFLLEdBQUcsU0FBUyxDQUFDO29CQUNsQixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxTQUFTLENBQUMsS0FBSyxDQUFDO2dCQUNyQixLQUFLLFNBQVMsQ0FBQyxLQUFLO29CQUNoQixLQUFLLEdBQUcsT0FBTyxDQUFDO29CQUNoQixLQUFLLENBQUM7Z0JBQ1Y7b0JBQ0ksS0FBSyxHQUFHLE1BQU0sQ0FBQzthQUN0QjtZQUNELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN2RDs7OztZQXJGUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJQO2dCQUNILE1BQU0sRUFBRSxDQUFDLGdzRUFBZ3NFLENBQUM7YUFDN3NFOzs7O1lBaENRLGVBQWU7WUFDZixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU3RvbXBTdGF0ZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcblxyXG5pbXBvcnQgeyBMb2dTdGF0dXMgfSBmcm9tICcuLy4uLy4uL21vZGVscy9sb2ctc3RhdHVzLmVudW0nO1xyXG5pbXBvcnQgeyBUYkxvZ2dlclNlcnZpY2UgfSBmcm9tICcuLy4uLy4uL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGJOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RiLXJhYmJpdC12aWV3ZXInLFxyXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgPGxhYmVsIGlkPVwibXEtcXVldWUtbmFtZS1sYWJlbFwiIGNsYXNzPVwiaC1sYWJlbFwiIGZvcj1cIm1xLWNvbm5lY3Rpb24tc3RhdGVcIj5NUSBDb25uZWN0aW9uIHN0YXRlOjwvbGFiZWw+XHJcbiAgICAgICAgPHAgaWQ9XCJtcS1jb25uZWN0aW9uLXN0YXRlXCI+e3tzdG9tcFN0YXRlW2xvZ2dlclNlcnZpY2UubXFDb25uZWN0aW9uU3RhdGVdfX08L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8bGFiZWwgaWQ9XCJtcS1xdWV1ZS1uYW1lLWxhYmVsXCIgY2xhc3M9XCJoLWxhYmVsXCIgZm9yPVwibXEtcXVldWVcIj5RdWV1ZSBOYW1lOjwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IGtlbmRvVGV4dEJveCBpZD1cIm1xLXF1ZXVlLW5hbWVcIiBbKG5nTW9kZWwpXT1cIm1xUXVldWVOYW1lXCIgKGNsaWNrKT1cIiRldmVudC50YXJnZXQuc2VsZWN0KClcIiAvPlxyXG4gICAgICAgIDxidXR0b24ga2VuZG9CdXR0b24gKGNsaWNrKT1cIm1xU3Vic2NyaWJlKClcIiBbZGlzYWJsZWRdPVwibG9nZ2VyU2VydmljZS5tcUNvbm5lY3Rpb25TdGF0ZSAhPT0gc3RvbXBTdGF0ZS5DT05ORUNURURcIj5Db25uZWN0PC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJtb25pdG9yXCI+XHJcbiAgICA8dWwgY2xhc3M9XCJtZXNzYWdlc1wiPlxyXG4gICAgICAgIDxsaSAqbmdJZj1cIm1xTWVzc2FnZXMubGVuZ3RoID09IDBcIiBjbGFzcz1cIm5vLW1lc3NhZ2VzXCI+Tm8gbWVzc2FnZXMgaW4gcXVldWU6PHN0cm9uZz57e21xUXVldWVOYW1lfX08L3N0cm9uZz48L2xpPlxyXG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbSBvZiBtcU1lc3NhZ2VzXCIgY2xhc3M9XCJtZXNzYWdlXCI+XHJcbiAgICAgICAgICAgIDwhLS0gPHNwYW4gY2xhc3M9XCJsLW1zZ1wiPiB7e20uVVBNZXNzYWdlfX0gPC9zcGFuPiAtLT5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLWRhdGVcIj57e20uVVBDb250ZW50LkVudHJ5Q3JlYXRlZCB8IGRhdGU6ICdtZWRpdW0nIH19IDwvc3Bhbj4gLVxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtYWNjb3VudC1uYW1lXCI+IHt7bS5VUENvbnRlbnQuQWNjb3VudE5hbWUgfX0gPC9zcGFuPiAtXHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibC1hcHBcIiAqbmdJZj1cIm0uVVBDb250ZW50LkFwcFwiPiB7e20uVVBDb250ZW50LkFwcCB9fSAtPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtdHlwZVwiICpuZ0lmPVwibS5VUENvbnRlbnQuUmVnaXN0ZXJlZEFwcFR5cGVcIj4ge3ttLlVQQ29udGVudC5SZWdpc3RlcmVkQXBwVHlwZSB9fSAtPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImwtY2F0ZWdvcnlcIiAqbmdJZj1cIm0uVVBDb250ZW50LkNhdGVnb3J5XCI+IHt7bS5VUENvbnRlbnQuQ2F0ZWdvcnkgfX0gLTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLXN0YXR1cyBsZXZlbC17e20uVVBDb250ZW50LkxldmVsfX1cIj4gW3t7bG9nU3RhdHVzW20uVVBDb250ZW50LkxldmVsXX19XTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsLW1zZ1wiPiB7e20uVVBDb250ZW50Lk1lc3NhZ2V9fSA8L3NwYW4+XHJcbiAgICAgICAgPC9saT5cclxuICAgIDwvdWw+XHJcbjwvZGl2PmAsXHJcbiAgICBzdHlsZXM6IFtgOmhvc3QodGItcmFiYml0LXZpZXdlcil7ZmxleDoxO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm5vdGlmeXtiYWNrZ3JvdW5kOiNmZjBiMGI7cGFkZGluZzo1cHggMTBweDttYXJnaW46MTBweCAwO2NvbG9yOiNmZmZ9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm5vdGlmeSBwe21hcmdpbjo1cHggMDtmb250LXNpemU6MTJweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVye2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW59Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmhlYWRlciAucm93e2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpyb3c7YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbjo1cHggMH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIC5yb3cuZmxleC1jZW50ZXJ7anVzdGlmeS1jb250ZW50OmNlbnRlcn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIC5yb3cuZmxleC1hcm91bmR7anVzdGlmeS1jb250ZW50OnNwYWNlLWFyb3VuZH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIC5yb3cuZmxleC1iZXR3ZWVue2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVufTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5oZWFkZXIgLnJvdyAjbXEtcXVldWUtbmFtZXt3aWR0aDo1MDBweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuaGVhZGVyIGxhYmVsLmgtbGFiZWx7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToxNHB4O21hcmdpbjowIDEwcHh9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLmhlYWRlciAuay1jaGVja2JveC1sYWJlbHtmb250LXNpemU6MTJweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubW9uaXRvcntkaXNwbGF5OmZsZXg7ZmxleDoxO2JhY2tncm91bmQ6I2YxZjFmMTtib3JkZXI6MXB4IHNvbGlkICNjY2M7cGFkZGluZzowO21hcmdpbjo1cHggMH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubW9uaXRvciAubG9hZGluZ3tkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7ZmxleDoxfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tb25pdG9yIC5sb2FkaW5nIC5rLWktbG9hZGluZ3tmb250LXNpemU6MzRweDtjb2xvcjojOTk5fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5rLWktcmVzZXR7bWFyZ2luLXJpZ2h0OjEwcHg7Y29sb3I6IzAyNzdiZDtib3JkZXI6bm9uZTtwYWRkaW5nOjVweH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAuay1pLXJlc2V0OmhvdmVye2N1cnNvcjpwb2ludGVyO2NvbG9yOiMyMjJ9Omhvc3QodGItcmFiYml0LXZpZXdlcikgaHJ7YmFja2dyb3VuZDojMDI3N2JkO2hlaWdodDoxcHg7Ym9yZGVyOm5vbmV9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2Vze21hcmdpbjowO3BhZGRpbmc6NXB4O2xpc3Qtc3R5bGU6bm9uZTtvdmVyZmxvdzphdXRvO2ZsZXg6MX06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm5vLWxvZ3N7Zm9udC1zaXplOjEycHh9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5uby1sb2dzIHN0cm9uZ3tmb250LXdlaWdodDo1MDB9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdle2ZvbnQtc2l6ZToxMnB4O21hcmdpbjozcHggMH06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtZGF0ZXtjb2xvcjojOTk5fTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1hY2NvdW50LW5hbWV7Y29sb3I6IzAwZn06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtc3RhdHVze3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTttYXJnaW46MCAzcHh9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLXN0YXR1cy5sZXZlbC0we2NvbG9yOiMwMDB9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLXN0YXR1cy5sZXZlbC0xe2NvbG9yOiMwMGZ9Omhvc3QodGItcmFiYml0LXZpZXdlcikgLm1lc3NhZ2VzIC5tZXNzYWdlIC5sLXN0YXR1cy5sZXZlbC0ye2NvbG9yOm9yYW5nZX06aG9zdCh0Yi1yYWJiaXQtdmlld2VyKSAubWVzc2FnZXMgLm1lc3NhZ2UgLmwtc3RhdHVzLmxldmVsLTN7Y29sb3I6cmVkfTpob3N0KHRiLXJhYmJpdC12aWV3ZXIpIC5tZXNzYWdlcyAubWVzc2FnZSAubC1zdGF0dXMubGV2ZWwtNHtjb2xvcjpyZWR9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFJhYmJpdFZpZXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBzdG9tcFN0YXRlID0gU3RvbXBTdGF0ZTtcclxuICAgIGxvZ1N0YXR1cyA9IExvZ1N0YXR1cztcclxuXHJcbiAgICBtcUNvbm5lY3Rpb25TdGF0ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgbXFDb25uZWN0aW9uU3RhdGU6IFN0b21wU3RhdGU7XHJcblxyXG4gICAgbXFRdWV1ZTogU3Vic2NyaXB0aW9uO1xyXG4gICAgbXFRdWV1ZU5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbXFRdWV1ZU5hbWUnKSA/IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtcVF1ZXVlTmFtZScpIDogJyc7XHJcblxyXG4gICAgcHVibGljIG1xTWVzc2FnZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbG9nZ2VyU2VydmljZTogVGJMb2dnZXJTZXJ2aWNlLCBwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IFRiTm90aWZpY2F0aW9uU2VydmljZSkge31cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLm1xQ29ubmVjdGlvblN0YXRlU3Vic2NyaXB0aW9uID0gdGhpcy5sb2dnZXJTZXJ2aWNlLm1xQ29ubmVjdGlvblN0YXRlT2JzZXJ2YWJsZS5zdWJzY3JpYmUoc3RhdHVzID0+XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2VNcVN0YXRlKHN0YXR1cylcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHt9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZU1xU3RhdGUoc3RhdHVzOiBTdG9tcFN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5tcUNvbm5lY3Rpb25TdGF0ZSA9IHN0YXR1cztcclxuXHJcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gU3RvbXBTdGF0ZS5DT05ORUNURUQgJiYgdGhpcy5tcVF1ZXVlTmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1xU3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtcVN1YnNjcmliZSgpIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbXFRdWV1ZU5hbWUnLCB0aGlzLm1xUXVldWVOYW1lKTtcclxuICAgICAgICBjb25zdCBxdWV1ZU5hbWUgPSBgL3F1ZXVlLyR7dGhpcy5tcVF1ZXVlTmFtZX1gO1xyXG4gICAgICAgIHRoaXMubXFRdWV1ZSA9IHRoaXMubG9nZ2VyU2VydmljZS5tcUNvbm5lY3QocXVldWVOYW1lKS5zdWJzY3JpYmUobXNnID0+IHRoaXMub25NZXNzYWdlKG1zZykpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25NZXNzYWdlKG1zZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSYWJiaXRWaWV3ZXJDb21wb25lbnQub25NZXNzYWdlJywgbXNnKTtcclxuXHJcbiAgICAgICAgdGhpcy5tcU1lc3NhZ2VzLnB1c2gobXNnKTtcclxuXHJcbiAgICAgICAgbGV0IHN0eWxlID0gJ25vbmUnO1xyXG4gICAgICAgIGlmIChtc2cuVVBDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobXNnLlVQQ29udGVudC5MZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBMb2dTdGF0dXMuV2FybjpcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9ICd3YXJuaW5nJztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTG9nU3RhdHVzLkVycm9yOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBMb2dTdGF0dXMuRmF0YWw6XHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSAnZXJyb3InO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvdyhtc2cuVVBNZXNzYWdlLCBzdHlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==