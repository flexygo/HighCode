export declare class syncObj {
    tableName: string;
    currentPage: number;
    state: string;
    lastError: string;
    pageSize: number;
    rows: number;
    table: any;
    constructor(tableName: string);
}
export declare class ConfToken {
    objectConfig: {};
    menuConfig: Array<MenuConfig>;
    scriptConfig: Array<ScriptConfig>;
    styleConfig: Array<StyleConfig>;
    resources: Array<fileResource>;
    homePage: PageConfig;
    lastOverwrite: string;
    lastSync: string;
    lastSend: string;
    lastSendLocation: string;
    lastSendError: string;
    lastSendPing: string;
    user: any;
    tracking: TrackingConfig;
    profile: UserProfileConfig;
    generalConfig: GeneralConfig;
    urlConfig: UrlConfig;
}
export declare class GeneralContext {
    sync_onInit_info: SyncOnInitInfo;
}
export declare class SyncOnInitInfo {
    last_sync_date: number;
    needs_sync: boolean;
}
export declare class ObjectConfig {
    objectName: string;
    descrip: string;
    parsedDescrip: string;
    relations: Array<RelationConfig>;
    views: Array<ViewConfig>;
    pages: Array<PageConfig>;
    documentConfig: FileConfig;
    imageConfig: ImageConfig;
    properties: Array<PropertyConfig>;
    fields: Array<fieldConfig>;
    primaryKeys: Array<string>;
    tableName: string;
    bufferSize: number;
    updateRelatedPrimaryKeys: boolean;
    syncImmediately: boolean;
    sendData: boolean;
    getData: boolean;
}
export declare class SyncOptions {
    partialSync: boolean;
    syncTables: Array<string>;
    syncViews: Array<string>;
    partialSend: boolean;
    sendTables: Array<string>;
    sendViews: Array<string>;
    noChangeMessage: string;
}
export declare class RelationConfig {
    child: string;
    relation: Array<RelationKey>;
}
export declare class RelationKey {
    parentField: string;
    childField: string;
}
export declare class PropertyConfig {
    ObjectName: string;
    PropertyName: string;
    ControlType: string;
    PositionX: number;
    PositionY: number;
    Width: number;
    Height: number;
    Hide: boolean;
    Mask: string;
    SQLSentence: string;
    SQLOrderBy: string;
    SQLValueField: string;
    SQLDisplayField: string;
    SQLObjectName: string;
    SQLTableName: string;
    SQLValidator: string;
    ValidatorMessage: string;
    Template: string;
    WhereSentence: string;
    Label: string;
    Locked: boolean;
    DefaultValue: string;
    DetachedFromDB: boolean;
    DependingFrom: Array<DependencyConfig>;
    DependingProperties: Array<DependencyConfig>;
    SearchFunction: string;
    SearchCollection: string;
    SearchWhere: string;
    SearchReturnFields: string;
    SecurityObject: string;
    AllowNew: boolean;
    AllowNewFunction: string;
    AllowNewReturnFields: string;
    ObjNameLink: string;
    ObjWhereLink: string;
    Style: string;
    CSSClass: string;
    LabelStyle: string;
    LabelCSSClass: string;
    DecimalPlaces: number;
    AutoIncrement: boolean;
    AutoIncrementFunction: string;
    IsRequired: boolean;
    IsRequiredMessage: string;
    MinValue: number;
    MinValueMessage: string;
    MaxValue: number;
    MaxValueMessage: string;
    RegExp: string;
    RegExpText: string;
    OnChangeJsFunction: string;
    PlaceHolder: string;
    WebComponent: string;
    IconClass: string;
    PersistDefaultValue: boolean;
    SQLFilter: string;
    Autoselect: boolean;
    Separator: string;
    CascadeDependencies: boolean;
}
export declare class DependencyConfig {
    PropertyName: string;
    DependantPropertyName: string;
    EnabledValues: Array<string>;
    DisabledValues: Array<string>;
    SQLEnabled: string;
    VisibleValues: Array<string>;
    HiddenValues: Array<string>;
    SQLVisible: string;
    RequiredValues: Array<string>;
    NotRequiredValues: Array<string>;
    SQLRequired: string;
    SQLClass: string;
    SQLComboFilter: string;
    SQLComboSentence: string;
    SQLValue: string;
}
export declare class ViewConfig {
    tableName: string;
    fields: Array<fieldConfig>;
    primaryKeys: Array<string>;
    indexFields: Array<string>;
}
export declare class FileConfig {
    objectPK: string;
    erpObjectName: string;
    typeId: string;
    defaultCategoryId: string;
    categoryFilter: string;
    offlineFilter: string;
}
export declare class ImageConfig {
    objectPK: string;
    erpObjectName: string;
    typeId: string;
    defaultCategoryId: string;
    categoryFilter: string;
    offlineFilter: string;
    compression: number;
    maxWidth: number;
    maxHeight: number;
}
export declare class PageConfig {
    objectName: string;
    pageName: string;
    typeId: string;
    title: string;
    body: string;
    header: string;
    footer: string;
    empty: string;
    isDefault: boolean;
    SQLSentence: string;
    SQLOrderBy: string;
    SQLSearchFilter: string;
    ShowSearchBar: boolean;
    AdditionalWhere: string;
    JSAfterLoad: string;
    groups: Array<GroupConfig>;
    elementsShown: number;
}
export declare class GroupConfig {
    field: string;
    type: string;
    order: number;
    header: string;
    footer: string;
}
export declare class MenuConfig {
    id: string;
    parentId: string;
    title: string;
    descrip: string;
    typeId: string;
    url: string;
    processName: string;
    pageTypeId: string;
    pageName: string;
    onlineObject: string;
    objectName: string;
    objectWhere: string;
    iconClass: string;
    jsCode: string;
}
export declare class ScriptConfig {
    name: string;
    jsCode: string;
    order: number;
    lastChange: string;
}
export declare class StyleConfig {
    name: string;
    cssCode: string;
    order: number;
    lastChange: string;
}
export declare class UserProfileConfig {
    name: string;
    surName: string;
    userName: string;
    avatar: string;
    mustChangePsw: boolean;
}
export declare class GeneralConfig {
    syncMessage: string;
    sendMessage: string;
    locationSending: boolean;
    syncTimeout: number;
    maxLatency: number;
    waitOnSendError: boolean;
    cameraDimensions: string;
    syncOnInitLapse: number;
}
export declare class UrlConfig {
    url: string;
    user: string;
}
export declare class TrackingConfig {
    inaccuracy: number;
    radius: number;
    active: boolean;
    schedule: Array<string>;
    holidays: Array<String>;
}
export declare class fieldConfig {
    FieldName: string;
    FieldType: string;
    Length?: number;
}
export declare class fileResource {
    FileName: string;
    FileDate: string;
    B64: string;
    MimeType: string;
    Error: string;
}
export declare class compareData {
    tableName: string;
    fields: Array<fieldConfig>;
    keyFields: Array<string>;
    constructor(tableName: string, fields: Array<fieldConfig>, keyFields: Array<string>);
}
export declare class syncResult {
    success: boolean;
    data: Array<syncObj>;
    error: any;
    constructor(success: boolean, data: Array<syncObj>, error: any);
}
export declare class authToken {
    url: string;
    user: string;
    b64: string;
    refreshToken: string;
    bearerToken: string;
    expiredDate: any;
}
export declare class ImageObject {
    ImageId: string;
    ObjectName: string;
    ObjectId: string;
    ObjectGUID: string;
    Name: string;
    Descrip: string;
    ImageClassId: string;
    MainImage: boolean;
    OrderNumber: number;
    CreationDate: string;
    URL: string;
    B64: string;
    _isInserted: number;
}
export declare class DocumentObject {
    DocGuid: string;
    ObjectName: string;
    ObjectId: string;
    ObjectGUID: string;
    Name: string;
    Description: string;
    CategoryId: string;
    CreationDate: string;
    URL: string;
    B64: string;
    _isInserted: number;
}
export declare class BarcodeScannerOptions {
    preferFrontCamera: boolean;
    showFlipCameraButton: boolean;
    showTorchButton: boolean;
    disableAnimations: boolean;
    disableSuccessBeep: boolean;
    prompt: string;
    formats: string;
    Orientation: string;
    torchOn: boolean;
    resultDisplayDuration: number;
}
export declare class flexygoDB {
    db: any;
    active: boolean;
    name: string;
}
export declare class flxApp {
    APKUrl: string;
    APKWebService: string;
    Active: boolean;
    AppName: string;
    Descrip: string;
    IconName: string;
    LocationSending: boolean;
    MaxLatency: number;
    OriginId: number;
    0: any;
    SendMessage: string;
    SyncMessage: string;
    SyncTimeout: number;
    Title: string;
}
export declare class flexyApp {
    auth: authToken;
    confToken: ConfToken;
    app: flxApp;
}
export declare class flexyApps {
    currentApp: string;
    lastLoggedOutApp: string;
    [key: string]: flexyApp | string;
}
