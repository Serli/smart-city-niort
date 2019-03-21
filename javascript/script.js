const lignes = [{
    id: "1",

    name: "Ligne 1",
    color: "red",
    colorLigne: "#E30613",
    data: TrajetLigne1
},
    {
        id: "2",

        name: "Ligne 2",
        color: "darkgreen",
        colorLigne: "#007B3D",
        data: TrajetLigne2
    },
    {
        id: "3",

        name: "Ligne 3",
        color: "cadetblue",
        colorLigne: "#68BFAC",
        data: TrajetLigne3
    },
    {
        id: "4",

        name: "Ligne 4",
        color: "purple",
        colorLigne: "#F0869D",
        data: TrajetLigne4
    },
    {
        id: "5",

        name: "Ligne 5",
        color: "blue",
        colorLigne: "#2E73B9",
        data: TrajetLigne5
    },
    {
        id: "6",

        name: "Ligne 6",
        color: "green",
        colorLigne: "#94C11F",
        data: TrajetLigne6
    },
    {
        id: "7",
        name: "Ligne 7",
        color: "darkpurple",
        colorLigne: "#A84E85",
        data: TrajetLigne7
    },
    {
        id: "8",

        name: "Ligne 8",
        color: "purple",
        colorLigne: "#E72475",
        data: TrajetLigne8
    },
    {
        id: "9",
        name: "Ligne 9",
        color: "orange",
        colorLigne: "#F49719",
        data: TrajetLigne9
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
            container.style.width = "5vw";
            container.style.maxWidth = "7vh";
            container.style.minWidth = "5vh";


            container.style.height = "5vw";
            container.style.maxHeight = "7vh";
            container.style.minHeight = "5vh";

            container.style.display = "flex";
            container.style.alignContent = "centrer";
            container.style.justifyContent = "center";


            container.innerHTML = '<i class="fa fa-arrow-left fa-lg"></i>';

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

            container.style.width = "5vw";
            container.style.maxWidth = "7vh";
            container.style.minWidth = "5vh";


            container.style.height = "5vw";
            container.style.maxHeight = "7vh";
            container.style.minHeight = "5vh";


            container.style.display = "flex";
            container.style.alignItems = "centrer";
            container.style.justifyContent = "center";

            container.innerHTML = '<i class="far fa-compass fa-lg" ></i>';

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

    if (opening_hours && (amenity === 'pharmacy'
        || amenity === "recycling"
        || amenity === "economie"
        || amenity === "coworking"
        || amenity === "repair_cafe"
        || amenity === "marcher"
        || amenity === "doctors")) {

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

                    if (today.getHours() >= Number(strings[0].split(":")[0])) {

                        if (h === plageHoraire[0]
                            && (today.getHours() > Number(strings[0].split(":")[0])
                                && today.getHours() < Number(strings[1].split(":")[0]))
                            || (today.getHours() === Number(strings[0].split(":")[0]))
                            && today.getMinutes() >= Number(strings[0].split(":")[1])) {

                            horairesAfficher = horaire;
                            ouverture = "Ouvert";

                        } else if (h === plageHoraire[1]
                            && ((today.getHours() > Number(strings[0].split(":")[0])
                                && today.getHours() < Number(strings[1].split(":")[0]))
                                || (today.getHours() === Number(strings[0].split(":")[0]))
                                && today.getMinutes() >= Number(strings[0].split(":")[1]))) {

                            horairesAfficher = horaire;
                            ouverture = "Ouvert";
                        } else {
                            horairesAfficher = horaire;
                            ouverture = "Fermé";

                        }
                    } else {
                        horairesAfficher = horaire;
                        ouverture = "Fermé";
                    }

                });
            }
        });


    }

    let horaire = new Array()
    if (horairesAfficher !== null) {
        horaire["ouverture"] = ouverture;
        horaire["horairesAfficher"] = horairesAfficher;
        // console.log(horaire["horairesAfficher"])
        return (horaire);
    } else {
        return horaire;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("containMap").innerHTML +=
        '<div id="lieux">' +
        '<div>' +
        '<h5><strong>' + layers() + '</strong> lieux trouvés à <strong>NIORT</strong> et ses environs.</h5>' +
        '<button onclick="removeDivLieux()">x</button></div></div>';

    setTimeout(function () {
        document.getElementById("lieux").style.opacity = "1";
    }, 100);

    setTimeout(function () {
        document.getElementById("lieux").style.opacity = "0";
        setTimeout(function () {
            document.getElementById("containMap").removeChild(document.getElementById("lieux"));
        }, 200)
    }, 5000);
});


