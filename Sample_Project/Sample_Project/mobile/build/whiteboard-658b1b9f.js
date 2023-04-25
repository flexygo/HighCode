import { j as jquery } from './jquery-5df58adb.js';

var pizarra_canvas;
var pizarra_context;
var pizarraTransparent = false;
var whiteboard;
(function (whiteboard) {
    function init(transparent = false) {
        return new Promise((resolve, reject) => {
            var pizarraHtml = '<div id="contenedor_pizarra" style="z-index:99999;width:100%;height:100%;position:fixed;margin:0px;padding:0px;top:0px;left:0px;background-color:white;text-align:center;">';
            pizarraHtml += '<canvas id="pizarra" style="border:solid 1px black;"></canvas><br>';
            pizarraHtml += '<section>';
            pizarraHtml += '  <div style="width:33%;float:left">';
            pizarraHtml += '    <ion-button id="okWhiteboard" color="success" shape="round"><i class="flx-icon icon-accepted"></i></ion-button>';
            pizarraHtml += '  </div>';
            pizarraHtml += '  <div style="width:33%;float:left">';
            pizarraHtml += '    <ion-button color="primary" shape="round" onclick="flexygo.whiteboard.clear()"><i class="flx-icon icon-clean-1"></i></ion-button>';
            pizarraHtml += '  </div>';
            pizarraHtml += '  <div style="width:33%;float:left">';
            pizarraHtml += '    <ion-button id="cancelWhiteboard" color="danger"  shape="round"><i class="flx-icon icon-cross1"></i></ion-button>';
            pizarraHtml += '  </div>';
            pizarraHtml += '</section>';
            pizarraHtml += '</div>';
            if (transparent) {
                pizarraTransparent = transparent;
            }
            jquery('#pizarraPanel').remove();
            jquery('body').append(pizarraHtml);
            pizarra_canvas = document.getElementById("pizarra");
            pizarra_canvas.width = jquery('#contenedor_pizarra').width() - 2;
            pizarra_canvas.height = jquery('#contenedor_pizarra').height() - 50;
            pizarra_context = pizarra_canvas.getContext("2d");
            pizarra_context.strokeStyle = "#000";
            pizarra_context.lineWidth = 4;
            pizarra_canvas.addEventListener("mousedown", drawStart, false);
            pizarra_canvas.addEventListener("mouseup", drawEnd, false);
            pizarra_canvas.addEventListener("touchstart", drawStart, false);
            pizarra_canvas.addEventListener("touchend", drawEnd, false);
            pizarra_canvas.addEventListener("mouseout", drawEnd, false);
            jquery(window).off('resize', resize);
            jquery(window).on('resize', resize);
            jquery('#okWhiteboard').on('click', () => {
                let data = save();
                close();
                resolve(data);
            });
            jquery('#cancelWhiteboard').on('click', () => {
                reject(close());
            });
        });
    }
    whiteboard.init = init;
    var entra;
    function drawStart(e) {
        entra = 0;
        pizarra_context.beginPath();
        pizarra_context.moveTo(e.clientX - jquery(pizarra_canvas).offset().left, e.clientY - jquery(pizarra_canvas).offset().top);
        pizarra_canvas.addEventListener("mousemove", draw, false);
        pizarra_canvas.addEventListener("touchmove", draw, false);
    }
    whiteboard.drawStart = drawStart;
    function drawEnd(_e) {
        pizarra_canvas.removeEventListener("mousemove", draw, false);
        pizarra_canvas.removeEventListener("touchmove", draw, false);
        if (entra < 2) {
            pizarra_context.beginPath();
            pizarra_context.arc(lastX, lastY, 3, 0, 2 * Math.PI, true);
            pizarra_context.fill();
        }
    }
    whiteboard.drawEnd = drawEnd;
    var lastX;
    var lastY;
    function draw(e) {
        e.preventDefault();
        if (e.targetTouches && e.targetTouches[0].pageX) {
            lastX = e.targetTouches[0].pageX - jquery(pizarra_canvas).offset().left;
            lastY = e.targetTouches[0].pageY - jquery(pizarra_canvas).offset().top;
        }
        else {
            lastX = e.clientX - jquery(pizarra_canvas).offset().left;
            lastY = e.clientY - jquery(pizarra_canvas).offset().top;
            //console.log((e.clientX - $(pizarra_canvas).offset().left)+','+(e.clientY - $(pizarra_canvas).offset().top))
        }
        pizarra_context.lineTo(lastX, lastY);
        pizarra_context.stroke();
        if (entra < 200)
            entra++;
    }
    whiteboard.draw = draw;
    /*
        borrar() vuelve a setear el ancho del canvas, lo que produce que se borren los trazos dibujados
        hasta ese momento.
    */
    function clear() {
        pizarra_canvas.width = pizarra_canvas.width;
        pizarra_context.lineWidth = 4;
    }
    whiteboard.clear = clear;
    function save() {
        let newCanvas = trim(pizarra_canvas);
        if (newCanvas) {
            let newContext = newCanvas.getContext("2d");
            // change non-opaque pixels to white
            if (!pizarraTransparent) {
                var imgData = newContext.getImageData(0, 0, newCanvas.width, newCanvas.height);
                var mydata = imgData.data;
                for (var i = 0; i < mydata.length; i += 4) {
                    if (mydata[i + 3] < 255) {
                        mydata[i] = 255;
                        mydata[i + 1] = 255;
                        mydata[i + 2] = 255;
                        mydata[i + 3] = 255;
                    }
                }
                newContext.putImageData(imgData, 0, 0);
            }
            return newCanvas.toDataURL();
        }
        else {
            return null;
        }
    }
    whiteboard.save = save;
    function close() {
        pizarra_context = null;
        pizarra_canvas = null;
        jquery('#contenedor_pizarra').remove();
    }
    whiteboard.close = close;
    function resize() {
        if (pizarra_canvas) {
            let deviceSafeArea = 0;
            if (getComputedStyle(document.documentElement).getPropertyValue("--safe-area-inset-bottom")) {
                deviceSafeArea = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--safe-area-inset-bottom"));
            }
            var w = jquery('#contenedor_pizarra').width() - 2;
            var h = jquery('#contenedor_pizarra').height() - 50 - deviceSafeArea;
            var temp_cnvs = document.createElement('canvas');
            var temp_cntx = temp_cnvs.getContext('2d');
            temp_cnvs.width = w;
            temp_cnvs.height = h;
            temp_cntx.fillStyle = 'transparent';
            temp_cntx.fillRect(0, 0, w, h);
            temp_cntx.drawImage(pizarra_canvas, 0, 0);
            pizarra_canvas.width = w;
            pizarra_canvas.height = h;
            pizarra_context.drawImage(temp_cnvs, 0, 0);
            pizarra_context.lineWidth = 4;
        }
    }
    whiteboard.resize = resize;
    function trim(c) {
        var ctx = c.getContext('2d'), copy = document.createElement('canvas').getContext('2d'), pixels = ctx.getImageData(0, 0, c.width, c.height), l = pixels.data.length, i, bound = {
            top: null,
            left: null,
            right: null,
            bottom: null
        }, x, y;
        for (i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] !== 0) {
                x = (i / 4) % c.width;
                y = ~~((i / 4) / c.width);
                if (bound.top === null) {
                    bound.top = y;
                }
                if (bound.left === null) {
                    bound.left = x;
                }
                else if (x < bound.left) {
                    bound.left = x;
                }
                if (bound.right === null) {
                    bound.right = x;
                }
                else if (bound.right < x) {
                    bound.right = x;
                }
                if (bound.bottom === null) {
                    bound.bottom = y;
                }
                else if (bound.bottom < y) {
                    bound.bottom = y;
                }
            }
        }
        if (bound.bottom) {
            var trimHeight = bound.bottom - bound.top, trimWidth = bound.right - bound.left, trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
            copy.canvas.width = trimWidth;
            copy.canvas.height = trimHeight;
            copy.putImageData(trimmed, 0, 0);
            // open new window with trimmed image:
            return copy.canvas;
        }
        else {
            return null;
        }
    }
})(whiteboard || (whiteboard = {}));

export { whiteboard as w };
