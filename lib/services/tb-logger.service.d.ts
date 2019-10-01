import { NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { StompRService, StompState } from '@stomp/ng2-stompjs';
import { LoggerOperationResult, TBServerInfo } from '../models/logger-operation-result.model';
import { EntriesParams } from '../models/entries.model';
import { MonitorParams } from '../models/monitor.model';
import { TbLoggerEnvironment } from '../models/logger-environment';
export declare const logger: () => TbLoggerService;
export interface LogEntry {
    Message: string;
    Registeredappid: string;
    AccountName?: string | null;
    Subscription?: string | null;
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
    private ngZone;
    loggerUrl: string;
    serverMonitorUrl: string;
    private howMany;
    mqConnectionState: StompState;
    mqConnectionStateObservable: BehaviorSubject<number>;
    constructor(env: TbLoggerEnvironment, http: HttpClient, stompService: StompRService, ngZone: NgZone);
    mqInit(): void;
    /**
     * Ritorna la App Id dell'applicazione frontend che sta loggando,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     */
    getAppId(): string;
    /**
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     */
    getLoggerUrl(): string;
    /**
     * Ritorna la api per inserire log con appId configurato in environment.json
     */
    getLoggerPostUrl(): string;
    /**
     * M4 Backend URL
     */
    getServerMonitorUrl(): string;
    private _shouldLog;
    private _serverLog;
    private sendLog;
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
    getLogs(params: EntriesParams): Observable<LoggerOperationResult>;
    getApps(appId: string): Observable<LoggerOperationResult>;
    getAppTypes(appId: string): Observable<LoggerOperationResult>;
    getInstanceKey(): Observable<LoggerOperationResult>;
    /**
     * Legge tutte le subscription
     */
    getSubscriptionKey(): Observable<LoggerOperationResult>;
    getCategories(appId: string): Observable<LoggerOperationResult>;
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
    getTBInfosLogs(params: MonitorParams): Observable<TBServerInfo[]>;
}