function removeDivLieux() {
    document.getElementById("lieux").style.opacity = "0";
    setTimeout(function () {
        document.getElementById("containMap").removeChild(document.getElementById("lieux"));
    }, 200)
}

function layers() {


    // Public Transport carte
    var transportLayer = L.tileLayer('http://openptmap.org/tiles/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://openptmap.org/" target="_blank" rel="noopener noreferrer">OpenPTMap</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OSM Contributors</a>',
        maxZoom: 19,
    });
    let nombreLieux = 0;


    var cycle = L.geoJSON(cycleways, {
        id: 'cycleways',
        attribution: '&copy; OpenStreetMap',
        style: polystyle(),
    });

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

                createPopup(layer, coordonnee, nameParking, type, capacityParking, couvert, null)

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


                createPopup(markerBio, coordonnee, titre, adresse, null, description, null).addTo(MagasinBio)
            }
        }
    });


    var pharmacie = L.geoJSON(pharmacy, {
        attribution: '&copy; OpenStreetMap',
        pointToLayer: function (feature, latlng) {
            let nom = null;
            let adresse = "";
            let coordonnee = getCoordonnées(feature)
            let phone = null;

            if (feature.properties.phone !== undefined) {
                phone = feature.properties.phone
            }


            if (feature.properties.name !== undefined) {
                nom = feature.properties.name
            } else {
                nom = null;
            }


            if (feature.properties["addr:housenumber"] !== undefined) {
                adresse = feature.properties["addr:housenumber"] + " "
            }
            if (feature.properties["addr:street"] !== undefined) {
                adresse += feature.properties["addr:street"] + " "
            }
            if (feature.properties["addr:postcode"] !== undefined) {
                adresse += feature.properties["addr:postcode"] + " "
            }
            if (feature.properties["addr:city"] !== undefined) {
                adresse += feature.properties["addr:city"];
            } else {
                adresse = "Pharmacie"
            }


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

            createPopup(marker, coordonnee, nom, adresse, markerPopup(feature)["ouverture"], markerPopup(feature)["horairesAfficher"], phone, "Pharma")

            return marker;
        },
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
            let marker = L.marker(
                latlng,
                {
                    icon: pharmacieMarker,
                });

            createPopup(marker, coordonnee, nom, type, phone, mail, null);

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
                    let distinction = "Médecin";
                    let coordonnee = getCoordonnées(feature)

                    if (feature.properties.name !== undefined) {
                        nom = feature.properties.name
                    }

                    if (feature.properties.phone !== undefined) {
                        telephone = feature.properties.phone
                    }
                    if (feature.properties.adresse !== undefined) {
                        adresse = feature.properties.adresse
                    } else {
                        adresse = "Médecin";
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

                    createPopup(marker, coordonnee, nom, adresse, markerPopup(feature)["ouverture"], markerPopup(feature)["horairesAfficher"], telephone, distinction)


                    return marker;
                }
            },
        });

    var hopital = L.geoJSON(hospital, {
        attribution: '&copy; OpenStreetMap',
        style: polystyle(),

        onEachFeature: function (feature, layer) {
            let nom = null;
            let phone = null;
            let mail = null;
            let type = "Hôpital";
            let coordonnee = getCoordonnées(feature)
            if (feature.properties.name !== undefined) {
                nom = feature.properties.name
            }
            if (feature.properties.phone !== undefined) {
                phone = feature.properties.phone
            }
            if (feature.properties.email !== undefined) {
                mail = feature.properties.email
            }

            createPopup(layer, coordonnee, nom, type, phone, mail, null)

        }
    });

    //var cinemas = L.geoJSON(cinema, {attribution: '&copy; OpenStreetMap'});

    var parkingVoitureSimple = parkingVoitu();
    var parkingVoitureGratuit = parkingVoitu("gratuit");
    var parkingVoitureCouvert = parkingVoitu("couvert");
    var parkingCovoit = parkingVoitu("covoit")


    const coord = [];

    let mesLigne = lignes.map((ligne) => {
        let busStopLigne = busStops.features.filter((arret) => {
            return arret.properties.route_ref && arret.properties.route_ref.indexOf(ligne.id) > -1
        });
        return {
            markerArret: L.geoJSON(busStopLigne,
                {
                    attribution: '&copy; OpenStreetMap',
                    pointToLayer: function (feature, latlng) {
                        var arret;
                        if (feature.properties.name !== undefined) {
                            arret = feature.properties.name;

                            var routeRef = feature.properties.route_ref;
                            let color;
                            if (routeRef.includes(",")) {
                                color = "black";
                            } else {
                                color = ligne.color;
                            }

                            let type = "TanLib, le transport de l'agglo Niortaise";
                            let coordonnee = getCoordonnées(feature)
                            let val3 = logo(routeRef).join(" ")
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

                            createPopup(marker, coordonnee, arret, type, null, null, val3, true)
                            return marker;
                        }
                    }
                }
            ),
            name: ligne.name,
            trajet: Trajet(ligne.id)
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
                    } else if (feature.properties.access === "public") {
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

                    createPopup(marker, coordonnee, type, soustitre, phone, null, null)

                    return marker;
                }
            }
        });

    let conteneur = L.layerGroup();

    let decheterie2 = L.geoJSON(recyclings, {
        attribution: '&copy; OpenStreetMap',
        pointToLayer: function (feature, latlng) {

            let nom = null;
            let adresse = null;
            let coordonnee = getCoordonnées(feature)


            if (feature.properties.name !== undefined) {
                nom = feature.properties.name
            } else {
                nom = null;
            }
            if (feature.properties.adresse !== undefined) {
                adresse = feature.properties.adresse
            } else {
                adresse = "Déchetterie"
            }
            if (feature.properties.recycling !== undefined) {
                if (feature.properties.recycling.type === "Dechetterie") {
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

                    createPopup(marker, coordonnee, nom, adresse, markerPopup(feature)["ouverture"], markerPopup(feature)["horairesAfficher"], null)
                    return marker;
                }
            }

        }
    });

    L.geoJSON(recyclings,
        {
            attribution: '&copy; OpenStreetMap',
            pointToLayer: function (feature, latlng) {
                let nom = "Conteneur";
                let coordonnee = getCoordonnées(feature)
                let typeDechet = null;

                if (feature.properties.recycling !== undefined) {
                    if (feature.properties.recycling.type === "container") {
                        typeDechet = dechetRecyclage(feature).join(", ")
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

                        createPopup(marker, coordonnee, nom, typeDechet, null, null, null)

                        conteneur.addLayer(marker);
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

    // let Tracer = L.layerGroup([TrajetLine1(), TrajetLine2(), TrajetLine3(), TrajetLine4(), TrajetLine5(), TrajetLine6(), TrajetLine7(), TrajetLine8(), TrajetLine9()])


    let Tracer = L.layerGroup(Trajets());




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
    tabLayer["Déchetterie"] = decheterie2;
    tabLayer["conteneur"] = conteneur;

    mesLigne.forEach((ligne) => {
        // mesTrace[lignes.name] = L.layerGroup([lignes.markerArret, ...lignes.trajet]);
        tabLayer[ligne.name] = L.layerGroup([ligne.markerArret, ligne.trajet]);
    });


    /* **********  mobile or desktop ******* */
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //mobile
        // on cache la navbar si on clicl sur n'importe quel marker
        Object.keys(tabLayer).forEach(function (key) {

                // si c'est un groupLayer d'une lignes de bus
                if (key.startsWith("Ligne")) {
                    tabLayer[key].getLayers().forEach(function (elementLayer) {
                        elementLayer.on('mousedown', L.bind(clickToggleFooter, null, true));
                    });
                } else {
                    tabLayer[key].on('mousedown', L.bind(clickToggleFooter, null, true))
                    nombreLieux++;
                }
            }
        );
    }

    // je recupere tout les markers
    Object.keys(tabLayer).forEach(function (key) {
        //console.log(Object.keys(tabLayer).length)
        // console.log(tabLayer[key])

        // si c'est un groupLayer d'une lignes de bus
        if (key.startsWith("Ligne") === false) {
            tabLayer[key].getLayers().forEach(function (marker) {
                nombreLieux++;

            });
        }
    });

    return nombreLieux;
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

                createPopup(layer, coordonnee, nameParking, type, capacityParking, null, null)

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

                createPopup(marker, coordonnee, nom, adresse, markerPopup(feature)["ouverture"], markerPopup(feature)["horairesAfficher"], null, null)


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

function createPopup(layer, coordonnee, titre, type, val1, val2, val3, distinction) {

    let itineraire = null;
    if (coordonnee != null) {
        let lien = "http://maps.google.fr/maps?q=" + coordonnee;
        itineraire = '<a href="' + lien + ' " target="_blank" > <i class="fas fa-location-arrow fa-2x" ></i></a>'

    }

    let top = '';
    if (titre != null && type != null && itineraire != null) {
        top = '<div class="top"> <div class="titre"><div class="titrePopup">' + titre + ' </div> <div class="sousTitrePopup"> ' + type + '  </div>   </di> </div> ' + itineraire + ' </div>'

    } else if (titre === null) {
        top = '<div class="top"> <div class="titre"><div class="titrePopup">' + type.charAt(0).toUpperCase() + type.substring(1).toLowerCase() + ' </div>  </di> </div> ' + itineraire + ' </div>'
    } else if (titre != null && type === null && itineraire === null) {
        top = '<div class="top"> <div class="titre"><div class="titrePopup">' + titre + ' </div>  </di> </div> </div>'
    }

    let icon1 = '';
    let icon2 = '';
    let icon3 = '';

    switch (type) {
        case "Hôpital" :
            icon1 = '<i class="fas fa-phone fa-lg"></i>';
            icon2 = '<i class="fas fa-envelope fa-lg"></i>';
            break;
        default:
            break
    }

    switch (distinction) {
        case "Médecin" :
            icon2 = '<i class="fas fa-map-marker fa-lg"></i>';
            icon3 = '<i class="fas fa-phone fa-lg"></i>';
            break;
        case "Pharma" :
            icon3 = '<i class="fas fa-phone fa-lg"></i>';
            break;
        default:
            break
    }

    if (val1 === "Fermé" || val1 === "Ouvert") {
        icon2 = '<i class="fas fa-clock fa-lg"></i>';
        icon3 = '<i class="fas fa-phone fa-lg"></i>';
    }


    let bottom = '';
    if (val1 != null && val2 != null) {
        bottom = '<div class="bottom"> <div>' + icon1 + '<div class="popupLeft"> ' + val1 + ' </div> </div> <div class="barre"> </div> <div>' + icon2 + '<div class="popupRight">  ' + val2 + '  </div></div> </div> '
    } else if (val1 != null && val2 === null) {
        bottom = '<div class="bottom"> <div> ' + icon1 + '<div class="popupLeft"> ' + val1 + ' </div> </div></div> '
    } else if (val1 === null && val2 != null) {
        bottom = '<div class="bottom"> <div>' + icon2 + '<div class="popupRight"> ' + val2 + ' </div> </div></div> '
    }


    let bottomBonus = '';
    if (val3 != null && (itineraire === null || type.startsWith("TanLib"))) {
        bottomBonus = '<div class="bottom"> <div> <div class="popupLeft"> ' + val3 + ' </div> </div></div> '
    } else if (val3 != null && itineraire != null) {
        bottomBonus = '<div class="bottom"> <div>' + icon3 + '<div class="popupLeft"> ' + val3 + ' </div> </div></div> '
    }


    return layer.bindPopup(
        '<div class="popup">'
        +
        top
        +
        bottom
        +
        bottomBonus
        +
        '</div>'
    );
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

function dechetRecyclage(feature) {
    let tabRecyclage = [];
    if (feature.properties.recycling.batteries !== undefined) {
        tabRecyclage.push('Batterie');
    }
    if (feature.properties.recycling.cans !== undefined) {
        tabRecyclage.push('Canettes');
    }
    if (feature.properties.recycling.car_batteries !== undefined) {
        tabRecyclage.push('Batterie de Voiture');
    }
    if (feature.properties.recycling.garden_waste !== undefined) {
        tabRecyclage.push('Déchets de jardin');
    }
    if (feature.properties.recycling.glass !== undefined) {
        tabRecyclage.push('Verre');
    }
    if (feature.properties.recycling.paper !== undefined) {
        tabRecyclage.push('Papier, Bois');
    }
    if (feature.properties.recycling.green_waste !== undefined) {
        tabRecyclage.push('Végétaux');
    }
    if (feature.properties.recycling.light_bulbs !== undefined) {
        tabRecyclage.push('Ampoules');
    }
    if (feature.properties.recycling.scrap_metal !== undefined) {
        tabRecyclage.push('Métaux, ferraille');
    }
    if (feature.properties.recycling.waste_oil !== undefined) {
        tabRecyclage.push('Huile');
    }
    if (feature.properties.recycling.cardboard !== undefined) {
        tabRecyclage.push('Carton');
    }
    if (feature.properties.recycling.electrical_appliances !== undefined) {
        tabRecyclage.push('Appareils électriques');
    }
    if (feature.properties.recycling.plastic !== undefined) {
        tabRecyclage.push('Plastique');
    }
    if (feature.properties.recycling.small_appliances !== undefined) {
        tabRecyclage.push('Petit appareils électroménager');
    }
    if (feature.properties.recycling.waste !== undefined) {
        tabRecyclage.push('Tout venant');
    }
    return tabRecyclage;
}