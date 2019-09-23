export interface TbLoggerEnvironment {
    logger: {
        url: string;
        appId: string;
        level: number;
    };
    stompConfig: {
        url: string;
        headers: {
            login: string;
            passcode: string;
        };
        heartbeat_in: number;
        heartbeat_out: number;
        reconnect_delay: number;
        debug: boolean;
    };
    serverMonitor: {
        url: string;
    };
}
