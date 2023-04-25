import { B as BUILD, C as CSS, p as plt, w as win, a as promiseResolve, c as consoleDevInfo, H, d as doc, N as NAMESPACE } from './index-86ac49ff.js';
import { i as initialize } from './ionic-global-0f98fe97.js';
import { W as Webapi, s as storage, r as registerPlugin, P as Preferences, C as ConfToken, U as UrlConfig } from './webapi-79a1d3db.js';
import { C as ConftokenProvider, u as util, s as sql, m as msg, c as cordova$1, a as checkAvailability, g as getPromise, I as IonicNativePlugin, _ as __extends$1, b as cordovaPropertyGet, d as cordovaPropertySet, e as Injectable, n as nav, f as cam, h as gps, t as tracking, i as flxSync, j as ConftokenService } from './conftoken-7e3c18eb.js';
import { j as jquery } from './jquery-5df58adb.js';
import { w as whiteboard } from './whiteboard-658b1b9f.js';
import { p as parser } from './parser-8aed96de.js';

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
                else if (prop.is('.time') && val && val.length > 5) {
                    val = moment(val).format('HH:mm');
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
                        throw new Error('Object has not primary key.');
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
    EmailComposerOriginal.prototype.hasPermission = function () { return cordova$1(this, "hasPermission", { "successIndex": 0, "errorIndex": 2 }, arguments); };
    EmailComposerOriginal.prototype.requestPermission = function () { return cordova$1(this, "requestPermission", { "successIndex": 0, "errorIndex": 2 }, arguments); };
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
    EmailComposerOriginal.prototype.open = function (options, scope) { return cordova$1(this, "open", { "successIndex": 1, "errorIndex": 3 }, arguments); };
    EmailComposerOriginal.prototype.addAlias = function (alias, packageName) { return cordova$1(this, "addAlias", {}, arguments); };
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
    login: {
        appsListTitle: 'Per favor, trie una aplicació',
        invalidPsw: 'El nom d\'usuari o la contrasenya són incorrectes',
        connectionErr: 'Error de connexió, URL incorrecte o API web desactivada',
        username: 'Nom d\'usuari',
        password: 'Contrasenya',
        login: 'Iniciar sessió',
        blankUrl: 'L\'URL no pot estar en blanc',
        blankUsr: 'L\'usuari no pot estar en blanc',
        blankPsw: 'La contrasenya no pot estar en blanc',
        wrongtURL: 'URL incorrecta'
    },
    menu: {
        menu: 'Menú',
        home: 'Inici',
        sync: 'Sync',
        syncMore: 'Més opcions',
        logout: 'Eixida',
        logoutHeader: 'Confirmar desconexió',
        logoutMessage: 'Tinga en compte que si desconnectes ara perdràs les dades que no hages pujat'
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
        syncTimeout: 'Temps d\'espera superat. Assegureu-vos de tenir una connexió a internet estable i que el servidor siga accessible.',
        gpsTimeout: 'Temps d\'espera superat. Assegureu-se de tindre el GPS actiu al dispositiu.',
        gpsAccess: 'No es pot accedir a la ubicació perquè està desactivada o l\'aplicació no té permisos',
        gpsConnection: 'No s\'han pogut obtenir les coordenades de la ubicació a causa d\'una baixa connectivitat',
        required: 'Completi tots els camps requerits. ',
        bufferSize: 'Hi ha hagut un problema a la inserció de la taula @, hauríeu de provar a reduir la mida del buffer intermèdia a la seva configuració',
        avatarSize: 'Sembla que la imatge de perfil és massa pesada',
        noExistingTable: 'Sembla que la taula @ no existeix',
        nonSecureApi: 'El vostre navegador no admet accés a la base de dades a excepció de l\'ús de HTTPS o localhost. Per favor instal·la un certificat SSL o accedeix des de la màquina localhost durant el desenvolupament'
    },
    sync: {
        last: 'Última sincronització:',
        refresh: 'Refrescar dades',
        overwrite: 'Sobreescriure dades',
        confirmOverwrite: 'Sobreescriure totes les dades?',
        confirmOverwriteText: 'Assegureu-se d\'enviar tots els canvis abans de confirmar per evitar la perduda de dades.',
        send: 'Enviar i rebre',
        templates: 'Actualitzar disseny',
        backup: 'Crear còpia de seguretat',
        backupDownloadErr: 'S\'ha produït un error en baixar la còpia de segutetat',
        backupDownloaded: 'La còpia de seguretat s\'ha desat a la carpeta de documents',
        restore: 'Restaurar base de dades',
        restoreSuccess: 'Les dades s\'han restaurat correctament',
        restoreError: 'Ha ocorregut un error al intentar introduir les dades del fitxer',
        restoreInvalid: 'El format del fitxer no es vàlid, ha de ser un .bak',
        createBackupHeader: 'Seleccioneu el tipus de còpia',
        createBackupMessage: 'Vol fer la còpia només de la base de dades o vol hacer fer una còpia completa?',
        onlyDB: 'Només base de dades',
        complete: 'Completa',
        notValidZip: 'No s\'ha trobat cap fitxer de base de dades en al fitxer introduït',
        connectionErr: 'Error en connectar-se a la base de dades',
        noChanges: 'No hi ha canvis pendents'
    },
    image: {
        delete: 'Eliminar',
        msg: 'Voleu eliminar la imatge?',
        warning: 'La imatge no es pot eliminar des del dispositiu perquè ja es troba al servidor principal. Feu aquesta acció des de l\'entorn d\'escriptori.',
        title: 'Galeria',
        downloaded: 'La imatge s\'ha desat a la carpeta de documents',
        errDownload: 'S\'ha produït un error en baixar la imatge, comproveu la connexió a Internet',
        downloadedNoti: 'La imatge % s\'ha descarregat correctament'
    },
    document: {
        delete: 'Eliminar',
        download: 'Descarregar',
        edit: 'Editar',
        description: 'Descripció',
        msg: 'Vols eliminar el document?',
        msgEdit: 'Editar descripció',
        msgEditSuccess: 'La descripció s\'ha modificat correctament',
        warning: 'El document no es pot eliminar des del dispositiu perquè ja es troba al servidor principal. Feu aquesta acció des de l\'entorn d\'escriptori.',
        title: 'Documents',
        downloaded: 'El fitxer s\'ha desat a la carpeta de documents',
        errDownload: 'S\'ha produït un error en baixar el fitxer. Comproveu la connexió a Internet',
        downloadedNoti: 'L\'arxiu % s\'ha descarregat correctament'
    },
    gps: {
        activationMsg: 'Aquesta aplicació requereix l\'ús del GPS, per favor activa\'l',
        activationSubmsg: 'Flexygo Mobile recopila dades d\'ubicació per habilitar la <b>traçabilitat logística</b> i la <b>planificació en temps real</b> fins i tot quan l\'aplicació està tancada o no està en ús.\nQuan això passi, serà informat mitjançant una notificació emergent.',
        continue: 'Continuar',
        policy: 'Política de privacitat'
    },
    tracking: {
        notificationTitle: ' està fent un seguiment de la teva posició',
        notificationText: 'Toca per navegar-hi a ',
        usingPC: 'Les funcionalitats de seguiment només estan disponibles en dispositius mòbils'
    },
    nfc: {
        readyMsg: 'A punt per llegir',
        activateNFC: 'NFC desactivat',
        activate: 'Activar'
    },
    usermenu: {
        changePass: 'Canviar contrasenya',
        current: 'Contrasenya actual',
        new: 'Nova contrasenya',
        repeat: 'Repetir contrasenya',
        loading: 'Canviant contrasenya',
        success: 'La contrasenya ha sigut canviada',
        mustChange: 'Has d\'actualitzar la contrasenya',
        changePassError: 'Aquesta funció encara no està disponible',
        title: 'Perfil'
    },
    sendData: {
        title: 'Informació de tramesa',
        time: 'Encara no s\'han enviat dades',
        error: 'No hi ha hagut cap error en l\'últim enviament de dades',
        ping: 'Encara no s\'ha provat cap ping',
        location: 'Encara no hi ha cap ubicació registrada',
        sendErrorLogs: 'Enviar informació'
    }
};

