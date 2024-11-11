declare namespace flexygo.nav {
    function goBack(current?: any): void;
    function closeModal(current?: any, data?: any): void;
    function goHome(): void;
    function goSync(): void;
    function goLogin(): void;
    function goList(object: string, pagename: string, filter?: string, defaults?: string | Object): void;
    function goEdit(object: string, pagename: string, filter: string, defaults?: string | Object): void;
    function goView(object: string, pagename: string, filter: string, defaults?: string | Object): void;
    function goInsert(object: string, pagename: string, defaults?: string | Object): void;
    function goGallery(object: string, objectid: string, defaults?: string | Object): void;
    function goDocuments(object: string, objectid: string, defaults?: string | Object): void;
    function transferList(object: string, pagename: string, filter?: string, defaults?: string | Object): void;
    function transferEdit(object: string, pagename: string, filter: string, defaults?: string | Object): void;
    function transferView(object: string, pagename: string, filter: string, defaults?: string | Object): void;
    function transferInsert(object: string, pagename: string, defaults?: string | Object): void;
    function transferGallery(object: string, objectid: string, defaults?: string | Object): void;
    function transferDocuments(object: string, objectid: string): void;
    function modalList(object: string, pagename: string, filter?: string, defaults?: string | Object): Promise<import("@ionic/core").OverlayEventDetail<any>>;
    function modalEdit(object: string, pagename: string, filter: string, defaults?: string | Object): Promise<import("@ionic/core").OverlayEventDetail<any>>;
    function modalView(object: string, pagename: string, filter: string, defaults?: string | Object): Promise<import("@ionic/core").OverlayEventDetail<any>>;
    function modalInsert(object: string, pagename: string, defaults?: string | Object): Promise<import("@ionic/core").OverlayEventDetail<any>>;
    function goPage(type: string, object: string, pagename: string, filter: string, defaults: string | Object, direction: RouterDirection): void;
    function goPageGallDoc(type: string, object: string, objectid: string, defaults: string | Object, direction: RouterDirection): void;
    function currentUrl(): string;
    function _nav(url: any, direction: RouterDirection): Promise<void>;
    function _goMenu(menu: MenuConfig): Promise<void>;
}

declare namespace flexygo.navOnline {
    function goHome(): void;
    function goList(objectName: string, navigateFun?: string, defaults?: string, objectWhere?: string, filterValues?: string, pageName?: string, hideMenuBar?: boolean): void;
    function goEdit(objectName: string, objectWhere: string, navigateFun?: string, defaults?: string, filterValues?: string, pageName?: string, hideMenuBar?: boolean): void;
    function goView(objectName: string, objectWhere: string, navigateFun?: string, defaults?: string, filterValues?: string, pageName?: string, hideMenuBar?: boolean): void;
    function goInsert(objectName: string, navigateFun?: string, defaults?: string, filterValues?: string, pageName?: string, hideMenuBar?: boolean): void;
    function goReport(reportName: string, objectName: string, objectWhere: string): void;
    function goPage(pageTypeId: string, objectName: string, navigateFun?: string, defaults?: string, objectWhere?: string, filterValues?: string, pageName?: string, hideMenuBar?: boolean): Promise<void>;
    function goExternalURL(url: string): Promise<void>;
}