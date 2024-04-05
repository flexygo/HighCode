import { i as initialize } from './ionic-global-f9661584.js';
import { C as ConftokenProvider, u as util, s as sql, m as msg, c as cordova$1, a as checkAvailability, g as getPromise, I as IonicNativePlugin, _ as __extends$1, b as cordovaPropertyGet, d as cordovaPropertySet, e as Injectable, W as Webapi, n as nav, f as navOnline, h as cam, i as gps, t as tracking, j as util$1, k as flxSync, l as storage, r as registerPlugin, P as Preferences, o as ConfToken, U as UrlConfig, p as Capacitor, S as SQLiteConnection, q as CapacitorSQLite, v as ConftokenService } from './conftoken-2c86328f.js';
import { j as jquery } from './jquery-eec92bf9.js';
import { w as whiteboard } from './whiteboard-01f3e7c5.js';
import { p as parser } from './parser-74bf7b6b.js';

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
      //Estas dos líneas se encargan de que el mensaje de error de valor máximo y mínimo, sea el configurado debido a un problema de la versión de IONIC
      jquery(edit).find('[data-msg-max]').blur();
      jquery(edit).find('[data-msg-min]').blur();
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
    nonSecureApi: 'El vostre navegador no admet accés a la base de dades a excepció de l\'ús de HTTPS o localhost. Per favor instal·la un certificat SSL o accedeix des de la màquina localhost durant el desenvolupament',
    maxLatency: 'Connexió inestable, torna-ho a provar més tard quan el senyal sigui més estable'
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
    title: 'Perfil',
    changeAccount: 'Canviar de compte',
    accounts: 'Comptes',
    addAccount: 'Afegir un compte',
    confirmAccountRemoval: 'Tancar sessió',
    confirmAccountRemovalText: 'Si tanqueu la sessió, perdràs les dades no enviades associades a aquest compte'
  },
  sendData: {
    title: 'Informació de tramesa',
    time: 'Encara no s\'han enviat dades',
    error: 'No hi ha hagut cap error en l\'últim enviament de dades',
    ping: 'Encara no s\'ha provat cap ping',
    location: 'Encara no hi ha cap ubicació registrada',
    sendErrorLogs: 'Enviar informació',
    needSyncTitle: 'Es requereix l\'enviament de dades',
    needSyncDescrip: 'S\'ha produït un error en la sincronització després de l\'enviament de dades. Després d\'uns segons, tornarem a sincronitzar. Si aquesta no arriba mai a completar-se contacteu amb l\'administrador o administradora de l\'aplicació.'
  },
  indexedDB: {
    title: 'Base de dades',
    tables: 'Taules',
    sentence: 'Sentència SQL'
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
    nonSecureApi: 'Votre navigateur n\'autorise pas l\'accès à la base de données sans HTTPS ou localhost. Veuillez installer un certificat SSL ou accéder à partir de la machine hôte local pendant le développement',
    maxLatency: 'Connexion instable, veuillez réessayer plus tard lorsque le signal sera plus stable'
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
    title: 'Profil',
    changeAccount: 'Changer de compte',
    accounts: 'Comptes',
    addAccount: 'Ajouter un compte',
    confirmAccountRemoval: 'Se déconnecter',
    confirmAccountRemovalText: 'Si vous vous déconnectez, vous perdrez les données non envoyées associées à ce compte'
  },
  sendData: {
    title: 'Informations d\'expédition',
    time: 'Il n\'y a pas encore eu d\'envoi de données',
    error: 'Il n\'y avait pas d\'erreur dans le dernier envoi de données',
    ping: 'Il n\'y a pas encore eu de ping testé',
    location: 'Aucun emplacement n\'a encore été enregistré',
    sendErrorLogs: 'Envoyer une information',
    needSyncTitle: 'La soumission des données est obligatoire',
    needSyncDescrip: 'Une erreur s\'est produite lors de la synchronisation après l\'envoi des données. Après quelques secondes, nous nous synchroniserons à nouveau. Si cela n\'est jamais terminé, contactez l\'administrateur de l\'application.'
  },
  indexedDB: {
    title: 'Base de données',
    tables: 'Planches',
    sentence: 'Instruction SQL'
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
    nonSecureApi: 'Tu navegador no admite acceso a la base de datos a excepción del uso de HTTPS o localhost. Por favor instala un certificado SSL o accede desde la máquina localhost durante el desarrollo',
    maxLatency: 'Conexión inestable en estos momentos, intentelo de nuevo más tarde cuando la señal sea más estable'
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
    title: 'Perfil',
    changeAccount: 'Cambiar de cuenta',
    accounts: 'Cuentas',
    addAccount: 'Añadir una cuenta',
    confirmAccountRemoval: 'Cerrar sesión',
    confirmAccountRemovalText: 'Si cierras sesión perderas los datos no enviados asociados a esta cuenta'
  },
  sendData: {
    title: 'Información de envío',
    time: 'Todavía no ha habido ningún envío',
    error: 'Todavía no ha habido un error en un envío',
    ping: 'No se ha obtenido un ping todavía',
    location: 'No se ha registrado ninguna localización todavía',
    sendErrorLogs: 'Enviar información',
    needSyncTitle: 'Se requiere el envío de datos',
    needSyncDescrip: 'Ha ocurrido un error en la sincronización tras el envío de datos. Tras unos segundos volveremos a sincronizar. Si esta no llega nunca a completarse contacte con el administrador o administradora de la aplicación.'
  },
  indexedDB: {
    title: 'Base de datos',
    tables: 'Tablas',
    sentence: 'Sentencia SQL'
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
    nonSecureApi: 'Ihr Browser erlaubt keinen Datenbankzugriff ohne HTTPS oder localhost. Bitte installieren Sie während der Entwicklung ein SSL-Zertifikat oder greifen Sie vom lokalen Host-Computer aus zu',
    maxLatency: 'Instabile Verbindung, bitte versuchen Sie es später erneut, wenn das Signal stabiler ist'
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
    title: 'Profil',
    changeAccount: 'Account wechseln',
    accounts: 'Konten',
    addAccount: 'Füge ein Konto hinzu',
    confirmAccountRemoval: 'Ausloggen',
    confirmAccountRemovalText: 'Wenn Sie sich abmelden, gehen die mit diesem Konto verknüpften, nicht gesendeten Daten verloren'
  },
  sendData: {
    title: 'Versandinformationen',
    time: 'Es wurde noch kein Datenversand durchgeführt',
    error: 'Beim letzten Datenversand ist kein Fehler aufgetreten',
    ping: 'Es wurde noch kein Ping getestet',
    location: 'Es wurde noch kein Standort registriert',
    sendErrorLogs: 'Sende Informationen',
    needSyncTitle: 'Eine Datenübermittlung ist erforderlich',
    needSyncDescrip: 'Nach dem Senden der Daten ist bei der Synchronisierung ein Fehler aufgetreten. Nach ein paar Sekunden werden wir erneut synchronisieren. Wenn dies nie abgeschlossen ist, wenden Sie sich an den Anwendungsadministrator.'
  },
  indexedDB: {
    title: 'Datenbank',
    tables: 'Bretter',
    sentence: 'SQL-Anweisung'
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
    nonSecureApi: 'Your browser doesn\'t allow database access without HTTPS or localhost. Please, install an SSL certificate or access from localhost machine during development',
    maxLatency: 'Unstable connection, please try again later when the signal is more stable'
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
    title: 'Profile',
    changeAccount: 'Change account',
    accounts: 'Accounts',
    addAccount: 'Añadir una cuenta',
    confirmAccountRemoval: 'Logout',
    confirmAccountRemovalText: 'If you logout you will lose the unsent data associated with this account'
  },
  sendData: {
    title: 'Send data info',
    time: 'There wasn\'t a send yet',
    error: 'There wasn\'t an error in last send',
    ping: 'There wasn\'t a ping tested yet',
    location: 'There wasn\'t a location registered yet',
    sendErrorLogs: 'Send data',
    needSyncTitle: 'Data sending is required',
    needSyncDescrip: 'A synchronization error occurred after sending data. After a few seconds we will synchronize again. If it never completes, contact the application administrator.'
  },
  indexedDB: {
    title: 'Database',
    tables: 'Tables',
    sentence: 'SQL sentence'
  }
};

