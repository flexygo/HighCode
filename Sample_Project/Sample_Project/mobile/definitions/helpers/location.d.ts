import { Position } from '@capacitor/geolocation';
declare namespace flexygo.gps {
    function getCoords(geoTimeout?: number, maximumAge?: number): Promise<Position>;
    /**
     * Requests gps permission and returns the status after the user has interacted with the message
     * @returns {string} Possible values: GRANTED, DENIED, DENIED_ONCE, NOT_REQUESTED, DENIED_ALWAYS, RESTRICTED, GRANTED_WHEN_IN_USE;
    */
    function requestGPSStatus(): Promise<any>;
    /**
     * Requests gps permission and when user has denied always it will navigate to app settings
     * @returns {Promise<boolean>}  Promise with a result of true when gps is granted and false when it isn't
    */
    function requestGPSPermission(): Promise<boolean>;
    /**
     * Asks user to activate gps
     * @returns {Promise<boolean>} Promise with a result of true when gps is activated and false when it isn't
    */
    function requestGPSActivation(): Promise<boolean>;
    function showActivationMsg(activateBackLocation: boolean, permissionRequest: boolean): Promise<void>;
    function isGPSOff(): Promise<boolean>;
}