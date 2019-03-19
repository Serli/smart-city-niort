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
        closeButton: false,
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


    L.control.layers(
        {
            'Main': mainLayer,
            'Satellite': Esri_WorldImagery,
            'Gris': Esri_WorldGrayCanvas,
        }
    ).addTo(map);


    // fleche control - toggle position navbar
    var customControlToggle = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom toggle');

            container.style.backgroundColor = 'white';
            container.style.width = "48px";
            container.style.height = "48px";

            container.style.display = "flex";
            container.style.alignContent = "centrer";
            container.style.justifyContent = "center";


            container.innerHTML = '<i class="fa fa-arrow-left "></i>';

            container.onclick = function () {
                clickTogglePosition();
            }
            return container;
        }
    });

    // recenter control - toggle position navbar
    var recenterLocation = L.Control.extend({

        options: {
            position: 'topright'
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom toggle');

            container.style.backgroundColor = 'white';
            container.style.width = "48px";
            container.style.height = "48px";


            container.style.display = "flex";
            container.style.alignItems = "centrer";
            container.style.justifyContent = "center";

            container.innerHTML = '<i class="far fa-compass "></i>';

            container.onclick = function () {
                recenter();
            };

            return container;
        }
    });

    map.addControl(new customControlToggle());
    map.addControl(new recenterLocation());


    layers();


}

