function tracer(Color, data, ligneDeBus) {

    let line = L.geoJSON(data,
        {
            style: {
                opacity: 1,
                color: Color,
                weight: 3
            },
            onEachFeature: onEachFeature
        });

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });

        if (feature.properties.name.includes("Alt")) {
            layer.setStyle({
                opacity: 1,
                dashArray: "2 12",
                color: Color,
                weight: 3
            });
        }

        createPopup(layer, null, '<img src="./assets/images/tanlib.png" class="markerTan"/>', null, null, null, ligneDeBus)

    }

    return line;

}

function Trajet(idLigne) {
    let ligneObject = lignes[idLigne - 1];
    let ligneDeBus = '<img src="./assets/images/ligne/ligne' + idLigne + '.png" class="logoLigne"/>';
    let Color = ligneObject.colorLigne;
    let data = ligneObject.data;
    var lineBus = tracer(Color, data, ligneDeBus);
    return lineBus;
}

function Trajets() {
    let tableauDeLAYER = []
    lignes.map((ligne) => {
        tableauDeLAYER.push(Trajet(ligne.id));
    });
    return tableauDeLAYER;
}

