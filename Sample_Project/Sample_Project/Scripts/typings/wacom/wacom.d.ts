declare global {
    var WacomGSS_SignatureSDK: any;
    var wgssSignatureSDK: any;  // Signature SDK object
    var SOLIDLINE: any;           // Used for drawing lines and rectangles
    var OUTLINE: any;             // Ditto
    var CHECKBOX_USETICKSYMBOL: any;  // Specifies whether the tick symbol should be used to show that the checkbox has been clicked

    const BITMAP_BACKGROUNDCOLOR: any;
    const BITMAP_IMAGEFORMAT: any;
    const BITMAP_INKCOLOR: any;
    const BITMAP_INKWIDTH: any;
    const BITMAP_PADDING_X: any;
    const BITMAP_PADDING_Y: any;

    const TIMEOUT: any;       //  Timeout value for connecting to the port used for the SigCaptX service
    const SERVICEPORT: any;     //  Port used for the SigCaptX service
    const LICENCEKEY: any;
    const PIN_MAXLENGTH: any;      //  Max lenght of PIN 
    const PIN_MINLENGTH: any;
}

export { };

