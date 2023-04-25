import { r as registerInstance, j as h, k as getElement } from './index-86ac49ff.js';
import './ionic-global-0f98fe97.js';
import './webapi-79a1d3db.js';
import { s as sql, i as flxSync, u as util, m as msg, C as ConftokenProvider, n as nav } from './conftoken-7e3c18eb.js';
import { j as jquery } from './jquery-5df58adb.js';
import './utils-16079bfd.js';
import './helpers-719f4c54.js';
import './animation-10ea33c3.js';
import './index-7173f7a2.js';
import './ios.transition-95375ac9.js';
import './md.transition-6d74e584.js';
import './cubic-bezier-93f47170.js';
import './index-7fe827c3.js';
import './index-b40d441b.js';
import './hardware-back-button-aacf3d12.js';
import './index-50651ccc.js';
import './overlays-5302658e.js';
import { p as parser } from './parser-8aed96de.js';

var dependencies;
(function (dependencies) {
    async function processAllDependencies(isNew, form, props, conf) {
        if (form.length > 0 && props) {
            for (let i = 0; i < props.length; i++) {
                if (props[i].DependingProperties.length > 0) {
                    await processPropDependency(isNew, form, props[i], conf);
                }
            }
        }
    }
    dependencies.processAllDependencies = processAllDependencies;
    async function processPropDependency(withValue, form, prop, conf) {
        if (form.length > 0 && prop) {
            for (let i = 0; i < prop.DependingProperties.length; i++) {
                processDependency(withValue, form, prop.DependingProperties[i], conf.user);
            }
        }
    }
    dependencies.processPropDependency = processPropDependency;
    function processDependency(withValue, form, dep, tokens) {
        //Enabled dependencies
        execEnabledDependency(form, dep, tokens);
        //Visibility dependencies
        execVisibilityDependency(form, dep, tokens);
        //Required dependencies
        execRequiredDependency(form, dep, tokens);
        //Combo Items dependencies
        execComboDependency(form, dep, tokens, withValue);
        //withValue Value dependencies
        if (withValue) {
            execValueDependency(form, dep, tokens);
        }
        //CSS Class dependencies
        execCssClassDependency(form, dep, tokens);
    }
    dependencies.processDependency = processDependency;
    async function execEnabledDependency(form, dep, tokens) {
        if (dep.SQLEnabled || (dep.EnabledValues && dep.EnabledValues.length > 0) || (dep.DisabledValues && dep.DisabledValues.length > 0)) {
            //Disable property.
            if (await booleanDependency(dep.PropertyName, dep.SQLEnabled, dep.EnabledValues, dep.DisabledValues, form, tokens)) {
                let input = form.find('[property=' + dep.DependantPropertyName + ']');
                if (input.length !== 0) {
                    if (input.is('flx-whiteboard') || input.is('flx-combo'))
                        input.closest('ion-item').prop('disabled', false);
                    else
                        input.prop('disabled', false);
                }
            }
            else {
                let input = form.find('[property=' + dep.DependantPropertyName + ']');
                if (input.length !== 0) {
                    if (input.is('flx-whiteboard') || input.is('flx-combo'))
                        input.closest('ion-item').prop('disabled', true);
                    else
                        input.prop('disabled', true);
                }
            }
        }
    }
    async function execVisibilityDependency(form, dep, tokens) {
        if (dep.SQLVisible || (dep.VisibleValues && dep.VisibleValues.length > 0) || (dep.HiddenValues && dep.HiddenValues.length > 0)) {
            //Show/hide property container.
            if (await booleanDependency(dep.PropertyName, dep.SQLVisible, dep.VisibleValues, dep.HiddenValues, form, tokens)) {
                let prop = form.find('[container=' + dep.DependantPropertyName + ']');
                if (prop[0].localName.toLowerCase() === 'ion-item-divider') {
                    prop.show();
                }
                else {
                    prop.closest('ion-col').show();
                }
            }
            else {
                let prop = form.find('[container=' + dep.DependantPropertyName + ']');
                if (prop[0].localName.toLowerCase() === 'ion-item-divider') {
                    prop.hide();
                }
                else {
                    prop.closest('ion-col').hide();
                }
            }
        }
    }
    async function execRequiredDependency(form, dep, tokens) {
        if (dep.SQLRequired || (dep.RequiredValues && dep.RequiredValues.length > 0) || (dep.NotRequiredValues && dep.NotRequiredValues.length > 0)) {
            //Required property.
            if (await booleanDependency(dep.PropertyName, dep.SQLRequired, dep.RequiredValues, dep.NotRequiredValues, form, tokens)) {
                form.find('[property=' + dep.DependantPropertyName + ']').attr('required', true);
            }
            else {
                form.find('[property=' + dep.DependantPropertyName + ']').removeAttr('required');
            }
        }
    }
    async function execComboDependency(form, dep, tokens, withValue) {
        if (dep.SQLComboSentence || dep.SQLComboFilter) {
            let sqlSentence = null;
            if (dep.SQLComboSentence) {
                form.find('[property=' + dep.DependantPropertyName + ']').attr('sqlsentence', parseSQLdependency(dep.SQLComboSentence, form, tokens));
                sqlSentence = form.find('[property=' + dep.DependantPropertyName + ']').attr('sqlsentence');
            }
            else if (dep.SQLComboFilter) {
                form.find('[property=' + dep.DependantPropertyName + ']').attr('filter', parseSQLdependency(dep.SQLComboFilter, form, tokens));
                sqlSentence = sql.addWhere(form.find('[property=' + dep.DependantPropertyName + ']').attr('sqlsentence'), form.find('[property=' + dep.DependantPropertyName + ']').attr('filter'));
            }
            if (withValue) {
                form.find('[property=' + dep.DependantPropertyName + ']').val(null);
            }
            if (sqlSentence && form.find('[property=' + dep.DependantPropertyName + ']').attr('autoselect') && withValue) {
                sql.getTable(sqlSentence).then((tbl) => {
                    if (tbl.rows.length === 1) {
                        form.find('[property=' + dep.DependantPropertyName + ']').val(sql.getRow(tbl, 0)[form.find('[property=' + dep.DependantPropertyName + ']').attr('valuefield')]);
                    }
                });
            }
        }
    }
    async function execValueDependency(form, dep, tokens) {
        if (dep.SQLValue) {
            let value = await sql.getValue(parseSQLdependency(dep.SQLValue, form, tokens));
            let prop = form.find('[property=' + dep.DependantPropertyName + ']');
            if (prop.is('ion-toggle') || prop.is('ion-checkbox')) {
                prop[0].checked = value;
            }
            else if (prop.is('ion-datetime')) {
                if (prop.attr('display-format').toUpperCase() === 'H:MM' || prop.attr('display-format').toUpperCase() === 'HH:MM') {
                    prop.val(moment("2023-02-15T" + value).format('HH:mm')); //La fecha es para que lo admita moment
                }
                else {
                    prop.val(value);
                }
            }
            else {
                prop.val(value);
            }
        }
    }
    async function execCssClassDependency(form, dep, tokens) {
        if (dep.SQLClass) {
            let value = await sql.getValue(parseSQLdependency(dep.SQLValue, form, tokens));
            form.find('[property=' + dep.DependantPropertyName + ']').attr('class', value);
        }
    }
    async function booleanDependency(propertyName, sqllSentence, positiveValues, negativeValues, form, tokens) {
        let dependencyReturn;
        if (sqllSentence) {
            let value = await sql.getValue(parseSQLdependency(sqllSentence, form, tokens));
            if (value.toString() == 1 || value.toString().toLowerCase() == 'true') {
                dependencyReturn = true;
            }
            else {
                dependencyReturn = false;
            }
        }
        else if (positiveValues && positiveValues.length > 0) {
            dependencyReturn = false;
            let currentValue = getCurrentValue(form.find('[property=' + propertyName + ']')); //Get Property value
            for (let i = 0; i < positiveValues.length; i++) {
                if (currentValue == positiveValues[i].toString().toLowerCase()) {
                    dependencyReturn = true;
                    break;
                }
            }
        }
        else if (negativeValues && negativeValues.length > 0) {
            dependencyReturn = true;
            let currentValue = getCurrentValue(form.find('[property=' + propertyName + ']'));
            for (let i = 0; i < negativeValues.length; i++) {
                if (currentValue == negativeValues[i].toString().toLowerCase()) {
                    dependencyReturn = false;
                    break;
                }
            }
        }
        return dependencyReturn;
    }
    function parseSQLdependency(sentence, form, tokens) {
        let params = sentence.match(/{{([^{}]+)}}/gmi);
        if (params) {
            for (let i = 0; i < params.length; i++) {
                let param = params[i].replace('{', '').replace('{', '').replace('}', '').replace('}', '');
                if (tokens[param]) {
                    sentence = sentence.replace(params[i], tokens[param]);
                }
                else {
                    let prop = form.find('[property=' + param + ']');
                    if (prop.length > 0) {
                        let val = getCurrentValue(prop);
                        sentence = sentence.replace(params[i], val);
                    }
                }
            }
        }
        return sentence.replace(/('null')/gmi, 'null');
    }
    function getCurrentValue(prop) {
        let val;
        if (prop.is('ion-toggle, ion-checkbox')) {
            val = (prop[0].checked ? '1' : '0');
        }
        else if (prop.is('ion-datetime')) {
            val = prop.val();
            if (!val)
                val = 'null';
            else if (val.indexOf('+') !== -1) {
                val = val.split('+')[0];
            }
        }
        else {
            val = prop.val();
            if (!val) {
                val = 'null';
            }
        }
        return val;
    }
})(dependencies || (dependencies = {}));

