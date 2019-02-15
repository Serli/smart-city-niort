function TrajetLine6SaintLiguaire() {
    var Ligne6SaintLiguaire = TrajetLigne6SaintLiguaire.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            dashArray: "2 12",
            color: "#93c21e",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne6SaintLiguaire)
}

function TrajetLine6JeanZay() {
    var Ligne6JeanZay = TrajetLigne6JeanZay.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            dashArray: "2 12",
            color: "#93c21e",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne6JeanZay)
}

function TrajetLine6() {
    var Ligne6Trajet = TrajetLigne6.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            color: "#93c21e",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne6Trajet)
}