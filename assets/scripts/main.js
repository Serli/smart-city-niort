console.log("Hello");

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
});


let icons = document.getElementsByClassName("fas");

for (var i = 0; i < icons.length; i++) {
    icons[i].onclick = clickIcon;
}

function clickIcon() {
    console.log(this.className)
    //var current = document.getElementsByClassName("active");
    if (this.className.includes("active")) {
        this.className = this.className.replace(" active", "");
        closeNav();
    } else {
        this.className += " active";
        openNav();

    }


}


function openNav() {
    document.getElementById("mySidenav").style.height = "50px";
}


function closeNav() {
    document.getElementById("mySidenav").style.height = "0";
}
