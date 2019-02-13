document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
});

document.getElementById("button-navbar3").addEventListener("click", function () {
    var elem = document.getElementById('carousel');
    if(elem.style.display === "none") {
        document.getElementById("navbar3").style.height = "164px";
        elem.style.display = "block";
    }
    else {
        elem.style.display = "none";
        document.getElementById("navbar3").style.height = "30px";
    }
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
    var element = document.querySelectorAll('.carousel');

    if (this.className.includes("active")) {

        map.removeLayer(tabLayer[0])
        this.className = this.className.replace(" active", "");
        document.getElementById('button-navbar3').style.visibility = "hidden";
        document.getElementById('navbar3').style.height = "0px";

    } else {
        map.addLayer(tabLayer[0]);
        this.className += " active";
        document.getElementById('navbar3').style.height = "164px";
        document.getElementById('button-navbar3').style.visibility = "visible";
        M.Carousel.init(element, {
            shift: 50,
        });


    }
}


function openNav() {
    document.getElementById("mySidenav").style.height = "50px";
}


function closeNav() {
    document.getElementById("mySidenav").style.height = "0";
}

