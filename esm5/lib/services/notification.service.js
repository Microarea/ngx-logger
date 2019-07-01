/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    /**
     * @type {?}
     * @private
     */
    TbNotificationService.prototype.notificationService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7QUFFM0U7SUFJSSwrQkFBb0IsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFBRyxDQUFDOzs7Ozs7SUFFekQsb0NBQUk7Ozs7O0lBQVgsVUFBWSxHQUFHLEVBQUUsS0FBbUI7UUFBbkIsc0JBQUEsRUFBQSxjQUFtQjtRQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1lBQzFCLE9BQU8sRUFBRSxHQUFHO1lBQ1osU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQzNDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtZQUNyRCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7WUFDbEMsU0FBUyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBZEosVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnQkFKUSxtQkFBbUI7OztnQ0FGNUI7Q0FtQkMsQUFmRCxJQWVDO1NBWlkscUJBQXFCOzs7Ozs7SUFDbEIsb0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItbm90aWZpY2F0aW9uJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGJOb3RpZmljYXRpb25TZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge31cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhtc2csIHN0eWxlOiBhbnkgPSAnbm9uZScpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvblNlcnZpY2Uuc2hvdyh7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IG1zZyxcclxuICAgICAgICAgICAgYW5pbWF0aW9uOiB7IHR5cGU6ICdzbGlkZScsIGR1cmF0aW9uOiAyMDAgfSxcclxuICAgICAgICAgICAgcG9zaXRpb246IHsgaG9yaXpvbnRhbDogJ3JpZ2h0JywgdmVydGljYWw6ICdib3R0b20nIH0sXHJcbiAgICAgICAgICAgIHR5cGU6IHsgc3R5bGU6IHN0eWxlLCBpY29uOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIGhpZGVBZnRlcjogNDAwMFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==