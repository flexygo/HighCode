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
                    var connectionOpt = {};
                    //Use to debug longPolling connections.
                    //connectionOpt = { transport: 'longPolling' };
                    this.connection.hub.start(connectionOpt).done(() => {
                        this.connection.genericHub.server.connect();
                    });
                    this.connection.genericHub.client.genericEvent = this.genericEvent;
                }
                catch (e) {
                    flexygo.msg.error('SignalR connection error' + e.message);
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
        var signalRCnn;
        if ($.connection) {
            signalRCnn = new Push($.connection);
        }
    })(events = flexygo.events || (flexygo.events = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=push.js.map