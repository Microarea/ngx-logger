import { Injectable, NgModule, Component, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var OperationResult = /** @class */ (function () {
    function OperationResult() {
    }
    return OperationResult;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LoggerOperationResult = /** @class */ (function () {
    function LoggerOperationResult() {
    }
    return LoggerOperationResult;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LoggerService = /** @class */ (function () {
    function LoggerService() {
    }
    LoggerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    LoggerService.ctorParameters = function () { return []; };
    /** @nocollapse */ LoggerService.ngInjectableDef = defineInjectable({ factory: function LoggerService_Factory() { return new LoggerService(); }, token: LoggerService, providedIn: "root" });
    return LoggerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LoggerComponent = /** @class */ (function () {
    function LoggerComponent() {
    }
    /**
     * @return {?}
     */
    LoggerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    LoggerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'tb-logger',
                    template: "\n    <p>\n      logger works!\n    </p>\n  ",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    LoggerComponent.ctorParameters = function () { return []; };
    return LoggerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LoggerModule = /** @class */ (function () {
    function LoggerModule() {
    }
    LoggerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [LoggerComponent],
                    exports: [LoggerComponent]
                },] },
    ];
    return LoggerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { OperationResult, LoggerOperationResult, LoggerService, LoggerComponent, LoggerModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9AdGIvbG9nZ2VyL2xpYi9tb2RlbHMvb3BlcmF0aW9uLXJlc3VsdC5tb2RlbC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL2xvZ2dlci1vcGVyYXRpb24tcmVzdWx0Lm1vZGVsLnRzIiwibmc6Ly9AdGIvbG9nZ2VyL2xpYi9sb2dnZXIuc2VydmljZS50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvbG9nZ2VyLmNvbXBvbmVudC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvbG9nZ2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgT3BlcmF0aW9uUmVzdWx0IHtcclxuICBSZXN1bHQ6IGJvb2xlYW47XHJcbiAgTWVzc2FnZT86IHN0cmluZztcclxuICBDb2RlPzogbnVtYmVyO1xyXG4gIENvbnRlbnQ/OiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0IHtcclxuICAgIFJlc3VsdDogYm9vbGVhbjtcclxuICAgIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgICBDb2RlPzogbnVtYmVyO1xyXG4gICAgQ29udGVudD86IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMb2dnZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGItbG9nZ2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8cD5cbiAgICAgIGxvZ2dlciB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgTG9nZ2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2dnZXJDb21wb25lbnQgfSBmcm9tICcuL2xvZ2dlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0xvZ2dlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtMb2dnZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIExvZ2dlck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBO0lBTUU7S0FBZ0I7MEJBTmxCO0lBT0M7Ozs7OztBQ1BELElBQUE7SUFNSTtLQUFnQjtnQ0FOcEI7SUFPQzs7Ozs7O0FDUEQ7SUFPRTtLQUFpQjs7Z0JBTGxCLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7O3dCQUpEOzs7Ozs7O0FDQUE7SUFhRTtLQUFpQjs7OztJQUVqQixrQ0FBUTs7O0lBQVI7S0FDQzs7Z0JBZEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsOENBSVQ7b0JBQ0QsTUFBTSxFQUFFLEVBQUU7aUJBQ1g7Ozs7MEJBVkQ7Ozs7Ozs7QUNBQTs7OztnQkFHQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLEVBQ1I7b0JBQ0QsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMvQixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQzNCOzt1QkFSRDs7Ozs7Ozs7Ozs7Ozs7OyJ9