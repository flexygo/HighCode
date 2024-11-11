import { i as initialize } from './ionic-global-6d118971.js';
import { C as ConftokenProvider, u as util, s as sql, n as nav, m as msg, c as cordova$1, a as checkAvailability, g as getPromise, I as IonicNativePlugin, _ as __extends$1, b as cordovaPropertyGet, d as cordovaPropertySet, e as Injectable, W as Webapi, f as navOnline, h as cam, i as gps, t as tracking, j as util$1, k as flxSync, l as storage, r as registerPlugin, P as Preferences, o as ConfToken, U as UrlConfig, p as Capacitor, S as SQLiteConnection, q as CapacitorSQLite, v as ConftokenService, G as GeneralContextProvider } from './conftoken-89472368.js';
import { j as jquery } from './jquery-34624bb9.js';
import { w as whiteboard } from './whiteboard-82d790ac.js';
import { p as parser } from './parser-e9709966.js';

var forms;
(function (forms) {
  async function save(btn, showMessage = true, goBack = false) {
    const edit = btn.closest('flx-edit');
    const form = edit.querySelector('form');
    if (form.is_executing_value_dep) {
      form.save_function = () => { save(btn, showMessage, goBack); };
      return;
    }
    let tkn = await ConftokenProvider.config();
    if (jquery(edit).find('form').valid()) {
      checkRequiredLockedFields(edit);
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
        return sql.execSQL(UpdateScript, values).then(() => {
          if (goBack) {
            nav.goBack();
          }
          if (showMessage) {
            msg.success(util.translate('msg.saved'));
          }
        }).catch(err => { throw err; });
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
        return sql.execSQL(InserScript, values).then(() => {
          if (goBack) {
            nav.goBack();
          }
          if (showMessage) {
            msg.success(util.translate('msg.saved'));
          }
        }).catch(err => { throw err; });
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
  function checkRequiredLockedFields(edit) {
    let are_disabled_requireds = false;
    jquery(edit).find('[property][required][disabled]').each((_, el) => {
      //We check if the element is trully required and disabled
      const required_attr = el.getAttribute('required'), disabled_attr = el.getAttribute('required');
      if ((required_attr !== "true" && required_attr) || (disabled_attr !== "true" && disabled_attr))
        return;
      //If it does NOT have a value we add the required label
      let required_label = el.parentNode.querySelector('.error');
      if (!el.value) {
        if (!required_label) {
          required_label = document.createElement('label');
          required_label.setAttribute('id', el.getAttribute('property') + '-error');
          required_label.setAttribute('for', el.getAttribute('property'));
          required_label.classList.add('error');
          required_label.textContent = 'Required';
          el.parentNode.append(required_label);
        }
        if (!jquery(required_label).is(':visible')) {
          required_label.textContent = 'Required';
          required_label.style.display = 'block';
        }
        are_disabled_requireds = true;
        return;
      }
      //If it does HAVE a value and a required label, we hide the label
      if (required_label) {
        required_label.style.display = 'none';
      }
    });
    if (are_disabled_requireds)
      throw new Error(util.translate('exceptions.required'));
  }
})(forms || (forms = {}));

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
    refresh: 'Només rebre',
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
    createBackupHeader: 'Crear còpia de base de dades',
    createBackupMessage: 'Voleu fer la còpia de la base de dades?',
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
    category: 'Categoria',
    msg: 'Vols eliminar el document?',
    msgEdit: 'Editar propietats',
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
    refresh: 'Recevoir uniquement',
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
    createBackupHeader: 'Créer une copie de la base de données',
    createBackupMessage: 'Voulez-vous faire une copie de la base de données?',
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
    category: 'Catégorie',
    msg: 'Voulez-vous supprimer le document?',
    msgEdit: 'Modifier les propriétés',
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
    refresh: 'Sólo recibir',
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
    createBackupHeader: 'Crear copia de base de datos',
    createBackupMessage: '¿Quieres hacer la copia de la base de datos?',
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
    category: 'Categoría',
    msg: '¿Desea eliminar el documento?',
    msgEdit: 'Editar propiedades',
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
    refresh: 'Einfach empfangen',
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
    createBackupHeader: 'Datenbankkopie erstellen',
    createBackupMessage: 'Möchten Sie eine Kopie der Datenbank erstellen?',
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
    category: 'Kategorie',
    msg: 'Möchten Sie das Dokument löschen?',
    msgEdit: 'Eigenschaften bearbeiten',
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
    refresh: 'Just receive',
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
    createBackupHeader: 'Create database copy',
    createBackupMessage: 'Do you want to create a copy of the database?',
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
    description: 'Description',
    category: 'Category',
    msg: 'Do you want to delete the document?',
    msgEdit: 'Edit properties',
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
    refresh: 'Receber apenas',
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
    createBackupHeader: 'Criar uma cópia da base de dados',
    createBackupMessage: 'Pretende fazer uma cópia da base de dados?',
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
    category: 'Categoria',
    msg: 'Deseja excluir o documento?',
    msgEdit: 'Editar propriedades',
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
    refresh: 'Ricevere solo',
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
    createBackupHeader: 'Creare una copia del database',
    createBackupMessage: 'Volete creare una copia del database?',
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
    category: 'Categoria',
    msg: 'Vuoi eliminare il documento?',
    msgEdit: 'Modifica delle proprietà',
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
    web: () => import('./web-247bba33.js').then(m => new m.AppWeb()),
});

