import { B as BUILD, C as CSS, p as plt, w as win, a as promiseResolve, c as consoleDevInfo, H, d as doc, N as NAMESPACE } from './index-76f52202.js';
import { i as ionicCoreGlobalScript } from './ionic-global-693c5dc1.js';
import { C as ConftokenProvider, u as util, s as sql, m as msg, c as cordova, a as checkAvailability, g as getPromise, I as IonicNativePlugin, f as flxSync, b as ConftokenService } from './messages-50a67881.js';
import { j as jquery } from './jquery-4ed57fb2.js';
import { n as nav } from './navigation-c87efa5b.js';
import { c as cam } from './camera-75f70a4d.js';
import { w as whiteboard } from './whiteboard-6fe6c589.js';
import { g as gps, p as parser } from './parser-90867b5f.js';

/*
 Stencil Client Patch v1.17.3 | MIT Licensed | https://stenciljs.com
 */
const noop = () => {
    /* noop*/
};
const IS_DENO_ENV = typeof Deno !== 'undefined';
const IS_NODE_ENV = !IS_DENO_ENV &&
    typeof global !== 'undefined' &&
    typeof require === 'function' &&
    !!global.process &&
    typeof __filename === 'string' &&
    (!global.origin || typeof global.origin !== 'string');
const IS_DENO_WINDOWS_ENV = IS_DENO_ENV && Deno.build.os === 'windows';
const getCurrentDirectory = IS_NODE_ENV ? process.cwd : IS_DENO_ENV ? Deno.cwd : () => '/';
const exit = IS_NODE_ENV ? process.exit : IS_DENO_ENV ? Deno.exit : noop;
const getDynamicImportFunction = (namespace) => `__sc_import_${namespace.replace(/\s|-/g, '_')}`;
const patchEsm = () => {
    // NOTE!! This fn cannot use async/await!
    // @ts-ignore
    if (BUILD.cssVarShim && !(CSS && CSS.supports && CSS.supports('color', 'var(--c)'))) {
        // @ts-ignore
        return __sc_import_app(/* webpackChunkName: "polyfills-css-shim" */ './css-shim-0d35df9f.js').then(() => {
            if ((plt.$cssShim$ = win.__cssshim)) {
                return plt.$cssShim$.i();
            }
            else {
                // for better minification
                return 0;
            }
        });
    }
    return promiseResolve();
};
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (BUILD.isDev && !BUILD.isTesting) {
        consoleDevInfo('Running in development mode.');
    }
    if (BUILD.cssVarShim) {
        // shim css vars
        plt.$cssShim$ = win.__cssshim;
    }
    if (BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(H.prototype);
    }
    if (BUILD.profile && !performance.mark) {
        // not all browsers support performance.mark/measure (Safari 10)
        performance.mark = performance.measure = () => {
            /*noop*/
        };
        performance.getEntriesByName = () => [];
    }
    // @ts-ignore
    const scriptElm = BUILD.scriptDataOpts || BUILD.safari10 || BUILD.dynamicImportShim
        ? Array.from(doc.querySelectorAll('script')).find(s => new RegExp(`\/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) || s.getAttribute('data-stencil-namespace') === NAMESPACE)
        : null;
    const importMeta = "";
    const opts = BUILD.scriptDataOpts ? scriptElm['data-opts'] || {} : {};
    if (BUILD.safari10 && 'onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
        // Safari < v11 support: This IF is true if it's Safari below v11.
        // This fn cannot use async/await since Safari didn't support it until v11,
        // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
        // so both the ESM file and nomodule file would get downloaded. Only Safari
        // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
        // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
        // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
        return {
            then() {
                /* promise noop */
            },
        };
    }
    if (!BUILD.safari10 && importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    else if (BUILD.dynamicImportShim || BUILD.safari10) {
        opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
        if (BUILD.dynamicImportShim) {
            patchDynamicImport(opts.resourcesUrl, scriptElm);
        }
        if (BUILD.dynamicImportShim && !win.customElements) {
            // module support, but no custom elements support (Old Edge)
            // @ts-ignore
            return __sc_import_app(/* webpackChunkName: "polyfills-dom" */ './dom-99c5763a.js').then(() => opts);
        }
    }
    return promiseResolve(opts);
};
const patchDynamicImport = (base, orgScriptElm) => {
    const importFunctionName = getDynamicImportFunction(NAMESPACE);
    try {
        // test if this browser supports dynamic imports
        // There is a caching issue in V8, that breaks using import() in Function
        // By generating a random string, we can workaround it
        // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
        win[importFunctionName] = new Function('w', `return import(w);//${Math.random()}`);
    }
    catch (e) {
        // this shim is specifically for browsers that do support "esm" imports
        // however, they do NOT support "dynamic" imports
        // basically this code is for old Edge, v18 and below
        const moduleMap = new Map();
        win[importFunctionName] = (src) => {
            const url = new URL(src, base).href;
            let mod = moduleMap.get(url);
            if (!mod) {
                const script = doc.createElement('script');
                script.type = 'module';
                script.crossOrigin = orgScriptElm.crossOrigin;
                script.src = URL.createObjectURL(new Blob([`import * as m from '${url}'; window.${importFunctionName}.m = m;`], { type: 'application/javascript' }));
                mod = new Promise(resolve => {
                    script.onload = () => {
                        resolve(win[importFunctionName].m);
                        script.remove();
                    };
                });
                moduleMap.set(url, mod);
                doc.head.appendChild(script);
            }
            return mod;
        };
    }
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

var forms;
(function (forms) {
    async function save(btn, showMessage = true) {
        let tkn = await ConftokenProvider.config();
        let edit = jquery(btn).closest('flx-edit')[0];
        if (jquery(edit).find('form').valid()) {
            let tableName = tkn.objectConfig[edit.object].tableName;
            let props = jquery(edit).find('[property]');
            let values = new Array();
            let fields = new Array();
            for (let i = 0; i < props.length; i++) {
                let prop = jquery(props[i]);
                fields.push(prop.attr('property'));
                let val = (prop.val() == '' ? null : prop.val());
                if (prop.is('.date') && val) {
                    val = moment(val).format('YYYY-MM-DD');
                }
                else if (prop.is('ion-datetime') && !prop.is('.time') && val) {
                    val = moment(val).format('YYYY-MM-DDTHH:mm:ss');
                }
                else if (prop.is('ion-checkbox, ion-toggle')) {
                    val = (prop.prop('checked') ? 1 : 0);
                }
                values.push(val);
            }
            if (edit.filter) {
                fields.push('_isUpdated');
                values.push(1);
                fields.push('_updatedDate');
                values.push(util.currentDateTime());
                fields.push('_rowguid');
                values.push(util.GUID());
                let UpdateScript = sql.getUpdateScript(tableName, fields, edit.filter);
                return sql.execSQL(UpdateScript, values).then(() => { if (showMessage) {
                    msg.success(util.translate('msg.saved'));
                } }).catch(err => { throw err; });
            }
            else {
                let keys = tkn.objectConfig[edit.object].primaryKeys;
                for (let i = 0; i < keys.length; i++) {
                    let val = jquery(edit).find('[property="' + keys[i] + '"]');
                    if (val.length == 0 || val[0].value == null || val[0].value == '') {
                        throw 'Object has not primary key.';
                    }
                }
                fields.push('_isInserted');
                values.push(1);
                fields.push('_insertDate');
                values.push(util.currentDateTime());
                fields.push('_rowguid');
                values.push(util.GUID());
                let InserScript = sql.getInsertScript(tableName, fields);
                return sql.execSQL(InserScript, values).then(() => { if (showMessage) {
                    msg.success(util.translate('msg.saved'));
                } }).catch(err => { throw err; });
            }
        }
        else {
            throw util.translate('exceptions.required') + jquery(edit).find('form').validate().errorList[0].element.name;
        }
    }
    forms.save = save;
})(forms || (forms = {}));

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EmailComposerOriginal = /** @class */ (function (_super) {
    __extends(EmailComposerOriginal, _super);
    function EmailComposerOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailComposerOriginal.prototype.hasPermission = function () { return cordova(this, "hasPermission", { "successIndex": 0, "errorIndex": 2 }, arguments); };
    EmailComposerOriginal.prototype.requestPermission = function () { return cordova(this, "requestPermission", { "successIndex": 0, "errorIndex": 2 }, arguments); };
    EmailComposerOriginal.prototype.hasAccount = function () {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (resolve) {
                    EmailComposerOriginal.getPlugin().hasAccount(function (result) {
                        if (result) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    });
                });
            }
        })();
    };
    EmailComposerOriginal.prototype.hasClient = function (app) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (resolve) {
                    if (app) {
                        EmailComposerOriginal.getPlugin().hasClient(app, function (result) {
                            if (result) {
                                resolve(true);
                            }
                            else {
                                resolve(false);
                            }
                        });
                    }
                    else {
                        EmailComposerOriginal.getPlugin().getClients(function (apps) {
                            resolve(apps && apps.length > 0);
                        });
                    }
                });
            }
        })();
    };
    EmailComposerOriginal.prototype.getClients = function () {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (resolve) {
                    EmailComposerOriginal.getPlugin().getClients(function (apps) {
                        if (Object.prototype.toString.call(apps) === '[object String]') {
                            apps = [apps];
                        }
                        resolve(apps);
                    });
                });
            }
        })();
    };
    EmailComposerOriginal.prototype.isAvailable = function (app) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (resolve) {
                    Promise.all([_this.hasAccount, _this.hasClient(app)]).then(function (results) {
                        return resolve(results.length === 2 && results[0] && results[1]);
                    });
                });
            }
        })();
    };
    EmailComposerOriginal.prototype.open = function (options, scope) { return cordova(this, "open", { "successIndex": 1, "errorIndex": 3 }, arguments); };
    EmailComposerOriginal.prototype.addAlias = function (alias, packageName) { return cordova(this, "addAlias", {}, arguments); };
    EmailComposerOriginal.pluginName = "EmailComposer";
    EmailComposerOriginal.plugin = "cordova-plugin-email-composer";
    EmailComposerOriginal.pluginRef = "cordova.plugins.email";
    EmailComposerOriginal.repo = "https://github.com/katzer/cordova-plugin-email-composer";
    EmailComposerOriginal.platforms = ["Amazon Fire OS", "Android", "Browser", "iOS", "Windows", "macOS"];
    return EmailComposerOriginal;
}(IonicNativePlugin));
var EmailComposer = new EmailComposerOriginal();

