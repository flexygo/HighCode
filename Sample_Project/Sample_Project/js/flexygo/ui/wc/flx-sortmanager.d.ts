/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
  * Library for the flx-sortManagerElement web component.
  *
  * @class FlxSortManagerElement
  * @constructor
  * @return {FlxSortManagerElement} .
  */
    class FlxSortManagerElement extends HTMLElement {
        constructor();
        objectname: string;
        module: JQuery;
        list: flexygo.ui.wc.FlxListElement | flexygo.ui.wc.FlxSearchElement;
        sorting: boolean;
        sortingFrom: JQuery;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Init the webcomponent.
        * @method init
        */
        init(module: JQuery): void;
        /**
        * Refresh de webcomponent.
        * @method refresh
        */
        refresh(): void;
        clean(): void;
        apply(): void;
        render(): void;
        sortStart(item: JQuery): void;
        sortStop(item: JQuery): void;
    }
}
