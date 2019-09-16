/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
            * Library for the FlxContextMenu
            *
            * @class FlxContextMenu
            * @constructor
            * @return {FlxContextMenu} .
            */
            class FlxContextMenu extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    this.menu = null;
                    this.processing = false;
                    this.subMenuIdCounter = 0;
                }
                createMenu(parent) {
                    this.menu = $('<div class="flx-contextmenu" style="display:none"></div>');
                    $(this).html(this.menu);
                    this.parent = parent;
                    return this.menu;
                }
                createSubMenu(content, parent) {
                    let subMenuId = this.subMenuId();
                    let menu = $('<div  class="flx-contextmenu" style="display:none"></div>');
                    parent.attr('submenu', subMenuId);
                    parent.on('click', (ev) => { this.showSubMenu(ev); });
                    menu.attr('submenuid', subMenuId);
                    menu.append(content);
                    $(this).append(menu);
                    return menu;
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                show(coord) {
                    this.menu.show();
                    this.setPosition(coord);
                    $(window).on('resize.contextmenu', () => { this.setPosition(coord); this.menu.find('[submenuid]').hide(); });
                    this.parent.closest('main').parent().on('scroll.contextmenu', () => { this.setPosition(coord); this.menu.find('[submenuid]').hide(); });
                }
                setPosition(coord) {
                    if (coord) {
                        this.menu.css({ top: coord.top, left: coord.left, position: 'absolute' });
                    }
                    else {
                        this.menu.position({
                            my: "left top",
                            at: 'left bottom',
                            of: this.parent,
                            collision: 'flip flip'
                        });
                    }
                }
                destroy() {
                    $(window).off('resize.contextmenu');
                    if (this.parent) {
                        this.parent.closest('main').parent().off('scroll.contextmenu');
                    }
                    this.menu = null;
                    this.parent = null;
                    $(this).empty();
                }
                addSeparator(itm) {
                    itm.append('<li class="separator"></li>');
                }
                showSubMenu(ev) {
                    ev.stopPropagation();
                    var parent = $(ev.currentTarget);
                    var menu = $(this).find('[submenuid=' + parent.attr('submenu') + ']');
                    if (!menu.is(':visible')) {
                        $(this).find('[submenuid]:visible').hide();
                        menu.show();
                        menu.position({
                            my: "left top",
                            at: 'right top',
                            of: parent,
                            collision: 'flip flip'
                        });
                    }
                }
                subMenuId() {
                    return 'submenu-' + this.subMenuIdCounter++;
                }
                hideMenu(parent) {
                    if (parent.is(this.parent)) {
                        this.destroy();
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                showMenu(items, parent) {
                    this.processing = true;
                    if (parent.is(this.parent)) {
                        this.destroy();
                    }
                    else {
                        if (!parent.is(this.parent)) {
                            this.destroy();
                            this.createMenu(parent);
                            this.createItemsMenu(items);
                            this.processSubMenus(items);
                            this.show();
                        }
                    }
                    this.processing = false;
                }
                createItemsMenu(items) {
                    this.menu.html(items);
                    return items;
                }
                showObjectMenu(proc, parent, coord) {
                    this.processing = true;
                    if (!parent.is(this.parent)) {
                        this.destroy();
                        this.createMenu(parent);
                        this.createObjectMenu(proc);
                        this.show(coord);
                    }
                    this.processing = false;
                }
                processSubMenus(list) {
                    list.find('li > ul').each((idx, elm) => {
                        let ul = $(elm);
                        let parent = ul.parent();
                        parent.removeAttr('class');
                        ul.detach();
                        this.createSubMenu(ul, parent);
                    });
                }
                createObjectMenu(proc) {
                    let menuUl = $('<ul/>');
                    this.menu.html(menuUl);
                    var myObj = $(document).find('flx-nav')[0];
                    if (proc.ActionNode && Object.keys(proc.ActionNode.ChildNodes).length > 0) {
                        menuUl.append($(myObj.getChildNodes(flexygo.utils.lowerKeys(proc.ActionNode, true))).children());
                        this.addSeparator(menuUl);
                    }
                    if (proc.ProcessLink && Object.keys(proc.ProcessLink.ChildNodes).length > 0) {
                        menuUl.append($(myObj.getChildNodes(flexygo.utils.lowerKeys(proc.ProcessLink, true))).children());
                        this.processSubMenus(menuUl);
                        this.addSeparator(menuUl);
                    }
                    if (proc.ObjectLink && Object.keys(proc.ObjectLink.ChildNodes).length > 0) {
                        let nNode = $('<li><span><i class="flx-icon icon-properties-relations-1" /><span> ' + flexygo.localization.translate('navigation.relatedobjects') + '</span></span></li>');
                        menuUl.append(nNode);
                        this.createSubMenu($(myObj.getChildNodes(flexygo.utils.lowerKeys(proc.ObjectLink, true))), nNode);
                        this.addSeparator(menuUl);
                    }
                    if (proc.ReportLink && Object.keys(proc.ReportLink.ChildNodes).length > 0) {
                        var nNode = $('<li><span><i class="flx-icon icon-report" /><span> ' + flexygo.localization.translate('navigation.reports') + '</span></span></li>');
                        menuUl.append(nNode);
                        this.createSubMenu($(myObj.getChildNodes(flexygo.utils.lowerKeys(proc.ReportLink, true))), nNode);
                        this.addSeparator(menuUl);
                    }
                    if (menuUl.children().length == 0) {
                        menuUl.append('<li><span>' + flexygo.localization.translate('navigation.noelements') + '</span></li>');
                    }
                    return menuUl;
                }
            }
            wc.FlxContextMenu = FlxContextMenu;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
$(document).on('click', function (event) {
    var cm = $('flx-contextmenu')[0];
    if (cm.menu && !cm.processing && cm.parent) {
        if (!cm.parent.is(event.target) && !$.contains(cm.parent[0], event.target)) {
            cm.destroy();
        }
    }
});
window.customElements.define("flx-contextmenu", flexygo.ui.wc.FlxContextMenu);
//# sourceMappingURL=flx-contextmenu.js.map