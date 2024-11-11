declare namespace flexygo.whiteboard {
    function init(transparent?: boolean): Promise<string>;
    function drawStart(e: any): void;
    function drawEnd(_e: any): void;
    function draw(e: any): void;
    function clear(): void;
    function save(): string;
    function close(): void;
    function resize(): void;
}
