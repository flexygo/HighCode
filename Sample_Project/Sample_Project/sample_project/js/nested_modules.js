/**
 * @namespace sample_project.samples
 */
var sample_project;
(function (sample_project) {
    var samples;
    (function (samples) {
        /**
        * injects the filter of an object module list, into a module of the same type. When the user filtering the collection, inject the sql filter and presets filters, then execute refresh action in a depending module.
        * @method moduleListFilterCapture
        * @param {string} dependingModuleName - name of the depending module object list.
        * @param {string} parentModuleName - name of the parent module object list.
        */
        function moduleListFilterCapture(dependingModuleName, parentModuleName) {
            debugger;
            var opToList = $('flx-module[modulename="' + dependingModuleName + '"] flx-list');
            var opList = $('flx-module[modulename="' + parentModuleName + '"] flx-list');
            if (opList[0] && opToList[0]) {
                var opToListItm_1 = opToList[0];
                var opListItm_1 = opList[0];
                opToListItm_1.presets = opListItm_1.presets;
                flexygo.events.off(opList, 'module', 'filtered');
                flexygo.events.on(opList, 'module', 'filtered', function (e) {
                    if (e.sender === opList.closest('flx-module')[0]) {
                        opToListItm_1.activeFilter = opListItm_1.activeFilter;
                        opToListItm_1.filterValues = opListItm_1.filterValues;
                        opToListItm_1.setPreset(opListItm_1.presetId, opListItm_1.presetText, opListItm_1.presetIcon);
                    }
                });
            }
        }
        samples.moduleListFilterCapture = moduleListFilterCapture;
    })(samples = sample_project.samples || (sample_project.samples = {}));
})(sample_project || (sample_project = {}));
//# sourceMappingURL=nested_modules.js.map