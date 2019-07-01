import { HttpClient } from '@angular/common/http';
import { EntriesParams } from '../models/entries.model';
import { LoggerOperationResult, TBServerInfo } from '../models/logger-operation-result.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { StompRService, StompState } from '@stomp/ng2-stompjs';
import { MonitorParams } from '../models/monitor.model';
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
     * Ritorna la base url del logger,
     * caricata da un file di configurazione caricato dinamicamente (assets/environment.json)
     */
    getLoggerUrl(): any;
    /**
     * M4 Backend URL
     */
    getServerMonitorUrl(): any;
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
