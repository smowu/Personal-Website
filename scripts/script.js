window.onscroll = function() {navBarFunction()};
          
var navbar = document.getElementById("navbar");
const navStyle = document.querySelector("#navbar");
var sticky = navbar.offsetTop;
var navOpen = false;
var isSticky = false;
navbar.style.backdropFilter = "blur(0px)";

window.onresize = function() {checkWidth()};

function addBlur()
{
  navbar.style.backgroundColor = "rgba(59, 60, 55,0.5)";
  navbar.style.backdropFilter = "blur(25px)";
  //navStyle.classList.toggle('navbar-blur');
  navbar.style.boxShadow = '0px 5px 50px rgba(0, 0, 0,0.4)';
}
function removeBlur()
{
  navbar.style.backgroundColor = "rgba(59, 60, 55,0)";
  navbar.style.backdropFilter = "blur(0px)";
  //navStyle.classList.toggle('navbar-no-blur');
  navbar.style.boxShadow = '0px 0px 0px rgba(0, 0, 0,0)';
}
/*
window.onload = function(){
  document.querySelector('.btn').onclick = function(){
      if(this.className.match('btn_red')) {
          this.className = 'btn';
      }
      else {
          this.className = 'btn btn_red';
      }
  };
};
*/

function checkWidth() 
{
  if (window.screen.width > 900 && navOpen) {
    if (!isSticky)
      removeBlur();
    const nav = document.querySelector("#nav-links");
    nav.classList.toggle('nav-open');
    navOpen = false;
  }
}

function navBarFunction() 
{
  if (window.pageYOffset >= sticky) 
  {
    navbar.classList.add("sticky")
    isSticky = true;
    addBlur();
  } 
  else 
  {
    navbar.classList.remove("sticky");
    isSticky = false;
    if (!navOpen)
      removeBlur();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector("#navToggle");
  const nav = document.querySelector("#nav-links");

  navToggle.addEventListener("click", () => {
    nav.classList.toggle('nav-open');

    if (!navOpen)
      navOpen = true;
    else
      navOpen = false;

    if (navOpen)
      addBlur();
    else
      removeBlur();

  });
});





