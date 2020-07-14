declare namespace flexygo.ui.templates {
    class ObjectTemplateCache {
        isTemplate: boolean;
        value: string;
    }
    function templateList(objectname: string, module: JQuery, btn: JQuery): void;
    function showTemplateList(btn: JQuery, ctx: flexygo.ui.wc.FlxListElement): void;
    function getListTemplateNode(template: string, key: string, isTemplate: boolean, ctx: flexygo.ui.wc.FlxListElement): JQuery;
    function addNewTemplateNode(objectname: string): JQuery;
    function setDefaultTemplate(ctx: flexygo.ui.wc.FlxListElement | flexygo.ui.wc.FlxViewElement): void;
    function saveDefaultTemplate(key: string, template: ObjectTemplateCache): void;
    function showSortManager(objectname: string, module: JQuery, btn: JQuery): void;
    function iconCategoryFilter(e: JQuery): void;
}
