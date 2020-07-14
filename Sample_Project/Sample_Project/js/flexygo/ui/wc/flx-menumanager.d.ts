/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    class LoadMenusParams {
        AppName: string;
    }
    class NavigationMenu {
        menuid: string;
        order: number;
        parentmenuid: string;
        title: string;
        strtype: string;
    }
    class HierarchicalMenu {
        id: string;
        children?: HierarchicalMenu[];
        parentid: string;
        order: number;
    }
    /**
    * Library for the FlxMenuManagerElement web component.
    *
    * @class FlxMenuManagerElement
    * @constructor
    * @return {FlxMenuManagerElement}
    */
    class FlxMenuManagerElement extends HTMLElement {
        /**
        * Set when component is attached to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        method: string;
        methodParams: LoadMenusParams;
        deleteMethod: string;
        relocateMethod: string;
        getMetod: string;
        appName: string;
        openMenus: string[];
        scrollY: number;
        sortableList: JQuery;
        constructor();
        /**
       * Fires when element is attached to DOM
       * @method connectedCallback
       */
        connectedCallback(): void;
        /**
        * Init menu manager
        * @method init
        */
        init(): void;
        template: string;
        emptyTemplate: string;
        refresh(): void;
        loadMenus(): void;
        renderNode(id: string, ret: NavigationMenu[]): JQuery;
        loadMenusRet(ret: NavigationMenu[]): void;
        showEdit(placeHolder: JQuery, isNewMenu: boolean): void;
        findMenu(Menus: HierarchicalMenu[], Menuid: string, parentid?: string): HierarchicalMenu;
        sortMenus(Menus: {}, orderby: string): NavigationMenu[];
        deleteMenu(Menu: string): void;
        saveOpenMenu(btn: JQuery): void;
        saveMenusState(): void;
        restoreMenusState(): void;
    }
}
