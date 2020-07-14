/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
   * Library for the flx-chartElement web component.
   *
   * @class FlxChartElement
   * @constructor
   * @return {FlxChartElement} .
   */
    class FlxChartElement extends HTMLElement {
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        constructor();
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
        moduleName: string;
        data: any;
        dataColum: string;
        settings: {
            [name: string]: string;
        };
        Title: string;
        Labels: string;
        Series: string;
        Values: string;
        Params: string;
        Background: string;
        Border: string;
        type: string;
        options: any;
        chart: Chart;
        /**
        * Refresh de webcomponent.
        * @method refresh
        */
        refresh(): void;
        /**
        * Init the webcomponent.
        * @method init
        */
        init(): void;
        /**
       * prepares chart for render based on response saved in session o received from post
       * @method preRender
       */
        preRender(response: flexygo.api.chart.GetHTMLResponse): void;
        /**
        * Renders the chart
        * @method render
        */
        render(): void;
        toggleLabel(nom: any, boo: any, GroupName: any, ctxx?: any): void;
        /**
       * Translate a string
       * @method translate
       * @param {string} str - The string to translate.
       */
        translate(str: string): string;
        /**
       * Start loading
       * @method startLoading
       */
        startLoading(): void;
        /**
      * Stop loading
      * @method stopLoading
      */
        stopLoading(): void;
    }
}
