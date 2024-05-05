let menu = document.getElementById("#menu-icon");
let navbar = document.querySelector(".navbar-items");

function toggle() {
  if (navbar.style.top == "-500px") {
    navbar.style.top = "84px";
    navbar.style.backgroundColor = "rgb(0 0 0 / 90%)";
    navbar.remove = "0px";
  } else {
    navbar.style.top = "-500px";
  }
}