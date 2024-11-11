declare namespace flexygo.sync {
    function sendData(options?: SyncOptions, reloadPage?: boolean, jscode?: string): Promise<void>;
    function syncTemplates(): void;
    function syncData(reloadPage?: boolean, jscode?: string, options?: SyncOptions, comesFromSend?: boolean): Promise<unknown>;
    function overwriteData(reloadPage?: boolean, jscode?: string, options?: SyncOptions, comesFromSend?: boolean): Promise<unknown>;
    function popOverInfo(cnf: ConftokenService, syncData: boolean): Promise<void>;
    function createBackup(): Promise<void>;
    function restoreBackup(ev: any): Promise<void>;
    function showRestoreBackupModal(): void;
    function removeRestoreBackupModal(): void;
    function msgCreateBackup(): void;
    function checkSendErrors(): void;
    function setSyncId(id: string): void;
    function showAccountsModal(): Promise<void>;
    function logOff(): void;
}