function markerPopup(feature) {
    const day = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    let dateDebutM = null;
    let dateFinM = null;
    let dateDebutA = null;
    let dateFinA = null;
    let ouverture = null;
    let today = new Date();
    let horairesAfficher = null;
    const {opening_hours, amenity, name} = feature.properties;
    if (opening_hours && amenity === 'pharmacy'
        || amenity === "recycling"
        || amenity === "economie"
        || amenity === "coworking"
        || amenity === "repair_cafe"
        || amenity === "marcher"
        || amenity === "doctors") {

        let split = [];
        if (opening_hours.indexOf(';') > 0) {
            split = opening_hours.split(';');
        } else if (opening_hours.indexOf(',') > 0) {
            split = opening_hours.split(',');
        } else {
            split = [opening_hours];
        }
        split.forEach(plage => {
            let number = plage.search(/ ([0-9]+)/);
            let days = plage.substring(0, number);
            let dateDay = days.split("-");
            let horaire = plage.substring(number, plage.length);
            let plageHoraire = horaire.split("/");

            if (days.trim().startsWith(day[today.getDay() - 1]) ||
                days.trim().startsWith(day[today.getDay() - 1], 3) ||
                (dateDay[1] && (today.getDay() - 1 >= day.indexOf(dateDay[0].trim()) && today.getDay() - 1 <= day.indexOf(dateDay[1].trim())))) {
                plageHoraire.forEach((h) => {
                    let strings = h.split("-");
                    let dateD = new Date();
                    let dateF = new Date();
                    let hours, minutes, hoursF, minutesF;

                    if(today.getHours() >= Number(strings[0].split(":")[0])) {

                        if (h === plageHoraire[0]
                            && (today.getHours() > Number(strings[0].split(":")[0])
                                && today.getHours() < Number(strings[1].split(":")[0]))
                            || (today.getHours() === Number(strings[0].split(":")[0]))
                            && today.getHours() === Number(strings[1].split(":")[0])
                            && today.getMinutes() >= Number(strings[0].split(":")[1])
                            && today.getMinutes() < Number(strings[1].split(":")[1])) {

                            horairesAfficher = plageHoraire;
                            dateDebutM = strings[0];
                            dateFinM = strings[1];
                            hours = Number(dateDebutM.split(":")[0]);
                            minutes = Number(dateDebutM.split(":")[1]);

                            hoursF = Number(dateFinM.split(":")[0]);
                            minutesF = Number(dateFinM.split(":")[1]);

                        } else if (h === plageHoraire[1]
                            && (today.getHours() > Number(strings[0].split(":")[0])
                                && today.getHours() < Number(strings[1].split(":")[0]))
                            || (today.getHours() === Number(strings[0].split(":")[0]))
                            && today.getHours() === Number(strings[1].split(":")[0])
                            && today.getMinutes() >= Number(strings[0].split(":")[1])
                            && today.getMinutes() < Number(strings[1].split(":")[1])) {

                            horairesAfficher = horaire;

                            dateDebutM = null;
                            dateFinM = null;
                            dateDebutA = strings[0];
                            dateFinA = strings[1];
                            hours = Number(dateDebutA.split(":")[0]);
                            minutes = Number(dateDebutA.split(":")[1]);

                            hoursF = Number(dateFinA.split(":")[0]);
                            minutesF = Number(dateFinA.split(":")[1]);
                        }
                    }
                    else {
                        if (h === plageHoraire[1] && today.getHours() >= 12) {
                            dateDebutM = null;
                            dateFinM = null;
                            dateDebutA = strings[0];
                            dateFinA = strings[1];
                        } else {
                            dateDebutM = strings[0];
                            dateFinM = strings[1];
                        }
                    }

                    dateD.setHours(hours);
                    dateD.setMinutes(minutes);

                    dateF.setHours(hoursF);
                    dateF.setMinutes(minutesF);
                    if (dateD.getTime() < today.getTime() && dateF.getTime() > today.getTime()) {
                        ouverture = "Ouvert";
                    } else {
                        ouverture = "Fermé";
                    }

                });
            }
        });
    }

    if (horairesAfficher != null) {
        return (
            '<div class="titre"><span class="markerPopup">' + feature.properties.name + '</span></div>'
            + '<div class="infos"><label>' + feature.properties.amenity + '</label><br/>' +
            '<label>' + ouverture + horairesAfficher + '</label></div>'
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

function layers() {


    // Public Transport carte
    var transportLayer = L.tileLayer('http://openptmap.org/tiles/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://openptmap.org/" target="_blank" rel="noopener noreferrer">OpenPTMap</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OSM Contributors</a>',
        maxZoom: 19,
    });


    var cycle = L.geoJSON(cycleways, {id: 'cycleways', attribution: '&copy; OpenStreetMap', style: polystyle()});

    var cycleParking = L.geoJSON(bicycleParkings,
        {
            style: polystyle(),
            onEachFeature: function (feature, layer) {

                let nameParking = null;
                let capacityParking = null;
                let couvert = null
                let coordonnee = getCoordonnées(feature)
                let type = "Parking à vélo"

                if (feature.properties.name !== undefined) {
                    nameParking = feature.properties.name
                }
                if (feature.properties.capacity !== undefined) {
                    capacityParking = 'Capacité : ' + feature.properties.capacity + ' place(s)'
                }
                if (feature.properties.building === 'yes' || feature.properties.covered === 'yes') {

                    couvert = "Couvert"
                }

                createPopup(layer, coordonnee, nameParking, type, capacityParking, couvert)

            },

            attribution: '&copy; OpenStreetMap',
            pointToLayer: function (feature, latlng) {

                //let color = "#f19200";
                let cycleMarker = L.AwesomeMarkers.icon({
                    prefix: 'fa',
                    icon: 'bicycle ',
                    iconColor: 'white',
                    markerColor: "purple"
                });
                let marker = L.marker(latlng, {icon: cycleMarker});
                return marker;

            }
        }
    );

    var MagasinBio = L.layerGroup();

    transiscopeDatas.map(data => {
        if (data.categories.length !== 0 &&
            ((data.location.lat >= 46.231153027822046 && data.location.lon >= -0.6389236450195312) &&
                (data.location.lat <= 46.417742374524046 && data.location.lon <= -0.27706146240234375))) {
            if (data.categories[0].id === 33) {

                let coordonnee = data.location.lat + ',' + data.location.lon
                let description = null;
                let titre = null;
                titre = data.title
                let adresse = data.address.street;

                let Marker = L.AwesomeMarkers.icon({
                    prefix: 'fa',
                    icon: 'apple-alt',
                    iconColor: 'white',
                    markerColor: 'cadetblue'
                });
                let markerBio = L.marker(
                    [data.location.lat, data.location.lon],
                    {
                        title: data.title,
                        icon: Marker
                    }
                );
                if (data.description !== undefined) {
                    description = data.description
                }


                createPopup(markerBio, coordonnee, titre, adresse, description, null).addTo(MagasinBio)
            }
        }
    });


    var pharmacie = L.geoJSON(pharmacy, {
        attribution: '&copy; OpenStreetMap',
        pointToLayer: function (feature, latlng) {
            let pharmacieMarker = L.AwesomeMarkers.icon({
                prefix: 'fa',
                icon: 'comment-medical',
                iconColor: 'white',
                markerColor: 'orange'
            });

            let marker = L.marker(
                latlng,
                {
                    icon: pharmacieMarker,
                });
            return marker;
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                markerPopup(feature)
            );
        }
    });

    var hopital2 = L.geoJSON(hospital2, {
        attribution: '&copy; OpenStreetMap',
        pointToLayer: function (feature, latlng) {

            let nom = null;
            let phone = null;
            let mail = null;
            let type = "Hôpital";
            let coordonnee = getCoordonnées(feature)

            let pharmacieMarker = L.AwesomeMarkers.icon({
                prefix: 'fa',
                icon: 'clinic-medical',
                iconColor: 'white',
                markerColor: 'cadetblue'
            });
            if (feature.properties.name !== undefined) {
                nom = feature.properties.name
            }
            if (feature.properties.phone !== undefined) {
                phone = feature.properties.phone
            }
            if (feature.properties.email !== undefined) {
                mail = feature.properties.email
            }
            if (feature.properties.horaire !== undefined) {
                mail = '<h8>horaire : ' + feature.properties.horaire + '</h8>'
            }
            let marker = L.marker(
                latlng,
                {
                    icon: pharmacieMarker,
                });

            createPopup(marker, coordonnee, nom, type, phone, null);

            return marker;
        },
    });

    var medecin = L.geoJSON(doctors,
        {
            attribution: '&copy; OpenStreetMap',
            pointToLayer: function (feature, latlng) {
                if (feature.properties.name !== undefined) {
                    let nom = null;
                    let telephone = null;
                    let adresse = null;
                    let type = "Médecin";
                    let coordonnee = getCoordonnées(feature)

                    if (feature.properties.name !== undefined) {
                        nom = feature.properties.name
                    }

                    if (feature.properties.phone !== undefined) {
                        telephone = feature.properties.phone
                    }
                    if (feature.properties.adresse !== undefined) {
                        adresse = feature.properties.adresse

                    }

                    let doctorsMarker = L.AwesomeMarkers.icon({
                        prefix: 'fa',
                        icon: 'user-md',
                        iconColor: 'white',
                        markerColor: 'purple'
                    });

                    let marker = L.marker(
                        latlng,
                        {
                            icon: doctorsMarker,
                            title: nom
                        });

                    createPopup(marker, coordonnee, nom, type, telephone, adresse)

                    return marker;
                }
            },
            onEachFeature: function (feature, layer) {
                let telephone = "";
                let adresse = "";
                if (feature.properties.phone !== undefined) {
                    telephone = '<h8>Téléphone : ' + feature.properties.phone + '</h8><br>';
                }
                if (feature.properties.adresse !== undefined) {
                    adresse = '<h8>Adresse : ' + feature.properties.adresse + '</h8>';

                }
                layer.bindPopup(
                    markerPopup(feature) + telephone + adresse
                );
            }
        });

    var hopital = L.geoJSON(hospital, {
        attribution: '&copy; OpenStreetMap',
        style: polystyle(),

        onEachFeature: function (feature, layer) {
            let nom = null;
            let phone = null;
            let mail = null;
            let type = "Hopital"
            let coordonnee = getCoordonnées(feature)
            if (feature.properties.name !== undefined) {
                nom = feature.properties.name
            }
            if (feature.properties.phone !== undefined) {
                phone = 'Téléphone : ' + feature.properties.phone
            }
            if (feature.properties.email !== undefined) {
                mail = 'Mail : ' + feature.properties.email
            }

            createPopup(layer, coordonnee, nom, type, phone, mail)

        }
    });

    //var cinemas = L.geoJSON(cinema, {attribution: '&copy; OpenStreetMap'});

    var parkingVoitureSimple = parkingVoitu();
    var parkingVoitureGratuit = parkingVoitu("gratuit");
    var parkingVoitureCouvert = parkingVoitu("couvert");
    var parkingCovoit = parkingVoitu("covoit")


    const coord = [];

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
                            let type = " TanLib, le transport de l'agglo Niortaise";
                            let coordonnee = getCoordonnées(feature)
                            let val1 = logo(ligne).join(" ")
                            let busMarker = L.AwesomeMarkers.icon({
                                prefix: 'fa',
                                icon: 'bus',
                                iconColor: 'white',
                                markerColor: color
                            });

                            let marker = L.marker(
                                latlng,
                                {
                                    icon: busMarker,
                                    title: arret
                                });

                            createPopup(marker, coordonnee, arret, type, val1, null)
                            return marker;
                        }
                    }
                }
            ),
            name: ligne.name,
            trajet: ligne.trajet
        }
    });

    var defibrillateur = L.geoJSON(defibrillator,
        {
            attribution: '&copy; OpenStreetMap',
            pointToLayer: function (feature, latlng) {
                if (feature.properties.emergency !== undefined) {
                    let type = "Défibrillateur";
                    let soustitre = null;
                    let phone = null;
                    let coordonnee = getCoordonnées(feature)

                    if (feature.properties.name !== undefined) {
                        soustitre = feature.properties.name;
                    }else if (feature.properties.access === "public") {
                        soustitre = "en libre accés";
                    }


                    if (feature.properties.phone !== undefined) {
                        phone = 'Téléphone : ' + feature.properties.phone
                    }
                    let repairMarker = L.AwesomeMarkers.icon({
                        prefix: 'fa',
                        icon: 'medkit',
                        iconColor: 'white',
                        markerColor: 'lightgreen'
                    });

                    let marker = L.marker(
                        latlng,
                        {
                            icon: repairMarker,
                            title: type
                        });

                    createPopup(marker, coordonnee, type, soustitre, phone, null)

                    return marker;
                }
            }
        });

    let decheterie = L.layerGroup();
    let conteneur = L.layerGroup();

    let decheterie2 = L.geoJSON(recyclings, {
        attribution: '&copy; OpenStreetMap',
        pointToLayer: function (feature, latlng) {
            let nom = "";
            let adresse = "";
            if (feature.properties.name !== undefined) {
                nom = '<h6>' + feature.properties.name + '</h6>'
            }
            if (feature.properties.adresse !== undefined) {
                adresse = '<h8>Adresse : ' + feature.properties.adresse + '</h8><br>'
            }
            if (feature.properties.recycling !== undefined) {
                if (feature.properties.recycling.type === "Dechetterie"){
                    let repairMarker = L.AwesomeMarkers.icon({
                        prefix: 'fa',
                        icon: 'dumpster',
                        iconColor: 'white',
                        markerColor: 'red'
                    });

                    let marker = L.marker(
                        latlng,
                        {
                            icon: repairMarker,
                            title: nom
                        });
                    return marker;
                }
            }
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                markerPopup(feature) + dechetRecyclage(feature).join(" ")
            );
        }
    });

    L.geoJSON(recyclings,
        {
            attribution: '&copy; OpenStreetMap',
            pointToLayer: function (feature, latlng) {
                let nom = "";
                let adresse = "";
                let recycling = "";
                if (feature.properties.name !== undefined) {
                    nom = '<h6>' + feature.properties.name + '</h6>'
                }
                if (feature.properties.adresse !== undefined) {
                    adresse = '<h8>Adresse : ' + feature.properties.adresse + '</h8><br>'
                }
                if (feature.properties.recycling !== undefined) {
                    if (feature.properties.recycling.type === "container"){
                        let repairMarker = L.AwesomeMarkers.icon({
                            prefix: 'fa',
                            icon: 'trash-alt',
                            iconColor: 'white',
                            markerColor: 'blue'
                        });

                        let marker = L.marker(
                            latlng,
                            {
                                icon: repairMarker,
                                title: nom
                            });
                        marker.bindPopup(
                            nom + adresse + dechetRecyclage(feature).join(" ")
                        );
                        conteneur.addLayer(marker);
                    } else {
                        let repairMarker = L.AwesomeMarkers.icon({
                            prefix: 'fa',
                            icon: 'dumpster',
                            iconColor: 'white',
                            markerColor: 'red'
                        });

                        let marker = L.marker(
                            latlng,
                            {
                                icon: repairMarker,
                                title: nom
                            });
                        marker.bindPopup(
                            nom + adresse + dechetRecyclage(feature).join(" ")
                        );
                        decheterie.addLayer(marker);
                    }
                }
            },
        });

    var marcher = createMarker(marketplace, 'shopping-cart', 'orange');

    var RepairCafe = createMarker(repairCafe, 'tools', 'orange');

    var espaceCoworking = createMarker(coworking, 'user-friends', 'purple');

    var cooperativeActiviter = createMarker(cooperative, 'graduation-cap', 'cadetblue');

    var economieSolidaire = createMarker(economie_solidaire, 'shopping-basket', 'lightgreen');

    // var cinemas = L.geoJSON(cinema, {attribution: '&copy; OpenStreetMap'});

    var parking = L.geoJSON(parkings, {attribution: '&copy; OpenStreetMap'});

    let Hospitals = L.layerGroup([hopital, hopital2]);

    let Tracer = L.layerGroup([TrajetLine1(), TrajetLine2(), TrajetLine3(), TrajetLine4(), TrajetLine5(), TrajetLine6(), TrajetLine7(), TrajetLine8(), TrajetLine9()])


    // Tableau contenant  tout les layers
    tabLayer = [];
    tabLayer["Velo"] = cycle;
    tabLayer["RepairCafe"] = RepairCafe;
    tabLayer["Coworking"] = espaceCoworking;
    tabLayer["Cooperative"] = cooperativeActiviter;
    tabLayer["association"] = economieSolidaire;
    tabLayer["ParkingVoiture"] = parkingVoitureSimple;
    tabLayer["ParkingGratuit"] = parkingVoitureGratuit;
    tabLayer["ParkingCouvert"] = parkingVoitureCouvert;
    tabLayer["ParkingCovoiturage"] = parkingCovoit;
    tabLayer["ParkingVelo"] = cycleParking;
    tabLayer["Defibrilateur"] = defibrillateur;
    tabLayer["Pharmacie"] = pharmacie;
    tabLayer["Médecin"] = medecin;
    tabLayer["Hopital"] = Hospitals;
    tabLayer["Marché"] = marcher;
    tabLayer["Biocop"] = MagasinBio;
    tabLayer["Bus"] = Tracer;
    tabLayer["Decheterrie"] = decheterie2;
    tabLayer["conteneur"] = conteneur;

    mesLigne.forEach((ligne) => {
        // mesTrace[ligne.name] = L.layerGroup([ligne.trace, ...ligne.trajet]);
        tabLayer[ligne.name] = L.layerGroup([ligne.trace, ...ligne.trajet]);
    });


    /* **********$  mobile or desktop *******$ */
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //mobile
        // on cache la navbar si on clicl sur n'importe quel marker
        Object.keys(tabLayer).forEach(function (key) {

                // si c'est un groupLayer d'une ligne de bus
                if (key.startsWith("Ligne")) {
                    tabLayer[key].getLayers().forEach(function (elementLayer) {
                        elementLayer.on('mousedown', L.bind(clickToggleFooter, null, true))
                    });
                } else {
                    tabLayer[key].on('mousedown', L.bind(clickToggleFooter, null, true))
                }
            }
        );
    } else {
        //desktop
    }


}

