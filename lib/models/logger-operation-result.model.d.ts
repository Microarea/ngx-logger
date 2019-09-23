export declare class LoggerOperationResult {
    Result: boolean;
    Message?: string;
    Code?: number;
    Content?: any;
    constructor(Result: boolean, Message: string);
}
export interface TBServerInfos {
    tread: TBServerInfo[];
}
export interface TBServerInfo {
    DateTime: string;
    ProcessName: string;
    LoginNumber?: number;
    DocumentNumber?: number;
    DocMetrics?: any[];
    LernelMS?: number;
    LoginInfos?: any[];
    PhisicalMemory?: number;
    UserMS?: number;
    VirtualMemory?: number;
    threads?: any[];
}
