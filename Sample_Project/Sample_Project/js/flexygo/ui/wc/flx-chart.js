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
           * Library for the flx-chartElement web component.
           *
           * @class FlxChartElement
           * @constructor
           * @return {FlxChartElement} .
           */
            class FlxChartElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.data = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.moduleName = element.attr("ModuleName");
                    this.data = element.attr('value');
                    this.AdditionalWhere = element.attr('additionalwhere');
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['ObjectName', 'ObjectWhere', 'modulename', 'value', 'additionalwhere'];
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        if (this.moduleName) {
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() == 'value' && newVal && newVal != '') {
                        this.data = newVal;
                        if (this.data) {
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() == 'additionalwhere' && newVal && newVal != '') {
                        this.AdditionalWhere = newVal;
                        this.refresh();
                    }
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
                    let me = $(this);
                    let params = {
                        ObjectName: (me.attr('ObjectName') ? me.attr('ObjectName') : null),
                        ObjectWhere: (me.attr('ObjectWhere') ? me.attr('ObjectWhere') : null),
                        AdditionalWhere: (this.AdditionalWhere ? this.AdditionalWhere : null),
                        ModuleName: me.attr('ModuleName'),
                        PageName: flexygo.history.getPageName(me)
                    };
                    flexygo.storage.cache.remove('chart', params);
                    if ($(this).attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
               * Init the webcomponent.
               * @method init
               */
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    $(this).closest('flx-module').find('.flx-noInitContent').remove();
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                    me.html('<div><canvas></canvas></div>');
                    if (parentModule.attr("type") != 'flx-list') {
                        let params = {
                            ObjectName: (me.attr('ObjectName') ? me.attr('ObjectName') : null),
                            ObjectWhere: (me.attr('ObjectWhere') ? me.attr('ObjectWhere') : null),
                            AdditionalWhere: (this.AdditionalWhere ? this.AdditionalWhere : null),
                            ModuleName: me.attr('ModuleName'),
                            PageName: flexygo.history.getPageName(me)
                        };
                        /** Read Cache **/
                        let cacheResponse = flexygo.storage.cache.get('chart', params);
                        /** If Cache use cache**/
                        if (cacheResponse) {
                            this.data = cacheResponse.response.Values;
                            this.settings = cacheResponse.response.Settings;
                            this.options = cacheResponse.response.Options;
                            this.Title = cacheResponse.response.Title;
                            this.Labels = cacheResponse.response.Labels;
                            this.Series = cacheResponse.response.Series;
                            this.Values = cacheResponse.response.Value;
                            this.Params = cacheResponse.response.Params;
                            this.type = cacheResponse.response.ChartType;
                            this.Background = cacheResponse.response.ChartBackground;
                            this.Border = cacheResponse.response.ChartBorder;
                            this.MixedChartLabels = cacheResponse.response.MixedChartLabels;
                            this.MixedChartTypes = cacheResponse.response.MixedChartTypes;
                            this.ChartLineBorderDash = cacheResponse.response.ChartLineBorderDash;
                            this.ChartLineFill = cacheResponse.response.ChartLineFill;
                            this.render();
                        }
                        else {
                            flexygo.ajax.post('~/api/Chart', 'GetHTML', params, (response) => {
                                if (response) {
                                    flexygo.storage.cache.add('chart', params, response, response.Cache);
                                    this.data = response.Values;
                                    this.settings = response.Settings;
                                    this.options = response.Options;
                                    this.Title = response.Title;
                                    this.Labels = response.Labels;
                                    this.Series = response.Series;
                                    this.Values = response.Value;
                                    this.Params = response.Params;
                                    this.type = response.ChartType;
                                    this.Background = response.ChartBackground;
                                    this.Border = response.ChartBorder;
                                    this.MixedChartLabels = response.MixedChartLabels;
                                    this.MixedChartTypes = response.MixedChartTypes;
                                    this.ChartLineBorderDash = response.ChartLineBorderDash;
                                    this.ChartLineFill = response.ChartLineFill;
                                    this.render();
                                }
                            }, null, () => { this.stopLoading(); }, () => { this.startLoading(); });
                        }
                    }
                    else {
                        let params = {
                            ChartSettingName: me.attr("chartsetting") ? me.attr("chartsetting") : "syscs-default-legendandlabels"
                        };
                        flexygo.ajax.post('~/api/Chart', 'GetSettings', params, (response) => {
                            if (response) {
                                this.settings = response.Settings;
                                this.render();
                            }
                        }, null, () => { this.stopLoading(); }, () => { this.startLoading(); });
                    }
                }
                /**
                * Renders the chart
                * @method render
                */
                render() {
                    let me = $(this);
                    let name = '';
                    let listModule = me.closest('flx-list');
                    let wcListModule = listModule[0];
                    if (me.attr('type') && me.attr('type') != '') {
                        this.type = me.attr('type');
                    }
                    if (me.attr('options') && me.attr('options') != '') {
                        this.options = me.attr('options');
                    }
                    if (me.attr('series') && me.attr('series') != '') {
                        this.Series = me.attr('series');
                    }
                    if (me.attr('labels') && me.attr('labels') != '') {
                        this.Labels = me.attr('labels');
                    }
                    if (me.attr('value') && me.attr('value') != '') {
                        this.Values = me.attr('value');
                    }
                    if (me.attr('borderdash') && me.attr('borderdash') != '') {
                        this.ChartLineBorderDash = Boolean(me.attr('borderdash'));
                    }
                    if (me.attr('linefill') && me.attr('linefill') != '') {
                        this.ChartLineFill = Boolean(me.attr('linefill'));
                    }
                    if (listModule.attr("mode") === 'list') {
                        this.data = wcListModule.data.length > 0 ? wcListModule.data.map(s => ({ serie: s[this.Series], label: s[this.Labels], value: s[this.Values], borderColor: s["borderColor"], backgroundColor: s["backgroundColor"] })) : wcListModule.data;
                    }
                    if (this.data.length > 0) {
                        let options = {
                            Showlabels: this.settings.ShowLabels,
                            ShowLegend: this.settings.ShowLegend,
                            ShowTitle: this.settings.ShowTitle,
                            LegendPos: this.settings.LegendPos.toLowerCase(),
                            ToolTipBackgroundColor: this.settings.ToolTipBackgroundColor,
                            Title: this.Title,
                            TitleFontSize: this.settings.TitleFontSize,
                            TitleFontColor: this.settings.TitleFontColor,
                            TitlePosition: this.settings.TitlePosition.toLowerCase(),
                            TitleFontStyle: this.settings.TitleFontStyle,
                            Responsive: this.settings.Responsive,
                            AnimationDuration: this.settings.AnimationDuration,
                            AnimationStyle: this.settings.AnimationStyle,
                            BackgroundColor: this.settings.Colors.split("|"),
                            BorderColor: this.settings.BorderColors.split("|"),
                            MinXAxes: this.settings.MinXAxes,
                            MinYAxes: this.settings.MinYAxes,
                        };
                        let defaultOptions = {
                            responsive: options.Responsive,
                            responsiveAnimationDuration: 0,
                            maintainAspectRatio: true,
                            aspectRatio: 2,
                            onResize: null,
                            onHover: null,
                            onClick: null,
                            hover: {
                                mode: 'nearest',
                                intersect: true,
                                animationDuration: 400,
                            },
                            events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
                            animation: {
                                duration: options.AnimationDuration,
                                onProgress: null,
                                onComplete: null,
                                easing: options.AnimationStyle ? options.AnimationStyle : 'easeOutBounce'
                            },
                            legend: {
                                display: options.ShowLegend,
                                position: options.LegendPos,
                                align: 'center',
                                fullWidth: true,
                                onHover: null,
                                onClick: (e, p) => {
                                    let original = Chart.defaults.global.legend.onClick;
                                    let allPageCharts = me.closest('main').find('flx-chart[link-group="' + me.attr('link-group') + '"]');
                                    if (this.options && !flexygo.utils.isBlank(this.options.GroupName)) {
                                        allPageCharts.each((i, e) => {
                                            if (!$(e).is(me)) {
                                                e.toggleLabel(p.text, null, this.options.GroupName);
                                            }
                                        });
                                    }
                                    else {
                                        original.call(this, e, p);
                                    }
                                },
                                onLeave: null,
                                labels: {
                                    boxWidth: 40,
                                    fontSize: 12,
                                    fontStyle: 'normal',
                                    fontColor: '#666',
                                    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                                    padding: 10,
                                    legendCallback: null,
                                    filter: null,
                                    usePointStyle: false
                                }
                            },
                            title: {
                                display: options.ShowTitle,
                                position: options.TitlePosition,
                                fontColor: options.TitleFontColor,
                                fontFamily: options.TitleFontStyle,
                                fontSize: options.TitleFontSize,
                                text: options.Title,
                                fontStyle: 'bold',
                                padding: 10,
                                lineHeight: 1.2
                            },
                            tooltips: {
                                enabled: true,
                                mode: 'point',
                                intersect: true,
                                backgroundColor: options.ToolTipBackgroundColor,
                                titleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                                titleFontSize: 12,
                                titleFontStyle: 'bold',
                                titleFontColor: '#fff',
                                titleAlign: 'left',
                                titleSpacing: 2,
                                titleMarginBottom: 6,
                                bodyFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                                bodyFontSize: 12,
                                bodyFontStyle: 'normal',
                                bodyFontColor: '#fff',
                                bodyAlign: 'left',
                                bodySpacing: 2,
                                footerFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                                footerFontSize: 12,
                                footerFontStyle: 'bold',
                                footerFontColor: '#fff',
                                footerAlign: 'left',
                                footerSpacing: 2,
                                footerMarginTop: 6,
                                xPadding: 6,
                                yPadding: 6,
                                caretPadding: 2,
                                caretSize: 5,
                                cornerRadius: 6,
                                multiKeyBackground: '#fff',
                                displayColors: true,
                                borderColor: 'rgba(0, 0, 0, 0)',
                                borderWidth: 0,
                                rtl: true,
                                textDirection: 'rtl'
                            },
                            stacked: false,
                            elements: {
                                point: {
                                    radius: 5,
                                    pointStyle: 'circle',
                                    rotation: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    borderWidth: 1,
                                    borderColor: 'rgba(0, 0, 0, 0.1)',
                                    hitRadius: 1,
                                    hoverRadius: 6,
                                    hoverBorderWidth: 1
                                },
                                line: {
                                    tension: 0.4,
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    borderWidth: 3,
                                    borderColor: 'rgba(0, 0, 0, 0.1)',
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    capBezierPoints: true,
                                    cubicInterpolationMode: 'default',
                                    fill: false,
                                    stepped: false
                                },
                                rectangle: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    borderWidth: 0,
                                    borderColor: 'rgba(0, 0, 0, 0.1)',
                                    borderSkipped: 'bottom'
                                },
                                arc: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    borderAlign: 'center',
                                    borderColor: '#fff',
                                    borderWidth: 2
                                }
                            },
                        };
                        let original = Chart.defaults.global.legend.onClick;
                        var ctxx = me.find('canvas');
                        let label = [], serie = [], series = [], value = [], mixedLabels = [], backgroundColors = [], borderColor = [], hoverBackgroundColor = [], Datasets = [];
                        for (let i = 0; i < this.data.length; i++) {
                            //Meto todos los labels y las series distintas
                            if (label.indexOf(this.data[i].label) == -1) {
                                label.push(this.data[i].label);
                            }
                            if (serie.indexOf(this.data[i].serie) == -1) {
                                serie.push(this.data[i].serie);
                            }
                            if (mixedLabels.indexOf(this.data[i].chartLabel) == -1) {
                                mixedLabels.push(this.data[i].chartLabel);
                            }
                            if (!this.checkValue(series, this.data[i].serie, this.data[i].chartLabel)) {
                                series.push({ serial: this.data[i].serie, chartLabel: this.data[i].chartLabel, backgroundColor: this.data[i].backgroundColor, borderColor: this.data[i].borderColor });
                            }
                        }
                        switch (this.type) {
                            case 'line':
                                //Para cada serie y label sus valores correspondientes
                                for (let z = 0; z < series.length; z++) {
                                    value = [];
                                    for (let i = 0; i < label.length; i++) {
                                        let valor;
                                        for (let x = 0; x < this.data.length; x++) {
                                            if (label[i] == this.data[x].label && serie[z] == this.data[x].serie) {
                                                valor = parseFloat(this.data[x].value.toString().replace(',', '.'));
                                            }
                                        }
                                        if (!valor) {
                                            valor = 0;
                                        }
                                        value.push(valor);
                                    }
                                    Datasets.push({ label: serie[z], fill: this.ChartLineFill, borderDash: this.ChartLineBorderDash ? [5, 5] : [0, 0], backgroundColor: flexygo.utils.isBlank(series[z]["backgroundColor"]) ? options.BackgroundColor[z] : series[z]["backgroundColor"], borderColor: flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"], data: value });
                                }
                                var optionsLine = {
                                    scales: {
                                        xAxes: [{
                                                display: true,
                                                scaleLabel: {
                                                    display: options.Showlabels,
                                                    labelString: this.Labels
                                                }
                                            }],
                                        yAxes: [{
                                                display: true,
                                                stacked: false,
                                                scaleLabel: {
                                                    display: options.Showlabels,
                                                    labelString: this.Values
                                                }
                                            }]
                                    }
                                };
                                let overwriteOptionsLine = Object.assign({}, defaultOptions, optionsLine);
                                !flexygo.utils.isBlank(this.options) ? overwriteOptionsLine = Object.assign({}, overwriteOptionsLine, JSON.parse(this.options)) : overwriteOptionsLine;
                                this.chart = new Chart(ctxx, {
                                    type: this.type,
                                    data: {
                                        labels: label,
                                        datasets: Datasets
                                    },
                                    options: overwriteOptionsLine
                                });
                                break;
                            case 'bubble':
                                //Para cada serie y label sus valores correspondientes
                                for (let z = 0; z < series.length; z++) {
                                    value = [];
                                    for (let i = 0; i < label.length; i++) {
                                        let valor;
                                        for (let x = 0; x < this.data.length; x++) {
                                            if (label[i] == this.data[x].label && serie[z] == this.data[x].serie) {
                                                valor = parseFloat(this.data[x].value.toString().replace(',', '.'));
                                            }
                                        }
                                        if (!valor) {
                                            valor = 0;
                                        }
                                        value.push({ x: parseFloat(label[i]), y: parseFloat(valor), r: this.getRadiusBubble(parseFloat(valor), Math.max.apply(null, this.data.map(d => d.value)), Math.min.apply(null, this.data.map(d => d.value))) });
                                    }
                                    Datasets.push({ label: serie[z], backgroundColor: flexygo.utils.isBlank(series[z]["backgroundColor"]) ? options.BackgroundColor[z] : series[z]["backgroundColor"], borderColor: flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"], hoverBackgroundColor: flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"], hoverRadius: 0, data: value });
                                }
                                var optionsBubble = {
                                    responsive: options.Responsive,
                                    hoverMode: 'label',
                                    hoverAnimationDuration: 400,
                                    stacked: false,
                                    title: {
                                        display: options.ShowTitle,
                                        position: options.TitlePosition,
                                        fontColor: options.TitleFontColor,
                                        fontFamily: options.TitleFontStyle,
                                        fontSize: options.TitleFontSize,
                                        text: options.Title
                                    },
                                    legend: {
                                        position: options.LegendPos,
                                        display: options.ShowLegend,
                                        onClick: (e, p) => {
                                            let original = Chart.defaults.global.legend.onClick;
                                            let allPageCharts = me.closest('main').find('flx-chart[link-group="' + me.attr('link-group') + '"]');
                                            if (this.options && !flexygo.utils.isBlank(this.options.GroupName)) {
                                                allPageCharts.each((i, e) => {
                                                    if (!$(e).is(me)) {
                                                        e.toggleLabel(p.text, null, this.options.GroupName);
                                                    }
                                                });
                                            }
                                            else {
                                                original.call(this, e, p);
                                            }
                                        }
                                    },
                                    elements: {
                                        points: {
                                            borderWidth: 1,
                                            borderColor: 'rgb(0, 0, 0)'
                                        }
                                    },
                                    scales: {
                                        xAxes: [{
                                                scaleLabel: {
                                                    display: options.Showlabels,
                                                    labelString: this.Labels
                                                },
                                                ticks: {
                                                    display: options.Showlabels
                                                }
                                            }],
                                        yAxes: [{
                                                scaleLabel: {
                                                    display: options.Showlabels,
                                                    labelString: this.Values
                                                },
                                                ticks: {
                                                    display: options.Showlabels
                                                }
                                            }]
                                    },
                                    tooltips: {
                                        backgroundColor: options.ToolTipBackgroundColor
                                    }
                                };
                                let overwriteOptionsBubble = Object.assign({}, defaultOptions, optionsBubble);
                                !flexygo.utils.isBlank(this.options) ? overwriteOptionsBubble = Object.assign({}, overwriteOptionsBubble, JSON.parse(this.options)) : overwriteOptionsBubble;
                                this.chart = new Chart(ctxx, {
                                    type: this.type,
                                    data: {
                                        datasets: Datasets
                                    },
                                    options: overwriteOptionsBubble
                                });
                                break;
                            case 'doughnut':
                            case 'semidoughnut':
                                //Para cada serie y label sus valores correspondientes
                                value = [];
                                for (let z = 0; z < series.length; z++) {
                                    //for (let i = 0; i < label.length; i++) {
                                    let valor;
                                    for (let x = 0; x < this.data.length; x++) {
                                        if (series[z]["serial"] == this.data[x].serie) {
                                            valor = parseFloat(this.data[x].value.toString().replace(',', '.'));
                                        }
                                    }
                                    if (!valor) {
                                        valor = 0;
                                    }
                                    value.push(valor);
                                    // }
                                    backgroundColors.push(flexygo.utils.isBlank(series[z]["backgroundColor"]) ? options.BackgroundColor[z] : series[z]["backgroundColor"]);
                                    borderColor.push(flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"]);
                                    hoverBackgroundColor.push(flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"]);
                                    //, label: series[z]["serial"]
                                }
                                Datasets.push({ data: value, backgroundColor: backgroundColors, borderColor: borderColor, hoverBackgroundColor: hoverBackgroundColor });
                                var optionsDoughnut = {
                                    circumference: this.type == 'doughnut' ? 2 * Math.PI : Math.PI,
                                    rotation: this.type == 'doughnut' ? -Math.PI / 2 : -Math.PI,
                                    legend: {
                                        position: options.LegendPos,
                                        display: options.ShowLegend,
                                        onClick: (e, p) => {
                                            original = Chart.defaults.doughnut.legend.onClick;
                                            original.call(this, e, p);
                                            var allPageCharts = me.closest('main').find('flx-chart[link-group="' + me.attr('link-group') + '"]');
                                            if (this.options && !flexygo.utils.isBlank(this.options.GroupName)) {
                                                allPageCharts.each((i, e) => {
                                                    if (!$(e).is(me)) {
                                                        e.toggleLabel(p.text, null, this.options.GroupName);
                                                    }
                                                });
                                            }
                                        }
                                    }
                                };
                                let overwriteOptionsDoughnut = Object.assign({}, defaultOptions, optionsDoughnut);
                                !flexygo.utils.isBlank(this.options) ? overwriteOptionsDoughnut = Object.assign({}, overwriteOptionsDoughnut, JSON.parse(this.options)) : overwriteOptionsDoughnut;
                                this.chart = new Chart(ctxx, {
                                    type: 'doughnut',
                                    data: {
                                        labels: serie,
                                        datasets: Datasets
                                    },
                                    options: overwriteOptionsDoughnut
                                });
                                break;
                            case 'radar':
                                //Para cada serie y label sus valores correspondientes
                                for (let z = 0; z < series.length; z++) {
                                    value = [];
                                    for (let i = 0; i < label.length; i++) {
                                        let valor;
                                        for (let x = 0; x < this.data.length; x++) {
                                            if (label[i] == this.data[x].label && serie[z] == this.data[x].serie) {
                                                valor = parseFloat(this.data[x].value.toString().replace(',', '.'));
                                            }
                                        }
                                        if (!valor) {
                                            valor = 0;
                                        }
                                        value.push(valor);
                                    }
                                    Datasets.push({ label: serie[z], backgroundColor: flexygo.utils.isBlank(series[z]["backgroundColor"]) ? options.BackgroundColor[z] : series[z]["backgroundColor"], borderColor: flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"], data: value });
                                }
                                var optionsRadar = {
                                    responsive: options.Responsive,
                                    hoverMode: 'label',
                                    hoverAnimationDuration: 400,
                                    stacked: false,
                                    title: {
                                        display: options.ShowTitle,
                                        position: options.TitlePosition,
                                        fontColor: options.TitleFontColor,
                                        fontFamily: options.TitleFontStyle,
                                        fontSize: options.TitleFontSize,
                                        text: options.Title
                                    },
                                    animation: {
                                        animateScale: options.animateScale !== "False",
                                        animateRotate: options.animateRotate !== "False",
                                        duration: options.AnimationDuration
                                    },
                                    legend: {
                                        position: options.LegendPos,
                                        display: options.ShowLegend,
                                        onClick: (e, p) => {
                                            original.call(this, e, p);
                                            var allPageCharts = me.closest('main').find('flx-chart[link-group="' + me.attr('link-group') + '"]');
                                            if (this.options && !flexygo.utils.isBlank(this.options.GroupName)) {
                                                allPageCharts.each((i, e) => {
                                                    if (!$(e).is(me)) {
                                                        e.toggleLabel(p.text, null, this.options.GroupName);
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    scale: {
                                        reverse: false,
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    },
                                    tooltips: {
                                        backgroundColor: options.ToolTipBackgroundColor
                                    },
                                };
                                let overwriteOptionsRadar = Object.assign({}, defaultOptions, optionsRadar);
                                !flexygo.utils.isBlank(this.options) ? overwriteOptionsRadar = Object.assign({}, overwriteOptionsRadar, JSON.parse(this.options)) : overwriteOptionsRadar;
                                this.chart = new Chart(ctxx, {
                                    type: this.type,
                                    data: {
                                        labels: label,
                                        datasets: Datasets
                                    },
                                    options: overwriteOptionsRadar
                                });
                                break;
                            case 'polarArea':
                            case 'polararea':
                                //Para cada serie y label sus valores correspondientes
                                value = [];
                                for (let z = 0; z < series.length; z++) {
                                    //for (let i = 0; i < label.length; i++) {
                                    let valor;
                                    for (let x = 0; x < this.data.length; x++) {
                                        if (series[z]["serial"] == this.data[x].serie) {
                                            valor = parseFloat(this.data[x].value.toString().replace(',', '.'));
                                        }
                                    }
                                    if (!valor) {
                                        valor = 0;
                                    }
                                    value.push(valor);
                                    backgroundColors.push(flexygo.utils.isBlank(series[z]["backgroundColor"]) ? options.BackgroundColor[z] : series[z]["backgroundColor"]);
                                    borderColor.push(flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"]);
                                    hoverBackgroundColor.push(flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"]);
                                    //}
                                }
                                Datasets.push({ data: value, backgroundColor: backgroundColors, borderColor: borderColor, hoverBackgroundColor: hoverBackgroundColor });
                                var optionsPolarArea = {
                                    legend: {
                                        position: options.LegendPos,
                                        display: options.ShowLegend,
                                        onClick: (e, p) => {
                                            original = Chart.defaults.polarArea.legend.onClick;
                                            original.call(this, e, p);
                                            var allPageCharts = me.closest('main').find('flx-chart[link-group="' + me.attr('link-group') + '"]');
                                            if (this.options && !flexygo.utils.isBlank(this.options.GroupName)) {
                                                allPageCharts.each((i, e) => {
                                                    if (!$(e).is(me)) {
                                                        e.toggleLabel(p.text, null, this.options.GroupName);
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    elements: {
                                        arc: {
                                            borderColor: "#000000"
                                        }
                                    },
                                };
                                let overwritePolarArea = Object.assign({}, defaultOptions, optionsPolarArea);
                                !flexygo.utils.isBlank(this.options) ? overwritePolarArea = Object.assign({}, overwritePolarArea, JSON.parse(this.options)) : overwritePolarArea;
                                this.chart = new Chart(ctxx, {
                                    type: 'polarArea',
                                    data: {
                                        labels: serie,
                                        datasets: Datasets
                                    },
                                    options: overwritePolarArea
                                });
                                break;
                            case 'mixed':
                                //Para cada serie y label sus valores correspondientes
                                for (let z = 0; z < series.length; z++) {
                                    //Por cada mixedLabel del dataset
                                    //for (let y = 0; y < mixedLabels.length; y++) {
                                    value = [];
                                    let mixedChartType = "";
                                    for (let i = 0; i < label.length; i++) {
                                        let valor;
                                        for (let x = 0; x < this.data.length; x++) {
                                            if (label[i] == this.data[x].label && series[z]["chartLabel"] == this.data[x].chartLabel && series[z]["serial"] == this.data[x].serie) {
                                                valor = parseFloat(this.data[x].value.toString().replace(',', '.'));
                                                mixedChartType = this.data[x].chartType;
                                            }
                                        }
                                        if (!valor) {
                                            valor = 0;
                                        }
                                        value.push(valor);
                                    }
                                    Datasets.push({ label: series[z]["serial"] + ' - ' + series[z]["chartLabel"], type: mixedChartType, backgroundColor: flexygo.utils.isBlank(series[z]["backgroundColor"]) ? options.BackgroundColor[z] : series[z]["backgroundColor"], borderColor: flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"], hoverBackgroundColor: flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"], borderWidth: 1, data: value });
                                    //}
                                }
                                this.chart = new Chart(ctxx, {
                                    type: this.data[0].chartType,
                                    data: {
                                        labels: label,
                                        datasets: Datasets
                                    },
                                    options: defaultOptions
                                });
                                break;
                            case 'bar':
                            case 'horizontalBar':
                            case 'horizontalbar':
                                //Para cada serie y label sus valores correspondientes
                                for (let z = 0; z < series.length; z++) {
                                    value = [];
                                    for (let i = 0; i < label.length; i++) {
                                        let valor;
                                        for (let x = 0; x < this.data.length; x++) {
                                            if (label[i] == this.data[x].label && series[z].serial == this.data[x].serie) {
                                                valor = parseFloat(this.data[x].value.toString().replace(',', '.'));
                                            }
                                        }
                                        if (!valor) {
                                            valor = 0;
                                        }
                                        value.push(valor);
                                    }
                                    Datasets.push({ label: series[z].serial, backgroundColor: flexygo.utils.isBlank(series[z]["backgroundColor"]) ? options.BackgroundColor[z] : series[z]["backgroundColor"], borderColor: flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"], hoverBackgroundColor: flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"], borderWidth: 1, data: value });
                                }
                                let overwriteBar = defaultOptions;
                                !flexygo.utils.isBlank(this.options) ? overwriteBar = Object.assign({}, overwriteBar, JSON.parse(this.options)) : overwriteBar;
                                this.chart = new Chart(ctxx, {
                                    type: this.type.toLowerCase() === 'horizontalbar' ? 'horizontalBar' : this.type,
                                    data: {
                                        labels: label,
                                        datasets: Datasets
                                    },
                                    options: overwriteBar
                                });
                                break;
                            case 'pie':
                                //Para cada serie y label sus valores correspondientes
                                value = [];
                                for (let z = 0; z < series.length; z++) {
                                    let valor;
                                    for (let x = 0; x < this.data.length; x++) {
                                        if (series[z]["serial"] == this.data[x].serie) {
                                            valor = parseFloat(this.data[x].value.toString().replace(',', '.'));
                                        }
                                    }
                                    if (!valor) {
                                        valor = 0;
                                    }
                                    value.push(valor);
                                    backgroundColors.push(flexygo.utils.isBlank(series[z]["backgroundColor"]) ? options.BackgroundColor[z] : series[z]["backgroundColor"]);
                                    borderColor.push(flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"]);
                                    hoverBackgroundColor.push(flexygo.utils.isBlank(series[z]["borderColor"]) ? options.BorderColor[z] : series[z]["borderColor"]);
                                }
                                Datasets.push({ data: value, backgroundColor: backgroundColors, borderColor: borderColor, hoverBackgroundColor: hoverBackgroundColor });
                                var optionsPie = {
                                    legend: {
                                        position: options.LegendPos,
                                        display: options.ShowLegend,
                                        onClick: (e, p) => {
                                            original = Chart.defaults.pie.legend.onClick;
                                            original.call(this, e, p);
                                            var allPageCharts = me.closest('main').find('flx-chart[link-group="' + me.attr('link-group') + '"]');
                                            if (this.options && !flexygo.utils.isBlank(this.options.GroupName)) {
                                                allPageCharts.each((i, e) => {
                                                    if (!$(e).is(me)) {
                                                        e.toggleLabel(p.text, null, this.options.GroupName);
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    cutoutPercentage: 0,
                                };
                                let overwritePie = Object.assign({}, defaultOptions, optionsPie);
                                !flexygo.utils.isBlank(this.options) ? overwritePie = Object.assign({}, overwritePie, JSON.parse(this.options)) : overwritePie;
                                this.chart = new Chart(ctxx, {
                                    type: this.type,
                                    data: {
                                        labels: serie,
                                        datasets: Datasets
                                    },
                                    options: overwritePie
                                });
                                break;
                            default:
                                break;
                        }
                    }
                    else {
                        me.html('<div class="box-info"><i class="flx-icon icon-information-2 icon-lg icon-margin-right"></i><span><strong>Info!</strong> ' + flexygo.localization.translate('flxlist.noentriesfound') + '</span></div>');
                    }
                }
                checkValue(array, value, chartLabel) {
                    let exists = false;
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].serial === value && array[i].chartLabel === chartLabel) {
                            exists = true;
                            break;
                        }
                    }
                    return exists;
                }
                getRadiusBubble(value, max, min) {
                    let rMin = 5;
                    let rMax = 30;
                    let percentage = (value - min) / (max - min) * 100;
                    let r = this.getRadius(percentage, rMin, rMax);
                    if (r < rMin) {
                        r = rMin;
                    }
                    if (r > rMax) {
                        r = rMax;
                    }
                    return r;
                }
                getRadius(percent, min, max) {
                    return min + (max - min) * percent / 100;
                }
                toggleLabel(nom, boo, GroupName, ctxx) {
                    let ci = this.chart;
                    let found;
                    let nombres = [];
                    for (let k in ci.data.datasets) {
                        nombres.push(ci.data.datasets[k].label);
                    }
                    let index = nombres.indexOf(nom);
                    if (index >= 0 && boo === true) {
                        let meta = ci.getDatasetMeta(index);
                        meta.hidden = null;
                        ci.update();
                    }
                    else if (index >= 0 && boo === false) {
                        let meta = ci.getDatasetMeta(index);
                        meta.hidden = !ci.data.datasets[index].hidden;
                        ci.update();
                    }
                    else if (index >= 0 && boo === null && this.options.GroupName == GroupName && GroupName != null) {
                        var meta = ci.getDatasetMeta(index);
                        meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
                        ci.update();
                    }
                }
                /**
               * Start loading
               * @method startLoading
               */
                startLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].startLoading();
                    }
                }
                /**
              * Stop loading
              * @method stopLoading
              */
                stopLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].stopLoading();
                    }
                }
            }
            wc.FlxChartElement = FlxChartElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-chart', flexygo.ui.wc.FlxChartElement);
//# sourceMappingURL=flx-chart.js.map