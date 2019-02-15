function TrajetLine3() {
    var Ligne3Trajet = TrajetLigne3.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            color: "#69c0ad",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne3Trajet)
}