var exports;
(function (exports) {
    /**
    * Sends email using defailt mail system.
    * @method sendMail
    * @param {string|array} to - Receiver email or array with receiver emails .
    * @param {string} subject - The second param for the sum.
    * @param {string} body - The second param for the sum.
    * @param {boolean} [ishtml=true] - The second param for the sum (defaut: true).
    * @param {string|array} [cc] - Other receiver email or array with other receiver receiver emails.
    * @param {string|array} [bcc] - bcc email or array with bcc emails.
    * @param {array} [attachments] - Array with attachments. ['base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',...]
    */
    async function sendMail(to, subject, body, ishtml = true, cc = '', bcc = '', attachments = null) {
        try {
            let email = {
                to: to,
                cc: cc,
                bcc: bcc,
                attachments: attachments,
                subject: subject,
                body: body,
                isHtml: ishtml
            };
            //msg.warning('Under construction',email);
            await EmailComposer.open(email);
        }
        catch (e) {
            msg.showError(e);
        }
    }
    exports.sendMail = sendMail;
    /**
    * Generate pdf from html string
    * @method createPDF
    * @param {string} html - HTML string to convert to pdf.
    * @param {string} filename[document.pdf] - Pdf file name
    * @param {string} [documentsize=A4] - Pdf document size [A4|A3|A2]
    * @param {boolean} [landscape=false] - Landscape or portrait
    * @param {boolean} [share=true] - If true launches share OS window, else return object with base64 encoded file.
    * @return {Promise<pdf>} - if share = false returns promise with pdf base64 object.
    */
    function createPDF(html, filename = 'document.pdf', documentsize = 'A4', landscape = false, share = true) {
        try {
            if (window.cordova) {
                return window.cordova.plugins.pdf.fromData(html, {
                    documentSize: documentsize,
                    landscape: (landscape ? 'landscape' : 'portrait'),
                    type: (share ? 'share' : 'base64'),
                    fileName: filename
                });
            }
            else {
                msg.danger('This feataure is only avaiable in mobile devices');
            }
        }
        catch (e) {
            alert('cannot create PDF. ' + e);
        }
    }
    exports.createPDF = createPDF;
})(exports || (exports = {}));