const ptpt = {
  login: {
    appsListTitle: 'Por favor, escolha uma aplicação',
    invalidPsw: 'Senha ou usuário incorretos',
    connectionErr: 'Erro de conexão, URL incorreta ou WebAPI desabilitada',
    username: 'Nome de usuário',
    password: 'Senha',
    login: 'Iniciar sessão',
    blankUrl: 'A URL não pode estar vazia',
    blankUsr: 'O nome de usuário não pode estar vazio',
    blankPsw: 'A senha não pode estar vazia',
    wrongtURL: 'URL incorreta'
  },
  menu: {
    menu: 'Menu',
    home: 'Início',
    sync: 'Sincronizar',
    syncMore: 'Mais opções',
    logout: 'Desconectar',
    logoutHeader: 'Confirmar desconexão',
    logoutMessage: 'Note que se desconectar agora, perderá os dados não enviados'
  },
  list: {
    search: 'Buscar',
    noresults: 'Sem resultados'
  },
  msg: {
    ok: 'Aceitar',
    cancel: 'Cancelar',
    deleted: 'Excluído :)',
    saved: 'Salvo :)'
  },
  exceptions: {
    syncTimeout: 'Tempo de espera excedido. Certifique-se de ter uma conexão à internet estável e que o servidor é acessível.',
    gpsTimeout: 'Tempo de espera excedido. Certifique-se de que o GPS está ativo no dispositivo.',
    gpsAccess: 'Não é possível acessar a localização, pois está desativada ou a aplicação não tem permissões',
    gpsConnection: 'Não foi possível obter as coordenadas de localização devido a uma baixa conectividade',
    required: 'Preencha todos os campos obrigatórios: ',
    bufferSize: 'Houve um problema na inserção da tabela @, tente diminuir o tamanho do buffer na configuração desta',
    avatarSize: 'Parece que a imagem do perfil está muito pesada',
    noExistingTable: 'Parece que a tabela @ não existe',
    nonSecureApi: 'Seu navegador não suporta acesso ao banco de dados, exceto por HTTPS ou localhost. Por favor, instale um certificado SSL ou acesse a partir da máquina localhost durante o desenvolvimento',
    maxLatency: 'Conexão instável no momento, tente novamente mais tarde quando o sinal estiver mais estável'
  },
  sync: {
    last: 'Última Sincronização:',
    refresh: 'Atualizar dados',
    overwrite: 'Sobrescrever dados',
    confirmOverwrite: 'Sobrescrever tudo?',
    confirmOverwriteText: 'Certifique-se de ter feito um envio antes de aceitar esta mensagem para evitar perda de dados.',
    send: 'Enviar e receber',
    templates: 'Atualizar layout',
    backup: 'Criar cópia de segurança',
    backupDownloadErr: 'Ocorreu um erro ao baixar a cópia de segurança',
    backupDownloaded: 'A cópia de segurança foi salva na pasta de documentos',
    restore: 'Restaurar banco de dados',
    restoreSuccess: 'Os dados foram restaurados com sucesso',
    restoreError: 'Houve um erro ao tentar inserir os dados do arquivo',
    restoreInvalid: 'O formato do arquivo não é válido, deve ser um .bak',
    createBackupHeader: 'Selecione o tipo de cópia',
    createBackupMessage: 'Você deseja fazer apenas uma cópia do banco de dados ou uma cópia completa?',
    onlyDB: 'Apenas banco de dados',
    complete: 'Completa',
    notValidZip: 'Nenhum arquivo de banco de dados encontrado no arquivo inserido',
    connectionErr: 'Erro ao estabelecer conexão com o servidor',
    noChanges: 'Não há mudanças pendentes'
  },
  image: {
    delete: 'Excluir',
    msg: 'Deseja excluir a imagem?',
    warning: 'A imagem não pode ser excluída do dispositivo porque já está no servidor principal. Realize esta ação a partir do ambiente de desktop.',
    title: 'Galeria',
    downloaded: 'A imagem foi salva na pasta de documentos',
    errDownload: 'Ocorreu um erro ao baixar a imagem, verifique a conexão com a internet',
    downloadedNoti: 'A imagem % foi baixada com sucesso'
  },
  document: {
    delete: 'Excluir',
    download: 'Baixar',
    edit: 'Editar',
    description: 'Descrição',
    msg: 'Deseja excluir o documento?',
    msgEdit: 'Editar descrição',
    msgEditSuccess: 'A descrição foi modificada com sucesso',
    warning: 'O documento não pode ser excluído do dispositivo porque já está no servidor principal. Realize esta ação a partir do ambiente de desktop.',
    title: 'Documentos',
    downloaded: 'O arquivo foi salvo na pasta de documentos',
    errDownload: 'Ocorreu um erro ao baixar o arquivo, verifique a conexão com a internet',
    downloadedNoti: 'O arquivo % foi baixado com sucesso'
  },
  gps: {
    activationMsg: 'Este aplicativo requer o uso do GPS, por favor, ative-o',
    activationSubmsg: 'O Flexygo Mobile coleta dados de localização para habilitar a <b> rastreabilidade logística </b> e o <b> planejamento em tempo real </b> mesmo quando o aplicativo está fechado ou não está em uso. Quando isso acontecer, você será informado por meio de uma notificação pop-up.',
    continue: 'Continuar',
    policy: 'Política de privacidade'
  },
  tracking: {
    notificationTitle: ' está rastreando sua posição',
    notificationText: 'Toque para navegar até ',
    usingPC: 'As funções de rastreamento estão disponíveis apenas em dispositivos móveis'
  },
  nfc: {
    readyMsg: 'Pronto para ler',
    activateNFC: 'NFC desativado',
    activate: 'Ativar'
  },
  usermenu: {
    changePass: 'Alterar senha',
    current: 'Senha atual',
    new: 'Nova senha',
    repeat: 'Repetir senha',
    loading: 'Alterando senha',
    success: 'A senha foi alterada',
    mustChange: 'Você deve alterar a senha',
    changePassError: 'Esta função ainda não está disponível',
    title: 'Perfil',
    changeAccount: 'Mudar de conta',
    accounts: 'Contas',
    addAccount: 'Adicionar uma conta',
    confirmAccountRemoval: 'Sair',
    confirmAccountRemovalText: 'Se você sair, perderá os dados não enviados associados a esta conta'
  },
  sendData: {
    title: 'Informações de envio',
    time: 'Ainda não houve nenhum envio',
    error: 'Ainda não houve erro em um envio',
    ping: 'Ainda não foi obtido um ping',
    location: 'Ainda não foi registrada nenhuma localização',
    sendErrorLogs: 'Enviar informações',
    needSyncTitle: 'É necessário enviar dados',
    needSyncDescrip: 'Ocorreu um erro na sincronização após o envio de dados. Após alguns segundos, sincronizaremos novamente. Se isso nunca for concluído, entre em contato com o administrador do aplicativo.'
  },
  indexedDB: {
    title: 'Base de dados',
    tables: 'Tabelas',
    sentence: 'Sentença SQL'
  }
};

const itit = {
  login: {
    appsListTitle: 'Per favore, scegli un\'applicazione',
    invalidPsw: 'Password o nome utente non validi',
    connectionErr: 'Errore di connessione, URL errato o WebAPI disabilitata',
    username: 'Nome utente',
    password: 'Password',
    login: 'Accedi',
    blankUrl: 'L\'URL non può essere vuoto',
    blankUsr: 'Il nome utente non può essere vuoto',
    blankPsw: 'La password non può essere vuota',
    wrongtURL: 'URL non corretto'
  },
  menu: {
    menu: 'Menu',
    home: 'Home',
    sync: 'Sincronizza',
    syncMore: 'Altre opzioni',
    logout: 'Disconnetti',
    logoutHeader: 'Conferma disconnessione',
    logoutMessage: 'Nota che se ti disconnetti ora, perderai i dati non ancora inviati'
  },
  list: {
    search: 'Cerca',
    noresults: 'Nessun risultato'
  },
  msg: {
    ok: 'Ok',
    cancel: 'Annulla',
    deleted: 'Cancellato :)',
    saved: 'Salvato :)'
  },
  exceptions: {
    syncTimeout: 'Timeout di sincronizzazione. Assicurati di avere una connessione internet stabile e che il server sia accessibile.',
    gpsTimeout: 'Timeout GPS. Assicurati che il GPS sia attivo sul dispositivo.',
    gpsAccess: 'Impossibile accedere alla posizione perché è disattivata o l\'applicazione non ha i permessi',
    gpsConnection: 'Impossibile ottenere le coordinate della posizione a causa di una bassa connettività',
    required: 'Compila tutti i campi obbligatori: ',
    bufferSize: 'Si è verificato un problema nell\'inserimento nella tabella @, dovresti provare a ridurre la dimensione del buffer nelle impostazioni di questa',
    avatarSize: 'Sembra che l\'immagine del profilo sia troppo pesante',
    noExistingTable: 'Sembra che la tabella @ non esista',
    nonSecureApi: 'Il tuo browser non supporta l\'accesso al database tranne che tramite HTTPS o localhost. Installa un certificato SSL o accedi da localhost durante lo sviluppo',
    maxLatency: 'Connessione instabile in questo momento, riprova più tardi quando il segnale sarà più stabile'
  },
  sync: {
    last: 'Ultima sincronizzazione:',
    refresh: 'Aggiorna dati',
    overwrite: 'Sovrascrivi dati',
    confirmOverwrite: 'Sovrascrivere tutto?',
    confirmOverwriteText: 'Assicurati di aver inviato prima di accettare questo messaggio per evitare la perdita di dati.',
    send: 'Invia e ricevi',
    templates: 'Aggiorna layout',
    backup: 'Crea backup',
    backupDownloadErr: 'Si è verificato un errore durante il download del backup',
    backupDownloaded: 'Il backup è stato salvato nella cartella documenti',
    restore: 'Ripristina database',
    restoreSuccess: 'I dati sono stati ripristinati correttamente',
    restoreError: 'Si è verificato un errore nel tentativo di inserire i dati dal file',
    restoreInvalid: 'Il formato del file non è valido, deve essere un .bak',
    createBackupHeader: 'Seleziona il tipo di backup',
    createBackupMessage: 'Vuoi fare il backup solo del database o vuoi fare un backup completo?',
    onlyDB: 'Solo database',
    complete: 'Completo',
    notValidZip: 'Nessun file di database trovato nell\'archivio inserito',
    connectionErr: 'Errore nell\'impostare la connessione con il server',
    noChanges: 'Nessuna modifica in sospeso'
  },
  image: {
    delete: 'Elimina',
    msg: 'Vuoi eliminare l\'immagine?',
    warning: 'L\'immagine non può essere eliminata dal dispositivo perché è già sul server principale. Esegui questa azione dall\'ambiente desktop.',
    title: 'Galleria',
    downloaded: 'L\'immagine è stata salvata nella cartella documenti',
    errDownload: 'Si è verificato un errore durante il download dell\'immagine, controlla la connessione internet',
    downloadedNoti: 'L\'immagine % è stata scaricata correttamente'
  },
  document: {
    delete: 'Elimina',
    download: 'Scarica',
    edit: 'Modifica',
    description: 'Descrizione',
    msg: 'Vuoi eliminare il documento?',
    msgEdit: 'Modifica descrizione',
    msgEditSuccess: 'La descrizione è stata modificata correttamente',
    warning: 'Il documento non può essere eliminato dal dispositivo perché è già sul server principale. Esegui questa azione dall\'ambiente desktop.',
    title: 'Documenti',
    downloaded: 'Il file è stato salvato nella cartella documenti',
    errDownload: 'Si è verificato un errore durante il download del file, controlla la connessione internet',
    downloadedNoti: 'Il file % è stato scaricato correttamente'
  },
  gps: {
    activationMsg: 'Questa applicazione richiede l\'uso del GPS, per favore attivalo',
    activationSubmsg: 'Flexygo Mobile raccoglie dati di posizione per abilitare la <b> tracciabilità logistica </b> e la <b> pianificazione in tempo reale </b> anche quando l\'applicazione è chiusa o non è in uso. Quando ciò accade, verrai informato tramite una notifica emergente.',
    continue: 'Continua',
    policy: 'Informativa sulla privacy'
  },
  tracking: {
    notificationTitle: ' sta tracciando la tua posizione',
    notificationText: 'Tocca per navigare a ',
    usingPC: 'Le funzioni di tracciamento sono disponibili solo su dispositivi mobili'
  },
  nfc: {
    readyMsg: 'Pronto per la lettura',
    activateNFC: 'NFC disattivato',
    activate: 'Attiva'
  },
  usermenu: {
    changePass: 'Cambia password',
    current: 'Password attuale',
    new: 'Nuova password',
    repeat: 'Ripeti password',
    loading: 'Cambiamento password in corso',
    success: 'La password è stata cambiata con successo',
    mustChange: 'Devi cambiare la password',
    changePassError: 'Questa funzione non è ancora disponibile',
    title: 'Profilo',
    changeAccount: 'Cambia account',
    accounts: 'Account',
    addAccount: 'Aggiungi un account',
    confirmAccountRemoval: 'Esci',
    confirmAccountRemovalText: 'Se esci, perderai i dati non inviati associati a questo account'
  },
  sendData: {
    title: 'Informazioni di invio',
    time: 'Non ci sono ancora invii',
    error: 'Non c\'è ancora un errore in un invio',
    ping: 'Ancora nessun ping ottenuto',
    location: 'Ancora nessuna localizzazione registrata',
    sendErrorLogs: 'Invia informazioni',
    needSyncTitle: 'È necessario l\'invio di dati',
    needSyncDescrip: 'Si è verificato un errore nella sincronizzazione dopo l\'invio dei dati. Dopo alcuni secondi riproveremo a sincronizzare. Se questo processo non si completa mai, contatta l\'amministratore dell\'applicazione.'
  },
  indexedDB: {
    title: 'Database',
    tables: 'Tabelle',
    sentence: 'Query SQL'
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
    window.flexygo.navOnline = navOnline;
    window.flexygo.msg = msg;
    window.flexygo.sql = sql;
    window.flexygo.forms = forms;
    window.flexygo.camera = cam;
    window.flexygo.whiteboard = whiteboard;
    window.flexygo.gps = gps;
    window.flexygo.tracking = tracking;
    window.flexygo.conftoken = await ConftokenProvider.config();
    window.flexygo.utils = util$1;
    window.flexygo.exports = exports;
    window.flexygo.sync = flxSync;
    window.flexygo.parser = parser;
    window.flexygo.culture = new Object();
    window.flexygo.culture.caes = caes;
    window.flexygo.culture.frfr = frfr;
    window.flexygo.culture.dede = dede;
    window.flexygo.culture.engb = engb;
    window.flexygo.culture.eses = eses;
    window.flexygo.culture.ptpt = ptpt;
    window.flexygo.culture.itit = itit;
    window.flexygo.nfc = nfc;
    window.flexygo.storage = storage;
    window['$'] = jquery;
  }
  ext.linkExternalFunctions = linkExternalFunctions;
})(ext || (ext = {}));