function parkingVoitu(param) {

    var parkingVoiture = L.geoJSON(parkings, {
            attribution: '&copy; OpenStreetMap',
            style: polystyle(param),
            onEachFeature: function (feature, layer) {


                let nameParking = null;
                let capacityParking = null;
                let coordonnee = getCoordonnées(feature)

                let type = feature.properties.amenity

                if (feature.properties.name !== undefined) {
                    nameParking = feature.properties.name
                }
                if (feature.properties.capacity !== undefined) {

                    capacityParking = ' Capacité : ' + feature.properties.capacity + ' places'
                }

                createPopup(layer, coordonnee, nameParking, type, capacityParking, null)

            },
            filter: function (feature, layer) {

                if (param === "gratuit") {
                    if (feature.properties.fee === "no" && feature.properties.fee !== undefined) {
                        return true;
                    }

                } else if (param === "couvert") {
                    return feature.properties.building !== undefined;
                } else if (param === "covoit") {
                    return feature.properties.covoiturage !== undefined;
                } else {
                    return true;
                }


            },

            pointToLayer: function (feature, latlng) {


                if (param === "gratuit") {
                    let busMarker = L.AwesomeMarkers.icon({
                        prefix: 'fa',
                        icon: 'car',
                        iconColor: 'white',
                        markerColor: "orange"
                    });
                    let marker = L.marker(latlng, {icon: busMarker});
                    return marker;

                } else if (param === "couvert") {

                    let busMarker = L.AwesomeMarkers.icon({
                        prefix: 'fa',
                        icon: 'car',
                        iconColor: 'white',
                        markerColor: "cadetblue"
                    });
                    let marker = L.marker(latlng, {icon: busMarker});

                    return marker;
                } else if (param === "covoit") {

                    let busMarker = L.AwesomeMarkers.icon({
                        prefix: 'fa',
                        icon: 'copyright',
                        iconColor: 'white',
                        markerColor: "lightgreen"
                    });
                    let marker = L.marker(latlng, {icon: busMarker});
                    return marker;


                } else {
                    let busMarker = L.AwesomeMarkers.icon({
                        prefix: 'fa',
                        icon: 'car',
                        iconColor: 'white',
                        markerColor: "cadetblue"
                    });
                    let marker = L.marker(latlng, {icon: busMarker});
                    return marker;
                }
            }

        }
    );

    return parkingVoiture;
}

