var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @namespace flexygo.debug
 */
var flexygo;
(function (flexygo) {
    var debug;
    (function (debug) {
        /**
        * Library with develop mode functions.
        *
        * @class flexygo.debug
        */
        /**
         * Toggle between develop and normal mode.
         * @method toggleDevelopMode
         * @param {bool} showAnimation - Sets if the animation must be shown.
         */
        function toggleDevelopMode(showAnimation) {
            const firstTime = flexygo.storage.session.get('DevelopMode') === null;
            flexygo.storage.session.add('DevelopMode', !flexygo.debug.isDevelopMode());
            flexygo.debug.enableDevelopMode(flexygo.debug.isDevelopMode(), showAnimation, firstTime);
        }
        debug.toggleDevelopMode = toggleDevelopMode;
        /**
         * enable or disable develop mode.
         * @method enableDevelopMode
         * @param {bool} enable - Sets enabled or disabled.
         * @param {bool} showAnimation - Sets if the animation must be shown.
         */
        function enableDevelopMode(enable, showAnimation, firstTime = false) {
            $('body').find('flx-versioninfo').each((i, e) => {
                e.refresh();
            });
            let wcSidePanel = $('#mainSidePanel')[0];
            if (enable && typeof (wcSidePanel) != 'undefined') {
                if (firstTime) {
                    //We look if flexygo is running on a VS to show the original develop animation or if we show the one with the OriginID selection
                    //On error we will show the original develop animation, because it would mean that the IC database is using an older flexygo version
                    flexygo.nav.execProcess('IsRunningInVisualStudio', '', '', null, null, 'current', false, $(this), (ret) => {
                        if (ret.Data.running_on_vs) {
                            showDevelopOriginsPanel(wcSidePanel);
                        }
                        else
                            showDevelopOriginalAnimation(showAnimation, wcSidePanel);
                    }, false, null, () => { showDevelopOriginalAnimation(showAnimation, wcSidePanel); });
                }
                else {
                    //To avoid user always needing to select the OriginId when toggling develop mode, if it's not the first time we will just show the original animation
                    showDevelopOriginalAnimation(showAnimation, wcSidePanel);
                }
            }
            else {
                $('#mainSidePanel').css('display', 'none');
                $('body').removeClass('develop');
                if (typeof (wcSidePanel) != 'undefined') {
                    wcSidePanel.removePanel('Page Config.');
                }
                //$('#realMain').off('pageloaded.config');
                flexygo.events.off($('#realMain'), "page", "loaded");
                $('#mainSidePanel .side-items > span').off('click');
            }
        }
        debug.enableDevelopMode = enableDevelopMode;
        function showDevelopOriginalAnimation(showAnimation, wcSidePanel) {
            if (showAnimation && !flexygo.utils.testMode) {
                flexygo.debug.launchAnimation();
            }
            $('body').addClass('develop');
            $('#mainSidePanel').css('display', 'flex');
            wcSidePanel.addPanel('Page Config.', 'fa fa-cogs', flexygo.debug.getPagePanel(), true);
            if (!flexygo.utils.isSizeMobile()) {
                //$('#realMain').on('pageloaded.config', function (ev, page) {
                //falta: enviar el  histobj en el openPageReturn y por ende en el "page" "loaded" para luego en el controlador del realmain solo actuar si el target actual es la
                //ventana de fondo
            }
        }
        function showDevelopOriginsPanel(wcSidePanel) {
            flexygo.debug.launchOriginAnimation();
            $('body').addClass('develop');
            $('#mainSidePanel').css('display', 'flex');
            wcSidePanel.addPanel('Page Config.', 'fa fa-cogs', flexygo.debug.getPagePanel(), true);
        }
        function showObject(mode) {
            let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
            //only if an object is selected
            if (selectObjectname) {
                let obj = new flexygo.obj.Entity(selectObjectname);
                let cnf = obj.getConfig();
                if (mode == 'edit') {
                    flexygo.nav.openPage(mode, cnf.ObjectName, null, 'null', 'popup', false, $(this));
                }
                else {
                    flexygo.nav.openPage(mode, cnf.ParentName, null, 'null', 'popup', false, $(this));
                }
            }
            else {
                flexygo.msg.warning(flexygo.localization.translate('develop.selectobject'));
            }
        }
        debug.showObject = showObject;
        /**
         * Configure and returns sidebar config page panel.
         * @method getPagePanel
         * @return {object} - Page panel.
         */
        function getPagePanel() {
            let container = $('<div/>');
            let pageContext = flexygo.history.get($('#realMain'));
            let currentObject = ((pageContext && pageContext.objectname) ? pageContext.objectname : '');
            flexygo.events.on(this, "panel", "loading", function () {
                pageContext = flexygo.history.get($('#realMain'));
                let currentPageObject = (pageContext.objectname ? pageContext.objectname : '');
                if ($('.sysObjConfigCombo flx-dbcombo').length > 0) {
                    $('.sysObjConfigCombo flx-dbcombo').val(currentPageObject);
                }
            });
            container.append(`<section class="sysObjConfigCombo">
                            <flx-dbcombo AllowNewFunction="flexygo.debug.showObject('edit');" SearchFunction="flexygo.debug.showObject('list');" placeholder="Select object to get settings"
                            iconclass="flx-icon icon-object" objectname="SysObject" viewname="Objects_Config_Combo" sqlvaluefield="ObjectName" sqldisplayfield="Descrip" value="${currentObject}" 
                            control-class="size-m" sqlfilter="(ObjectName LIKE '%{{FindString}}%' OR Descrip LIKE '%{{FindString}}%')" additionalwhere="Iscollection=0">
                                <template>
            	                    <span>
   					                    {{Descrip}} <small class="txt-notify">({{ObjectName}})</small>   
                                    </span>
 			                    </template>  
                            </flx-dbcombo>
                        </section>`);
            let panel = $('<flx-accordion class="props-accordion" />');
            let panelCtx = panel[0];
            if (panelCtx) {
                let manage = $('<span class="clickable"/>').html('<i class="flx-icon icon-properties-settings icon-margin-right "></i>' + flexygo.localization.translate('develop.modulemanager')).on('click', () => { flexygo.debug.manageModules($('#realMain')); });
                // Developper Options
                let AdminPage = $('<span class="clickable"/>').html('<i class="flx-icon icon-laptop icon-margin-right "></i>' + flexygo.localization.translate('develop.adminarea') + '</span>').on('click', () => {
                    flexygo.nav.openPageName('syspage-generic-admon', '', '', 'null', 'current', false, $(this));
                });
                let helpPage = $('<span class="clickable"/>').html('<i class="flx-icon icon-information-2 icon-margin-right "></i>' + flexygo.localization.translate('develop.help') + '</span>').on('click', () => {
                    //flexygo.nav.openPage('list', 'sysHelp', '', 'null', 'current', false, $(this))
                    flexygo.nav.openPageName('db6ce0fb-2f28-4056-b14e-e9aed2769f97', 'sysHelp', '', null, 'current', false, $(this));
                });
                let settingsPage = $('<span class="clickable"/>').html('<i class="fa fa-gear icon-margin-right "></i>' + flexygo.localization.translate('develop.settings') + '</span>').on('click', () => {
                    flexygo.nav.openPage('list', 'sysSettingGroups', '', null, 'current', false, $(this));
                });
                panelCtx.add('<span><i class="flx-icon  icon-laptop icon-margin-right"></i>' + flexygo.localization.translate('develop.developer') + '</span>', [AdminPage, helpPage, settingsPage]);
                //End developper options
                // Page options
                let newPageStr = '<span class="newPage" title="New Page" ><i class="size-m txt-outstanding  flx-icon icon-new-doc icon-margin-right pull-right"></i></span>';
                let pageView = $('<span class="clickable"/>').html('<i class="flx-icon icon-listbox icon-margin-right "></i>' + flexygo.localization.translate('develop.pageSettings') + '</span>').on('click', () => {
                    flexygo.nav.openPage('view', 'sysPage', "Pagename='" + pageContext.pagename + "'", null, 'popup', true);
                });
                panelCtx.add('<span><i class="flx-icon icon-document icon-margin-right"></i>' + flexygo.localization.translate('develop.page') + newPageStr + '</span>', [pageView]);
                $(panelCtx).find('.newPage').on('click', (event) => {
                    flexygo.nav.openPage('edit', 'sysPage', null, 'null', 'current', false);
                    event.stopPropagation();
                });
                //End page options
                //Object Options
                let objConfig = $('<span class="clickable"/>').html('<i class="flx-icon icon-modules-settings icon-margin-right "></i>' + flexygo.localization.translate('develop.settings') + '</span>').on('click', (event) => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    //only if an object is selected
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = obj.getConfig();
                        flexygo.nav.openPage('edit', 'sysObject', "Objectname='" + cnf.ObjectName + "'", null, 'popup', true);
                    }
                    else {
                        flexygo.msg.warning(flexygo.localization.translate('develop.selectobject'));
                    }
                    event.stopPropagation();
                });
                let objView = $('<span class="clickable"/>').html('<i class="flx-icon icon-cube1 icon-margin-right "></i>' + flexygo.localization.translate('develop.viewobject') + '</span>').on('click', (event) => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = obj.getConfig();
                        flexygo.nav.openPage('view', 'sysObject', "Objectname='" + cnf.ObjectName + "'", null, 'popup', true);
                    }
                    else {
                        flexygo.msg.warning(flexygo.localization.translate('develop.selectobject'));
                    }
                    event.stopPropagation();
                });
                let objWizard = $('<span class="clickable"/>').html('<i class="fa fa-magic icon-margin-right "></i>' + flexygo.localization.translate('develop.wizard') + '</span>').on('click', (event) => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = obj.getConfig();
                        flexygo.nav.openPageName('syspage-generic-objectwizard', 'sysObject', "ObjectName='" + cnf.ObjectName + "'", 'null', 'current', false);
                    }
                    else {
                        flexygo.msg.warning(flexygo.localization.translate('develop.selectobject'));
                    }
                    event.stopPropagation();
                });
                let objProcesses = $('<span class="clickable"/>').html('<i class="flx-icon icon-flow-chart-2 icon-margin-right "></i>' + flexygo.localization.translate('develop.processes') + '</span>').on('click', (event) => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = obj.getConfig();
                        let hist = new flexygo.nav.FlexygoHistory;
                        setObjectProcessHistory(hist, cnf.ObjectName);
                        flexygo.nav.openPage('list', 'sysObjectProcesses', `Objects_Processes.ObjectName in (Select ObjectName from Objects where offline=0)`, null, 'current', false, $(this), false, hist, '');
                    }
                    else {
                        flexygo.msg.warning(flexygo.localization.translate('develop.selectobject'));
                    }
                    event.stopPropagation();
                });
                let objImageManager = $('<span class="clickable"/>').html('<i class="fa fa-image icon-margin-right "></i>' + flexygo.localization.translate('develop.imagemanager') + '</span>').on('click', (event) => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = (obj.objectName) ? obj.getConfig() : null;
                        let defaults = {
                            'ObjectName': (cnf) ? cnf.ObjectName : '',
                            'KeyProperty': (cnf) ? (cnf.KeyFields.length === 1) ? cnf.KeyFields[0] : '' : '',
                        };
                        flexygo.nav.openPage('edit', 'sysObjectImageSetting', (cnf) ? "ObjectName = '" + cnf.ObjectName + "'" : null, defaults, 'modal900x580', false, $(this));
                    }
                    else {
                        flexygo.msg.warning(flexygo.localization.translate('develop.selectobject'));
                    }
                    event.stopPropagation();
                });
                let objDocumentManager = $('<span class="clickable"/>').html('<i class="flx-icon icon-document icon-margin-right "></i>' + flexygo.localization.translate('develop.documentmanager') + '</span>').on('click', (event) => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = (obj.objectName) ? obj.getConfig() : null;
                        let defaults = {
                            'ObjectName': (cnf) ? cnf.ObjectName : '',
                            'ObjectPK': (cnf) ? (cnf.KeyFields.length === 1) ? cnf.KeyFields[0] : '' : '',
                        };
                        flexygo.nav.openPage('edit', 'Documents_Object_Config', (cnf) ? "ObjectName = '" + cnf.ObjectName + "'" : null, defaults, 'modal900x580', false, $(this));
                    }
                    else {
                        flexygo.msg.warning(flexygo.localization.translate('develop.selectobject'));
                    }
                    event.stopPropagation();
                });
                let objMailManager = $('<span class="clickable"/>').html('<i class="flx-icon icon-email-settings icon-margin-right "></i>' + flexygo.localization.translate('develop.mailmanager') + '</span>').on('click', (event) => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = (obj.objectName) ? obj.getConfig() : null;
                        let defaults = {
                            'ObjectName': (cnf) ? cnf.ObjectName : '',
                            'KeyProperty': (cnf) ? (cnf.KeyFields.length === 1) ? cnf.KeyFields[0] : '' : '',
                        };
                        flexygo.nav.openPage('edit', 'Mail_Object_Config', (cnf) ? "ObjectName = '" + cnf.ObjectName + "'" : null, defaults, 'modal900x580', false, $(this));
                    }
                    else {
                        flexygo.msg.warning(flexygo.localization.translate('develop.selectobject'));
                    }
                    event.stopPropagation();
                });
                let objChatter = $('<span class="clickable"/>').html('<i class="flx-icon icon-chats icon-margin-right "></i>' + flexygo.localization.translate('develop.chatter') + '</span>').on('click', (event) => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = (obj.objectName) ? obj.getConfig() : null;
                        let defaults = {
                            'ObjectName': (cnf) ? cnf.ObjectName : '',
                            'ObjectPK': (cnf) ? (cnf.KeyFields.length === 1) ? cnf.KeyFields[0] : '' : '',
                        };
                        flexygo.nav.openPage('edit', 'sysChatter_Config', (cnf) ? "ObjectName = '" + cnf.ObjectName + "'" : null, defaults, 'modal900x580', false, $(this));
                    }
                    else {
                        flexygo.msg.warning(flexygo.localization.translate('develop.selectobject'));
                    }
                    event.stopPropagation();
                });
                //add object and collection  options to the pannel
                let newObjectStr = '<span class="newObject" title="New Object" ><i class="size-m txt-outstanding  flx-icon icon-password icon-margin-right pull-right"></i></span>';
                panelCtx.add('<span><i class="flx-icon icon-object icon-margin-right"></i>' + flexygo.localization.translate('develop.object') + newObjectStr + '</span>', [objConfig, objView, objWizard, objProcesses, objImageManager, objDocumentManager, objChatter, objMailManager]);
                $(panelCtx).find('.newObject').on('click', (event) => {
                    flexygo.nav.openPageName('syspage-generic-objectwizard', 'sysObject', '', 'null', 'current', false);
                    event.stopPropagation();
                });
                //End object options
                //Collection options
                let colConfig = $('<span class="clickable"/>').html('<i class="flx-icon icon-modules-settings icon-margin-right "></i>' + flexygo.localization.translate('develop.settings') + '</span>').on('click', (event) => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = obj.getConfig();
                        flexygo.nav.openPage('edit', 'sysObject', "Objectname='" + cnf.ParentName + "'", null, 'popup', true);
                    }
                    else {
                        flexygo.msg.warning(flexygo.localization.translate('develop.selectobject'));
                    }
                    event.stopPropagation();
                });
                let colProcesses = $('<span class="clickable"/>').html('<i class="flx-icon icon-flow-chart-2 icon-margin-right "></i>' + flexygo.localization.translate('develop.processes') + '</span>').on('click', (event) => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = obj.getConfig();
                        let hist = new flexygo.nav.FlexygoHistory;
                        setObjectProcessHistory(hist, cnf.ParentName);
                        flexygo.nav.openPage('list', 'sysObjectProcesses', `Objects_Processes.ObjectName in (Select ObjectName from Objects where offline=0)`, null, 'current', false, $(this), false, hist, '');
                    }
                    else {
                        flexygo.msg.warning(flexygo.localization.translate('develop.selectobject'));
                    }
                    event.stopPropagation();
                });
                panelCtx.add('<span><i class="flx-icon icon-bullet-list-3 icon-margin-right"></i>' + flexygo.localization.translate('develop.collection') + '</span>', [colConfig, colProcesses]);
                //End collection options
                //module options
                panelCtx.add('<span><i class="flx-icon icon-icons icon-margin-right"></i>' + flexygo.localization.translate('develop.modules') + '</span>', manage);
                //End module options
                //security options
                let securityUsers = $('<span class="clickable"/>').html('<i class="flx-icon icon-user-3 icon-margin-right "></i>' + flexygo.localization.translate('develop.users') + '</span>').on('click', (event) => {
                    flexygo.nav.openPage('list', 'sysUsers', '', null, 'current', false);
                });
                let securityRoles = $('<span class="clickable"/>').html('<i class="flx-icon icon-group1 icon-margin-right "></i>' + flexygo.localization.translate('develop.roles') + '</span>').on('click', (event) => {
                    flexygo.nav.openPage('list', 'sysRoles', '', null, 'current', false);
                });
                let objProcessSecurity = $('<span class="clickable"/>').html('<i class="flx-icon icon-process icon-margin-right "></i>' + flexygo.localization.translate('develop.objectprocesssecurity') + '</span>').on('click', (event) => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = obj.getConfig();
                        flexygo.nav.openPageName('syspage-generic-objectprocesssecurity', 'sysObject', "Objectname='" + cnf.ObjectName + "'", 'null', 'current', false);
                    }
                    else {
                        flexygo.msg.info(flexygo.localization.translate('develop.selectobject'));
                    }
                });
                let objPropertySecurity = $('<span class="clickable"/>').html('<i class="flx-icon icon-object-properties-2 icon-margin-right "></i>' + flexygo.localization.translate('develop.objectpropertysecurity') + '</span>').on('click', () => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = obj.getConfig();
                        flexygo.nav.openPageName('syspage-generic-objectpropertysecurity', 'sysObject', "Objectname='" + cnf.ObjectName + "'", 'null', 'current', false);
                    }
                    else {
                        flexygo.msg.info(flexygo.localization.translate('develop.selectobject'));
                    }
                });
                let objSecurity = $('<span class="clickable"/>').html('<i class="flx-icon icon-object icon-margin-right "></i>' + flexygo.localization.translate('develop.objectsecurity') + '</span>').on('click', () => {
                    let selectObjectname = $('.sysObjConfigCombo flx-dbcombo').val();
                    if (selectObjectname) {
                        let obj = new flexygo.obj.Entity(selectObjectname);
                        let cnf = obj.getConfig();
                        flexygo.nav.openPageName('syspage-generic-objectsecurity', 'sysObject', "Objectname='" + cnf.ObjectName + "'", 'null', 'popup', false);
                    }
                    else {
                        flexygo.msg.info(flexygo.localization.translate('develop.selectobject'));
                    }
                });
                panelCtx.add('<span><i class="flx-icon icon-group-security icon-margin-right"></i>' + flexygo.localization.translate('develop.security') + '</span>', [securityUsers, securityRoles, objSecurity, objProcessSecurity, objPropertySecurity]);
                //End security options
                container.append(panel);
            }
            //Add responsive functions
            let resp = $('<div id="responsivePanels" />');
            let desktopIcon = $('<div class="respDesktop"><i class="flx-icon icon-desktop-1"></i></div>');
            let TabletPortraitIcon = $('<div class="respTabletPortrait"><i class="flx-icon icon-tablet-1"></i></div>');
            let TabletLandscapeIcon = $('<div class="respTabletLandscape"><i class="flx-icon icon-tablet-1 icon-rotate-90"></i></div>');
            let MobilePortraitIcon = $('<div class="respMobilePortrait"><i class="flx-icon icon-mobile"></i></div>');
            let MobileLandscapeIcon = $('<div class="respMobileLandscape"><i class="flx-icon icon-mobile icon-rotate-90"></i></div>');
            resp.append(desktopIcon).append(TabletPortraitIcon).append(TabletLandscapeIcon).append(MobilePortraitIcon).append(MobileLandscapeIcon);
            resp.children(':not(.respDesktop)').on('click', (e) => {
                let element = $(e.target);
                if (element.is('i.flx-icon')) {
                    element = element.closest('div');
                }
                let myIframe = $('#responsiveFrame');
                if (myIframe.length == 0) {
                    myIframe = $('<div id="responsiveFrame" onclick="$(this).remove();"><div><div id="respDevice"><iframe src="' + document.location.href + '" /></div></div></div>');
                    $('body').append(myIframe);
                }
                myIframe.find('#respDevice').attr('class', element.attr('class') + 'Frame');
            });
            resp.children('.respDesktop').on('click', () => {
                $('#responsiveFrame').remove();
            });
            container.append(resp);
            return container.children();
        }
        debug.getPagePanel = getPagePanel;
        function setObjectProcessHistory(hist, filterValue) {
            let activeFilter = "754cb48e-09f9-4d41-b9ef-fb85a8610119";
            let modulename = "sysmod-list-generic";
            let filters = [];
            filters.push({
                objectname: "sysObjectProcess",
                objectproperty: "ObjectName",
                objectpath: "sysObjectProcess",
                value: filterValue,
                text: "",
                filtertype: "dbcombo"
            });
            flexygo.utils.saveFilterValueHistory(hist, modulename, activeFilter, filters);
        }
        function getSQLColumnsSuggestions(tables, range, ConnStringId, SpecificTable) {
            let ConnStringList = {};
            let suggestions = [];
            let isSubquery;
            //check if there are tables
            if (tables.length > 0 && tables.some(value => !flexygo.utils.isBlank(value)) || !flexygo.utils.isBlank(SpecificTable)) {
                //Check if is a column suggestion of specific table
                let anSpecificTable = !flexygo.utils.isBlank(SpecificTable);
                let explicitConnStringId = ConnStringId;
                for (let table of tables) {
                    let key = table.DataConnection;
                    if (anSpecificTable) {
                        if (/[{}~.]|dbo./g.exec(SpecificTable)) {
                            let text = SpecificTable.split('.');
                            explicitConnStringId = SpecificTable.replace(/[{}~.]|dbo/g, '').trim();
                            SpecificTable = text[text.length - 1];
                        }
                        if (SpecificTable.toLowerCase() == table.TableAlias.toLowerCase()) {
                            SpecificTable = table.Name;
                            if (/^#SUBQUERY_\d+#$/i.exec(SpecificTable)) {
                                isSubquery = true;
                            }
                            explicitConnStringId = key;
                            break;
                        }
                    }
                    if (ConnStringList[key]) {
                        ConnStringList[key].add(table.Name);
                    }
                    else {
                        ConnStringList[key] = new Set([table.Name]);
                    }
                }
                if (anSpecificTable) {
                    if (isSubquery) {
                        for (let column of tables.find(obj => obj.Name === SpecificTable).Columns) {
                            let canBeNull = column.CanBeNull ? 'null' : 'not null';
                            let comment = `${column.DataType},${canBeNull}`;
                            suggestions.push({
                                label: column.ColumnName,
                                detail: `Subquery ${column.TableName}`,
                                kind: monaco.languages.CompletionItemKind.Field,
                                documentation: `column ${column.ColumnName}(${comment})`,
                                insertText: column.ColumnName,
                                range: range,
                            });
                        }
                    }
                    else {
                        for (let Connection of Object.keys(DBSchema)) {
                            if (Connection.toLowerCase() == explicitConnStringId.toLowerCase()) {
                                for (let table of Object.keys(DBSchema[Connection])) {
                                    if (table.toLowerCase() == SpecificTable.toLowerCase()) {
                                        for (let column of DBSchema[Connection][table]) {
                                            let constraint = column.IsPrimaryKey ? 'PK' : column.IsForeignKey ? 'FK' : '';
                                            let canBeNull = column.CanBeNull ? 'null' : 'not null';
                                            let comment = constraint == '' ? `${column.DataType},${canBeNull}` : `${constraint},${column.DataType},${canBeNull}`;
                                            suggestions.push({
                                                label: column.ColumnName,
                                                detail: column.TableName,
                                                kind: monaco.languages.CompletionItemKind.Field,
                                                documentation: `column ${column.ColumName}(${comment})`,
                                                insertText: column.ColumnName,
                                                range: range,
                                            });
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    Object.keys(ConnStringList).forEach(ConnStringId => {
                        for (let Connection of Object.keys(DBSchema)) {
                            if (Connection.toLowerCase() == ConnStringId.toLowerCase()) {
                                for (let table of ConnStringList[ConnStringId]) {
                                    if (/^#SUBQUERY_\d+#$/i.exec(table)) {
                                        for (let column of tables.find(obj => obj.Name === table).Columns) {
                                            let canBeNull = column.CanBeNull ? 'null' : 'not null';
                                            let comment = `${column.DataType},${canBeNull}`;
                                            suggestions.push({
                                                label: column.ColumnName,
                                                detail: `Subquery ${column.TableName}`,
                                                kind: monaco.languages.CompletionItemKind.Field,
                                                documentation: `column ${column.ColumnName}(${comment})`,
                                                insertText: column.ColumnName,
                                                range: range,
                                            });
                                        }
                                    }
                                    else {
                                        for (let storedTable of Object.keys(DBSchema[Connection])) {
                                            if (storedTable.toLowerCase() == table.toLowerCase()) {
                                                for (let column of DBSchema[Connection][storedTable]) {
                                                    let constraint = column.IsPrimaryKey ? 'PK' : column.IsForeignKey ? 'FK' : '';
                                                    let canBeNull = column.CanBeNull ? 'null' : 'not null';
                                                    let comment = constraint == '' ? `${column.DataType},${canBeNull}` : `${constraint},${column.DataType},${canBeNull}`;
                                                    suggestions.push({
                                                        label: column.ColumnName,
                                                        detail: column.TableName,
                                                        kind: monaco.languages.CompletionItemKind.Field,
                                                        documentation: `column ${column.ColumnName}(${comment})`,
                                                        insertText: column.ColumnName,
                                                        range: range,
                                                    });
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
                return suggestions;
            }
        }
        var DBSchema = {};
        function getSQLTablesSuggestions(ConnStringId, range) {
            let suggestions = [];
            for (let table of Object.keys(DBSchema[ConnStringId])) {
                suggestions.push({
                    label: table,
                    kind: monaco.languages.CompletionItemKind.Constant,
                    insertText: table,
                    range: range
                });
            }
            return suggestions;
        }
        function getLanguageSuggestions(range) {
            let keywordSuggestions = [];
            let otherSuggestions = [];
            for (let keyword of monacoVars.keywords.sql) {
                keywordSuggestions.push({
                    label: keyword,
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: keyword,
                    range: range,
                    sortText: 'a'
                });
            }
            for (let variable of monacoVars.keywords.builtinVariables) {
                otherSuggestions.push({
                    label: variable,
                    kind: monaco.languages.CompletionItemKind.Variable,
                    insertText: variable,
                    range: range,
                    sortText: 'd'
                });
            }
            for (let func of monacoVars.keywords.builtinFunctions) {
                otherSuggestions.push({
                    label: func,
                    kind: monaco.languages.CompletionItemKind.Function,
                    insertText: flexygo.string.format("{0}()", func),
                    range: range,
                    sortText: 'c'
                });
            }
            for (let operator of monacoVars.keywords.operators) {
                otherSuggestions.push({
                    label: operator,
                    kind: monaco.languages.CompletionItemKind.Operator,
                    insertText: operator,
                    range: range,
                    sortText: 'b'
                });
            }
            // Combina las sugerencias de palabras clave con las demás sugerencias
            let suggestions = keywordSuggestions.concat(otherSuggestions);
            return suggestions;
        }
        function discardSubQueries(content, reverse) {
            let insideParentheses = false;
            let closeParenthesisIndex = -1;
            let openParenthesisIndex = -1;
            let parenthesisCount = 0;
            let initialQuery = content;
            let validadeParenthesis = [];
            let subqueries = new Map();
            let subqueryCounter = 0;
            for (let i = content.length - 1; i >= 0; i--) {
                const char = content[i];
                if (char === (reverse ? "(" : ")")) {
                    if (validadeParenthesis.length > 0 && !validadeParenthesis[validadeParenthesis.length - 1]) {
                        reverse ? parenthesisCount-- : null;
                        if (parenthesisCount == 0) {
                            closeParenthesisIndex = i;
                        }
                        !reverse ? parenthesisCount++ : null;
                    }
                    validadeParenthesis.pop();
                }
                else if (char === (reverse ? ")" : "(")) {
                    //If the parenthesis belongs to a function, it will be ignored for discard subquery process
                    const ignoreParenthesis = monacoVars.keywords.builtinFunctions.some(aggregateFunction => {
                        const sentenceToCurrentPosition = reverse ? content.substring(content.length, i) : content.substring(0, i);
                        const lowercaseAggregateFunction = reverse ? aggregateFunction.split('').reverse().join('').toLowerCase() : aggregateFunction.toLowerCase();
                        let regex = new RegExp(`\\b${lowercaseAggregateFunction}\\b`, 'im');
                        let afterColon = new RegExp(` ?, ?`, 'im');
                        let match = sentenceToCurrentPosition.match(regex);
                        let match2 = sentenceToCurrentPosition.match(afterColon);
                        if ((match === null || match === void 0 ? void 0 : match.index) !== -1 && (reverse ? (match === null || match === void 0 ? void 0 : match.index) === 1 : (match === null || match === void 0 ? void 0 : match.index) + lowercaseAggregateFunction.length === i)) {
                            return true;
                        }
                        else if ((match2 === null || match2 === void 0 ? void 0 : match2.index) !== -1 && (reverse ? (match2 === null || match2 === void 0 ? void 0 : match2.index) === 1 : (match2 === null || match2 === void 0 ? void 0 : match2.index) + lowercaseAggregateFunction.length === i)) {
                            return true;
                        }
                        return false;
                    });
                    if (!ignoreParenthesis) {
                        parenthesisCount += reverse ? 1 : -1;
                        openParenthesisIndex = i;
                    }
                    validadeParenthesis.push(ignoreParenthesis);
                }
                if (parenthesisCount == 0 && openParenthesisIndex != -1 && closeParenthesisIndex != -1) {
                    let replacementstring = "";
                    let idSubquery;
                    let isTableSubquery;
                    let currentContent = "";
                    idSubquery = `#subquery_${subqueryCounter}#`;
                    replacementstring = ` [${idSubquery}] `;
                    if (reverse) {
                        content = content.substring(0, closeParenthesisIndex).trim() + replacementstring.split('').reverse().join('') + content.substring(content.length, openParenthesisIndex + 1);
                        currentContent = content.split('').reverse().join('');
                    }
                    else {
                        subqueries.set(replacementstring.trim(), initialQuery.substring(openParenthesisIndex + 1, closeParenthesisIndex));
                        content = content.substring(0, openParenthesisIndex).trim() + replacementstring + content.substring(closeParenthesisIndex + 1, content.length);
                        currentContent = content;
                    }
                    let regx = new RegExp(`(\\w+)\\s*${flexygo.string.format("\\[{0}\\]", idSubquery)}`);
                    isTableSubquery = currentContent.match(regx);
                    if (isTableSubquery && (isTableSubquery[1].toLowerCase() == 'join' || isTableSubquery[1].toLowerCase() == 'from' || isTableSubquery[1].toLowerCase() == 'apply')) {
                        let query = reverse ? initialQuery.substring(openParenthesisIndex, closeParenthesisIndex + 1).split('').reverse().join('') : initialQuery.substring(openParenthesisIndex + 1, closeParenthesisIndex);
                        reverse ? query = query.replace(/[()]/g, (match) => {
                            return match === '(' ? ')' : '(';
                        }) : null;
                        subqueries.set(replacementstring.trim(), query);
                    }
                    openParenthesisIndex = -1;
                    closeParenthesisIndex = -1;
                    subqueryCounter++;
                }
            }
            if (parenthesisCount < 0) {
                insideParentheses = true;
            }
            return [content, insideParentheses, subqueries];
        }
        function extractCurrentSentence(beginSentence, reverse = false, inSubquery = false, endSentence = null) {
            let BeginSentenceKeyWords = [
                'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP',
                'TRUNCATE', 'MERGE', 'GRANT', 'REVOKE', 'DECLARE', 'EXEC',
                'BEGIN', 'COMMIT', 'ROLLBACK', 'OUTER APPLY', 'CROSS APPLY'
            ];
            let lastKeywordIndex = -1;
            let currentSentence = "";
            let sentence = beginSentence;
            if (!flexygo.utils.isBlank(endSentence)) {
                sentence = beginSentence + endSentence;
            }
            reverse ?
                sentence = sentence.split('').reverse().join('').replace(/[()]/g, (match) => {
                    return match === '(' ? ')' : '(';
                })
                : null;
            let values = discardSubQueries(sentence, reverse);
            sentence = values[0];
            let insideParenthesis = values[1];
            let subqueries = values[2];
            reverse ?
                sentence = sentence.split('').reverse().join('').replace(/[()]/g, (match) => {
                    return match === '(' ? ')' : '(';
                })
                : null;
            currentSentence = !flexygo.utils.isBlank(endSentence) ? sentence.substring(beginSentence.length) : sentence;
            if (!inSubquery) {
                for (let keyword of BeginSentenceKeyWords) {
                    let regex = new RegExp(`\\b${keyword}\\b`, 'i');
                    let match = sentence.match(regex);
                    if (match) {
                        lastKeywordIndex = Math.max(lastKeywordIndex, match.index);
                    }
                }
                if (lastKeywordIndex !== -1 && lastKeywordIndex != 0) {
                    currentSentence = reverse ? currentSentence.substring(0, lastKeywordIndex) : currentSentence.substring(lastKeywordIndex);
                }
            }
            else {
                if (insideParenthesis) {
                    currentSentence = currentSentence.substring(0, currentSentence.indexOf(')'));
                }
            }
            return [currentSentence.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' '), insideParenthesis, subqueries];
        }
        /**
         * return an array of css classes.
         * @method getSuggestions
         * @param {object} range - cursor position of monaco editor.
         * @param {Array} styles - css classes available
         * @param {Array} classes - current classes of htmlElement
         * @return {Array} - suggestions array.
         */
        function getCssSuggestions(range, styles, classes) {
            let suggestions = [];
            for (let i = 0; i < styles.length; i++) {
                if (!classes.includes(styles[i])) {
                    suggestions.push({
                        label: styles[i],
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: styles[i],
                        range: range,
                    });
                }
            }
            return suggestions;
        }
        /**
         * return an array of css classes.
         * @method getSuggestions
         * @return {Array} - suggestions array.
         */
        function loadMonacoLibraries() {
            if (Object.keys(monaco.languages.typescript.javascriptDefaults.getExtraLibs()).length == 0) {
                let cacheResponse = flexygo.storage.cache.get('monacoDefinitions', { developMode: true });
                let libraries;
                let styles;
                if (!cacheResponse || cacheResponse && flexygo.utils.isBlank(cacheResponse.response)) {
                    flexygo.ajax.syncPost('~/api/Sys', 'loadMonacoDefinitions', null, (response) => {
                        if (response) {
                            libraries = response["javascript"];
                            styles = response["css"];
                            flexygo.storage.cache.add('monacoDefinitions', { developMode: true }, response, 1440);
                        }
                    });
                }
                else {
                    libraries = cacheResponse.response["javascript"];
                }
                flexygo.ui.wc.FlxCodeElement.setTypeScriptLibraries(libraries);
                monaco.languages.typescript.javascriptDefaults.setExtraLibs(libraries);
                //Object.keys(libraries).forEach((key) => {
                //    monaco.languages.typescript.javascriptDefaults.addExtraLib(
                //        libraries[key].Content,
                //        `ts:${libraries[key].Path}`
                //    );
                //});
            }
        }
        function GetSqlSuggestions(model, position, availableConnections) {
            return __awaiter(this, void 0, void 0, function* () {
                let sqlSuggestions = {};
                let contentUntilPosition = model.getValueInRange({
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column
                });
                let word = model.getWordUntilPosition(position);
                let range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn,
                };
                let ConnStringformated = "";
                let currentCodeEditor = $(document.activeElement).closest('flx-code')[0];
                if (!currentCodeEditor.intellisense) {
                    return { suggestions: [] };
                }
                else {
                    let flxEdit = $(document.activeElement).closest("flx-edit")[0];
                    let connStringProperty = $(flxEdit).find("[property='ConnStringId']")[0];
                    let currentConnStringId = connStringProperty ? $(connStringProperty).attr("value") : null;
                    if (!currentConnStringId) {
                        let context = new flexygo.obj.Entity($(flxEdit).attr("objectname"), $(flxEdit).closest('flx-edit').attr("objectwhere"));
                        context.read();
                        currentConnStringId = context.getConfig()["ConnStringId"];
                    }
                    let values = extractCurrentSentence(contentUntilPosition);
                    let firstPartOfSentence = values[0].toString();
                    let inSubquery = values[1];
                    let subqueries = values[2];
                    let words = model.getLineContent(position.lineNumber).substring(0, position.column - 1).trim().split(/\s+/);
                    let lastWord = words[words.length - 1] ? words[words.length - 1] : "";
                    let specificTable = null;
                    if (lastWord.indexOf(",") != -1) {
                        let words = lastWord.split(",");
                        lastWord = words[words.length - 1];
                    }
                    if (lastWord.indexOf("=") != -1) {
                        let words = lastWord.split("=");
                        lastWord = words[words.length - 1];
                    }
                    if (lastWord.indexOf(".") != -1) {
                        specificTable = lastWord.replace(/[\[\]]/g, '').replace(/\..*/, '');
                    }
                    else {
                        specificTable = null;
                    }
                    let PromiseMatches = [];
                    let insideOfCondition = false;
                    try {
                        //column suggestion in SELECT or inside of agreggation function between SELECT and FROM
                        PromiseMatches = [
                            flexygo.utils.checkRegexWithWorker(monacoVars.regexCorrection.selectColumnSuggestion, firstPartOfSentence),
                            flexygo.utils.checkRegexWithWorker(monacoVars.regexCorrection.BeginAggregationColumnSuggestion, firstPartOfSentence)
                        ];
                        yield Promise.all(PromiseMatches).then((matches) => {
                            insideOfCondition = matches.some((match) => match === true);
                            if (insideOfCondition && !/from/i.exec(firstPartOfSentence)) {
                                let secondPartOfSentence = model.getValueInRange({
                                    startLineNumber: position.lineNumber,
                                    startColumn: position.column,
                                    endLineNumber: model.getLineCount(),
                                    endColumn: model.getLineMaxColumn(model.getLineCount())
                                });
                                values = extractCurrentSentence(firstPartOfSentence, true, inSubquery, secondPartOfSentence);
                                secondPartOfSentence = values[0];
                                subqueries = values[2];
                                //checks whether the first word that is NOT preceded by ',' or 'as' is 'from' or the first word is 'from'
                                if (/(?<!, |,|^)(?!AS\s)from\b/i.exec(secondPartOfSentence) || /^from/.exec(secondPartOfSentence.trim())) {
                                    let extractedTables = flexygo.utils.extractTables(secondPartOfSentence, currentConnStringId, subqueries);
                                    if (extractedTables) {
                                        sqlSuggestions = { suggestions: getSQLColumnsSuggestions(extractedTables, range, currentConnStringId, specificTable) };
                                        return;
                                    }
                                }
                            }
                        });
                        if (insideOfCondition) {
                            return sqlSuggestions;
                        }
                        //column suggestions in "UPDATE {TABLE} SET " or in "WHERE CONDITION OF UPDATE"
                        PromiseMatches = [
                            flexygo.utils.checkRegexWithWorker(monacoVars.regexCorrection.updateColumnSuggestion, firstPartOfSentence),
                            flexygo.utils.checkRegexWithWorker(monacoVars.regexCorrection.whereinUpdateColumnSuggestion, firstPartOfSentence)
                        ];
                        yield Promise.all(PromiseMatches).then((matches) => {
                            insideOfCondition = matches.some((match) => match === true);
                            if (insideOfCondition) {
                                let tablename = [/UPDATE\s+([\s\S]*?)\s+SET/im.exec(firstPartOfSentence)[1].replace(/[\[\]]/g, "")];
                                sqlSuggestions = {
                                    suggestions: getSQLColumnsSuggestions(tablename, range, currentConnStringId)
                                };
                                return;
                            }
                        });
                        if (insideOfCondition) {
                            return sqlSuggestions;
                        }
                        //column suggestions in WHERE CONDITION OF SELECT or  in {[LEFT|RIGHT|INNER] JOIN} {TABLE} {ON}
                        PromiseMatches = [
                            flexygo.utils.checkRegexWithWorker(monacoVars.regexCorrection.whereinSelectColumnSuggestion, firstPartOfSentence),
                            flexygo.utils.checkRegexWithWorker(monacoVars.regexCorrection.joinOnColumnSuggestion, firstPartOfSentence)
                        ];
                        yield Promise.all(PromiseMatches).then((matches) => {
                            insideOfCondition = matches.some((match) => match === true);
                            if (insideOfCondition) {
                                let extractedTables = flexygo.utils.extractTables(firstPartOfSentence, currentConnStringId, subqueries);
                                sqlSuggestions = {
                                    suggestions: getSQLColumnsSuggestions(extractedTables, range, currentConnStringId, specificTable)
                                };
                                return;
                            }
                        });
                        if (insideOfCondition) {
                            return sqlSuggestions;
                        }
                        //column suggestions in WHERE CONDITION OF DELETE
                        PromiseMatches = [
                            flexygo.utils.checkRegexWithWorker(monacoVars.regexCorrection.whereinDeleteColumnSuggestion, firstPartOfSentence)
                        ];
                        yield Promise.all(PromiseMatches).then((matches) => {
                            insideOfCondition = matches.some((match) => match === true);
                            if (insideOfCondition) {
                                let table = [firstPartOfSentence.substring(firstPartOfSentence.indexOf("from") + 'from'.length, firstPartOfSentence.indexOf("where")).trim()];
                                sqlSuggestions = {
                                    suggestions: getSQLColumnsSuggestions(table, range, currentConnStringId, specificTable)
                                };
                                return;
                            }
                        });
                        if (insideOfCondition) {
                            return sqlSuggestions;
                        }
                        //column suggestions in GROUP BY and ORDER BY
                        PromiseMatches = [
                            flexygo.utils.checkRegexWithWorker(monacoVars.regexCorrection.groupAndOrderColumnSuggestion, firstPartOfSentence)
                        ];
                        yield Promise.all(PromiseMatches).then((matches) => {
                            insideOfCondition = matches.some((match) => match === true);
                            if (insideOfCondition) {
                                let extractedTables = flexygo.utils.extractTables(firstPartOfSentence, currentConnStringId, subqueries);
                                sqlSuggestions = {
                                    suggestions: getSQLColumnsSuggestions(extractedTables, range, currentConnStringId, specificTable)
                                };
                                return;
                            }
                        });
                        if (insideOfCondition) {
                            return sqlSuggestions;
                        }
                        //column suggestion in AGGREGATION FUNCTIONS OF HAVING
                        PromiseMatches = [
                            flexygo.utils.checkRegexWithWorker(monacoVars.regexCorrection.EndAggregationColumnSuggestion, firstPartOfSentence)
                        ];
                        yield Promise.all(PromiseMatches).then((matches) => {
                            insideOfCondition = matches.some((match) => match === true);
                            if (insideOfCondition) {
                                let extractedTables = flexygo.utils.extractTables(firstPartOfSentence, currentConnStringId, subqueries);
                                sqlSuggestions = {
                                    suggestions: getSQLColumnsSuggestions(extractedTables, range, currentConnStringId, specificTable)
                                };
                                return;
                            }
                        });
                        if (insideOfCondition) {
                            return sqlSuggestions;
                        }
                        if (lastWord && monacoVars.regexCorrection.explicitConnRegex.exec(lastWord)) {
                            return {
                                suggestions: [{
                                        label: "dbo",
                                        kind: monaco.languages.CompletionItemKind.Struct,
                                        insertText: "dbo",
                                        range: range
                                    }]
                            };
                        }
                        //CONNECTION suggestions
                        if (lastWord && /{~(\w+)?$/.exec(lastWord)) {
                            let suggestions = [];
                            for (let connection of availableConnections) {
                                suggestions.push({
                                    label: connection.ConnStringid,
                                    kind: monaco.languages.CompletionItemKind.Reference,
                                    detail: connection.Descrip,
                                    insertText: connection.ConnStringid,
                                    range: range,
                                });
                            }
                            return {
                                suggestions: suggestions
                            };
                        }
                        //TABLE suggestions
                        //find if explicit ConnStringId exists
                        if (lastWord && monacoVars.regexCorrection.explicitConnSchemaRegex.exec(lastWord)) { // {~ConnStringId~}.
                            ConnStringformated = lastWord.split(".")[0];
                            ConnStringformated = ConnStringformated.substring(0, ConnStringformated.lastIndexOf("}"));
                            ConnStringformated = ConnStringformated.replace(/[{}~.]/g, '');
                            if (availableConnections.find(item => item.ConnStringid === ConnStringformated)) {
                                firstPartOfSentence = firstPartOfSentence.replace(/\s+\S+$/, ' '); //removing the ConnStringId of the content
                            }
                        }
                        ConnStringformated = flexygo.utils.isBlank(ConnStringformated) ? currentConnStringId : ConnStringformated;
                        if (monacoVars.regexCorrection.tableSuggestionRegex.exec(firstPartOfSentence)) {
                            return { suggestions: getSQLTablesSuggestions(ConnStringformated, range) };
                        }
                        return { suggestions: getLanguageSuggestions(range) };
                    }
                    catch (error) {
                        console.log(error);
                        return { suggestions: [] };
                    }
                }
            });
        }
        /**
         * Returns if develop mode is enabled.
         * @method isDevelopMode
         * @return {bool} - develop mode enabled
         */
        function isDevelopMode() {
            if (flexygo.storage.session.get('DevelopMode')) {
                configureMonaco();
                return true;
            }
            else {
                return false;
            }
        }
        debug.isDevelopMode = isDevelopMode;
        function configureMonaco() {
            let waitForMonaco = () => {
                return new Promise(function (resolve) {
                    if (typeof monaco !== 'undefined' && monaco !== null) {
                        resolve(true);
                    }
                    else {
                        var intervalo = setInterval(function () {
                            if (typeof monaco !== 'undefined' && monaco !== null) {
                                clearInterval(intervalo);
                                resolve(true);
                            }
                        }, 100);
                    }
                });
            };
            if ($(document.head).find('script[class="monaco"]').length == 0) {
                $(document.head).append(`<script class="monaco" defer src="${flexygo.utils.resolveUrl('~/js/plugins/monaco-editor/promise.js')}"/>`);
                $(document.head).append(`<script class="monaco" defer src="${flexygo.utils.resolveUrl('~/js/plugins/monaco-editor/min/vs/loader.js')}"/>`);
                $(document.head).append(`<script class="monaco" defer src="${flexygo.utils.resolveUrl('~/js/plugins/monaco-editor/min/vs/editor/editor.main.nls.js')}"/>`);
                $(document.head).append(`<script class="monaco" defer src="${flexygo.utils.resolveUrl('~/js/plugins/monaco-editor/min/vs/editor/editor.main.js')}"/>`);
                $(document.head).append(`<script class="monaco" defer src="${flexygo.utils.resolveUrl('~/js/plugins/monaco-editor/monacoVars.js')}"/>`);
                //Get the SQL SCHEMA from all connectionString
                flexygo.ajax.post('~/api/Sys', 'getDBSchema', {}, (response) => {
                    if (response) {
                        DBSchema = response;
                    }
                });
                waitForMonaco().then(function () {
                    loadMonacoLibraries();
                    //Autocompletion HTML provider
                    let styles = flexygo.storage.cache.get('monacoDefinitions', { developMode: true }).response["css"];
                    monaco.languages.registerCompletionItemProvider('html', {
                        provideCompletionItems: function (model, position) {
                            let currentCodeEditor = $(document.activeElement).closest('flx-code')[0];
                            if (currentCodeEditor.intellisense) {
                                let contentUntilPosition = model.getValueInRange({
                                    startLineNumber: 1,
                                    startColumn: 1,
                                    endLineNumber: position.lineNumber,
                                    endColumn: position.column
                                });
                                let wordUntilPosition = model.getWordUntilPosition(position);
                                let match = /<[^<>\s]+[^<>\w]*class="([^"]*)[^"]*$/.exec(contentUntilPosition);
                                if (match) {
                                    let classes = match[1].split(' ');
                                    let suggestions = [];
                                    let range = {
                                        startLineNumber: position.lineNumber,
                                        endLineNumber: position.lineNumber,
                                        startColumn: wordUntilPosition.startColumn,
                                        endColumn: wordUntilPosition.endColumn,
                                    };
                                    return { suggestions: getCssSuggestions(range, styles, classes) };
                                }
                            }
                            return { suggestions: [] };
                        }
                    });
                    //AUTOCOMPLETION SQL
                    let ob = new flexygo.obj.Entity('sysObject');
                    ob.read();
                    let availableConnections = ob.getView('CnnStrings');
                    try {
                        monaco.languages.registerCompletionItemProvider('sql', {
                            provideCompletionItems: (model, position) => {
                                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                                    let suggestions = yield GetSqlSuggestions(model, position, availableConnections);
                                    resolve(suggestions);
                                }));
                            }
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                });
            }
            else {
                waitForMonaco().then(function () { loadMonacoLibraries(); });
            }
        }
        /**
         * Displays develop mode animation.
         * @method launchAnimation
         */
        function launchAnimation() {
            let anim = '';
            anim += '<div id="debugBackground">';
            anim += '<table style="margin: 0 auto;height:300px;">';
            anim += '  <tr>';
            anim += '    <td><canvas id="devFirstBracket" width=40 height=120></canvas></td>';
            anim += '    <td><div id="developerLogo" style="width: 500px;">Developer</div></td>';
            anim += '    <td><canvas id="devLastBracket" width=40 height=120></canvas></td>';
            anim += '  </tr>';
            anim += '</table>';
            anim += '</div>';
            $('body').append(anim);
            $('body').on('click.debug', function () {
                $('#debugBackground').remove();
                $('body>.ui-effects-wrapper').remove();
                $('body').off('click.debug');
            });
            $('#developerLogo').textillate({
                autoStart: false,
                in: {
                    delayScale: 2, delay: 40, effect: 'flipInY', callback: function () {
                        $('#debugBackground').hide('clip', null, 400, function () { $('#debugBackground').remove(); $('body>.ui-effects-wrapper').remove(); $('body').off('click.debug'); });
                    }
                }
            });
            $('#debugBackground').show('fold', null, 500, function () {
                setTimeout("flexygo.debug._drawText($('#devFirstBracket'),'{');", 500);
                setTimeout("flexygo.debug._drawText($('#devLastBracket'),'}');", 500);
                $('#developerLogo').textillate('start');
            });
        }
        debug.launchAnimation = launchAnimation;
        function launchOriginAnimation() {
            let anim = $(`<div id="debugBackground">
            <table>
                <span id="developOriginSelector">
                    <div>${flexygo.localization.translate('originSelector.title')}</div>
                    <div>
                        <div origin="0" class="system  ${flexygo.context.currentOriginId !== '0' ? 'muted' : ''}">
                            <span>
                                <i class="flx-icon icon-settings-12"></i>
                                <div>0. System</div>
                            </span>
                        </div>
                        <div origin="1" class="product ${flexygo.context.currentOriginId !== '1' ? 'muted' : ''}">
                            <span>
                                <i class="flx-icon icon-object-1"></i>
                                <div>1. Product</div>
                            </span>
                        </div>
                        <div origin="2" class="project ${flexygo.context.currentOriginId !== '2' ? 'muted' : ''}">
                            <span>
                                <i class="flx-icon icon-folder-41"></i>
                                <div>2. Project</div>
                            </span>
                        </div>
                    </div>
                </span>
            </table>
        </div>`);
            anim.find('[origin]').on('mouseover', ev => {
                let current_button = ev.currentTarget;
                current_button.classList.remove('muted');
                current_button.parentElement.querySelectorAll(`:not(.${current_button.className})`).forEach(btn => {
                    btn.classList.add('muted');
                });
            }).on('mouseleave', ev => {
                let current_button = ev.currentTarget;
                if (current_button.getAttribute('origin') !== flexygo.context.currentOriginId) {
                    current_button.classList.add('muted');
                    current_button.parentElement.querySelector(`[origin='${flexygo.context.currentOriginId}']`).classList.remove('muted');
                }
            }).on('click', ev => {
                $('#debugBackground').remove();
                $('#originBackdrop').remove();
                flexygo.nav.execProcess('SetNewOrigin', 'sysObjects', null, null, [{ 'key': 'NewOriginId', 'value': ev.currentTarget.getAttribute('origin') }], 'modal640x480', false, $(this), null, false);
            });
            $('body').prepend('<div id="originBackdrop"></div>');
            $('body').append(anim);
            $('#debugBackground').show('fold', null, 500);
        }
        debug.launchOriginAnimation = launchOriginAnimation;
        /**
         * Display a window with de dependency manager
         * @method manageDependencies
         * @param {string} ObjectName - The object name
         * @param {string} PropertyName - The property name.
         * @param {string} targetid - The new window target, default: modal1024x800.
         */
        function manageDependencies(ObjectName, PropertyName, targetid) {
            if (!targetid) {
                targetid = 'modal';
            }
            let histObj = new flexygo.nav.FlexygoHistory();
            histObj.targetid = targetid;
            let modal = flexygo.targets.createContainer(histObj, true, null, true);
            modal.empty();
            modal.closest('.ui-dialog').find('.ui-dialog-title').html(flexygo.localization.translate('develop.dependencymanager') + ' - ' + ObjectName + ' ' + PropertyName);
            modal.append('<flx-dependencymanager ObjectName="' + ObjectName + '" PropertyName="' + PropertyName + '"></flx-dependencymanager>');
        }
        debug.manageDependencies = manageDependencies;
        /**
         * Display a window with de filter manager
         * @method manageFilters
         * @param {string} ObjectName - The object name
         * @param {string} targetid - The new window target, default: modal1024x800.
         * @param {boolean} generic - Specifies if the filter manager is for the main search
         * @param {any} parentModule - Specifies the module that launched managefilters
         */
        function manageFilters(ObjectName, targetid, generic, parentModule) {
            if (!targetid) {
                targetid = 'popup';
            }
            let histObj = new flexygo.nav.FlexygoHistory();
            histObj.targetid = targetid;
            let buttons = [
                {
                    name: "save",
                    text: flexygo.localization.translate('filtermanager.save'),
                    class: "btn btn-default bg-success",
                    click: function () { $(this).trigger('click'); }
                },
                {
                    name: "delete",
                    text: flexygo.localization.translate('filtermanager.delete'),
                    class: "btn btn-default bg-danger",
                    click: function () { $(this).trigger('click'); }
                }
            ];
            let modal = flexygo.targets.createContainer(histObj, true, null, true, buttons);
            let active = '';
            if (parentModule) {
                let wcFilter = parentModule.find("flx-filter")[0];
                if (wcFilter) {
                    if (wcFilter.active && wcFilter.active.length > 0) {
                        active = 'active="' + wcFilter.active + '"';
                    }
                }
            }
            modal.empty();
            modal.closest('.ui-dialog').find('.ui-dialog-title').html(flexygo.localization.translate('develop.filtermanager') + ' - ' + ObjectName);
            modal.closest('.ui-dialog').find('.ui-dialog-buttonset').attr("style", "float:left");
            modal.append('<flx-filtermanager generic="' + generic + '" ObjectName="' + ObjectName + '"' + active + '></flx-filtermanager>');
            let wcfm = modal.find('flx-filtermanager')[0];
            wcfm.parentModule = parentModule;
        }
        debug.manageFilters = manageFilters;
        /**
         * Display a window with de module manager of the current page.
         * @method manageModules
         * @param {object} targetItem - Item inside the page to configure.
         */
        function manageModules(targetItem) {
            let pageContext = flexygo.history.get(targetItem);
            if (!pageContext || typeof pageContext.pagename == 'undefined' || pageContext.pagename == null) {
                flexygo.msg.error("Can't find page name");
                return;
            }
            let histObj = new flexygo.nav.FlexygoHistory();
            histObj.targetid = 'popup1024x800';
            let modal = flexygo.targets.createContainer(histObj, true, null, true);
            //modal.closest('.ui-dialog').find('.ui-dialog-titlebar-close').remove();
            modal.empty();
            modal.closest('.ui-dialog').find('.ui-dialog-title').html(flexygo.localization.translate('develop.modulemanager'));
            modal.addClass('nopadding');
            modal.append('<flx-modulemanager pageName="' + pageContext.pagename + '" ObjectName="' + pageContext.objectname + '"></flx-modulemanager>');
            let mm = modal.find('flx-modulemanager')[0];
            mm.targetItem = targetItem;
        }
        debug.manageModules = manageModules;
        /**
         * Display a window with de node manager started with a specified node id.
         * @method manageNodes
         * @param {object} targetItem - Item inside the page to configure.
         * @param {string} NodeId - The initial node.
         */
        function manageNodes(targetItem, NodeId) {
            /*var pageContext = flexygo.history.get(targetItem);
        
            if (!pageContext || typeof pageContext.pagename == 'undefined' || pageContext.pagename == null) {
                flexygo.msg.error("Can't find page id");
                return;
            }*/
            let histObj = new flexygo.nav.FlexygoHistory();
            histObj.targetid = 'popup1024x800';
            let modal = flexygo.targets.createContainer(histObj, true, null, true);
            //modal.closest('.ui-dialog').find('.ui-dialog-titlebar-close').remove();
            modal.empty();
            modal.closest('.ui-dialog').find('.ui-dialog-title').html(flexygo.localization.translate('develop.nodemanager'));
            modal.addClass('nopadding');
            modal.append('<flx-nodemanager initNode="' + NodeId + '" ></flx-nodemanager>');
            //modal.find('flx-modulemanager').data('controller').targetItem = targetItem;
        }
        debug.manageNodes = manageNodes;
        /**
         * Private function that makes the develop animation.
         * @method _drawText
         * @param {object} itm - Panel to place text.
         * @param {string} txt - Texto for drawing.
         */
        function _drawText(itm, txt) {
            // get 2D context
            if (itm.length > 0) {
                let ctx = itm[0].getContext("2d"), 
                // dash-length for off-range
                dashLen = 220, 
                // we'll update this, initialize
                dashOffset = dashLen, 
                // some arbitrary speed
                speed = 5, 
                // start position for x and iterator
                x = 0, i = 0;
                // Comic Sans?? Let's make it useful for something ;) w/ fallbacks
                ctx.font = "120px Arial";
                // thickness of the line
                ctx.lineWidth = 1;
                // to avoid spikes we can join each line with a round joint
                ctx.lineJoin = "round";
                // increase realism letting background (f.ex. paper) show through
                ctx.globalAlpha = 2 / 3;
                // some color, lets use a black pencil
                ctx.strokeStyle = ctx.fillStyle = "#ddd";
                (function loop() {
                    // clear canvas for each frame
                    ctx.clearRect(x, 0, 60, 150);
                    // calculate and set current line-dash for this char
                    ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]);
                    // reduce length of off-dash
                    dashOffset -= speed;
                    // draw char to canvas with current dash-length
                    ctx.strokeText(txt[i], x, 90);
                    // char done? no, the loop
                    if (dashOffset > 0)
                        requestAnimationFrame(loop);
                    else {
                        // ok, outline done, lets fill its interior before next
                        //ctx.fillText(txt[i], x, 90);
                        // reset line-dash length
                        dashOffset = dashLen;
                        // get x position to next char by measuring what we have drawn
                        // notice we offset it a little by random to increase realism
                        x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
                        // if we still have chars left, loop animation again for this char
                        if (i < txt.length)
                            requestAnimationFrame(loop);
                    }
                })(); // just to self-invoke the loop
            }
        }
        debug._drawText = _drawText;
    })(debug = flexygo.debug || (flexygo.debug = {}));
})(flexygo || (flexygo = {}));
/**
* Library with diagnostics functions
*
* @class flexygo.debug.test
*/
(function (flexygo) {
    var debug;
    (function (debug) {
        var test;
        (function (test_1) {
            function show() {
                flexygo.ajax.post('~/api/Test', 'GetTests', {}, function (res) {
                    if (res.length > 0) {
                        flexygo.debug.test.drawTest(res);
                    }
                });
            }
            test_1.show = show;
            /**
             * Draw a window with testing options.
             * @method drawTest
             * @param {object} tests - List of test
             */
            function drawTest(tests) {
                let targetid = '';
                if (flexygo.utils.isSizeMobile()) {
                    targetid = 'current';
                }
                else {
                    targetid = 'modal';
                }
                let histObj = {
                    targetid: targetid,
                    userid: flexygo.context.currentUserId
                };
                let pageContainer = flexygo.targets.createContainer(histObj, true, null);
                pageContainer.closest('.ui-dialog').find('.ui-dialog-title').html('<i class="flx-icon icon-develop"></i> Flexygo Diagnostics');
                let navString = '<div class="row padding-l">';
                navString += '<flx-container type="emptyCnt">';
                navString += '<div class="row">';
                navString += '<div class="col-1"><h3>Status</h3></div>';
                navString += '<div class="col-4"><h3>Name</h3></div>';
                navString += '<div class="col-7"><h3>More Info</h3></div>';
                navString += '</div>';
                navString += '<div class="bg-white">';
                for (let i = 0; i < tests.length; i++) {
                    navString += '<div class="row padding-s" testId="' + tests[i].TestId + '" testName="' + tests[i].TestName + '" testClass="' + tests[i].TestClass + '">';
                    navString += '<div class="testStat col-1">&nbsp;</div>';
                    navString += '<div class="testDescrip col-4"><a href="#" onclick="$(this).closest(\'[testName]\').addClass(\'testPending\');flexygo.debug.test.executeTests($(this).closest(\'flx-container\'));event.stopPropagation();event.preventDefault();" ><h6 class="txt-primary"><span class="size-s">' + tests[i].TestTile + ' ' + tests[i].TestName + '</span></h6></a></div>';
                    navString += '<div class="testResult col-7 size-s"></div>';
                    navString += '</div>';
                }
                navString += '</div>';
                navString += '</flx-container>';
                navString += '</div>';
                navString += '<div style="margin-top:20px" class="row padding-l">';
                navString += '<button class="execTest btn btn-default bg-success">Run All <i class="flx-icon icon-play" /></button>';
                navString += '</div>';
                pageContainer.html(navString);
                pageContainer.find('.execTest').on('click', function () {
                    $(this).prop('disabled', true);
                    $(this).html('Executing... <i class="flx-icon icon-load icon-spin"></i>');
                    pageContainer.find("[testName]").addClass('testPending');
                    flexygo.debug.test.executeTests(pageContainer);
                });
            }
            test_1.drawTest = drawTest;
            /**
             * Executes tests marked as "testPending" on the result panel.
             * @method executeTests
             * @param {HTMLItem} testPanel - HTML Panel to show test result
             */
            function executeTests(testPanel) {
                let test = testPanel.find("[testName].testPending");
                if (test.length > 0) {
                    let testRow = $(test[0]);
                    let testName = testRow.attr('testName');
                    let testClass = testRow.attr('testClass');
                    let testId = testRow.attr('testId');
                    testRow.find('.testStat').html('<i class="flx-icon icon-load icon-spin"></i>');
                    testRow.find('.testDescrip h6').attr('class', 'txt-info');
                    flexygo.ajax.post('~/api/Test', 'ExecuteTest', { "TestName": testName, "ClassName": testClass, "TestId": testId }, function (res) {
                        flexygo.debug.test.executeTestRes(testPanel, res);
                    });
                }
            }
            test_1.executeTests = executeTests;
            /**
             * Update test result on the result panel.
             * @method executeTestRes
             * @param {HTMLItem} testPanel - HTML Panel to show test result
             * @param {object} test - Test result.
             */
            function executeTestRes(testPanel, test) {
                let el = testPanel.find('[testName="' + test.TestName + '"]');
                if (el.length > 0) {
                    el.removeClass('testPending');
                    if (test.Result) {
                        el.find('.testStat').html('<i class="flx-icon icon-accepted txt-success"></i>');
                        el.find('.testDescrip h6').attr('class', 'txt-success');
                    }
                    else {
                        el.find('.testStat').html('<i class="flx-icon icon-close txt-danger"></i>');
                        el.find('.testDescrip h6').attr('class', 'txt-danger');
                        el.find('.testResult').html(flexygo.utils.parser.replaceAll(test.LastError, '\n', '<br/>'));
                        console.error(test.LastError);
                    }
                    test = testPanel.find("[testName].testPending");
                    if (test.length > 0) {
                        flexygo.debug.test.executeTests(testPanel);
                    }
                    else {
                        testPanel.find('.execTest').prop('disabled', false);
                        testPanel.find('.execTest').html('Run All <i class="flx-icon icon-play" />');
                    }
                }
            }
            test_1.executeTestRes = executeTestRes;
        })(test = debug.test || (debug.test = {}));
    })(debug = flexygo.debug || (flexygo.debug = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=develop.js.map