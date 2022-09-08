/**
 * @namespace flexygo.help
 */
function helpModalImage(img) {
    var src = $(img).attr('src');
    let sm = $['sweetModal']({
        title: $(img).attr('title'),
        content: '<img src="' + src + '" class="img-responsive" style="margin:0 auto;display:block"/>',
        width: '80%',
    });
}
function helpModalWindow(div, func) {
    var src = $(div).attr('src');
    let sm = $(func).modal('show');
    $(func).draggable({
        handle: ".modal-header"
    });
}
function gotoSection(name) {
    $(name).get(0).scrollIntoView();
}
function initVideos() {
    $('.fancybox-media').each(function () {
        $(this).fancybox({ helpers: { media: {}, thumbs: { width: 50, height: 50 } }, autoSize: true, closeClick: true, openEffect: 'elastic', closeEffect: 'elastic', cyclic: false });
    });
}
//# sourceMappingURL=help.js.map