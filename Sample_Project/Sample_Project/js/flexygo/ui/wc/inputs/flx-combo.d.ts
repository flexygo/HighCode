/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxComboElement web component.
    *
    * @class FlxComboElement
    * @constructor
    * @return {FlxComboElement}
    */
    class FlxComboElement extends HTMLElement {
        constructor();
        property: string;
        value: string;
        mode: string;
        type: string;
        options: flexygo.api.ObjectProperty;
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        cnnString: string;
        additionalWhere: string;
        connectedCallback(): void;
        static readonly observedAttributes: string[];
        attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void;
        refresh(): void;
        init(): void;
        initViewMode(): void;
        initEditMode(): void;
        getIconButtons(): JQuery;
        setOptions(): void;
        changeSQLData(newSQL: string, newOptions: flexygo.api.edit.KeyValuePair[]): void;
        setValue(value: string, text?: string): void;
        setValueView(value: string): void;
        getValue(): string;
        getText(): string;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
    }
}
