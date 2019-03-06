function tracer(Color, T){
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
        return line;
    } else {
        var line = L.polyline(latlngs, {
            opacity: 1,
            color: Color,
            weight: 6,
        });
        return line;
    }
}

function TrajetLine1() {
    var Ligne1Trajet = TrajetLigne1.features.map(T => {
        return tracer('#e40613', T);
    });
    return L.layerGroup(Ligne1Trajet)
}

function TrajetLine2() {
    var Ligne2Trajet = TrajetLigne2.features.map(T => {
        return tracer('#007a3d', T);
    });
    return L.layerGroup(Ligne2Trajet)
}

function TrajetLine3() {
    var Ligne3Trajet = TrajetLigne3.features.map(T => {
        return tracer('#69c0ad', T);
    });
    return L.layerGroup(Ligne3Trajet)
}

function TrajetLine4() {
    var Ligne4Trajet = TrajetLigne4.features.map(T => {
        return tracer('#f286a0', T);
    });
    return L.layerGroup(Ligne4Trajet)
}

function TrajetLine5() {
    var Ligne5Trajet = TrajetLigne5.features.map(T => {
        return tracer('#3874ba', T);
    });
    return L.layerGroup(Ligne5Trajet)
}

function TrajetLine6() {
    var Ligne6Trajet = TrajetLigne6.features.map(T => {
        return tracer('#93c21e', T);
    });
    return L.layerGroup(Ligne6Trajet)
}

function TrajetLine7() {
    var Ligne7Trajet = TrajetLigne7.features.map(T => {
        return tracer('#a94c85', T);
    });
    return L.layerGroup(Ligne7Trajet)
}

function TrajetLine8() {
    var Ligne8Trajet = TrajetLigne8.features.map(T => {
        return tracer('#e72b75', T);
    });
    return L.layerGroup(Ligne8Trajet)
}

function TrajetLine9() {
    var Ligne9 = TrajetLigne9.features.map(T => {
        return tracer('#f19200', T);
    });
    return L.layerGroup(Ligne9)
}