const App = registerPlugin('App', {
    web: () => import('./web-1f925019.js').then(m => new m.AppWeb()),
});

function applyPolyfills() {
  var promises = [];
  if (typeof window !== 'undefined') {
    var win = window;

    if (!win.customElements ||
      (win.Element && (!win.Element.prototype.closest || !win.Element.prototype.matches || !win.Element.prototype.remove || !win.Element.prototype.getRootNode))) {
      promises.push(import(/* webpackChunkName: "polyfills-dom" */ './dom-489d98c2.js'));
    }

    var checkIfURLIsSupported = function() {
      try {
        var u = new URL('b', 'http://a');
        u.pathname = 'c%20d';
        return (u.href === 'http://a/c%20d') && u.searchParams;
      } catch (e) {
        return false;
      }
    };

    if (
      'function' !== typeof Object.assign || !Object.entries ||
      !Array.prototype.find || !Array.prototype.includes ||
      !String.prototype.startsWith || !String.prototype.endsWith ||
      (win.NodeList && !win.NodeList.prototype.forEach) ||
      !win.fetch ||
      !checkIfURLIsSupported() ||
      typeof WeakMap == 'undefined'
    ) {
      promises.push(import(/* webpackChunkName: "polyfills-core-js" */ './core-js-62386d18.js').then(function (n) { return n.c; }));
    }
  }
  return Promise.all(promises);
}

const NAMESPACE = 'jeep-sqlite';

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/snabbdom/snabbdom/blob/master/LICENSE
 *
 * Modified for Stencil's renderer and slot projection
 */
let scopeId;
let hostTagName;
let isSvgMode = false;
let queuePending = false;
const createTime = (fnName, tagName = '') => {
    {
        return () => {
            return;
        };
    }
};
const uniqueTime = (key, measureText) => {
    {
        return () => {
            return;
        };
    }
};
const HYDRATED_CSS = '{visibility:hidden}.hydrated{visibility:inherit}';
/**
 * Default style mode id
 */
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */
const EMPTY_OBJ = {};
const isDef = (v) => v != null;
/**
 * Check whether a value is a 'complex type', defined here as an object or a
 * function.
 *
 * @param o the value to check
 * @returns whether it's a complex type or not
 */
const isComplexType = (o) => {
    // https://jsperf.com/typeof-fn-object/5
    o = typeof o;
    return o === 'object' || o === 'function';
};
/**
 * Helper method for querying a `meta` tag that contains a nonce value
 * out of a DOM's head.
 *
 * @param doc The DOM containing the `head` to query against
 * @returns The content of the meta tag representing the nonce value, or `undefined` if no tag
 * exists or the tag has no content.
 */
