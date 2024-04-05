function onDesignerInit(reportDesigner) {
    reportDesigner && reportDesigner.ExitDesigner.AddHandler(function(_) {
        var redirectUrl = $("#ContentHolder_redirectValue").val();
        if(redirectUrl.length > 0)
            window.location.replace(redirectUrl);
    });
    var suppressCloseConfirmation = false;
    $(window).on('beforeunload', function(e) {
        reportDesigner = reportDesigner || window['reportDesigner'];
        if(!reportDesigner) return;
        var viewer = reportDesigner.GetPreviewModel();
        setTimeout(function() {
            viewer && viewer.Close && viewer.Close();
        }, 1);
        if (!suppressCloseConfirmation && reportDesigner.GetDesignerModel().isDirty()) {
            return 'You have unsaved changes on the page';
        }
    });
    if(DevExpress.ui.dxPopup.prototype._zIndexInitValue && $(".dxpnlControl.header-panel").length) {
        $(".dxpnlControl.header-panel").css("z-index", DevExpress.ui.dxPopup.prototype._zIndexInitValue() + 100)
    }
}

function customizeWizard(s, args) {
    if (args.Type === "DataSourceWizard") {
        args.Wizard.events.addHandler("afterInitialize", afterInit);
        args.Wizard.events.addHandler("afterPageInitialize", afterPageInit);
    };
}
function afterInit(args) {
    args.wizard._dataSourceWizardOptions.disableCustomSql = false;
}
function afterPageInit(args) {
    if (args.pageId === DevExpress.Reporting.Designer.Wizard.FullscreenReportWizardPageId.SpecifySqlDataSourceSettingsPage) {
        args.page.events.addHandler("afterSectionInitialize", afterSectionInit);
    }
}

function afterSectionInit(args,e,d) {
    if (args.sectionId == DevExpress.Reporting.Designer.Wizard.FullscreenReportWizardSectionId.ConfigureQueryPage) {
        let htmlSection = null;
        let initialDisplaySection = null;
        args.page._sections.forEach((section) => {
            if (section.pageId == DevExpress.Reporting.Designer.Wizard.FullscreenReportWizardSectionId.ConfigureQueryPage) {
                htmlSection = $(`.${section.metadata.template} .dx-scrollable-container`);
                $(`.${section.metadata.template} .dxrd-treelist-search-panel`).parent().css('display', 'none');
                $(`.${section.metadata.template} .dxrd-wizard-dataMember`).css('height', 'calc(100%)');
                return;
            }
        })
        initialDisplaySection = htmlSection.css('display');
        htmlSection.css('display', 'none');
        let items = args.section._fieldListModel().treeListController.root().items();
        let promiseItems = {}
        items.forEach((item, index) => {
            let name = item._data().name;
            if (name != 'queries') {
                promiseItems[index] = item.getItems(); //return an array of elements that will be rendered: tables/views/procedures
            }
        });
        //when all elements that will be rendered are ready
        Promise.all(Object.values(promiseItems)).then((arrayContent) => {
            //iteration in each data: tables/views/procedures
            arrayContent.forEach((data, index) => {
                args.section._fieldListModel().treeListController.root().items()[Object.keys(promiseItems)[index]]._isVisible(false)
                args.section._fieldListModel().treeListController.root().items()[Object.keys(promiseItems)[index]].dispose();
            });
            htmlSection.css('display', initialDisplaySection);
        })
        
    }
}

function RegisterNationalityEditor(contentPath) {
    DevExpress.Reporting.Editing.EditingFieldExtensions.registerImageEditor({
        name: "Nationality",
        displayName: "Nationality",
        searchEnabled: true,
        images: [
            { url: contentPath + "Flags/Australia.png", text: "Australia" },
            { url: contentPath + "Flags/China.png", text: "China" },
            { url: contentPath + "Flags/France.png", text: "France" },
            { url: contentPath + "Flags/Germany.png", text: "Germany" },
            { url: contentPath + "Flags/India.png", text: "India" },
            { url: contentPath + "Flags/Italy.png", text: "Italy" },
            { url: contentPath + "Flags/Japan.png", text: "Japan" },
            { url: contentPath + "Flags/Russia.png", text: "Russia" },
            { url: contentPath + "Flags/United_Kingdom.png", text: "United Kingdom" },
            { url: contentPath + "Flags/United_States_of_America.png", text: "United States of America" }
        ]
    });
}

function RegisterDamageDiagramEditor() {
    DevExpress.Reporting.Editing.EditingFieldExtensions.registerImageEditor({
        name: "DamageDiagram",
        displayName: "Damage Diagram",
        drawingEnabled: true,
        imageLoadEnabled: false,
        sizeOptionsEnabled: false,
        clearEnabled: false
    });
}

function CustomizeMenuActions(s, e) {
    //var actions = e.Actions;
    //Get the "Save" action and hide it
    var newAction = e.GetById(DevExpress.Reporting.Designer.Actions.ActionId.NewReport);
    var wizardAction = e.GetById(DevExpress.Reporting.Designer.Actions.ActionId.NewReportViaWizard);
    var SaveAsAction = e.GetById(DevExpress.Reporting.Designer.Actions.ActionId.SaveAs);
    var ExitAction = e.GetById(DevExpress.Reporting.Designer.Actions.ActionId.Exit);
    if (newAction)
        newAction.visible = false;
    if (wizardAction)
        wizardAction.visible = false;
    if (SaveAsAction)
        SaveAsAction.visible = false;
    if (ExitAction)
        ExitAction.visible = false;

    //Add a new action
    //actions.splice(6, 0, {
    //    text: "Custom Command",
    //    imageTemplateName: "myIcon",
    //    disabled: ko.observable(false),
    //    visible: true,
    //    hasSeparator: true,
    //    // The clickAction handler receives the client-side report model 
    //    // allowing you interact with the currently opened report on the client. 
    //    clickAction: function (report) {
    //        alert('Clicked');
    //    },
    //    hotKey: { ctrlKey: true, keyCode: "Z".charCodeAt(0) },
    //    container: "toolbar"
    //});
}
