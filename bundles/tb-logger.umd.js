(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@tb/logger', ['exports', '@angular/core'], factory) :
    (factory((global.tb = global.tb || {}, global.tb.logger = {}),global.ng.core));
}(this, (function (exports,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var OperationResult = (function () {
        function OperationResult() {
        }
        return OperationResult;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LoggerOperationResult = (function () {
        function LoggerOperationResult() {
        }
        return LoggerOperationResult;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LoggerService = (function () {
        function LoggerService() {
        }
        LoggerService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        LoggerService.ctorParameters = function () { return []; };
        /** @nocollapse */ LoggerService.ngInjectableDef = i0.defineInjectable({ factory: function LoggerService_Factory() { return new LoggerService(); }, token: LoggerService, providedIn: "root" });
        return LoggerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var LoggerComponent = (function () {
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
            { type: i0.Component, args: [{
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
    var LoggerModule = (function () {
        function LoggerModule() {
        }
        LoggerModule.decorators = [
            { type: i0.NgModule, args: [{
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

    exports.OperationResult = OperationResult;
    exports.LoggerOperationResult = LoggerOperationResult;
    exports.LoggerService = LoggerService;
    exports.LoggerComponent = LoggerComponent;
    exports.LoggerModule = LoggerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHRiL2xvZ2dlci9saWIvbW9kZWxzL29wZXJhdGlvbi1yZXN1bHQubW9kZWwudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL21vZGVscy9sb2dnZXItb3BlcmF0aW9uLXJlc3VsdC5tb2RlbC50cyIsIm5nOi8vQHRiL2xvZ2dlci9saWIvbG9nZ2VyLnNlcnZpY2UudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL2xvZ2dlci5jb21wb25lbnQudHMiLCJuZzovL0B0Yi9sb2dnZXIvbGliL2xvZ2dlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE9wZXJhdGlvblJlc3VsdCB7XHJcbiAgUmVzdWx0OiBib29sZWFuO1xyXG4gIE1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgQ29kZT86IG51bWJlcjtcclxuICBDb250ZW50PzogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIExvZ2dlck9wZXJhdGlvblJlc3VsdCB7XHJcbiAgICBSZXN1bHQ6IGJvb2xlYW47XHJcbiAgICBNZXNzYWdlPzogc3RyaW5nO1xyXG4gICAgQ29kZT86IG51bWJlcjtcclxuICAgIENvbnRlbnQ/OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTG9nZ2VyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RiLWxvZ2dlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBsb2dnZXIgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIExvZ2dlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9nZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9sb2dnZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtMb2dnZXJDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTG9nZ2VyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBMb2dnZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkNvbXBvbmVudCIsIk5nTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsUUFBQTtRQU1FO1NBQWdCOzhCQU5sQjtRQU9DOzs7Ozs7QUNQRCxRQUFBO1FBTUk7U0FBZ0I7b0NBTnBCO1FBT0M7Ozs7OztBQ1BEO1FBT0U7U0FBaUI7O29CQUxsQkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7NEJBSkQ7Ozs7Ozs7QUNBQTtRQWFFO1NBQWlCOzs7O1FBRWpCLGtDQUFROzs7WUFBUjthQUNDOztvQkFkRkMsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxXQUFXO3dCQUNyQixRQUFRLEVBQUUsOENBSVQ7d0JBQ0QsTUFBTSxFQUFFLEVBQUU7cUJBQ1g7Ozs7OEJBVkQ7Ozs7Ozs7QUNBQTs7OztvQkFHQ0MsV0FBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRSxFQUNSO3dCQUNELFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQzt3QkFDL0IsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO3FCQUMzQjs7MkJBUkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==