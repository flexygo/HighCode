interface Navigator {
    serial?: Serial;
}
type Serial = {
    getPorts?: Function;
    requestPort?: Function;
};
type SerialPort = {
    readable?: any;
    writable?: any;
    open: Function;
    close: Function;
};
declare namespace flexygo.integrations.scales {
    function init(weightTextBox: any, cnf?: any): void;
    function getWeight(cnf?: any): Promise<any>;
    function connect(cnf?: any): Promise<SerialPort>;
    function read(cnf: any, port: SerialPort): Promise<any>;
    function write(port: SerialPort, value: any): Promise<void>;
}
