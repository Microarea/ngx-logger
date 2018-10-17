import { OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StompState } from '@stomp/ng2-stompjs';
import { LogStatus } from './../../models/log-status.enum';
import { TbLoggerService } from './../../services/tb-logger.service';
import { TbNotificationService } from '../../services/notification.service';
export declare class RabbitViewerComponent implements OnInit, AfterViewInit {
    loggerService: TbLoggerService;
    private notificationService;
    stompState: typeof StompState;
    logStatus: typeof LogStatus;
    mqConnectionStateSubscription: Subscription;
    mqConnectionState: StompState;
    mqQueue: Subscription;
    mqQueueName: string;
    mqMessages: Array<string>;
    constructor(loggerService: TbLoggerService, notificationService: TbNotificationService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private onChangeMqState(status);
    mqSubscribe(): void;
    private onMessage(msg);
}
