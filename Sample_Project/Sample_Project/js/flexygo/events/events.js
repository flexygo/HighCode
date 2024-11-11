/**
 * @namespace flexygo.events
 */
var flexygo;
(function (flexygo) {
    var events;
    (function (events) {
        var subscribers = [];
        var modules = {};
        /**
    * api for GenericKeyValueObject
    * @class GenericKeyValueObject
    * @constructor
    * @return {GenericKeyValueObject} .
    */
        class FlexyGoEventSubscriber {
            constructor() {
                this.onlyChilds = false;
            }
        }
        /**
        * api for FlexygoEvent
        * @class FlexygoEvent
        * @constructor
        * @return {FlexygoEvent} .
        */
        class FlexygoEvent {
            constructor(eventClass, eventType, sender, masterIdentity, detailIdentity, firedBy) {
                this.class = eventClass;
                this.type = eventType;
                this.sender = sender;
                this.masterIdentity = masterIdentity;
                this.detailIdentity = detailIdentity;
                this.firedBy = firedBy;
            }
        }
        events.FlexygoEvent = FlexygoEvent;
        /**
            * Method to subscribe to flexygo events
            * @method on
            * @param {object|string} context - The subscriber
            * @param {flexygo.events.FlexygoEvent} eventDefinition - The FlexygoEvent to subscribe to in form of class.type (Example: entity.all)
            * @param {object} callback - Callback function to be called
            */
        function on(context, eventClass, eventType, callback, onlyChilds = false) {
            let event = {
                class: eventClass,
                type: eventType
            };
            if (context && event && event.class && event.type && callback) {
                let s = {
                    context: context,
                    event: event,
                    callback: callback,
                    onlyChilds: onlyChilds
                };
                subscribers.push(s);
                let dbg = $(document).find('#divflxeventviewer');
                if (dbg.length > 0) {
                    let template = '<div class="row"><div class="col-2"><span>{{now}}</span></div><div class="col-2"><span>{{action}}</span></div><div class="col-2" ><span>{{class}}</span></div><div class="col-2"><span>{{type}}</span></div><div class="col-2"><span title="{{infotitle}}">{{info}}</span></div><div class="col-2"><span>{{detail}}</span></div></div>';
                    var dbgevt = {
                        now: moment().format("YYYY-MM-DD HH:mm:ss"),
                        action: "Attach",
                        class: eventClass,
                        type: eventType,
                        info: typeof context,
                        infotitle: JSON.stringify(context),
                        detail: ''
                    };
                    let html = flexygo.utils.parser.compile(dbgevt, template);
                    let header = dbg.find("#header");
                    header.after(html);
                }
            }
        }
        events.on = on;
        /**
           * Method to unsubscribe to flexygo events
           * @method off
           * @param {object|string} context - The subscriber
           * @param {flexygo.events.FlexygoEvent} event
           */
        function off(context, eventClass, eventType, callback) {
            let initial = subscribers.length;
            if (context && eventClass) {
                let rest = [];
                $.each(subscribers, (i, e) => {
                    if (context === e.context) {
                        if (eventClass && eventClass.length > 0) {
                            if (eventClass != e.event.class) {
                                if (eventClass !== "all") {
                                    rest.push(e);
                                }
                            }
                            else {
                                if (eventType && eventType.length > 0) {
                                    if (eventType != e.event.type) {
                                        if (eventType !== "all") {
                                            rest.push(e);
                                        }
                                    }
                                }
                                else { //all types
                                    //not remove element
                                }
                            }
                        }
                    }
                    else {
                        rest.push(e);
                    }
                });
                subscribers = rest;
            }
            let final = initial - subscribers.length;
            let dbg = $(document).find('#divflxeventviewer');
            if (dbg.length > 0) {
                let template = '<div class="row"><div class="col-2"><span>{{now}}</span></div><div class="col-2"><span>{{action}}</span></div><div class="col-2" ><span>{{class}}</span></div><div class="col-2"><span>{{type}}</span></div><div class="col-2"><span>{{info}}</span></div><div class="col-2"><span>{{detail}}</span></div></div>';
                var dbgevt = {
                    now: moment().format("YYYY-MM-DD HH:mm:ss"),
                    action: "Detach",
                    class: eventClass,
                    type: eventType,
                    info: final,
                    detail: ''
                };
                let html = flexygo.utils.parser.compile(dbgevt, template);
                let header = dbg.find("#header");
                header.after(html);
            }
        }
        events.off = off;
        /**
          * Method to trigger a flexygo event
          * @method trigger
          * @param {flexygo.events.FlexygoEvent} event - Event to be triggered
          */
        function trigger(event, triggerElement) {
            if (event && event.class && event.type) {
                let dbg = $(document).find('#divflxeventviewer');
                if (dbg.length > 0) {
                    let template = '<div class="row"><div class="col-2"><span>{{now}}</span></div><div class="col-2"><span>{{action}}</span></div><div class="col-2" ><span>{{class}}</span></div><div class="col-2"><span>{{type}}</span></div><div class="col-2"><span title="{{infotitle}}">{{info}}</span></div><div class="col-2"><span title="{{detailtitle}}">{{detail}}</span></div></div>';
                    let detail = (typeof event.detailIdentity === 'string' || event.detailIdentity instanceof String) ? event.detailIdentity : '[Object]';
                    if (detail && detail.length > 100) {
                        detail = detail.substring(0, 100) + '....';
                    }
                    var dbgevt = {
                        now: moment().format("YYYY-MM-DD HH:mm:ss"),
                        action: "Trigger",
                        class: event.class,
                        type: event.type,
                        info: event.masterIdentity,
                        infotitle: JSON.stringify(event.masterIdentity),
                        detail: detail,
                        detailtitle: JSON.stringify(event.detailIdentity)
                    };
                    let html = flexygo.utils.parser.compile(dbgevt, template);
                    let header = dbg.find("#header");
                    header.after(html);
                }
                //Specific event subscriber
                $.each(subscribers, (i, e) => {
                    if (e.event.class === "all" || e.event.class === event.class) {
                        if (e.event.type === "all" || e.event.type === event.type) {
                            event.context = e.context;
                            //Fire event only if the trigger is inside the subscriber
                            if (e.onlyChilds) {
                                if ($(e.context).find(triggerElement).length > 0) {
                                    e.callback.call(e.context, event);
                                }
                            }
                            else {
                                //Trigger event for all subscribers
                                e.callback.call(e.context, event);
                            }
                        }
                    }
                });
                //Generic module events
                $.each(modules, (i, e) => {
                    $.each(e.moduleConfig.Events, (j, ee) => {
                        if (ee.EventClass === "all" || ee.EventClass === event.class) {
                            if (ee.EventType === "all" || ee.EventType === event.type) {
                                let catched = false;
                                //EventClass = "all" | "entity" | "property" | "process" | "module" | "page" | "post" | "dialog";
                                //type EventType = "all" | "inserted" | "updated" | "deleted" | "changed" | "selected" | "executed" | "loaded" | "closed" | "refreshed";
                                switch (event.class) {
                                    case "entity":
                                        let entity = event.sender;
                                        let objectName = (entity ? entity.objectName : "");
                                        objectName = event.type == "check" || event.type == "uncheck" ? entity.childname : objectName;
                                        if (ee.ObjectFilter === "" || (objectName && ee.ObjectFilter.toLowerCase() === objectName.toLowerCase())) {
                                            catched = true;
                                        }
                                        break;
                                    case "property":
                                        const property_name = event.sender.property;
                                        if (ee.PropertyFilter === "" || ee.PropertyFilter.toLowerCase() === property_name.toLowerCase()) {
                                            catched = true;
                                        }
                                        break;
                                    case "process":
                                        let processName = event.masterIdentity;
                                        if (ee.ProcessFilter === "" || ee.ProcessFilter.toLowerCase() === (processName === null || processName === void 0 ? void 0 : processName.toLowerCase())) {
                                            catched = true;
                                        }
                                        break;
                                    case "module":
                                        let module = event.sender;
                                        if (ee.ModuleFilter === "" || ee.ModuleFilter.toLowerCase() === module.moduleConfig.ModuleName.toLowerCase()) {
                                            catched = true;
                                        }
                                        break;
                                    case "page":
                                        let page = event.sender;
                                        if (ee.PageFilter === "" || ee.PageFilter.toLowerCase() === page.PageName.toLowerCase()) {
                                            catched = true;
                                        }
                                        break;
                                    case "post":
                                        let postName = event.masterIdentity;
                                        if (ee.MethodFilter === "" || ee.MethodFilter.toLowerCase() === postName.toLowerCase()) {
                                            catched = true;
                                        }
                                        break;
                                    case "dialog":
                                        catched = true;
                                        break;
                                    case "document":
                                        catched = true;
                                        break;
                                    case "image":
                                        catched = true;
                                        break;
                                }
                                if (catched) {
                                    switch (ee.EventAction) {
                                        case "refresh":
                                            e.refresh();
                                            break;
                                        case "process":
                                            let objectWhere = (event.class == "entity") ? ((event.type == "check" || event.type == "uncheck") ? event.detailIdentity.moduleFilter : event.detailIdentity) : e.objectwhere;
                                            flexygo.nav.execProcess(ee.ProcessName, (event.class == "entity") ? event.masterIdentity : e.objectname, objectWhere, null, null, null, false, $(e), null, null, null, null, event);
                                            break;
                                        default:
                                            console.warn('Event Action: ' + ee.EventAction);
                                            flexygo.msg.error(flexygo.localization.translate('flxmodule.noparams'));
                                            break;
                                    }
                                }
                            }
                        }
                    });
                });
            }
        }
        events.trigger = trigger;
        /**
           * Method to register a module to manage its events
           * @method registerModule
           * @param {flexygo.ui.wc.FlxModule} module - Module
           */
        function registerModule(module) {
            if (!modules.hasOwnProperty(module.uuid)) {
                if (module.moduleConfig && module.moduleConfig.Events) {
                    if (Object.keys(module.moduleConfig.Events).length > 0) {
                        modules[module.uuid] = module;
                    }
                }
                else {
                    //This can happen if module is created explicity by JavaScript code, and in consequence, it has not config loaded
                    return;
                }
            }
        }
        events.registerModule = registerModule;
        /**
          * Method to unregister a module to manage its events
          * @method unRegisterModule
          * @param {flexygo.ui.wc.FlxModule} module - Module
          */
        function unRegisterModule(module) {
            if (modules.hasOwnProperty(module.uuid)) {
                delete modules[module.uuid];
            }
        }
        events.unRegisterModule = unRegisterModule;
    })(events = flexygo.events || (flexygo.events = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=events.js.map