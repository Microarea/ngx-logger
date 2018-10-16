/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoggerOperationResult } from '../models/logger-operation-result.model';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class TbLoggerService {
    /**
     * @param {?} env
     * @param {?} http
     */
    constructor(env, http) {
        this.env = env;
        this.http = http;
        this.howMany = 100;
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
     * Console.log in attesa di post to logger
     *
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    log(message, ...optionalParams) {
        console.log(message, ...optionalParams);
    }
    /**
     * Console.log in attesa di post to logger
     *
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    debug(message, ...optionalParams) {
        console.log(message, ...optionalParams);
    }
    /**
     * Console.warn in attesa di post to logger
     *
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    warn(message, ...optionalParams) {
        console.warn(message, ...optionalParams);
    }
    /**
     * Console.error in attesa di post to logger
     *
     * @param {?=} message
     * @param {...?} optionalParams
     * @return {?}
     */
    error(message, ...optionalParams) {
        console.error(message, ...optionalParams);
    }
    /**
     * Return logs: LoggerOperationResult
     *
     * @param {?} params
     * @return {?}
     */
    getLogs(params) {
        if (!params.appId) {
            /** @type {?} */
            const error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No appId, no party';
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `entries/${params.appId}`;
        /** @type {?} */
        let p = new HttpParams();
        p = p.append('howMany', '' + this.howMany);
        if (params.apps)
            p = p.append('apps', params.apps);
        if (params.appTypes)
            p = p.append('appTypes', params.appTypes);
        /** @type {?} */
        const httpOptions = {
            params: p
        };
        return this.http.get(url, httpOptions).pipe(tap(op => console.log('TbLoggerService.getLogs', op)), catchError(this.handleError('TbLoggerService.getLogs', false)));
    }
    /**
     * @param {?} appId
     * @return {?}
     */
    getApps(appId) {
        if (!appId) {
            /** @type {?} */
            const error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No appId, no party';
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `apps/${appId}`;
        return this.http.get(url).pipe(tap(op => console.log('TbLoggerService.getApps with appId: ', appId, op)), catchError(this.handleError('TbLoggerService.getApps', false)));
    }
    /**
     * @param {?} appId
     * @return {?}
     */
    getAppTypes(appId) {
        if (!appId) {
            /** @type {?} */
            const error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No appId, no party';
            return of(error);
        }
        /** @type {?} */
        const url = this.getLoggerUrl() + `appTypes/${appId}`;
        return this.http.get(url).pipe(tap(op => console.log('TbLoggerService.getAppTypes with appId: ', appId, op)), catchError(this.handleError('TbLoggerService.getAppTypes', false)));
    }
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @template T
     * @param {?=} operation - name of the operation that failed
     * @param {?=} result - optional value to return as the observable result
     * @return {?}
     */
    handleError(operation = 'operation', result) {
        return (error) => {
            console.error(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(/** @type {?} */ (result));
        };
    }
}
TbLoggerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
TbLoggerService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['env',] }] },
    { type: HttpClient }
];
/** @nocollapse */ TbLoggerService.ngInjectableDef = i0.defineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(i0.inject("env"), i0.inject(i1.HttpClient)); }, token: TbLoggerService, providedIn: "root" });
if (false) {
    /** @type {?} */
    TbLoggerService.prototype.loggerUrl;
    /** @type {?} */
    TbLoggerService.prototype.howMany;
    /** @type {?} */
    TbLoggerService.prototype.env;
    /** @type {?} */
    TbLoggerService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBS3RDLE1BQU07Ozs7O0lBSUYsWUFBbUMsR0FBRyxFQUFVLElBQWdCO1FBQTdCLFFBQUcsR0FBSCxHQUFHLENBQUE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO3VCQUY5QyxHQUFHO0tBRStDOzs7Ozs7SUFNcEUsWUFBWTtRQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDaEU7Ozs7Ozs7O0lBUUQsR0FBRyxDQUFDLE9BQWEsRUFBRSxHQUFHLGNBQXFCO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUM7S0FDM0M7Ozs7Ozs7O0lBUUQsS0FBSyxDQUFDLE9BQWEsRUFBRSxHQUFHLGNBQXFCO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsY0FBYyxDQUFDLENBQUM7S0FDM0M7Ozs7Ozs7O0lBUUQsSUFBSSxDQUFDLE9BQWEsRUFBRSxHQUFHLGNBQXFCO1FBQ3hD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QztZQUNyQixLQUFLLENBQUMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO1lBQzdDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7O1FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLFlBQVksS0FBSyxFQUFFLENBQUM7UUFFdEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUF3QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ2pELEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQzdFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLDZCQUE2QixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQ3JFLENBQUM7Ozs7Ozs7Ozs7SUFTQyxXQUFXLENBQUksU0FBUyxHQUFHLFdBQVcsRUFBRSxNQUFVO1FBQ3JELE1BQU0sQ0FBQyxDQUFDLEtBQVUsRUFBaUIsRUFBRTtZQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxZQUFZLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDOztZQUd2RCxNQUFNLENBQUMsRUFBRSxtQkFBQyxNQUFXLEVBQUMsQ0FBQztTQUMxQixDQUFDOzs7O1lBbklULFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7Ozs0Q0FLZ0IsTUFBTSxTQUFDLEtBQUs7WUFkcEIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5cclxuaW1wb3J0IHsgRW50cmllc1BhcmFtcyB9IGZyb20gJy4uL21vZGVscy9lbnRyaWVzLm1vZGVsJztcclxuaW1wb3J0IHsgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0IH0gZnJvbSAnLi4vbW9kZWxzL2xvZ2dlci1vcGVyYXRpb24tcmVzdWx0Lm1vZGVsJztcclxuaW1wb3J0IHsgY2F0Y2hFcnJvciwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYkxvZ2dlclNlcnZpY2Uge1xyXG4gICAgcHVibGljIGxvZ2dlclVybDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBob3dNYW55ID0gMTAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoJ2VudicpIHByaXZhdGUgZW52LCBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSaXRvcm5hIGxhIGJhc2UgdXJsIGRlbCBsb2dnZXIsXHJcbiAgICAgKiBjYXJpY2F0YSBkYSB1biBmaWxlIGRpIGNvbmZpZ3VyYXppb25lIGNhcmljYXRvIGRpbmFtaWNhbWVudGUgKGFzc2V0cy9lbnZpcm9ubWVudC5qc29uKVxyXG4gICAgICovXHJcbiAgICBnZXRMb2dnZXJVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nZ2VyVXJsID8gdGhpcy5sb2dnZXJVcmwgOiB0aGlzLmVudi5sb2dnZXIudXJsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS5sb2cgaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBsb2cobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc29sZS5sb2cgaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBkZWJ1ZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLndhcm4gaW4gYXR0ZXNhIGRpIHBvc3QgdG8gbG9nZ2VyXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBvcHRpb25hbFBhcmFtc1xyXG4gICAgICovXHJcbiAgICB3YXJuKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zb2xlLmVycm9yIGluIGF0dGVzYSBkaSBwb3N0IHRvIGxvZ2dlclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXNcclxuICAgICAqL1xyXG4gICAgZXJyb3IobWVzc2FnZT86IGFueSwgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gbG9nczogTG9nZ2VyT3BlcmF0aW9uUmVzdWx0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHBhcmFtczogRW50cmllc1BhcmFtc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0TG9ncyhwYXJhbXM6IEVudHJpZXNQYXJhbXMpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIXBhcmFtcy5hcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IuUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLk1lc3NhZ2UgPSAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBlbnRyaWVzLyR7cGFyYW1zLmFwcElkfWA7XHJcblxyXG4gICAgICAgIGxldCBwID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgICBwID0gcC5hcHBlbmQoJ2hvd01hbnknLCAnJyArIHRoaXMuaG93TWFueSk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcHBzKSBwID0gcC5hcHBlbmQoJ2FwcHMnLCBwYXJhbXMuYXBwcyk7XHJcbiAgICAgICAgaWYgKHBhcmFtcy5hcHBUeXBlcykgcCA9IHAuYXBwZW5kKCdhcHBUeXBlcycsIHBhcmFtcy5hcHBUeXBlcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGh0dHBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBwYXJhbXM6IHBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCwgaHR0cE9wdGlvbnMpLnBpcGUoXHJcbiAgICAgICAgICAgIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldExvZ3MnLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRMb2dzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFwcHMoYXBwSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLlJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5NZXNzYWdlID0gJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwcy8ke2FwcElkfWA7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsKS5waXBlKFxyXG4gICAgICAgICAgICB0YXAob3AgPT4gY29uc29sZS5sb2coJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEFwcFR5cGVzKGFwcElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBMb2dnZXJPcGVyYXRpb25SZXN1bHQ+IHtcclxuICAgICAgICBpZiAoIWFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5SZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IuTWVzc2FnZSA9ICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGFwcFR5cGVzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzIHdpdGggYXBwSWQ6ICcsIGFwcElkLCBvcCkpLFxyXG4gICAgICAgICAgICBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IoJ1RiTG9nZ2VyU2VydmljZS5nZXRBcHBUeXBlcycsIGZhbHNlKSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlIEh0dHAgb3BlcmF0aW9uIHRoYXQgZmFpbGVkLlxyXG4gICAgICogTGV0IHRoZSBhcHAgY29udGludWUuXHJcbiAgICAgKiBAcGFyYW0gb3BlcmF0aW9uIC0gbmFtZSBvZiB0aGUgb3BlcmF0aW9uIHRoYXQgZmFpbGVkXHJcbiAgICAgKiBAcGFyYW0gcmVzdWx0IC0gb3B0aW9uYWwgdmFsdWUgdG8gcmV0dXJuIGFzIHRoZSBvYnNlcnZhYmxlIHJlc3VsdFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFuZGxlRXJyb3I8VD4ob3BlcmF0aW9uID0gJ29wZXJhdGlvbicsIHJlc3VsdD86IFQpIHtcclxuICAgICAgICByZXR1cm4gKGVycm9yOiBhbnkpOiBPYnNlcnZhYmxlPFQ+ID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgJHtvcGVyYXRpb259IGZhaWxlZDogJHtlcnJvci5tZXNzYWdlfWApO1xyXG5cclxuICAgICAgICAgICAgLy8gTGV0IHRoZSBhcHAga2VlcCBydW5uaW5nIGJ5IHJldHVybmluZyBhbiBlbXB0eSByZXN1bHQuXHJcbiAgICAgICAgICAgIHJldHVybiBvZihyZXN1bHQgYXMgVCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iXX0=