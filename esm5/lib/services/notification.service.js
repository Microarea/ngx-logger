/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                },] }
    ];
    /** @nocollapse */
    TbNotificationService.ctorParameters = function () { return [
        { type: NotificationService }
    ]; };
    /** @nocollapse */ TbNotificationService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function TbNotificationService_Factory() { return new TbNotificationService(i0.ɵɵinject(i1.NotificationService)); }, token: TbNotificationService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7QUFFM0U7SUFJSSwrQkFBb0IsbUJBQXdDO1FBQXhDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7SUFBRyxDQUFDOzs7Ozs7SUFFekQsb0NBQUk7Ozs7O0lBQVgsVUFBWSxHQUFXLEVBQUUsS0FBbUI7UUFBbkIsc0JBQUEsRUFBQSxjQUFtQjtRQUN4QyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1lBQzFCLE9BQU8sRUFBRSxHQUFHO1lBQ1osU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQzNDLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtZQUNyRCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7WUFDbEMsU0FBUyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBZEosVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnQkFKUSxtQkFBbUI7OztnQ0FGNUI7Q0FtQkMsQUFmRCxJQWVDO1NBWlkscUJBQXFCOzs7Ozs7SUFDbEIsb0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItbm90aWZpY2F0aW9uJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGJOb3RpZmljYXRpb25TZXJ2aWNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge31cclxuXHJcbiAgICBwdWJsaWMgc2hvdyhtc2c6IHN0cmluZywgc3R5bGU6IGFueSA9ICdub25lJyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9uU2VydmljZS5zaG93KHtcclxuICAgICAgICAgICAgY29udGVudDogbXNnLFxyXG4gICAgICAgICAgICBhbmltYXRpb246IHsgdHlwZTogJ3NsaWRlJywgZHVyYXRpb246IDIwMCB9LFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogeyBob3Jpem9udGFsOiAncmlnaHQnLCB2ZXJ0aWNhbDogJ2JvdHRvbScgfSxcclxuICAgICAgICAgICAgdHlwZTogeyBzdHlsZTogc3R5bGUsIGljb246IHRydWUgfSxcclxuICAgICAgICAgICAgaGlkZUFmdGVyOiA0MDAwXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19