function queryNonceMetaTagContent(doc) {
    var _a, _b, _c;
    return (_c = (_b = (_a = doc.head) === null || _a === void 0 ? void 0 : _a.querySelector('meta[name="csp-nonce"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('content')) !== null && _c !== void 0 ? _c : undefined;
}
/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
const h = (nodeName, vnodeData, ...children) => {
    let child = null;
    let simple = false;
    let lastSimple = false;
    const vNodeChildren = [];
    const walk = (c) => {
        for (let i = 0; i < c.length; i++) {
            child = c[i];
            if (Array.isArray(child)) {
                walk(child);
            }
            else if (child != null && typeof child !== 'boolean') {
                if ((simple = typeof nodeName !== 'function' && !isComplexType(child))) {
                    child = String(child);
                }
                if (simple && lastSimple) {
                    // If the previous child was simple (string), we merge both
                    vNodeChildren[vNodeChildren.length - 1].$text$ += child;
                }
                else {
                    // Append a new vNode, if it's text, we create a text vNode
                    vNodeChildren.push(simple ? newVNode(null, child) : child);
                }
                lastSimple = simple;
            }
        }
    };
    walk(children);
    const vnode = newVNode(nodeName, null);
    vnode.$attrs$ = vnodeData;
    if (vNodeChildren.length > 0) {
        vnode.$children$ = vNodeChildren;
    }
    return vnode;
};
/**
 * A utility function for creating a virtual DOM node from a tag and some
 * possible text content.
 *
 * @param tag the tag for this element
 * @param text possible text content for the node
 * @returns a newly-minted virtual DOM node
 */
const newVNode = (tag, text) => {
    const vnode = {
        $flags$: 0,
        $tag$: tag,
        $text$: text,
        $elm$: null,
        $children$: null,
    };
    {
        vnode.$attrs$ = null;
    }
    return vnode;
};
const Host = {};
/**
 * Check whether a given node is a Host node or not
 *
 * @param node the virtual DOM node to check
 * @returns whether it's a Host node or not
 */
const isHost = (node) => node && node.$tag$ === Host;
/**
 * Parse a new property value for a given property type.
 *
 * While the prop value can reasonably be expected to be of `any` type as far as TypeScript's type checker is concerned,
 * it is not safe to assume that the string returned by evaluating `typeof propValue` matches:
 *   1. `any`, the type given to `propValue` in the function signature
 *   2. the type stored from `propType`.
 *
 * This function provides the capability to parse/coerce a property's value to potentially any other JavaScript type.
 *
 * Property values represented in TSX preserve their type information. In the example below, the number 0 is passed to
 * a component. This `propValue` will preserve its type information (`typeof propValue === 'number'`). Note that is
 * based on the type of the value being passed in, not the type declared of the class member decorated with `@Prop`.
 * ```tsx
 * <my-cmp prop-val={0}></my-cmp>
 * ```
 *
 * HTML prop values on the other hand, will always a string
 *
 * @param propValue the new value to coerce to some type
 * @param propType the type of the prop, expressed as a binary number
 * @returns the parsed/coerced value
 */
const parsePropertyValue = (propValue, propType) => {
    // ensure this value is of the correct prop type
    if (propValue != null && !isComplexType(propValue)) {
        if (propType & 4 /* MEMBER_FLAGS.Boolean */) {
            // per the HTML spec, any string value means it is a boolean true value
            // but we'll cheat here and say that the string "false" is the boolean false
            return propValue === 'false' ? false : propValue === '' || !!propValue;
        }
        if (propType & 1 /* MEMBER_FLAGS.String */) {
            // could have been passed as a number or boolean
            // but we still want it as a string
            return String(propValue);
        }
        // redundant return here for better minification
        return propValue;
    }
    // not sure exactly what type we want
    // so no need to change to a different type
    return propValue;
};
const getElement = (ref) => (getHostRef(ref).$hostElement$ );
const createEvent = (ref, name, flags) => {
    const elm = getElement(ref);
    return {
        emit: (detail) => {
            return emitEvent(elm, name, {
                bubbles: !!(flags & 4 /* EVENT_FLAGS.Bubbles */),
                composed: !!(flags & 2 /* EVENT_FLAGS.Composed */),
                cancelable: !!(flags & 1 /* EVENT_FLAGS.Cancellable */),
                detail,
            });
        },
    };
};
/**
 * Helper function to create & dispatch a custom Event on a provided target
 * @param elm the target of the Event
 * @param name the name to give the custom Event
 * @param opts options for configuring a custom Event
 * @returns the custom Event
 */
const emitEvent = (elm, name, opts) => {
    const ev = plt.ce(name, opts);
    elm.dispatchEvent(ev);
    return ev;
};
const rootAppliedStyles = /*@__PURE__*/ new WeakMap();
const registerStyle = (scopeId, cssText, allowCS) => {
    let style = styles.get(scopeId);
    if (supportsConstructableStylesheets && allowCS) {
        style = (style || new CSSStyleSheet());
        if (typeof style === 'string') {
            style = cssText;
        }
        else {
            style.replaceSync(cssText);
        }
    }
    else {
        style = cssText;
    }
    styles.set(scopeId, style);
};
const addStyle = (styleContainerNode, cmpMeta, mode) => {
    var _a;
    const scopeId = getScopeId(cmpMeta);
    const style = styles.get(scopeId);
    // if an element is NOT connected then getRootNode() will return the wrong root node
    // so the fallback is to always use the document for the root node in those cases
    styleContainerNode = styleContainerNode.nodeType === 11 /* NODE_TYPE.DocumentFragment */ ? styleContainerNode : doc;
    if (style) {
        if (typeof style === 'string') {
            styleContainerNode = styleContainerNode.head || styleContainerNode;
            let appliedStyles = rootAppliedStyles.get(styleContainerNode);
            let styleElm;
            if (!appliedStyles) {
                rootAppliedStyles.set(styleContainerNode, (appliedStyles = new Set()));
            }
            if (!appliedStyles.has(scopeId)) {
                {
                    styleElm = doc.createElement('style');
                    styleElm.innerHTML = style;
                    // Apply CSP nonce to the style tag if it exists
                    const nonce = (_a = plt.$nonce$) !== null && _a !== void 0 ? _a : queryNonceMetaTagContent(doc);
                    if (nonce != null) {
                        styleElm.setAttribute('nonce', nonce);
                    }
                    styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'));
                }
                if (appliedStyles) {
                    appliedStyles.add(scopeId);
                }
            }
        }
        else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
            styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
        }
    }
    return scopeId;
};
const attachStyles = (hostRef) => {
    const cmpMeta = hostRef.$cmpMeta$;
    const elm = hostRef.$hostElement$;
    const flags = cmpMeta.$flags$;
    const endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
    const scopeId = addStyle(elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta);
    if (flags & 10 /* CMP_FLAGS.needsScopedEncapsulation */) {
        // only required when we're NOT using native shadow dom (slot)
        // or this browser doesn't support native shadow dom
        // and this host element was NOT created with SSR
        // let's pick out the inner content for slot projection
        // create a node to represent where the original
        // content was first placed, which is useful later on
        // DOM WRITE!!
        elm['s-sc'] = scopeId;
        elm.classList.add(scopeId + '-h');
    }
    endAttachStyles();
};
const getScopeId = (cmp, mode) => 'sc-' + (cmp.$tagName$);
/**
 * Production setAccessor() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
/**
 * When running a VDom render set properties present on a VDom node onto the
 * corresponding HTML element.
 *
 * Note that this function has special functionality for the `class`,
 * `style`, `key`, and `ref` attributes, as well as event handlers (like
 * `onClick`, etc). All others are just passed through as-is.
 *
 * @param elm the HTMLElement onto which attributes should be set
 * @param memberName the name of the attribute to set
 * @param oldValue the old value for the attribute
 * @param newValue the new value for the attribute
 * @param isSvg whether we're in an svg context or not
 * @param flags bitflags for Vdom variables
 */
const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
    if (oldValue !== newValue) {
        let isProp = isMemberInElement(elm, memberName);
        memberName.toLowerCase();
        {
            // Set property if it exists and it's not a SVG
            const isComplex = isComplexType(newValue);
            if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
                try {
                    if (!elm.tagName.includes('-')) {
                        const n = newValue == null ? '' : newValue;
                        // Workaround for Safari, moving the <input> caret when re-assigning the same valued
                        if (memberName === 'list') {
                            isProp = false;
                        }
                        else if (oldValue == null || elm[memberName] != n) {
                            elm[memberName] = n;
                        }
                    }
                    else {
                        elm[memberName] = newValue;
                    }
                }
                catch (e) { }
            }
            if (newValue == null || newValue === false) {
                if (newValue !== false || elm.getAttribute(memberName) === '') {
                    {
                        elm.removeAttribute(memberName);
                    }
                }
            }
            else if ((!isProp || flags & 4 /* VNODE_FLAGS.isHost */ || isSvg) && !isComplex) {
                newValue = newValue === true ? '' : newValue;
                {
                    elm.setAttribute(memberName, newValue);
                }
            }
        }
    }
};
const updateElement = (oldVnode, newVnode, isSvgMode, memberName) => {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    const elm = newVnode.$elm$.nodeType === 11 /* NODE_TYPE.DocumentFragment */ && newVnode.$elm$.host
        ? newVnode.$elm$.host
        : newVnode.$elm$;
    const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
    const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
    {
        // remove attributes no longer present on the vnode by setting them to undefined
        for (memberName in oldVnodeAttrs) {
            if (!(memberName in newVnodeAttrs)) {
                setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$);
            }
        }
    }
    // add new & update changed attributes
    for (memberName in newVnodeAttrs) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$);
    }
};
/**
 * Create a DOM Node corresponding to one of the children of a given VNode.
 *
 * @param oldParentVNode the parent VNode from the previous render
 * @param newParentVNode the parent VNode from the current render
 * @param childIndex the index of the VNode, in the _new_ parent node's
 * children, for which we will create a new DOM node
 * @param parentElm the parent DOM node which our new node will be a child of
 * @returns the newly created node
 */
const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
    // tslint:disable-next-line: prefer-const
    const newVNode = newParentVNode.$children$[childIndex];
    let i = 0;
    let elm;
    let childNode;
    {
        // create element
        elm = newVNode.$elm$ = (doc.createElement(newVNode.$tag$));
        // add css classes, attrs, props, listeners, etc.
        {
            updateElement(null, newVNode, isSvgMode);
        }
        if (isDef(scopeId) && elm['s-si'] !== scopeId) {
            // if there is a scopeId and this is the initial render
            // then let's add the scopeId as a css class
            elm.classList.add((elm['s-si'] = scopeId));
        }
        if (newVNode.$children$) {
            for (i = 0; i < newVNode.$children$.length; ++i) {
                // create the node
                childNode = createElm(oldParentVNode, newVNode, i);
                // return node could have been null
                if (childNode) {
                    // append our new node
                    elm.appendChild(childNode);
                }
            }
        }
    }
    return elm;
};
/**
 * Create DOM nodes corresponding to a list of {@link d.Vnode} objects and
 * add them to the DOM in the appropriate place.
 *
 * @param parentElm the DOM node which should be used as a parent for the new
 * DOM nodes
 * @param before a child of the `parentElm` which the new children should be
 * inserted before (optional)
 * @param parentVNode the parent virtual DOM node
 * @param vnodes the new child virtual DOM nodes to produce DOM nodes for
 * @param startIdx the index in the child virtual DOM nodes at which to start
 * creating DOM nodes (inclusive)
 * @param endIdx the index in the child virtual DOM nodes at which to stop
 * creating DOM nodes (inclusive)
 */
const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
    let containerElm = (parentElm);
    let childNode;
    if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
        containerElm = containerElm.shadowRoot;
    }
    for (; startIdx <= endIdx; ++startIdx) {
        if (vnodes[startIdx]) {
            childNode = createElm(null, parentVNode, startIdx);
            if (childNode) {
                vnodes[startIdx].$elm$ = childNode;
                containerElm.insertBefore(childNode, before);
            }
        }
    }
};
/**
 * Remove the DOM elements corresponding to a list of {@link d.VNode} objects.
 * This can be used to, for instance, clean up after a list of children which
 * should no longer be shown.
 *
 * This function also handles some of Stencil's slot relocation logic.
 *
 * @param vnodes a list of virtual DOM nodes to remove
 * @param startIdx the index at which to start removing nodes (inclusive)
 * @param endIdx the index at which to stop removing nodes (inclusive)
 */
const removeVnodes = (vnodes, startIdx, endIdx) => {
    for (let index = startIdx; index <= endIdx; ++index) {
        const vnode = vnodes[index];
        if (vnode) {
            const elm = vnode.$elm$;
            if (elm) {
                // remove the vnode's element from the dom
                elm.remove();
            }
        }
    }
};
/**
 * Reconcile the children of a new VNode with the children of an old VNode by
 * traversing the two collections of children, identifying nodes that are
 * conserved or changed, calling out to `patch` to make any necessary
 * updates to the DOM, and rearranging DOM nodes as needed.
 *
 * The algorithm for reconciling children works by analyzing two 'windows' onto
 * the two arrays of children (`oldCh` and `newCh`). We keep track of the
 * 'windows' by storing start and end indices and references to the
 * corresponding array entries. Initially the two 'windows' are basically equal
 * to the entire array, but we progressively narrow the windows until there are
 * no children left to update by doing the following:
 *
 * 1. Skip any `null` entries at the beginning or end of the two arrays, so
 *    that if we have an initial array like the following we'll end up dealing
 *    only with a window bounded by the highlighted elements:
 *
 *    [null, null, VNode1 , ... , VNode2, null, null]
 *                 ^^^^^^         ^^^^^^
 *
 * 2. Check to see if the elements at the head and tail positions are equal
 *    across the windows. This will basically detect elements which haven't
 *    been added, removed, or changed position, i.e. if you had the following
 *    VNode elements (represented as HTML):
 *
 *    oldVNode: `<div><p><span>HEY</span></p></div>`
 *    newVNode: `<div><p><span>THERE</span></p></div>`
 *
 *    Then when comparing the children of the `<div>` tag we check the equality
 *    of the VNodes corresponding to the `<p>` tags and, since they are the
 *    same tag in the same position, we'd be able to avoid completely
 *    re-rendering the subtree under them with a new DOM element and would just
 *    call out to `patch` to handle reconciling their children and so on.
 *
 * 3. Check, for both windows, to see if the element at the beginning of the
 *    window corresponds to the element at the end of the other window. This is
 *    a heuristic which will let us identify _some_ situations in which
 *    elements have changed position, for instance it _should_ detect that the
 *    children nodes themselves have not changed but merely moved in the
 *    following example:
 *
 *    oldVNode: `<div><element-one /><element-two /></div>`
 *    newVNode: `<div><element-two /><element-one /></div>`
 *
 *    If we find cases like this then we also need to move the concrete DOM
 *    elements corresponding to the moved children to write the re-order to the
 *    DOM.
 *
 * 4. Finally, if VNodes have the `key` attribute set on them we check for any
 *    nodes in the old children which have the same key as the first element in
 *    our window on the new children. If we find such a node we handle calling
 *    out to `patch`, moving relevant DOM nodes, and so on, in accordance with
 *    what we find.
 *
 * Finally, once we've narrowed our 'windows' to the point that either of them
 * collapse (i.e. they have length 0) we then handle any remaining VNode
 * insertion or deletion that needs to happen to get a DOM state that correctly
 * reflects the new child VNodes. If, for instance, after our window on the old
 * children has collapsed we still have more nodes on the new children that
 * we haven't dealt with yet then we need to add them, or if the new children
 * collapse but we still have unhandled _old_ children then we need to make
 * sure the corresponding DOM nodes are removed.
 *
 * @param parentElm the node into which the parent VNode is rendered
 * @param oldCh the old children of the parent node
 * @param newVNode the new VNode which will replace the parent
 * @param newCh the new children of the parent node
 */
