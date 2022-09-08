/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxScheduler web component.
    *
    * @class FlxScheduler
    * @constructor
    * @return {FlxScheduler}
    */
    class FlxScheduler extends HTMLElement {
        webControl: JQuery;
        objectName: string;
        objectWhere: string;
        pageName: string;
        config: string[];
        objects: any[];
        checkObjects: string[];
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        moduleName: string;
        data: any;
        n: any;
        additionalWhere: string;
        dayClick: boolean;
        events: any[];
        allDay: boolean;
        eventsRefresh: boolean;
        hasPendingRefresh: boolean;
        constructor();
        /**
       * Array of observed attributes.
       * @property observedAttributes {Array}
       */
        static readonly observedAttributes: string[];
        /**
        * Refresh de webcomponent.
        * @method refresh
        */
        connectedCallback(): void;
        /**
        * Init the webcomponent.
        * @method init
        */
        init(): void;
        /**
        * Refresh de webcomponent.
        * @method refresh
        */
        refresh(): void;
        /**
        * Initialize Scheduler.
        * @method render
        */
        render(options: string[], activeMode: string, maxTime: string, minTime: string, onClickEvent: string, allDaySlot: string, slotDuration: string, pageType: string, target: string, eventLimit: boolean, disableResize: boolean, disableDrag: boolean, onClickJS: string, onClickDayJS: string): void;
        /**
       * Check Objects.
       * @method checkPanelObjects
       */
        checkPanelObjects(additionalWhere: string): void;
        /**
       * Open Event.
       * @method openEvent
       */
        openEvent(objectName: string, startDate: string, endDate: string, startTime: string, endTime: string, duration: string, date: string, time: string, allday: string, hasTime: boolean): void;
        /**
       * Change Events.
       * @method changeEvents
       */
        changeEvents(objectName: string, viewName: string, color: string, startDate: string, endDate: string, startTime: string, endTime: string, duration: string, descripTemplate: string, key: string[], table: string, userIdField: string, filter: string, textColor: string, additionalWhere: string, tokenDefault: string, canEdit: boolean, canView: boolean, allDayField: string): void;
        /**
       * Results.
       * @method schedulerResult
       */
        schedulerResult(objectName: string, viewName: string, start: string, end: string, color: string, startDate: string, endDate: string, startTime: string, endTime: string, duration: string, descripTemplate: string, key: string[], table: string, userIdField: string, filter: string, textColor: string, additionalWhere: string, tokenDefault: string, canEdit: boolean, canView: boolean, allDayField: string): void;
        formatDate(date: Date, month: string, day: string, year: number): string;
        getStartWeek(d: Date): Date;
        getObjectWhere(table: string, key: string[], id: string[]): string;
        /**
    * Fires when element is detached to DOM
    * @method disconnectedCallback
    */
        disconnectedCallback(): void;
    }
    class FlxSchedulerElement extends HTMLElement {
        /**
        * Fires when element is attached to DOM
        * @method attachedCallback
        */
        attachedCallback(): void;
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
    }
}
