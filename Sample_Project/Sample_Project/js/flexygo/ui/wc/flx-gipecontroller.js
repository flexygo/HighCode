var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            class FlxGipeControllerElement extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                }
                /**
                * Array of observed attributes. REQUIRED
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return [];
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    this.connected = true;
                    flexygo.events.on(this, "gipe", "all", this.onEventReceived);
                    this.init();
                }
                /**
                * Fires when element is dettached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    flexygo.events.off(this, "gipe", "all", this.onEventReceived);
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let needInit = false;
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    this.render();
                }
                /**
                * Refresh the webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    this.render();
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    $(this).html('<i title="Workflow in progress..." class="fa fa-refresh icon-spin hide" />');
                }
                /**
                * Fires when a GIPE class event is receibed
                * @method onEventReceibed
                */
                onEventReceived(e) {
                    switch (e.type) {
                        case "askparams":
                            this.askParams(e);
                            break;
                        case "askentity":
                            this.askEntity(e);
                            break;
                        case "askyesno":
                            this.askYesNo(e);
                            break;
                        case "jsreturn":
                            this.jsReturn(e);
                            break;
                        case "start":
                            $('flx-gipecontroller i').removeClass('hide').addClass('zoomInOut');
                            break;
                        case "finish":
                            $('flx-gipecontroller i').addClass('hide').removeClass('zoomInOut');
                            if (JSON.parse(e.sender).refresh) {
                                $('flx-module').each((i, itm) => { if (itm.refresh) {
                                    itm.refresh();
                                } });
                            }
                            break;
                        default:
                            break;
                    }
                }
                /**
             * Shows the process params page an return its result
             * @method askParams
             */
                jsReturn(paramsEvent) {
                    let ret = JSON.parse(paramsEvent.sender);
                    if (ret && ret.processHelper && ret.processHelper.JSCode) {
                        flexygo.utils.execDynamicCode.call(this, ret.processHelper.JSCode);
                    }
                }
                /**
                * Shows the process params page an return its result
                * @method askParams
                */
                askParams(paramsEvent) {
                    var processparampage = 'syspage-processparams-default';
                    let data = JSON.parse(paramsEvent.sender);
                    //Temporal hack
                    if (data.targetId.toLowerCase() === 'current') {
                        data.targetId = 'popup800x600';
                    }
                    var histObj = {
                        navigateFun: 'openProcessParams',
                        targetid: data.targetId,
                        objectname: data.objectName,
                        objectwhere: data.objectWhere,
                        defaults: null,
                        processname: data.processName
                    };
                    let defaults = null; ///OJO!!!!!!!
                    var pageContainer = flexygo.targets.createContainer(histObj, false, null);
                    //if (triggerElement && !triggerElement.closest('.pageContainer').is(pageContainer)) {
                    //    pageContainer.data('opener', triggerElement.closest('.pageContainer'));
                    //}
                    flexygo.ajax.post('~/api/Page', 'GetPageByName', { "PageName": processparampage }, (ret) => {
                        ret.pageHistory = histObj;
                        flexygo.nav.openPageReturn(ret, data.objectName, data.objectWhere, defaults, pageContainer, null, data.processName);
                        let selected = false;
                        flexygo.events.on(this, "module", "loaded", (loadedEvent) => {
                            let module = loadedEvent.sender;
                            if (module.moduleName.toLowerCase() === 'sysmod-edit-processparams') {
                                flexygo.events.off(this, "module", "loaded");
                                let btn = pageContainer.find("button[data-type='runprocess']");
                                if (btn.length < 1) {
                                    flexygo.msg.error(flexygo.localization.translate('flxgipe.errornorunprocessbuttonfound'), null, flexygo.localization.translate('flxgipe.dialogerrortitle'));
                                    return;
                                }
                                btn.removeAttr("onclick");
                                btn.off("click").on("click", (e) => {
                                    let module = pageContainer.find('flx-module');
                                    if (module.find('form').valid()) {
                                        let props = module.find('[property]');
                                        let params = new Array();
                                        if (props.length > 0) {
                                            for (var i = 0; i < props.length; i++) {
                                                let prop = $(props[i])[0];
                                                let edit = module.find('flx-edit:first')[0];
                                                if (!edit.data[prop.property].DetachedFromDB) {
                                                    params.push({ 'key': prop.property, 'value': prop.getValue() });
                                                }
                                            }
                                            var postParams = {
                                                execId: paramsEvent.masterIdentity,
                                                stepId: paramsEvent.detailIdentity,
                                                ProcessParams: params
                                            };
                                            flexygo.ajax.post('~/api/Gipe', 'setWorkflowStepParams', postParams, (ret) => {
                                                module.closest(".ui-dialog").remove();
                                            });
                                        }
                                        else {
                                            flexygo.msg.error(flexygo.localization.translate('flxmodule.noparams'));
                                        }
                                    }
                                    else {
                                        flexygo.msg.warning(flexygo.localization.translate('flxmodule.requiredreport'));
                                    }
                                });
                            }
                        });
                        flexygo.events.on(this, "dialog", "closed", (loadedEvent) => {
                            flexygo.events.off(this, "dialog", "closed");
                            if (!selected) {
                                var postParams = {
                                    execId: paramsEvent.masterIdentity,
                                    stepId: paramsEvent.detailIdentity
                                };
                                flexygo.ajax.post('~/api/Gipe', 'abortExecution', postParams, (ret) => {
                                });
                            }
                        });
                    });
                }
                /**
                * Shows the object search default page to ask for a entity
                * @method askParams
                */
                askEntity(paramsEvent) {
                    let data = JSON.parse(paramsEvent.sender);
                    let selected = false;
                    flexygo.events.on(this, "entity", "selected", (e) => {
                        flexygo.events.off(this, "entity", "selected");
                        var postEntity = {
                            execId: paramsEvent.masterIdentity,
                            stepId: paramsEvent.detailIdentity,
                            objectName: e.masterIdentity,
                            objectWhere: e.detailIdentity
                        };
                        $(document).find('flx-search[objectname="' + data.objectName + '"]').closest(".ui-dialog").remove();
                        flexygo.ajax.post('~/api/Gipe', 'setWorkflowStepEntity', postEntity, (ret) => {
                        });
                    });
                    flexygo.nav.openPage('search', data.objectName, null, null, 'popup800x600');
                    flexygo.events.on(this, "dialog", "closed", (loadedEvent) => {
                        flexygo.events.off(this, "entity", "selected");
                        flexygo.events.off(this, "dialog", "closed");
                        if (!selected) {
                            var postParams = {
                                execId: paramsEvent.masterIdentity,
                                stepId: paramsEvent.detailIdentity
                            };
                            flexygo.ajax.post('~/api/Gipe', 'abortExecution', postParams, (ret) => {
                            });
                        }
                    });
                }
                /**
               * Shows a dialog of yes/no response
               * @method askYesNo
               */
                askYesNo(paramsEvent) {
                    let data = JSON.parse(paramsEvent.sender);
                    flexygo.msg.question(data.title, data.message, (response) => {
                        var postResponse = {
                            execId: paramsEvent.masterIdentity,
                            stepId: paramsEvent.detailIdentity,
                            userResponse: response
                        };
                        flexygo.ajax.post('~/api/Gipe', 'setWorkflowStepResponse', postResponse, (ret) => {
                        });
                    });
                }
            }
            wc.FlxGipeControllerElement = FlxGipeControllerElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-gipecontroller", flexygo.ui.wc.FlxGipeControllerElement);
//# sourceMappingURL=flx-gipecontroller.js.map