const updateChildren = (parentElm, oldCh, newVNode, newCh) => {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let node;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
            // VNode might have been moved left
            oldStartVnode = oldCh[++oldStartIdx];
        }
        else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newStartVnode)) {
            // if the start nodes are the same then we should patch the new VNode
            // onto the old one, and increment our `newStartIdx` and `oldStartIdx`
            // indices to reflect that. We don't need to move any DOM Nodes around
            // since things are matched up in order.
            patch(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (isSameVnode(oldEndVnode, newEndVnode)) {
            // likewise, if the end nodes are the same we patch new onto old and
            // decrement our end indices, and also likewise in this case we don't
            // need to move any DOM Nodes.
            patch(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newEndVnode)) {
            patch(oldStartVnode, newEndVnode);
            // We need to move the element for `oldStartVnode` into a position which
            // will be appropriate for `newEndVnode`. For this we can use
            // `.insertBefore` and `oldEndVnode.$elm$.nextSibling`. If there is a
            // sibling for `oldEndVnode.$elm$` then we want to move the DOM node for
            // `oldStartVnode` between `oldEndVnode` and it's sibling, like so:
            //
            // <old-start-node />
            // <some-intervening-node />
            // <old-end-node />
            // <!-- ->              <-- `oldStartVnode.$elm$` should be inserted here
            // <next-sibling />
            //
            // If instead `oldEndVnode.$elm$` has no sibling then we just want to put
            // the node for `oldStartVnode` at the end of the children of
            // `parentElm`. Luckily, `Node.nextSibling` will return `null` if there
            // aren't any siblings, and passing `null` to `Node.insertBefore` will
            // append it to the children of the parent element.
            parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldEndVnode, newStartVnode)) {
            patch(oldEndVnode, newStartVnode);
            // We've already checked above if `oldStartVnode` and `newStartVnode` are
            // the same node, so since we're here we know that they are not. Thus we
            // can move the element for `oldEndVnode` _before_ the element for
            // `oldStartVnode`, leaving `oldStartVnode` to be reconciled in the
            // future.
            parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            {
                // We either didn't find an element in the old children that matches
                // the key of the first new child OR the build is not using `key`
                // attributes at all. In either case we need to create a new element
                // for the new node.
                node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx);
                newStartVnode = newCh[++newStartIdx];
            }
            if (node) {
                // if we created a new node then handle inserting it to the DOM
                {
                    oldStartVnode.$elm$.parentNode.insertBefore(node, oldStartVnode.$elm$);
                }
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        // we have some more new nodes to add which don't match up with old nodes
        addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode, newCh, newStartIdx, newEndIdx);
    }
    else if (newStartIdx > newEndIdx) {
        // there are nodes in the `oldCh` array which no longer correspond to nodes
        // in the new array, so lets remove them (which entails cleaning up the
        // relevant DOM nodes)
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
};
/**
 * Compare two VNodes to determine if they are the same
 *
 * **NB**: This function is an equality _heuristic_ based on the available
 * information set on the two VNodes and can be misleading under certain
 * circumstances. In particular, if the two nodes do not have `key` attrs
 * (available under `$key$` on VNodes) then the function falls back on merely
 * checking that they have the same tag.
 *
 * So, in other words, if `key` attrs are not set on VNodes which may be
 * changing order within a `children` array or something along those lines then
 * we could obtain a false negative and then have to do needless re-rendering
 * (i.e. we'd say two VNodes aren't equal when in fact they should be).
 *
 * @param leftVNode the first VNode to check
 * @param rightVNode the second VNode to check
 * @returns whether they're equal or not
 */
const isSameVnode = (leftVNode, rightVNode) => {
    // compare if two vnode to see if they're "technically" the same
    // need to have the same element tag, and same key to be the same
    if (leftVNode.$tag$ === rightVNode.$tag$) {
        return true;
    }
    return false;
};
/**
 * Handle reconciling an outdated VNode with a new one which corresponds to
 * it. This function handles flushing updates to the DOM and reconciling the
 * children of the two nodes (if any).
 *
 * @param oldVNode an old VNode whose DOM element and children we want to update
 * @param newVNode a new VNode representing an updated version of the old one
 */
const patch = (oldVNode, newVNode) => {
    const elm = (newVNode.$elm$ = oldVNode.$elm$);
    const oldChildren = oldVNode.$children$;
    const newChildren = newVNode.$children$;
    {
        {
            {
                // either this is the first render of an element OR it's an update
                // AND we already know it's possible it could have changed
                // this updates the element's css classes, attrs, props, listeners, etc.
                updateElement(oldVNode, newVNode, isSvgMode);
            }
        }
        if (oldChildren !== null && newChildren !== null) {
            // looks like there's child vnodes for both the old and new vnodes
            // so we need to call `updateChildren` to reconcile them
            updateChildren(elm, oldChildren, newVNode, newChildren);
        }
        else if (newChildren !== null) {
            // add the new vnode children
            addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        }
        else if (oldChildren !== null) {
            // no new child vnodes, but there are old child vnodes to remove
            removeVnodes(oldChildren, 0, oldChildren.length - 1);
        }
    }
};
/**
 * The main entry point for Stencil's virtual DOM-based rendering engine
 *
 * Given a {@link d.HostRef} container and some virtual DOM nodes, this
 * function will handle creating a virtual DOM tree with a single root, patching
 * the current virtual DOM tree onto an old one (if any), dealing with slot
 * relocation, and reflecting attributes.
 *
 * @param hostRef data needed to root and render the virtual DOM tree, such as
 * the DOM node into which it should be rendered.
 * @param renderFnResults the virtual DOM nodes to be rendered
 * @param isInitialLoad whether or not this is the first call after page load
 */
const renderVdom = (hostRef, renderFnResults, isInitialLoad = false) => {
    const hostElm = hostRef.$hostElement$;
    const cmpMeta = hostRef.$cmpMeta$;
    const oldVNode = hostRef.$vnode$ || newVNode(null, null);
    // if `renderFnResults` is a Host node then we can use it directly. If not,
    // we need to call `h` again to wrap the children of our component in a
    // 'dummy' Host node (well, an empty vnode) since `renderVdom` assumes
    // implicitly that the top-level vdom node is 1) an only child and 2)
    // contains attrs that need to be set on the host element.
    const rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
    hostTagName = hostElm.tagName;
    if (cmpMeta.$attrsToReflect$) {
        rootVnode.$attrs$ = rootVnode.$attrs$ || {};
        cmpMeta.$attrsToReflect$.map(([propName, attribute]) => (rootVnode.$attrs$[attribute] = hostElm[propName]));
    }
    // On the first render and *only* on the first render we want to check for
    // any attributes set on the host element which are also set on the vdom
    // node. If we find them, we override the value on the VDom node attrs with
    // the value from the host element, which allows developers building apps
    // with Stencil components to override e.g. the `role` attribute on a
    // component even if it's already set on the `Host`.
    if (isInitialLoad && rootVnode.$attrs$) {
        for (const key of Object.keys(rootVnode.$attrs$)) {
            // We have a special implementation in `setAccessor` for `style` and
            // `class` which reconciles values coming from the VDom with values
            // already present on the DOM element, so we don't want to override those
            // attributes on the VDom tree with values from the host element if they
            // are present.
            //
            // Likewise, `ref` and `key` are special internal values for the Stencil
            // runtime and we don't want to override those either.
            if (hostElm.hasAttribute(key) && !['key', 'ref', 'style', 'class'].includes(key)) {
                rootVnode.$attrs$[key] = hostElm[key];
            }
        }
    }
    rootVnode.$tag$ = null;
    rootVnode.$flags$ |= 4 /* VNODE_FLAGS.isHost */;
    hostRef.$vnode$ = rootVnode;
    rootVnode.$elm$ = oldVNode.$elm$ = (hostElm.shadowRoot || hostElm );
    {
        scopeId = hostElm['s-sc'];
    }
    // synchronous patch
    patch(oldVNode, rootVnode);
};
const attachToAncestor = (hostRef, ancestorComponent) => {
    if (ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent['s-p']) {
        ancestorComponent['s-p'].push(new Promise((r) => (hostRef.$onRenderResolve$ = r)));
    }
};
const scheduleUpdate = (hostRef, isInitialLoad) => {
    {
        hostRef.$flags$ |= 16 /* HOST_FLAGS.isQueuedForUpdate */;
    }
    if (hostRef.$flags$ & 4 /* HOST_FLAGS.isWaitingForChildren */) {
        hostRef.$flags$ |= 512 /* HOST_FLAGS.needsRerender */;
        return;
    }
    attachToAncestor(hostRef, hostRef.$ancestorComponent$);
    // there is no ancestor component or the ancestor component
    // has already fired off its lifecycle update then
    // fire off the initial update
    const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
    return writeTask(dispatch) ;
};
/**
 * Dispatch initial-render and update lifecycle hooks, enqueuing calls to
 * component lifecycle methods like `componentWillLoad` as well as
 * {@link updateComponent}, which will kick off the virtual DOM re-render.
 *
 * @param hostRef a reference to a host DOM node
 * @param isInitialLoad whether we're on the initial load or not
 * @returns an empty Promise which is used to enqueue a series of operations for
 * the component
 */
