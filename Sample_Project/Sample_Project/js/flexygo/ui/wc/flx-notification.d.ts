/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxNotificationElement web component.
    *
    * @class FlxNotificationElement
    * @constructor
    * @return {FlxNotificationElement}
    */
    class FlxNotificationElement extends HTMLElement {
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
        static readonly observedAttributes: string[];
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
        refresh(): void;
        /**
       * Navigates to notify node specification
       * @method goToNotice
       */
        goToNotice(elm: any, noticeId: any): void;
        /**
        * Checks and refresh Notify Badge
        * @method refreshBadge
        */
        refreshBadge(): void;
        /**
        * Refereshes Notify Badge
        * @method updateBadge
        * @param {number} pendingNotices - Number of pending notices
        * @param {boolean} sound - Reproduces sound or not.
        */
        updateBadge(pendingNotices: number, sound: boolean): void;
        /**
     * Marks a notification has been read
     * @method markAsRead
     */
        markAsRead(elm: any, noticeId: any): void;
    }
}
