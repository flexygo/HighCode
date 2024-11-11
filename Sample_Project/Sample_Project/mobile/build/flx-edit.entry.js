import { r as registerInstance, k as h, m as getElement } from './index-8e5b11cb.js';
import { s as sql, k as flxSync, u as util, m as msg, C as ConftokenProvider, n as nav } from './conftoken-89472368.js';
import { p as parser } from './parser-e9709966.js';
import { j as jquery } from './jquery-34624bb9.js';
import './jquery-validate-flexygo-b272e167.js';
import './process-es6-cc264d03.js';
import './utils-224de961.js';
import './animation-b4670628.js';
import './helpers-7ecb2fa5.js';
import './ios.transition-e14f38db.js';
import './index-c59a2c3f.js';
import './md.transition-8bd31aee.js';
import './cubic-bezier-ed243a9b.js';
import './index-d086042f.js';
import './ionic-global-6d118971.js';
import './index-cc97b114.js';
import './index-81d32235.js';
import './hardware-back-button-508e48cf.js';
import './overlays-cda44124.js';
import './_commonjsHelpers-2a12c1e6.js';

var dependencies;
(function (dependencies) {
  async function processAllDependencies(isNew, form, props, conf) {
    if (form.length > 0 && props) {
      for (let i = 0; i < props.length; i++) {
        if (props[i].DependingProperties.length > 0) {
          await processPropDependency(isNew, form, props[i], conf, props);
        }
      }
    }
  }
  dependencies.processAllDependencies = processAllDependencies;
  async function processPropDependency(isNew, form, prop, conf, props) {
    if (form.length > 0 && prop) {
      for (let i = 0; i < prop.DependingProperties.length; i++) {
        processDependency(isNew, form, prop.DependingProperties[i], conf.user, props);
      }
    }
  }
  dependencies.processPropDependency = processPropDependency;
  async function processDependency(isNew, form, dep, tokens, props) {
    //Enabled dependencies  props.find((el) => el.PropertyName==='Semester1')
    execEnabledDependency(form, dep, tokens);
    //Visibility dependencies
    execVisibilityDependency(form, dep, tokens);
    //Required dependencies
    execRequiredDependency(form, dep, tokens);
    //Combo Items dependencies
    execComboDependency(form, dep, tokens, isNew);
    //withValue Value dependencies
    const dependant_property = props.find((el) => el.PropertyName === dep.DependantPropertyName); //We get the dependant property to look for the possibility of it being a detached property
    if (isNew || (dependant_property === null || dependant_property === void 0 ? void 0 : dependant_property.DetachedFromDB)) {
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
      const dependant_property = form.find('[property=' + dep.DependantPropertyName + ']');
      if (dep.SQLComboSentence) {
        dependant_property.attr('sqlsentence', parseSQLdependency(dep.SQLComboSentence, form, tokens));
        sqlSentence = dependant_property.attr('sqlsentence');
      }
      else if (dep.SQLComboFilter) {
        dependant_property.attr('filter', parseSQLdependency(dep.SQLComboFilter, form, tokens));
        sqlSentence = sql.addWhere(dependant_property.attr('sqlsentence'), dependant_property.attr('filter'));
      }
      if (withValue && sqlSentence) {
        //If the combo has a value we check if we must remove it or not depending on the new sql
        sql.getTable(sqlSentence).then((tbl) => {
          const rows = sql.getRows(tbl);
          const value_field = dependant_property.attr('valuefield');
          const current_value = dependant_property.val();
          if (current_value != null && current_value !== "" && !rows.some(row => row[value_field] == current_value)) {
            dependant_property.val(null);
          }
        });
      }
      else if (sqlSentence && dependant_property.attr('autoselect') && withValue) {
        sql.getTable(sqlSentence).then((tbl) => {
          if (tbl.rows.length === 1) {
            dependant_property.val(sql.getRow(tbl, 0)[dependant_property.attr('valuefield')]);
          }
        });
      }
    }
  }
  async function execValueDependency(form, dep, tokens) {
    if (dep.SQLValue) {
      const form_js = form[0];
      form_js.is_executing_value_dep = true;
      let value = await sql.getValue(parseSQLdependency(dep.SQLValue, form, tokens));
      let prop = form.find('[property=' + dep.DependantPropertyName + ']');
      let is_custom_component = false;
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
        is_custom_component = prop.is('flx-combo') || prop.is('flx-dbcombo') || prop.is('flx-multicombo');
        if (is_custom_component && (!prop.attr('cascadedependencies') || prop.attr('cascadedependencies') === 'false')) {
          prop.attr('avoid_dependencies', 'true');
        }
        prop.val(value);
      }
      if (prop.attr('cascadedependencies') === 'true') {
        prop.trigger('change');
      }
      prop[0].removeAttribute('avoid_dependencies');
      form_js.is_executing_value_dep = false;
      if (form_js.save_function)
        form_js.save_function();
    }
  }
  async function execCssClassDependency(form, dep, tokens) {
    if (dep.SQLClass) {
      let value = await sql.getValue(parseSQLdependency(dep.SQLClass, form, tokens));
      const current_input = form[0].querySelector('[property=' + dep.DependantPropertyName + ']');
      if (current_input.last_dependency_class)
        current_input.classList.remove(current_input.last_dependency_class);
      current_input.classList.add(value);
      current_input.last_dependency_class = value;
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
        if (currentValue.toString().toLowerCase() === positiveValues[i].toString().toLowerCase()) {
          dependencyReturn = true;
          break;
        }
      }
    }
    else if (negativeValues && negativeValues.length > 0) {
      dependencyReturn = true;
      let currentValue = getCurrentValue(form.find('[property=' + propertyName + ']'));
      for (let i = 0; i < negativeValues.length; i++) {
        if (currentValue.toString().toLowerCase() === negativeValues[i].toString().toLowerCase()) {
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

const flxEditCss = "label.error{color:red;float:right;position:absolute;bottom:0px;right:0px;font-size:0.8em}[sqlvalidator=\"0\"] label.error{position:static}";

const FlxEdit = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.bodyTemplate = '{{getProperties(json)}}';
    this.footerTemplate = '<ion-fab vertical="bottom" horizontal="end" slot="fixed"><ion-fab-button onclick="flexygo.forms.save(this,event,true).catch(err => {flexygo.msg.showError(err)});"><i class="flx-icon icon-save-21" ></i></ion-fab-button></ion-fab>';
    this.object = undefined;
    this.pageName = undefined;
    this.filter = undefined;
    this.defaults = undefined;
    this.modal = false;
    this.body = undefined;
    this.header = undefined;
    this.footer = undefined;
    this.title = undefined;
  }
  componentDidLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'hidden');
    flxSync.checkSendErrors();
  }
  componentWillLoad() {
    jquery('#loadingSpinnerModule').css('visibility', 'visible');
    this.refresh(true);
    jquery(window).off('popstate.edit' + this.pageName).on('popstate.edit' + this.pageName, () => {
      if (document.location.href.toLowerCase().indexOf('/edit/') > 0 && document.location.href.toLowerCase().indexOf('/' + this.object.toLowerCase() + '/') > 0) {
        this.refresh(true);
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
      dependencies.processPropDependency(true, jquery(this.me).find('form'), this.obj.properties.filter((itm) => { return itm.PropertyName == PropertyName; })[0], this.cToken, this.obj.properties);
    });
    jquery(this.me).find('[property]').not('ion-datetime, ion-toggle, ion-checkbox').on('change', (ev) => {
      let PropertyName = jquery(ev.currentTarget).attr('property');
      dependencies.processPropDependency(true, jquery(this.me).find('form'), this.obj.properties.filter((itm) => { return itm.PropertyName == PropertyName; })[0], this.cToken, this.obj.properties);
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
  async refresh(firstTime = false) {
    this.object = (this.object) ? decodeURIComponent(this.object) : null;
    this.pageName = (this.pageName) ? decodeURIComponent(this.pageName) : null;
    this.filter = (this.filter) ? decodeURIComponent(this.filter) : null;
    this.defaults = (this.defaults) ? decodeURIComponent(this.defaults) : null;
    return this.loadData().then(() => {
      var _a;
      if (!firstTime && ((_a = this.page) === null || _a === void 0 ? void 0 : _a.JSAfterLoad))
        util.execDynamicCode(this.page.JSAfterLoad);
    }).catch((e) => {
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
    if (prop.CascadeDependencies)
      input.setAttribute('CascadeDependencies', prop.CascadeDependencies + '');
    if (prop.CSSClass) {
      input.setAttribute('class', prop.CSSClass);
    }
    if (prop.PlaceHolder) {
      input.setAttribute('placeHolder', prop.PlaceHolder);
    }
    ;
    if (prop.IsRequired) {
      input.setAttribute('required', 'true');
    }
    if (prop.IsRequiredMessage) {
      input.setAttribute('data-msg-required', prop.IsRequiredMessage);
    }
    if (prop.Locked) {
      input.setAttribute('disabled', 'true');
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
    if (prop.RegExpText) {
      input.setAttribute('data-msg-regex', prop.RegExpText);
    }
    if (prop.Separator && prop.ControlType === 'multicombo')
      input.setAttribute('separator', prop.Separator);
    if (prop.SQLValueField) {
      input.setAttribute('valuefield', prop.SQLValueField);
    }
    if (prop.Style) {
      input.setAttribute('style', prop.Style);
    }
    if (prop.ValidatorMessage) {
      input.setAttribute('data-msg-sqlvalidator', prop.ValidatorMessage);
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
      this.setSQLValidator(prop);
    }
  }
  setSQLValidator(prop) {
    if (!prop.SQLValidator)
      return;
    const input_element = document.getElementsByName(prop.PropertyName)[0];
    if (!input_element)
      return;
    //For Custom Flexygo Inputs
    const is_flx_element = input_element.nodeName.startsWith('FLX-');
    if (is_flx_element) {
      input_element.sqlValidatorFunction = () => {
        this.sqlValidatorFunction(prop, input_element, 'ionBlur');
      };
      return;
    }
    //For Standard HTML/IONIC Inputs
    const is_ionic_element = input_element.nodeName.startsWith('ION-');
    const blur_type = is_ionic_element ? 'ionBlur' : 'blur';
    input_element.addEventListener(blur_type, () => {
      this.sqlValidatorFunction(prop, input_element, blur_type);
    }, false);
  }
  sqlValidatorFunction(prop, input_element, blurType) {
    let inputs = [];
    let sqlValidator = prop.SQLValidator;
    while (sqlValidator.includes("{{") && sqlValidator.includes("}}")) {
      let sqlValue = sqlValidator.substring(sqlValidator.indexOf("{{") + 2, sqlValidator.indexOf("}}"));
      sqlValidator = sqlValidator.replace("{{" + sqlValue + "}}", "?");
      inputs.push(document.getElementsByName(sqlValue)[0].value);
    }
    sql.getValue(sqlValidator, inputs).then((value) => {
      input_element.closest('ion-item').setAttribute('sqlvalidator', value);
      if (blurType === 'ionBlur') {
        const html_input_element = input_element.querySelector('input, textarea');
        html_input_element.setAttribute('data-msg-sqlvalidator', input_element.getAttribute('data-msg-sqlvalidator'));
        html_input_element.setAttribute('sqlvalidator', value);
        //In FLX-DBCombo we don't add the sqlvalidator attribute to avoid the message error duplication when deleting its value
        if (input_element.nodeName !== 'FLX-DBCOMBO')
          input_element.setAttribute('sqlvalidator', value);
      }
      else
        input_element.setAttribute('sqlvalidator', value);
    });
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
