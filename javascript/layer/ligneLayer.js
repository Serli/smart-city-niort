function tracer(Color, T, ligneDeBus){
    var latlngs = T.geometry.coordinates.map(coord => {
        return [coord[1], coord[0]];
    });

    if (T.properties.name.includes("Alt")){
        var line = L.polyline(latlngs, {
            opacity: 1,
            dashArray: "2 12",
            color: Color,
            weight: 6,
        });
        line.bindPopup(
            '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
            + ligneDeBus
        );
        return line;
    } else {
        var line = L.polyline(latlngs, {
            opacity: 1,
            color: Color,
            weight: 6,
        });
        line.bindPopup(
            '<div><img src="./assets/images/tanlib.png" class="markerTan"/></div>'
            + ligneDeBus
        );
        return line;
    }
}

function TrajetLine1() {
    let ligneDeBus = '<img src="./assets/images/ligne/ligne1.png" class="logoLigne"/>';
    var Ligne1Trajet = TrajetLigne1.features.map(T => {
        return tracer('#e40613', T, ligneDeBus);
    });
    return L.layerGroup(Ligne1Trajet)
}

function TrajetLine2() {
    let ligneDeBus = '<img src="./assets/images/ligne/ligne2.png" class="logoLigne"/>';
    var Ligne2Trajet = TrajetLigne2.features.map(T => {
        return tracer('#007a3d', T, ligneDeBus);
    });
    return L.layerGroup(Ligne2Trajet)
}

function TrajetLine3() {
    let ligneDeBus = '<img src="./assets/images/ligne/ligne3.png" class="logoLigne"/>';
    var Ligne3Trajet = TrajetLigne3.features.map(T => {
        return tracer('#69c0ad', T, ligneDeBus);
    });
    return L.layerGroup(Ligne3Trajet)
}

function TrajetLine4() {
    let ligneDeBus = '<img src="./assets/images/ligne/ligne4.png" class="logoLigne"/>';
    var Ligne4Trajet = TrajetLigne4.features.map(T => {
        return tracer('#f286a0', T, ligneDeBus);
    });
    return L.layerGroup(Ligne4Trajet)
}

function TrajetLine5() {
    let ligneDeBus = '<img src="./assets/images/ligne/ligne5.png" class="logoLigne"/>';
    var Ligne5Trajet = TrajetLigne5.features.map(T => {
        return tracer('#3874ba', T, ligneDeBus);
    });
    return L.layerGroup(Ligne5Trajet)
}

function TrajetLine6() {
    let ligneDeBus = '<img src="./assets/images/ligne/ligne6.png" class="logoLigne"/>';
    var Ligne6Trajet = TrajetLigne6.features.map(T => {
        return tracer('#93c21e', T, ligneDeBus);
    });
    return L.layerGroup(Ligne6Trajet)
}

function TrajetLine7() {
    let ligneDeBus = '<img src="./assets/images/ligne/ligne7.png" class="logoLigne"/>';
    var Ligne7Trajet = TrajetLigne7.features.map(T => {
        return tracer('#a94c85', T, ligneDeBus);
    });
    return L.layerGroup(Ligne7Trajet)
}

function TrajetLine8() {
    let ligneDeBus = '<img src="./assets/images/ligne/ligne8.png" class="logoLigne"/>';
    var Ligne8Trajet = TrajetLigne8.features.map(T => {
        return tracer('#e72b75', T, ligneDeBus);
    });
    return L.layerGroup(Ligne8Trajet)
}

function TrajetLine9() {
    let ligneDeBus = '<img src="./assets/images/ligne/ligne9.png" class="logoLigne"/>';
    var Ligne9 = TrajetLigne9.features.map(T => {
        return tracer('#f19200', T, ligneDeBus);
    });
    return L.layerGroup(Ligne9)
}