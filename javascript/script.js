const ligne = [{
        id: "1",
        trajet: [TrajetLine1()],
        name: "Ligne 1"
    },
    {
        id: "2",
        trajet: [TrajetLine2()],
        name: "Ligne 2"
    },
    {
        id: "3",
        trajet: [TrajetLine3()],
        name: "Ligne 3"
    },
    {
        id: "4",
        trajet: [TrajetLine4()],
        name: "Ligne 4"
    },
    {
        id: "5",
        trajet: [TrajetLine5()],
        name: "Ligne 5"
    },
    {
        id: "6",
        trajet: [TrajetLine6()],
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
        trajet: [TrajetLine9()],
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
    map = L.map('map', {
        center: [lat, lng],
        zoom: zoomLevel,
        minZoom: zoomLevel,
        maxBounds,
        attributionControl: false,
    });
    L.control.attribution({position: 'topright'}).addTo(map);
    // map.zoomControl.setPosition('topright');


    //map.setMaxBounds(maxBounds);
    // Wikimedia
    var mainLayer = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
        name: "Wikimedia",
        attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
        minZoom: 1,
        maxZoom: 19
    });
    mainLayer.addTo(map)



    // carte
    var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
    });

    // carte sattelite
    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });




    layers();


    // L.control.layers(
    //     {
    //         'Main': mainLayer,
    //         'Satellite': Esri_WorldImagery,
    //         'Gris': Esri_WorldGrayCanvas,
    //     },
    //     {
    //         'Transport': groupLayer,
    //         ...mesTrace,
    //         'Cycle': cycle,
    //         'Cycle Parking': cycleParking,
    //         'Parking': parking,
    //         //'Cinema': cinemas,
    //         'Recyclage': recyclage,
    //     }
    // ).addTo(map);

}


function layers() {


    // Public Transport carte
    var transportLayer = L.tileLayer('http://openptmap.org/tiles/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://openptmap.org/" target="_blank" rel="noopener noreferrer">OpenPTMap</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OSM Contributors</a>',
        maxZoom: 19,
    });


    var cycle = L.geoJSON(cycleways, {attribution: '&copy; OpenStreetMap'});

    var cycleParking = L.geoJSON(bicycleParkings, {attribution: '&copy; OpenStreetMap'});


    //var cinemas = L.geoJSON(cinema, {attribution: '&copy; OpenStreetMap'});

    var recyclage = L.geoJSON(recyclings, {attribution: '&copy; OpenStreetMap'});

    var groupLayer = L.layerGroup([transportLayer]);


    var stopBus = L.geoJSON(busStops, {attribution: '&copy; OpenStreetMap'})

    var parking = L.geoJSON(parkings, {attribution: '&copy; OpenStreetMap'})

    var groupLayer = L.layerGroup([transportLayer, stopBus]);

    //tabLayer = [cycle, cycleParking, stopBus, parking, groupLayer];



    const coord = [];
    // var mcg = L.markerClusterGroup().addTo(map);

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
                            arret = feature.properties.name;
                            let ligne = feature.properties.route_ref;

                            let color = colorMarker(ligne);
                            let busMarker = L.AwesomeMarkers.icon({
                                prefix: 'fa',
                                icon: 'bus',
                                iconColor: 'white',
                                markerColor: color
                            });

                            let coordArret = [...feature.geometry.coordinates];

                            // if (coord.length === 0){
                            //     coord.push(latlng);
                            //     // console.log(coord);
                            // } else {
                            //     let found = coord.findIndex((coordonnees)=>{
                            //         return coordonnees.lat === coordArret[1] && coordonnees.lng === coordArret[0]
                            //     });
                            //     if(found < 0){
                            //         coord.push(latlng);
                            //
                            //         let marker = L.marker(latlng, {icon: busMarker});
                            //         marker.bindPopup(
                            //             '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
                            //             + '<h6>' + arret + '</h6>'
                            //             + logo(ligne).join(" ")
                            //         );
                            //         return marker;
                            //     } else {
                            //         let marker = L.marker(latlng, {icon: busMarker});
                            //         marker.bindPopup(
                            //             '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
                            //             + '<h6>' + arret + '</h6>'
                            //             + logo(ligne).join(" ")
                            //         );
                            //         marker.addTo(mcg);
                            //     }
                            // }

                            let marker = L.marker(
                                latlng,
                                {
                                    icon: busMarker,
                                    title: arret
                                });
                            marker.bindPopup(
                                '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
                                + '<h6>' + arret + '</h6>'
                                + logo(ligne).join(" ")
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

    // map.addLayer(mcg);

    // var cinemas = L.geoJSON(cinema, {attribution: '&copy; OpenStreetMap'});

    var parking = L.geoJSON(parkings, {attribution: '&copy; OpenStreetMap'});

    var recyclage = L.geoJSON(recyclings, {attribution: '&copy; OpenStreetMap'});

    var groupLayer = L.layerGroup([transportLayer]);

    let Tracer = L.layerGroup([TrajetLine1(), TrajetLine2(), TrajetLine3(), TrajetLine4(), TrajetLine5(), TrajetLine6(), TrajetLine7(), TrajetLine8(), TrajetLine9()])

    let mesTrace = {};

    tabLayer = new Array();
    tabLayer["Vélo"] = cycle;
    tabLayer["Bus"] = groupLayer

    mesLigne.forEach((ligne) => {
       // mesTrace[ligne.name] = L.layerGroup([ligne.trace, ...ligne.trajet]);
        tabLayer[ligne.name] = L.layerGroup([ligne.trace, ...ligne.trajet]);
    });

    tabLayer["Bus"] = Tracer;

}

