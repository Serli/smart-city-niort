function TrajetLine7() {
    var Ligne7Trajet = TrajetLigne7.features.map(T => {
        var latlngs = T.geometry.coordinates.map(coord => {
            return [coord[1], coord[0]];
        });

        var line = L.polyline(latlngs, {
            opacity: 1,
            color: "#a94c85",
            weight: 6,
        });
        return line;
    });
    return L.layerGroup(Ligne7Trajet)
}