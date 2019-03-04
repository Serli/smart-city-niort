function TrajetLine9() {
    var Ligne9Trajet = TrajetLigne9.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            color: "#f19200",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne9Trajet)
}

function TrajetLine9Alt() {
    var Ligne9Alt = TrajetLigne9Alt.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            dashArray: "2 12",
            color: "#f19200",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne9Alt)
}