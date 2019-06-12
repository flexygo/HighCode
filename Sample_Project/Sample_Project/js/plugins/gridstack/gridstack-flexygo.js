GridStackUI.prototype.addWidget = function (el, x, y, width, height, autoPosition, minWidth, maxWidth,
    minHeight, maxHeight, id) {
    el = $(el);
    if (typeof x != 'undefined') { el.attr('data-gs-x', x); }
    if (typeof y != 'undefined') { el.attr('data-gs-y', y); }
    if (typeof width != 'undefined') { el.attr('data-gs-width', width); }
    if (typeof height != 'undefined') { el.attr('data-gs-height', height); }
    if (typeof autoPosition != 'undefined') { el.attr('data-gs-auto-position', autoPosition ? 'yes' : null); }
    if (typeof minWidth != 'undefined') { el.attr('data-gs-min-width', minWidth); }
    if (typeof maxWidth != 'undefined') { el.attr('data-gs-max-width', maxWidth); }
    if (typeof minHeight != 'undefined') { el.attr('data-gs-min-height', minHeight); }
    if (typeof maxHeight != 'undefined') { el.attr('data-gs-max-height', maxHeight); }
    if (typeof id != 'undefined') { el.attr('data-gs-id', id); }

    if (x == null || y == null) {
        this.container.append(el);
    } else {
        let element;

        this.grid.nodes.forEach((node, i) => {
            if ((y > node.y) || (y == node.y && x >= node.x)) {
                element = node.el
            }
        });

        $(element).after(el);
    }

    this._prepareElement(el, true);
    this._triggerAddEvent();
    this._updateContainerHeight();
    this._triggerChangeEvent(true);

    this.grid._sortNodes();

    return el;
};