function TrajetLine4Pissardent() {
    var Ligne4TrajetPissardent = TrajetLigne4Pissardent.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            dashArray: "2 12",
            color: "#f286a0",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne4TrajetPissardent)
}

function TrajetLine4Moulin() {
    var Ligne4TrajetMoulin = TrajetLigne4Moulin.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            dashArray: "2 12",
            color: "#f286a0",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne4TrajetMoulin)
}

function TrajetLine4() {
    var Ligne4Trajet = TrajetLigne4.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            color: "#f286a0",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne4Trajet)
}