const NAMESPACE = 'jeep-sqlite';
const BUILD = /* jeep-sqlite */ { allRenderFn: true, appendChildSlotFix: false, asyncLoading: true, asyncQueue: false, attachStyles: true, cloneNodeFix: false, cmpDidLoad: true, cmpDidRender: false, cmpDidUnload: false, cmpDidUpdate: false, cmpShouldUpdate: false, cmpWillLoad: true, cmpWillRender: false, cmpWillUpdate: false, connectedCallback: true, constructableCSS: true, cssAnnotations: true, devTools: false, disconnectedCallback: false, element: false, event: true, experimentalScopedSlotChanges: false, experimentalSlotFixes: false, formAssociated: false, hasRenderFn: true, hostListener: false, hostListenerTarget: false, hostListenerTargetBody: false, hostListenerTargetDocument: false, hostListenerTargetParent: false, hostListenerTargetWindow: false, hotModuleReplacement: false, hydrateClientSide: false, hydrateServerSide: false, hydratedAttribute: false, hydratedClass: true, hydratedSelectorName: "hydrated", initializeNextTick: false, invisiblePrehydration: true, isDebug: false, isDev: false, isTesting: false, lazyLoad: true, lifecycle: true, lifecycleDOMEvents: false, member: true, method: true, mode: false, observeAttribute: true, profile: false, prop: true, propBoolean: true, propMutable: false, propNumber: false, propString: true, reflect: true, scoped: false, scopedSlotTextContentFix: false, scriptDataOpts: false, shadowDelegatesFocus: false, shadowDom: true, slot: false, slotChildNodesFix: false, slotRelocation: false, state: true, style: true, svg: false, taskQueue: true, transformTagName: false, updatable: true, vdomAttribute: true, vdomClass: false, vdomFunctional: false, vdomKey: false, vdomListener: false, vdomPropOrAttr: true, vdomRef: false, vdomRender: false, vdomStyle: false, vdomText: false, vdomXlink: false, watchCallback: true };

/*
 Stencil Client Platform v4.20.0 | MIT Licensed | https://stenciljs.com
 */
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var hostRefs = /* @__PURE__ */ new WeakMap();
var getHostRef = (ref) => hostRefs.get(ref);
var registerInstance = (lazyInstance, hostRef) => hostRefs.set(hostRef.$lazyInstance$ = lazyInstance, hostRef);
var registerHost = (hostElement, cmpMeta) => {
  const hostRef = {
    $flags$: 0,
    $hostElement$: hostElement,
    $cmpMeta$: cmpMeta,
    $instanceValues$: /* @__PURE__ */ new Map()
  };
  {
    hostRef.$onInstancePromise$ = new Promise((r) => hostRef.$onInstanceResolve$ = r);
  }
  {
    hostRef.$onReadyPromise$ = new Promise((r) => hostRef.$onReadyResolve$ = r);
    hostElement["s-p"] = [];
    hostElement["s-rc"] = [];
  }
  return hostRefs.set(hostElement, hostRef);
};
var isMemberInElement = (elm, memberName) => memberName in elm;
var consoleError = (e, el) => (0, console.error)(e, el);

// src/client/client-load-module.ts
var cmpModules = /* @__PURE__ */ new Map();
var loadModule = (cmpMeta, hostRef, hmrVersionId) => {
  const exportName = cmpMeta.$tagName$.replace(/-/g, "_");
  const bundleId = cmpMeta.$lazyBundleId$;
  if (!bundleId) {
    return void 0;
  }
  const module = cmpModules.get(bundleId) ;
  if (module) {
    return module[exportName];
  }
  
        if (!hmrVersionId || !BUILD.hotModuleReplacement) {
          const processMod = importedModule => {
              cmpModules.set(bundleId, importedModule);
              return importedModule[exportName];
          };
          switch(bundleId) {
              
                case 'jeep-sqlite':
                    return import(
                      /* webpackMode: "lazy" */
                      './jeep-sqlite.entry-07d93181.js').then(processMod, consoleError);
          }
      }
  return import(
    /* @vite-ignore */
    /* webpackInclude: /\.entry\.js$/ */
    /* webpackExclude: /\.system\.entry\.js$/ */
    /* webpackMode: "lazy" */
    `./${bundleId}.entry.js${""}`
  ).then((importedModule) => {
    {
      cmpModules.set(bundleId, importedModule);
    }
    return importedModule[exportName];
  }, consoleError);
};

// src/client/client-style.ts
var styles = /* @__PURE__ */ new Map();
var HYDRATED_CSS = "{visibility:hidden}.hydrated{visibility:inherit}";
var SLOT_FB_CSS = "slot-fb{display:contents}slot-fb[hidden]{display:none}";
var win = typeof window !== "undefined" ? window : {};
var doc = win.document || { head: {} };
var plt = {
  $flags$: 0,
  $resourcesUrl$: "",
  jmp: (h2) => h2(),
  raf: (h2) => requestAnimationFrame(h2),
  ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
  rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
  ce: (eventName, opts) => new CustomEvent(eventName, opts)
};
var promiseResolve = (v) => Promise.resolve(v);
var supportsConstructableStylesheets = /* @__PURE__ */ (() => {
  try {
    new CSSStyleSheet();
    return typeof new CSSStyleSheet().replaceSync === "function";
  } catch (e) {
  }
  return false;
})() ;
var queuePending = false;
var queueDomReads = [];
var queueDomWrites = [];
var queueTask = (queue, write) => (cb) => {
  queue.push(cb);
  if (!queuePending) {
    queuePending = true;
    if (write && plt.$flags$ & 4 /* queueSync */) {
      nextTick(flush);
    } else {
      plt.raf(flush);
    }
  }
};
var consume = (queue) => {
  for (let i2 = 0; i2 < queue.length; i2++) {
    try {
      queue[i2](performance.now());
    } catch (e) {
      consoleError(e);
    }
  }
  queue.length = 0;
};
var flush = () => {
  consume(queueDomReads);
  {
    consume(queueDomWrites);
    if (queuePending = queueDomReads.length > 0) {
      plt.raf(flush);
    }
  }
};
var nextTick = (cb) => promiseResolve().then(cb);
var writeTask = /* @__PURE__ */ queueTask(queueDomWrites, true);

// src/utils/constants.ts
var EMPTY_OBJ = {};

// src/utils/helpers.ts
var isDef = (v) => v != null;
var isComplexType = (o) => {
  o = typeof o;
  return o === "object" || o === "function";
};

// src/utils/query-nonce-meta-tag-content.ts
function queryNonceMetaTagContent(doc2) {
  var _a, _b, _c;
  return (_c = (_b = (_a = doc2.head) == null ? void 0 : _a.querySelector('meta[name="csp-nonce"]')) == null ? void 0 : _b.getAttribute("content")) != null ? _c : void 0;
}

