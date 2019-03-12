document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
});


document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems, {enterDelay: 600});
});

// nombre d'icone categorie
let categos = document.getElementsByClassName("navbarUnder")[0].getElementsByClassName("fas");

// onclick sur toute les categorie
for (var i = 0; i < categos.length; i++) {
    categos[i].onclick = clickCatego;
}


// tout les criteres
let criteres = document.getElementsByTagName("a")

// onclcik sur tout les criteres
for (var i = 0; i < criteres.length; i++) {
    criteres[i].onclick = clickCritere;
}

// 4 navbarCriteres navbarOn
navbarCriteres = document.getElementsByClassName("navbarOn")
// 1 navbarCategos navbarUnder
navbarCategos = document.getElementsByClassName("navbarUnder")


function clickCatego() {


    //compte tout les critères activé
    let criteresActive = null;
    for (var i = 0; i < navbarCriteres.length; i++) {
        criteresActive = document.getElementsByClassName("navbarOn")[i].getElementsByClassName("active");
    }

    //criteresActive = document.getElementsByClassName("navbarOn")[0].getElementsByClassName("active");

    // toute les catégorie activé
    categosActive = document.getElementsByClassName("navbarUnder")[0].getElementsByClassName("active");

    // navbarOn/NavbarCritere visible
    navbaronVisible = document.getElementsByClassName("visible ");

    idCategorie = this.id;

    // list des critères activé de la categorie actuelle
    currentNavbarCritereActive = document.getElementsByClassName(idCategorie)[0].getElementsByClassName("active")


    //if current est deja active
    if (this.className.includes("active")) {


        //if la navbarCritere en question comporte des critères activé
        if (currentNavbarCritereActive.length > 0) {

            if (navbaronVisible.length === 0) {
                openNav(this.id)
            } else {
                for (var i = 0; i < navbaronVisible.length; i++) {
                    //si il y a + d'une categorie activé et la navbarCritere en question comporte des critères activé
                    // et que la navbarCritere ouverte actuellement correspond a la catégorie actuelle

                    if (navbaronVisible[i].className.includes(this.id)) {
                        closeNav(this.id);
                    } else if (navbaronVisible.length > 0)
                    // if il y a plusieurs navBarOn de visible
                    {
                        closeAllNav();
                        openNav(this.id)
                    }

                }
            }


        } else
        // la navbarCritere en question comporte aucun critères activé
        {
            closeNav(this.id);
            this.className = this.className.replace(" active", "");
        }


    } else {


        if (categosActive.length > 0) {
            closeAllNav();
        }
        this.className += " active";
        openNav(this.id);
    }
}

function verifCategoActive() {

    // toute les catégorie activé
    categosActive = document.getElementsByClassName("navbarUnder")[0].getElementsByClassName("active");

    for (var i = 0; i < categosActive.length; i++) {

        var catego = categosActive[i]

        var navbarOnAvecClassCategoId = document.getElementsByClassName(catego.id);
        var nrbActive = navbarOnAvecClassCategoId[0].getElementsByClassName("active").length

        // si il y a pas de critere active dans cette nabarOn, alors on desactive la categorie
        if (nrbActive === 0) {
            catego.classList.remove("active");

        }
    }
}

let markerArret = [];

