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

function markerPopup(feature) {
    const day = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    let dateDebut = "";
    let dateFin = "";
    let ouverture = "";
    let today = new Date();
    const {opening_hours, amenity, name} = feature.properties;
    if (opening_hours && amenity === 'pharmacy') {

        let split = [];
        if (opening_hours.indexOf(';') > 0) {
            split = opening_hours.split(';');
        } else if (opening_hours.indexOf(',') > 0) {
            split = opening_hours.split(',');
        }else{
            split= [opening_hours];
        }
        split.forEach(plage => {
            let number = plage.search(/ ([0_9]+)/);
            let days = plage.substring(0, number);
            let dateDay = days.split("-");
            let horaire = plage.substring(number, plage.length);
            let plageHoraire = horaire.split("/");

            //console.log(days.trim().startsWith(day[today.getDay()-1])+"/"+ days.trim().startsWith(day[today.getDay()-1], 3)+"/" +(dateDay[1] && today.getDay()-1 >= day.indexOf(dateDay[0].trim()) && today.getDay()-1 <= day.indexOf(dateDay[1].trim())));

            if(days.trim().startsWith(day[today.getDay()-1]) ||
                days.trim().startsWith(day[today.getDay()-1], 3) ||
                (dateDay[1] && (today.getDay()-1 >= day.indexOf(dateDay[0].trim()) && today.getDay()-1 <= day.indexOf(dateDay[1].trim())))) {

                plageHoraire.forEach((h) => {
                    let strings = h.split("-");
                    dateDebut = strings[0];
                    dateFin = strings[1];
                    let dateD = new Date();
                    let hours = Number(dateDebut.split(":")[0]);
                    let minutes = Number(dateDebut.split(":")[1]);
                    dateD.setHours(hours);
                    dateD.setMinutes(minutes);


                    let dateF = new Date();
                    let hoursF = Number(dateFin.split(":")[0]);
                    let minutesF = Number(dateFin.split(":")[1]);
                    dateF.setHours(hoursF);
                    dateF.setMinutes(minutesF);


                    if (dateD.getTime() < today.getTime() && dateF.getTime() > today.getTime()) {
                        ouverture = "Ouvert";
                    }
                    else {
                        ouverture = "Fermé";
                    }
                });
            }
        });
    }

    if(dateDebut !== "" && dateFin !== "") {
        return (
            '<div class="titre"><span class="markerPopup">' + feature.properties.name + '</span></div>'
            + '<div class="infos"><label>' + feature.properties.amenity + '</label><br/>' +
            '<label>'+ ouverture + dateDebut + "-" + dateFin +'</label></div>'
        );
    }
    else {
        return (
            '<div class="titre"><span class="markerPopup">' + feature.properties.name + '</span></div>'
            + '<div class="infos"><label>' + feature.properties.amenity + '</label><br/>' +
            '<label>Horaires Inconnues</label></div>'
        );
    }
}

async function layers() {

    var groupLayerData = L.layerGroup();
    var groupLayerEntraide = L.layerGroup();

    transiscopeDatas.map(data => {
        if (data.categories.length !== 0 &&
            ((data.location.lat >= 46.231153027822046 && data.location.lon >= -0.6389236450195312) &&
                (data.location.lat <= 46.417742374524046 && data.location.lon <= -0.27706146240234375))) {
            if (data.categories[0].id === 33) {
                L.marker([data.location.lat, data.location.lon], {title: data.title}).addTo(groupLayerData);
            }

            if (data.categories[0].id === 21) {
                L.marker([data.location.lat, data.location.lon], {title: data.title}).addTo(groupLayerEntraide);
            }
        }
    });

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

    var pharmacie = L.geoJSON(pharmacy, {
        attribution: '&copy; OpenStreetMap', onEachFeature: function (feature, layer) {
            layer.bindPopup(
                markerPopup(feature)
            );
        }
    });

    var medecin = L.geoJSON(doctors, {attribution: '&copy; OpenStreetMap'});

    var hopital = L.geoJSON(hospital, {attribution: '&copy; OpenStreetMap'});

    var groupLayerSante = L.layerGroup([medecin, hopital]);

    tabLayer = await [cycle, cycleParking, stopBus, parking, groupLayer, defibrillateur, pharmacie, groupLayerSante, groupLayerData, groupLayerEntraide];
}