const caes = {
    menu: {
        menu: 'Menú',
        home: 'Inici',
        sync: 'Sync',
        logout: 'Eixida'
    },
    list: {
        search: 'Buscar',
        noresults: 'Sense Resultats'
    },
    msg: {
        ok: 'Ok',
        cancel: 'Cancel·lar',
        deleted: 'Eliminat :)',
        saved: 'Guardat :)'
    },
    exceptions: {
        gpstimeout: 'Temps \'espera superat. Assegureu-se de tindre el GPS actiu al dispositiu.',
        required: 'Completi tots els camps requerits. '
    },
    sync: {
        last: 'Última sincronització:',
        refresh: 'Actualitzar dades',
        overwrite: 'Sobreescriure dades',
        confirmOverwrite: 'Sobreescriure totes les dades?',
        confirmOverwriteText: 'Assegureu-se d\'enviar tots els canvis abans de confirmar per evitar la perduda de dades.',
        send: 'Enviar dades',
        templates: 'Actualitzar disseny'
    },
    image: {
        delete: 'Eliminar',
        msg: 'Voleu eliminar la imatge?',
        warning: 'La imatge no es pot eliminar des del dispositiu perquè ja es troba al servidor principal. Feu aquesta acció des de l\'entorn d\'escriptori.'
    },
    document: {
        delete: 'Eliminar',
        download: 'Descarregar',
        msg: 'Voleu eliminar el document?',
        warning: 'El document no es pot eliminar des del dispositiu perquè ja es troba al servidor principal. Feu aquesta acció des de l\'entorn d\'escriptori.'
    }
};

