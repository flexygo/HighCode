declare namespace flexygo.history {
    class Base64 {
        private static keyStr;
        static encode(e: string): string;
        static decode(e: string): string;
        private static _utf8_encode(e);
        private static _utf8_decode(e);
    }
    function go(hist: flexygo.nav.FlexygoHistory): void;
    function get(targetId: JQuery): flexygo.nav.FlexygoHistory;
    function getPageName(targetId: JQuery): string;
    function refresh(targetId: JQuery): void;
    function set(histObj: flexygo.nav.FlexygoHistory): void;
    function replace(dataObj: flexygo.nav.FlexygoHistory, targetId: JQuery, excludeHist?: boolean): void;
    function getDefaults(objectname: string, item: JQuery): string;
}
declare namespace flexygo.history.historyLog {
    function add(icon: string, description: string, historyObj: flexygo.nav.FlexygoHistory): void;
    function show(triggerElement: JQuery): void;
    function showAll(triggerElement?: JQuery): void;
    function getItem(histItm: flexygo.nav.FlexygoHistory): JQuery;
}