// src/utils/result.ts
var result_exports = {};
__export(result_exports, {
  err: () => err,
  map: () => map,
  ok: () => ok,
  unwrap: () => unwrap,
  unwrapErr: () => unwrapErr
});
var ok = (value) => ({
  isOk: true,
  isErr: false,
  value
});
var err = (value) => ({
  isOk: false,
  isErr: true,
  value
});
function map(result, fn) {
  if (result.isOk) {
    const val = fn(result.value);
    if (val instanceof Promise) {
      return val.then((newVal) => ok(newVal));
    } else {
      return ok(val);
    }
  }
  if (result.isErr) {
    const value = result.value;
    return err(value);
  }
  throw "should never get here";
}
var unwrap = (result) => {
  if (result.isOk) {
    return result.value;
  } else {
    throw result.value;
  }
};
var unwrapErr = (result) => {
  if (result.isErr) {
    return result.value;
  } else {
    throw result.value;
  }
};
var createTime = (fnName, tagName = "") => {
  {
    return () => {
      return;
    };
  }
};
var uniqueTime = (key, measureText) => {
  {
    return () => {
      return;
    };
  }
};
var h = (nodeName, vnodeData, ...children) => {
  let child = null;
  let simple = false;
  let lastSimple = false;
  const vNodeChildren = [];
  const walk = (c) => {
    for (let i2 = 0; i2 < c.length; i2++) {
      child = c[i2];
      if (Array.isArray(child)) {
        walk(child);
      } else if (child != null && typeof child !== "boolean") {
        if (simple = typeof nodeName !== "function" && !isComplexType(child)) {
          child = String(child);
        }
        if (simple && lastSimple) {
          vNodeChildren[vNodeChildren.length - 1].$text$ += child;
        } else {
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
var newVNode = (tag, text) => {
  const vnode = {
    $flags$: 0,
    $tag$: tag,
    $text$: text,
    $elm$: null,
    $children$: null
  };
  {
    vnode.$attrs$ = null;
  }
  return vnode;
};
var Host = {};
var isHost = (node) => node && node.$tag$ === Host;
var parsePropertyValue = (propValue, propType) => {
  if (propValue != null && !isComplexType(propValue)) {
    if (propType & 4 /* Boolean */) {
      return propValue === "false" ? false : propValue === "" || !!propValue;
    }
    if (propType & 1 /* String */) {
      return String(propValue);
    }
    return propValue;
  }
  return propValue;
};
var getElement = (ref) => getHostRef(ref).$hostElement$ ;

// src/runtime/event-emitter.ts
var createEvent = (ref, name, flags) => {
  const elm = getElement(ref);
  return {
    emit: (detail) => {
      return emitEvent(elm, name, {
        bubbles: !!(flags & 4 /* Bubbles */),
        composed: !!(flags & 2 /* Composed */),
        cancelable: !!(flags & 1 /* Cancellable */),
        detail
      });
    }
  };
};
var emitEvent = (elm, name, opts) => {
  const ev = plt.ce(name, opts);
  elm.dispatchEvent(ev);
  return ev;
};
var rootAppliedStyles = /* @__PURE__ */ new WeakMap();
var registerStyle = (scopeId2, cssText, allowCS) => {
  let style = styles.get(scopeId2);
  if (supportsConstructableStylesheets && allowCS) {
    style = style || new CSSStyleSheet();
    if (typeof style === "string") {
      style = cssText;
    } else {
      style.replaceSync(cssText);
    }
  } else {
    style = cssText;
  }
  styles.set(scopeId2, style);
};
var addStyle = (styleContainerNode, cmpMeta, mode) => {
  var _a;
  const scopeId2 = getScopeId(cmpMeta);
  const style = styles.get(scopeId2);
  styleContainerNode = styleContainerNode.nodeType === 11 /* DocumentFragment */ ? styleContainerNode : doc;
  if (style) {
    if (typeof style === "string") {
      styleContainerNode = styleContainerNode.head || styleContainerNode;
      let appliedStyles = rootAppliedStyles.get(styleContainerNode);
      let styleElm;
      if (!appliedStyles) {
        rootAppliedStyles.set(styleContainerNode, appliedStyles = /* @__PURE__ */ new Set());
      }
      if (!appliedStyles.has(scopeId2)) {
        {
          styleElm = doc.createElement("style");
          styleElm.innerHTML = style;
          const nonce = (_a = plt.$nonce$) != null ? _a : queryNonceMetaTagContent(doc);
          if (nonce != null) {
            styleElm.setAttribute("nonce", nonce);
          }
          const injectStyle = (
            /**
             * we render a scoped component
             */
            !(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) || /**
             * we are using shadow dom and render the style tag within the shadowRoot
             */
            cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */ && styleContainerNode.nodeName !== "HEAD"
          );
          if (injectStyle) {
            styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector("link"));
          }
        }
        if (cmpMeta.$flags$ & 4 /* hasSlotRelocation */) {
          styleElm.innerHTML += SLOT_FB_CSS;
        }
        if (appliedStyles) {
          appliedStyles.add(scopeId2);
        }
      }
    } else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
      styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
    }
  }
  return scopeId2;
};
var attachStyles = (hostRef) => {
  const cmpMeta = hostRef.$cmpMeta$;
  const elm = hostRef.$hostElement$;
  const flags = cmpMeta.$flags$;
  const endAttachStyles = createTime("attachStyles", cmpMeta.$tagName$);
  const scopeId2 = addStyle(
    elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(),
    cmpMeta);
  if (flags & 10 /* needsScopedEncapsulation */ && flags & 2 /* scopedCssEncapsulation */) {
    elm["s-sc"] = scopeId2;
    elm.classList.add(scopeId2 + "-h");
  }
  endAttachStyles();
};
var getScopeId = (cmp, mode) => "sc-" + (cmp.$tagName$);
var setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
  if (oldValue !== newValue) {
    let isProp = isMemberInElement(elm, memberName);
    memberName.toLowerCase();
    {
      const isComplex = isComplexType(newValue);
      if ((isProp || isComplex && newValue !== null) && !isSvg) {
        try {
          if (!elm.tagName.includes("-")) {
            const n = newValue == null ? "" : newValue;
            if (memberName === "list") {
              isProp = false;
            } else if (oldValue == null || elm[memberName] != n) {
              elm[memberName] = n;
            }
          } else {
            elm[memberName] = newValue;
          }
        } catch (e) {
        }
      }
      if (newValue == null || newValue === false) {
        if (newValue !== false || elm.getAttribute(memberName) === "") {
          {
            elm.removeAttribute(memberName);
          }
        }
      } else if ((!isProp || flags & 4 /* isHost */ || isSvg) && !isComplex) {
        newValue = newValue === true ? "" : newValue;
        {
          elm.setAttribute(memberName, newValue);
        }
      }
    }
  }
};

// src/runtime/vdom/update-element.ts
var updateElement = (oldVnode, newVnode, isSvgMode2) => {
  const elm = newVnode.$elm$.nodeType === 11 /* DocumentFragment */ && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$;
  const oldVnodeAttrs = oldVnode && oldVnode.$attrs$ || EMPTY_OBJ;
  const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
  {
    for (const memberName of sortedAttrNames(Object.keys(oldVnodeAttrs))) {
      if (!(memberName in newVnodeAttrs)) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], void 0, isSvgMode2, newVnode.$flags$);
      }
    }
  }
  for (const memberName of sortedAttrNames(Object.keys(newVnodeAttrs))) {
    setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode2, newVnode.$flags$);
  }
};
function sortedAttrNames(attrNames) {
  return attrNames.includes("ref") ? (
    // we need to sort these to ensure that `'ref'` is the last attr
    [...attrNames.filter((attr) => attr !== "ref"), "ref"]
  ) : (
    // no need to sort, return the original array
    attrNames
  );
}

