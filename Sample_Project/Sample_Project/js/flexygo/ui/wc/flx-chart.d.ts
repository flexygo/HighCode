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
        moduleName: string;
        /**
        * Component Object Name
        * @property objectName {string}
        */
        objectName: string;
        /**
        * Component Object Where
        * @property objectWhere {string}
        */
        objectWhere: string;
        AdditionalWhere: string;
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
        MixedChartLabels: string;
        MixedChartTypes: string;
        ChartSettingName: string;
        ChartLineBorderDash: boolean;
        ChartLineFill: boolean;
        options: any;
        chart: Chart;
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
        * Renders the chart
        * @method render
        */
        render(): void;
        checkValue(array: any, value: any, chartLabel: any): boolean;
        getRadiusBubble(value: any, max: any, min: any): number;
        getRadius(percent: any, min: any, max: any): number;
        toggleLabel(nom: any, boo: any, GroupName: any, ctxx?: any): void;
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
