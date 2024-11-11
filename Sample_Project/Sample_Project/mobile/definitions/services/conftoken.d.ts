declare namespace flexygo {
    export class conftoken {
        objectConfig: {}
        menuConfig: Array<MenuConfig>
        scriptConfig: Array<ScriptConfig>
        styleConfig: Array<StyleConfig>
        resources: Array<fileResource>
        homePage: PageConfig;
        lastOverwrite: string;
        lastSync: string;
        lastSend: string;
        lastSendLocation: string;
        lastSendError: string;
        lastSendPing: string;
        user:any;
        tracking:TrackingConfig;
        profile: UserProfileConfig;
        generalConfig: GeneralConfig;
        urlConfig: UrlConfig;
     }
}
