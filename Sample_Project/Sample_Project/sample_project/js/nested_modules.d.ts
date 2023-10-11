/**
 * @namespace sample_project.samples
 */
declare namespace sample_project.samples {
    /**
    * injects the filter of an object module list, into a module of the same type. When the user filtering the collection, inject the sql filter and presets filters, then execute refresh action in a depending module.
    * @method moduleListFilterCapture
    * @param {string} dependingModuleName - name of the depending module object list.
    * @param {string} parentModuleName - name of the parent module object list.
    */
    function moduleListFilterCapture(dependingModuleName: string, parentModuleName: string): void;
}
