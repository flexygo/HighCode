declare namespace flexygo.nfc {
    function init(): Promise<unknown>;
    function isEnabled(): Promise<any>;
    function read(): Promise<unknown>;
    function stopRead(): Promise<any>;
    function bytesToString(text: number[]): string;
    function showSettings(): Promise<any>;
    function paintSetNFCModal(): Promise<void>;
}
