export declare class LoggerOperationResult {
    result: boolean;
    message?: string;
    code?: number;
    content?: any;
    constructor();
}
export declare class TBServerInfos {
    tread: TBServerInfo[];
    constructor();
}
export declare class TBServerInfo {
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
    constructor();
}