const frfr = {
    login: {
        appsListTitle: 'Veuillez choisir une application',
        invalidPsw: 'Le nom d\'utilisateur ou mot de passe est incorrect',
        connectionErr: 'Erreur de connexion, URL incorrecte ou WebAPI désactivée',
        username: 'Nom d\'utilisateur',
        password: 'Mot de passe',
        login: 'Connexion',
        blankUrl: 'L\'URL ne peut pas être vide',
        blankUsr: 'L\'utilisateur ne peut pas être vide',
        blankPsw: 'Le mot de passe ne peut pas rester vide',
        wrongtURL: 'URL incorrecte'
    },
    menu: {
        menu: 'Menu',
        home: 'Début',
        sync: 'Sync',
        syncMore: 'Plus d\'options',
        logout: 'Déconnecter',
        logoutHeader: 'Confirmer la déconnexion',
        logoutMessage: 'Gardez à l\'esprit que si vous vous déconnectez maintenant, vous perdrez les données que vous avez pas transféré'
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
        syncTimeout: 'Temps libre. Assurez-vous d\'avoir une connexion Internet stable et que le serveur est accessible.',
        gpsTimeout: 'Le temps d\'attente a été dépassé. Assurez-vous que votre GPS est actif sur l\'appareil.',
        gpsAccess: 'L\'emplacement n\'est pas accessible car il est désactivé ou l\'application n\'a pas d\'autorisations',
        gpsConnection: 'Impossible d\'obtenir les coordonnées de localisation en raison d\'une mauvaise connectivité',
        required: 'Remplissez tous les champs obligatoires: ',
        bufferSize: 'Il y a eu un problème sur la table @ insertion, vous devriez essayer de diminuer la taille du tampon dans ses paramètres',
        avatarSize: 'Il semble que l\'image de profil soit trop lourde',
        noExistingTable: 'Il semble que la table @ n\'existe pas',
        nonSecureApi: 'Votre navigateur n\'autorise pas l\'accès à la base de données sans HTTPS ou localhost. Veuillez installer un certificat SSL ou accéder à partir de la machine hôte local pendant le développement'
    },
    sync: {
        last: 'Dernière synchronisation:',
        refresh: 'Actualiser données',
        overwrite: 'Écraser données',
        confirmOverwrite: 'Écraser toutes les données?',
        confirmOverwriteText: 'Veuillez envoyer toutes les données avant d\'utiliser ce bouton pour éviter la perte de données.',
        send: 'Envoyer et recevoir',
        templates: 'Mettre à jour la conception',
        backup: 'Créer une sauvegarde',
        backupDownloadErr: 'Une erreur s\'est produite lors du téléchargement de la sauvegarde',
        backupDownloaded: 'La sauvegarde a été enregistrée dans le dossier des documents',
        restore: 'Restaurer la base de données',
        restoreSuccess: 'Les données ont été restaurées avec succès',
        restoreError: 'Il y avait une erreur lors de la tentative d\'entrer les données du fichier',
        restoreInvalid: 'Le format de fichier n\'est pas valide, il doit s\'agir d\'un .bak',
        createBackupHeader: 'Sélectionnez le type de copie',
        createBackupMessage: 'Voulez-vous faire une copie de la base de données uniquement ou voulez-vous faire une copie complète?',
        onlyDB: 'Base de données uniquement',
        complete: 'Complète',
        notValidZip: 'Aucun fichier de base de données trouvé dans le fichier saisi',
        connectionErr: 'Erreur lors de la connexion à la base de données',
        noChanges: 'Il n\'y a aucun changement en attente'
    },
    image: {
        delete: 'Retirer',
        msg: 'Voulez-vous supprimer l\'image?',
        warning: 'L\'image ne peut pas être supprimée de l\'appareil car elle se trouve déjà sur le serveur principal. Faites cela à partir de l\'environnement de bureau.',
        title: 'Galerie',
        downloaded: 'L\'image a été enregistrée dans le dossier des documents',
        errDownload: 'Une erreur s\'est produite lors du téléchargement de l\'image, vérifiez la connexion Internet',
        downloadedNoti: 'L\'image % a été téléchargé avec succès'
    },
    document: {
        delete: 'Eliminar',
        download: 'Télécharger',
        edit: 'Éditer',
        description: 'Description',
        msg: 'Voulez-vous supprimer le document?',
        msgEdit: 'Éditer la description',
        msgEditSuccess: 'La description a été modifiée avec succès',
        warning: 'Le document ne peut pas être supprimé de l\'appareil car il se trouve déjà sur le serveur principal. Faites cela à partir de l\'environnement de bureau.',
        title: 'Des documents',
        downloaded: 'Le fichier a été enregistré dans le dossier des documents',
        errDownload: 'Une erreur s\'est produite lors du téléchargement du fichier, vérifiez la connexion Internet',
        downloadedNoti: 'Le fichier % a été téléchargé avec succès'
    },
    gps: {
        activationMsg: 'Cette application nécessite une fonction de localisation GPS, veuillez l\'activer pour continuer',
        activationSubmsg: 'Flexygo Mobile collecte des données de localisation pour permettre la <b>traçabilité logistique</b> et la <b>planification en temps réel</b>, même lorsque l\'application est fermée ou non utilisée.\nLorsque cela se produit, vous serez informé par une notification contextuelle.',
        continue: 'Continuer',
        policy: 'Politique de confidentialité'
    },
    tracking: {
        notificationTitle: ' suit votre position',
        notificationText: 'Touchez pour naviguer vers ',
        usingPC: 'Les fonctionnalités de suivi ne sont disponibles que sur les appareils mobiles'
    },
    nfc: {
        readyMsg: 'Prêt à lire',
        activateNFC: 'NFC désactivé',
        activate: 'Activer'
    },
    usermenu: {
        changePass: 'Changer le mot de passe',
        current: 'Mot de passe actuel',
        new: 'Nouveau mot de passe',
        repeat: 'Répéter le mot de passe',
        loading: 'Mettre à jour le mot de passe',
        success: 'Le mot de passe a été changé avec succès',
        mustChange: 'Vous devez mettre à jour votre mot de passe',
        changePassError: 'Cette fonction n\'est pas encore disponible',
        title: 'Profil'
    },
    sendData: {
        title: 'Informations d\'expédition',
        time: 'Il n\'y a pas encore eu d\'envoi de données',
        error: 'Il n\'y avait pas d\'erreur dans le dernier envoi de données',
        ping: 'Il n\'y a pas encore eu de ping testé',
        location: 'Aucun emplacement n\'a encore été enregistré',
        sendErrorLogs: 'Envoyer une information'
    }
};

