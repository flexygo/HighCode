import { BarcodeScannerOptions } from '../helpers/types.js';
declare namespace flexygo.camera {
    /**
        * Scan codes using device camera.
        * @method scanCode
        * @param {object} options
        * BarcodeScannerOptions object type {
        *   {boolean} preferFrontCamera?: Prefer front camera. Supported on iOS and Android.
        *   {boolean} showFlipCameraButton?: Show flip camera button. Supported on iOS and Android.
        *   {boolean} showTorchButton Show torch button. Supported on iOS and Android.
        *   {boolean} disableAnimations?: Disable animations. Supported on iOS only.
        *   {boolean} disableSuccessBeep?: Disable success beep. Supported on iOS only.
        *   {string} prompt?: Prompt text. Supported on Android only.
        *   {string} formats?: Formats separated by commas. Defaults to all formats except `PDF_417` and `RSS_EXPANDED`. Formats: QR_CODE, DATA_MATRIX, UPC_E, UPC_A, EAN_8, EAN_13,        CODE_128, CODE_39, CODE_93, CODABAR, ITF, RSS14, RSS_EXPANDED, PDF_417, AZTEC, MSI
        *   {string} Orientation?: Orientation. Supported on Android only. Can be set to `portrait` or `landscape`. Defaults to none so the user can rotate the phone and pick an           orientation.
        *   {boolean} torchOn?: Launch with the torch switched on (if available). Supported on Android only.
        *   {number} resultDisplayDuration?: Display scanned text for X ms. 0 suppresses it entirely, default 1500. Supported on Android only.
        * }
        * @return {Promise<{format, text, cancelled}>} - if share = false returns promise with pdf base64 object.
        */
    function scanCode(options: BarcodeScannerOptions): Promise<unknown>;
    function checkCameraPermission(): Promise<unknown>;
    function stopScan(): void;
    function toggleScannerTorch(): void;
    function onFail(message: any): void;
    function getPicture(myWidth?: number, myHeight?: number, myQuality?: number, typeCrop?: any, alternativeCam?: boolean): Promise<unknown>;
    function stopCamera(): void;
    function getGalleryPicture(myWidth?: number, myHeight?: number, myQuality?: number): Promise<any>;
    function savePicture(image: any): Promise<any>;
    function getDefaultImage(): string;
}