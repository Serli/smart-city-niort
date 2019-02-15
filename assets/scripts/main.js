document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
});


document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems,  {enterDelay: 600} );
});


// nombre d'icone categorie
let categos = document.getElementsByClassName("navbarUnder")[0].getElementsByClassName("fas");

// onclick sur toute les categorie
for (var i = 0; i < categos.length; i++) {
    categos[i].onclick = clickCatego;
}


// let navbarOnS = document.getElementsByClassName("navbarOn")
// console.log(" navbarOnS.length : ", navbarOnS.length)
// for (var i = 0; i < navbarOnS.length; i++) {
//     let criteres = navbarOnS[i].getElementsByTagName("a")
//
//     console.log(" criteres.length : ", criteres.length)
//     for (var i = 0; i < criteres.length; i++) {
//         criteres[i].onclick = clickCritere;
//     }
//
// }
//

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

    //compte toute les catégorie activé
    categosActive = document.getElementsByClassName("navbarUnder")[0].getElementsByClassName("active");

    // nombre de navbarOn/NavbarCritere visible
    navbaronVisible = document.getElementsByClassName("visible ");

    idCategorie = this.id

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


        // if (currentNavbarCritereActive.length > 0) {
        //
        //     if (currentNavbarCritereActive.length > 1) {
        //         closeNav(this.id);
        //     }
        //
        //     //if il y a qu'une catégorie d'activé
        //     if (currentNavbarCritereActive.length === 1) {
        //
        //         //on desactive tout les critères
        //         while (criteresActive.length) {
        //
        //             currentNavbarCritereActive[0].classList.remove("active");
        //         }
        //
        //         //si les critère sont tous désactiver , on ferme la navbar
        //         if (criteresActive.length === 0) {
        //             closeNav(this.id);
        //             this.className = this.className.replace(" active", "");
        //         }
        //     }
        //
        //
        // } else {
        //
        //     closeNav(this.id);
        //     if (currentNavbarCritereActive.length > 0) {
        //         this.classList.remove("active");
        //     }
        //
        // }

    } else {
        if (categosActive.length > 0) {
            closeAllNav();
        }

        this.className += " active";

        openNav(this.id);
    }
}


function clickCritere() {


    if (this.className.includes("active")) {
        // je desactive le bouton
        this.classList.remove("active");
        map.removeLayer(tabLayer[this.innerHTML.replace(/ /g, "")])

        console.log("teste parent : ", this.parentElement.className)


    } else {
        // j'active le bouton

        this.className += " active";
        map.addLayer(tabLayer[this.innerHTML.replace(/ /g, "")]);

        console.log("teste parent : ", this.parentElement.className)


    }
}


function openNav(categorie) {
    document.getElementsByClassName(categorie)[0].classList.add("visible");

}


function closeNav(categorie) {
    document.getElementsByClassName(categorie)[0].classList.remove("visible");

}

function closeAllNav() {
    console.log("close all")

    while (document.getElementsByClassName("visible").length > 0) {
        document.getElementsByClassName("visible")[0].classList.remove("visible");
    }

}



