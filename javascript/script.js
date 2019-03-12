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


    L.control.layers(
        {
            'Main': mainLayer,
            'Satellite': Esri_WorldImagery,
            'Gris': Esri_WorldGrayCanvas,
        }
    ).addTo(map);


    layers();


    var customControlToggle = L.Control.extend({

        options: {
            position: 'topright'
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom toggle');

            container.style.backgroundColor = 'white';
            container.style.backgroundSize = "30px 30px";

            container.innerHTML = '<i class="fa fa-arrow-left fa-2x"></i>';

            container.onclick = function () {
                clickTogglePosition();
            }

            return container;
        }
    });

    map.addControl(new customControlToggle());


}


function layers() {


    // Public Transport carte
    var transportLayer = L.tileLayer('http://openptmap.org/tiles/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://openptmap.org/" target="_blank" rel="noopener noreferrer">OpenPTMap</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OSM Contributors</a>',
        maxZoom: 19,
    });


    var cycle = L.geoJSON(cycleways, {id: 'cycleways', attribution: '&copy; OpenStreetMap', style: polystyle()});

    var cycleParking = L.geoJSON(bicycleParkings,
        {
            // onEachFeature: function (feature, layer) {
            //     var bounds = layer.getBounds();
            //     map.fitBounds(bounds);
            // },

            style: polystyle(),

            attribution: '&copy; OpenStreetMap',
            pointToLayer: function (feature, latlng) {

                var capacity = "";
                if (feature.properties.capacity !== undefined) {
                    capacity = "<p> Capacité :" + feature.properties.capacity + '</p>'
                }
                ;
                var couvert = "";
                //console.log("retertere" ,feature.properties.building )
                if (feature.properties.building === 'yes') {

                    couvert = "<p> Parking couvert </p>"
                };
                //let color = "#f19200";
                let cycleMarker = L.AwesomeMarkers.icon({
                    prefix: 'fa',
                    icon: 'bicycle ',
                    iconColor: 'white',
                    markerColor: "lightred"
                });
                let marker = L.marker(latlng, {icon: cycleMarker});
                marker.bindPopup(
                    capacity + couvert
                );
                return marker;

            }
        }
    );


    //var cinemas = L.geoJSON(cinema, {attribution: '&copy; OpenStreetMap'});

    var recyclage = L.geoJSON(recyclings, {attribution: '&copy; OpenStreetMap'});

    // var groupLayer = L.layerGroup([transportLayer]);


    var stopBus = L.geoJSON(busStops, {id: 'busStops', attribution: '&copy; OpenStreetMap'})

    //var parkingVoiture = L.geoJSON(parkings, {attribution: '&copy; OpenStreetMap'})

    var parkingVoitureSimple = parkingVoitu();
    var parkingVoitureGratuit = parkingVoitu("gratuit");
    var parkingVoitureCouvert = parkingVoitu("couvert");


    var groupLayer = L.layerGroup([cycle, stopBus]);

    //tabLayer = [cycle, cycleParking, stopBus, parking, groupLayer];


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
                            let marker = L.marker(latlng, {icon: busMarker});
                            marker.bindPopup(
                                '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
                                + '<h4>' + arret + '</h4>'
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


    tabLayer = new Array();
    tabLayer["Velo"] = cycle;
    tabLayer["Bus"] = groupLayer;
    tabLayer["ParkingVoiture"] = parkingVoitureSimple;
    tabLayer["ParkingGratuit"] = parkingVoitureGratuit;
    tabLayer["ParkingCouvert"] = parkingVoitureCouvert;
    tabLayer["ParkingVelo"] = cycleParking;


    mesLigne.forEach((ligne) => {
        tabLayer[ligne.name] = L.layerGroup([ligne.trace, ...ligne.trajet]);
    });


}


function parkingVoitu(param) {

    var parkingVoiture = L.geoJSON(parkings, {
            attribution: '&copy; OpenStreetMap',
            style: polystyle(param),
            filter: function (feature, layer) {
                if (param === "gratuit") {
                    if (feature.properties.fee === "no" && feature.properties.fee !== undefined) {
                        return true;
                    }

                } else if (param === "couvert") {
                    return feature.properties.building !== undefined;
                } else {
                    return true;
                }


            },
            pointToLayer: function (feature, latlng) {

                if (param === "gratuit") {
                    //console.log("feature.properties.fee :", feature.properties.fee)
                    var name = feature.properties.name;
                    let color = "green";
                    let busMarker = L.AwesomeMarkers.icon({
                        prefix: 'fa',
                        icon: 'car',
                        iconColor: 'white',
                        markerColor: "beige"
                    });
                    let marker = L.marker(latlng, {icon: busMarker});
                    marker.bindPopup(
                        '<h4>' + name + '</h4>'
                    );
                    return marker;

                } else if (param === "couvert") {
                    //console.log("feature.properties.building :", feature.properties.building)

                    var name = feature.properties.name;
                    let color = "blue";
                    let busMarker = L.AwesomeMarkers.icon({
                        prefix: 'fa',
                        icon: 'car',
                        iconColor: 'white',
                        markerColor: "cadetblue"
                    });
                    let marker = L.marker(latlng, {icon: busMarker});
                    marker.bindPopup(
                        '<h4>' + name + '</h4>'
                    );
                    return marker;
                    // }
                } else {
                    //console.log("feature.properties.name :", feature.properties.name)
                    var name = feature.properties.name;
                    let color = "black";
                    let busMarker = L.AwesomeMarkers.icon({
                        prefix: 'fa',
                        icon: 'car',
                        iconColor: 'white',
                        markerColor: "cadetblue"
                    });
                    let marker = L.marker(latlng, {icon: busMarker});
                    marker.bindPopup(
                        '<h4>' + name + '</h4>'
                    );
                    return marker;
                }
            }

        }
        )
    ;

    return parkingVoiture;

}

function polystyle(param) {
    if (param === "gratuit") {
        return {
            fillColor: '#12d9c9',
            weight: 3,
            opacity: 1,
            color: '#12d9c9',  //Outline color
            fillOpacity: 0.4
        };
    } else {
        return {
            fillColor: '#12a5d4',
            weight: 3,
            opacity: 1,
            color: '#12a5d4',  //Outline color
            fillOpacity: 0.4
        };
    }

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