//https://developer.mozilla.org/en-US/docs/Web/API/SerialPort
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
;
var flexygo;
(function (flexygo) {
    var integrations;
    (function (integrations) {
        var scales;
        (function (scales) {
            let defaultCnf = {
                baudRate: 9600,
                databits: 8,
                stopBits: 1,
                parity: 'none',
                flowControl: 'none',
                readParam: '$'
            };
            function init(weightTextBox, cnf) {
                let weightControl;
                if ($('#' + weightTextBox).length > 0) {
                    weightControl = $('#' + weightTextBox);
                }
                else if ($('[property="' + weightTextBox + '"]').length > 0) {
                    weightControl = $('[property="' + weightTextBox + '"]');
                }
                if (weightControl) {
                    if (!weightControl.children('div').is('.input-group')) {
                        weightControl.children('div').addClass('input-group');
                    }
                    if (weightControl.find('.input-group .input-group-btn').length == 0) {
                        weightControl.find('.input-group').append('<div class="input-group-btn"></div>');
                    }
                    let btn = $('<button class="btn btn-default" type="button"><i class="fa fa-balance-scale"></i></button>');
                    weightControl.find('.input-group .input-group-btn').append(btn);
                    btn.on('click', (ev) => {
                        this.getWeight(cnf).then((weight) => {
                            debugger;
                            weightControl.val(weight);
                        });
                    });
                }
            }
            scales.init = init;
            function getWeight(cnf) {
                return __awaiter(this, void 0, void 0, function* () {
                    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                        var port = null;
                        port = yield this.connect(cnf);
                        this.read(cnf, port).then((val) => {
                            resolve(val);
                        });
                    }));
                });
            }
            scales.getWeight = getWeight;
            function connect(cnf) {
                return __awaiter(this, void 0, void 0, function* () {
                    var port;
                    if (cnf) {
                        cnf = defaultCnf;
                    }
                    else {
                        cnf = Object.assign({}, defaultCnf, cnf);
                    }
                    let ports = yield navigator.serial.getPorts();
                    if (ports.length > 0) {
                        port = ports[0];
                    }
                    else {
                        port = yield navigator.serial.requestPort();
                    }
                    if (!port.readable) {
                        yield port.open({ baudRate: cnf.baudRate, databits: cnf.databits, stopBits: cnf.stopBits, parity: cnf.parity, flowControl: cnf.flowControl });
                    }
                    return port;
                });
            }
            scales.connect = connect;
            function read(cnf, port) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield (new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                        while (port.readable) {
                            let reader = port.readable.getReader();
                            this.write(port, ((cnf && cnf.readParam) ? cnf.readParam : defaultCnf.readParam));
                            try {
                                let i = 0;
                                let wValue = '';
                                while (true) {
                                    var { value, done } = yield reader.read();
                                    wValue += (new TextDecoder().decode(value));
                                    if (i > 15 || value[value.length - 1] == 13) {
                                        if (port.readable.locked) {
                                            reader.releaseLock();
                                        }
                                        if (wValue && parseFloat(wValue)) {
                                            resolve(parseFloat(wValue));
                                        }
                                        else {
                                            resolve(0);
                                        }
                                        return;
                                    }
                                    i++;
                                }
                            }
                            catch (error) {
                                if (port.readable.locked) {
                                    reader.releaseLock();
                                }
                                ;
                            }
                        }
                    })));
                });
            }
            scales.read = read;
            function write(port, value) {
                return __awaiter(this, void 0, void 0, function* () {
                    const encoder = new TextEncoder();
                    const writer = port.writable.getWriter();
                    yield writer.write(encoder.encode(value));
                    writer.releaseLock();
                });
            }
            scales.write = write;
        })(scales = integrations.scales || (integrations.scales = {}));
    })(integrations = flexygo.integrations || (flexygo.integrations = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=scales.js.map