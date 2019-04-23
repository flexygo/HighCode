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
    class FlxSchedulerYearElement extends HTMLElement {
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
        render(): void;
        changeEvents(additionalWhere: string, filter: string): void;
        currentYear(): void;
        drawEvents(day: any): void;
        getObjectWhere(table: string, key: string[], id: string[]): string;
        formatDate(date: Date, month: string, day: string, year: number): string;
        translate(str: string): string;
        startLoading(): void;
        stopLoading(): void;
    }
}
