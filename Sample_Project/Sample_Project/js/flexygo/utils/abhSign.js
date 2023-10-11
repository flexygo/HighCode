var flexygo;
(function (flexygo) {
    var utils;
    (function (utils) {
        var abhSign;
        (function (abhSign) {
            var pdfDoc = null;
            var pageNum = 1;
            var pageRendering = false;
            var pageNumPending = null;
            var scale = 1;
            var canvas;
            var canvas2;
            var ctx;
            var ctxo;
            var $canvas;
            var canvasOffset;
            var offsetX;
            var offsetY;
            var scrollX;
            var scrollY;
            var isDown = false;
            var startX;
            var startY;
            var prevStartX = 0;
            var prevStartY = 0;
            var prevWidth = 0;
            var prevHeight = 0;
            var modal;
            var pageSize;
            var context;
            function init(module) {
                let btn;
                let div = $('<div class="btn-group"></div>');
                btn = $('<button class="btn btn-default margin-left-s" type="button"><i class="flx-icon icon-new-document1"/></button>').on('click', (e) => {
                    context = $(e.currentTarget).closest('flx-module');
                    openModal(false);
                });
                div.append(btn);
                module.find('.moduleToolbar.btn-toolbar').append(div);
            }
            abhSign.init = init;
            function initList(module) {
                let btn;
                module.find('table').find('tr').each((index) => {
                    let trIndex = module.find('table').find('tr')[index];
                    btn = $('<button class="btn btn-default" type="button"><i class="flx-icon icon-new-document1"/></button>').on('click', (e) => {
                        context = $(e.currentTarget).closest('tr');
                        openModal(true);
                    });
                    $(trIndex).find('.btn-group').append(btn);
                });
            }
            abhSign.initList = initList;
            function openModal(list) {
                let histObj = new flexygo.nav.FlexygoHistory();
                histObj.targetid = 'modal1024x800';
                modal = flexygo.targets.createContainer(histObj, true, null, true);
                if (!modal) {
                    return;
                }
                modal.empty();
                modal.closest('.ui-dialog').find('.ui-dialog-title').html(flexygo.localization.translate('abhSign.title'));
                modal.closest('.ui-dialog').find('.ui-dialog-titlebar-maximize.ui-corner-all.ui-state-default').remove();
                modal.addClass('nopadding');
                modal.append('<style>input[type=file]::file-selector-button {display: none;}</style><input accept="application/pdf" class="form-control padding-s margin-top-m" type="file"/>');
                modal.append('<div id="page" class="padding-top-l hide" style="display:flex;justify-content:center;">' +
                    '<button class="btn btn-default margin-right-m" id="zoomNext"><i class="fa fa-search-plus"></i></button>' +
                    '<button class="btn btn-default margin-right-m" id="zoomPrev"><i class="fa fa-search-minus"></i></button>' +
                    '<button class="btn btn-default margin-right-m" id="prev"><i class="flx-icon icon-order-left"></i></button>' +
                    '<span style="display:flex;align-items: center;"><span id="page_num"></span> / <span id="page_count"></span></span>' +
                    '<button class="btn btn-default margin-left-m" id="next"><i class="flx-icon icon-order-right"></i></button>' +
                    '<label class="margin-left-m" style="display:flex;align-items: center;margin-bottom: 0px;"><input type="checkbox" id="lastPage"> ' + flexygo.localization.translate('abhSign.lastPage') + '</label>' +
                    '<button class="btn btn-default margin-left-m" id="save"><i class="flx-icon icon-save-2"></i> ' + flexygo.localization.translate('abhSign.save') + '</button>' +
                    '</div>' +
                    '<div class="padding-top-l" style="display:flex;justify-content:center;"><canvas style="position:absolute;" id="canvas"></canvas>' +
                    '<canvas style="position:absolute;" id="canvas2"></canvas></div>');
                modal.find('input[type="file"]').change((e) => {
                    let element = $(e.currentTarget);
                    if (element[0].files && element[0].files[0]) {
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            let base64 = atob(e.target.result.split(',')[1]);
                            window.pdfjsLib.getDocument({ data: base64, }).promise.then(function (pdfDoc_) {
                                pdfDoc = pdfDoc_;
                                modal.find('#page_count').text(pdfDoc.numPages);
                                pageNum = 1;
                                scale = 1;
                                modal.find('#page').removeClass('hide');
                                queueRenderPage(pageNum);
                            }, function (reason) {
                                console.error(reason);
                            });
                        };
                        reader.readAsDataURL(element[0].files[0]);
                    }
                });
                modal.find('#prev').click(() => {
                    onPrevPage();
                });
                modal.find('#zoomPrev').click(() => {
                    onPrevZoom();
                });
                modal.find('#next').click(() => {
                    onNextPage();
                });
                modal.find('#zoomNext').click(() => {
                    onNextZoom();
                });
                modal.find('#save').click(() => {
                    save(list);
                });
                canvas = modal.find('#canvas')[0];
                canvas2 = modal.find('#canvas2')[0];
                ctx = canvas.getContext('2d');
                ctxo = canvas2.getContext('2d');
                modal.find("#canvas2").mousedown((e) => {
                    handleMouseDown(e);
                });
                modal.find("#canvas2").mousemove((e) => {
                    handleMouseMove(e);
                });
                modal.find("#canvas2").mouseup((e) => {
                    handleMouseUp(e);
                });
                modal.find("#canvas2").mouseout((e) => {
                    handleMouseOut(e);
                });
                modal.dialog({
                    resize: (event, ui) => {
                        resetOffset();
                    },
                    drag: (event, ui) => {
                        resetOffset();
                    }
                });
            }
            function renderPage(num) {
                pageRendering = true;
                pdfDoc.getPage(num).then(function (page) {
                    var viewport = page.getViewport({ scale: scale });
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    canvas2.height = viewport.height;
                    canvas2.width = viewport.width;
                    pageSize = getPageSize(page);
                    var renderContext = {
                        canvasContext: ctx,
                        viewport: viewport
                    };
                    var renderTask = page.render(renderContext);
                    renderTask.promise.then(function () {
                        pageRendering = false;
                        if (pageNumPending !== null) {
                            renderPage(pageNumPending);
                            pageNumPending = null;
                        }
                    });
                    prevStartX = 0;
                    prevStartY = 0;
                    prevHeight = 0;
                    prevWidth = 0;
                    resetOffset();
                });
                modal.find('#page_num').text(num);
            }
            function save(list) {
                let numPage = modal.find('#page_num').text();
                let lastPage = modal.find('#lastPage').is(':checked');
                let x = Math.round(prevStartX * (pageSize.width / canvas.width));
                let y = Math.round(prevStartY * (pageSize.height / canvas.height));
                let width = Math.round(prevWidth * (pageSize.width / canvas.width));
                let height = Math.round(prevHeight * (pageSize.height / canvas.height));
                if (width < 0) {
                    width = Math.abs(width);
                    x = x - width;
                }
                if (height < 0) {
                    height = Math.abs(height);
                    y = y - height;
                }
                if (lastPage) {
                    $(context).find('flx-switch[property="LastPage"]').val(1);
                    $(context).find('flx-switch[property="LastPage"]').find('input').trigger('change');
                    $(context).find('flx-text[property="Page"]').val('');
                }
                else {
                    $(context).find('flx-switch[property="LastPage"]').val(0);
                    $(context).find('flx-switch[property="LastPage"]').find('input').trigger('change');
                    $(context).find('flx-text[property="Page"]').val(numPage);
                }
                $(context).find('flx-text[property="PositionX"]').val(x);
                $(context).find('flx-text[property="PositionY"]').val(y);
                $(context).find('flx-text[property="SizeX"]').val(width);
                $(context).find('flx-text[property="SizeY"]').val(height);
                modal.closest('.ui-dialog').find('.ui-dialog-titlebar-close').click();
                if (list) {
                    $(context).find('.saveRowButton').click();
                }
                else {
                    $(context).find('.saveButton').click();
                }
            }
            function resetOffset() {
                $canvas = modal.find("#canvas2");
                canvasOffset = $canvas.offset();
                offsetX = canvasOffset.left - $(document).scrollLeft();
                offsetY = canvasOffset.top - $(document).scrollTop();
                scrollX = $canvas.scrollLeft();
                scrollY = $canvas.scrollTop();
            }
            function queueRenderPage(num) {
                if (pageRendering) {
                    pageNumPending = num;
                }
                else {
                    renderPage(num);
                }
            }
            function onPrevPage() {
                if (pageNum <= 1) {
                    return;
                }
                pageNum--;
                queueRenderPage(pageNum);
            }
            function onPrevZoom() {
                if (scale <= 0.25) {
                    return;
                }
                scale = scale - 0.25;
                queueRenderPage(pageNum);
            }
            function onNextPage() {
                if (pageNum >= pdfDoc.numPages) {
                    return;
                }
                pageNum++;
                queueRenderPage(pageNum);
            }
            function onNextZoom() {
                scale = scale + 0.25;
                queueRenderPage(pageNum);
            }
            function handleMouseDown(e) {
                e.preventDefault();
                e.stopPropagation();
                resetOffset();
                startX = parseInt((e.clientX - (offsetX)).toString());
                startY = parseInt((e.clientY - (offsetY)).toString());
                isDown = true;
            }
            function handleMouseUp(e) {
                e.preventDefault();
                e.stopPropagation();
                isDown = false;
                ctxo.strokeRect(prevStartX, prevStartY, prevWidth, prevHeight);
            }
            function handleMouseOut(e) {
                e.preventDefault();
                e.stopPropagation();
                isDown = false;
            }
            function handleMouseMove(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!isDown) {
                    return;
                }
                let mouseX = parseInt((e.clientX - (offsetX)).toString());
                let mouseY = parseInt((e.clientY - (offsetY)).toString());
                let width = mouseX - startX;
                let height = mouseY - startY;
                ctxo.clearRect(0, 0, canvas2.width, canvas2.height);
                ctxo.strokeRect(startX, startY, width, height);
                prevStartX = startX;
                prevStartY = startY;
                prevWidth = width;
                prevHeight = height;
            }
            function getPageSize({ view, userUnit, rotate }) {
                const [x1, y1, x2, y2] = view;
                const changeOrientation = rotate % 180 !== 0;
                let width = ((x2 - x1) / 72) * userUnit;
                let height = ((y2 - y1) / 72) * userUnit;
                width = parseFloat((width * 25.4).toString()).toFixed(1);
                height = parseFloat((height * 25.4).toString()).toFixed(1);
                return {
                    width: changeOrientation ? height : width,
                    height: changeOrientation ? width : height,
                };
            }
        })(abhSign = utils.abhSign || (utils.abhSign = {}));
    })(utils = flexygo.utils || (flexygo.utils = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=abhSign.js.map