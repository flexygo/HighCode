/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
   * Library for the FlxSchedulerViewElement web component.
   *
   * @class FlxSchedulerViewElement
   * @constructor
   * @return {FlxSchedulerViewElement}
   */
    class FlxSchedulerViewElement extends HTMLElement {
        constructor();
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        moduleName: string;
        options: string;
        data: any;
        me: any;
        today: any;
        additionalWhere: string;
        /**
       * Fires when element is attached to DOM
       * @method connectedCallback
       */
        connectedCallback(): void;
        /**
      * Array of observed attributes.
      * @property observedAttributes {Array}
      */
        static readonly observedAttributes: string[];
        /**
       * Fires when the attribute value of the element is changed.
       * @method attributeChangedCallback
       */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        refresh(): void;
        init(): void;
        render(selector: string): void;
        changeEvents(additionalWhere: string): void;
        draw(): void;
        drawHeader(): void;
        drawMonth(): void;
        createElement(tagName: any, className: any, innerText: any, backgroundColor: any): any;
        backFill(): void;
        getWeek(day: any): void;
        fowardFill(): void;
        currentMonth(): void;
        drawDay(day: any): void;
        drawEvents(day: any, element: any): void;
        getDayClass(day: any): any;
        openDay(el: any): any;
        renderEvents(events: any, ele: any, defaultDate: string): any;
        drawLegend(): any;
        getObjectWhere(table: string, key: string[], id: string[]): string;
        nextMonth(): any;
        prevMonth(): any;
        formatDate(date: Date, month: string, day: string, year: number): string;
        translate(str: string): string;
        startLoading(): void;
        stopLoading(): void;
    }
}
