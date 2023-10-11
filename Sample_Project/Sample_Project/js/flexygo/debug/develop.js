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
            flexygo.storage.session.add('DevelopMode', !flexygo.debug.isDevelopMode());
            flexygo.debug.enableDevelopMode(flexygo.debug.isDevelopMode(), showAnimation);
        }
        debug.toggleDevelopMode = toggleDevelopMode;
        /**
         * enable or disable develop mode.
         * @method enableDevelopMode
         * @param {bool} enable - Sets enabled or disabled.
         * @param {bool} showAnimation - Sets if the animation must be shown.
         */
        function enableDevelopMode(enable, showAnimation) {
            $('body').find('flx-versioninfo').each((i, e) => {
                e.refresh();
            });
            let wcSidePanel = $('#mainSidePanel')[0];
            if (enable && typeof (wcSidePanel) != 'undefined') {
                if (showAnimation) {
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
                panelCtx.add('<span><i class="flx-icon icon-object icon-margin-right"></i>' + flexygo.localization.translate('develop.object') + newObjectStr + '</span>', [objConfig, objView, objWizard, objImageManager, objDocumentManager, objChatter, objMailManager]);
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
                panelCtx.add('<span><i class="flx-icon icon-bullet-list-3 icon-margin-right"></i>' + flexygo.localization.translate('develop.collection') + '</span>', [colConfig]);
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
        /**
         * Returns if develop mode is enabled.
         * @method isDevelopMode
         * @return {bool} - develop mode enabled
         */
        function isDevelopMode() {
            if (flexygo.storage.session.get('DevelopMode')) {
                return true;
            }
            else {
                return false;
            }
        }
        debug.isDevelopMode = isDevelopMode;
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
                    targetid: targetid
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