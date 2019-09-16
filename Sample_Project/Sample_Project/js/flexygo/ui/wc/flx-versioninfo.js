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
            * Library for the FlxVersionInfoElement web component.
            *
            * @class FlxVersionInfoElement
            * @constructor
            * @return {FlxVersionInfoElement}
            */
            class FlxVersionInfoElement extends HTMLElement {
                constructor() {
                    super();
                    this.msToRestart = 30000;
                    this.lastSuccessResponse = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    let mode = element.attr("mode");
                    this.mode = mode;
                    this.init();
                }
                /**
                * Init the webcomponent.
                * @method init
                */
                init() {
                    let template;
                    this.settings = {
                        CurrentVersion: "",
                        LastVersion: "",
                        IsUpdated: true,
                        ErrorMessage: ""
                    };
                    let force;
                    if (this.mode === 'icon') {
                        template = '<i class="fa fa-refresh icon-spin" />';
                        force = false;
                    }
                    else {
                        template = '';
                        force = true;
                    }
                    $(this).append(template);
                    this.responseShown = false;
                    this.refresh(force);
                }
                /**
                * Refresh the webcomponent.
                * @method refresh
                */
                refresh(force = false) {
                    if (flexygo.debug && flexygo.debug.isDevelopMode && flexygo.debug.isDevelopMode()) {
                        let params = {
                            Force: force
                        };
                        $(this).show();
                        flexygo.ajax.post('~/api/Sys', 'getVersion', params, (response) => {
                            if (this.mode === 'icon' && response.ErrorMessage != '') {
                                flexygo.msg.info(response.ErrorMessage);
                            }
                            else {
                                this.settings = response;
                                this.render();
                            }
                        });
                    }
                    else {
                        $(this).hide();
                    }
                }
                /**
               * Renders the webcomponent.
               * @method render
                */
                render() {
                    if (this.mode === 'icon') {
                        this.renderIcon();
                    }
                    else {
                        this.renderPage();
                    }
                }
                renderIcon() {
                    let me = $(this);
                    let ico = me.find("i");
                    let menu = me.closest("li");
                    let info;
                    menu.off("click");
                    if (this.settings.IsUpdated) {
                        ico.removeClass("fa-info-circle txt-warning txt-danger fa-refresh icon-spin").addClass("fa-check-circle txt-outstanding");
                        info = flexygo.utils.parser.compile(this.settings, flexygo.localization.translate('flxversioninfo.currentversion')) + flexygo.localization.translate('flxversioninfo.updatedversion');
                    }
                    else {
                        if (this.settings.ErrorMessage && this.settings.ErrorMessage.length > 0) {
                            ico.removeClass("fa-check-circle txt-outstanding txt-warning fa-refresh icon-spin").addClass("fa-info-circle txt-danger");
                            info = this.settings.ErrorMessage;
                        }
                        else {
                            ico.removeClass("fa-check-circle txt-outstanding txt-danger fa-refresh icon-spin").addClass("fa-info-circle txt-warning");
                            info = flexygo.utils.parser.compile(this.settings, flexygo.localization.translate('flxversioninfo.currentversion')) + flexygo.utils.parser.compile(this.settings, flexygo.localization.translate('flxversioninfo.newupdate'));
                        }
                    }
                    menu.on("click", () => {
                        flexygo.nav.openPageName('syspage-generic-versioninfo', '', '', '', 'current', false, $(this), false);
                        this.refresh(true);
                    });
                    menu.removeAttr("title").attr("title", info);
                }
                renderPage() {
                    let me = $(this);
                    me.html(flexygo.utils.loadingMsg());
                    flexygo.ajax.post('~/api/Sys', 'getInstalledVersions', null, (response) => {
                        me.html("");
                        this.settings = response.current;
                        this.versions = response.versions;
                        this.changes = response.pendingReviewChanges;
                        let pendingReview;
                        if (this.changes && this.changes.length > 0) {
                            pendingReview = true;
                        }
                        $.each(this.versions, (i, v) => {
                            if (v.IsCurrent) {
                                let info = "";
                                info = flexygo.utils.parser.compile(this.settings, flexygo.localization.translate('flxversioninfo.currentversion'));
                                let updated = '';
                                if (this.settings.IsUpdated) {
                                    updated += '<span class="l-size">' + flexygo.localization.translate('flxversioninfo.updatedversion') + '</span>';
                                }
                                if (pendingReview) {
                                    updated += '<spanclass="l-size">' + flexygo.localization.translate('flxversioninfo.pendingchanges') + '</span>';
                                }
                                me.append('<div class="box-info">');
                                let box = me.find('.box-info').first();
                                let btnInfo = box.append('<button name="btn-info" class="btn bg-info"><i class="flx-icon icon-information-3"></i></button>').find('[name="btn-info"]');
                                btnInfo.attr("title", flexygo.localization.translate('flxversioninfo.info'));
                                btnInfo.off("click").on("click", () => {
                                    this.infoVersion(v);
                                });
                                let btnTest = box.append('<button name="btn-test" class="btn bg-info"><i class="flx-icon icon-task-manager-2" > </i></button>').find('[name="btn-test"]');
                                btnTest.attr("title", flexygo.localization.translate('flxversioninfo.test'));
                                btnTest.off("click").on("click", () => {
                                    flexygo.debug.test.show();
                                });
                                if (pendingReview) {
                                    let btnChanges = box.append('<button name="btn-changes" class="btn bg-info"><i class="flx-icon icon-audit"></i></button>').find('[name="btn-changes"]');
                                    btnChanges.attr("title", flexygo.localization.translate('flxversioninfo.reviewchanges'));
                                    btnChanges.off("click").on("click", () => {
                                        this.showChanges(box);
                                    });
                                }
                                box.append('<span class="l-size">' + info + '</span>' + updated);
                                return false;
                            }
                        });
                        $.each(this.versions, (i, v) => {
                            if (v.IsUpdate) {
                                let info = flexygo.utils.parser.compile(this.settings, flexygo.localization.translate('flxversioninfo.lastversion'));
                                me.append('<div class="box-success"></div>');
                                let box = me.find(".box-success").first();
                                box.append('<button name="btn-info" class="btn bg-success"><i class="flx-icon icon-information-3"></i></button><button name="btn-update" class="btn bg-success"><i class="flx-icon icon-download"></i></button><span class="l-size">' + info + '</span>');
                                let btnUpdate = box.find('[name="btn-update"]');
                                btnUpdate.attr("title", flexygo.localization.translate('flxversioninfo.update'));
                                btnUpdate.off("click").on("click", () => {
                                    flexygo.msg.confirm(flexygo.localization.translate('flxversioninfo.confirmupdate'), (result) => {
                                        if (result) {
                                            this.updateNewVersion(false);
                                        }
                                    });
                                });
                                let btnInfo = box.find('[name="btn-info"]');
                                btnInfo.attr("title", flexygo.localization.translate('flxversioninfo.info'));
                                btnInfo.off("click").on("click", () => {
                                    this.infoVersion(v);
                                });
                                return false;
                            }
                        });
                        $.each(this.versions, (i, v) => {
                            if (v.IsOld) {
                                let info = null;
                                let box = null;
                                info = flexygo.utils.parser.compile(v, flexygo.localization.translate('flxversioninfo.oldversion'));
                                me.append('<div class="box-primary"></div>');
                                box = me.find(".box-primary").last();
                                box.append('<button name="btn-switch" class="btn bg-primary"><i class="flx-icon icon-update"></i></button><button name="btn-delete" class="btn bg-primary"><i class="flx-icon icon-delete"></i></button><span class="l-size">' + info + '</span>');
                                let btnDelete = box.find('[name="btn-delete"]');
                                btnDelete.attr("title", flexygo.localization.translate('flxversioninfo.delete'));
                                btnDelete.off("click").on("click", v, (e) => {
                                    let ver = e.data;
                                    flexygo.msg.confirm(flexygo.localization.translate('flxversioninfo.confirmdelete'), (result) => {
                                        if (result) {
                                            this.deleteVersion(ver);
                                        }
                                    });
                                });
                                let btnSwitch = box.find('[name="btn-switch"]');
                                btnSwitch.attr("title", flexygo.localization.translate('flxversioninfo.switch'));
                                btnSwitch.off("click").on("click", v, (e) => {
                                    let ver = e.data;
                                    flexygo.msg.confirm(flexygo.localization.translate('flxversioninfo.confirmswitch'), (result) => {
                                        if (result) {
                                            this.setActiveVersion(ver);
                                        }
                                    });
                                });
                            }
                            else if (v.IsNew) {
                                let info = null;
                                let box = null;
                                info = flexygo.utils.parser.compile(v, flexygo.localization.translate('flxversioninfo.newversion'));
                                me.append('<div class="box-warning"></div>');
                                box = me.find(".box-warning").last();
                                box.append('<button name="btn-switch" class="btn bg-warning"><i class="flx-icon icon-update"></i></button><button name="btn-delete" class="btn bg-warning"><i class="flx-icon icon-delete"></i></button><span class="l-size">' + info + '</span>');
                                let btnDelete = box.find('[name="btn-delete"]');
                                btnDelete.attr("title", flexygo.localization.translate('flxversioninfo.delete'));
                                btnDelete.off("click").on("click", v, (e) => {
                                    let ver = e.data;
                                    flexygo.msg.confirm(flexygo.localization.translate('flxversioninfo.confirmdelete'), (result) => {
                                        if (result) {
                                            this.deleteVersion(ver);
                                        }
                                    });
                                });
                                let btnSwitch = box.find('[name="btn-switch"]');
                                btnSwitch.attr("title", flexygo.localization.translate('flxversioninfo.switch'));
                                btnSwitch.off("click").on("click", v, (e) => {
                                    let ver = e.data;
                                    flexygo.msg.confirm(flexygo.localization.translate('flxversioninfo.confirmswitch'), (result) => {
                                        if (result) {
                                            this.setActiveVersion(ver);
                                        }
                                    });
                                });
                            }
                        });
                    });
                }
                infoVersion(v) {
                    let content = '';
                    if (v.IsUpdate) {
                        content = '<div><strong>' + flexygo.localization.translate('flxversioninfo.releasenotes') + '</strong></div><span class="size-s">' + v.ReleaseNotes.replace(/(?:\r\n|\r|\n)/g, '<br />') + '</span></div>';
                    }
                    else {
                        content = '<div><strong>' + flexygo.localization.translate('flxversioninfo.infoversion') + '</strong><span>' + v.VersionNumber + '</span></div>';
                        content += '<div><strong>' + flexygo.localization.translate('flxversioninfo.infopath') + '</strong><span>' + v.VirtualPath + '</span></div>';
                        content += '<div><strong>' + flexygo.localization.translate('flxversioninfo.infodatabase') + '</strong><span>' + v.DatabaseName + '</span></div>';
                    }
                    Lobibox.alert('info', { title: flexygo.localization.translate('flxversioninfo.infotitle'), msg: content, iconClass: 'fa fa-info-circle' });
                }
                showChanges(parent) {
                    let div = parent.find('div.versioninfo-changebox');
                    if (div) {
                        div.remove();
                    }
                    let ov = flexygo.localization.translate('flxversioninfo.oldversionvalue');
                    let cv = flexygo.localization.translate('flxversioninfo.customvalue');
                    let nv = flexygo.localization.translate('flxversioninfo.newversionvalue');
                    let mv = flexygo.localization.translate('flxversioninfo.manualvalue');
                    let msg_apply = flexygo.localization.translate('flxversioninfo.applychanges');
                    let msg_nochanges = flexygo.localization.translate('flxversioninfo.nochanges');
                    let msg_changecount = flexygo.localization.translate('flxversioninfo.changecount');
                    let itemtemplate = '<div class="changebox" data-difid="{{DifId}}">' +
                        '<div class="row changebox-title">' +
                        '<div class="col-3"><i class="fa fa-table icon-margin-right"></i><strong>{{TableName}}</strong></div>' +
                        '<div class="col-3"><i class="fa fa-columns icon-margin-right"></i><strong>{{FieldName}}</strong></div>' +
                        '<div class="col-6"><i class="fa fa-arrow-right icon-margin-right"></i><strong>{{RowKey}}</strong></div>' +
                        '</div>' +
                        '<div class="row changebox-values">' +
                        //'<div class="col-2"><div>' + ov + '</div><div><flx-text disabled  iconclass="flx-icon icon-minus" value="{{OldValue}}"></flx-text></div></div>' +
                        //'<div class="col-3"><div><input type="radio" name="select-{{DifId}}" value="1">' + cv + '</div><div><flx-text disabled iconclass="flx-icon icon-man" value="{{UserValue}}"></flx-text></div></div>' +
                        //'<div class="col-3"><div><input type="radio" name="select-{{DifId}}" value="0">' + nv + '</div><div><flx-text disabled iconclass="flx-icon icon-plus" value="{{NewValue}}"></flx-text></div></div>' +
                        //'<div class="col-4"><div><input type="radio" name="select-{{DifId}}" value="2">' + mv + '</div><div><flx-text iconclass="flx-icon icon-choose-hand" name="manualvalue-{{DifId}}" placeholder= "' + mv + '"/></flx-text></div></div>' +
                        '<div class="row"><div>' + ov + '</div><div><flx-text   iconclass="flx-icon icon-minus" value="{{OldValue|html}}"></flx-text></div></div>' +
                        '<div class="row"><div><input type="radio" name="select-{{DifId}}" value="1">' + cv + '</div><div><flx-text   iconclass="flx-icon icon-minus" value="{{UserValue|html}}"></flx-text></div></div>' +
                        '<div class="row"><div><input type="radio" name="select-{{DifId}}" value="0">' + nv + '</div><div><flx-text  iconclass="flx-icon icon-plus" value="{{NewValue|html}}"></flx-text></div></div>' +
                        '<div class="row"><div><input type="radio" name="select-{{DifId}}" value="2">' + mv + '</div><div><flx-text iconclass="flx-icon icon-choose-hand" name="manualvalue-{{DifId}}" placeholder= "' + mv + '"/></flx-text></div></div>' + '</div>' +
                        '</div>';
                    let items = '';
                    $.each(this.changes, (i, v) => {
                        items += flexygo.utils.parser.compile(v, itemtemplate);
                    });
                    div = parent.append('<div class="versioninfo-changebox"></div>').children('div');
                    div.append(items);
                    let btnApply = div.append('<button name="btn-apply" class="btn bg-notify">' + msg_apply + '</button>').find('[name="btn-apply"]');
                    btnApply.off("click").on("click", (e) => {
                        let count = 0;
                        $.each(this.changes, (i, v) => {
                            let select = parent.find('input[name^="select-' + v.DifId + '"]:checked');
                            if (select && select.length > 0) {
                                count++;
                                v.ActionId = select.val();
                                v.Revised = true;
                                if (v.ActionId == 2) {
                                    let text = parent.find('flx-text[name^="manualvalue-' + v.DifId + '"]');
                                    if (text && text.val()) {
                                        v.ManualValue = text.val();
                                    }
                                }
                            }
                        });
                        if (count === 0) {
                            Lobibox.alert('info', { title: flexygo.localization.translate('flxversioninfo.infotitle'), msg: msg_nochanges, iconClass: 'fa fa-info-circle' });
                        }
                        else {
                            let obj = {
                                count: count
                            };
                            msg_changecount = flexygo.utils.parser.compile(obj, msg_changecount);
                            flexygo.msg.confirm(msg_changecount, (result) => {
                                if (result) {
                                    let params = {
                                        version: this.settings.CurrentVersion,
                                        changes: this.changes
                                    };
                                    flexygo.ajax.post('~/api/Sys', 'updateChanges', params, (response) => {
                                        this.refresh();
                                        flexygo.msg.success(flexygo.localization.translate('flxversioninfo.applychangessuccesful'), null, null);
                                    });
                                }
                            });
                        }
                    });
                }
                deleteVersion(v) {
                    this.progressBar = Lobibox.progress({
                        title: flexygo.localization.translate('flxversioninfo.deleting'),
                        closeOnEsc: false,
                        closeButton: false,
                    });
                    flexygo.ajax.post('~/api/Sys', 'deleteVersion', { version: v.VersionNumber }, (response) => {
                        this.progressBar.destroy();
                        this.refresh();
                        flexygo.msg.success(flexygo.localization.translate('flxversioninfo.deletesuccessful'), null, null);
                    });
                }
                setActiveVersion(v, force = false) {
                    let params = {
                        version: v.VersionNumber,
                        force: force
                    };
                    this.updateMode = "partial";
                    this.currentSetActiveVersion = v;
                    flexygo.ajax.post('~/api/Sys', 'setActiveVersion', params, (response) => {
                        if (response) {
                            this.progressBar = Lobibox.progress({
                                title: flexygo.localization.translate('flxversioninfo.updating'),
                                label: flexygo.localization.translate('flxversioninfo.initupdate'),
                                closeOnEsc: false,
                                closeButton: false,
                                onShow: () => {
                                    this.responseShown = false;
                                    this.updateProgress();
                                }
                            });
                        }
                    });
                }
                onSuccessUpdateProgress(response, inter) {
                    let i = response.Progress;
                    let msg;
                    let title;
                    let label = this.progressBar.$el.find('label');
                    this.lastSuccessResponse = response;
                    label.css("overflow-x", "hidden");
                    switch (response.CurrentState) {
                        case flexygo.api.sys.eAutoUpdaterState.eStateWaitingForResponse:
                            if (!this.responseShown) {
                                this.responseShown = true;
                                let status = response.StatusText.replace(/\n/g, "<br />");
                                let msg = '<strong>' + flexygo.localization.translate('flxversioninfo.confirmwarninglabel') + '</strong><br />' + status;
                                Lobibox.alert('warning', {
                                    msg: msg,
                                    title: flexygo.localization.translate('flxversioninfo.confirmwarningtitle'),
                                    iconClass: 'fa fa-warning',
                                    buttons: ['ok', 'cancel'],
                                    callback: ($this, type, ev) => {
                                        if (type === 'ok') {
                                            if (this.updateMode === "full") {
                                                this.updateNewVersion(true);
                                            }
                                            else {
                                                this.setActiveVersion(this.currentSetActiveVersion, true);
                                            }
                                        }
                                    }
                                });
                            }
                            i = 100;
                            break;
                        case flexygo.api.sys.eAutoUpdaterState.eStateFinishedError:
                            if (!this.responseShown) {
                                this.responseShown = true;
                                let error = response.ErrorMessage.replace(/\n/g, "<br />");
                                Lobibox.alert('error', {
                                    msg: error,
                                    iconSource: 'fontAwesome',
                                    width: 600,
                                    title: 'Error',
                                });
                            }
                            i = 100;
                            break;
                        case flexygo.api.sys.eAutoUpdaterState.eStateFinishedOk:
                            if (!this.responseShown) {
                                this.showUpdateSuccessful();
                                this.responseShown = true;
                            }
                            i = 100;
                            break;
                        //case flexygo.api.sys.eAutoUpdaterState.eStateIdle, flexygo.api.sys.eAutoUpdaterState.eStateServiceRestarted:
                        //   break;
                        case flexygo.api.sys.eAutoUpdaterState.eStateWorking:
                            switch (response.CurrentStatus) {
                                case flexygo.api.sys.eAutoUpdaterStatus.eStatusUpdatingService:
                                    title = flexygo.localization.translate('flxversioninfo.estatusupdatingservice');
                                    break;
                                case flexygo.api.sys.eAutoUpdaterStatus.eStatusCheckingPackages:
                                    title = flexygo.localization.translate('flxversioninfo.estatuscheckingpackages');
                                    break;
                                case flexygo.api.sys.eAutoUpdaterStatus.eStatusDownloadingVersion:
                                    title = flexygo.localization.translate('flxversioninfo.estatusdownloadingversion');
                                    break;
                                case flexygo.api.sys.eAutoUpdaterStatus.eStatusFinished:
                                    title = flexygo.localization.translate('flxversioninfo.estatusfinished');
                                    break;
                                case flexygo.api.sys.eAutoUpdaterStatus.eStatusUpdateDatabase:
                                    title = flexygo.localization.translate('flxversioninfo.estatusupdatedatabase');
                                    break;
                                case flexygo.api.sys.eAutoUpdaterStatus.eStatusUpdateIIS:
                                    title = flexygo.localization.translate('flxversioninfo.estatusupdateiis');
                                    break;
                            }
                    }
                    if (this.progressBar) {
                        if (response.StatusText && response.StatusText.length > 0) {
                            label.html(response.StatusText);
                        }
                        this.progressBar.setTitle(title);
                        this.progressBar.setProgress(response.Progress);
                    }
                    if (i >= 100) {
                        clearInterval(inter);
                        this.progressBar.destroy();
                        if (response.CurrentState === flexygo.api.sys.eAutoUpdaterState.eStateFinishedOk) {
                            window.location.reload(true);
                        }
                    }
                }
                onFailureUpdateProgress(error, inter) {
                    console.log("flxversioninfo.onFailureUpdateProgress", error);
                    if (error && error.status && (error.status === 500 || error.status === 404 || error.status === 503)) {
                        //Catch Error 404/500/503 due to updating IIS
                        let last = this.lastSuccessResponse;
                        if (last && last.CurrentState === flexygo.api.sys.eAutoUpdaterState.eStateWorking && last.CurrentStatus === flexygo.api.sys.eAutoUpdaterStatus.eStatusUpdateIIS) {
                            if (this.progressBar) {
                                let p = this.progressBar.getProgress();
                                this.progressBar.setProgress(p + 0.5);
                            }
                        }
                    }
                    else {
                        clearInterval(inter);
                        this.progressBar.destroy();
                        flexygo.exceptions.httpShow(error);
                    }
                }
                showUpdateSuccessful() {
                    Lobibox.alert('success', {
                        msg: flexygo.localization.translate('flxversioninfo.applicationwillreset'),
                        iconSource: 'fontAwesome',
                        title: flexygo.localization.translate('flxversioninfo.updatesuccessful'),
                        closeOnEsc: false,
                        closeButton: false,
                        closable: false,
                        delay: this.msToRestart,
                        buttons: null
                    });
                }
                updateProgress() {
                    this.lastSuccessResponse = null;
                    let inter = setInterval(() => {
                        flexygo.ajax.post('~/api/Sys', 'checkUpdateProgress', null, (response) => {
                            this.onSuccessUpdateProgress(response, inter);
                        }, (error) => {
                            this.onFailureUpdateProgress(error, inter);
                        });
                    }, 1000);
                }
                updateNewVersion(force) {
                    let params = {
                        Version: this.settings.LastVersion,
                        Force: force
                    };
                    this.updateMode = "full";
                    this.currentSetActiveVersion = null;
                    flexygo.ajax.post('~/api/Sys', 'updateNewVersion', params, (response) => {
                        if (response) {
                            this.progressBar = Lobibox.progress({
                                title: flexygo.localization.translate('flxversioninfo.updating'),
                                label: flexygo.localization.translate('flxversioninfo.initupdate'),
                                closeOnEsc: false,
                                closeButton: false,
                                onShow: () => {
                                    this.responseShown = false;
                                    this.updateProgress();
                                }
                            });
                        }
                    });
                }
            }
            wc.FlxVersionInfoElement = FlxVersionInfoElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-versioninfo", flexygo.ui.wc.FlxVersionInfoElement);
//# sourceMappingURL=flx-versioninfo.js.map