const dispatchHooks = (hostRef, isInitialLoad) => {
    const endSchedule = createTime('scheduleUpdate', hostRef.$cmpMeta$.$tagName$);
    const instance = hostRef.$lazyInstance$ ;
    // We're going to use this variable together with `enqueue` to implement a
    // little promise-based queue. We start out with it `undefined`. When we add
    // the first function to the queue we'll set this variable to be that
    // function's return value. When we attempt to add subsequent values to the
    // queue we'll check that value and, if it was a `Promise`, we'll then chain
    // the new function off of that `Promise` using `.then()`. This will give our
    // queue two nice properties:
    //
    // 1. If all functions added to the queue are synchronous they'll be called
    //    synchronously right away.
    // 2. If all functions added to the queue are asynchronous they'll all be
    //    called in order after `dispatchHooks` exits.
    let maybePromise;
    if (isInitialLoad) {
        {
            // If `componentWillLoad` returns a `Promise` then we want to wait on
            // whatever's going on in that `Promise` before we launch into
            // rendering the component, doing other lifecycle stuff, etc. So
            // in that case we assign the returned promise to the variable we
            // declared above to hold a possible 'queueing' Promise
            maybePromise = safeCall(instance, 'componentWillLoad');
        }
    }
    endSchedule();
    return enqueue(maybePromise, () => updateComponent(hostRef, instance, isInitialLoad));
};
/**
 * This function uses a Promise to implement a simple first-in, first-out queue
 * of functions to be called.
 *
 * The queue is ordered on the basis of the first argument. If it's
 * `undefined`, then nothing is on the queue yet, so the provided function can
 * be called synchronously (although note that this function may return a
 * `Promise`). The idea is that then the return value of that enqueueing
 * operation is kept around, so that if it was a `Promise` then subsequent
 * functions can be enqueued by calling this function again with that `Promise`
 * as the first argument.
 *
 * @param maybePromise either a `Promise` which should resolve before the next function is called or an 'empty' sentinel
 * @param fn a function to enqueue
 * @returns either a `Promise` or the return value of the provided function
 */
const enqueue = (maybePromise, fn) => isPromisey(maybePromise) ? maybePromise.then(fn) : fn();
/**
 * Check that a value is a `Promise`. To check, we first see if the value is an
 * instance of the `Promise` global. In a few circumstances, in particular if
 * the global has been overwritten, this is could be misleading, so we also do
 * a little 'duck typing' check to see if the `.then` property of the value is
 * defined and a function.
 *
 * @param maybePromise it might be a promise!
 * @returns whether it is or not
 */
const isPromisey = (maybePromise) => maybePromise instanceof Promise ||
    (maybePromise && maybePromise.then && typeof maybePromise.then === 'function');
/**
 * Update a component given reference to its host elements and so on.
 *
 * @param hostRef an object containing references to the element's host node,
 * VDom nodes, and other metadata
 * @param instance a reference to the underlying host element where it will be
 * rendered
 * @param isInitialLoad whether or not this function is being called as part of
 * the first render cycle
 */
const updateComponent = async (hostRef, instance, isInitialLoad) => {
    var _a;
    const elm = hostRef.$hostElement$;
    const endUpdate = createTime('update', hostRef.$cmpMeta$.$tagName$);
    const rc = elm['s-rc'];
    if (isInitialLoad) {
        // DOM WRITE!
        attachStyles(hostRef);
    }
    const endRender = createTime('render', hostRef.$cmpMeta$.$tagName$);
    {
        callRender(hostRef, instance, elm, isInitialLoad);
    }
    if (rc) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        rc.map((cb) => cb());
        elm['s-rc'] = undefined;
    }
    endRender();
    endUpdate();
    {
        const childrenPromises = (_a = elm['s-p']) !== null && _a !== void 0 ? _a : [];
        const postUpdate = () => postUpdateComponent(hostRef);
        if (childrenPromises.length === 0) {
            postUpdate();
        }
        else {
            Promise.all(childrenPromises).then(postUpdate);
            hostRef.$flags$ |= 4 /* HOST_FLAGS.isWaitingForChildren */;
            childrenPromises.length = 0;
        }
    }
};
/**
 * Handle making the call to the VDom renderer with the proper context given
 * various build variables
 *
 * @param hostRef an object containing references to the element's host node,
 * VDom nodes, and other metadata
 * @param instance a reference to the underlying host element where it will be
 * rendered
 * @param elm the Host element for the component
 * @param isInitialLoad whether or not this function is being called as part of
 * @returns an empty promise
 */
const callRender = (hostRef, instance, elm, isInitialLoad) => {
    try {
        instance = instance.render() ;
        {
            hostRef.$flags$ &= ~16 /* HOST_FLAGS.isQueuedForUpdate */;
        }
        {
            hostRef.$flags$ |= 2 /* HOST_FLAGS.hasRendered */;
        }
        {
            {
                // looks like we've got child nodes to render into this host element
                // or we need to update the css class/attrs on the host element
                // DOM WRITE!
                {
                    renderVdom(hostRef, instance, isInitialLoad);
                }
            }
        }
    }
    catch (e) {
        consoleError(e, hostRef.$hostElement$);
    }
    return null;
};
const postUpdateComponent = (hostRef) => {
    const tagName = hostRef.$cmpMeta$.$tagName$;
    const elm = hostRef.$hostElement$;
    const endPostUpdate = createTime('postUpdate', tagName);
    const instance = hostRef.$lazyInstance$ ;
    const ancestorComponent = hostRef.$ancestorComponent$;
    if (!(hostRef.$flags$ & 64 /* HOST_FLAGS.hasLoadedComponent */)) {
        hostRef.$flags$ |= 64 /* HOST_FLAGS.hasLoadedComponent */;
        {
            // DOM WRITE!
            addHydratedFlag(elm);
        }
        {
            safeCall(instance, 'componentDidLoad');
        }
        endPostUpdate();
        {
            hostRef.$onReadyResolve$(elm);
            if (!ancestorComponent) {
                appDidLoad();
            }
        }
    }
    else {
        endPostUpdate();
    }
    {
        hostRef.$onInstanceResolve$(elm);
    }
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    {
        if (hostRef.$onRenderResolve$) {
            hostRef.$onRenderResolve$();
            hostRef.$onRenderResolve$ = undefined;
        }
        if (hostRef.$flags$ & 512 /* HOST_FLAGS.needsRerender */) {
            nextTick(() => scheduleUpdate(hostRef, false));
        }
        hostRef.$flags$ &= ~(4 /* HOST_FLAGS.isWaitingForChildren */ | 512 /* HOST_FLAGS.needsRerender */);
    }
    // ( •_•)
    // ( •_•)>⌐■-■
    // (⌐■_■)
};
const appDidLoad = (who) => {
    // on appload
    // we have finish the first big initial render
    {
        addHydratedFlag(doc.documentElement);
    }
    nextTick(() => emitEvent(win, 'appload', { detail: { namespace: NAMESPACE } }));
};
const safeCall = (instance, method, arg) => {
    if (instance && instance[method]) {
        try {
            return instance[method](arg);
        }
        catch (e) {
            consoleError(e);
        }
    }
    return undefined;
};
const addHydratedFlag = (elm) => elm.classList.add('hydrated')
    ;
const getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
const setValue = (ref, propName, newVal, cmpMeta) => {
    // check our new property value against our internal value
    const hostRef = getHostRef(ref);
    const elm = hostRef.$hostElement$ ;
    const oldVal = hostRef.$instanceValues$.get(propName);
    const flags = hostRef.$flags$;
    const instance = hostRef.$lazyInstance$ ;
    newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
    // explicitly check for NaN on both sides, as `NaN === NaN` is always false
    const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
    const didValueChange = newVal !== oldVal && !areBothNaN;
    if ((!(flags & 8 /* HOST_FLAGS.isConstructingInstance */) || oldVal === undefined) && didValueChange) {
        // gadzooks! the property's value has changed!!
        // set our new value!
        hostRef.$instanceValues$.set(propName, newVal);
        if (instance) {
            // get an array of method names of watch functions to call
            if (cmpMeta.$watchers$ && flags & 128 /* HOST_FLAGS.isWatchReady */) {
                const watchMethods = cmpMeta.$watchers$[propName];
                if (watchMethods) {
                    // this instance is watching for when this property changed
                    watchMethods.map((watchMethodName) => {
                        try {
                            // fire off each of the watch methods that are watching this property
                            instance[watchMethodName](newVal, oldVal, propName);
                        }
                        catch (e) {
                            consoleError(e, elm);
                        }
                    });
                }
            }
            if ((flags & (2 /* HOST_FLAGS.hasRendered */ | 16 /* HOST_FLAGS.isQueuedForUpdate */)) === 2 /* HOST_FLAGS.hasRendered */) {
                // looks like this value actually changed, so we've got work to do!
                // but only if we've already rendered, otherwise just chill out
                // queue that we need to do an update, but don't worry about queuing
                // up millions cuz this function ensures it only runs once
                scheduleUpdate(hostRef, false);
            }
        }
    }
};
/**
 * Attach a series of runtime constructs to a compiled Stencil component
 * constructor, including getters and setters for the `@Prop` and `@State`
 * decorators, callbacks for when attributes change, and so on.
 *
 * @param Cstr the constructor for a component that we need to process
 * @param cmpMeta metadata collected previously about the component
 * @param flags a number used to store a series of bit flags
 * @returns a reference to the same constructor passed in (but now mutated)
 */