function clickCritere() {

    var nameCritere = this.id;

    if (this.className.includes("active")) {

        /* ********   Spécial critere parking voiture  **********  */
        if (nameCritere === "ParkingGratuit") {

            let parkingV = document.getElementById("ParkingVoiture");
            let parkingC = document.getElementById("ParkingCouvert");
            if (parkingV.className.includes("active") && parkingC.className.includes("active") != true) {
                map.addLayer(tabLayer["ParkingVoiture"])
            }

        } else if (nameCritere === "ParkingCouvert") {
            let parkingV = document.getElementById("ParkingVoiture");
            let parkingG = document.getElementById("ParkingGratuit");
            if (parkingV.className.includes("active") && parkingG.className.includes("active") != true) {
                map.addLayer(tabLayer["ParkingVoiture"])
            }
        }
        if (nameCritere === "ParkingVoiture") {
            let parkingG = document.getElementById("ParkingGratuit");
            if (parkingG.className.includes("active")) {
                map.removeLayer(tabLayer["ParkingGratuit"]);
                parkingG.classList.remove("active")
            }

            let parkingC = document.getElementById("ParkingCouvert");
            if (parkingC.className.includes("active")) {
                map.removeLayer(tabLayer["ParkingCouvert"]);
                parkingC.classList.remove("active")
            }

            let filter = document.getElementsByClassName("filtreShow");
            while (document.getElementsByClassName("filtreShow").length > 0) {
                document.getElementsByClassName("filtreShow")[0].classList.add("filterHide");
                document.getElementsByClassName("filtreShow")[0].classList.remove("filtreShow");
            }
        }


        /* ********   Générique  **********  */
        // je desactive le bouton
        this.classList.remove("active");
        //je remove le layer
        map.removeLayer(tabLayer[nameCritere]);
        markerArret = [];
    } else {


        /* ********   Spécial critere parking voiture  **********  */

        if (nameCritere === "ParkingGratuit") {

            let parkingV = document.getElementById("ParkingVoiture");
            if (parkingV.className.includes("active")) {
                map.removeLayer(tabLayer["ParkingVoiture"])
            }

        } else if (nameCritere === "ParkingCouvert") {
            let parkingV = document.getElementById("ParkingVoiture");
            if (parkingV.className.includes("active")) {
                map.removeLayer(tabLayer["ParkingVoiture"])
            }
        } else if (nameCritere === "ParkingVoiture") {
            let filter = document.getElementsByClassName("filterHide");
            while (document.getElementsByClassName("filterHide").length > 0) {
                document.getElementsByClassName("filterHide")[0].classList.add("filtreShow");
                document.getElementsByClassName("filterHide")[0].classList.remove("filterHide");
            }
        }


        /* ********   Générique  **********  */

        // j'active le bouton
        this.classList.add("active");

        if (nameCritere != null) {
            map.addLayer(tabLayer[nameCritere]);
        }

        map.eachLayer(function(layer) {
            if(layer.options && layer.options.pane === "markerPane") {
                map.removeLayer(layer);
                if (markerArret.length === 0){
                    markerArret.push(layer);
                } else {
                    let found = markerArret.findIndex((coordonnees)=>{
                        return coordonnees._latlng.lat === layer._latlng.lat && coordonnees._latlng.lng === layer._latlng.lng
                    });
                    if(found <= 0){
                        markerArret.push(layer);
                    }
                }
            }
        });

        markerArret.forEach((arret) => {
            map.addLayer(arret);
        });

    }
}


function openNav(categorie) {
    document.getElementsByClassName(categorie)[0].classList.add("visible");

}


function closeNav(categorie) {
    document.getElementsByClassName(categorie)[0].classList.remove("visible");

}

function closeAllNav() {

    while (document.getElementsByClassName("visible").length > 0) {
        document.getElementsByClassName("visible")[0].classList.remove("visible");
        verifCategoActive()

    }

}

// changer la nav bar de place : left - bottom
// document.getElementsByClassName("toggle")[0].onclick = clickTogglePosition;

function clickTogglePosition() {


    if (document.getElementsByClassName("containNavbar")[0].className.includes("footerBottom")) {


        for (i = 0; i < document.getElementsByClassName("navbarOn").length; i++) {
            document.getElementsByClassName("navbarOn")[i].classList.remove("transition");
        }


        document.getElementsByClassName("containNavbar")[0].classList.add("footerLeft");
        document.getElementsByClassName("containNavbar")[0].classList.remove("footerBottom");


        document.getElementsByClassName("footer")[0].classList.add("footerL");
        document.getElementsByClassName("footer")[0].classList.remove("footerB");


        document.getElementsByClassName("fa-arrow-left")[0].classList.add("angleUp");

        setTimeout(function () {
            for (i = 0; i < document.getElementsByClassName("navbarOn").length; i++) {
                document.getElementsByClassName("navbarOn")[i].classList.add("transition");
            }

        }, 350);


    } else {


        for (i = 0; i < document.getElementsByClassName("navbarOn").length; i++) {
            document.getElementsByClassName("navbarOn")[i].classList.remove("transition");
        }

        document.getElementsByClassName("containNavbar")[0].classList.add("footerBottom");
        document.getElementsByClassName("containNavbar")[0].classList.remove("footerLeft");


        document.getElementsByClassName("footer")[0].classList.add("footerB");
        document.getElementsByClassName("footer")[0].classList.remove("footerL");

        document.getElementsByClassName("fa-arrow-left")[0].classList.remove("angleUp");

        setTimeout(function () {
            for (i = 0; i < document.getElementsByClassName("navbarOn").length; i++) {
                document.getElementsByClassName("navbarOn")[i].classList.add("transition");
            }

        }, 350);

    }

}


// on cliquez sur la map ça ferme les critere mais pas les categories
document.getElementsByTagName("main")[0].onclick = closeAllNav;


// cacher ou afficher la navbarUnder = navbar principal des categories
document.getElementsByClassName("btnHide")[0].onclick = clickToggleFooter;

function clickToggleFooter() {

    verifCategoActive()

    if (document.getElementsByClassName("containNavbar")[0].className.includes("show")) {

        closeAllNav();
        document.getElementsByClassName("containNavbar")[0].classList.remove("show");
        document.getElementsByClassName("navbarUnder")[0].classList.remove("show");

        document.getElementsByClassName("fa-angle-double-down")[0].classList.add("angleUp");


    } else {
        document.getElementsByClassName("containNavbar")[0].classList.add("show");
        document.getElementsByClassName("navbarUnder")[0].classList.add("show");
        document.getElementsByClassName("fa-angle-double-down")[0].classList.remove("angleUp");

    }


}

