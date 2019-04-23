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
                    this.moduleName = null;
                    this.data = null;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.moduleName = element.attr("modulename");
                    this.data = element.attr('value');
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Array of observed attributes.
                * @property observedAttributes {Array}
                */
                static get observedAttributes() {
                    return ['modulename', 'value'];
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
                }
                /**
                * Refresh de webcomponent.
                * @method refresh
                */
                refresh() {
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
                    let width = 0;
                    let height = 0;
                    me.removeAttr('manualInit');
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                    if (me.attr('width') && me.attr('width') != '') {
                        width = parseInt(me.attr('width'));
                    }
                    if (me.attr('height') && me.attr('height') != '') {
                        height = parseInt(me.attr('height'));
                    }
                    me.html('<div><canvas  height=' + height + ' width=' + width + ' position:absolute;"></canvas></div>');
                    let params = {
                        ObjectName: me.attr('ObjectName'),
                        ObjectWhere: me.attr('ObjectWhere'),
                        ModuleName: me.attr('ModuleName'),
                        PageName: flexygo.history.getPageName(me)
                    };
                    flexygo.ajax.post('~/api/Chart', 'GetHTML', params, (response) => {
                        if (response) {
                            this.data = response.Values[0];
                            this.dataColum = response.Values[1];
                            this.settings = response.Settings;
                            if (response.Options) {
                                this.options = JSON.parse(response.Options);
                            }
                            this.Title = response.Title;
                            this.Labels = response.Labels;
                            this.Series = response.Series;
                            this.Values = response.Value;
                            this.Params = response.Params;
                            this.type = response.ChartType;
                            this.Background = response.ChartBackground;
                            this.Border = response.ChartBorder;
                            this.render();
                        }
                    }, null, () => { this.stopLoading(); }, () => { this.startLoading(); });
                }
                /**
                * Renders the chart
                * @method render
                */
                render() {
                    let me = $(this);
                    let name = '';
                    if (me.attr('type') && me.attr('type') != '') {
                        this.type = me.attr('type');
                    }
                    if (me.attr('name') && me.attr('name') != '') {
                        name = me.attr('name');
                    }
                    if (me.attr('data') && me.attr('data') != '') {
                        var dataJSON = me.attr('data');
                    }
                    if (me.attr('options') && me.attr('options') != '') {
                        var optionsJSON = me.attr('options');
                    }
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
                        AnimationDuration: 100,
                        Colors: this.settings.Colors.split("|"),
                        ColorsBackground: this.settings.BorderColors.split("|"),
                    };
                    //var JSONoptions = JSON.stringify(options);
                    //if (ctx.params) {
                    //    JSONoptions = JSONoptions.substring(0, JSONoptions.length - 1);
                    //    JSONoptions += "," + ctx.params + "}";
                    //    options = JSON.parse(JSONoptions);
                    //}
                    var dataBar = {
                        labels: ["January", "February", "March", "April", "May", "June", "July"],
                        datasets: [{
                                label: 'Dataset 1',
                                backgroundColor: "rgba(220,220,220,0.5)",
                                yAxisID: "y-axis-1",
                                data: [66, 87, 40, 39, 87, 70, 65]
                            }, {
                                label: 'Dataset 2',
                                backgroundColor: "rgba(151,187,205,0.5)",
                                yAxisID: "y-axis-2",
                                data: [50, 57, 70, 35, 76, 87, 58]
                            }, {
                                label: 'Dataset 3',
                                backgroundColor: 'rgba(151,187,205,1)',
                                yAxisID: "y-axis-1",
                                data: [70, 66, 78, 40, 85, 70, 45]
                            }]
                    };
                    var dataforLineEx = {
                        labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4',
                            'Data 5', 'Data 6', 'Data 7'],
                        datasets: [{
                                fillColor: 'rgba(0,0,0,0)',
                                backgroundColor: 'rgba(151,187,205,0.5)',
                                borderColor: 'rgba(151,187,205,0.5)',
                                data: [60, 10, 40, 30, 80, 30, 20]
                            }, {
                                fillColor: 'rgba(0,0,0,0)',
                                backgroundColor: "rgba(220,220,220,0.7)",
                                borderColor: "rgba(220,220,220,0.7)",
                                data: [20, 30, 80, 20, 40, 10, 60]
                            }]
                    };
                    var dataBubbleEx = {
                        datasets: [
                            {
                                label: 'Bubble Chart',
                                data: [
                                    {
                                        x: 20,
                                        y: 30,
                                        r: 5
                                    },
                                    {
                                        x: 30,
                                        y: 20,
                                        r: 15
                                    },
                                    {
                                        x: 33,
                                        y: 19,
                                        r: 5
                                    },
                                    {
                                        x: 25,
                                        y: 18,
                                        r: 20
                                    },
                                    {
                                        x: 40,
                                        y: 10,
                                        r: 10
                                    }
                                ],
                                backgroundColor: 'rgba(151,187,205,1)',
                                hoverBackgroundColor: 'rgba(151,187,205,1)',
                            }
                        ]
                    };
                    var dataforDoughnutEx = {
                        labels: [
                            "Blue",
                            "Red",
                            "Grey"
                        ],
                        datasets: [
                            {
                                data: [300, 50, 100],
                                backgroundColor: [
                                    'rgba(151,187,205,1)',
                                    "rgb(153, 38, 0)",
                                    "rgba(220,220,220,0.5)"
                                ],
                                hoverBackgroundColor: [
                                    'rgba(151,187,205,1)',
                                    "rgb(153, 38, 0)",
                                    "rgba(220,220,220,0.5)"
                                ]
                            }
                        ]
                    };
                    var dataRadar = {
                        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                        datasets: [
                            {
                                label: "Radar data",
                                backgroundColor: "rgba(151,187,205,0.5)",
                                borderColor: "rgba(151,187,205,0.5)",
                                data: [65, 59, 90, 81, 56, 55, 40]
                            },
                            {
                                label: "Radar data 2",
                                backgroundColor: "rgba(220,220,220,0.7)",
                                borderColor: "rgba(220,220,220,0.7)",
                                data: [28, 48, 40, 19, 96, 27, 100]
                            }
                        ]
                    };
                    var dataPolarArea = {
                        datasets: [{
                                data: [
                                    11,
                                    16,
                                    15
                                ],
                                backgroundColor: [
                                    "rgba(151,187,205,0.5)",
                                    "rgba(220,220,220,0.7)",
                                    "rgba(153,0,0,0.45)"
                                ],
                                borderColor: [
                                    "rgba(151,187,205,0.5)",
                                    "rgba(220,220,220,0.7)",
                                    "rgba(153,0,0,0.1)"
                                ],
                                label: 'PolarArea chart' // for legend
                            }],
                        labels: [
                            "Red",
                            "Green",
                            "Yellow",
                            "Grey",
                            "Blue"
                        ]
                    };
                    let original = Chart.defaults.global.legend.onClick;
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
                        animation: {
                            animateScale: options.animateScale !== "False",
                            animateRotate: options.animateRotate !== "False",
                            duration: options.AnimationDuration
                        },
                        legend: {
                            position: options.LegendPos,
                            display: options.ShowLegend,
                            onClick: (e, p) => {
                                let original = Chart.defaults.global.legend.onClick;
                                let allPageCharts = me.closest('main').find('flx-chart[link-group="' + me.attr('link-group') + '"]');
                                if (this.options.GroupName) {
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
                                    ticks: {
                                        callback: function (value, index, values) {
                                            return 'value is ' + value;
                                        },
                                        display: options.Showlabels
                                    }
                                }],
                            yAxes: [{
                                    ticks: {
                                        callback: function (value, index, values) {
                                            return 'value is ' + value;
                                        },
                                        display: options.Showlabels
                                    }
                                }]
                        },
                        tooltips: {
                            backgroundColor: options.ToolTipBackgroundColor
                        }
                    };
                    var klkl;
                    var optionsLine = {
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
                                var allPageCharts = me.closest('main').find('flx-chart');
                                if (this.options.GroupName) {
                                    allPageCharts.each((i, e) => {
                                        if (!$(e).is(me)) {
                                            e.toggleLabel(p.text, null, this.options.GroupName);
                                        }
                                    });
                                }
                            }
                        },
                        scales: {
                            xAxes: [{
                                    display: true,
                                    ticks: {
                                        display: options.Showlabels
                                    }
                                }],
                            yAxes: [{
                                    display: true,
                                    ticks: {
                                        display: options.Showlabels
                                    }
                                }]
                        },
                        tooltips: {
                            backgroundColor: options.ToolTipBackgroundColor
                        },
                        pointDotRadius: 10,
                        bezierCurve: false,
                        scaleShowVerticalLines: false,
                        scaleGridLineColor: 'black'
                    };
                    var optionsDoughnut = {
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
                                if (this.options.GroupName) {
                                    allPageCharts.each((i, e) => {
                                        if (!$(e).is(me)) {
                                            e.toggleLabel(p.text, null, this.options.GroupName);
                                        }
                                    });
                                }
                            }
                        },
                        tooltips: {
                            backgroundColor: options.ToolTipBackgroundColor
                        },
                    };
                    var optionsPie = {
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
                                if (this.options.GroupName) {
                                    allPageCharts.each((i, e) => {
                                        if (!$(e).is(me)) {
                                            e.toggleLabel(p.text, null, this.options.GroupName);
                                        }
                                    });
                                }
                            }
                        },
                        tooltips: {
                            backgroundColor: options.ToolTipBackgroundColor
                        },
                        cutoutPercentage: 0,
                    };
                    var optionsBar = {
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
                                if (this.options.GroupName) {
                                    allPageCharts.each((i, e) => {
                                        if (!$(e).is(me)) {
                                            e.toggleLabel(p.text, null, this.options.GroupName);
                                        }
                                    });
                                }
                            }
                        },
                        scales: {
                            xAxes: [{
                                    display: true,
                                    ticks: {
                                        display: options.Showlabels
                                    }
                                }],
                            yAxes: [{
                                    type: "linear",
                                    display: true,
                                    position: "left",
                                    id: "y-axis-1",
                                    ticks: {
                                        display: options.Showlabels,
                                        beginAtZero: true,
                                        min: 0
                                    }
                                }, {
                                    type: "linear",
                                    display: false,
                                    position: "right",
                                    id: "y-axis-2",
                                    gridLines: {
                                        drawOnChartArea: false
                                    }
                                }],
                        },
                        tooltips: {
                            backgroundColor: options.ToolTipBackgroundColor
                        },
                    };
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
                                if (this.options.GroupName) {
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
                    var optionsPolarArea = {
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
                                if (this.options.GroupName) {
                                    allPageCharts.each((i, e) => {
                                        if (!$(e).is(me)) {
                                            e.toggleLabel(p.text, null, this.options.GroupName);
                                        }
                                    });
                                }
                            }
                        },
                        tooltips: {
                            backgroundColor: options.ToolTipBackgroundColor
                        },
                        elements: {
                            arc: {
                                borderColor: "#000000"
                            }
                        },
                    };
                    var ctxx = me.find('canvas');
                    var series = [];
                    var Datas = [];
                    var Background = [];
                    var Border = [];
                    var Label = [];
                    var inLa = 0, inSe = 1, inDa = null, inBa = 0, inBo = 0;
                    var Data = [];
                    var datasets = [];
                    try {
                        inLa = this.dataColum.indexOf(this.Labels);
                        inSe = this.dataColum.indexOf(this.Series);
                        inDa = this.dataColum.indexOf(this.Values);
                        inBa = this.dataColum.indexOf(this.Background);
                        inBo = this.dataColum.indexOf(this.Border);
                    }
                    catch (e) { }
                    for (let i in this.data) {
                        if (inLa >= 0) {
                            if (Label.indexOf(this.data[i][inLa]) == -1) {
                                Label.push(this.data[i][inLa]);
                            }
                        }
                    }
                    for (let i in this.data) {
                        if (inSe >= 0) {
                            if (series.indexOf(this.data[i][inSe]) == -1) {
                                series.push(this.data[i][inSe]);
                            }
                        }
                    }
                    for (let i in this.data) {
                        if (inBa >= 0) {
                            if (Background.indexOf(this.data[i][inBa]) == -1) {
                                Background.push(this.data[i][inBa]);
                            }
                        }
                    }
                    for (let i in this.data) {
                        if (inBo >= 0) {
                            if (Border.indexOf(this.data[i][inBo]) == -1) {
                                Border.push(this.data[i][inBo]);
                            }
                        }
                    }
                    if (Background.length > 0) {
                        options.ColorsBackground = Background;
                    }
                    if (Border.length > 0) {
                        options.Colors = Border;
                    }
                    for (let iu in series) {
                        Datas[iu] = [];
                    }
                    for (let u in this.data) {
                        var ind = series.indexOf(this.data[u][inSe]);
                        Datas[ind].push([this.data[u][inDa], this.data[u][inLa]]);
                    }
                    let Datasets = [];
                    let type = this.type;
                    switch (type) {
                        case 'line':
                            for (let o in series) {
                                let res = [Label.length];
                                for (let l in Label) {
                                    res[l] = 0;
                                }
                                let index = -1;
                                for (let h in Datas[o]) {
                                    let nom = Datas[o][h][1];
                                    let sum = ($.isNumeric(Datas[o][h][0])) ? parseFloat(Datas[o][h][0]) : 0;
                                    index = Label.indexOf(nom);
                                    res[index] = res[index] + sum;
                                }
                                let dataAux = {
                                    label: series[o],
                                    backgroundColor: options.ColorsBackground[o],
                                    borderColor: options.Colors[o],
                                    data: res
                                };
                                Datasets.push(dataAux);
                            }
                            if (Label[0]) {
                                dataforLineEx.labels = Label;
                            }
                            if (Datasets[0]) {
                                dataforLineEx.datasets = Datasets;
                            }
                            let linedata = dataforLineEx;
                            let lineoptions = optionsLine;
                            if (typeof dataJSON != 'undefined') {
                                let data = JSON.parse(dataJSON);
                            }
                            if (typeof optionsJSON != 'undefined') {
                                let options = JSON.parse(optionsJSON);
                            }
                            this.chart = new Chart(ctxx, {
                                type: type,
                                data: linedata,
                                options: lineoptions
                            });
                            break;
                        case 'bubble':
                            let bubbledata = dataBubbleEx;
                            let bubbleoptions = optionsBubble;
                            bubbledata.datasets[0].backgroundColor = options.ColorsBackground;
                            if (typeof dataJSON != 'undefined') {
                                let data = JSON.parse(dataJSON);
                            }
                            if (typeof optionsJSON != 'undefined') {
                                let options = JSON.parse(optionsJSON);
                            }
                            this.chart = new Chart(ctxx, {
                                type: type,
                                data: bubbledata,
                                options: bubbleoptions
                            });
                            break;
                        case 'doughnut':
                            for (let o in series) {
                                let res = [Label.length];
                                for (let l in Label) {
                                    res[l] = 0;
                                }
                                let index = -1;
                                for (let h in Datas[o]) {
                                    let nom = Datas[o][h][1];
                                    let sum = ($.isNumeric(Datas[o][h][0])) ? parseFloat(Datas[o][h][0]) : 0;
                                    index = Label.indexOf(nom);
                                    res[index] = res[index] + sum;
                                }
                                let dataAux = {
                                    label: series[o],
                                    backgroundColor: options.ColorsBackground,
                                    borderColor: options.Colors,
                                    data: res
                                };
                                Datasets.push(dataAux);
                            }
                            if (Label[0])
                                dataforDoughnutEx.labels = Label;
                            if (Datasets[0])
                                dataforDoughnutEx.datasets = Datasets;
                            let doughnutdata = dataforDoughnutEx;
                            let doughnutoptions = optionsDoughnut;
                            if (typeof dataJSON != 'undefined') {
                                let data = JSON.parse(dataJSON);
                            }
                            if (typeof optionsJSON != 'undefined') {
                                let options = JSON.parse(optionsJSON);
                            }
                            this.chart = new Chart(ctxx, {
                                type: type,
                                data: doughnutdata,
                                options: doughnutoptions
                            });
                            break;
                        case 'radar':
                            for (let o in series) {
                                let res = [Label.length];
                                for (let l in Label) {
                                    res[l] = 0;
                                }
                                let index = -1;
                                for (let h in Datas[o]) {
                                    let nom = Datas[o][h][1];
                                    let sum = ($.isNumeric(Datas[o][h][0])) ? parseFloat(Datas[o][h][0]) : 0;
                                    index = Label.indexOf(nom);
                                    res[index] = res[index] + sum;
                                }
                                let dataAux = {
                                    label: series[o],
                                    backgroundColor: options.ColorsBackground[o],
                                    borderColor: options.Colors[o],
                                    data: res
                                };
                                Datasets.push(dataAux);
                            }
                            if (Label[0])
                                dataRadar.labels = Label;
                            if (Datasets[0])
                                dataRadar.datasets = Datasets;
                            let radardata = dataRadar;
                            let radaroptions = optionsRadar;
                            if (typeof dataJSON != 'undefined') {
                                let data = JSON.parse(dataJSON);
                            }
                            if (typeof optionsJSON != 'undefined') {
                                let options = JSON.parse(optionsJSON);
                            }
                            this.chart = new Chart(ctxx, {
                                type: type,
                                data: radardata,
                                options: radaroptions
                            });
                            break;
                        case 'polarArea':
                            for (let o in series) {
                                let res = [Label.length];
                                for (let l in Label) {
                                    res[l] = 0;
                                }
                                let index = -1;
                                for (let h in Datas[o]) {
                                    let nom = Datas[o][h][1];
                                    let sum = ($.isNumeric(Datas[o][h][0])) ? parseFloat(Datas[o][h][0]) : 0;
                                    index = Label.indexOf(nom);
                                    res[index] = res[index] + sum;
                                }
                                let dataAux = {
                                    label: series[o],
                                    backgroundColor: options.ColorsBackground,
                                    borderColor: options.Colors,
                                    data: res
                                };
                                Datasets.push(dataAux);
                            }
                            if (Label[0])
                                dataPolarArea.labels = Label;
                            if (Datasets[0])
                                dataPolarArea.datasets = Datasets;
                            let polarAreadata = dataPolarArea;
                            let polarAreaoptions = optionsPolarArea;
                            if (typeof dataJSON != 'undefined') {
                                let data = JSON.parse(dataJSON);
                            }
                            if (typeof optionsJSON != 'undefined') {
                                let options = JSON.parse(optionsJSON);
                            }
                            this.chart = new Chart(ctxx, {
                                type: type,
                                data: polarAreadata,
                                options: polarAreaoptions
                            });
                            break;
                        case 'bar':
                            for (let o in series) {
                                let res = [Label.length];
                                for (let l in Label) {
                                    res[l] = 0;
                                }
                                let index = -1;
                                for (let h in Datas[o]) {
                                    let nom = Datas[o][h][1];
                                    let sum = ($.isNumeric(Datas[o][h][0])) ? parseFloat(Datas[o][h][0]) : 0;
                                    index = Label.indexOf(nom);
                                    res[index] = res[index] + sum;
                                }
                                let dataAux = {
                                    label: series[o],
                                    backgroundColor: options.ColorsBackground[o],
                                    borderColor: options.Colors[o],
                                    data: res
                                };
                                Datasets.push(dataAux);
                            }
                            if (Label[0])
                                dataBar.labels = Label;
                            if (Datasets[0])
                                dataBar.datasets = Datasets;
                            let bardata = dataBar;
                            let baroptions = optionsBar;
                            if (typeof dataJSON != 'undefined') {
                                let data = JSON.parse(dataJSON);
                            }
                            if (typeof optionsJSON != 'undefined') {
                                let options = JSON.parse(optionsJSON);
                            }
                            this.chart = new Chart(ctxx, {
                                type: type,
                                data: bardata,
                                options: baroptions
                            });
                            break;
                        case 'pie':
                            for (let o in series) {
                                let res = [Label.length];
                                for (let l in Label) {
                                    res[l] = 0;
                                }
                                let index = -1;
                                for (let h in Datas[o]) {
                                    let nom = Datas[o][h][1];
                                    let sum = ($.isNumeric(Datas[o][h][0])) ? parseFloat(Datas[o][h][0]) : 0;
                                    index = Label.indexOf(nom);
                                    res[index] = res[index] + sum;
                                }
                                let dataAux = {
                                    label: series[o],
                                    backgroundColor: options.ColorsBackground,
                                    borderColor: options.Colors,
                                    data: res
                                };
                                Datasets.push(dataAux);
                            }
                            if (Label[0])
                                dataforDoughnutEx.labels = Label;
                            if (Datasets[0])
                                dataforDoughnutEx.datasets = Datasets;
                            let piedata = dataforDoughnutEx;
                            let pieoptions = optionsPie;
                            if (typeof dataJSON != 'undefined') {
                                let data = JSON.parse(dataJSON);
                            }
                            if (typeof optionsJSON != 'undefined') {
                                let options = JSON.parse(optionsJSON);
                            }
                            this.chart = new Chart(ctxx, {
                                type: type,
                                data: piedata,
                                options: pieoptions
                            });
                            break;
                        default:
                            break;
                    }
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
               * Translate a string
               * @method translate
               * @param {string} str - The string to translate.
               */
                translate(str) {
                    return flexygo.localization.translate(str);
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