const proxyComponent = (Cstr, cmpMeta, flags) => {
    if (cmpMeta.$members$) {
        if (Cstr.watchers) {
            cmpMeta.$watchers$ = Cstr.watchers;
        }
        // It's better to have a const than two Object.entries()
        const members = Object.entries(cmpMeta.$members$);
        const prototype = Cstr.prototype;
        members.map(([memberName, [memberFlags]]) => {
            if ((memberFlags & 31 /* MEMBER_FLAGS.Prop */ ||
                    ((flags & 2 /* PROXY_FLAGS.proxyState */) && memberFlags & 32 /* MEMBER_FLAGS.State */))) {
                // proxyComponent - prop
                Object.defineProperty(prototype, memberName, {
                    get() {
                        // proxyComponent, get value
                        return getValue(this, memberName);
                    },
                    set(newValue) {
                        // proxyComponent, set value
                        setValue(this, memberName, newValue, cmpMeta);
                    },
                    configurable: true,
                    enumerable: true,
                });
            }
            else if (flags & 1 /* PROXY_FLAGS.isElementConstructor */ &&
                memberFlags & 64 /* MEMBER_FLAGS.Method */) {
                // proxyComponent - method
                Object.defineProperty(prototype, memberName, {
                    value(...args) {
                        const ref = getHostRef(this);
                        return ref.$onInstancePromise$.then(() => ref.$lazyInstance$[memberName](...args));
                    },
                });
            }
        });
        if ((flags & 1 /* PROXY_FLAGS.isElementConstructor */)) {
            const attrNameToPropName = new Map();
            prototype.attributeChangedCallback = function (attrName, _oldValue, newValue) {
                plt.jmp(() => {
                    const propName = attrNameToPropName.get(attrName);
                    //  In a web component lifecycle the attributeChangedCallback runs prior to connectedCallback
                    //  in the case where an attribute was set inline.
                    //  ```html
                    //    <my-component some-attribute="some-value"></my-component>
                    //  ```
                    //
                    //  There is an edge case where a developer sets the attribute inline on a custom element and then
                    //  programmatically changes it before it has been upgraded as shown below:
                    //
                    //  ```html
                    //    <!-- this component has _not_ been upgraded yet -->
                    //    <my-component id="test" some-attribute="some-value"></my-component>
                    //    <script>
                    //      // grab non-upgraded component
                    //      el = document.querySelector("#test");
                    //      el.someAttribute = "another-value";
                    //      // upgrade component
                    //      customElements.define('my-component', MyComponent);
                    //    </script>
                    //  ```
                    //  In this case if we do not unshadow here and use the value of the shadowing property, attributeChangedCallback
                    //  will be called with `newValue = "some-value"` and will set the shadowed property (this.someAttribute = "another-value")
                    //  to the value that was set inline i.e. "some-value" from above example. When
                    //  the connectedCallback attempts to unshadow it will use "some-value" as the initial value rather than "another-value"
                    //
                    //  The case where the attribute was NOT set inline but was not set programmatically shall be handled/unshadowed
                    //  by connectedCallback as this attributeChangedCallback will not fire.
                    //
                    //  https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
                    //
                    //  TODO(STENCIL-16) we should think about whether or not we actually want to be reflecting the attributes to
                    //  properties here given that this goes against best practices outlined here
                    //  https://developers.google.com/web/fundamentals/web-components/best-practices#avoid-reentrancy
                    if (this.hasOwnProperty(propName)) {
                        newValue = this[propName];
                        delete this[propName];
                    }
                    else if (prototype.hasOwnProperty(propName) &&
                        typeof this[propName] === 'number' &&
                        this[propName] == newValue) {
                        // if the propName exists on the prototype of `Cstr`, this update may be a result of Stencil using native
                        // APIs to reflect props as attributes. Calls to `setAttribute(someElement, propName)` will result in
                        // `propName` to be converted to a `DOMString`, which may not be what we want for other primitive props.
                        return;
                    }
                    this[propName] = newValue === null && typeof this[propName] === 'boolean' ? false : newValue;
                });
            };
            // create an array of attributes to observe
            // and also create a map of html attribute name to js property name
            Cstr.observedAttributes = members
                .filter(([_, m]) => m[0] & 15 /* MEMBER_FLAGS.HasAttribute */) // filter to only keep props that should match attributes
                .map(([propName, m]) => {
                const attrName = m[1] || propName;
                attrNameToPropName.set(attrName, propName);
                if (m[0] & 512 /* MEMBER_FLAGS.ReflectAttr */) {
                    cmpMeta.$attrsToReflect$.push([propName, attrName]);
                }
                return attrName;
            });
        }
    }
    return Cstr;
};
const initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId, Cstr) => {
    // initializeComponent
    if ((hostRef.$flags$ & 32 /* HOST_FLAGS.hasInitializedComponent */) === 0) {
        // Let the runtime know that the component has been initialized
        hostRef.$flags$ |= 32 /* HOST_FLAGS.hasInitializedComponent */;
        {
            // lazy loaded components
            // request the component's implementation to be
            // wired up with the host element
            Cstr = loadModule(cmpMeta);
            if (Cstr.then) {
                // Await creates a micro-task avoid if possible
                const endLoad = uniqueTime();
                Cstr = await Cstr;
                endLoad();
            }
            if (!Cstr.isProxied) {
                // we've never proxied this Constructor before
                // let's add the getters/setters to its prototype before
                // the first time we create an instance of the implementation
                {
                    cmpMeta.$watchers$ = Cstr.watchers;
                }
                proxyComponent(Cstr, cmpMeta, 2 /* PROXY_FLAGS.proxyState */);
                Cstr.isProxied = true;
            }
            const endNewInstance = createTime('createInstance', cmpMeta.$tagName$);
            // ok, time to construct the instance
            // but let's keep track of when we start and stop
            // so that the getters/setters don't incorrectly step on data
            {
                hostRef.$flags$ |= 8 /* HOST_FLAGS.isConstructingInstance */;
            }
            // construct the lazy-loaded component implementation
            // passing the hostRef is very important during
            // construction in order to directly wire together the
            // host element and the lazy-loaded instance
            try {
                new Cstr(hostRef);
            }
            catch (e) {
                consoleError(e);
            }
            {
                hostRef.$flags$ &= ~8 /* HOST_FLAGS.isConstructingInstance */;
            }
            {
                hostRef.$flags$ |= 128 /* HOST_FLAGS.isWatchReady */;
            }
            endNewInstance();
            fireConnectedCallback(hostRef.$lazyInstance$);
        }
        if (Cstr.style) {
            // this component has styles but we haven't registered them yet
            let style = Cstr.style;
            const scopeId = getScopeId(cmpMeta);
            if (!styles.has(scopeId)) {
                const endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$);
                registerStyle(scopeId, style, !!(cmpMeta.$flags$ & 1 /* CMP_FLAGS.shadowDomEncapsulation */));
                endRegisterStyles();
            }
        }
    }
    // we've successfully created a lazy instance
    const ancestorComponent = hostRef.$ancestorComponent$;
    const schedule = () => scheduleUpdate(hostRef, true);
    if (ancestorComponent && ancestorComponent['s-rc']) {
        // this is the initial load and this component it has an ancestor component
        // but the ancestor component has NOT fired its will update lifecycle yet
        // so let's just cool our jets and wait for the ancestor to continue first
        // this will get fired off when the ancestor component
        // finally gets around to rendering its lazy self
        // fire off the initial update
        ancestorComponent['s-rc'].push(schedule);
    }
    else {
        schedule();
    }
};
const fireConnectedCallback = (instance) => {
    {
        safeCall(instance, 'connectedCallback');
    }
};
const connectedCallback = (elm) => {
    if ((plt.$flags$ & 1 /* PLATFORM_FLAGS.isTmpDisconnected */) === 0) {
        const hostRef = getHostRef(elm);
        const cmpMeta = hostRef.$cmpMeta$;
        const endConnected = createTime('connectedCallback', cmpMeta.$tagName$);
        if (!(hostRef.$flags$ & 1 /* HOST_FLAGS.hasConnected */)) {
            // first time this component has connected
            hostRef.$flags$ |= 1 /* HOST_FLAGS.hasConnected */;
            {
                // find the first ancestor component (if there is one) and register
                // this component as one of the actively loading child components for its ancestor
                let ancestorComponent = elm;
                while ((ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host)) {
                    // climb up the ancestors looking for the first
                    // component that hasn't finished its lifecycle update yet
                    if (ancestorComponent['s-p']) {
                        // we found this components first ancestor component
                        // keep a reference to this component's ancestor component
                        attachToAncestor(hostRef, (hostRef.$ancestorComponent$ = ancestorComponent));
                        break;
                    }
                }
            }
            // Lazy properties
            // https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
            if (cmpMeta.$members$) {
                Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
                    if (memberFlags & 31 /* MEMBER_FLAGS.Prop */ && elm.hasOwnProperty(memberName)) {
                        const value = elm[memberName];
                        delete elm[memberName];
                        elm[memberName] = value;
                    }
                });
            }
            {
                initializeComponent(elm, hostRef, cmpMeta);
            }
        }
        else {
            // fire off connectedCallback() on component instance
            if (hostRef === null || hostRef === void 0 ? void 0 : hostRef.$lazyInstance$) {
                fireConnectedCallback(hostRef.$lazyInstance$);
            }
            else if (hostRef === null || hostRef === void 0 ? void 0 : hostRef.$onReadyPromise$) {
                hostRef.$onReadyPromise$.then(() => fireConnectedCallback(hostRef.$lazyInstance$));
            }
        }
        endConnected();
    }
};
const disconnectInstance = (instance) => {
};
const disconnectedCallback = async (elm) => {
    if ((plt.$flags$ & 1 /* PLATFORM_FLAGS.isTmpDisconnected */) === 0) {
        const hostRef = getHostRef(elm);
        if (hostRef === null || hostRef === void 0 ? void 0 : hostRef.$lazyInstance$) ;
        else if (hostRef === null || hostRef === void 0 ? void 0 : hostRef.$onReadyPromise$) {
            hostRef.$onReadyPromise$.then(() => disconnectInstance());
        }
    }
};
const bootstrapLazy = (lazyBundles, options = {}) => {
    var _a;
    const endBootstrap = createTime();
    const cmpTags = [];
    const exclude = options.exclude || [];
    const customElements = win.customElements;
    const head = doc.head;
    const metaCharset = /*@__PURE__*/ head.querySelector('meta[charset]');
    const visibilityStyle = /*@__PURE__*/ doc.createElement('style');
    const deferredConnectedCallbacks = [];
    let appLoadFallback;
    let isBootstrapping = true;
    Object.assign(plt, options);
    plt.$resourcesUrl$ = new URL(options.resourcesUrl || './', doc.baseURI).href;
    lazyBundles.map((lazyBundle) => {
        lazyBundle[1].map((compactMeta) => {
            const cmpMeta = {
                $flags$: compactMeta[0],
                $tagName$: compactMeta[1],
                $members$: compactMeta[2],
                $listeners$: compactMeta[3],
            };
            {
                cmpMeta.$members$ = compactMeta[2];
            }
            {
                cmpMeta.$attrsToReflect$ = [];
            }
            {
                cmpMeta.$watchers$ = {};
            }
            const tagName = cmpMeta.$tagName$;
            const HostElement = class extends HTMLElement {
                // StencilLazyHost
                constructor(self) {
                    // @ts-ignore
                    super(self);
                    self = this;
                    registerHost(self, cmpMeta);
                    if (cmpMeta.$flags$ & 1 /* CMP_FLAGS.shadowDomEncapsulation */) {
                        // this component is using shadow dom
                        // and this browser supports shadow dom
                        // add the read-only property "shadowRoot" to the host element
                        // adding the shadow root build conditionals to minimize runtime
                        {
                            {
                                self.attachShadow({ mode: 'open' });
                            }
                        }
                    }
                }
                connectedCallback() {
                    if (appLoadFallback) {
                        clearTimeout(appLoadFallback);
                        appLoadFallback = null;
                    }
                    if (isBootstrapping) {
                        // connectedCallback will be processed once all components have been registered
                        deferredConnectedCallbacks.push(this);
                    }
                    else {
                        plt.jmp(() => connectedCallback(this));
                    }
                }
                disconnectedCallback() {
                    plt.jmp(() => disconnectedCallback(this));
                }
                componentOnReady() {
                    return getHostRef(this).$onReadyPromise$;
                }
            };
            cmpMeta.$lazyBundleId$ = lazyBundle[0];
            if (!exclude.includes(tagName) && !customElements.get(tagName)) {
                cmpTags.push(tagName);
                customElements.define(tagName, proxyComponent(HostElement, cmpMeta, 1 /* PROXY_FLAGS.isElementConstructor */));
            }
        });
    });
    {
        visibilityStyle.innerHTML = cmpTags + HYDRATED_CSS;
        visibilityStyle.setAttribute('data-styles', '');
        // Apply CSP nonce to the style tag if it exists
        const nonce = (_a = plt.$nonce$) !== null && _a !== void 0 ? _a : queryNonceMetaTagContent(doc);
        if (nonce != null) {
            visibilityStyle.setAttribute('nonce', nonce);
        }
        head.insertBefore(visibilityStyle, metaCharset ? metaCharset.nextSibling : head.firstChild);
    }
    // Process deferred connectedCallbacks now all components have been registered
    isBootstrapping = false;
    if (deferredConnectedCallbacks.length) {
        deferredConnectedCallbacks.map((host) => host.connectedCallback());
    }
    else {
        {
            plt.jmp(() => (appLoadFallback = setTimeout(appDidLoad, 30)));
        }
    }
    // Fallback appLoad event
    endBootstrap();
};
/**
 * Assigns the given value to the nonce property on the runtime platform object.
 * During runtime, this value is used to set the nonce attribute on all dynamically created script and style tags.
 * @param nonce The value to be assigned to the platform nonce property.
 * @returns void
 */
