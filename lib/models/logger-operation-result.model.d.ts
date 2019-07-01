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
    processName: string;
    loginNumber?: number;
    documentNumber?: number;
    docMetrics?: any[];
    kernelMS?: number;
    loginInfos?: any[];
    phisicalMemory?: number;
    userMS?: number;
    virtualMemory?: number;
    constructor();
}
