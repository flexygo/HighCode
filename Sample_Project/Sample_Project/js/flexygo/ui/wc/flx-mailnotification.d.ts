/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxMailNotificationElement web component.
    *
    * @class FlxMailNotificationElement
    * @constructor
    * @return {FlxMailNotificationElement}
    */
    class FlxMailNotificationElement extends HTMLElement {
        constructor();
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
       * Fires when element is detached to DOM
       * @method disconnectedCallback
       */
        disconnectedCallback(): void;
        /**
        * Monitor the list of observed attribute for changes.
        * @property observedAttributes
        */
        observedAttributes(): string[];
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        /**
        * Initialize Web Control
        * @method init
        */
        init(): void;
        /**
        * Refreses Web Control
        * @method refresh
        */
        refresh(): Promise<void>;
        /**
        * Checks and refresh Notify Badge
        * @method refreshBadge
        */
        refreshBadge(): Promise<void>;
        /**
        * Refreshes Notify Badge
        * @method updateBadge
        * @param {number} pendingMails - Number of pending mails
        * @param {boolean} sound - Reproduces sound or not.
        */
        updateBadge(pendingMails: number, sound: boolean): void;
    }
}
