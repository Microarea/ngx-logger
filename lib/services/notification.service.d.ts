import { NotificationService } from '@progress/kendo-angular-notification';
export declare class TbNotificationService {
    private notificationService;
    constructor(notificationService: NotificationService);
    show(msg: any, style?: any): void;
}
