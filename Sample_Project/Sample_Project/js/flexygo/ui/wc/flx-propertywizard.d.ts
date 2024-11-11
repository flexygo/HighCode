/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxPropertyManagerElement web component.
    *
    * @class FlxPropertyManagerElement
    * @constructor
    * @return {FlxPropertyManagerElement}
    */
    class FlxPropertyWizardElement extends HTMLElement {
        constructor();
        objectName: string;
        processName: string;
        reportName: string;
        propertyName: string;
        manualInit: boolean;
        propertyManager: FlxPropertyManagerElement;
        is_dirty: boolean;
        loaded: boolean;
        mainConfig: any[];
        connectedCallback(): void;
        static readonly observedAttributes: string[];
        attributeChangedCallback(attrName: string, _: any, newVal: any): Promise<void>;
        checkIfSure(attribute_name: string, current_value: string): Promise<boolean>;
        refresh(): Promise<void>;
        setBasicSettings(): void;
        setControlSettings(control_settings: any, property_data: any): void;
        init(): Promise<void>;
        quickSettingChange(input: FlxCheckElement, type: string, class_name?: string): void;
        changeQuickSettingVisuallyString(value: string, type: string, property_name?: string): void;
        changeQuickSettingVisuallyBoolean(value: boolean, class_name: string): void;
        insertSpacer(type: string, above: number): void;
        /**
         * This function is in charge of hiding and showing the necessary inputs depending on the current type.
         * Things to consider:
         * - Every control input has a wizardControl to know that its one of those which will be affected by the visibility dependency
         * - Every wizardControl will be assigned other classes like this depProperty_Type, being dep the prefix to identify them followed by the property type id
         * - If a new property type is added, it would only be necessary to add its class (depProperty_Type) to its necessary inputs
         * @param current_type It must be the key name of the property type
         */
        triggerDependencies(): void;
    }
}