const eses = {
    login: {
        appsListTitle: 'Por favor, escoja una aplicación',
        invalidPsw: 'Contraseña o usuario incorrectos',
        connectionErr: 'Error de conexion, URL incorrecta o WebAPI deshabilitada',
        username: 'Nombre de usuario',
        password: 'Contraseña',
        login: 'Iniciar sesión',
        blankUrl: 'La Url no puede estar vacía',
        blankUsr: 'El nombre de usuario no puede estar vacío',
        blankPsw: 'La contraseña no puede estar vacía',
        wrongtURL: 'URL incorrecta'
    },
    menu: {
        menu: 'Menú',
        home: 'Inicio',
        sync: 'Sincronizar',
        syncMore: 'Más opciones',
        logout: 'Desconectar',
        logoutHeader: 'Confirmar desconexión',
        logoutMessage: 'Tenga en cuenta que si desconectas ahora perderás los datos que no hayas subido'
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
        syncTimeout: 'Tiempo de espera superado. Asegurese de tener una conexión a internet estable y que el servidor es accesible.',
        gpsTimeout: 'Tiempo de espera superado. Asegurese de tener el GPS activo en el dispositivo.',
        gpsAccess: 'No se puede acceder a la ubicación ya que está desactivada o la aplicación no tiene permisos',
        gpsConnection: 'No se pudieron obtener las coordenadas de la ubicación debido a una baja conectividad',
        required: 'Complete todos los campos requeridos: ',
        bufferSize: 'Hubo un problema en la insercioón de la tabla @, debería intentar disminuir el tamaño del búfer en la configuración de esta',
        avatarSize: 'Parece que la imagen de perfil es demasiado pesada',
        noExistingTable: 'Parece que la tabla @ no existe',
        nonSecureApi: 'Tu navegador no admite acceso a la base de datos a excepción del uso de HTTPS o localhost. Por favor instala un certificado SSL o accede desde la máquina localhost durante el desarrollo'
    },
    sync: {
        last: 'Última Sincronización:',
        refresh: 'Refrescar datos',
        overwrite: 'Sobreescribir datos',
        confirmOverwrite: 'Sobreescribir todo?',
        confirmOverwriteText: 'Asegurese de haber realizado un envio antes de aceptar este mensaje para evitar perdida de datos.',
        send: 'Enviar y recibir',
        templates: 'Actualizar diseño',
        backup: 'Crear copia de seguridad',
        backupDownloadErr: 'Ha ocurrido un error descargando la copia de seguridad',
        backupDownloaded: 'La copia de seguridad ha sido guardada en la carpeta documentos',
        restore: 'Restaurar base de datos',
        restoreSuccess: 'Los datos han sido restaurados correctamente',
        restoreError: 'Hubo un error al intentar introducir los datos del fichero',
        restoreInvalid: 'El formato del fichero no es válido, debe ser un .bak',
        createBackupHeader: 'Seleccione el tipo de copia',
        createBackupMessage: '¿Quiere hacer la copia solamente de la base de datos o quiere hacer una copia completa?',
        onlyDB: 'Solo base de datos',
        complete: 'Completa',
        notValidZip: 'No se ha encontrado ningun fichero de base de datos en el archivo introducido',
        connectionErr: 'Error al establecer conexión con el servidor',
        noChanges: 'No hay cambios pendientes'
    },
    image: {
        delete: 'Eliminar',
        msg: '¿Desea eliminar la imagen?',
        warning: 'La imagen no se puede eliminar desde el dispositivo porque ya se encuentra en el servidor principal. Realice esta acción desde el entorno de escritorio.',
        title: 'Galería',
        downloaded: 'La imagen ha sido guardada en la carpeta documentos',
        errDownload: 'Ha ocurrido un error descargando la imagen revise la conexión a internet',
        downloadedNoti: 'La imagen % se ha descargado correctamente'
    },
    document: {
        delete: 'Eliminar',
        download: 'Descargar',
        edit: 'Editar',
        description: 'Descripción',
        msg: '¿Desea eliminar el documento?',
        msgEdit: 'Editar descripción',
        msgEditSuccess: 'La descripción se ha modificado correctamente',
        warning: 'El documento no se puede eliminar desde el dispositivo porque ya se encuentra en el servidor principal. Realice esta acción desde el entorno de escritorio.',
        title: 'Documentos',
        downloaded: 'El archivo ha sido guardado en la carpeta documentos',
        errDownload: 'Ha ocurrido un error descargando el archivo revise la conexión a internet',
        downloadedNoti: 'El archivo % se ha descargado correctamente'
    },
    gps: {
        activationMsg: 'Esta aplicación requiere del uso del GPS, por favor activelo',
        activationSubmsg: 'Flexygo Mobile recopila datos de ubicación para habilitar la <b>trazabilidad logística</b> y la <b>planificación en tiempo real</b> incluso cuando la aplicación está cerrada o no está en uso.\nCuando esto ocurra, será informado mediante una notificación emergente.',
        continue: 'Continuar',
        policy: 'Política de privacidad'
    },
    tracking: {
        notificationTitle: ' está rastreando tu posición',
        notificationText: 'Toque para navegar a ',
        usingPC: 'Las funciones de tracking solo están disponibles en dispositivos móviles'
    },
    nfc: {
        readyMsg: 'Listo para leer',
        activateNFC: 'NFC desactivado',
        activate: 'Activar'
    },
    usermenu: {
        changePass: 'Cambiar contraseña',
        current: 'Contraseña actual',
        new: 'Nueva contraseña',
        repeat: 'Repetir contraseña',
        loading: 'Cambiando contraseña',
        success: 'La contraseña ha sido cambiada',
        mustChange: 'Debes de cambiar la contraseña',
        changePassError: 'Esta función no está aún disponible',
        title: 'Perfil'
    },
    sendData: {
        title: 'Información de envío',
        time: 'Todavía no ha habido ningún envío',
        error: 'Todavía no ha habido un error en un envío',
        ping: 'No se ha obtenido un ping todavía',
        location: 'No se ha registrado ninguna localización todavía',
        sendErrorLogs: 'Enviar información'
    }
};