// src/runtime/vdom/vdom-render.ts
var scopeId;
var hostTagName;
var useNativeShadowDom = false;
var isSvgMode = false;
var createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
  const newVNode2 = newParentVNode.$children$[childIndex];
  let i2 = 0;
  let elm;
  let childNode;
  {
    elm = newVNode2.$elm$ = doc.createElement(
      !useNativeShadowDom && BUILD.slotRelocation && newVNode2.$flags$ & 2 /* isSlotFallback */ ? "slot-fb" : newVNode2.$tag$
    );
    {
      updateElement(null, newVNode2, isSvgMode);
    }
    const rootNode = elm.getRootNode();
    const isElementWithinShadowRoot = !rootNode.querySelector("body");
    if (!isElementWithinShadowRoot && BUILD.scoped && isDef(scopeId) && elm["s-si"] !== scopeId) {
      elm.classList.add(elm["s-si"] = scopeId);
    }
    if (newVNode2.$children$) {
      for (i2 = 0; i2 < newVNode2.$children$.length; ++i2) {
        childNode = createElm(oldParentVNode, newVNode2, i2);
        if (childNode) {
          elm.appendChild(childNode);
        }
      }
    }
  }
  elm["s-hn"] = hostTagName;
  return elm;
};
var addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
  let containerElm = parentElm;
  let childNode;
  if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
    containerElm = containerElm.shadowRoot;
  }
  for (; startIdx <= endIdx; ++startIdx) {
    if (vnodes[startIdx]) {
      childNode = createElm(null, parentVNode, startIdx);
      if (childNode) {
        vnodes[startIdx].$elm$ = childNode;
        insertBefore(containerElm, childNode, before);
      }
    }
  }
};
var removeVnodes = (vnodes, startIdx, endIdx) => {
  for (let index = startIdx; index <= endIdx; ++index) {
    const vnode = vnodes[index];
    if (vnode) {
      const elm = vnode.$elm$;
      if (elm) {
        elm.remove();
      }
    }
  }
};
var updateChildren = (parentElm, oldCh, newVNode2, newCh, isInitialRender = false) => {
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
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newStartVnode, isInitialRender)) {
      patch(oldStartVnode, newStartVnode, isInitialRender);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (isSameVnode(oldEndVnode, newEndVnode, isInitialRender)) {
      patch(oldEndVnode, newEndVnode, isInitialRender);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldStartVnode, newEndVnode, isInitialRender)) {
      patch(oldStartVnode, newEndVnode, isInitialRender);
      insertBefore(parentElm, oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (isSameVnode(oldEndVnode, newStartVnode, isInitialRender)) {
      patch(oldEndVnode, newStartVnode, isInitialRender);
      insertBefore(parentElm, oldEndVnode.$elm$, oldStartVnode.$elm$);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      {
        node = createElm(oldCh && oldCh[newStartIdx], newVNode2, newStartIdx);
        newStartVnode = newCh[++newStartIdx];
      }
      if (node) {
        {
          insertBefore(oldStartVnode.$elm$.parentNode, node, oldStartVnode.$elm$);
        }
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    addVnodes(
      parentElm,
      newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$,
      newVNode2,
      newCh,
      newStartIdx,
      newEndIdx
    );
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
};
var isSameVnode = (leftVNode, rightVNode, isInitialRender = false) => {
  if (leftVNode.$tag$ === rightVNode.$tag$) {
    return true;
  }
  return false;
};
var patch = (oldVNode, newVNode2, isInitialRender = false) => {
  const elm = newVNode2.$elm$ = oldVNode.$elm$;
  const oldChildren = oldVNode.$children$;
  const newChildren = newVNode2.$children$;
  {
    {
      {
        updateElement(oldVNode, newVNode2, isSvgMode);
      }
    }
    if (oldChildren !== null && newChildren !== null) {
      updateChildren(elm, oldChildren, newVNode2, newChildren, isInitialRender);
    } else if (newChildren !== null) {
      addVnodes(elm, null, newVNode2, newChildren, 0, newChildren.length - 1);
    } else if (
      // don't do this on initial render as it can cause non-hydrated content to be removed
      !isInitialRender && BUILD.updatable && oldChildren !== null
    ) {
      removeVnodes(oldChildren, 0, oldChildren.length - 1);
    }
  }
};
var insertBefore = (parent, newNode, reference) => {
  const inserted = parent == null ? void 0 : parent.insertBefore(newNode, reference);
  return inserted;
};
var renderVdom = (hostRef, renderFnResults, isInitialLoad = false) => {
  const hostElm = hostRef.$hostElement$;
  const cmpMeta = hostRef.$cmpMeta$;
  const oldVNode = hostRef.$vnode$ || newVNode(null, null);
  const rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
  hostTagName = hostElm.tagName;
  if (cmpMeta.$attrsToReflect$) {
    rootVnode.$attrs$ = rootVnode.$attrs$ || {};
    cmpMeta.$attrsToReflect$.map(
      ([propName, attribute]) => rootVnode.$attrs$[attribute] = hostElm[propName]
    );
  }
  if (isInitialLoad && rootVnode.$attrs$) {
    for (const key of Object.keys(rootVnode.$attrs$)) {
      if (hostElm.hasAttribute(key) && !["key", "ref", "style", "class"].includes(key)) {
        rootVnode.$attrs$[key] = hostElm[key];
      }
    }
  }
  rootVnode.$tag$ = null;
  rootVnode.$flags$ |= 4 /* isHost */;
  hostRef.$vnode$ = rootVnode;
  rootVnode.$elm$ = oldVNode.$elm$ = hostElm.shadowRoot || hostElm ;
  {
    scopeId = hostElm["s-sc"];
  }
  useNativeShadowDom = (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) !== 0;
  patch(oldVNode, rootVnode, isInitialLoad);
};

// src/runtime/update-component.ts
var attachToAncestor = (hostRef, ancestorComponent) => {
  if (ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent["s-p"]) {
    ancestorComponent["s-p"].push(new Promise((r) => hostRef.$onRenderResolve$ = r));
  }
};
var scheduleUpdate = (hostRef, isInitialLoad) => {
  {
    hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
  }
  if (hostRef.$flags$ & 4 /* isWaitingForChildren */) {
    hostRef.$flags$ |= 512 /* needsRerender */;
    return;
  }
  attachToAncestor(hostRef, hostRef.$ancestorComponent$);
  const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
  return writeTask(dispatch) ;
};
var dispatchHooks = (hostRef, isInitialLoad) => {
  const elm = hostRef.$hostElement$;
  const endSchedule = createTime("scheduleUpdate", hostRef.$cmpMeta$.$tagName$);
  const instance = hostRef.$lazyInstance$ ;
  if (!instance) {
    throw new Error(
      `Can't render component <${elm.tagName.toLowerCase()} /> with invalid Stencil runtime! Make sure this imported component is compiled with a \`externalRuntime: true\` flag. For more information, please refer to https://stenciljs.com/docs/custom-elements#externalruntime`
    );
  }
  let maybePromise;
  if (isInitialLoad) {
    {
      maybePromise = safeCall(instance, "componentWillLoad");
    }
  }
  endSchedule();
  return enqueue(maybePromise, () => updateComponent(hostRef, instance, isInitialLoad));
};
var enqueue = (maybePromise, fn) => isPromisey(maybePromise) ? maybePromise.then(fn).catch((err2) => {
  console.error(err2);
  fn();
}) : fn();
var isPromisey = (maybePromise) => maybePromise instanceof Promise || maybePromise && maybePromise.then && typeof maybePromise.then === "function";
var updateComponent = async (hostRef, instance, isInitialLoad) => {
  var _a;
  const elm = hostRef.$hostElement$;
  const endUpdate = createTime("update", hostRef.$cmpMeta$.$tagName$);
  const rc = elm["s-rc"];
  if (isInitialLoad) {
    attachStyles(hostRef);
  }
  const endRender = createTime("render", hostRef.$cmpMeta$.$tagName$);
  {
    callRender(hostRef, instance, elm, isInitialLoad);
  }
  if (rc) {
    rc.map((cb) => cb());
    elm["s-rc"] = void 0;
  }
  endRender();
  endUpdate();
  {
    const childrenPromises = (_a = elm["s-p"]) != null ? _a : [];
    const postUpdate = () => postUpdateComponent(hostRef);
    if (childrenPromises.length === 0) {
      postUpdate();
    } else {
      Promise.all(childrenPromises).then(postUpdate);
      hostRef.$flags$ |= 4 /* isWaitingForChildren */;
      childrenPromises.length = 0;
    }
  }
};
var callRender = (hostRef, instance, elm, isInitialLoad) => {
  try {
    instance = instance.render() ;
    {
      hostRef.$flags$ &= ~16 /* isQueuedForUpdate */;
    }
    {
      hostRef.$flags$ |= 2 /* hasRendered */;
    }
    {
      {
        {
          renderVdom(hostRef, instance, isInitialLoad);
        }
      }
    }
  } catch (e) {
    consoleError(e, hostRef.$hostElement$);
  }
  return null;
};
var postUpdateComponent = (hostRef) => {
  const tagName = hostRef.$cmpMeta$.$tagName$;
  const elm = hostRef.$hostElement$;
  const endPostUpdate = createTime("postUpdate", tagName);
  const instance = hostRef.$lazyInstance$ ;
  const ancestorComponent = hostRef.$ancestorComponent$;
  if (!(hostRef.$flags$ & 64 /* hasLoadedComponent */)) {
    hostRef.$flags$ |= 64 /* hasLoadedComponent */;
    {
      addHydratedFlag(elm);
    }
    {
      safeCall(instance, "componentDidLoad");
    }
    endPostUpdate();
    {
      hostRef.$onReadyResolve$(elm);
      if (!ancestorComponent) {
        appDidLoad();
      }
    }
  } else {
    endPostUpdate();
  }
  {
    hostRef.$onInstanceResolve$(elm);
  }
  {
    if (hostRef.$onRenderResolve$) {
      hostRef.$onRenderResolve$();
      hostRef.$onRenderResolve$ = void 0;
    }
    if (hostRef.$flags$ & 512 /* needsRerender */) {
      nextTick(() => scheduleUpdate(hostRef, false));
    }
    hostRef.$flags$ &= ~(4 /* isWaitingForChildren */ | 512 /* needsRerender */);
  }
};
var appDidLoad = (who) => {
  {
    addHydratedFlag(doc.documentElement);
  }
  nextTick(() => emitEvent(win, "appload", { detail: { namespace: NAMESPACE } }));
};
var safeCall = (instance, method, arg) => {
  if (instance && instance[method]) {
    try {
      return instance[method](arg);
    } catch (e) {
      consoleError(e);
    }
  }
  return void 0;
};
var addHydratedFlag = (elm) => {
  var _a;
  return elm.classList.add((_a = BUILD.hydratedSelectorName) != null ? _a : "hydrated") ;
};

// src/runtime/set-value.ts
var getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
var setValue = (ref, propName, newVal, cmpMeta) => {
  const hostRef = getHostRef(ref);
  if (!hostRef) {
    throw new Error(
      `Couldn't find host element for "${cmpMeta.$tagName$}" as it is unknown to this Stencil runtime. This usually happens when integrating a 3rd party Stencil component with another Stencil component or application. Please reach out to the maintainers of the 3rd party Stencil component or report this on the Stencil Discord server (https://chat.stenciljs.com) or comment on this similar [GitHub issue](https://github.com/ionic-team/stencil/issues/5457).`
    );
  }
  const elm = hostRef.$hostElement$ ;
  const oldVal = hostRef.$instanceValues$.get(propName);
  const flags = hostRef.$flags$;
  const instance = hostRef.$lazyInstance$ ;
  newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
  const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
  const didValueChange = newVal !== oldVal && !areBothNaN;
  if ((!(flags & 8 /* isConstructingInstance */) || oldVal === void 0) && didValueChange) {
    hostRef.$instanceValues$.set(propName, newVal);
    if (instance) {
      if (cmpMeta.$watchers$ && flags & 128 /* isWatchReady */) {
        const watchMethods = cmpMeta.$watchers$[propName];
        if (watchMethods) {
          watchMethods.map((watchMethodName) => {
            try {
              instance[watchMethodName](newVal, oldVal, propName);
            } catch (e) {
              consoleError(e, elm);
            }
          });
        }
      }
      if ((flags & (2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
        scheduleUpdate(hostRef, false);
      }
    }
  }
};

// src/runtime/proxy-component.ts
var proxyComponent = (Cstr, cmpMeta, flags) => {
  var _a, _b;
  const prototype = Cstr.prototype;
  if (cmpMeta.$members$ || (cmpMeta.$watchers$ || Cstr.watchers)) {
    if (Cstr.watchers && !cmpMeta.$watchers$) {
      cmpMeta.$watchers$ = Cstr.watchers;
    }
    const members = Object.entries((_a = cmpMeta.$members$) != null ? _a : {});
    members.map(([memberName, [memberFlags]]) => {
      if ((memberFlags & 31 /* Prop */ || (flags & 2 /* proxyState */) && memberFlags & 32 /* State */)) {
        Object.defineProperty(prototype, memberName, {
          get() {
            return getValue(this, memberName);
          },
          set(newValue) {
            setValue(this, memberName, newValue, cmpMeta);
          },
          configurable: true,
          enumerable: true
        });
      } else if (flags & 1 /* isElementConstructor */ && memberFlags & 64 /* Method */) {
        Object.defineProperty(prototype, memberName, {
          value(...args) {
            var _a2;
            const ref = getHostRef(this);
            return (_a2 = ref == null ? void 0 : ref.$onInstancePromise$) == null ? void 0 : _a2.then(() => {
              var _a3;
              return (_a3 = ref.$lazyInstance$) == null ? void 0 : _a3[memberName](...args);
            });
          }
        });
      }
    });
    if ((flags & 1 /* isElementConstructor */)) {
      const attrNameToPropName = /* @__PURE__ */ new Map();
      prototype.attributeChangedCallback = function(attrName, oldValue, newValue) {
        plt.jmp(() => {
          var _a2;
          const propName = attrNameToPropName.get(attrName);
          if (this.hasOwnProperty(propName)) {
            newValue = this[propName];
            delete this[propName];
          } else if (prototype.hasOwnProperty(propName) && typeof this[propName] === "number" && // cast type to number to avoid TS compiler issues
          this[propName] == newValue) {
            return;
          } else if (propName == null) {
            const hostRef = getHostRef(this);
            const flags2 = hostRef == null ? void 0 : hostRef.$flags$;
            if (flags2 && !(flags2 & 8 /* isConstructingInstance */) && flags2 & 128 /* isWatchReady */ && newValue !== oldValue) {
              const instance = hostRef.$lazyInstance$ ;
              const entry = (_a2 = cmpMeta.$watchers$) == null ? void 0 : _a2[attrName];
              entry == null ? void 0 : entry.forEach((callbackName) => {
                if (instance[callbackName] != null) {
                  instance[callbackName].call(instance, newValue, oldValue, attrName);
                }
              });
            }
            return;
          }
          this[propName] = newValue === null && typeof this[propName] === "boolean" ? false : newValue;
        });
      };
      Cstr.observedAttributes = Array.from(
        /* @__PURE__ */ new Set([
          ...Object.keys((_b = cmpMeta.$watchers$) != null ? _b : {}),
          ...members.filter(([_, m]) => m[0] & 15 /* HasAttribute */).map(([propName, m]) => {
            var _a2;
            const attrName = m[1] || propName;
            attrNameToPropName.set(attrName, propName);
            if (m[0] & 512 /* ReflectAttr */) {
              (_a2 = cmpMeta.$attrsToReflect$) == null ? void 0 : _a2.push([propName, attrName]);
            }
            return attrName;
          })
        ])
      );
    }
  }
  return Cstr;
};

// src/runtime/initialize-component.ts
var initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId) => {
  let Cstr;
  if ((hostRef.$flags$ & 32 /* hasInitializedComponent */) === 0) {
    hostRef.$flags$ |= 32 /* hasInitializedComponent */;
    const bundleId = cmpMeta.$lazyBundleId$;
    if (bundleId) {
      const CstrImport = loadModule(cmpMeta);
      if (CstrImport && "then" in CstrImport) {
        const endLoad = uniqueTime();
        Cstr = await CstrImport;
        endLoad();
      } else {
        Cstr = CstrImport;
      }
      if (!Cstr) {
        throw new Error(`Constructor for "${cmpMeta.$tagName$}#${hostRef.$modeName$}" was not found`);
      }
      if (!Cstr.isProxied) {
        {
          cmpMeta.$watchers$ = Cstr.watchers;
        }
        proxyComponent(Cstr, cmpMeta, 2 /* proxyState */);
        Cstr.isProxied = true;
      }
      const endNewInstance = createTime("createInstance", cmpMeta.$tagName$);
      {
        hostRef.$flags$ |= 8 /* isConstructingInstance */;
      }
      try {
        new Cstr(hostRef);
      } catch (e) {
        consoleError(e);
      }
      {
        hostRef.$flags$ &= ~8 /* isConstructingInstance */;
      }
      {
        hostRef.$flags$ |= 128 /* isWatchReady */;
      }
      endNewInstance();
      fireConnectedCallback(hostRef.$lazyInstance$);
    } else {
      Cstr = elm.constructor;
      const cmpTag = elm.localName;
      customElements.whenDefined(cmpTag).then(() => hostRef.$flags$ |= 128 /* isWatchReady */);
    }
    if (Cstr && Cstr.style) {
      let style;
      if (typeof Cstr.style === "string") {
        style = Cstr.style;
      }
      const scopeId2 = getScopeId(cmpMeta);
      if (!styles.has(scopeId2)) {
        const endRegisterStyles = createTime("registerStyles", cmpMeta.$tagName$);
        registerStyle(scopeId2, style, !!(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */));
        endRegisterStyles();
      }
    }
  }
  const ancestorComponent = hostRef.$ancestorComponent$;
  const schedule = () => scheduleUpdate(hostRef, true);
  if (ancestorComponent && ancestorComponent["s-rc"]) {
    ancestorComponent["s-rc"].push(schedule);
  } else {
    schedule();
  }
};
var fireConnectedCallback = (instance) => {
  {
    safeCall(instance, "connectedCallback");
  }
};

// src/runtime/connected-callback.ts
var connectedCallback = (elm) => {
  if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
    const hostRef = getHostRef(elm);
    const cmpMeta = hostRef.$cmpMeta$;
    const endConnected = createTime("connectedCallback", cmpMeta.$tagName$);
    if (!(hostRef.$flags$ & 1 /* hasConnected */)) {
      hostRef.$flags$ |= 1 /* hasConnected */;
      {
        let ancestorComponent = elm;
        while (ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host) {
          if (ancestorComponent["s-p"]) {
            attachToAncestor(hostRef, hostRef.$ancestorComponent$ = ancestorComponent);
            break;
          }
        }
      }
      if (cmpMeta.$members$) {
        Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
          if (memberFlags & 31 /* Prop */ && elm.hasOwnProperty(memberName)) {
            const value = elm[memberName];
            delete elm[memberName];
            elm[memberName] = value;
          }
        });
      }
      {
        initializeComponent(elm, hostRef, cmpMeta);
      }
    } else {
      if (hostRef == null ? void 0 : hostRef.$lazyInstance$) {
        fireConnectedCallback(hostRef.$lazyInstance$);
      } else if (hostRef == null ? void 0 : hostRef.$onReadyPromise$) {
        hostRef.$onReadyPromise$.then(() => fireConnectedCallback(hostRef.$lazyInstance$));
      }
    }
    endConnected();
  }
};
var disconnectInstance = (instance) => {
};
var disconnectedCallback = async (elm) => {
  if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
    const hostRef = getHostRef(elm);
    if (hostRef == null ? void 0 : hostRef.$lazyInstance$) ; else if (hostRef == null ? void 0 : hostRef.$onReadyPromise$) {
      hostRef.$onReadyPromise$.then(() => disconnectInstance());
    }
  }
};

