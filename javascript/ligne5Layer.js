function TrajetLine5Zodiac() {
    var Ligne5TrajetZodiac = TrajetLigne5Zodiac.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            dashArray: "2 12",
            color: "#3874ba",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne5TrajetZodiac)
}

function TrajetLine5Chauray() {
    var Ligne5TrajetChauray = TrajetLigne5Chauray.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            dashArray: "2 12",
            color: "#3874ba",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne5TrajetChauray)
}

function TrajetLine5() {
    var Ligne5Trajet = TrajetLigne5.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            color: "#3874ba",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne5Trajet)
}