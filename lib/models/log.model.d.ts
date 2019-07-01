export declare class Log {
    _id: string;
    logEntry: {
        app: string;
        registeredAppId: string;
        registeredAppType: string;
        category: string;
        module: string;
        subModule: string;
        document: string;
        subscription: string;
        accountName: string;
        lifetime: string;
        operation: string;
        contextDescription: string;
        method: string;
        entryCreated: string;
        message: string;
        level: number;
    };
    constructor();
}
