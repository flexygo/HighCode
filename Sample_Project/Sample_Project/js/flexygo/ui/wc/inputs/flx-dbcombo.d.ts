/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxDbComboElement web component.
    *
    * @class FlxDbComboElement
    * @constructor
    * @return {FlxDbComboElement}
    */
    class FlxDbComboElement extends HTMLElement {
        constructor();
        property: string;
        mode: string;
        type: string;
        options: flexygo.api.ObjectProperty;
        input: JQuery;
        mobileInput: JQuery;
        inputval: JQuery;
        datalist: JQuery;
        open: boolean;
        value: string;
        page: number;
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        additionalWhere: string;
        cnnString: string;
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
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        refresh(): void;
        init(): void;
        initViewMode(): void;
        initEditMode(): void;
        timer: any;
        scrollTopPosition: any;
        showOptions(): void;
        hideOptions(): void;
        loadValues(page: number, autoselect: boolean, fromvalue?: boolean, value?: string, append?: boolean): void;
        private addComboItems(data, autoselect, append?);
        private getTextByValue(value);
        private getListItem(value, text, template);
        getIconButtons(): JQuery;
        setOptions(): void;
        changeSQLData(newSQL: string, newOptions: any): void;
        setValue(value: string, text?: string, template?: string): void;
        setValueView(value: string): void;
        getValue(): string;
        getText(): string;
        /**
      * Trigger Dependencies.
      * @method triggerDependencies
      */
        triggerDependencies(): void;
        /**
      * Show.
      * @method show
      */
        show(): JQuery;
    }
}
