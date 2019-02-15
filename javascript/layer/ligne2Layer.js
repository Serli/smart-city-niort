function TrajetLine2Alt() {
    var Ligne2TrajetAlt = TrajetLigne2Alt.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            dashArray: "2 12",
            color: "#007a3d",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne2TrajetAlt)
}

function TrajetLine2Bis() {
    var Ligne2TrajetBis = TrajetLigne2Bis.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            dashArray: "2 12",
            color: "#007a3d",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne2TrajetBis)
}

function TrajetLine2() {
    var Ligne2Trajet = TrajetLigne2.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            color: "#007a3d",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne2Trajet)
}