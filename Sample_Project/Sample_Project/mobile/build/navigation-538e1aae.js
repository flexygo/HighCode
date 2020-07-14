import { m as msg, C as ConftokenProvider } from './messages-65fb7542.js';
import './index-fb0d54fa.js';
import { m as modalController } from './overlays-e769172f.js';
import { j as jquery } from './jquery-4ed57fb2.js';

var nav;
(function (nav) {
    function goBack(current) {
        if (current && jquery(current).closest('ion-modal').length > 0) {
            closeModal(current);
        }
        else {
            let router = document.querySelector('ion-router');
            router.back();
        }
    }
    nav.goBack = goBack;
    function closeModal(current, data) {
        if (current) {
            if (jquery(current).closest('ion-modal').length > 0) {
                jquery(current).closest('ion-modal')[0].dismiss(data);
            }
        }
        else {
            if (jquery('ion-modal').length > 0) {
                jquery('ion-modal')[0].dismiss(data);
            }
        }
    }
    nav.closeModal = closeModal;
    function goHome() {
        _nav('/home', 'root');
    }
    nav.goHome = goHome;
    function goSync() {
        _nav('/sync', 'root');
    }
    nav.goSync = goSync;
    function goLogin() {
        _nav('/login', 'root');
    }
    nav.goLogin = goLogin;
    function goList(object, pagename, filter, defaults) {
        goPage('list', object, pagename, filter, defaults, 'forward');
    }
    nav.goList = goList;
    function goEdit(object, pagename, filter, defaults) {
        goPage('edit', object, pagename, filter, defaults, 'forward');
    }
    nav.goEdit = goEdit;
    function goView(object, pagename, filter, defaults) {
        goPage('view', object, pagename, filter, defaults, 'forward');
    }
    nav.goView = goView;
    function goInsert(object, pagename, defaults) {
        goPage('edit', object, pagename, null, defaults, 'forward');
    }
    nav.goInsert = goInsert;
    function goGallery(object, objectid) {
        _nav('/gallery/' + object + '/' + encodeURIComponent(objectid), 'forward');
    }
    nav.goGallery = goGallery;
    function goDocuments(object, objectid) {
        _nav('/documents/' + object + '/' + encodeURIComponent(objectid), 'forward');
    }
    nav.goDocuments = goDocuments;
    function transferList(object, pagename, filter, defaults) {
        goPage('list', object, pagename, filter, defaults, 'back');
    }
    nav.transferList = transferList;
    function transferEdit(object, pagename, filter, defaults) {
        goPage('edit', object, pagename, filter, defaults, 'back');
    }
    nav.transferEdit = transferEdit;
    function transferView(object, pagename, filter, defaults) {
        goPage('view', object, pagename, filter, defaults, 'back');
    }
    nav.transferView = transferView;
    function transferInsert(object, pagename, defaults) {
        goPage('edit', object, pagename, null, defaults, 'back');
    }
    nav.transferInsert = transferInsert;
    function transferGallery(object, objectid) {
        _nav('/gallery/' + object + '/' + encodeURIComponent(objectid), 'back');
    }
    nav.transferGallery = transferGallery;
    function transferDocuments(object, objectid) {
        _nav('/documents/' + object + '/' + encodeURIComponent(objectid), 'back');
    }
    nav.transferDocuments = transferDocuments;
    function modalList(object, pagename, filter, defaults) {
        return modalPage('list', object, pagename, filter, defaults);
    }
    nav.modalList = modalList;
    function modalEdit(object, pagename, filter, defaults) {
        return modalPage('edit', object, pagename, filter, defaults);
    }
    nav.modalEdit = modalEdit;
    function modalView(object, pagename, filter, defaults) {
        return modalPage('view', object, pagename, filter, defaults);
    }
    nav.modalView = modalView;
    function modalInsert(object, pagename, defaults) {
        return modalPage('edit', object, pagename, null, defaults);
    }
    nav.modalInsert = modalInsert;
    async function modalPage(type, object, pagename, filter, defaults) {
        if (defaults) {
            if (typeof defaults == 'object') {
                defaults = JSON.stringify(defaults);
                while (defaults.indexOf('"') > -1) {
                    defaults = defaults.replace('"', "'");
                }
            }
        }
        if (opener) {
            opener = jquery(opener).closest('flx-view, flx-edit, flx-list, flx-home')[0];
        }
        const modal = await modalController.create({
            component: 'flx-' + type,
            componentProps: {
                object: object,
                pageName: pagename,
                filter: filter,
                defaults: defaults
            },
        });
        modal.present();
        return modal.onDidDismiss();
    }
    function goPage(type, object, pagename, filter, defaults, direction) {
        var esc = encodeURIComponent;
        let url = '/' + type + '/' + object;
        if (pagename) {
            url += '/page/' + esc(pagename);
        }
        if (filter) {
            url += '/filter/' + esc(filter);
        }
        if (defaults) {
            if (typeof defaults == 'object') {
                defaults = JSON.stringify(defaults);
                while (defaults.indexOf('"') > -1) {
                    defaults = defaults.replace('"', "'");
                }
            }
            url += '/defaults/' + esc(defaults);
        }
        _nav(url, direction);
    }
    nav.goPage = goPage;
    function currentUrl() {
        let router = document.querySelector('ion-router');
        let url = router.baseURI.substring(router.baseURI.indexOf('#'));
        if (url.startsWith('#')) {
            url = url.substr(1);
        }
        return url;
    }
    nav.currentUrl = currentUrl;
    async function _nav(url, direction) {
        if (currentUrl() == url) {
            //refresh current url
            debugger;
        }
        else {
            let router = document.querySelector('ion-router');
            let success = await router.push(url, direction);
            if (!success) {
                alert('Page not found');
            }
        }
    }
    nav._nav = _nav;
    async function _goMenu(menu) {
        switch (menu.typeId) {
            case 'object':
                goPage(menu.pageTypeId, menu.objectName, menu.pageName, menu.objectWhere, null, 'root');
                break;
            case 'page':
                let c = await ConftokenProvider.config();
                let obj = c.objectConfig[menu.objectName];
                let found = false;
                if (obj) {
                    for (let i = 0; i < obj.pages.length; i++) {
                        if (obj.pages[i].pageName == menu.pageName) {
                            found = true;
                            goPage(obj.pages[i].typeId, menu.objectName, menu.pageName, menu.objectWhere, null, 'root');
                        }
                    }
                }
                if (!found) {
                    msg.danger('Page not found');
                }
                break;
            default:
                msg.danger('Feature not implemented');
        }
    }
    nav._goMenu = _goMenu;
})(nav || (nav = {}));

export { nav as n };