const dede = {
    login: {
        appsListTitle: 'Bitte wählen Sie eine Anwendung',
        invalidPsw: 'Der Benutzername oder das Passwort ist falsch',
        connectionErr: 'Verbindungsfehler, falsche URL oder WebAPI ist deaktiviert',
        username: 'Nutzername',
        password: 'Passwort',
        login: 'Einloggen',
        blankUrl: 'Die URL darf nicht leer sein',
        blankUsr: 'Der Benutzer darf nicht leer sein',
        blankPsw: 'Das Passwort darf nicht leer sein',
        wrongtURL: 'Falsche URL'
    },
    menu: {
        menu: 'Menü',
        home: 'Start',
        sync: 'Sync',
        syncMore: 'Mehr optionen',
        logout: 'Ausloggen',
        logoutHeader: 'Abmelden bestätigen',
        logoutMessage: 'Denken Sie daran, dass, wenn Sie sich jetzt trennen Sie die Daten verlieren, dass Sie nicht hochgeladen'
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
        syncTimeout: 'Auszeit. Stellen Sie sicher, dass Sie über eine stabile Internetverbindung verfügen und dass der Server erreichbar ist.',
        gpsTimeout: 'Wartezeit überschritten. Stellen Sie sicher, dass Ihr Gerät über aktives GPS verfügt.',
        gpsAccess: 'Auf den Standort kann nicht zugegriffen werden, da er deaktiviert ist oder die App keine Berechtigungen hat',
        gpsConnection: 'Standortkoordinaten konnten aufgrund einer geringen Konnektivität nicht abgerufen werden',
        required: 'Füllen Sie alle erforderlichen Felder aus: ',
        bufferSize: 'Beim Einfügen von Tabelle @ ist ein Problem aufgetreten. Sie sollten versuchen, die Puffergröße in den Einstellungen zu verringern',
        avatarSize: 'Anscheinend ist das Profilbild zu schwer',
        noExistingTable: 'Es scheint, dass die Tabelle @ nicht existiert',
        nonSecureApi: 'Ihr Browser erlaubt keinen Datenbankzugriff ohne HTTPS oder localhost. Bitte installieren Sie während der Entwicklung ein SSL-Zertifikat oder greifen Sie vom lokalen Host-Computer aus zu'
    },
    sync: {
        last: 'Letzte Synchronisation:',
        refresh: 'Daten aktualisieren',
        overwrite: 'Daten überschreiben',
        confirmOverwrite: 'Alle Daten überschreiben?',
        confirmOverwriteText: 'Bitte senden Sie alle Daten, bevor Sie diese Schaltfläche verwenden, um Datenverlust zu vermeiden.',
        send: 'Senden und Empfangen',
        templates: 'Vorlagen aktualisieren',
        backup: 'Een backup maken ',
        backupDownloadErr: 'Beim Herunterladen der Sicherung ist ein Fehler aufgetreten',
        backupDownloaded: 'Die Sicherung wurde im Dokumentenordner gespeichert',
        restore: 'Database herstellen',
        restoreSuccess: 'Daten erfolgreich wiederhergestellt',
        restoreError: 'Beim Versuch, die Dateidaten einzugeben, ist ein Fehler aufgetreten',
        restoreInvalid: 'Das Dateiformat ist ungültig, es muss eine BAK-Datei sein',
        createBackupHeader: 'Wählen Sie die Art der Kopie',
        createBackupMessage: 'Haben Sie eine Kopie der Datenbank vornehmen möchten nur oder haben Sie eine vollständige Kopie machen wollen?',
        onlyDB: 'Nur Datenbank',
        complete: 'Komplett',
        notValidZip: 'In der eingegebenen Datei wurde keine Datenbankdatei gefunden',
        connectionErr: 'Fehler beim Verbinden mit der Datenbank',
        noChanges: 'Es stehen keine Änderungen an'
    },
    image: {
        delete: 'Entfernen',
        msg: 'Möchten Sie das Bild löschen?',
        warning: 'Das Image kann nicht vom Gerät gelöscht werden, da es sich bereits auf dem Hauptserver befindet. Tun Sie dies von der Desktop-Umgebung aus.',
        title: 'Galerie',
        downloaded: 'Das Bild wurde im Dokumentenordner gespeichert',
        errDownload: 'Beim Herunterladen des Bildes ist ein Fehler aufgetreten, überprüfen Sie die Internetverbindung',
        downloadedNoti: 'Die Bild % wurde erfolgreich heruntergeladen'
    },
    document: {
        delete: 'Eliminar',
        download: 'Herunterladen',
        edit: 'Bewerk',
        description: 'Omschrijving',
        msg: 'Möchten Sie das Dokument löschen?',
        msgEdit: 'Bewerk beschrijving',
        msgEditSuccess: 'De beschrijving is succesvol aangepast',
        warning: 'Das Dokument kann nicht vom Gerät gelöscht werden, da es sich bereits auf dem Hauptserver befindet. Tun Sie dies von der Desktop-Umgebung aus.',
        title: 'Unterlagen',
        downloaded: 'Die Datei wurde im Dokumentenordner gespeichert',
        errDownload: 'Beim Herunterladen der Datei ist ein Fehler aufgetreten, überprüfen Sie die Internetverbindung',
        downloadedNoti: 'Die Datei % wurde erfolgreich heruntergeladen'
    },
    gps: {
        activationMsg: 'Diese Anwendung benötigt eine GPS-Ortungsfunktion. Bitte aktivieren Sie diese, um fortzufahren',
        activationSubmsg: 'Flexygo Mobile sammelt Standortdaten, um die <b>logistische Rückverfolgbarkeit</b> und <b>Planung in Echtzeit</b> zu ermöglichen, selbst wenn die App geschlossen oder nicht verwendet wird.\nWenn dies geschieht, werden Sie durch eine Popup-Benachrichtigung informiert.',
        continue: 'Fortsetzen',
        policy: 'Datenschutz-Bestimmungen'
    },
    tracking: {
        notificationTitle: ' verfolgt deine Position',
        notificationText: 'Berühren, um zu zu navigieren ',
        usingPC: 'Tracking-Funktionen sind nur auf Mobilgeräten verfügbar'
    },
    nfc: {
        readyMsg: 'Bereit zum Lesen',
        activateNFC: 'NFC aus',
        activate: 'Aktivieren Sie'
    },
    usermenu: {
        changePass: 'Passwort ändern',
        current: 'Jetziges Passwort',
        new: 'Neues Passwort',
        repeat: 'Wiederhole das Passwort',
        loading: 'Passwort aktualisieren',
        success: 'Kennwort wurde erfolgreich geändert',
        mustChange: 'Sie müssen Ihr Passwort aktualisieren',
        changePassError: 'Diese Funktion ist noch nicht verfügbar',
        title: 'Profil'
    },
    sendData: {
        title: 'Versandinformationen',
        time: 'Es wurde noch kein Datenversand durchgeführt',
        error: 'Beim letzten Datenversand ist kein Fehler aufgetreten',
        ping: 'Es wurde noch kein Ping getestet',
        location: 'Es wurde noch kein Standort registriert',
        sendErrorLogs: 'Sende Informationen'
    }
};

