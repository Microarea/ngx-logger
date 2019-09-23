import { NotificationService } from '@progress/kendo-angular-notification';
export declare class TbNotificationService {
    private notificationService;
    constructor(notificationService: NotificationService);
    show(msg: string, style?: any): void;
}