// src/runtime/bootstrap-lazy.ts
var bootstrapLazy = (lazyBundles, options = {}) => {
  var _a;
  const endBootstrap = createTime();
  const cmpTags = [];
  const exclude = options.exclude || [];
  const customElements2 = win.customElements;
  const head = doc.head;
  const metaCharset = /* @__PURE__ */ head.querySelector("meta[charset]");
  const dataStyles = /* @__PURE__ */ doc.createElement("style");
  const deferredConnectedCallbacks = [];
  let appLoadFallback;
  let isBootstrapping = true;
  Object.assign(plt, options);
  plt.$resourcesUrl$ = new URL(options.resourcesUrl || "./", doc.baseURI).href;
  let hasSlotRelocation = false;
  lazyBundles.map((lazyBundle) => {
    lazyBundle[1].map((compactMeta) => {
      var _a2;
      const cmpMeta = {
        $flags$: compactMeta[0],
        $tagName$: compactMeta[1],
        $members$: compactMeta[2],
        $listeners$: compactMeta[3]
      };
      if (cmpMeta.$flags$ & 4 /* hasSlotRelocation */) {
        hasSlotRelocation = true;
      }
      {
        cmpMeta.$members$ = compactMeta[2];
      }
      {
        cmpMeta.$attrsToReflect$ = [];
      }
      {
        cmpMeta.$watchers$ = (_a2 = compactMeta[4]) != null ? _a2 : {};
      }
      const tagName = cmpMeta.$tagName$;
      const HostElement = class extends HTMLElement {
        // StencilLazyHost
        constructor(self) {
          super(self);
          this.hasRegisteredEventListeners = false;
          self = this;
          registerHost(self, cmpMeta);
          if (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
            {
              if (!self.shadowRoot) {
                {
                  self.attachShadow({ mode: "open" });
                }
              } else {
                if (self.shadowRoot.mode !== "open") {
                  throw new Error(
                    `Unable to re-use existing shadow root for ${cmpMeta.$tagName$}! Mode is set to ${self.shadowRoot.mode} but Stencil only supports open shadow roots.`
                  );
                }
              }
            }
          }
        }
        connectedCallback() {
          getHostRef(this);
          if (!this.hasRegisteredEventListeners) {
            this.hasRegisteredEventListeners = true;
          }
          if (appLoadFallback) {
            clearTimeout(appLoadFallback);
            appLoadFallback = null;
          }
          if (isBootstrapping) {
            deferredConnectedCallbacks.push(this);
          } else {
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
      if (!exclude.includes(tagName) && !customElements2.get(tagName)) {
        cmpTags.push(tagName);
        customElements2.define(
          tagName,
          proxyComponent(HostElement, cmpMeta, 1 /* isElementConstructor */)
        );
      }
    });
  });
  if (cmpTags.length > 0) {
    if (hasSlotRelocation) {
      dataStyles.textContent += SLOT_FB_CSS;
    }
    {
      dataStyles.textContent += cmpTags.sort() + HYDRATED_CSS;
    }
    if (dataStyles.innerHTML.length) {
      dataStyles.setAttribute("data-styles", "");
      const nonce = (_a = plt.$nonce$) != null ? _a : queryNonceMetaTagContent(doc);
      if (nonce != null) {
        dataStyles.setAttribute("nonce", nonce);
      }
      head.insertBefore(dataStyles, metaCharset ? metaCharset.nextSibling : head.firstChild);
    }
  }
  isBootstrapping = false;
  if (deferredConnectedCallbacks.length) {
    deferredConnectedCallbacks.map((host) => host.connectedCallback());
  } else {
    {
      plt.jmp(() => appLoadFallback = setTimeout(appDidLoad, 30));
    }
  }
  endBootstrap();
};

// src/runtime/nonce.ts
var setNonce = (nonce) => plt.$nonce$ = nonce;

const globalScripts$1 = () => {};

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts$1();
  return bootstrapLazy([["jeep-sqlite",[[1,"jeep-sqlite",{"autoSave":[516,"autosave"],"typeOrm":[516,"typeorm"],"wasmPath":[513,"wasmpath"],"pickText":[513,"picktext"],"saveText":[513,"savetext"],"buttonOptions":[513,"buttonoptions"],"innerAutoSave":[32],"innerTypeOrm":[32],"innerWasmPath":[32],"innerPickText":[32],"innerSaveText":[32],"innerButtonOptions":[32],"echo":[64],"createConnection":[64],"isConnection":[64],"closeConnection":[64],"open":[64],"close":[64],"getVersion":[64],"beginTransaction":[64],"commitTransaction":[64],"rollbackTransaction":[64],"isTransactionActive":[64],"execute":[64],"executeSet":[64],"run":[64],"query":[64],"getTableList":[64],"isDBExists":[64],"isDBOpen":[64],"deleteDatabase":[64],"isStoreOpen":[64],"copyFromAssets":[64],"isTableExists":[64],"createSyncTable":[64],"getSyncDate":[64],"setSyncDate":[64],"isJsonValid":[64],"importFromJson":[64],"exportToJson":[64],"deleteExportedRows":[64],"addUpgradeStatement":[64],"isDatabase":[64],"getDatabaseList":[64],"checkConnectionsConsistency":[64],"saveToStore":[64],"saveToLocalDisk":[64],"getFromLocalDiskToStore":[64],"getFromHTTPRequest":[64]},null,{"autoSave":["parseAutoSave"],"typeOrm":["parseTypeOrm"],"wasmPath":["parseWasmPath"],"pickText":["parsePickText"],"saveText":["parseSaveText"],"buttonOptions":["parseButtonOptions"]}]]]], options);
};

const appGlobalScript = () => {
  ext.linkExternalFunctions();
};
window.addEventListener("message", receiveMessage, false);
Preferences.migrate();
Preferences.removeOld();
//Changes devices back button behaviour to properly navigate the app
changeBackButton();
//We check if a sync is needed when initializing this app
checkSyncOnInit();
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
      try {
        await defineCustomElements(window);
        await customElements.whenDefined('jeep-sqlite');
        await sqlite.initWebStore();
      }
      catch (error) {
        console.error('Database initialization failed:', error);
      }
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
async function checkSyncOnInit() {
  var _a;
  const conf = await ConftokenProvider.config();
  if (((_a = conf === null || conf === void 0 ? void 0 : conf.generalConfig) === null || _a === void 0 ? void 0 : _a.syncOnInitLapse) != null) {
    //We listen to the app state to know when it gets closed
    App.addListener('appStateChange', async ({ isActive }) => {
      let general_context = await GeneralContextProvider.getGeneralContext();
      if (isActive) {
        //We change sync_onInit_info to true so the app knows that if it gets reloaded the sync musn't be executed
        general_context.sync_onInit_info.needs_sync = false;
        GeneralContextProvider.setGeneralContext(general_context);
        //We calculate the time difference between last synchronization, so if it exceeds the limit we sync
        const last_sync_date = general_context.sync_onInit_info.last_sync_date ? general_context.sync_onInit_info.last_sync_date : 0;
        const elapsed_time = new Date().getTime() - last_sync_date;
        if (elapsed_time >= (conf.generalConfig.syncOnInitLapse * 60 * 1000)) {
          flxSync.syncData();
        }
      }
      else {
        //We change sync_onInit_info to false so the app knows that the next time the checkSyncOnInit function runs, it's cause the app was trully initializated
        general_context.sync_onInit_info.needs_sync = true;
        GeneralContextProvider.setGeneralContext(general_context);
      }
    });
    //We calculate the time difference between last synchronization, so if it exceeds the limit and the app comes from being closed we sync
    let general_context = await GeneralContextProvider.getGeneralContext();
    const last_sync_date = general_context.sync_onInit_info.last_sync_date ? general_context.sync_onInit_info.last_sync_date : 0;
    const elapsed_time = new Date().getTime() - last_sync_date;
    if (general_context.sync_onInit_info.needs_sync !== false && elapsed_time >= (conf.generalConfig.syncOnInitLapse * 60 * 1000)) {
      general_context.sync_onInit_info.needs_sync = false;
      GeneralContextProvider.setGeneralContext(general_context);
      flxSync.syncData();
    }
  }
}

const globalScripts = () => {
  appGlobalScript();
  initialize();
};

export { getElement as a, createEvent as c, globalScripts as g, registerInstance as r };
