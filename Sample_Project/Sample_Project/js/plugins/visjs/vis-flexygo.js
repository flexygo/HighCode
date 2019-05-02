/**
 * Handle updates of an item on double tap
 * @param {vis.Item}  item   The item
 * @private
 */
vis.timeline.components.ItemSet.prototype._onUpdateItem = function (item) {
    if (!this.options.selectable) return;
    /************Override*************/
    /******Old*******/
    /*if (!this.options.editable.add) return;*/
    /******Old******/
    /******New*******/
    if (!this.options.editable.updateGroup && !this.options.editable.updateTime) return;
    /******New*******/

    var me = this;

    if (item) {
        // execute async handler to update the item (or cancel it)
        var itemData = me.itemsData.get(item.id); // get a clone of the data from the dataset
        this.options.onUpdate(itemData, function (itemData) {
            if (itemData) {
                me.itemsData.getDataSet().update(itemData);
            }
        });
    }
};

/**
 * Adjust the visible window such that the selected item (or multiple items)
 * are centered on screen.
 * @param {string | String[]} id     An item id or array with item ids
 * @param {Object} [options]      Available options:
 *                                `animation: boolean | {duration: number, easingFunction: string}`
 *                                    If true (default), the range is animated
 *                                    smoothly to the new window. An object can be
 *                                    provided to specify duration and easing function.
 *                                    Default duration is 500 ms, and default easing
 *                                    function is 'easeInOutQuad'.
 */
vis.Timeline.prototype.focus = function (id, options) {
    if (!this.itemsData || id == undefined) return;

    var ids = Array.isArray(id) ? id : [id];

    // get the specified item(s)
    var itemsData = this.itemsData.getDataSet().get(ids, {
        type: {
            start: 'Date',
            end: 'Date'
        }
    });

    // calculate minimum start and maximum end of specified items
    var start = null;
    var end = null;
    itemsData.forEach(function (itemData) {
        var s = itemData.start.valueOf();
        /************Override*************/
        /******Old*******/
        /*var e = 'end' in itemData ? itemData.end.valueOf() : itemData.start.valueOf();*/
        /******Old******/
        /******New*******/        
        var e = 'end' in itemData ? (itemData.end) ? itemData.end.valueOf() : itemData.start.valueOf() : itemData.start.valueOf();
        /******New*******/

        if (start === null || s < start) {
            start = s;
        }

        if (end === null || e > end) {
            end = e;
        }
    });

    if (start !== null && end !== null) {
        var me = this;
        // Use the first item for the vertical focus
        var item = this.itemSet.items[ids[0]];
        var startPos = this._getScrollTop() * -1;
        var initialVerticalScroll = null;

        // Setup a handler for each frame of the vertical scroll
        var verticalAnimationFrame = function verticalAnimationFrame(ease, willDraw, done) {
            var verticalScroll = getItemVerticalScroll(me, item);

            if (!initialVerticalScroll) {
                initialVerticalScroll = verticalScroll;
            }

            if (initialVerticalScroll.itemTop == verticalScroll.itemTop && !initialVerticalScroll.shouldScroll) {
                return; // We don't need to scroll, so do nothing
            } else if (initialVerticalScroll.itemTop != verticalScroll.itemTop && verticalScroll.shouldScroll) {
                // The redraw shifted elements, so reset the animation to correct
                initialVerticalScroll = verticalScroll;
                startPos = me._getScrollTop() * -1;
            }

            var from = startPos;
            var to = initialVerticalScroll.scrollOffset;
            var scrollTop = done ? to : from + (to - from) * ease;

            me._setScrollTop(-scrollTop);

            if (!willDraw) {
                me._redraw();
            }
        };

        // Enforces the final vertical scroll position
        var setFinalVerticalPosition = function setFinalVerticalPosition() {
            var finalVerticalScroll = getItemVerticalScroll(me, item);

            if (finalVerticalScroll.shouldScroll && finalVerticalScroll.itemTop != initialVerticalScroll.itemTop) {
                me._setScrollTop(-finalVerticalScroll.scrollOffset);
                me._redraw();
            }
        };

        // Perform one last check at the end to make sure the final vertical
        // position is correct
        var finalVerticalCallback = function finalVerticalCallback() {
            // Double check we ended at the proper scroll position
            setFinalVerticalPosition();

            // Let the redraw settle and finalize the position.      
            setTimeout(setFinalVerticalPosition, 100);
        };

        // calculate the new middle and interval for the window
        var middle = (start + end) / 2;
        var interval = Math.max(this.range.end - this.range.start, (end - start) * 1.1);

        var animation = options && options.animation !== undefined ? options.animation : true;

        if (!animation) {
            // We aren't animating so set a default so that the final callback forces the vertical location
            initialVerticalScroll = { shouldScroll: false, scrollOffset: -1, itemTop: -1 };
        }

        this.range.setRange(middle - interval / 2, middle + interval / 2, { animation: animation }, finalVerticalCallback, verticalAnimationFrame);
    }
};

/**
 * @param {vis.Timeline} timeline
 * @param {vis.Item} item
 * @return {{shouldScroll: bool, scrollOffset: number, itemTop: number}}
 */
function getItemVerticalScroll(timeline, item) {
    var leftHeight = timeline.props.leftContainer.height;
    var contentHeight = timeline.props.left.height;

    var group = item.parent;
    var offset = group.top;
    var shouldScroll = true;
    var orientation = timeline.timeAxis.options.orientation.axis;

    var itemTop = function itemTop() {
        if (orientation == "bottom") {
            return group.height - item.top - item.height;
        } else {
            return item.top;
        }
    };

    var currentScrollHeight = timeline._getScrollTop() * -1;
    var targetOffset = offset + itemTop();
    var height = item.height;

    if (targetOffset < currentScrollHeight) {
        if (offset + leftHeight <= offset + itemTop() + height) {
            offset += itemTop() - timeline.itemSet.options.margin.item.vertical;
        }
    } else if (targetOffset + height > currentScrollHeight + leftHeight) {
        offset += itemTop() + height - leftHeight + timeline.itemSet.options.margin.item.vertical;
    } else {
        shouldScroll = false;
    }

    offset = Math.min(offset, contentHeight - leftHeight);

    return { shouldScroll: shouldScroll, scrollOffset: offset, itemTop: targetOffset };
}