declare namespace storage {
    function set(key: string, value: any): Promise<void>;
    function get(key: string): Promise<any>;
    function remove(key: string): Promise<void>;
    function keys(): Promise<any>;
    function clear(): Promise<void>;
}
export default storage;
