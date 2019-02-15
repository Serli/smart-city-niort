function TrajetLine1Bis() {
    var Ligne1TrajetBis = TrajetLigne1Bis.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            dashArray: "2 12",
            color: "#e40613",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne1TrajetBis)
}

function TrajetLine1Bis2() {
    var Ligne1TrajetBis2 = TrajetLigne1Bis2.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            dashArray: "2 12",
            color: "#e40613",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne1TrajetBis2)
}

function TrajetLine1() {
    var Ligne1Trajet = TrajetLigne1.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            color: "#e40613",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne1Trajet)
}