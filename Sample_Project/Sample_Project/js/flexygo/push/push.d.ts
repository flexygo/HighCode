/**
* Library to manage signalR messages.
*
* @class flexygo.push
*/
declare namespace flexygo.events {
    class Push {
        connection: any;
        constructor(cnn: any);
        timerStillAlive(): void;
        currentState(): any;
        reconnect(): void;
        genericEvent(ev: any): void;
    }
    var signalRCnn: any;
}
