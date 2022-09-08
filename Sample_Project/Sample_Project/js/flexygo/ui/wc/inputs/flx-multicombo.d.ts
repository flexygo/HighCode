/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxMultiComboElement web component.
    *
    * @class FlxMultiComboElement
    * @constructor
    * @return {FlxMultiComboElement}
    */
    class FlxMultiComboElement extends HTMLElement {
        constructor();
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        type: string;
        options: flexygo.api.ObjectProperty;
        mode: string;
        property: string;
        page: number;
        input: JQuery;
        datalist: JQuery;
        container: JQuery;
        mobileInput: JQuery;
        additionalWhere: string;
        cnnString: string;
        separator: string;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        disconnectedCallback(): void;
        /**
      * Array of observed attributes.
      * @property observedAttributes {Array}
      */
        static readonly observedAttributes: string[];
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: string, oldVal: any, newVal: any): void;
        refresh(): void;
        init(): void;
        showOptions(): void;
        hideOptions(): void;
        loadValues(page: number, fromvalue?: boolean, value?: string, append?: boolean): void;
        private addComboItems(data, append?);
        private getListItem(value, text, template);
        addValue(value: any, text?: string): void;
        getIconButtons(): JQuery;
        setOptions(): void;
        changeSQLData(newSQL: string, newOptions: string): void;
        setValue(value: string, text?: string): void;
        getValue(): any;
        getText(): any;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
    }
}
