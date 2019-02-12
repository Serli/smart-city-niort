document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
    var element = document.querySelectorAll('.carousel');
    M.Carousel.init(element, {
        shift: 50
    });
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

