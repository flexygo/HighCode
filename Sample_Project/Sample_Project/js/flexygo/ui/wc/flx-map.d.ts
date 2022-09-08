declare var MarkerClusterer: any;
/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
   * Library for the FlxMapElement web component.
   *
   * @class FlxMapElement
   * @constructor
   * @return {FlxMapElement}
   */
    class FlxMapElement extends HTMLElement {
        constructor();
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        moduleName: string;
        options: string;
        mapType: string;
        data: any;
        lat: string;
        lng: string;
        mode: string;
        arrow: boolean;
        dotted: boolean;
        route: boolean;
        lineColor: string;
        lineWidht: number;
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
        initMap(): void;
        translate(str: string): string;
        startLoading(): void;
        stopLoading(): void;
    }
}
declare function initAllMaps(): void;
