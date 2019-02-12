console.log("Hello");

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
});


let categos = document.getElementsByClassName("navbarUnder")[0].getElementsByClassName("fas");

for (var i = 0; i < categos.length; i++) {
    categos[i].onclick = clickCatego;
}


let criteres = document.getElementsByClassName("navbarOn")[0].getElementsByTagName("a");

for (var i = 0; i < criteres.length; i++) {
    criteres[i].onclick = clickCritere;
}


function clickCatego() {
    let criteresActive = document.getElementsByClassName("navbarOn")[0].getElementsByClassName("active");
    //if current est deja active
    if (this.className.includes("active")) {

        if (criteresActive.length > 0) {

            while (criteresActive.length) {
                criteresActive[0].classList.remove("active",);
            }


            if (criteresActive.length === 0) {
                closeNav();
                this.className = this.className.replace(" active", "");
            }


        } else {

            closeNav();
            this.className = this.className.replace(" active", "");
        }

    } else {
        this.className += " active";
        openNav();
    }
}


function clickCritere() {

    if (this.className.includes("active")) {
        this.className = this.className.replace(" active", "");

    } else {
        this.className += " active";
    }
}


function openNav() {
    document.getElementById("mySidenav").style.height = "50px";
}


function closeNav() {
    document.getElementById("mySidenav").style.height = "0";
}

