

function init() {

    var lat = 46.3239455;
    var lng = -0.4645212;

    var zoomLevel = 13;
    var corner1 = L.latLng(46.231153027822046, -0.6389236450195312);
    var corner2 = L.latLng(46.417742374524046, -0.27706146240234375);
    var maxBounds = L.latLngBounds(corner1, corner2);
    map = L.map('map', {
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
    mainLayer.addTo(map);

    layers();

    // L.control.layers(
    //     {
    //         'Main': mainLayer
    //     },
    //     {
    //         "<img src='my-layer-icon' /> <span class='my-layer-item'>Transport</span>": groupLayer,
    //         'Cycle': cycle,
    //         'Cycle Parking': cycleParking,
    //         'Parking': parking,
    //     }
    // ).addTo(map);


}


async function  layers() {

    // Public Transport
    var transportLayer = L.tileLayer('http://openptmap.org/tiles/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://openptmap.org/" target="_blank" rel="noopener noreferrer">OpenPTMap</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OSM Contributors</a>',
        maxZoom: 22,
    });

    var cycle = L.geoJSON(cycleways, {attribution: '&copy; OpenStreetMap'});


    var cycleParking = L.geoJSON(bicycleParkings, {attribution: '&copy; OpenStreetMap'});

    var stopBus = L.geoJSON(busStops, {attribution: '&copy; OpenStreetMap'});

    var parking = L.geoJSON(parkings, {attribution: '&copy; OpenStreetMap'});

    var groupLayer = L.layerGroup([transportLayer, stopBus]);

    var defibrillateur = L.geoJSON(defibrillator, {attribution: '&copy; OpenStreetMap'});

    var pharmacie = L.geoJSON(pharmacy, {attribution: '&copy; OpenStreetMap'});

    var medecin = L.geoJSON(doctors, {attribution: '&copy; OpenStreetMap'});

    var hopital = L.geoJSON(hospital, {attribution: '&copy; OpenStreetMap'});

    var groupLayerSante = L.layerGroup([medecin, hopital]);

    tabLayer = await [cycle, cycleParking, stopBus, parking, groupLayer, defibrillateur, pharmacie, groupLayerSante];
    console.log("tab : ", tabLayer);
}



