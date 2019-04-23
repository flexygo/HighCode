// https://github.com/IndigoUnited/jquery.destroy-event
(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }
} (this, function ($) {

    'use strict';

    // Detect if support is already added by third-party code
    var oldClean,
        hasSupport;

    // Delete any third-party code using special "destroy" event
    // before testing, because it doesn't work correctly
    delete $.event.special.destroy;

    $('<div></div>').on('destroy', function () {
        hasSupport = true;
    }).remove();

    if (hasSupport) {
        return;
    }

    // Finally hook into jQuery to add support for the "destroy" event
    oldClean = $.cleanData;

    $.cleanData = function (elems) {
        var i,
            elem,
            data;

        for (i = 0; (elem = elems[i]) != null; i += 1) {
            // Only trigger remove when necessary to save time
            // The flag _destroy_event_triggered is just to avoid trigger the destroy again
            // in cases like:
            //      $(elem).on('destroy', function () { $(elem).remove(); });
            //      $(elem).remove();
            // When the remove is called in the destroy handler it will not fire the destroy again.
            data = $._data(elem);
            if (data && data.events && data.events.destroy && !data._destroy_event_triggered) {
                data._destroy_event_triggered = true;
                $(elem).triggerHandler('destroy');
            }
        }

        oldClean(elems);
    };

    return $;
}));
