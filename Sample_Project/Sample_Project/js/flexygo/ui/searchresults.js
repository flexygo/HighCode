var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        function search(filter, placeHolder, objectname) {
            let listModuleName = 'sysmod-list-generic';
            let containerTemplate = '<div class="cntHeader"><span class="cntIcon"></span><span class="cntTitle"></span><span class="cntButtons"></span></div><div class="cntBodyHeader"></div><div class="cntBody"></div><div class="cntBodyFooter"></div>';
            placeHolder.find('.resultMod').remove();
            if (filter && filter != '') {
                let params = {
                    FindString: filter,
                    EnableCount: false,
                    ObjectName: objectname
                };
                flexygo.ajax.post('~/api/Sys', 'searchObjects', params, (res) => {
                    if (Object.keys(res).length > 0) {
                        let response = flexygo.utils.sortObject(res, 'Order');
                        $.each(response, (key, item) => {
                            let container = $('<flx-module class="resultMod"/>').html(containerTemplate).attr('modulename', listModuleName).attr('type', 'flx-list').addClass('default');
                            placeHolder.append(container);
                            let module = $('<flx-list />').attr('ObjectName', item.CollectionName).attr('ObjectWhere', item.Filter).attr('modulename', listModuleName);
                            container.find('.cntBody').append(module);
                            let ctrl = container[0];
                            ctrl.moduleName = listModuleName;
                            ctrl.moduleTitle = item.Descrip;
                            ctrl.icon = item.IconClass;
                            ctrl.canCollapse = true;
                            ctrl.canEnlarge = true;
                            ctrl.canRefresh = true;
                            //ctrl.canClose = false;
                            ctrl.canConfig = false;
                            ctrl.init();
                        });
                    }
                    else {
                        flexygo.msg.warning(flexygo.localization.translate('flxsearch.pleaseobject'));
                    }
                });
            }
        }
        ui.search = search;
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=searchresults.js.map