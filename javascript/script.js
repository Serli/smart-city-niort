const ligne = [{
        id: "1",
        trajet: [TrajetLine1Bis(), TrajetLine1Bis2(), TrajetLine1()],
        name: "Ligne 1"
    },
    {
        id: "2",
        trajet: [TrajetLine2Alt(), TrajetLine2(), TrajetLine2Bis()],
        name: "Ligne 2"
    },
    {
        id: "3",
        trajet: [TrajetLine3()],
        name: "Ligne 3"
    },
    {
        id: "4",
        trajet: [TrajetLine4(), TrajetLine4Pissardent(), TrajetLine4Moulin()],
        name: "Ligne 4"
    },
    {
        id: "5",
        trajet: [TrajetLine5(), TrajetLine5Chauray(), TrajetLine5Zodiac()],
        name: "Ligne 5"
    },
    {
        id: "6",
        trajet: [TrajetLine6SaintLiguaire(), TrajetLine6(), TrajetLine6JeanZay()],
        name: "Ligne 6"
    },
    {
        id: "7",
        trajet: [TrajetLine7()],
        name: "Ligne 7"
    },
    {
        id: "8",
        trajet: [TrajetLine8()],
        name: "Ligne 8"
    },
    {
        id: "9",
        trajet: [TrajetLine9(), TrajetLine9Alt()],
        name: "Ligne 9"
    },
];

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
    var transportLayer = L.tileLayer('http://openptmap.org/tiles/{z}/{x}/{y}.png', {
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
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    var cycle = L.geoJSON(cycleways, {attribution: '&copy; OpenStreetMap'});

    var cycleParking = L.geoJSON(bicycleParkings, {attribution: '&copy; OpenStreetMap'});

    let mesLigne = ligne.map((ligne) => {
        let busStopLigne = busStops.features.filter((arret) => {
            return arret.properties.route_ref && arret.properties.route_ref.indexOf(ligne.id) > -1
        });
        return {
            trace: L.geoJSON(busStopLigne,
                {
                    attribution: '&copy; OpenStreetMap',
                    pointToLayer: function (feature, latlng) {
                        var arret;
                        if (feature.properties.name !== undefined) {
                            var marker = L.marker(latlng);
                            arret = feature.properties.name;
                            let ligne = feature.properties.route_ref;
                            marker.bindPopup(
                                '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
                                + '<h4>' + arret + '</h4>'
                                + '<p>' + "Ligne de bus : " + ligne + '</p>'
                            );
                            return marker;
                        }
                    }
                }
            ),
            name: ligne.name,
            trajet: ligne.trajet
        }
    });

    var cinemas = L.geoJSON(cinema, {attribution: '&copy; OpenStreetMap'});

    var parking = L.geoJSON(parkings, {attribution: '&copy; OpenStreetMap'});

    var groupLayer = L.layerGroup([transportLayer]);


    let mesTrace = {};

    mesLigne.forEach((ligne) => {
        mesTrace[ligne.name] = L.layerGroup([ligne.trace, ...ligne.trajet]);
    });

    L.control.layers(
        {
            'Main': mainLayer,
            'Satellite': Esri_WorldImagery,
            'Gris': Esri_WorldGrayCanvas,
        },
        {
            'Transport': groupLayer,
            ...mesTrace,
            'Cycle': cycle,
            'Cycle Parking': cycleParking,
            'Parking': parking,
            'Cinema': cinemas,
        }

    ).addTo(map)


}