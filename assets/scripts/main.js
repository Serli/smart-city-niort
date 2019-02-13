document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
});


let categos = document.getElementsByClassName("navbarUnder")[0].getElementsByClassName("fas");

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

let criteres = document.getElementsByTagName("a")

console.log(" criteres.length : ", criteres.length)
for (var i = 0; i < criteres.length; i++) {
    criteres[i].onclick = clickCritere;
}


function clickCatego() {
    //this
    criteresActive = document.getElementsByClassName("navbarOn")[0].getElementsByClassName("active");
    categosActive = document.getElementsByClassName("navbarUnder")[0].getElementsByClassName("active");

    //if current est deja active
    if (this.className.includes("active")) {



        if (criteresActive.length > 0) {

            if (categosActive.length > 1) {
                closeNav(this.id);
            }

            if (categosActive.length === 1) {

                //on desactive tout les critères
                while (criteresActive.length) {

                    criteresActive[0].classList.remove("active");
                }

                //si les critère sont tous désactiver , on ferme la navbar
                if (criteresActive.length === 0) {
                    closeNav(this.id);
                    this.className = this.className.replace(" active", "");
                }
            }


        } else {

            closeNav(this.id);
            this.classList.remove("active");
        }

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
    console.log("className : ", document.getElementsByClassName(categorie)[0].className)
    document.getElementsByClassName(categorie)[0].classList.remove("visible");

}

function closeAllNav() {
    console.log("delete")

    while (document.getElementsByClassName("visible").length > 0) {
        document.getElementsByClassName("visible")[0].classList.remove("visible");
    }

}



