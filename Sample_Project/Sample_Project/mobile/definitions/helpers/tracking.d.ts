declare namespace flexygo.tracking {
    function restart(): void;
    function initiate(): Promise<void>;
    function syncLocations(): Promise<void>;
    function checkLogs(): Promise<void>;
    function checkState(): Promise<void>;
    function clean(): Promise<void>;
    function getLocations(): Promise<Object[]>;
}
