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

            console.log(navbaronVisible.length)
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


function clickCritere() {

    console.log(map)

    var nameCritere = this.innerHTML;
    console.log("nameCritere :" , nameCritere );

    if (this.className.includes("active")) {

        // je desactive le bouton
        this.classList.remove("active");
        //je remove le layer
        map.removeLayer(tabLayer[nameCritere])


    } else {
        // j'active le bouton
        this.className += " active";
        //j'ajoute le layer

        map.addLayer(tabLayer[nameCritere]);


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
document.getElementsByClassName("toggle")[0].onclick = clickTogglePosition;

function clickTogglePosition() {

    if (document.getElementsByClassName("containNavbar")[0].className.includes("footerBottom")) {


        document.getElementsByClassName("containNavbar")[0].classList.remove("footerBottom");
        document.getElementsByClassName("containNavbar")[0].classList.add("footerLeft");

        document.getElementsByClassName("footer")[0].classList.remove("footerB");
        document.getElementsByClassName("footer")[0].classList.add("footerL");


    } else {

        document.getElementsByClassName("containNavbar")[0].classList.remove("footerLeft");
        document.getElementsByClassName("containNavbar")[0].classList.add("footerBottom");

        document.getElementsByClassName("footer")[0].classList.remove("footerL");
        document.getElementsByClassName("footer")[0].classList.add("footerB");


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


