/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import * as i0 from "@angular/core";
export class TbLoggerService {
    /**
     * @param {?} env
     */
    constructor(env) {
        this.env = env;
    }
    /**
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     * @return {?}
     */
    getLoggerUrl() {
        return this.loggerUrl ? this.loggerUrl : this.env.logger.url;
    }
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    log(message, ...optionalParams) {
        console.log(message, ...optionalParams);
    }
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    debug(message, ...optionalParams) {
        console.log(message, ...optionalParams);
    }
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    warn(message, ...optionalParams) {
        console.warn(message, ...optionalParams);
    }
    /**
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    error(message, ...optionalParams) {
        console.error(message, ...optionalParams);
    }
}
TbLoggerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
TbLoggerService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['env',] }] }
];
/** @nocollapse */ TbLoggerService.ngInjectableDef = i0.defineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(i0.inject("env")); }, token: TbLoggerService, providedIn: "root" });
if (false) {
    /** @type {?} */
    TbLoggerService.prototype.loggerUrl;
    /** @type {?} */
    TbLoggerService.prototype.env;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLbkQsTUFBTTs7OztJQUdGLFlBQW1DLEdBQUc7UUFBSCxRQUFHLEdBQUgsR0FBRyxDQUFBO0tBQUk7Ozs7OztJQU0xQyxZQUFZO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNoRTs7Ozs7O0lBRUQsR0FBRyxDQUFDLE9BQWEsRUFBRSxHQUFHLGNBQXFCO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUM7S0FDM0M7Ozs7OztJQUVELEtBQUssQ0FBQyxPQUFhLEVBQUUsR0FBRyxjQUFxQjtRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLGNBQWMsQ0FBQyxDQUFDO0tBQzNDOzs7Ozs7SUFFRCxJQUFJLENBQUMsT0FBYSxFQUFFLEdBQUcsY0FBcUI7UUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQztLQUM1Qzs7Ozs7O0lBRUQsS0FBSyxDQUFDLE9BQWEsRUFBRSxHQUFHLGNBQXFCO1FBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUM7S0FDN0M7OztZQTlCSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7Ozs7NENBSWdCLE1BQU0sU0FBQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVGJMb2dnZXJTZXJ2aWNlIHtcbiAgICBwdWJsaWMgbG9nZ2VyVXJsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KCdlbnYnKSBwcml2YXRlIGVudikge31cblxuICAgIC8qKlxuICAgICAqIFJpdG9ybmEgbGEgYmFzZSB1cmwgZGVsIGxvZ2dlcixcbiAgICAgKiBjYXJpY2F0YSBkYSB1biBmaWxlIGRpIGNvbmZpZ3VyYXppb25lIGNhcmljYXRvIGRpbmFtaWNhbWVudGUgKGFzc2V0cy9lbnZpcm9ubWVudC5qc29uKVxuICAgICAqL1xuICAgIGdldExvZ2dlclVybCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nZ2VyVXJsID8gdGhpcy5sb2dnZXJVcmwgOiB0aGlzLmVudi5sb2dnZXIudXJsO1xuICAgIH1cblxuICAgIGxvZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xuICAgIH1cblxuICAgIGRlYnVnKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XG4gICAgfVxuXG4gICAgd2FybihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcbiAgICB9XG5cbiAgICBlcnJvcihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XG4gICAgfVxufVxuIl19