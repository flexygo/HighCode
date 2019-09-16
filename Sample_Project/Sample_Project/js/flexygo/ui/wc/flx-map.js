/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
           * Library for the FlxMapElement web component.
           *
           * @class FlxMapElement
           * @constructor
           * @return {FlxMapElement}
           */
            class FlxMapElement extends HTMLElement {
                constructor() {
                    super();
                    /**
                   * Set when component is attached to DOM
                   * @property connected {boolean}
                   */
                    this.connected = false;
                    this.moduleName = null;
                    this.options = null;
                    this.lat = null;
                    this.lng = null;
                    this.mode = null;
                }
                /**
               * Fires when element is attached to DOM
               * @method connectedCallback
               */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.moduleName = element.attr("modulename");
                    this.data = element.attr('value');
                    this.mode = element.attr("mode");
                    if (element.attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
              * Array of observed attributes.
              * @property observedAttributes {Array}
              */
                static get observedAttributes() {
                    return ['modulename', 'value', 'mode'];
                }
                /**
               * Fires when the attribute value of the element is changed.
               * @method attributeChangedCallback
               */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (!this.connected) {
                        return;
                    }
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        if (this.moduleName) {
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() == 'value' && newVal && newVal != '') {
                        this.data = newVal;
                        if (this.data) {
                            this.refresh();
                        }
                    }
                    if (attrName.toLowerCase() == 'mode' && newVal && newVal != '') {
                        this.mode = newVal;
                        if (this.mode) {
                            this.refresh();
                        }
                    }
                }
                refresh() {
                    if ($(this).attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                init() {
                    let me = $(this);
                    me.removeAttr('manualInit');
                    me.prepend('<div class="mapContainer" style="width: auto; height: auto;"></div>');
                    if (this.moduleName) {
                        let params = {
                            ObjectName: me.attr('ObjectName'),
                            ObjectWhere: me.attr('ObjectWhere'),
                            ModuleName: this.moduleName,
                            PageName: flexygo.history.getPageName(me)
                        };
                        flexygo.ajax.post('~/api/Map', 'GetHTML', params, (response) => {
                            if (response) {
                                for (let i = 0, x; x = response.Markers[i++];) {
                                    let html = $('<marker/>').attr('lat', x.lat).attr('lng', x.lng).attr('address', x.address).attr('title', x.title).attr('icon', x.icon).attr('label', x.label).attr('zIndex', x.zIndex).html(x.content);
                                    me.append(html);
                                }
                                this.options = response.Options;
                                this.render();
                            }
                        }, null, () => { this.stopLoading(); }, () => { this.startLoading(); });
                    }
                    else {
                        this.render();
                    }
                }
                render() {
                    let me = $(this);
                    let googleAPIKey = flexygo.utils.GoogleAPIKey;
                    if (googleAPIKey) {
                        if (typeof google === 'object' && typeof google.maps === 'object') {
                            this.initMap();
                        }
                        else {
                            if ($('#gMapApi').length == 0) {
                                let script = document.createElement("script");
                                script.type = "text/javascript";
                                script.id = 'gMapApi';
                                script.src = "//maps.google.com/maps/api/js?v=3&key=" + googleAPIKey + "&language=es&callback=initAllMaps";
                                document.body.appendChild(script);
                            }
                        }
                    }
                    else {
                        me.empty();
                        me.append('<div style="background-color: white; font-weight: 500; font-family: Roboto, sans-serif; padding: 15px 25px;border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 5px; left: 50%; position: relative; transform: translateX(-50%); z-index: 1;"><div style="line-height: 20px; margin: 15px 0px;"><span style="color: rgba(0, 0, 0, 0.87); font-size: 20px;">' + flexygo.localization.translate('text.api') + '</span> </div><table style="width: 100%;"><tr><td style="line-height: 16px; vertical-align: middle;"><a onclick="flexygo.nav.openHelpId(\'syshelp-apikey\',\'current\',false,$(this))" href=""  style="color: rgba(0, 0, 0, 0.54); font-size: 12px; ">' + flexygo.localization.translate('text.apihelp') + '</a></td></tr></table></div>');
                    }
                    let parentModule = me.closest('flx-module');
                    let wcModule = parentModule[0];
                    if (parentModule && wcModule) {
                        wcModule.moduleLoaded(this);
                    }
                }
                initMap() {
                    let me = $(this);
                    let color;
                    let cl = "true";
                    let infowindow = new google.maps.InfoWindow();
                    let markers = me.find('marker');
                    let marker, i;
                    let positionMarker;
                    let cluster = [];
                    let markerCluster;
                    let zoom;
                    let bounds = new google.maps.LatLngBounds();
                    let night = new google.maps.StyledMapType([{ "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#6b9a76" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#f3d19c" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] }, { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] }, { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }]);
                    let retro = new google.maps.StyledMapType([{ "elementType": "geometry", "stylers": [{ "color": "#ebe3cd" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#523735" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#c9b2a6" }] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [{ "color": "#dcd2be" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#ae9e90" }] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#93817c" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#a5b076" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#447530" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#fdfcf8" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#f8c967" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#e9bc62" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#e98d58" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [{ "color": "#db8555" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#806b63" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [{ "color": "#8f7d77" }] }, { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ebe3cd" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#b9d3c2" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#92998d" }] }]);
                    let silver = new google.maps.StyledMapType([{ "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "on" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#dadada" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }]);
                    let dark = new google.maps.StyledMapType([{ "elementType": "geometry", "stylers": [{ "color": "#212121" }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "on" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] }, { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }, { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#181818" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] }, { "featureType": "poi.park", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1b1b1b" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8a8a" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#373737" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#3c3c3c" }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#4e4e4e" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#3d3d3d" }] }]);
                    let aubergine = new google.maps.StyledMapType([{ "elementType": "geometry", "stylers": [{ "color": "#1d2c4d" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#8ec3b9" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#1a3646" }] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "color": "#4b6878" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#64779e" }] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [{ "color": "#4b6878" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [{ "color": "#334e87" }] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#023e58" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#283d6a" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#6f9ba5" }] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1d2c4d" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#023e58" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#3C7680" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#304a7d" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#98a5be" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1d2c4d" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#2c6675" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#255763" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#b0d5ce" }] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [{ "color": "#023e58" }] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "color": "#98a5be" }] }, { "featureType": "transit", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1d2c4d" }] }, { "featureType": "transit.line", "elementType": "geometry.fill", "stylers": [{ "color": "#283d6a" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#3a4762" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0e1626" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#4e6d70" }] }]);
                    let options = { Cluster: 'true', Color: '', Width: 'auto', Height: '300px' };
                    if (this.options && this.options != '') {
                        let newOptions = JSON.parse(this.options);
                        for (let key in newOptions) {
                            options[key] = newOptions[key];
                        }
                    }
                    cl = options.Cluster;
                    color = options.Color;
                    me.find('.mapContainer').width(options.Width);
                    me.find('.mapContainer').height(options.Height);
                    if (me.attr('width') && me.attr('width') != '') {
                        me.find('.mapContainer').height(me.attr('width'));
                    }
                    if (me.attr('height') && me.attr('height') != '') {
                        me.find('.mapContainer').height(me.attr('height'));
                    }
                    //Create a map object and specify the DOM element for display.
                    let map = new google.maps.Map(me.find('.mapContainer')[0], {
                        center: new google.maps.LatLng(0, 0),
                        scrollwheel: true,
                        zoom: 0,
                    });
                    if (this.mode == 'coord') {
                        map.setOptions({ disableDefaultUI: true, zoomControl: true });
                    }
                    if (me.attr('cluster') && me.attr('cluster') != '') {
                        cl = me.attr('cluster');
                    }
                    if (me.attr('color') && me.attr('color') != '') {
                        color = me.attr('color');
                    }
                    if (markers.length == 0) {
                        if (me.attr('zoom') && me.attr('zoom') != '') {
                            zoom = parseInt(me.attr('zoom'));
                            map.setZoom(zoom);
                        }
                    }
                    if (color) {
                        switch (color) {
                            case "night":
                                map.mapTypes.set(color, night);
                                map.setMapTypeId(color);
                                break;
                            case "retro":
                                map.mapTypes.set(color, retro);
                                map.setMapTypeId(color);
                                break;
                            case "silver":
                                map.mapTypes.set(color, silver);
                                map.setMapTypeId(color);
                                break;
                            case "dark":
                                map.mapTypes.set(color, dark);
                                map.setMapTypeId(color);
                                break;
                            case "aubergine":
                                map.mapTypes.set(color, aubergine);
                                map.setMapTypeId(color);
                                break;
                        }
                    }
                    for (let i = 0, x; x = markers[i++];) {
                        let icon = {
                            url: x.getAttribute('icon'),
                            scaledSize: new google.maps.Size(35, 35),
                        };
                        if (x.getAttribute('lng') && x.getAttribute('lng') != '' && x.getAttribute('lng') != 'null' && x.getAttribute('lat') && x.getAttribute('lat') != '' && x.getAttribute('lat') != 'null') {
                            positionMarker = new google.maps.LatLng(x.getAttribute('lat'), x.getAttribute('lng'));
                            if (positionMarker.lat() != null) {
                                map.lat = positionMarker.lat();
                            }
                            if (positionMarker.lng() != null) {
                                map.lng = positionMarker.lng();
                            }
                            createMarker(positionMarker, x.getAttribute('title'), x.innerHTML, icon, x.getAttribute('label'), x.getAttribute('zIndex'));
                        }
                        else {
                            if (x.getAttribute('address') && x.getAttribute('address') != '') {
                                geocoderAddress(x.getAttribute('address'), x.getAttribute('title'), x.innerHTML, icon, x.getAttribute('label'), x.getAttribute('zIndex'));
                            }
                        }
                        x.style = "display:none";
                    }
                    google.maps.event.addListener(map, 'idle', function () {
                        if (cl == 'true' && cluster.length > 0) {
                            markerCluster.repaint();
                        }
                    });
                    if (this.mode == "coord") {
                        if ($('input.srch').val() != null) {
                            let geocoder = new google.maps.Geocoder();
                            geocoder.geocode({ 'address': $('input.srch').val() }, function (results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    var latitude = results[0].geometry.location.lat();
                                    var longitude = results[0].geometry.location.lng();
                                    if (latitude != null) {
                                        me.attr("lat", latitude);
                                    }
                                    if (longitude != null) {
                                        me.attr("lng", longitude);
                                    }
                                }
                            });
                        }
                        google.maps.event.addListener(map, 'click', (event) => {
                            var latitude = event.latLng.lat();
                            var longitude = event.latLng.lng();
                            var coordinate = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
                            setMapOnAll(null);
                            createMarker(coordinate, null, null, null, null, null);
                            if (latitude != null) {
                                this.lat = latitude;
                            }
                            if (longitude != null) {
                                this.lng = longitude;
                            }
                        });
                        function setMapOnAll(map) {
                            for (var i = 0; i < cluster.length; i++) {
                                cluster[i].setMap(map);
                            }
                            cluster.length = 0;
                            cluster = [];
                        }
                    }
                    // Limit the zoom level
                    google.maps.event.addListener(map, 'zoom_changed', function () {
                        if (map.getZoom() < 1)
                            map.setZoom(1);
                    });
                    google.maps.event.addListener(map, 'center_changed', function () {
                        checkBounds(map);
                    });
                    google.maps.event.addListener(map, 'maptypeid_changed', function () {
                        if (map.getMapTypeId() == 'roadmap' && color) {
                            map.setMapTypeId(color);
                        }
                    });
                    function geocoderAddress(address, title, content, icon, label, zIndex) {
                        let geocoder = new google.maps.Geocoder();
                        geocoder.geocode({ 'address': address }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                if (results[0].geometry.location.lat() != null) {
                                    map.lat = results[0].geometry.location.lat();
                                }
                                if (results[0].geometry.location.lng() != null) {
                                    map.lng = results[0].geometry.location.lng();
                                }
                                createMarker(results[0].geometry.location, title, content, icon, label, zIndex);
                            }
                            else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                                setTimeout(function () {
                                    geocoderAddress(address, title, content, icon, label, zIndex);
                                }, 200);
                            }
                            else {
                                if (status == 'ZERO_RESULTS') {
                                    flexygo.msg.warning(flexygo.localization.translate('text.errormap'));
                                }
                                else {
                                    flexygo.msg.warning("Geocode was not successful for the following reason: " + status);
                                    // alert("Geocode was not successful for the following reason: " + status);
                                }
                            }
                        });
                    }
                    function createMarker(position, title, content, icon, label, zIndex) {
                        if (position.lat() != null) {
                            map.lat = position.lat();
                        }
                        if (position.lng() != null) {
                            map.lng = position.lng();
                        }
                        if (position.lat() < 85 && position.lat() > -85 && position.lng() < 180 && position.lng() > -180) {
                            if (icon && icon.url) {
                                marker = new google.maps.Marker({
                                    map: map,
                                    title: title,
                                    icon: icon,
                                    position: position,
                                    label: label,
                                    zIndex: google.maps.Marker.MAX_ZINDEX + parseInt(zIndex),
                                    animation: google.maps.Animation.DROP
                                });
                            }
                            else {
                                marker = new google.maps.Marker({
                                    map: map,
                                    title: title,
                                    position: position,
                                    label: label,
                                    zIndex: google.maps.Marker.MAX_ZINDEX + parseInt(zIndex),
                                    animation: google.maps.Animation.DROP
                                });
                            }
                            cluster.push(marker);
                            bounds.extend(marker.position);
                            map.fitBounds(bounds);
                            map.setCenter(bounds.getCenter());
                        }
                        if (position.lat() != null) {
                            me.lat = position.lat();
                            $(this).lat = position.lat();
                        }
                        if (position.lng() != null) {
                            me.lng = position.lng();
                            $(this).lng = position.lng();
                        }
                        if (me.attr('mode') == "coord") {
                            if (me.attr('zoom') && me.attr('zoom') != '') {
                                zoom = map.getZoom(); // 17;                    
                                if (zoom == 22) {
                                    zoom = 10;
                                }
                                map.setZoom(zoom);
                            }
                        }
                        else {
                            if (me.attr('zoom') && me.attr('zoom') != '') {
                                zoom = parseInt(me.attr('zoom'));
                                map.setZoom(zoom);
                            }
                        }
                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {
                                //map.setZoom(20);
                                map.setCenter(marker.getPosition());
                                if (content) {
                                    infowindow.setContent(content + "<br><a style='color:#427fed;' href='http://maps.google.com?q=" + marker.position + "'>Ver en Google Maps</a>");
                                }
                                else {
                                    infowindow.setContent("<a style='color:#427fed;' href='http://maps.google.com?q=" + marker.position + "'>Ver en Google Maps</a>");
                                }
                                infowindow.open(map, marker);
                            };
                        })(marker, i));
                        if (cl == 'true') {
                            markerCluster = new MarkerClusterer(map, cluster, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
                        }
                    }
                    // If the map position is out of range, move it back
                    function checkBounds(map) {
                        let latNorth = map.getBounds().getNorthEast().lat();
                        let latSouth = map.getBounds().getSouthWest().lat();
                        let newLat;
                        if (latNorth < 85 && latSouth > -85)
                            return;
                        else {
                            if (latNorth > 85 && latSouth < -85)
                                return;
                            else {
                                if (latNorth > 85)
                                    newLat = map.getCenter().lat() - (latNorth - 85); /* too north, centering */
                                if (latSouth < -85)
                                    newLat = map.getCenter().lat() - (latSouth + 85); /* too south, centering */
                            }
                        }
                        if (newLat) {
                            let newCenter = new google.maps.LatLng(newLat, map.getCenter().lng());
                            map.setCenter(newCenter);
                        }
                    }
                }
                translate(str) {
                    return flexygo.localization.translate(str);
                }
                startLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].startLoading();
                    }
                }
                stopLoading() {
                    if ($(this).parents('flx-module').length > 0) {
                        $(this).parents('flx-module')[0].stopLoading();
                    }
                }
            }
            wc.FlxMapElement = FlxMapElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-map', flexygo.ui.wc.FlxMapElement);
function initAllMaps() {
    $('flx-map').each((i, e) => {
        e.initMap();
    });
}
//# sourceMappingURL=flx-map.js.map