function polystyle(param) {
    if (param === "gratuit") {
        return {
            fillColor: '#f69730',
            weight: 3,
            opacity: 1,
            color: '#f69730',  //Outline color
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

function createMarker(fichier, icon, color) {
    let adresse;
    return L.geoJSON(fichier,
        {
            attribution: '&copy; OpenStreetMap',
            pointToLayer: function (feature, latlng) {
                let nom = null;
                let adresse = null;
                let coordonnee = getCoordonnées(feature)

                if (feature.properties.name !== undefined) {

                    nom = feature.properties.name;
                }

                if (feature.properties.adresse !== undefined) {
                    adresse = feature.properties.adresse;
                }

                let Marker = L.AwesomeMarkers.icon({
                    prefix: 'fa',
                    icon: icon,
                    iconColor: 'white',
                    markerColor: color
                });

                let marker = L.marker(
                    latlng,
                    {
                        icon: Marker,
                        title: nom
                    });

                createPopup(marker, coordonnee, nom, adresse, null, null)


                return marker;
            }
        });
}

function getCoordonnées(feature) {

    let lat = ""
    let long = ""
    let coordonnees = feature.geometry.coordinates;
    if (coordonnees.length === 1) {
        long = coordonnees[0][0][0]
        lat = coordonnees[0][0][1]
    } else {
        long = coordonnees[0]
        lat = coordonnees[1]
    }
    coordonnees = lat + ',' + long;

    return coordonnees
}

function createPopup(layer, coordonnee, titre, type, val1, val2) {


    let lien = "http://maps.google.fr/maps?q=" + coordonnee;
    let itineraire = '<a href="' + lien + ' " target="_blank" > <i class="fas fa-location-arrow fa-2x" ></i></a>'


    let top = '';
    if (titre != null && type != null) {
        top = '<div class="top"> <div class="titre"><div class="titrePopup">' + titre + ' </div> <div class="sousTitrePopup"> ' + type + '  </div>   </di> </div> ' + itineraire + ' </div>'

    } else if (titre === null) {
        top = '<div class="top"> <div class="titre"><div class="titrePopup">' + type.charAt(0).toUpperCase() + type.substring(1).toLowerCase() + ' </div>  </di> </div> ' + itineraire + ' </div>'
    }

    let icon1 = "";
    let icon2 = "";

    switch (type) {
        case "Médecin" :
            icon1 = "fa-phone";
            icon2 = "fa-map-marker";
            break;
        case "Hôpital" :
            icon1 = "fa-phone";
            break;
        default:
            break
    }


    let bottom = '';
    if (val1 != null && val2 != null) {
        bottom = '<div class="bottom"> <div> <i class="fas ' + icon1 + ' fa-lg"></i>  <div class="popupLeft"> ' + val1 + ' </div> </div> <div class="barre"> </div> <div> <i class="fas ' + icon2 + ' fa-lg"></i> <div class="popupRight">  ' + val2 + '  </div></div> </div> '
    } else if (val1 != null && val2 === null) {
        bottom = '<div class="bottom"> <div> <i class="fas ' + icon1 + ' fa-lg"></i>  <div class="popupLeft"> ' + val1 + ' </div> </div></div> '
    }

    return layer.bindPopup(
        '<div class="popup">'
        +
        top
        +
        bottom
        +
        '</div>'
    );
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

function dechetRecyclage(feature){
    let tabRecyclage = [];
    tabRecyclage.push('<h7>Matériaux accepter : </h7><br>');
    // recycling = '<h8>Type : ' + feature.properties.recycling.type + '</h8><br>';
    if (feature.properties.recycling.batteries !== undefined){
        tabRecyclage.push('<h8>Batterie</h8><br>');
    }
    if (feature.properties.recycling.cans !== undefined){
        tabRecyclage.push('<h8>Canettes</h8><br>');
    }
    if (feature.properties.recycling.car_batteries !== undefined){
        tabRecyclage.push('<h8>Batterie de Voiture</h8><br>');
    }
    if (feature.properties.recycling.garden_waste !== undefined){
        tabRecyclage.push('<h8>Déchets de jardin</h8><br>');
    }
    if (feature.properties.recycling.glass !== undefined){
        tabRecyclage.push('<h8>Verre</h8><br>');
    }
    if (feature.properties.recycling.paper !== undefined){
        tabRecyclage.push('<h8>Papier, Bois</h8><br>');
    }
    if (feature.properties.recycling.green_waste !== undefined){
        tabRecyclage.push('<h8>Végétaux</h8><br>');
    }
    if (feature.properties.recycling.light_bulbs !== undefined){
        tabRecyclage.push('<h8>Ampoules</h8><br>');
    }
    if (feature.properties.recycling.scrap_metal !== undefined){
        tabRecyclage.push('<h8>Métaux, ferraille</h8><br>');
    }
    if (feature.properties.recycling.waste_oil !== undefined){
        tabRecyclage.push('<h8>Huile</h8><br>');
    }
    if (feature.properties.recycling.cardboard !== undefined){
        tabRecyclage.push('<h8>Carton</h8><br>');
    }
    if (feature.properties.recycling.electrical_appliances !== undefined){
        tabRecyclage.push('<h8>Appareils électriques</h8><br>');
    }
    if (feature.properties.recycling.plastic !== undefined){
        tabRecyclage.push('<h8>Plastique</h8><br>');
    }
    if (feature.properties.recycling.small_appliances !== undefined){
        tabRecyclage.push('<h8>Petit appareils électroménager</h8><br>');
    }
    if (feature.properties.recycling.waste !== undefined){
        tabRecyclage.push('<h8>Tout venant</h8><br>');
    }
    return tabRecyclage;
}