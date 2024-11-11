/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    type FlxVersionInfoMode = "icon" | "page";
    type FlxVersionInfoUpdateMode = "full" | "partial";
    /**
    * Library for the FlxVersionInfoElement web component.
    *
    * @class FlxVersionInfoElement
    * @constructor
    * @return {FlxVersionInfoElement}
    */
    class FlxVersionInfoElement extends HTMLElement {
        constructor();
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        private progressBar;
        private updateMode;
        private currentSetActiveVersion;
        /**
        * Current settings
        * @property settings {flexygo.api.sys.GetVersionResponse}
        */
        settings: flexygo.api.sys.GetVersionResponse;
        /**
        * Installed versions information
        * @property versions {flexygo.api.sys.VersionInfo[]}
        */
        versions: flexygo.api.sys.VersionInfo[];
        /**
        * Mode of visualization (page or icon)
        * @property mode {FlxVersionInfoMode}
        */
        mode: FlxVersionInfoMode;
        /**
        * Changes pending user review
        * @property changes {flexygo.api.sys.VersionReviewChange[]}
        */
        changes: flexygo.api.sys.VersionReviewChange[];
        private msToRestart;
        private responseShown;
        private lastSuccessResponse;
        /**
        * Init the webcomponent.
        * @method init
        */
        init(): Promise<void>;
        /**
        * Refresh the webcomponent.
        * @method refresh
        */
        refresh(force?: boolean): Promise<void>;
        /**
       * Renders the webcomponent.
       * @method render
        */
        render(): void;
        private renderIcon;
        private renderPage;
        private infoVersion;
        private showChanges;
        private deleteVersion;
        private setActiveVersion;
        private onSuccessUpdateProgress;
        private onFailureUpdateProgress;
        private showUpdateSuccessful;
        private updateProgress;
        private updateNewVersion;
    }
}
