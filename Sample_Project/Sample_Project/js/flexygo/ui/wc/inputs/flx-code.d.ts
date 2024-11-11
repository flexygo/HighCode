declare var CodeMirror: any;
declare var JSHINT: any;
declare var require: any;
/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxCodeElement web component.
    *
    * @class FlxCodeElement
    * @constructor
    * @return {FlxCodeElement}
    */
    class FlxCodeElement extends HTMLElement {
        constructor();
        static typeScriptLibraries: object[];
        static offlineLibraries: object[];
        static htmlStyles: object[];
        type: string;
        options: flexygo.api.ObjectProperty;
        property: string;
        moduleName: string;
        height: string;
        width: string;
        editor: string;
        intellisense: string;
        libraryLoaded: boolean;
        monaco: monaco.editor.IStandaloneCodeEditor;
        renderMode: string;
        readonly: any;
        inTemplate: boolean;
        help: boolean;
        myCM: any;
        value: string;
        /**
       * Set when component is attached to DOM
       * @property connected {boolean}
       */
        connected: boolean;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        static setTypeScriptLibraries(libraries: any): void;
        static setOfflineLibraries(libraries: any): void;
        static setHtmlStyles(styles: any): void;
        static getTypeScriptLibraries(): object[];
        static getOfflineLibraries(): object[];
        static getHtmlStyles(): object[];
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
        initMonaco(): void;
        setCodeEditor(): void;
        adjustPlaceHolder(node: JQuery): void;
        initCodeMirror(): void;
        setOptions(): void;
        getValue(): string;
        setValue(value: string): void;
        setValueWithHistory(value: string): void;
        setValueView(value: string): void;
        fullscreen(value?: any): void;
        getMode(): string;
        getWizardButton(): string;
        getHeadBar(): any;
        triggerReturnEvent(context: JQuery): void;
        setButtonsSettings(m: any): void;
        /**
        * Trigger Dependencies.
        * @method triggerDependencies
        */
        triggerDependencies(): void;
    }
}
