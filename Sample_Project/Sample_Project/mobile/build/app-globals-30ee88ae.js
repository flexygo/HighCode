import { i as ionicCoreGlobalScript } from './ionic-global-08321e45.js';
import { C as ConftokenProvider, u as util, s as sql, m as msg, c as cordova, a as checkAvailability, g as getPromise, I as IonicNativePlugin, b as ConftokenService } from './messages-856fd5dd.js';
import { j as jquery } from './jquery-4ed57fb2.js';
import { n as nav } from './navigation-94cce689.js';
import { c as cam } from './camera-2a479be4.js';
import { w as whiteboard } from './whiteboard-6fe6c589.js';
import { g as gps, p as parser } from './parser-d0a6b211.js';

var forms;
(function (forms) {
    async function save(btn) {
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
                return sql.execSQL(UpdateScript, values).then(() => { console.log(1); msg.success(util.translate('msg.saved')); }).catch(err => { throw err; });
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
                return sql.execSQL(InserScript, values).then(() => { console.log(1); msg.success(util.translate('msg.saved')); }).catch(err => { throw err; });
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

export { globalScripts as g };