/*!
 * jQuery Validation Plugin v1.15.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2016 Jörn Zaefferer
 * Released under the MIT license
 */

(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"));
    } else {
        factory(jquery);
    }
}(function ($) {

    $.extend($.fn, {

        // http://jqueryvalidation.org/validate/
        validate: function (options) {

            // If nothing is selected, return nothing; can't chain anyway
            if (!this.length) {
                if (options && options.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.");
                }
                return;
            }

            // Check if a validator for this form was already created
            var validator = $.data(this[0], "validator");
            if (validator) {
                return validator;
            }

            // Add novalidate tag if HTML5.
            this.attr("novalidate", "novalidate");

            validator = new $.validator(options, this[0]);
            $.data(this[0], "validator", validator);

            if (validator.settings.onsubmit) {

                this.on("click.validate", ":submit", function (event) {
                    if (validator.settings.submitHandler) {
                        validator.submitButton = event.target;
                    }

                    // Allow suppressing validation by adding a cancel class to the submit button
                    if ($(this).hasClass("cancel")) {
                        validator.cancelSubmit = true;
                    }

                    // Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                    if ($(this).attr("formnovalidate") !== undefined) {
                        validator.cancelSubmit = true;
                    }
                });

                // Validate the form on submit
                this.on("submit.validate", function (event) {
                    if (validator.settings.debug) {

                        // Prevent form submit to be able to see console output
                        event.preventDefault();
                    }
                    function handle() {
                        var hidden, result;
                        if (validator.settings.submitHandler) {
                            if (validator.submitButton) {

                                // Insert a hidden input as a replacement for the missing submit button
                                hidden = $("<input type='hidden'/>")
                                    .attr("name", validator.submitButton.name)
                                    .val($(validator.submitButton).val())
                                    .appendTo(validator.currentForm);
                            }
                            result = validator.settings.submitHandler.call(validator, validator.currentForm, event);
                            if (validator.submitButton) {

                                // And clean up afterwards; thanks to no-block-scope, hidden can be referenced
                                hidden.remove();
                            }
                            if (result !== undefined) {
                                return result;
                            }
                            return false;
                        }
                        return true;
                    }

                    // Prevent submit for invalid forms or custom submit handlers
                    if (validator.cancelSubmit) {
                        validator.cancelSubmit = false;
                        return handle();
                    }
                    if (validator.form()) {
                        if (validator.pendingRequest) {
                            validator.formSubmitted = true;
                            return false;
                        }
                        return handle();
                    } else {
                        validator.focusInvalid();
                        return false;
                    }
                });
            }

            return validator;
        },

        // http://jqueryvalidation.org/valid/
        valid: function () {
            var valid, validator, errorList;

            if ($(this[0]).is("form")) {
                valid = this.validate().form();
            } else {
                errorList = [];
                valid = true;
                if (this[0].form) {
                    validator = $(this[0].form).validate();
                    this.each(function () {
                        valid = validator.element(this) && valid;
                        if (!valid) {
                            errorList = errorList.concat(validator.errorList);
                        }
                    });
                } else {
                    validator = $(this[0]).validate();
                    
                    $(this).find("input, .input, select, textarea, [contenteditable]").each(function () {
                        valid = validator.element(this) && valid;
                        if (!valid) {
                            errorList = errorList.concat(validator.errorList);
                        }
                    });
                }
                
                
                validator.errorList = errorList;
            }
            return valid;
        },

        // http://jqueryvalidation.org/rules/
        rules: function (command, argument) {

            // If nothing is selected, return nothing; can't chain anyway
            if (!this.length) {
                return;
            }

            var element = this[0],
                settings, staticRules, existingRules, data, param, filtered;

            if (command) {
                var itm;
                if (element.form) {
                    itm = element.form;
                } else {
                    var itm = $(element).closest('.form')[0];
                }
                
                settings = $.data(itm, "validator").settings;
                staticRules = settings.rules;
                existingRules = $.validator.staticRules(element);
                switch (command) {
                    case "add":
                        $.extend(existingRules, $.validator.normalizeRule(argument));

                        // Remove messages from rules, but allow them to be set separately
                        delete existingRules.messages;
                        staticRules[element.name] = existingRules;
                        if (argument.messages) {
                            settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
                        }
                        break;
                    case "remove":
                        if (!argument) {
                            delete staticRules[element.name];
                            return existingRules;
                        }
                        filtered = {};
                        $.each(argument.split(/\s/), function (index, method) {
                            filtered[method] = existingRules[method];
                            delete existingRules[method];
                            if (method === "required") {
                                $(element).removeAttr("aria-required");
                            }
                        });
                        return filtered;
                }
            }

            data = $.validator.normalizeRules(
            $.extend(
                {},
                $.validator.classRules(element),
                $.validator.attributeRules(element),
                $.validator.dataRules(element),
                $.validator.staticRules(element)
            ), element);

            // Make sure required is at front
            if (data.required) {
                param = data.required;
                delete data.required;
                data = $.extend({ required: param }, data);
                $(element).attr("aria-required", "true");
            }

            // Make sure remote is at back
            if (data.remote) {
                param = data.remote;
                delete data.remote;
                data = $.extend(data, { remote: param });
            }

            return data;
        }
    });

    // Custom selectors
    $.extend($.expr[":"], {

        // http://jqueryvalidation.org/blank-selector/
        blank: function (a) {
            return !$.trim("" + $(a).val());
        },

        // http://jqueryvalidation.org/filled-selector/
        filled: function (a) {
            var val = $(a).val();
            return val !== null && !!$.trim("" + val);
        },

        // http://jqueryvalidation.org/unchecked-selector/
        unchecked: function (a) {
            return !$(a).prop("checked");
        }
    });

    // Constructor for validator
    $.validator = function (options, form) {
        this.settings = $.extend(true, {}, $.validator.defaults, options);
        this.currentForm = form;
        this.init();
    };

    // http://jqueryvalidation.org/jQuery.validator.format/
    $.validator.format = function (source, params) {
        if (arguments.length === 1) {
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply(this, args);
            };
        }
        if (params === undefined) {
            return source;
        }
        if (arguments.length > 2 && params.constructor !== Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor !== Array) {
            params = [params];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                return n;
            });
        });
        return source;
    };

    $.extend($.validator, {

        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: false,
            focusInvalid: true,
            errorContainer: $([]),
            errorLabelContainer: $([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function (element) {
                this.lastActive = element;

                // Hide error label and remove error class on focus if enabled
                if (this.settings.focusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.hideThese(this.errorsFor(element));
                }
            },
            onfocusout: function (element) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
            },
            onkeyup: function (element, event) {

                // Avoid revalidate the field when pressing one of the following keys
                // Shift       => 16
                // Ctrl        => 17
                // Alt         => 18
                // Caps lock   => 20
                // End         => 35
                // Home        => 36
                // Left arrow  => 37
                // Up arrow    => 38
                // Right arrow => 39
                // Down arrow  => 40
                // Insert      => 45
                // Num lock    => 144
                // AltGr key   => 225
                var excludedKeys = [
                    16, 17, 18, 20, 35, 36, 37,
                    38, 39, 40, 45, 144, 225
                ];

                if (event.which === 9 && this.elementValue(element) === "" || $.inArray(event.keyCode, excludedKeys) !== -1) {
                    return;
                } else if (element.name in this.submitted || element.name in this.invalid) {
                    this.element(element);
                }
            },
            onclick: function (element) {

                // Click on selects, radiobuttons and checkboxes
                if (element.name in this.submitted) {
                    this.element(element);

                    // Or option elements, check parent select in that case
                } else if (element.parentNode.name in this.submitted) {
                    this.element(element.parentNode);
                }
            },
            highlight: function (element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else {
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            }
        },

        // http://jqueryvalidation.org/jQuery.validator.setDefaults/
        setDefaults: function (settings) {
            $.extend($.validator.defaults, settings);
        },

        messages: {
            required: "Required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: $.validator.format("Please enter no more than {0} characters."),
            minlength: $.validator.format("Please enter at least {0} characters."),
            rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $.validator.format("Please enter a value between {0} and {1}."),
            max: $.validator.format("Please enter a value less than or equal to {0}."),
            min: $.validator.format("Please enter a value greater than or equal to {0}."),
            step: $.validator.format("Please enter a multiple of {0}.")
        },

        autoCreateRanges: false,

        prototype: {

            init: function () {
                this.labelContainer = $(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();

                var groups = (this.groups = {}),
                    rules;
                $.each(this.settings.groups, function (key, value) {
                    if (typeof value === "string") {
                        value = value.split(/\s/);
                    }
                    $.each(value, function (index, name) {
                        groups[name] = key;
                    });
                });
                rules = this.settings.rules;
                $.each(rules, function (key, value) {
                    rules[key] = $.validator.normalizeRule(value);
                });

                function delegate(event) {
                    var itm;
                    if (this.form) { itm = this.form; } else {
                        itm = $(this).closest('.form')[0];
                    }
                    if (itm) {
                        var validator = $.data(itm, "validator"),
                            eventType = "on" + event.type.replace(/^validate/, ""),
                            settings = validator.settings;
                        if (settings[eventType] && !$(this).is(settings.ignore)) {
                            settings[eventType].call(validator, this, event);
                        }
                    }
                }

                $(this.currentForm)
                    .on("focusin.validate focusout.validate keyup.validate",
                        ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
                        "[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
                        "[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
                        "[type='radio'], [type='checkbox'], [contenteditable]", delegate)

                    // Support: Chrome, oldIE
                    // "select" is provided as event.target when clicking a option
                    .on("click.validate", "select, option, [type='radio'], [type='checkbox']", delegate);

                if (this.settings.invalidHandler) {
                    $(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
                }

                // Add aria-required to any Static/Data/Class required fields before first validation
                // Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
                $(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
            },

            // http://jqueryvalidation.org/Validator.form/
            form: function () {
                this.checkForm();
                $.extend(this.submitted, this.errorMap);
                this.invalid = $.extend({}, this.errorMap);
                if (!this.valid()) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                }
                this.showErrors();
                return this.valid();
            },

            checkForm: function () {
                this.prepareForm();
                for (var i = 0, elements = (this.currentElements = this.elements()) ; elements[i]; i++) {
                    this.check(elements[i]);
                }
                return this.valid();
            },

            // http://jqueryvalidation.org/Validator.element/
            element: function (element) {
                var cleanElement = this.clean(element),
                    checkElement = this.validationTargetFor(cleanElement),
                    v = this,
                    result = true,
                    rs, group;

                if (checkElement === undefined) {
                    delete this.invalid[cleanElement.name];
                } else {
                    this.prepareElement(checkElement);
                    this.currentElements = $(checkElement);

                    // If this element is grouped, then validate all group elements already
                    // containing a value
                    group = this.groups[checkElement.name];
                    if (group) {
                        $.each(this.groups, function (name, testgroup) {
                            if (testgroup === group && name !== checkElement.name) {
                                cleanElement = v.validationTargetFor(v.clean(v.findByName(name)));
                                if (cleanElement && cleanElement.name in v.invalid) {
                                    v.currentElements.push(cleanElement);
                                    result = result && v.check(cleanElement);
                                }
                            }
                        });
                    }

                    rs = this.check(checkElement) !== false;
                    result = result && rs;
                    if (rs) {
                        this.invalid[checkElement.name] = false;
                    } else {
                        this.invalid[checkElement.name] = true;
                    }

                    if (!this.numberOfInvalids()) {

                        // Hide error containers on last error
                        this.toHide = this.toHide.add(this.containers);
                    }
                    this.showErrors();

                    // Add aria-invalid status for screen readers
                    $(element).attr("aria-invalid", !rs);
                }

                return result;
            },

            // http://jqueryvalidation.org/Validator.showErrors/
            showErrors: function (errors) {
                if (errors) {
                    var validator = this;

                    // Add items to error list and map
                    $.extend(this.errorMap, errors);
                    this.errorList = $.map(this.errorMap, function (message, name) {
                        return {
                            message: message,
                            element: validator.findByName(name)[0]
                        };
                    });

                    // Remove items from success list
                    this.successList = $.grep(this.successList, function (element) {
                        return !(element.name in errors);
                    });
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList);
                } else {
                    this.defaultShowErrors();
                }
            },

            // http://jqueryvalidation.org/Validator.resetForm/
            resetForm: function () {
                if ($.fn.resetForm) {
                    $(this.currentForm).resetForm();
                }
                this.invalid = {};
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                var elements = this.elements()
                    .removeData("previousValue")
                    .removeAttr("aria-invalid");

                this.resetElements(elements);
            },

            resetElements: function (elements) {
                var i;

                if (this.settings.unhighlight) {
                    for (i = 0; elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i],
                            this.settings.errorClass, "");
                        this.findByName(elements[i].name).removeClass(this.settings.validClass);
                    }
                } else {
                    elements
                        .removeClass(this.settings.errorClass)
                        .removeClass(this.settings.validClass);
                }
            },

            numberOfInvalids: function () {
                return this.objectLength(this.invalid);
            },

            objectLength: function (obj) {
                /* jshint unused: false */
                var count = 0,
                    i;
                for (i in obj) {
                    if (obj[i]) {
                        count++;
                    }
                }
                return count;
            },

            hideErrors: function () {
                this.hideThese(this.toHide);
            },

            hideThese: function (errors) {
                errors.not(this.containers).text("");
                this.addWrapper(errors).hide();
            },

            valid: function () {
                return this.size() === 0;
            },

            size: function () {
                return this.errorList.length;
            },

            focusInvalid: function () {
                if (this.settings.focusInvalid) {
                    try {
                        $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
                        .filter(":visible")
                        .focus()

                        // Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                        .trigger("focusin");
                    } catch (e) {

                        // Ignore IE throwing errors when focusing hidden elements
                    }
                }
            },

            findLastActive: function () {
                var lastActive = this.lastActive;
                return lastActive && $.grep(this.errorList, function (n) {
                    return n.element.name === lastActive.name;
                }).length === 1 && lastActive;
            },

            elements: function () {
                var validator = this,
                    rulesCache = {};

                // Select all valid inputs inside the form (no submit or reset buttons)
                return $(this.currentForm)
                .find("input, .input, select, textarea, [contenteditable]")
                .not(":submit, :reset, :image, :disabled")
                .not(this.settings.ignore)
                .filter(function () {
                    var name = this.name || $(this).attr("name"); // For contenteditable
                    if (!name && validator.settings.debug && window.console) {
                        console.error("%o has no name assigned", this);
                    }

                    // Set form expando on contenteditable
                    if (this.hasAttribute("contenteditable")) {
                        this.form = $(this).closest("form")[0];
                    }

                    // Select only the first element for each name, and only those with rules specified
                    if (name in rulesCache || !validator.objectLength($(this).rules())) {
                        return false;
                    }

                    rulesCache[name] = true;
                    return true;
                });
            },

            clean: function (selector) {
                return $(selector)[0];
            },

            errors: function () {
                var errorClass = this.settings.errorClass.split(" ").join(".");
                return $(this.settings.errorElement + "." + errorClass, this.errorContext);
            },

            resetInternals: function () {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $([]);
                this.toHide = $([]);
            },

            reset: function () {
                this.resetInternals();
                this.currentElements = $([]);
            },

            prepareForm: function () {
                this.reset();
                this.toHide = this.errors().add(this.containers);
            },

            prepareElement: function (element) {
                this.reset();
                this.toHide = this.errorsFor(element);
            },

            elementValue: function (element) {
                var $element = $(element),
                    type = element.type,
                    val, idx;

                if (type === "radio" || type === "checkbox") {
                    return this.findByName(element.name).filter(":checked").val();
                } else if (type === "number" && typeof element.validity !== "undefined") {
                    return element.validity.badInput ? "NaN" : $element.val();
                }

                if (element.hasAttribute("contenteditable")) {
                    val = $element.text();
                } else {
                    val = $element.val();
                }

                if (type === "file") {

                    // Modern browser (chrome & safari)
                    if (val.substr(0, 12) === "C:\\fakepath\\") {
                        return val.substr(12);
                    }

                    // Legacy browsers
                    // Unix-based path
                    idx = val.lastIndexOf("/");
                    if (idx >= 0) {
                        return val.substr(idx + 1);
                    }

                    // Windows-based path
                    idx = val.lastIndexOf("\\");
                    if (idx >= 0) {
                        return val.substr(idx + 1);
                    }

                    // Just the file name
                    return val;
                }

                if (typeof val === "string") {
                    return val.replace(/\r/g, "");
                }
                return val;
            },

            check: function (element) {
                element = this.validationTargetFor(this.clean(element));

                var rules = $(element).rules(),
                    rulesCount = $.map(rules, function (n, i) {
                        return i;
                    }).length,
                    dependencyMismatch = false,
                    val = this.elementValue(element),
                    result, method, rule;

                // If a normalizer is defined for this element, then
                // call it to retreive the changed value instead
                // of using the real one.
                // Note that `this` in the normalizer is `element`.
                if (typeof rules.normalizer === "function") {
                    val = rules.normalizer.call(element, val);

                    if (typeof val !== "string") {
                        throw new TypeError("The normalizer should return a string value.");
                    }

                    // Delete the normalizer from rules to avoid treating
                    // it as a pre-defined method.
                    delete rules.normalizer;
                }

                for (method in rules) {
                    rule = { method: method, parameters: rules[method] };
                    try {
                        result = $.validator.methods[method].call(this, val, element, rule.parameters);

                        // If a method indicates that the field is optional and therefore valid,
                        // don't mark it as valid when there are no other rules
                        if (result === "dependency-mismatch" && rulesCount === 1) {
                            dependencyMismatch = true;
                            continue;
                        }
                        dependencyMismatch = false;

                        if (result === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(element));
                            return;
                        }

                        if (!result) {
                            this.formatAndAdd(element, rule);
                            return false;
                        }
                    } catch (e) {
                        if (this.settings.debug && window.console) {
                            console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
                        }
                        if (e instanceof TypeError) {
                            e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
                        }

                        throw e;
                    }
                }
                if (dependencyMismatch) {
                    return;
                }
                if (this.objectLength(rules)) {
                    this.successList.push(element);
                }
                return true;
            },

            // Return the custom message for the given element and validation method
            // specified in the element's HTML5 data attribute
            // return the generic message if present and no method specific message is present
            customDataMessage: function (element, method) {
                return $(element).data("msg" + method.charAt(0).toUpperCase() +
                    method.substring(1).toLowerCase()) || $(element).data("msg");
            },

            // Return the custom message for the given element name and validation method
            customMessage: function (name, method) {
                var m = this.settings.messages[name];
                return m && (m.constructor === String ? m : m[method]);
            },

            // Return the first defined argument, allowing empty strings
            findDefined: function () {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] !== undefined) {
                        return arguments[i];
                    }
                }
                return undefined;
            },

            defaultMessage: function (element, rule) {
                var message = this.findDefined(
                        this.customMessage(element.name, rule.method),
                        this.customDataMessage(element, rule.method),

                        // 'title' is never undefined, so handle empty string as undefined
                        !this.settings.ignoreTitle && element.title || undefined,
                        $.validator.messages[rule.method],
                        "<strong>Warning: No message defined for " + element.name + "</strong>"
                    ),
                    theregex = /\$?\{(\d+)\}/g;
                if (typeof message === "function") {
                    message = message.call(this, rule.parameters, element);
                } else if (theregex.test(message)) {
                    message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
                }

                return message;
            },

            formatAndAdd: function (element, rule) {
                var message = this.defaultMessage(element, rule);

                this.errorList.push({
                    message: message,
                    element: element,
                    method: rule.method
                });

                this.errorMap[element.name] = message;
                this.submitted[element.name] = message;
            },

            addWrapper: function (toToggle) {
                if (this.settings.wrapper) {
                    toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
                }
                return toToggle;
            },

            defaultShowErrors: function () {
                var i, elements, error;
                for (i = 0; this.errorList[i]; i++) {
                    error = this.errorList[i];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.showLabel(error.element, error.message);
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers);
                }
                if (this.settings.success) {
                    for (i = 0; this.successList[i]; i++) {
                        this.showLabel(this.successList[i]);
                    }
                }
                if (this.settings.unhighlight) {
                    for (i = 0, elements = this.validElements() ; elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show();
            },

            validElements: function () {
                return this.currentElements.not(this.invalidElements());
            },

            invalidElements: function () {
                return $(this.errorList).map(function () {
                    return this.element;
                });
            },

            showLabel: function (element, message) {
                var place, group, errorID, v,
                    error = this.errorsFor(element),
                    elementID = this.idOrName(element),
                    describedBy = $(element).attr("aria-describedby");

                if (error.length) {

                    // Refresh error/success class
                    error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);

                    // Replace message on existing label
                    error.html(message);
                } else {

                    // Create error element
                    error = $("<" + this.settings.errorElement + ">")
                        .attr("id", elementID + "-error")
                        .addClass(this.settings.errorClass)
                        .html(message || "");

                    // Maintain reference to the element to be placed into the DOM
                    place = error;
                    if (this.settings.wrapper) {

                        // Make sure the element is visible, even in IE
                        // actually showing the wrapped element is handled elsewhere
                        place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    }
                    if (this.labelContainer.length) {
                        this.labelContainer.append(place);
                    } else if (this.settings.errorPlacement) {
                        this.settings.errorPlacement(place, $(element));
                    } else {
                        place.insertAfter(element);
                    }

                    // Link error back to the element
                    if (error.is("label")) {

                        // If the error is a label, then associate using 'for'
                        error.attr("for", elementID);

                        // If the element is not a child of an associated label, then it's necessary
                        // to explicitly apply aria-describedby
                    } else if (error.parents("label[for='" + this.escapeCssMeta(elementID) + "']").length === 0) {
                        errorID = error.attr("id");

                        // Respect existing non-error aria-describedby
                        if (!describedBy) {
                            describedBy = errorID;
                        } else if (!describedBy.match(new RegExp("\\b" + this.escapeCssMeta(errorID) + "\\b"))) {

                            // Add to end of list if not already present
                            describedBy += " " + errorID;
                        }
                        $(element).attr("aria-describedby", describedBy);

                        // If this element is grouped, then assign to all elements in the same group
                        group = this.groups[element.name];
                        if (group) {
                            v = this;
                            $.each(v.groups, function (name, testgroup) {
                                if (testgroup === group) {
                                    $("[name='" + v.escapeCssMeta(name) + "']", v.currentForm)
                                        .attr("aria-describedby", error.attr("id"));
                                }
                            });
                        }
                    }
                }
                if (!message && this.settings.success) {
                    error.text("");
                    if (typeof this.settings.success === "string") {
                        error.addClass(this.settings.success);
                    } else {
                        this.settings.success(error, element);
                    }
                }
                this.toShow = this.toShow.add(error);
            },

            errorsFor: function (element) {
                var name = this.escapeCssMeta(this.idOrName(element)),
                    describer = $(element).attr("aria-describedby"),
                    selector = "label[for='" + name + "'], label[for='" + name + "'] *";

                // 'aria-describedby' should directly reference the error element
                if (describer) {
                    selector = selector + ", #" + this.escapeCssMeta(describer)
                        .replace(/\s+/g, ", #");
                }

                return this
                    .errors()
                    .filter(selector);
            },

            // See https://api.jquery.com/category/selectors/, for CSS
            // meta-characters that should be escaped in order to be used with JQuery
            // as a literal part of a name/id or any selector.
            escapeCssMeta: function (string) {
                return string.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1");
            },

            idOrName: function (element) {
                return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
            },

            validationTargetFor: function (element) {

                // If radio/checkbox, validate first element in group instead
                if (this.checkable(element)) {
                    element = this.findByName(element.name);
                }

                // Always apply ignore filter
                return $(element).not(this.settings.ignore)[0];
            },

            checkable: function (element) {
                return (/radio|checkbox/i).test(element.type);
            },

            findByName: function (name) {
                return $(this.currentForm).find("[name='" + this.escapeCssMeta(name) + "']");
            },

            getLength: function (value, element) {
                switch (element.nodeName.toLowerCase()) {
                    case "select":
                        return $("option:selected", element).length;
                    case "input":
                        if (this.checkable(element)) {
                            return this.findByName(element.name).filter(":checked").length;
                        }
                }
                return value.length;
            },

            depend: function (param, element) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
            },

            dependTypes: {
                "boolean": function (param) {
                    return param;
                },
                "string": function (param, element) {
                    var itm;
                    if (element.form) {
                        itm = element.form;
                    } else { itm = $(element).closest('.form')[0]; }
                    return !!$(param, itm).length;
                },
                "function": function (param, element) {
                    return param(element);
                }
            },

            optional: function (element) {
                var val = this.elementValue(element);
                return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
            },

            startRequest: function (element) {
                if (!this.pending[element.name]) {
                    this.pendingRequest++;
                    $(element).addClass(this.settings.pendingClass);
                    this.pending[element.name] = true;
                }
            },

            stopRequest: function (element, valid) {
                this.pendingRequest--;

                // Sometimes synchronization fails, make sure pendingRequest is never < 0
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0;
                }
                delete this.pending[element.name];
                $(element).removeClass(this.settings.pendingClass);
                if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    $(this.currentForm).submit();
                    this.formSubmitted = false;
                } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false;
                }
            },

            previousValue: function (element, method) {
                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(element, { method: method })
                });
            },

            // Cleans up all forms and elements, removes validator-specific events
            destroy: function () {
                this.resetForm();

                $(this.currentForm)
                    .off(".validate")
                    .removeData("validator")
                    .find(".validate-equalTo-blur")
                        .off(".validate-equalTo")
                        .removeClass("validate-equalTo-blur");
            }

        },

        classRuleSettings: {
            required: { required: true },
            email: { email: true },
            url: { url: true },
            date: { date: true },
            dateISO: { dateISO: true },
            number: { number: true },
            digits: { digits: true },
            creditcard: { creditcard: true },
            sqlvalidator: { sqlvalidator: true }
        },

        addClassRules: function (className, rules) {
            if (className.constructor === String) {
                this.classRuleSettings[className] = rules;
            } else {
                $.extend(this.classRuleSettings, className);
            }
        },

        classRules: function (element) {
            var rules = {},
                classes = $(element).attr("class");

            if (classes) {
                $.each(classes.split(" "), function () {
                    if (this in $.validator.classRuleSettings) {
                        $.extend(rules, $.validator.classRuleSettings[this]);
                    }
                });
            }
            return rules;
        },

        normalizeAttributeRule: function (rules, type, method, value) {

            // Convert the value to a number for number inputs, and for text for backwards compability
            // allows type="date" and others to be compared as strings
            if (/min|max|step/.test(method) && (type === null || /number|range|text/.test(type))) {
                value = Number(value);

                // Support Opera Mini, which returns NaN for undefined minlength
                if (isNaN(value)) {
                    value = undefined;
                }
            }

            if (value || value === 0) {
                rules[method] = value;
            } else if (type === method && type !== "range") {

                // Exception: the jquery validate 'range' method
                // does not test for the html5 'range' type
                rules[method] = true;
            }
        },

        attributeRules: function (element) {
            var rules = {},
                $element = $(element),
                type = element.getAttribute("type"),
                method, value;

            for (method in $.validator.methods) {

                // Support for <input required> in both html5 and older browsers
                if (method === "required") {
                    value = element.getAttribute(method);

                    // Some browsers return an empty string for the required attribute
                    // and non-HTML5 browsers might have required="" markup
                    if (value === "") {
                        value = true;
                    }

                    // Force non-HTML5 browsers to return bool
                    value = !!value;
                } else {
                    value = $element.attr(method);
                }

                this.normalizeAttributeRule(rules, type, method, value);
            }

            // 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
            if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                delete rules.maxlength;
            }

            return rules;
        },

        dataRules: function (element) {
            var rules = {},
                $element = $(element),
                type = element.getAttribute("type"),
                method, value;

            for (method in $.validator.methods) {
                value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());
                this.normalizeAttributeRule(rules, type, method, value);
            }
            return rules;
        },

        staticRules: function (element) {
            var rules = {};
            var validator;
            if(element.form){
                validator = $.data(element.form, "validator");
            }else {
                validator = $.data($(element).closest('.form')[0], "validator");
            }
                

            if (validator.settings.rules) {
                rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
            }
            return rules;
        },

        normalizeRules: function (rules, element) {

            var itm;
            if (element.form) {
                itm = element.form;
            } else {
                itm = $(element).closest('.form')[0];
            }

            // Handle dependency check
            $.each(rules, function (prop, val) {

                // Ignore rule when param is explicitly false, eg. required:false
                if (val === false) {
                    delete rules[prop];
                    return;
                }
                if (val.param || val.depends) {
                    var keepRule = true;
                    

                    if(element)
                    switch (typeof val.depends) {
                        case "string":
                            keepRule = !!$(val.depends, itm).length;
                            break;
                        case "function":
                            keepRule = val.depends.call(element, element);
                            break;
                    }
                    if (keepRule) {
                        rules[prop] = val.param !== undefined ? val.param : true;
                    } else {
                        $.data(itm, "validator").resetElements($(element));
                        delete rules[prop];
                    }
                }
            });

            // Evaluate parameters
            $.each(rules, function (rule, parameter) {
                rules[rule] = $.isFunction(parameter) && rule !== "normalizer" ? parameter(element) : parameter;
            });

            // Clean number parameters
            $.each(["minlength", "maxlength"], function () {
                if (rules[this]) {
                    rules[this] = Number(rules[this]);
                }
            });
            $.each(["rangelength", "range"], function () {
                var parts;
                if (rules[this]) {
                    if ($.isArray(rules[this])) {
                        rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                    } else if (typeof rules[this] === "string") {
                        parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                        rules[this] = [Number(parts[0]), Number(parts[1])];
                    }
                }
            });

            if ($.validator.autoCreateRanges) {

                // Auto-create ranges
                if (rules.min != null && rules.max != null) {
                    rules.range = [rules.min, rules.max];
                    delete rules.min;
                    delete rules.max;
                }
                if (rules.minlength != null && rules.maxlength != null) {
                    rules.rangelength = [rules.minlength, rules.maxlength];
                    delete rules.minlength;
                    delete rules.maxlength;
                }
            }

            return rules;
        },

        // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
        normalizeRule: function (data) {
            if (typeof data === "string") {
                var transformed = {};
                $.each(data.split(/\s/), function () {
                    transformed[this] = true;
                });
                data = transformed;
            }
            return data;
        },

        // http://jqueryvalidation.org/jQuery.validator.addMethod/
        addMethod: function (name, method, message) {
            $.validator.methods[name] = method;
            $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
            if (method.length < 3) {
                $.validator.addClassRules(name, $.validator.normalizeRule(name));
            }
        },

        // http://jqueryvalidation.org/jQuery.validator.methods/
        methods: {

            // http://jqueryvalidation.org/required-method/
            required: function (value, element, param) {

                // Check if dependency is met
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                if (element.nodeName.toLowerCase() === "select") {

                    // Could be an array for select-multiple or a string, both are fine this way
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                if (this.checkable(element)) {
                    return this.getLength(value, element) > 0;
                }

                if(value==null){return false}

                return value.length > 0;
            },

            // http://jqueryvalidation.org/email-method/
            email: function (value, element) {

                // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
                // Retrieved 2014-01-14
                // If you have a problem with this implementation, report a bug against the above spec
                // Or use custom methods to implement your own email validation
                return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
            },

            // http://jqueryvalidation.org/url-method/
            url: function (value, element) {

                // Copyright (c) 2010-2013 Diego Perini, MIT licensed
                // https://gist.github.com/dperini/729294
                // see also https://mathiasbynens.be/demo/url-regex
                // modified to allow protocol-relative URLs
                return this.optional(element) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
            },

            // http://jqueryvalidation.org/date-method/
            date: function (value, element) {
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
            },

            // http://jqueryvalidation.org/dateISO-method/
            dateISO: function (value, element) {
                return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
            },

            // http://jqueryvalidation.org/number-method/
            number: function (value, element) {
                return this.optional(element) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },

            // http://jqueryvalidation.org/digits-method/
            digits: function (value, element) {
                return this.optional(element) || /^\d+$/.test(value);
            },

            // http://jqueryvalidation.org/minlength-method/
            minlength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length >= param;
            },

            // http://jqueryvalidation.org/maxlength-method/
            maxlength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length <= param;
            },

            // http://jqueryvalidation.org/rangelength-method/
            rangelength: function (value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || (length >= param[0] && length <= param[1]);
            },

            // http://jqueryvalidation.org/min-method/
            min: function (value, element, param) {
                return this.optional(element) || value >= param;
            },

            // http://jqueryvalidation.org/max-method/
            max: function (value, element, param) {
                return this.optional(element) || value <= param;
            },

            // http://jqueryvalidation.org/range-method/
            range: function (value, element, param) {
                return this.optional(element) || (value >= param[0] && value <= param[1]);
            },

            // http://jqueryvalidation.org/step-method/
            step: function (value, element, param) {
                var type = $(element).attr("type"),
                    errorMessage = "Step attribute on input type " + type + " is not supported.",
                    supportedTypes = ["text", "number", "range"],
                    re = new RegExp("\\b" + type + "\\b"),
                    notSupported = type && !re.test(supportedTypes.join());

                // Works only for text, number and range input types
                // TODO find a way to support input types date, datetime, datetime-local, month, time and week
                if (notSupported) {
                    throw new Error(errorMessage);
                }
                return this.optional(element) || (value % param === 0);
            },

            // http://jqueryvalidation.org/equalTo-method/
            equalTo: function (value, element, param) {

                // Bind to the blur event of the target in order to revalidate whenever the target field is updated
                var target = $(param);
                if (this.settings.onfocusout && target.not(".validate-equalTo-blur").length) {
                    target.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
                        $(element).valid();
                    });
                }
                return value === target.val();
            },

            // http://jqueryvalidation.org/remote-method/
            remote: function (value, element, param, method) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }

                method = typeof method === "string" && method || "remote";

                var previous = this.previousValue(element, method),
                    validator, data, optionDataString;

                if (!this.settings.messages[element.name]) {
                    this.settings.messages[element.name] = {};
                }
                previous.originalMessage = previous.originalMessage || this.settings.messages[element.name][method];
                this.settings.messages[element.name][method] = previous.message;

                param = typeof param === "string" && { url: param } || param;
                optionDataString = $.param($.extend({ data: value }, param.data));
                if (previous.old === optionDataString) {
                    return previous.valid;
                }

                previous.old = optionDataString;
                validator = this;
                this.startRequest(element);
                data = {};
                data[element.name] = value;
                $.ajax($.extend(true, {
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    context: validator.currentForm,
                    success: function (response) {
                        var valid = response === true || response === "true",
                            errors, message, submitted;

                        validator.settings.messages[element.name][method] = previous.originalMessage;
                        if (valid) {
                            submitted = validator.formSubmitted;
                            validator.resetInternals();
                            validator.toHide = validator.errorsFor(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            validator.invalid[element.name] = false;
                            validator.showErrors();
                        } else {
                            errors = {};
                            message = response || validator.defaultMessage(element, { method: method, parameters: value });
                            errors[element.name] = previous.message = message;
                            validator.invalid[element.name] = true;
                            validator.showErrors(errors);
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid);
                    }
                }, param));
                return "pending";
            }
        }

    });

    // Ajax mode: abort
    // usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
    // if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

    var pendingRequests = {},
        ajax;

    // Use a prefilter if available (1.5+)
    if ($.ajaxPrefilter) {
        $.ajaxPrefilter(function (settings, _, xhr) {
            var port = settings.port;
            if (settings.mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = xhr;
            }
        });
    } else {

        // Proxy ajax
        ajax = $.ajax;
        $.ajax = function (settings) {
            var mode = ("mode" in settings ? settings : $.ajaxSettings).mode,
                port = ("port" in settings ? settings : $.ajaxSettings).port;
            if (mode === "abort") {
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = ajax.apply(this, arguments);
                return pendingRequests[port];
            }
            return ajax.apply(this, arguments);
        };
    }

}));

