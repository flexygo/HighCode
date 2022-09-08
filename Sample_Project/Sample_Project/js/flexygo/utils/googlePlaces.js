var flexygo;
(function (flexygo) {
    var utils;
    (function (utils) {
        var googlePlaces;
        (function (googlePlaces) {
            var autocomplete;
            (function (autocomplete_1) {
                function init(adressTextBox, config, options, cllback) {
                    let googleAPIKey = flexygo.utils.GoogleAPIKey;
                    if (googleAPIKey) {
                        if (typeof google === 'object' && typeof google.maps === 'object' && typeof google.maps.places === 'object' && typeof google.maps.places.Autocomplete === 'function') {
                            _init(adressTextBox, config, options, cllback);
                        }
                        else {
                            if ($('#gMapApiAutocomplete').length == 0) {
                                let script = document.createElement("script");
                                script.type = "text/javascript";
                                script.id = 'gMapApiAutocomplete';
                                script.src = "//maps.googleapis.com/maps/api/js?key=" + googleAPIKey + "&libraries=places";
                                document.body.appendChild(script);
                            }
                            setTimeout(() => { _init(adressTextBox, config, options, cllback); }, 500);
                        }
                    }
                    else {
                        alert(flexygo.localization.translate('text.api'));
                    }
                }
                autocomplete_1.init = init;
                function _init(adressTextBox, config, options, cllback) {
                    let autocomplete;
                    let address1Field;
                    if ($('#' + adressTextBox).length > 0) {
                        address1Field = $('#' + adressTextBox)[0];
                    }
                    else if ($('[property="' + adressTextBox + '"]').find('input').length > 0) {
                        address1Field = $('[property="' + adressTextBox + '"]').find('input')[0];
                    }
                    if (address1Field) {
                        let defOptions = { types: ["address"] };
                        if (options) {
                            defOptions = Object.assign({}, defOptions, options);
                        }
                        autocomplete = new google.maps.places.Autocomplete(address1Field, defOptions);
                        autocomplete.addListener("place_changed", () => {
                            let adressObj = {};
                            // Get the place details from the autocomplete object.
                            const place = autocomplete.getPlace();
                            adressObj['lat'] = place.geometry.location.lat();
                            adressObj['lng'] = place.geometry.location.lng();
                            adressObj['geo'] = place.geometry.location.lat() + ', ' + place.geometry.location.lng();
                            for (const component of place.address_components) {
                                const componentType = component.types[0];
                                adressObj[componentType] = component.long_name;
                                if (componentType.startsWith('administrative_area_level') || componentType == 'country') {
                                    adressObj[componentType + '_short'] = component.short_name;
                                }
                            }
                            for (let key in adressObj) {
                                if (config && config[key]) {
                                    if ($('#' + config[key]).length > 0) {
                                        $('#' + config[key]).val(adressObj[key]);
                                    }
                                    else if ($('[property="' + config[key] + '"]').length > 0) {
                                        $('[property="' + config[key] + '"]').val(adressObj[key]);
                                    }
                                }
                            }
                            if (cllback) {
                                cllback(adressObj);
                            }
                        });
                    }
                }
            })(autocomplete = googlePlaces.autocomplete || (googlePlaces.autocomplete = {}));
        })(googlePlaces = utils.googlePlaces || (utils.googlePlaces = {}));
    })(utils = flexygo.utils || (flexygo.utils = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=googlePlaces.js.map