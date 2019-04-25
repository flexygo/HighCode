/**
 * @namespace sample_project.samples
 */


namespace sample_project.samples {
    /**
    * injects the filter of an object module list, into a module of the same type. When the user filtering the collection, inject the sql filter and presets filters, then execute refresh action in a depending module.
    * @method moduleListFilterCapture
    * @param {string} dependingModuleName - name of the depending module object list.
    * @param {string} parentModuleName - name of the parent module object list.
    */
    export function moduleListFilterCapture(dependingModuleName: string, parentModuleName: string): void {

        debugger;

        let opToList = $('flx-module[modulename="' + dependingModuleName + '"] flx-list');
        let opList = $('flx-module[modulename="' + parentModuleName + '"] flx-list');

        if (opList[0] && opToList[0]) {

            let opToListItm: flexygo.ui.wc.FlxListElement = (<flexygo.ui.wc.FlxListElement>opToList[0]);
            let opListItm: flexygo.ui.wc.FlxListElement = (<flexygo.ui.wc.FlxListElement>opList[0]);

            opToListItm.presets = opListItm.presets
            flexygo.events.off(opList, 'module', 'filtered');
            flexygo.events.on(opList, 'module', 'filtered', (e) => {
                if (e.sender === opList.closest('flx-module')[0]) {
                    opToListItm.activeFilter = opListItm.activeFilter;
                    opToListItm.filterValues = opListItm.filterValues;
                    opToListItm.setPreset(opListItm.presetId, opListItm.presetText, opListItm.presetIcon);
                }
            });
        }
    }
}