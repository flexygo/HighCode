/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxContextMenu
    *
    * @class FlxContextMenu
    * @constructor
    * @return {FlxContextMenu} .
    */
    class FlxContextMenu extends HTMLElement {
        constructor();
        menu: JQuery;
        parent: JQuery;
        processing: boolean;
        createMenu(parent: JQuery): JQuery;
        createSubMenu(content: JQuery, parent: JQuery): JQuery;
        /**
        * Init the webcomponent. REQUIRED.
        * @method init
        */
        show(coord?: JQueryCoordinates): void;
        setPosition(coord?: JQueryCoordinates): void;
        destroy(): void;
        addSeparator(itm: JQuery): void;
        showSubMenu(ev: JQueryEventObject): void;
        subMenuIdCounter: number;
        subMenuId(): string;
        hideMenu(parent: JQuery): boolean;
        showMenu(items: JQuery, parent: JQuery): void;
        createItemsMenu(items: JQuery): JQuery;
        showObjectMenu(proc: flexygo.api.entity.GetProcessesResponse, parent: JQuery, coord?: JQueryCoordinates): void;
        processSubMenus(list: JQuery): void;
        createObjectMenu(proc: flexygo.api.entity.GetProcessesResponse): JQuery;
    }
}
