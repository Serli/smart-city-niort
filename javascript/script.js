
function init() {

    var lat = 46.3239455;
    var lng = -0.4645212;

    var zoomLevel = 13;
    var corner1 = L.latLng(46.231153027822046, -0.6389236450195312);
    var corner2 = L.latLng(46.417742374524046, -0.27706146240234375);
    var maxBounds = L.latLngBounds(corner1, corner2);
    var map = L.map('map', {
        center: [lat, lng], 
        zoom: zoomLevel,
        minZoom: zoomLevel,
        maxBounds
    });
    //map.setMaxBounds(maxBounds);
    // Wikimedia
    var mainLayer = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
        attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
        minZoom: 1,
        maxZoom: 19
    });
    mainLayer.addTo(map)
    // Public Transport
    var transportLayer = L.tileLayer('http://openptmap.org/tiles/{z}/{x}/{y}.png',{
        attribution: '&copy; <a href="http://openptmap.org/" target="_blank" rel="noopener noreferrer">OpenPTMap</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OSM Contributors</a>',
        maxZoom: 19,
    });

    var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
    });

    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    var customIconBus = L.icon({
        iconUrl: './assets/images/icon1.png',
        iconSize: [32,32],
        iconAnchor: [16,32],
        popupAnchor: [0, -32]
    });

    var cycle = L.geoJSON(cycleways, {attribution: '&copy; OpenStreetMap'});

    var cycleParking = L.geoJSON(bicycleParkings, {attribution: '&copy; OpenStreetMap'});

    var ligne1 = L.geoJSON(BusStopLigne1,
        {
            attribution: '&copy; OpenStreetMap',
            pointToLayer: function(feature,latlng){
                var arret;
                if(feature.properties.name !== undefined){
                    var marker = L.marker(latlng);
                    arret = feature.properties.name;
                    let ligne = feature.properties.route_ref;
                    marker.bindPopup(
                        '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
                        + '<h4>'+arret+'</h4>'
                        + '<p>'+"Ligne de bus : "+ligne+'</p>'
                    );
                    return marker;
                }
            }
        });

    var ligne2 = L.geoJSON(BusStopLigne2,
        {
            attribution: '&copy; OpenStreetMap',
            pointToLayer: function(feature,latlng){
                var arret;
                if(feature.properties.name !== undefined){
                    var marker = L.marker(latlng);
                    arret = feature.properties.name;
                    let ligne = feature.properties.route_ref;
                    marker.bindPopup(
                        '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
                        + '<h4>'+arret+'</h4>'
                        + '<p>'+"Ligne de bus : "+ligne+'</p>'
                    );
                    return marker;
                }
            }
        });

    var ligne3 = L.geoJSON(BusStopLigne3,
        {
            attribution: '&copy; OpenStreetMap',
            pointToLayer: function(feature,latlng){
                var arret;
                if(feature.properties.name !== undefined){
                    var marker = L.marker(latlng);
                    arret = feature.properties.name;
                    let ligne = feature.properties.route_ref;
                    marker.bindPopup(
                        '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
                        + '<h4>'+arret+'</h4>'
                        + '<p>'+"Ligne de bus : "+ligne+'</p>'
                    );
                    return marker;
                }
            }
        });

    var ligne4 = L.geoJSON(BusStopLigne4,
        {
            attribution: '&copy; OpenStreetMap',
            pointToLayer: function(feature,latlng){
                var arret;
                if(feature.properties.name !== undefined){
                    var marker = L.marker(latlng);
                    arret = feature.properties.name;
                    let ligne = feature.properties.route_ref;
                    marker.bindPopup(
                        '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
                        + '<h4>'+arret+'</h4>'
                        + '<p>'+"Ligne de bus : "+ligne+'</p>'
                    );
                    return marker;
                }
            }
        });

    var ligne5 = L.geoJSON(BusStopLigne5,
        {
            attribution: '&copy; OpenStreetMap',
            pointToLayer: function(feature,latlng){
                var arret;
                if(feature.properties.name !== undefined){
                    var marker = L.marker(latlng);
                    arret = feature.properties.name;
                    let ligne = feature.properties.route_ref;
                    marker.bindPopup(
                        '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
                        + '<h4>'+arret+'</h4>'
                        + '<p>'+"Ligne de bus : "+ligne+'</p>'
                    );
                    return marker;
                }
            }
        });

    var stopBus = L.geoJSON(busStops, 
        {
            attribution: '&copy; OpenStreetMap',
            pointToLayer: function(feature,latlng){
                var arret;
                if(feature.properties.name !== undefined){
                    var marker = L.marker(latlng);
                    arret = feature.properties.name;
                    let ligne = feature.properties.route_ref;
                    marker.bindPopup(
                        '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
                        + '<h4>'+arret+'</h4>'
                        + '<p>'+"Ligne de bus : "+ligne+'</p>'
                    );
                    return marker;
                }
            }
        });

    var cinemas = L.geoJSON(cinema, {attribution: '&copy; OpenStreetMap'});

    var parking = L.geoJSON(parkings, {attribution: '&copy; OpenStreetMap'});

    var groupLayerLigne1 = L.layerGroup([ligne1, TrajetLine1Bis(), TrajetLine1Bis2(), TrajetLine1()]);

    var groupLayerLigne2 = L.layerGroup([ligne2, TrajetLine2Alt(), TrajetLine2(), TrajetLine2Bis()]);

    var groupLayerLigne3 = L.layerGroup([ligne3, TrajetLine3()]);

    var groupLayerLigne4 = L.layerGroup([ligne4, TrajetLine4(), TrajetLine4Pissardent(), TrajetLine4Moulin()]);

    var groupLayerLigne5 = L.layerGroup([ligne5, TrajetLine5(), TrajetLine5Chauray() ,TrajetLine5Zodiac()]);

    var groupLayer = L.layerGroup([transportLayer, stopBus]);

    L.control.layers(
        {
            'Main': mainLayer,
            'Satellite': Esri_WorldImagery,
            'Gris': Esri_WorldGrayCanvas,
        },
        {
            'Transport': groupLayer,
            'Ligne 1': groupLayerLigne1,
            'Ligne 2' : groupLayerLigne2,
            'Ligne 3' : groupLayerLigne3,
            'Ligne 4' : groupLayerLigne4,
            'Ligne 5' : groupLayerLigne5,
            'Cycle': cycle,
            'Cycle Parking': cycleParking,
            'Parking': parking,
            'Cinema': cinemas,
        }
        ).addTo(map)


}