/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoggerOperationResult } from '../models/logger-operation-result.model';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var TbLoggerService = /** @class */ (function () {
    function TbLoggerService(env, http) {
        this.env = env;
        this.http = http;
        this.howMany = 100;
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
    /**
     * @param {?} params
     * @return {?}
     */
    TbLoggerService.prototype.getLogs = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (!params.appId) {
            /** @type {?} */
            var error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No appId, no party';
            return of(error);
        }
        /** @type {?} */
        var url = this.getLoggerUrl() + ("entries/" + params.appId);
        /** @type {?} */
        var p = new HttpParams();
        p = p.append('howMany', '' + this.howMany);
        if (params.apps)
            p = p.append('apps', params.apps);
        if (params.appTypes)
            p = p.append('appTypes', params.appTypes);
        /** @type {?} */
        var httpOptions = {
            params: p
        };
        return this.http.get(url, httpOptions).pipe(tap(function (op) { return console.log('TbLoggerService.getLogs', op); }), catchError(this.handleError('TbLoggerService.getLogs', false)));
    };
    /**
     * @param {?} appId
     * @return {?}
     */
    TbLoggerService.prototype.getApps = /**
     * @param {?} appId
     * @return {?}
     */
    function (appId) {
        if (!appId) {
            /** @type {?} */
            var error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No appId, no party';
            return of(error);
        }
        /** @type {?} */
        var url = this.getLoggerUrl() + ("apps/" + appId);
        return this.http.get(url).pipe(tap(function (op) { return console.log('TbLoggerService.getApps with appId: ', appId, op); }), catchError(this.handleError('TbLoggerService.getApps', false)));
    };
    /**
     * @param {?} appId
     * @return {?}
     */
    TbLoggerService.prototype.getAppTypes = /**
     * @param {?} appId
     * @return {?}
     */
    function (appId) {
        if (!appId) {
            /** @type {?} */
            var error = new LoggerOperationResult();
            error.Result = false;
            error.Message = 'Error - No appId, no party';
            return of(error);
        }
        /** @type {?} */
        var url = this.getLoggerUrl() + ("appTypes/" + appId);
        return this.http.get(url).pipe(tap(function (op) { return console.log('TbLoggerService.getAppTypes with appId: ', appId, op); }), catchError(this.handleError('TbLoggerService.getAppTypes', false)));
    };
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @template T
     * @param {?=} operation - name of the operation that failed
     * @param {?=} result - optional value to return as the observable result
     * @return {?}
     */
    TbLoggerService.prototype.handleError = /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @template T
     * @param {?=} operation - name of the operation that failed
     * @param {?=} result - optional value to return as the observable result
     * @return {?}
     */
    function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.error(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return of(/** @type {?} */ (result));
        };
    };
    TbLoggerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    TbLoggerService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: ['env',] }] },
        { type: HttpClient }
    ]; };
    /** @nocollapse */ TbLoggerService.ngInjectableDef = i0.defineInjectable({ factory: function TbLoggerService_Factory() { return new TbLoggerService(i0.inject("env"), i0.inject(i1.HttpClient)); }, token: TbLoggerService, providedIn: "root" });
    return TbLoggerService;
}());
export { TbLoggerService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdGIvbG9nZ2VyLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RiLWxvZ2dlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUc5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7SUFTbEMseUJBQW1DLEdBQUcsRUFBVSxJQUFnQjtRQUE3QixRQUFHLEdBQUgsR0FBRyxDQUFBO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTt1QkFGOUMsR0FBRztLQUUrQztJQUVwRTs7O09BR0c7Ozs7OztJQUNILHNDQUFZOzs7OztJQUFaO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNoRTs7Ozs7O0lBRUQsNkJBQUc7Ozs7O0lBQUgsVUFBSSxPQUFhO1FBQUUsd0JBQXdCO2FBQXhCLFVBQXdCLEVBQXhCLHFCQUF3QixFQUF4QixJQUF3QjtZQUF4Qix1Q0FBd0I7O1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLE9BQVgsT0FBTyxvQkFBSyxPQUFPLEdBQUssY0FBYyxHQUFFO0tBQzNDOzs7Ozs7SUFFRCwrQkFBSzs7Ozs7SUFBTCxVQUFNLE9BQWE7UUFBRSx3QkFBd0I7YUFBeEIsVUFBd0IsRUFBeEIscUJBQXdCLEVBQXhCLElBQXdCO1lB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b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7O2dEQUtnQixNQUFNLFNBQUMsS0FBSztnQkFkcEIsVUFBVTs7OzBCQURuQjs7U0FXYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBFbnRyaWVzUGFyYW1zIH0gZnJvbSAnLi4vbW9kZWxzL2VudHJpZXMubW9kZWwnO1xyXG5pbXBvcnQgeyBMb2dnZXJPcGVyYXRpb25SZXN1bHQgfSBmcm9tICcuLi9tb2RlbHMvbG9nZ2VyLW9wZXJhdGlvbi1yZXN1bHQubW9kZWwnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyU2VydmljZSB7XHJcbiAgICBwdWJsaWMgbG9nZ2VyVXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGhvd01hbnkgPSAxMDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoQEluamVjdCgnZW52JykgcHJpdmF0ZSBlbnYsIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJpdG9ybmEgbGEgYmFzZSB1cmwgZGVsIGxvZ2dlcixcclxuICAgICAqIGNhcmljYXRhIGRhIHVuIGZpbGUgZGkgY29uZmlndXJhemlvbmUgY2FyaWNhdG8gZGluYW1pY2FtZW50ZSAoYXNzZXRzL2Vudmlyb25tZW50Lmpzb24pXHJcbiAgICAgKi9cclxuICAgIGdldExvZ2dlclVybCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2dnZXJVcmwgPyB0aGlzLmxvZ2dlclVybCA6IHRoaXMuZW52LmxvZ2dlci51cmw7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UsIC4uLm9wdGlvbmFsUGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWJ1ZyhtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCAuLi5vcHRpb25hbFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgd2FybihtZXNzYWdlPzogYW55LCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGVycm9yKG1lc3NhZ2U/OiBhbnksIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgLi4ub3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRMb2dzKHBhcmFtczogRW50cmllc1BhcmFtcyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghcGFyYW1zLmFwcElkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IExvZ2dlck9wZXJhdGlvblJlc3VsdCgpO1xyXG4gICAgICAgICAgICBlcnJvci5SZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZXJyb3IuTWVzc2FnZSA9ICdFcnJvciAtIE5vIGFwcElkLCBubyBwYXJ0eSc7XHJcbiAgICAgICAgICAgIHJldHVybiBvZihlcnJvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldExvZ2dlclVybCgpICsgYGVudHJpZXMvJHtwYXJhbXMuYXBwSWR9YDtcclxuXHJcbiAgICAgICAgbGV0IHAgPSBuZXcgSHR0cFBhcmFtcygpO1xyXG4gICAgICAgIHAgPSBwLmFwcGVuZCgnaG93TWFueScsICcnICsgdGhpcy5ob3dNYW55KTtcclxuICAgICAgICBpZiAocGFyYW1zLmFwcHMpIHAgPSBwLmFwcGVuZCgnYXBwcycsIHBhcmFtcy5hcHBzKTtcclxuICAgICAgICBpZiAocGFyYW1zLmFwcFR5cGVzKSBwID0gcC5hcHBlbmQoJ2FwcFR5cGVzJywgcGFyYW1zLmFwcFR5cGVzKTtcclxuXHJcbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHBhcmFtczogcFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PExvZ2dlck9wZXJhdGlvblJlc3VsdD4odXJsLCBodHRwT3B0aW9ucykucGlwZShcclxuICAgICAgICAgICAgdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0TG9ncycsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldExvZ3MnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwcyhhcHBJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0PiB7XHJcbiAgICAgICAgaWYgKCFhcHBJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBMb2dnZXJPcGVyYXRpb25SZXN1bHQoKTtcclxuICAgICAgICAgICAgZXJyb3IuUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGVycm9yLk1lc3NhZ2UgPSAnRXJyb3IgLSBObyBhcHBJZCwgbm8gcGFydHknO1xyXG4gICAgICAgICAgICByZXR1cm4gb2YoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMb2dnZXJVcmwoKSArIGBhcHBzLyR7YXBwSWR9YDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8TG9nZ2VyT3BlcmF0aW9uUmVzdWx0Pih1cmwpLnBpcGUoXHJcbiAgICAgICAgICAgIHRhcChvcCA9PiBjb25zb2xlLmxvZygnVGJMb2dnZXJTZXJ2aWNlLmdldEFwcHMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEFwcHMnLCBmYWxzZSkpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0QXBwVHlwZXMoYXBwSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IExvZ2dlck9wZXJhdGlvblJlc3VsdD4ge1xyXG4gICAgICAgIGlmICghYXBwSWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgTG9nZ2VyT3BlcmF0aW9uUmVzdWx0KCk7XHJcbiAgICAgICAgICAgIGVycm9yLlJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBlcnJvci5NZXNzYWdlID0gJ0Vycm9yIC0gTm8gYXBwSWQsIG5vIHBhcnR5JztcclxuICAgICAgICAgICAgcmV0dXJuIG9mKGVycm9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0TG9nZ2VyVXJsKCkgKyBgYXBwVHlwZXMvJHthcHBJZH1gO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxMb2dnZXJPcGVyYXRpb25SZXN1bHQ+KHVybCkucGlwZShcclxuICAgICAgICAgICAgdGFwKG9wID0+IGNvbnNvbGUubG9nKCdUYkxvZ2dlclNlcnZpY2UuZ2V0QXBwVHlwZXMgd2l0aCBhcHBJZDogJywgYXBwSWQsIG9wKSksXHJcbiAgICAgICAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcignVGJMb2dnZXJTZXJ2aWNlLmdldEFwcFR5cGVzJywgZmFsc2UpKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGUgSHR0cCBvcGVyYXRpb24gdGhhdCBmYWlsZWQuXHJcbiAgICAgKiBMZXQgdGhlIGFwcCBjb250aW51ZS5cclxuICAgICAqIEBwYXJhbSBvcGVyYXRpb24gLSBuYW1lIG9mIHRoZSBvcGVyYXRpb24gdGhhdCBmYWlsZWRcclxuICAgICAqIEBwYXJhbSByZXN1bHQgLSBvcHRpb25hbCB2YWx1ZSB0byByZXR1cm4gYXMgdGhlIG9ic2VydmFibGUgcmVzdWx0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYW5kbGVFcnJvcjxUPihvcGVyYXRpb24gPSAnb3BlcmF0aW9uJywgcmVzdWx0PzogVCkge1xyXG4gICAgICAgIHJldHVybiAoZXJyb3I6IGFueSk6IE9ic2VydmFibGU8VD4gPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke29wZXJhdGlvbn0gZmFpbGVkOiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcblxyXG4gICAgICAgICAgICAvLyBMZXQgdGhlIGFwcCBrZWVwIHJ1bm5pbmcgYnkgcmV0dXJuaW5nIGFuIGVtcHR5IHJlc3VsdC5cclxuICAgICAgICAgICAgcmV0dXJuIG9mKHJlc3VsdCBhcyBUKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==