const frfr = {
    menu: {
        menu: 'Menu',
        home: 'Début',
        sync: 'Sync',
        logout: 'Déconnecter'
    },
    list: {
        search: 'Chercher',
        noresults: 'Aucun résultat'
    },
    msg: {
        ok: 'Ok',
        cancel: 'Annuler',
        deleted: 'Supprimé :)',
        saved: 'Enregistré :)'
    },
    exceptions: {
        gpstimeout: 'Le temps d\'attente a été dépassé. Assurez-vous que votre GPS est actif sur l\'appareil.',
        required: 'Remplissez tous les champs obligatoires: '
    },
    sync: {
        last: 'Dernière synchronisation:',
        refresh: 'Actualiser données',
        overwrite: 'Écraser données',
        confirmOverwrite: 'Écraser toutes les données?',
        confirmOverwriteText: 'Veuillez envoyer toutes les données avant d\'utiliser ce bouton pour éviter la perte de données.',
        send: 'Envoyer des données',
        templates: 'Mettre à jour la conception'
    },
    image: {
        delete: 'Retirer',
        msg: 'Voulez-vous supprimer l\'image?',
        warning: 'L\'image ne peut pas être supprimée de l\'appareil car elle se trouve déjà sur le serveur principal. Faites cela à partir de l\'environnement de bureau.'
    },
    document: {
        delete: 'Eliminar',
        download: 'Télécharger',
        msg: 'Voulez-vous supprimer le document?',
        warning: 'Le document ne peut pas être supprimé de l\'appareil car il se trouve déjà sur le serveur principal. Faites cela à partir de l\'environnement de bureau.'
    }
};

const eses = {
    menu: {
        menu: 'Menú',
        home: 'Inicio',
        sync: 'Sincronizar',
        logout: 'Desconectar'
    },
    list: {
        search: 'Buscar',
        noresults: 'Sin resultados'
    },
    msg: {
        ok: 'Aceptar',
        cancel: 'Cancelar',
        deleted: 'Borrado :)',
        saved: 'Guardado :)'
    },
    exceptions: {
        gpstimeout: 'Tiempo de espera superado. Asegurese de tener el GPS activo en el dispositivo.',
        required: 'Complete todos los campos requeridos: '
    },
    sync: {
        last: 'Última Sincronización:',
        refresh: 'Actualizar datos',
        overwrite: 'Sobreescribir datos',
        confirmOverwrite: 'Sobreescribir todo?',
        confirmOverwriteText: 'Asegurese de haber realizado un envio antes de aceptar este mensaje para evitar perdida de datos.',
        send: 'Enviar datos',
        templates: 'Actualizar diseño'
    },
    image: {
        delete: 'Eliminar',
        msg: '¿Desea eliminar la imagen?',
        warning: 'La imagen no se puede eliminar desde el dispositivo porque ya se encuentra en el servidor principal. Realice esta acción desde el entorno de escritorio.'
    },
    document: {
        delete: 'Eliminar',
        download: 'Descargar',
        msg: '¿Desea eliminar el documento?',
        warning: 'El documento no se puede eliminar desde el dispositivo porque ya se encuentra en el servidor principal. Realice esta acción desde el entorno de escritorio.'
    }
};

