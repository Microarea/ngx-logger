/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import * as i0 from "@angular/core";
import * as i1 from "@progress/kendo-angular-notification";
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
    /** @nocollapse */ TbNotificationService.ngInjectableDef = i0.defineInjectable({ factory: function TbNotificationService_Factory() { return new TbNotificationService(i0.inject(i1.NotificationService)); }, token: TbNotificationService, providedIn: "root" });
    return TbNotificationService;
}());
export { TbNotificationService };
if (false) {
    /** @type {?} */
    TbNotificationService.prototype.notificationService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7O0lBTXZFLCtCQUFvQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtLQUFJOzs7Ozs7SUFFekQsb0NBQUk7Ozs7O2NBQUMsR0FBRyxFQUFFLEtBQW1CO1FBQW5CLHNCQUFBLEVBQUEsY0FBbUI7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQztZQUMxQixPQUFPLEVBQUUsR0FBRztZQUNaLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtZQUMzQyxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7WUFDckQsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO1lBQ2xDLFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQzs7O2dCQWJWLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozs7Z0JBSlEsbUJBQW1COzs7Z0NBRjVCOztTQU9hLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLW5vdGlmaWNhdGlvbic7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTm90aWZpY2F0aW9uU2VydmljZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHt9XHJcblxyXG4gICAgcHVibGljIHNob3cobXNnLCBzdHlsZTogYW55ID0gJ25vbmUnKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25TZXJ2aWNlLnNob3coe1xyXG4gICAgICAgICAgICBjb250ZW50OiBtc2csXHJcbiAgICAgICAgICAgIGFuaW1hdGlvbjogeyB0eXBlOiAnc2xpZGUnLCBkdXJhdGlvbjogMjAwIH0sXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7IGhvcml6b250YWw6ICdyaWdodCcsIHZlcnRpY2FsOiAnYm90dG9tJyB9LFxyXG4gICAgICAgICAgICB0eXBlOiB7IHN0eWxlOiBzdHlsZSwgaWNvbjogdHJ1ZSB9LFxyXG4gICAgICAgICAgICBoaWRlQWZ0ZXI6IDQwMDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=