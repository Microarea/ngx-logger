import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { StompRService, StompState } from '@stomp/ng2-stompjs';
import { LoggerOperationResult, TBServerInfo } from '../models/logger-operation-result.model';
import { EntriesParams } from '../models/entries.model';
import { MonitorParams } from '../models/monitor.model';
export declare const logger: () => TbLoggerService;
export interface LogEntry {
    Message: string;
    Registeredappid: string;
    AccountName?: string;
    Subscription?: string;
    App?: string;
    Category?: string;
    Level: LogLevel;
}
export declare enum LogLevel {
    Trace = 0,
    Debug = 1,
    Warn = 2,
    Error = 3
}
export declare function prepareLog(message: string, logLevel?: LogLevel): LogEntry;
export declare class TbLoggerService {
    private env;
    private http;
    stompService: StompRService;
    loggerUrl: string;
    serverMonitorUrl: string;
    private howMany;
    mqConnectionState: StompState;
    mqConnectionStateObservable: BehaviorSubject<StompState>;
    constructor(env: any, http: HttpClient, stompService: StompRService);
    mqInit(): void;
    /**
     * Ritorna la App Id dell'applicazione frontend che sta loggando,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     */
    getAppId(): any;
    /**
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     */
    getLoggerUrl(): any;
    /**
     * Ritorna la api per inserire log con appId configurato in environment.json
     */
    getLoggerPostUrl(): string;
    /**
     * M4 Backend URL
     */
    getServerMonitorUrl(): any;
    private _shouldLog;
    private _serverLog;
    /**
     * @param message
     * @param optionalParams
     */
    log(message?: any): void;
    /**
     * @param message
     * @param optionalParams
     */
    debug(message?: any): void;
    /**
     * @param message
     * @param optionalParams
     */
    warn(message?: any): void;
    /**
     * @param message
     * @param optionalParams
     */
    error(message?: any): void;
    /**
     * Log per statistiche client (es: usato da login page per tracciare risoluzione schermo)
     *
     * @param message
     * @param optionalParams
     */
    stat(message?: any): void;
    /**
     * Return logs: LoggerOperationResult
     *
     * @param params: EntriesParams
     */
    getLogs(params: EntriesParams): Observable<boolean | LoggerOperationResult>;
    getApps(appId: string): Observable<boolean | LoggerOperationResult>;
    getAppTypes(appId: string): Observable<boolean | LoggerOperationResult>;
    getInstanceKey(): Observable<boolean | LoggerOperationResult>;
    /**
     * Legge tutte le subscription
     */
    getSubscriptionKey(): Observable<boolean | LoggerOperationResult>;
    getCategories(appId: string): Observable<boolean | LoggerOperationResult>;
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    handleError<T>(operation?: string, result?: T): (error: any) => Observable<T>;
    /**
     * Connessione a RabbitMQ
     */
    mqConnect(queueName: string): Observable<any>;
    mqConnected(): boolean;
    mqDisconnect(): void;
    getTBInfosLogs(params: MonitorParams): Observable<boolean | TBServerInfo[]>;
}