const dede = {
    menu: {
        menu: 'Menü',
        home: 'Start',
        sync: 'Sync',
        logout: 'Ausloggen'
    },
    list: {
        search: 'Suche',
        noresults: 'Keine Ergebnisse'
    },
    msg: {
        ok: 'Ok',
        cancel: 'Cancel',
        deleted: 'Gelöscht :)',
        saved: 'Gerettet :)'
    },
    exceptions: {
        gpstimeout: 'Wartezeit überschritten. Stellen Sie sicher, dass Ihr Gerät über aktives GPS verfügt.',
        required: 'Füllen Sie alle erforderlichen Felder aus: '
    },
    sync: {
        last: 'Letzte Synchronisation:',
        refresh: 'Daten aktualisieren',
        overwrite: 'Daten überschreiben',
        confirmOverwrite: 'Alle Daten überschreiben?',
        confirmOverwriteText: 'Bitte senden Sie alle Daten, bevor Sie diese Schaltfläche verwenden, um Datenverlust zu vermeiden.',
        send: 'Schicke Daten',
        templates: 'Vorlagen aktualisieren'
    },
    image: {
        delete: 'Entfernen',
        msg: 'Möchten Sie das Bild löschen?',
        warning: 'Das Image kann nicht vom Gerät gelöscht werden, da es sich bereits auf dem Hauptserver befindet. Tun Sie dies von der Desktop-Umgebung aus.'
    },
    document: {
        delete: 'Eliminar',
        download: 'Herunterladen',
        msg: 'Möchten Sie das Dokument löschen?',
        warning: 'Das Dokument kann nicht vom Gerät gelöscht werden, da es sich bereits auf dem Hauptserver befindet. Tun Sie dies von der Desktop-Umgebung aus.'
    }
};

const engb = {
    menu: {
        menu: 'Menu',
        home: 'Home',
        sync: 'Sync',
        logout: 'Logout'
    },
    list: {
        search: 'Search',
        noresults: 'No results'
    },
    msg: {
        ok: 'Ok',
        cancel: 'Cancel',
        deleted: 'Deleted :)',
        saved: 'Saved :)'
    },
    exceptions: {
        gpstimeout: 'Timeout. Please, enable GPS settings',
        required: 'Complete all required fields: '
    },
    sync: {
        last: 'Last sync on:',
        refresh: 'Refresh Data',
        overwrite: 'Overwrite Data',
        confirmOverwrite: 'Overwrite all data?',
        confirmOverwriteText: 'Please, send all data before use this button to avoid data lost.',
        send: 'Send Data',
        templates: 'Update Templates'
    },
    image: {
        delete: 'Remove',
        msg: 'Do you want to delete the image?',
        warning: 'The image cannot be deleted from the device because it is already on the main server. Do this from the desktop environment.'
    },
    document: {
        delete: 'Eliminar',
        download: 'Download',
        msg: 'Do you want to delete the document?',
        warning: 'The document cannot be deleted from the device because it is already on the main server. Do this from the desktop environment.'
    }
};

var ext;
(function (ext) {
    async function linkExternalFunctions() {
        window['flexygo'] = new Object();
        window.flexygo.nav = nav;
        window.flexygo.msg = msg;
        window.flexygo.sql = sql;
        window.flexygo.forms = forms;
        window.flexygo.camera = cam;
        window.flexygo.whiteboard = whiteboard;
        window.flexygo.gps = gps;
        window.flexygo.conftoken = await ConftokenProvider.config();
        window.flexygo.utils = util;
        window.flexygo.exports = exports;
        window.flexygo.sync = flxSync;
        window.flexygo.parser = parser;
        window.flexygo.culture = new Object();
        window.flexygo.culture.caes = caes;
        window.flexygo.culture.frfr = frfr;
        window.flexygo.culture.dede = dede;
        window.flexygo.culture.engb = engb;
        window.flexygo.culture.eses = eses;
        window['$'] = jquery;
    }
    ext.linkExternalFunctions = linkExternalFunctions;
})(ext || (ext = {}));

const appGlobalScript = () => {
    ext.linkExternalFunctions();
};
window.addEventListener("message", receiveMessage, false);
function receiveMessage(event) {
    if (event.data && event.data.action) {
        switch (event.data.action) {
            case 'reload':
                window.location.reload();
                break;
            case 'syncTemplates':
                (new ConftokenService()).getAppTemplates().then(() => {
                    window.location.reload();
                });
                break;
            case 'navigate':
                if (event.data.type == 'view') {
                    util.getFirstRow(event.data.object).then((ret) => {
                        if (ret) {
                            nav.goPage(event.data.type, event.data.object, event.data.pagename, ret, null, 'root');
                        }
                        else {
                            alert('Can\'t find any object to go view page');
                        }
                    });
                }
                else {
                    nav.goPage(event.data.type, event.data.object, event.data.pagename, null, null, 'root');
                }
                break;
        }
    }
}

const globalScripts = () => {
  appGlobalScript();
  ionicCoreGlobalScript();
};

export { patchEsm as a, globalScripts as g, patchBrowser as p };
