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
export declare class TBServerInfo {
    DateTime: Date;
    ProcessName: string;
    ProcessId: string;
    LoginNumber?: number;
    DocumentNumber?: number;
    DocMetrics?: any[];
    LernelMS?: number;
    LoginInfos?: any[];
    UserMS?: number;
    VirtualMemory: number;
    PhisicalMemory: number;
    threads?: any[];
}