function colorMarker(ligne) {
    let color = "";
    switch (ligne) {
        case "1":
            color = 'red';
            return color;
        case "1Bis":
            color = 'red';
            return color;
        case "2":
            color = 'darkgreen';
            return color;
        case "2 Alt":
            color = 'darkgreen';
            return color;
        case "2Bis":
            color = 'darkgreen';
            return color;
        case "3":
            color = 'cadetblue';
            return color;
        case "4":
            color = 'purple';
            return color;
        case "4Bis":
            color = 'purple';
            return color;
        case "5":
            color = 'blue';
            return color;
        case "5Bis":
            color = 'blue';
            return color;
        case "6":
            color = 'green';
            return color;
        case "6Bis":
            color = 'green';
            return color;
        case "7":
            color = 'darkpurple';
            return color;
        case "8":
            color = 'purple';
            return color;
        case "8Bis":
            color = 'purple';
            return color;
        case "9":
            color = "orange";
            return color;
        default:
            color = 'black';
            return color;
    }
}

function logo(arret) {
    let lignesDeBus = [];
    if (arret.includes("1")) {
        lignesDeBus.push('<img src="./assets/images/ligne/ligne1.png" class="logoLigne"/>');
    }
    if (arret.includes("2")) {
        lignesDeBus.push('<img src="./assets/images/ligne/ligne2.png" class="logoLigne"/>');
    }
    if (arret.includes("3")) {
        lignesDeBus.push('<img src="./assets/images/ligne/ligne3.png" class="logoLigne"/>');
    }
    if (arret.includes("4")) {
        lignesDeBus.push('<img src="./assets/images/ligne/ligne4.png" class="logoLigne"/>');
    }
    if (arret.includes("5")) {
        lignesDeBus.push('<img src="./assets/images/ligne/ligne5.png" class="logoLigne"/>');
    }
    if (arret.includes("6")) {
        lignesDeBus.push('<img src="./assets/images/ligne/ligne6.png" class="logoLigne"/>');
    }
    if (arret.includes("7")) {
        lignesDeBus.push('<img src="./assets/images/ligne/ligne7.png" class="logoLigne"/>');
    }
    if (arret.includes("8")) {
        lignesDeBus.push('<img src="./assets/images/ligne/ligne8.png" class="logoLigne"/>');
    }
    if (arret.includes("9")) {
        lignesDeBus.push('<img src="./assets/images/ligne/ligne9.png" class="logoLigne"/>');
    }
    return lignesDeBus;
}