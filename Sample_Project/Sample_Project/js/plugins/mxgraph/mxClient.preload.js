//Required for correct initilizacition of mxGraph plugin
var mxBasePath = '~/js/plugins/mxgraph';
if (!flexygo.utils.webPath || flexygo.utils.webPath == '') {
    mxBasePath = encodeURI(mxBasePath.replace('~', '.'));
}
else if (mxBasePath.match("^~")) {
    mxBasePath = encodeURI(mxBasePath.replace('~', flexygo.utils.webPath));
}
else {
    mxBasePath = encodeURI(mxBasePath);
}
var mxLanguage = 'none';