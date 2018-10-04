/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import * as i0 from "@angular/core";
var TbLoggerService = /** @class */ (function () {
    function TbLoggerService(env) {
        this.env = env;
    }
    /**
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     */
    /**
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     * @return {?}
     */
    TbLoggerService.prototype.getLoggerUrl = /**
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     * @return {?}
     */
    function () {
        return this.loggerUrl ? this.loggerUrl : this.env.logger.url;
    };
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    TbLoggerService.prototype.log = /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.log.apply(console, tslib_1.__spread([message], optionalParams));
    };
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    TbLoggerService.prototype.debug = /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.log.apply(console, tslib_1.__spread([message], optionalParams));
    };
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    TbLoggerService.prototype.warn = /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.warn.apply(console, tslib_1.__spread([message], optionalParams));
    };
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    TbLoggerService.prototype.error = /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        console.error.apply(console, tslib_1.__spread([message], optionalParams));
    };
    TbLoggerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    TbLoggerService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['env',] }] }
    ]; };
    /** @nocollapse */ TbLoggerService.ngInjectableDef = i0.defineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(i0.inject("env")); }, token: TbLoggerService, providedIn: "root" });
    return TbLoggerService;
}());
export { TbLoggerService };
if (false) {
    /** @type {?} */
    TbLoggerService.prototype.loggerUrl;
    /** @type {?} */
    TbLoggerService.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7OztJQVEvQyx5QkFBbUMsR0FBRztRQUFILFFBQUcsR0FBSCxHQUFHLENBQUE7S0FBSTtJQUUxQzs7O09BR0c7Ozs7OztJQUNILHNDQUFZOzs7OztJQUFaO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNoRTs7Ozs7O0lBRUQsNkJBQUc7Ozs7O0lBQUgsVUFBSSxPQUFhO1FBQUUsd0JBQXdCO2FBQXhCLFVBQXdCLEVBQXhCLHFCQUF3QixFQUF4QixJQUF3QjtZQUF4Qix1Q0FBd0I7O1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLE9BQVgsT0FBTyxvQkFBSyxPQUFPLEdBQUssY0FBYyxHQUFFO0tBQzNDOzs7Ozs7SUFFRCwrQkFBSzs7Ozs7SUFBTCxVQUFNLE9BQWE7UUFBRSx3QkFBd0I7YUFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO1lBQXhCLHVDQUF3Qjs7UUFDekMsT0FBTyxDQUFDLEdBQUcsT0FBWCxPQUFPLG9CQUFLLE9BQU8sR0FBSyxjQUFjLEdBQUU7S0FDM0M7Ozs7OztJQUVELDhCQUFJOzs7OztJQUFKLFVBQUssT0FBYTtRQUFFLHdCQUF3QjthQUF4QixVQUF3QixFQUF4QixxQkFBd0IsRUFBeEIsSUFBd0I7WUFBeEIsdUNBQXdCOztRQUN4QyxPQUFPLENBQUMsSUFBSSxPQUFaLE9BQU8sb0JBQU0sT0FBTyxHQUFLLGNBQWMsR0FBRTtLQUM1Qzs7Ozs7O0lBRUQsK0JBQUs7Ozs7O0lBQUwsVUFBTSxPQUFhO1FBQUUsd0JBQXdCO2FBQXhCLFVBQXdCLEVBQXhCLHFCQUF3QixFQUF4QixJQUF3QjtZQUF4Qix1Q0FBd0I7O1FBQ3pDLE9BQU8sQ0FBQyxLQUFLLE9BQWIsT0FBTyxvQkFBTyxPQUFPLEdBQUssY0FBYyxHQUFFO0tBQzdDOztnQkE5QkosVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OztnREFJZ0IsTUFBTSxTQUFDLEtBQUs7OzswQkFSN0I7O1NBS2EsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyU2VydmljZSB7XG4gICAgcHVibGljIGxvZ2dlclVybDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgnZW52JykgcHJpdmF0ZSBlbnYpIHt9XG5cbiAgICAvKipcbiAgICAgKiBSaXRvcm5hIGxhIGJhc2UgdXJsIGRlbCBsb2dnZXIsXG4gICAgICogY2FyaWNhdGEgZGEgdW4gZmlsZSBkaSBjb25maWd1cmF6aW9uZSBjYXJpY2F0byBkaW5hbWljYW1lbnRlIChhc3NldHMvZW52aXJvbm1lbnQuanNvbilcbiAgICAgKi9cbiAgICBnZXRMb2dnZXJVcmwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2dlclVybCA/IHRoaXMubG9nZ2VyVXJsIDogdGhpcy5lbnYubG9nZ2VyLnVybDtcbiAgICB9XG5cbiAgICBsb2cobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcbiAgICB9XG5cbiAgICBkZWJ1ZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xuICAgIH1cblxuICAgIHdhcm4obWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XG4gICAgfVxuXG4gICAgZXJyb3IobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xuICAgIH1cbn1cbiJdfQ==