$.validator.addMethod("regex", function (value, element, regexpr) {
    if (value == null || value == '') { return true;}
    return (new RegExp(regexpr)).test(value);
}, "Please enter a valid value.");

$.validator.addMethod("sqlvalidator", function (value, element, validated) {
    if (validated == 0) {
        $.validator.messages.sqlvalidator = element.getAttributeNode("data-msg-sqlvalidator").value;
        return false;
    }
    return true;
});

$.validator.methods.step = function (value, element, param) {
    // Replace default Jquery step validation
    var type = $(element).attr("type"),
        errorMessage = "Step attribute on input type " + type + " is not supported.",
        supportedTypes = ["text", "number", "range"],
        re = new RegExp("\\b" + type + "\\b"),
        notSupported = type && !re.test(supportedTypes.join());
    if (notSupported) {
        throw new Error(errorMessage);
    }
    return this.optional(element) || true; //(value % param === 0);
};

const flxEditCss = "label.error{color:red;float:right;position:absolute;bottom:0px;right:0px;font-size:0.8em}[sqlvalidator=\"0\"] label.error{position:static}";

const FlxEdit = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.modal = false;
        this.bodyTemplate = '{{getProperties(json)}}';
        this.footerTemplate = '<ion-fab vertical="bottom" horizontal="end" slot="fixed"><ion-fab-button onclick="flexygo.forms.save(this,event).then(() => {flexygo.nav.goBack()}).catch(err => {flexygo.msg.showError(err)});"><i class="flx-icon icon-save-21" ></i></ion-fab-button></ion-fab>';
    }
    componentDidLoad() {
        jquery('#loadingSpinnerModule').css('visibility', 'hidden');
        flxSync.checkSendErrors();
    }
    componentWillLoad() {
        jquery('#loadingSpinnerModule').css('visibility', 'visible');
        this.refresh();
        jquery(window).off('popstate.edit' + this.pageName).on('popstate.edit' + this.pageName, () => {
            if (document.location.href.toLowerCase().indexOf('/edit/') > 0 && document.location.href.toLowerCase().indexOf('/' + this.object.toLowerCase() + '/') > 0) {
                this.refresh();
            }
        });
    }
    componentDidRender() {
        dependencies.processAllDependencies((this.filter ? false : true), jquery(this.me).find('form'), this.obj.properties, this.cToken).then(() => {
            if (this.page && this.page.JSAfterLoad) {
                util.execDynamicCode(this.page.JSAfterLoad);
            }
        });
        jquery(this.me).find('ion-datetime[property], ion-toggle[property], ion-checkbox[property]').on('ionChange', (ev) => {
            let PropertyName = jquery(ev.currentTarget).attr('property');
            dependencies.processPropDependency(true, jquery(this.me).find('form'), this.obj.properties.filter((itm) => { return itm.PropertyName == PropertyName; })[0], this.cToken);
        });
        jquery(this.me).find('[property]').not('ion-datetime, ion-toggle, ion-checkbox').on('change', (ev) => {
            let PropertyName = jquery(ev.currentTarget).attr('property');
            dependencies.processPropDependency(true, jquery(this.me).find('form'), this.obj.properties.filter((itm) => { return itm.PropertyName == PropertyName; })[0], this.cToken);
        });
        jquery(this.me).find('ion-input[inputmode="decimal"]').on('ionChange', (ev) => {
            if (!jquery(ev.currentTarget).attr("step"))
                return;
            let currentVal = jquery(ev.currentTarget).val();
            let maxLenght = jquery(ev.currentTarget).attr("step").split('.')[1].length;
            if (currentVal.split('.').length > 1 && currentVal.split('.')[1].length > maxLenght) {
                let finalValue = currentVal.match('^-?\\d+(?:\.\\d{0,' + maxLenght + '})?')[0];
                jquery(ev.currentTarget).val(finalValue);
                jquery(ev.currentTarget).find('> input').val(finalValue);
            }
        });
        this.initSQLValidator();
        this.initRegularExValidator();
    }
    async refresh() {
        this.object = (this.object) ? decodeURIComponent(this.object) : null;
        this.pageName = (this.pageName) ? decodeURIComponent(this.pageName) : null;
        this.filter = (this.filter) ? decodeURIComponent(this.filter) : null;
        this.defaults = (this.defaults) ? decodeURIComponent(this.defaults) : null;
        return this.loadData().catch((e) => {
            msg.showError(e);
        });
    }
    async loadData() {
        this.cToken = await ConftokenProvider.config();
        this.obj = this.cToken.objectConfig[this.object];
        this.page = parser.findTemplate(this.obj, 'edit', this.pageName);
        if (!this.obj) {
            throw new Error('Object doesn\'t exists.');
        }
        if (this.filter) {
            let sentence = 'select * from ' + this.obj.tableName;
            sentence += ' WHERE ' + this.filter;
            await sql.getTable(sentence).then(async (table) => {
                if (table && table.rows && table.rows.length > 0) {
                    let row = sql.getRow(table, 0);
                    row['_isNew'] = 0;
                    if (this.page) {
                        let def = null;
                        if (this.defaults) {
                            def = util.parseJSON(this.defaults);
                        }
                        this.title = await parser.recursiveCompile(row, this.page.title, this.cToken, this);
                        if (this.page.body) {
                            let body = this.page.body;
                            body = await parser.recursiveCompile(row, body, this.cToken, this);
                            if (def) {
                                body = await parser.recursiveCompile(def, body, this.cToken, this);
                            }
                            this.body = body;
                        }
                        if (this.page.header) {
                            let header = this.page.header;
                            header = await parser.recursiveCompile(row, header, this.cToken, this);
                            if (def) {
                                header = await parser.recursiveCompile(def, header, this.cToken, this);
                            }
                            this.header = header;
                        }
                        if (this.page.footer) {
                            let footer = this.page.footer;
                            footer = await parser.recursiveCompile(row, footer, this.cToken, this);
                            if (def) {
                                footer = await parser.recursiveCompile(def, footer, this.cToken, this);
                            }
                            this.footer = footer;
                        }
                    }
                    else {
                        this.title = await parser.recursiveCompile(row, this.obj.parsedDescrip, this.cToken, this);
                        this.body = await parser.recursiveCompile(row, this.bodyTemplate, this.cToken, this);
                        this.footer = this.footerTemplate;
                    }
                }
                else {
                    //error objecto no encontrado.
                    throw new Error('Object doesn\'t exists.');
                }
            });
        }
        else {
            let def = null;
            if (this.defaults) {
                def = util.parseJSON(this.defaults);
            }
            //Set default values
            let values = new Object();
            for (let i = 0; i < this.obj.properties.length; i++) {
                let prop = this.obj.properties[i];
                if (prop.DefaultValue != null && prop.DefaultValue != '') {
                    values[prop.PropertyName] = await parser.recursiveCompile(null, prop.DefaultValue, this.cToken);
                }
                if (prop.AutoIncrement) {
                    let sentence;
                    if (prop.AutoIncrementFunction) {
                        sentence = await parser.recursiveCompile(def, prop.AutoIncrementFunction, this.cToken);
                    }
                    else {
                        sentence = 'select Max(`' + prop.PropertyName + '`) +1 from `' + this.obj.tableName + '`';
                    }
                    try {
                        let val = await sql.getValue(sentence);
                        if (val == null) {
                            values[prop.PropertyName] = 0;
                        }
                        else {
                            values[prop.PropertyName] = val;
                        }
                    }
                    catch (e) {
                        msg.showError(e);
                    }
                }
            }
            if (def) {
                for (let key in def) {
                    values[key] = def[key];
                }
            }
            values['_isNew'] = 1;
            if (this.page) {
                this.title = await parser.recursiveCompile(values, this.page.title, this.cToken, this);
                if (this.page.body) {
                    this.body = await parser.recursiveCompile(values, this.page.body, this.cToken, this);
                }
                if (this.page.footer) {
                    this.footer = await parser.recursiveCompile(values, this.page.footer, this.cToken, this);
                }
                if (this.page.header) {
                    this.header = await parser.recursiveCompile(values, this.page.header, this.cToken, this);
                }
            }
            else {
                this.title = await parser.recursiveCompile(values, this.obj.descrip, this.cToken, this);
                this.body = await parser.recursiveCompile(values, this.bodyTemplate, this.cToken, this);
                this.footer = this.footerTemplate;
            }
        }
        this.initValidate();
    }
    initValidate() {
        jquery('flx-edit').find('form').validate({
            ignore: '',
            unhighlight: (element, _errorClass, _validClass) => {
                jquery(element).parent().addClass('has-success').removeClass('has-error');
            },
            highlight: (element, _errorClass, _validClass) => {
                jquery(element).parent().removeClass('has-success').addClass('has-error');
            },
            errorPlacement: (error, element) => {
                if (jquery(element).closest('flx-radio').length > 0) {
                    error.css("display", 'block');
                    error.insertAfter(jquery(element).parent().parent()[0]);
                }
                else {
                    error.insertAfter(jquery(element).parent()[0]);
                }
            },
            errorClass: 'txt-danger'
        });
    }
    async getProperties(values) {
        let form = document.createElement('form');
        jquery(form).addClass('form');
        let properties = parser.sortObject(this.obj.properties, 'PositionY', 'PositionX');
        let row;
        let posY = -1;
        for (let i = 0; i < properties.length; i++) {
            if (properties[i].PositionY != posY) {
                posY = properties[i].PositionY;
                row = document.createElement('ion-row');
                form.appendChild(row);
            }
            let column = document.createElement('ion-col');
            column.setAttribute('size', properties[i].Width);
            if (properties[i].ControlType == 'separator') {
                let itm = document.createElement('ion-item-divider');
                itm.setAttribute('container', properties[i].PropertyName);
                if (properties[i].Hide) {
                    itm.setAttribute('style', 'display:none');
                }
                if (properties[i].CSSClass) {
                    itm.setAttribute('class', properties[i].CSSClass);
                }
                itm.appendChild(this.getLabel(properties[i], false));
                form.appendChild(itm);
            }
            else if (properties[i].ControlType != 'placeholder') {
                let itm = document.createElement('ion-item');
                itm.setAttribute('container', properties[i].PropertyName);
                if (properties[i].Hide) {
                    column.setAttribute('style', 'display:none');
                }
                let prop = this.getProperty(properties[i]);
                let propName = properties[i].PropertyName.toLowerCase();
                if (properties[i].PersistDefaultValue) {
                    let def = properties[i].DefaultValue;
                    if (def != null && def != '') {
                        prop.setAttribute('value', await parser.recursiveCompile(null, def, this.cToken));
                        itm.classList.add('item-has-value');
                    }
                }
                else if (values && typeof values[propName] && values[propName] != null) {
                    if (jquery(prop).is('ion-checkbox, ion-toggle')) {
                        if (values[propName] == 1 || values[propName] == 'true' || values[propName] == '1') {
                            jquery(prop).attr('checked', true);
                        }
                    }
                    else {
                        if (prop.localName === 'ion-datetime') {
                            if (properties[i].ControlType.toLowerCase() === 'time') {
                                prop.setAttribute('value', values[propName]);
                            }
                            else {
                                prop.setAttribute('value', moment(values[propName]).format('YYYY-MM-DDTHH:mm:ss'));
                            }
                        }
                        else
                            prop.setAttribute('value', values[propName]);
                    }
                    itm.classList.add('item-has-value');
                }
                else if (jquery(prop).is('ion-checkbox, ion-toggle')) {
                    itm.classList.add('item-has-value');
                }
                if (properties[i].Locked) {
                    if (properties[i].ControlType === 'whiteboard') {
                        itm.setAttribute('disabled', 'true');
                    }
                }
                if (jquery(prop).is('ion-textarea'))
                    jquery(prop).attr('rows', properties[i].Height);
                itm.appendChild(this.getLabel(properties[i], true));
                itm.appendChild(prop);
                column.appendChild(itm);
                row.appendChild(column);
            }
            else {
                let itm = document.createElement('ion-item');
                itm.setAttribute('container', properties[i].PropertyName);
                if (properties[i].CSSClass) {
                    itm.setAttribute('class', properties[i].CSSClass);
                }
                if (properties[i].Hide) {
                    column.setAttribute('style', 'display:none');
                }
                else {
                    column.setAttribute('style', 'visibility:hidden');
                }
                let prop = document.createElement('ion-textarea');
                jquery(prop).attr('rows', properties[i].Height);
                itm.appendChild(this.getLabel(properties[i], true));
                itm.appendChild(prop);
                column.appendChild(itm);
                row.appendChild(column);
            }
        }
        return form.outerHTML;
    }
    getLabel(prop, floating) {
        let lbl = document.createElement('ion-label');
        lbl.setAttribute('color', 'header');
        if (floating) {
            lbl.setAttribute('position', 'floating');
        }
        else {
            if (prop.IsRequired) {
                lbl.innerHTML += ' *';
            }
        }
        if (prop.LabelStyle) {
            lbl.setAttribute('style', prop.LabelStyle);
        }
        if (prop.LabelCSSClass) {
            lbl.setAttribute('class', prop.LabelCSSClass);
        }
        if (prop.Label) {
            lbl.innerHTML = prop.Label;
        }
        else {
            lbl.innerHTML = prop.PropertyName;
        }
        return lbl;
    }
    getProperty(prop) {
        let input = jquery('<' + prop.WebComponent + ' />')[0];
        if (jquery(input).is('flx-dbcombo')) {
            input.setAttribute('value', '');
        }
        if (jquery(input).is('ion-datetime')) {
            input.setAttribute('done-text', util.translate('msg.ok'));
            input.setAttribute('cancel-text', util.translate('msg.cancel'));
            if (prop.ControlType.toLowerCase() == 'date') {
                input.setAttribute('display-format', moment.localeData(this.cToken.user.currentUserCultureId).longDateFormat('L'));
            }
            else if (prop.ControlType.toLowerCase() == 'datetime') {
                input.setAttribute('display-format', moment.localeData(this.cToken.user.currentUserCultureId).longDateFormat('L') + ' ' + moment.localeData(this.cToken.user.currentUserCultureId).longDateFormat('LT'));
            }
            else if (prop.ControlType.toLowerCase() == 'time') {
                input.setAttribute('display-format', moment.localeData(this.cToken.user.currentUserCultureId).longDateFormat('LT'));
            }
        }
        input.setAttribute('name', prop.PropertyName);
        input.setAttribute('property', prop.PropertyName);
        if (prop.PlaceHolder) {
            input.setAttribute('placeHolder', prop.PlaceHolder);
        }
        ;
        if (prop.Locked) {
            input.setAttribute('disabled', 'true');
        }
        if (prop.IsRequired) {
            input.setAttribute('required', 'true');
        }
        if (prop.IsRequiredMessage) {
            input.setAttribute('data-msg-required', prop.IsRequiredMessage);
        }
        if (prop.MinValue) {
            input.setAttribute('min', prop.MinValue.toString());
        }
        if (prop.MaxValue) {
            input.setAttribute('max', prop.MaxValue.toString());
        }
        if (prop.MinValueMessage) {
            input.setAttribute('data-msg-min', prop.MinValueMessage.toString());
        }
        if (prop.MaxValueMessage) {
            input.setAttribute('data-msg-max', prop.MaxValueMessage.toString());
        }
        if (prop.Style) {
            input.setAttribute('style', prop.Style);
        }
        if (prop.CSSClass) {
            input.setAttribute('class', prop.CSSClass);
        }
        if (prop.SQLValueField) {
            input.setAttribute('valuefield', prop.SQLValueField);
        }
        if (prop.ValidatorMessage) {
            input.setAttribute('data-msg-sqlvalidator', prop.ValidatorMessage);
        }
        if (prop.RegExpText) {
            input.setAttribute('data-msg-regex', prop.RegExpText);
        }
        let orderBy;
        if (prop.SQLDisplayField) {
            input.setAttribute('displayfield', prop.SQLDisplayField);
            orderBy = `\`${prop.SQLDisplayField}\` asc`;
        }
        if (prop.SQLOrderBy) {
            orderBy = prop.SQLOrderBy;
        }
        if (orderBy) {
            input.setAttribute('orderBy', orderBy);
        }
        let sentence;
        if (prop.SQLSentence) {
            sentence = prop.SQLSentence;
        }
        else if (prop.SQLTableName) {
            sentence = `select \`${prop.SQLValueField}\`, \`${prop.SQLDisplayField}\` from \`${prop.SQLTableName}\``;
        }
        else if (prop.SQLObjectName) {
            sentence = `select \`${prop.SQLValueField}\`, \`${prop.SQLDisplayField}\` from \`${this.cToken.objectConfig[prop.SQLObjectName].tableName}\``;
        }
        if (sentence) {
            input.setAttribute('sqlsentence', sentence);
        }
        if (prop.SQLFilter) {
            input.setAttribute('sqlfilter', prop.SQLFilter);
        }
        if (prop.Autoselect) {
            input.setAttribute('autoselect', String(prop.Autoselect).toLowerCase());
        }
        if (prop.Template) {
            jquery(input).append(jquery('<script class="comboTemplate" type="text/template"></script>').text(prop.Template.replace(/{/g, "&#123;").replace(/}/g, "&#125;")));
        }
        if (prop.DecimalPlaces && prop.DecimalPlaces > 0) {
            let step = '0.';
            for (let i = 1; i <= prop.DecimalPlaces; i++) {
                if (i === prop.DecimalPlaces) {
                    step += '1';
                }
                else {
                    step += '0';
                }
            }
            input.setAttribute('step', step);
        }
        return input;
    }
    initSQLValidator() {
        for (let i = 0; i < this.obj.properties.length; i++) {
            let prop = this.obj.properties[i];
            if (prop.SQLValidator) {
                let inputElement = document.getElementsByName(prop.PropertyName)[0];
                if (inputElement) {
                    const blurType = (inputElement.outerHTML.startsWith('<ion-input') ? 'ionBlur' : 'blur');
                    inputElement.addEventListener(blurType, () => {
                        let inputs = [];
                        let sqlValidator = prop.SQLValidator;
                        while (sqlValidator.includes("{{") && sqlValidator.includes("}}")) {
                            let sqlValue = sqlValidator.substring(sqlValidator.indexOf("{{") + 2, sqlValidator.indexOf("}}"));
                            sqlValidator = sqlValidator.replace("{{" + sqlValue + "}}", "?");
                            inputs.push(document.getElementsByName(sqlValue)[0].value);
                        }
                        sql.getValue(sqlValidator, inputs).then((value) => {
                            inputElement.closest('ion-item').setAttribute('sqlvalidator', value);
                            if (blurType === 'ionBlur') {
                                inputElement.children[0].setAttribute('data-msg-sqlvalidator', inputElement.getAttribute('data-msg-sqlvalidator'));
                                inputElement.children[0].setAttribute('sqlvalidator', value);
                            }
                            else
                                inputElement.setAttribute('sqlvalidator', value);
                        });
                    }, false);
                }
            }
        }
    }
    initRegularExValidator() {
        for (let i = 0; i < this.obj.properties.length; i++) {
            let prop = this.obj.properties[i];
            if (prop.RegExp) {
                let inputElement = document.getElementsByName(prop.PropertyName)[0];
                if (inputElement) {
                    const blurType = (inputElement.outerHTML.startsWith('<ion-input') ? 'ionBlur' : 'blur');
                    inputElement.addEventListener(blurType, () => {
                        inputElement.closest('ion-item').setAttribute('regex', prop.RegExp);
                        if (blurType === 'ionBlur') {
                            inputElement.children[0].setAttribute('data-msg-regex', inputElement.getAttribute('data-msg-regex'));
                            inputElement.children[0].setAttribute('regex', prop.RegExp);
                        }
                        else
                            inputElement.setAttribute('regex', prop.RegExp);
                    }, false);
                }
            }
        }
    }
    render() {
        return [
            h("ion-header", null, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "start" }, (this.modal ? null : h("ion-menu-button", { color: "outstanding" })), (this.modal ? null : h("ion-icon", { name: "alert-circle", color: "danger", class: "stack sendError flx-hide" }))), h("ion-title", null, h("span", { id: "menuTitle" }, this.title)), h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav.goBack(this.me); } }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" }))))),
            h("ion-header", { innerHTML: this.header }),
            h("ion-content", { innerHTML: this.body }),
            h("ion-footer", { innerHTML: this.footer })
        ];
    }
    get me() { return getElement(this); }
};
FlxEdit.style = flxEditCss;

export { FlxEdit as flx_edit };