const engb = {
    login: {
        appsListTitle: 'Please, choose an application',
        invalidPsw: 'The username or password is incorrect',
        connectionErr: 'Connection error, wrong URL or WebAPI is disabled',
        username: 'Username',
        password: 'Password',
        login: 'Login',
        blankUrl: 'Url can\'t be blank',
        blankUsr: 'User can\'t be blank',
        blankPsw: 'Password can\'t be blank',
        wrongtURL: 'Wrong URL'
    },
    menu: {
        menu: 'Menu',
        home: 'Home',
        sync: 'Sync',
        syncMore: 'More options',
        logout: 'Logout',
        logoutHeader: 'Confirm disconnection',
        logoutMessage: 'Keep in mind that if you disconnect now you will lose the data that you have not uploaded'
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
        syncTimeout: 'Timeout. Make sure you have an stable internet connection and that the server is accessible.',
        gpsTimeout: 'Timeout. Please, enable GPS settings',
        gpsAccess: 'The location cannot be accessed as it is disabled or the app does not have permissions',
        gpsConnection: 'Unable to get location coordinates due to a poor connectivity',
        required: 'Complete all required fields: ',
        bufferSize: 'There was a problem on table @ insertion, you should try decreasing buffer size in its settings',
        avatarSize: 'It seems the profile image is too heavy',
        noExistingTable: 'It seems that the table @ does not exist',
        nonSecureApi: 'Your browser doesn\'t allow database access without HTTPS or localhost. Please, install an SSL certificate or access from localhost machine during development'
    },
    sync: {
        last: 'Last sync on:',
        refresh: 'Refresh Data',
        overwrite: 'Overwrite Data',
        confirmOverwrite: 'Overwrite all data?',
        confirmOverwriteText: 'Please, send all data before use this button to avoid data lost.',
        send: 'Send & Recive',
        templates: 'Update Templates',
        backup: 'Backup Database',
        backupDownloadErr: 'There was an error downloading the backup',
        backupDownloaded: 'The backup has been saved in documents folder',
        restore: 'Restore Database',
        restoreSuccess: 'Data has successfully been restored',
        restoreError: 'An error occurred while inserting file data',
        restoreInvalid: 'The file format is not valid, it must be a .bak',
        createBackupHeader: 'Select the copy mode',
        createBackupMessage: 'Do you want to make a backup with only database data or do you want a complete one?',
        onlyDB: 'Only database',
        complete: 'Complete',
        notValidZip: 'No database file found in the entered file',
        connectionErr: 'Error on connecting to database',
        noChanges: 'There\'s no changes pending'
    },
    image: {
        delete: 'Remove',
        msg: 'Do you want to delete the image?',
        warning: 'The image cannot be deleted from the device because it is already on the main server. Do this from the desktop environment.',
        title: 'Gallery',
        downloaded: 'The image has been saved in documents folder',
        errDownload: 'There was an error downloading the picture, check internet connection',
        downloadedNoti: 'Image % was succesfully downloaded'
    },
    document: {
        delete: 'Delete',
        download: 'Download',
        edit: 'Edit',
        msg: 'Do you want to delete the document?',
        msgEdit: 'Edit description',
        description: 'Description',
        msgEditSuccess: 'Description has been successfully modified',
        warning: 'The document cannot be deleted from the device because it is already on the main server. Do this from the desktop environment.',
        title: 'Documents',
        downloaded: 'The file has been saved in documents folder',
        errDownload: 'There was an error downloading the file, check internet connection',
        downloadedNoti: 'File % was succesfully downloaded'
    },
    gps: {
        activationMsg: 'This application needs GPS location feature, please activate it to continue',
        activationSubmsg: 'Flexygo Mobile collects location data to enable <b>logistics traceability</b> and <b>planning in real time</b> even when the app is closed or not in use.\nWhen this happens, you will be informed by a pop-up notification.',
        continue: 'Continue',
        policy: 'Privacy Policy'
    },
    tracking: {
        notificationTitle: ' is tracking your position',
        notificationText: 'Touch to navigate to ',
        usingPC: 'Tracking functionalities are only available on mobile devices'
    },
    nfc: {
        readyMsg: 'Ready to read',
        activateNFC: 'NFC off',
        activate: 'Activate'
    },
    usermenu: {
        changePass: 'Change password',
        current: 'Current password',
        new: 'New password',
        repeat: 'Repeat password',
        loading: 'Updating password',
        success: 'Password was successfully changed',
        changePassError: 'This functions is not yet available',
        title: 'Profile'
    },
    sendData: {
        title: 'Send data info',
        time: 'There wasn\'t a send yet',
        error: 'There wasn\'t an error in last send',
        ping: 'There wasn\'t a ping tested yet',
        location: 'There wasn\'t a location registered yet',
        sendErrorLogs: 'Send data'
    }
};

