import { HttpClient } from '@angular/common/http';
import { EntriesParams } from '../models/entries.model';
import { LoggerOperationResult } from '../models/logger-operation-result.model';
import { Observable } from 'rxjs';
export declare class TbLoggerService {
    private env;
    private http;
    loggerUrl: string;
    private howMany;
    constructor(env: any, http: HttpClient);
    /**
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     */
    getLoggerUrl(): any;
    /**
     * Console.log in attesa di post to logger
     *
     * @param message
     * @param optionalParams
     */
    log(message?: any, ...optionalParams: any[]): void;
    /**
     * Console.log in attesa di post to logger
     *
     * @param message
     * @param optionalParams
     */
    debug(message?: any, ...optionalParams: any[]): void;
    /**
     * Console.warn in attesa di post to logger
     *
     * @param message
     * @param optionalParams
     */
    warn(message?: any, ...optionalParams: any[]): void;
    /**
     * Console.error in attesa di post to logger
     *
     * @param message
     * @param optionalParams
     */
    error(message?: any, ...optionalParams: any[]): void;
    /**
     * Return logs: LoggerOperationResult
     *
     * @param params: EntriesParams
     */
    getLogs(params: EntriesParams): Observable<boolean | LoggerOperationResult>;
    getApps(appId: string): Observable<boolean | LoggerOperationResult>;
    getAppTypes(appId: string): Observable<boolean | LoggerOperationResult>;
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError<T>(operation?: string, result?: T): (error: any) => Observable<T>;
}
