/**
* Library to manage signalR messages.
*
* @class flexygo.push
*/
declare namespace flexygo.events {
    class Push {
        connection: any;
        constructor(cnn: any);
        genericEvent(ev: any): void;
    }
}