var NFC = /** @class */ (function (_super) {
    __extends$1(NFC, _super);
    function NFC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NFC.prototype.readerMode = function (flags) { return cordova$1(this, "readerMode", { "observable": true, "clearFunction": "disableReaderMode", "clearWithArgs": false }, arguments); };
    NFC.prototype.scanNdef = function (options) { return cordova$1(this, "scanNdef", { "sync": true }, arguments); };
    NFC.prototype.scanTag = function (options) { return cordova$1(this, "scanTag", { "sync": true }, arguments); };
    NFC.prototype.cancelScan = function () { return cordova$1(this, "cancelScan", { "sync": true }, arguments); };
    NFC.prototype.connect = function (tech, timeout) { return cordova$1(this, "connect", { "sync": true }, arguments); };
    NFC.prototype.close = function () { return cordova$1(this, "close", { "sync": true }, arguments); };
    NFC.prototype.transceive = function (data) { return cordova$1(this, "transceive", { "sync": true }, arguments); };
    NFC.prototype.beginSession = function (onSuccess, onFailure) { return cordova$1(this, "beginSession", { "observable": true, "successIndex": 0, "errorIndex": 3, "clearFunction": "invalidateSession", "clearWithArgs": true }, arguments); };
    NFC.prototype.addNdefListener = function (onSuccess, onFailure) { return cordova$1(this, "addNdefListener", { "observable": true, "successIndex": 0, "errorIndex": 3, "clearFunction": "removeNdefListener", "clearWithArgs": true }, arguments); };
    NFC.prototype.addTagDiscoveredListener = function (onSuccess, onFailure) { return cordova$1(this, "addTagDiscoveredListener", { "observable": true, "successIndex": 0, "errorIndex": 3, "clearFunction": "removeTagDiscoveredListener", "clearWithArgs": true }, arguments); };
    NFC.prototype.addMimeTypeListener = function (mimeType, onSuccess, onFailure) { return cordova$1(this, "addMimeTypeListener", { "observable": true, "successIndex": 1, "errorIndex": 4, "clearFunction": "removeMimeTypeListener", "clearWithArgs": true }, arguments); };
    NFC.prototype.addNdefFormatableListener = function (onSuccess, onFailure) { return cordova$1(this, "addNdefFormatableListener", { "observable": true, "successIndex": 0, "errorIndex": 3 }, arguments); };
    NFC.prototype.write = function (message) { return cordova$1(this, "write", {}, arguments); };
    NFC.prototype.makeReadOnly = function () { return cordova$1(this, "makeReadOnly", {}, arguments); };
    NFC.prototype.share = function (message) { return cordova$1(this, "share", {}, arguments); };
    NFC.prototype.unshare = function () { return cordova$1(this, "unshare", {}, arguments); };
    NFC.prototype.erase = function () { return cordova$1(this, "erase", {}, arguments); };
    NFC.prototype.handover = function (uris) { return cordova$1(this, "handover", {}, arguments); };
    NFC.prototype.stopHandover = function () { return cordova$1(this, "stopHandover", {}, arguments); };
    NFC.prototype.showSettings = function () { return cordova$1(this, "showSettings", {}, arguments); };
    NFC.prototype.enabled = function () { return cordova$1(this, "enabled", {}, arguments); };
    NFC.prototype.bytesToString = function (bytes) { return cordova$1(this, "bytesToString", { "sync": true }, arguments); };
    NFC.prototype.stringToBytes = function (str) { return cordova$1(this, "stringToBytes", { "sync": true }, arguments); };
    NFC.prototype.bytesToHexString = function (bytes) { return cordova$1(this, "bytesToHexString", { "sync": true }, arguments); };
    Object.defineProperty(NFC.prototype, "FLAG_READER_NFC_A", {
        get: function () { return cordovaPropertyGet(this, "FLAG_READER_NFC_A"); },
        set: function (value) { cordovaPropertySet(this, "FLAG_READER_NFC_A", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NFC.prototype, "FLAG_READER_NFC_B", {
        get: function () { return cordovaPropertyGet(this, "FLAG_READER_NFC_B"); },
        set: function (value) { cordovaPropertySet(this, "FLAG_READER_NFC_B", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NFC.prototype, "FLAG_READER_NFC_F", {
        get: function () { return cordovaPropertyGet(this, "FLAG_READER_NFC_F"); },
        set: function (value) { cordovaPropertySet(this, "FLAG_READER_NFC_F", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NFC.prototype, "FLAG_READER_NFC_V", {
        get: function () { return cordovaPropertyGet(this, "FLAG_READER_NFC_V"); },
        set: function (value) { cordovaPropertySet(this, "FLAG_READER_NFC_V", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NFC.prototype, "FLAG_READER_NFC_BARCODE", {
        get: function () { return cordovaPropertyGet(this, "FLAG_READER_NFC_BARCODE"); },
        set: function (value) { cordovaPropertySet(this, "FLAG_READER_NFC_BARCODE", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NFC.prototype, "FLAG_READER_SKIP_NDEF_CHECK", {
        get: function () { return cordovaPropertyGet(this, "FLAG_READER_SKIP_NDEF_CHECK"); },
        set: function (value) { cordovaPropertySet(this, "FLAG_READER_SKIP_NDEF_CHECK", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NFC.prototype, "FLAG_READER_NO_PLATFORM_SOUNDS", {
        get: function () { return cordovaPropertyGet(this, "FLAG_READER_NO_PLATFORM_SOUNDS"); },
        set: function (value) { cordovaPropertySet(this, "FLAG_READER_NO_PLATFORM_SOUNDS", value); },
        enumerable: false,
        configurable: true
    });
    NFC.pluginName = "NFC";
    NFC.plugin = "phonegap-nfc";
    NFC.pluginRef = "nfc";
    NFC.repo = "https://github.com/chariotsolutions/phonegap-nfc";
    NFC.platforms = ["Android", "iOS", "Windows"];
    NFC.decorators = [
        { type: Injectable }
    ];
    return NFC;
}(IonicNativePlugin));
var Ndef = /** @class */ (function (_super) {
    __extends$1(Ndef, _super);
    function Ndef() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ndef.prototype.record = function (tnf, type, id, payload) { return cordova$1(this, "record", { "sync": true }, arguments); };
    Ndef.prototype.textRecord = function (text, languageCode, id) { return cordova$1(this, "textRecord", { "sync": true }, arguments); };
    Ndef.prototype.uriRecord = function (uri, id) { return cordova$1(this, "uriRecord", { "sync": true }, arguments); };
    Ndef.prototype.absoluteUriRecord = function (uri, payload, id) { return cordova$1(this, "absoluteUriRecord", { "sync": true }, arguments); };
    Ndef.prototype.mimeMediaRecord = function (mimeType, payload) { return cordova$1(this, "mimeMediaRecord", { "sync": true }, arguments); };
    Ndef.prototype.smartPoster = function (ndefRecords, id) { return cordova$1(this, "smartPoster", { "sync": true }, arguments); };
    Ndef.prototype.emptyRecord = function () { return cordova$1(this, "emptyRecord", { "sync": true }, arguments); };
    Ndef.prototype.androidApplicationRecord = function (packageName) { return cordova$1(this, "androidApplicationRecord", { "sync": true }, arguments); };
    Ndef.prototype.encodeMessage = function (ndefRecords) { return cordova$1(this, "encodeMessage", { "sync": true }, arguments); };
    Ndef.prototype.decodeMessage = function (bytes) { return cordova$1(this, "decodeMessage", { "sync": true }, arguments); };
    Ndef.prototype.decodeTnf = function (tnf_byte) { return cordova$1(this, "decodeTnf", { "sync": true }, arguments); };
    Ndef.prototype.encodeTnf = function (mb, me, cf, sr, il, tnf) { return cordova$1(this, "encodeTnf", { "sync": true }, arguments); };
    Ndef.prototype.tnfToString = function (tnf) { return cordova$1(this, "tnfToString", { "sync": true }, arguments); };
    Object.defineProperty(Ndef.prototype, "TNF_EMPTY", {
        get: function () { return cordovaPropertyGet(this, "TNF_EMPTY"); },
        set: function (value) { cordovaPropertySet(this, "TNF_EMPTY", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ndef.prototype, "TNF_WELL_KNOWN", {
        get: function () { return cordovaPropertyGet(this, "TNF_WELL_KNOWN"); },
        set: function (value) { cordovaPropertySet(this, "TNF_WELL_KNOWN", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ndef.prototype, "TNF_MIME_MEDIA", {
        get: function () { return cordovaPropertyGet(this, "TNF_MIME_MEDIA"); },
        set: function (value) { cordovaPropertySet(this, "TNF_MIME_MEDIA", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ndef.prototype, "TNF_ABSOLUTE_URI", {
        get: function () { return cordovaPropertyGet(this, "TNF_ABSOLUTE_URI"); },
        set: function (value) { cordovaPropertySet(this, "TNF_ABSOLUTE_URI", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ndef.prototype, "TNF_EXTERNAL_TYPE", {
        get: function () { return cordovaPropertyGet(this, "TNF_EXTERNAL_TYPE"); },
        set: function (value) { cordovaPropertySet(this, "TNF_EXTERNAL_TYPE", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ndef.prototype, "TNF_UNKNOWN", {
        get: function () { return cordovaPropertyGet(this, "TNF_UNKNOWN"); },
        set: function (value) { cordovaPropertySet(this, "TNF_UNKNOWN", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ndef.prototype, "TNF_UNCHANGED", {
        get: function () { return cordovaPropertyGet(this, "TNF_UNCHANGED"); },
        set: function (value) { cordovaPropertySet(this, "TNF_UNCHANGED", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ndef.prototype, "TNF_RESERVED", {
        get: function () { return cordovaPropertyGet(this, "TNF_RESERVED"); },
        set: function (value) { cordovaPropertySet(this, "TNF_RESERVED", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ndef.prototype, "textHelper", {
        get: function () { return cordovaPropertyGet(this, "textHelper"); },
        set: function (value) { cordovaPropertySet(this, "textHelper", value); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Ndef.prototype, "uriHelper", {
        get: function () { return cordovaPropertyGet(this, "uriHelper"); },
        set: function (value) { cordovaPropertySet(this, "uriHelper", value); },
        enumerable: false,
        configurable: true
    });
    Ndef.pluginName = "NFC";
    Ndef.plugin = "phonegap-nfc";
    Ndef.pluginRef = "ndef";
    Ndef.decorators = [
        { type: Injectable }
    ];
    return Ndef;
}(IonicNativePlugin));
var NfcUtil = /** @class */ (function (_super) {
    __extends$1(NfcUtil, _super);
    function NfcUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NfcUtil.prototype.toHex = function (i) { return cordova$1(this, "toHex", { "sync": true }, arguments); };
    NfcUtil.prototype.toPrintable = function (i) { return cordova$1(this, "toPrintable", { "sync": true }, arguments); };
    NfcUtil.prototype.bytesToString = function (i) { return cordova$1(this, "bytesToString", { "sync": true }, arguments); };
    NfcUtil.prototype.stringToBytes = function (s) { return cordova$1(this, "stringToBytes", { "sync": true }, arguments); };
    NfcUtil.prototype.bytesToHexString = function (bytes) { return cordova$1(this, "bytesToHexString", { "sync": true }, arguments); };
    NfcUtil.prototype.isType = function (record, tnf, type) { return cordova$1(this, "isType", { "sync": true }, arguments); };
    NfcUtil.prototype.arrayBufferToHexString = function (buffer) { return cordova$1(this, "arrayBufferToHexString", { "sync": true }, arguments); };
    NfcUtil.prototype.hexStringToArrayBuffer = function (hexString) { return cordova$1(this, "hexStringToArrayBuffer", { "sync": true }, arguments); };
    NfcUtil.pluginName = "NFC";
    NfcUtil.plugin = "phonegap-nfc";
    NfcUtil.pluginRef = "util";
    NfcUtil.decorators = [
        { type: Injectable }
    ];
    return NfcUtil;
}(IonicNativePlugin));
var TextHelper = /** @class */ (function (_super) {
    __extends$1(TextHelper, _super);
    function TextHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextHelper.prototype.decodePayload = function (data) {
        return;
    };
    TextHelper.prototype.encodePayload = function (text, lang) {
        return;
    };
    return TextHelper;
}(IonicNativePlugin));
var UriHelper = /** @class */ (function (_super) {
    __extends$1(UriHelper, _super);
    function UriHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UriHelper.prototype.decodePayload = function (data) {
        return;
    };
    UriHelper.prototype.encodePayload = function (uri) {
        return;
    };
    return UriHelper;
}(IonicNativePlugin));

var nfc;
(function (nfc_1) {
    let nfc = new NFC();
    function init() {
        try {
            paintReadModal();
            return read();
        }
        catch (e) {
            msg.showError(e);
        }
    }
    nfc_1.init = init;
    async function isEnabled() {
        return nfc.enabled();
    }
    nfc_1.isEnabled = isEnabled;
    function read() {
        if (cordova.platformId == 'ios') {
            return nfc.scanTag();
        }
        else {
            let flags = nfc.FLAG_READER_NFC_A | nfc.FLAG_READER_NFC_V;
            return new Promise((resolve, reject) => {
                nfc.readerMode(flags).subscribe((response) => {
                    resolve(response);
                }, (error) => {
                    if (jquery('.flx-nfcReader').length > 0) {
                        jquery('.flx-nfcReader').remove();
                    }
                    reject(error);
                });
            });
        }
    }
    nfc_1.read = read;
    function stopRead() {
        if (jquery('.flx-nfcReader').length > 0) {
            jquery('.flx-nfcReader').remove();
        }
        if (cordova.platformId == 'ios') {
            return nfc.cancelScan();
        }
        else {
            return nfc.close();
        }
    }
    nfc_1.stopRead = stopRead;
    function bytesToString(text) {
        return nfc.bytesToString(text);
    }
    nfc_1.bytesToString = bytesToString;
    function showSettings() {
        return nfc.showSettings();
    }
    nfc_1.showSettings = showSettings;
    async function paintReadModal() {
        const alert = document.createElement('ion-alert');
        alert.header = util.translate('nfc.readyMsg');
        alert.message = `<div id="nfcIcon" class="ion-text-center"><img alt="Logo" src="./assets/img/nfcMobile.png"/></div>`;
        alert.cssClass = 'flx-nfcReader';
        alert.backdropDismiss = false;
        alert.buttons = [
            {
                text: util.translate('msg.cancel'),
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                    stopRead();
                }
            }
        ];
        document.body.appendChild(alert);
        alert.present();
    }
    async function paintSetNFCModal() {
        const actMsg = document.createElement('ion-alert');
        actMsg.header = util.translate("nfc.activateNFC");
        actMsg.message = `<div id="nfcIconDisabled" class="ion-text-center"><img alt="Logo" src="./assets/img/nfcMobileDisabled.png"/></div>`;
        actMsg.backdropDismiss = false;
        actMsg.buttons = [
            {
                text: util.translate('nfc.activate'),
                handler: () => {
                    nfc.showSettings();
                }
            }
        ];
        document.body.appendChild(actMsg);
        actMsg.present();
    }
    nfc_1.paintSetNFCModal = paintSetNFCModal;
})(nfc || (nfc = {}));

var ext;
(function (ext) {
    async function linkExternalFunctions() {
        window['flexygo'] = new Object();
        window.flexygo.api = new Webapi();
        window.flexygo.nav = nav;
        window.flexygo.msg = msg;
        window.flexygo.sql = sql;
        window.flexygo.forms = forms;
        window.flexygo.camera = cam;
        window.flexygo.whiteboard = whiteboard;
        window.flexygo.gps = gps;
        window.flexygo.tracking = tracking;
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
        window.flexygo.nfc = nfc;
        window.flexygo.storage = storage;
        window['$'] = jquery;
    }
    ext.linkExternalFunctions = linkExternalFunctions;
})(ext || (ext = {}));

const App = registerPlugin('App', {
    web: () => __sc_import_app('./web-24a2aae0.js').then(m => new m.AppWeb()),
});

const appGlobalScript = () => {
    ext.linkExternalFunctions();
};
window.addEventListener("message", receiveMessage, false);
Preferences.migrate();
Preferences.removeOld();
changeBackButton();
App.addListener('appUrlOpen', async (data) => {
    ConftokenProvider.config().then(async (conf) => {
        try {
            if (!conf) {
                conf = new ConfToken;
                conf['urlConfig'] = new UrlConfig;
            }
            else {
                conf.urlConfig = new UrlConfig;
            }
            let url = data.url;
            url = url.replace('https://app.flexygo.com/?', '');
            let urlConstants = url.split('&');
            urlConstants.forEach(element => {
                conf.urlConfig = setUrlData(conf.urlConfig, element);
            });
            ConftokenProvider.saveConfToken(conf).then(() => {
                if (!nav.currentUrl().startsWith('/login')) {
                    nav.goLogin();
                }
                else {
                    jquery('flx-login')[0].refresh();
                }
            });
        }
        catch (err) {
            msg.showError(err);
        }
    });
});
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
function changeBackButton() {
    document.addEventListener('ionBackButton', (ev) => {
        ev.detail.register(10, () => {
            if (jquery('#contenedor_pizarra').length > 0) {
                jquery('#cancelWhiteboard').trigger('click');
            }
            else if (jquery('#scannerUI').length > 0) {
                cam.stopScan();
            }
            else if (jquery('#cameraUI').length > 0) {
                cam.stopCamera();
            }
            else {
                nav.goBack();
            }
        });
    });
}
function setUrlData(urlConfig, cnt) {
    let cntLowered = cnt.toLowerCase();
    if (cntLowered.startsWith('url=')) {
        urlConfig.url = atob(cnt.replace('url=', ''));
        return urlConfig;
    }
    if (cntLowered.startsWith('usr=')) {
        urlConfig.user = atob(cnt.replace('usr=', ''));
        return urlConfig;
    }
}

const globalScripts = () => {
  appGlobalScript();
  initialize();
};

export { patchEsm as a, globalScripts as g, patchBrowser as p };
