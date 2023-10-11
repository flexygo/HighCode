/**
* Library to manage signalR messages.
*
* @class flexygo.push
*/
var flexygo;
(function (flexygo) {
    var events;
    (function (events) {
        class Push {
            constructor(cnn) {
                try {
                    this.connection = cnn;
                    //Use to debug longPolling connections.
                    //connectionOpt = { transport: 'longPolling' };
                    this.connection.hub.start({}).done(() => {
                        this.connection.genericHub.server.connect();
                    });
                    // setTimeout(() => { debugger; this.timerStillAlive(); }, 10000);                   
                    this.connection.hub.stateChanged((state) => {
                        const stateConversion = { 0: "Connecting", 1: "Online", 2: "Reconnecting", 4: "Offline" };
                        console.log(`${moment().format('HH:mm:ss')}: SignalR state changed from ${state.oldState} ${stateConversion[state.oldState]} to ${state.newState} ${stateConversion[state.newState]}`);
                        /*if (state.newState == 4) {
                            this.reconnect();
                        }*/
                    });
                    this.connection.genericHub.client.genericEvent = this.genericEvent;
                }
                catch (e) {
                    flexygo.msg.error('SignalR connection error' + e.message);
                }
            }
            timerStillAlive() {
                if (this.connection.hub.state != 4) {
                    $.signalR.transports._logic.markActive($.connection);
                    console.log(`${moment().format('HH: mm: ss')}: LastActiveDate: ${$.connection._.lastActiveAt}`);
                    setTimeout(() => { this.timerStillAlive(); }, 10000);
                }
            }
            currentState() {
                const stateConversion = { 0: "Connecting", 1: "Online", 2: "Reconnecting", 4: "Offline" };
                console.log(`${moment().format('HH:mm:ss')}: SignalR state ${this.connection.hub.state} ${stateConversion[this.connection.hub.state]}`);
                return this.connection.hub.state;
            }
            reconnect() {
                if (this.connection.hub.state == 4) {
                    $.signalR.transports._logic.reconnect($.connection);
                    //this.connection.hub.stop();
                    //this.connection.hub.start({}).done(() => {
                    //    this.connection.genericHub.server.connect();
                    //});
                    setTimeout(() => { console.log(`${moment().format('HH: mm: ss')}: Comprobando conexión`); this.reconnect(); }, 5000);
                }
                else {
                    this.timerStillAlive();
                }
            }
            genericEvent(ev) {
                var eventInfo = {
                    class: ev.EventClass.key,
                    type: ev.EventType.key,
                    sender: ev.sender,
                    masterIdentity: ev.masterIdentity,
                    detailIdentity: ev.detailIdentity,
                    firedBy: ev.firedBy
                };
                flexygo.events.trigger(eventInfo);
            }
        }
        events.Push = Push;
        if ($.connection) {
            events.signalRCnn = new Push($.connection);
        }
    })(events = flexygo.events || (flexygo.events = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=push.js.map