const setNonce = (nonce) => (plt.$nonce$ = nonce);
const hostRefs = /*@__PURE__*/ new WeakMap();
const getHostRef = (ref) => hostRefs.get(ref);
const registerInstance = (lazyInstance, hostRef) => hostRefs.set((hostRef.$lazyInstance$ = lazyInstance), hostRef);
const registerHost = (elm, cmpMeta) => {
    const hostRef = {
        $flags$: 0,
        $hostElement$: elm,
        $cmpMeta$: cmpMeta,
        $instanceValues$: new Map(),
    };
    {
        hostRef.$onInstancePromise$ = new Promise((r) => (hostRef.$onInstanceResolve$ = r));
    }
    {
        hostRef.$onReadyPromise$ = new Promise((r) => (hostRef.$onReadyResolve$ = r));
        elm['s-p'] = [];
        elm['s-rc'] = [];
    }
    return hostRefs.set(elm, hostRef);
};
const isMemberInElement = (elm, memberName) => memberName in elm;
const consoleError = (e, el) => (0, console.error)(e, el);
const cmpModules = /*@__PURE__*/ new Map();
const loadModule = (cmpMeta, hostRef, hmrVersionId) => {
    // loadModuleImport
    const exportName = cmpMeta.$tagName$.replace(/-/g, '_');
    const bundleId = cmpMeta.$lazyBundleId$;
    const module = cmpModules.get(bundleId) ;
    if (module) {
        return module[exportName];
    }
    /*!__STENCIL_STATIC_IMPORT_SWITCH__*/
    return import(
    /* @vite-ignore */
    /* webpackInclude: /\.entry\.js$/ */
    /* webpackExclude: /\.system\.entry\.js$/ */
    /* webpackMode: "lazy" */
    `./${bundleId}.entry.js${''}`).then((importedModule) => {
        {
            cmpModules.set(bundleId, importedModule);
        }
        return importedModule[exportName];
    }, consoleError);
};
const styles = /*@__PURE__*/ new Map();
const win = typeof window !== 'undefined' ? window : {};
const doc = win.document || { head: {} };
const plt = {
    $flags$: 0,
    $resourcesUrl$: '',
    jmp: (h) => h(),
    raf: (h) => requestAnimationFrame(h),
    ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
    rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
    ce: (eventName, opts) => new CustomEvent(eventName, opts),
};
const promiseResolve = (v) => Promise.resolve(v);
const supportsConstructableStylesheets = /*@__PURE__*/ (() => {
        try {
            new CSSStyleSheet();
            return typeof new CSSStyleSheet().replaceSync === 'function';
        }
        catch (e) { }
        return false;
    })()
    ;
const queueDomReads = [];
const queueDomWrites = [];
const queueTask = (queue, write) => (cb) => {
    queue.push(cb);
    if (!queuePending) {
        queuePending = true;
        if (write && plt.$flags$ & 4 /* PLATFORM_FLAGS.queueSync */) {
            nextTick(flush);
        }
        else {
            plt.raf(flush);
        }
    }
};
const consume = (queue) => {
    for (let i = 0; i < queue.length; i++) {
        try {
            queue[i](performance.now());
        }
        catch (e) {
            consoleError(e);
        }
    }
    queue.length = 0;
};
const flush = () => {
    // always force a bunch of medium callbacks to run, but still have
    // a throttle on how many can run in a certain time
    // DOM READS!!!
    consume(queueDomReads);
    // DOM WRITES!!!
    {
        consume(queueDomWrites);
        if ((queuePending = queueDomReads.length > 0)) {
            // still more to do yet, but we've run out of time
            // let's let this thing cool off and try again in the next tick
            plt.raf(flush);
        }
    }
};
const nextTick = /*@__PURE__*/ (cb) => promiseResolve().then(cb);
const writeTask = /*@__PURE__*/ queueTask(queueDomWrites, true);

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return undefined;
  return bootstrapLazy([["jeep-sqlite",[[1,"jeep-sqlite",{"autoSave":[516,"autosave"],"typeOrm":[516,"typeorm"],"wasmPath":[513,"wasmpath"],"pickText":[513,"picktext"],"saveText":[513,"savetext"],"buttonOptions":[513,"buttonoptions"],"innerAutoSave":[32],"innerTypeOrm":[32],"innerWasmPath":[32],"innerPickText":[32],"innerSaveText":[32],"innerButtonOptions":[32],"echo":[64],"createConnection":[64],"isConnection":[64],"closeConnection":[64],"open":[64],"close":[64],"getVersion":[64],"beginTransaction":[64],"commitTransaction":[64],"rollbackTransaction":[64],"isTransactionActive":[64],"execute":[64],"executeSet":[64],"run":[64],"query":[64],"getTableList":[64],"isDBExists":[64],"isDBOpen":[64],"deleteDatabase":[64],"isStoreOpen":[64],"copyFromAssets":[64],"isTableExists":[64],"createSyncTable":[64],"getSyncDate":[64],"setSyncDate":[64],"isJsonValid":[64],"importFromJson":[64],"exportToJson":[64],"deleteExportedRows":[64],"addUpgradeStatement":[64],"isDatabase":[64],"getDatabaseList":[64],"checkConnectionsConsistency":[64],"saveToStore":[64],"saveToLocalDisk":[64],"getFromLocalDiskToStore":[64],"getFromHTTPRequest":[64]}]]]], options);
};

const appGlobalScript = () => {
  ext.linkExternalFunctions();
};
window.addEventListener("message", receiveMessage, false);
Preferences.migrate();
Preferences.removeOld();
changeBackButton(); //Changes devices back button behaviour to properly navigate the app
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
window.addEventListener('DOMContentLoaded', async () => {
  const platform = Capacitor.getPlatform();
  const sqlite = new SQLiteConnection(CapacitorSQLite);
  try {
    if (platform === "web") {
      const jeepSql = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSql);
      applyPolyfills().then(async () => {
        await defineCustomElements(window);
        await customElements.whenDefined('jeep-sqlite');
        await sqlite.initWebStore();
      });
    }
  }
  catch (err) {
    console.log(`Error: ${err}`);
    throw new Error(`Error: ${err}`);
  }
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

export { globalScripts as g };
