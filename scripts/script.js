window.onscroll = function() {navBarFunction()};
          
var navbar = document.getElementById("navbar");
const navStyle = document.querySelector("#navbar");
var sticky = navbar.offsetTop;
var navOpen = false;
var isSticky = false;
navbar.style.backdropFilter = "blur(0px)";

window.onresize = function() {checkWidth()};

function addBlur() {
  navbar.style.backgroundColor = "rgba(26, 27, 24, 0.75)";
  navbar.style.backdropFilter = "blur(25px)";
  //navStyle.classList.toggle('navbar-blur');
  navbar.style.boxShadow = '0px 5px 50px rgba(0, 0, 0,0.4)';
}
function removeBlur() {
  navbar.style.backgroundColor = "transparent";
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

function checkWidth() {
  if (window.screen.width > 900 && navOpen) {
    if (!isSticky)
      removeBlur();
    const nav = document.querySelector("#nav-links");
    nav.classList.toggle('nav-open');
    navOpen = false;
  }
}

function navBarFunction() {
  if (window.pageYOffset >= sticky) 
  {
    navbar.classList.add("sticky")
    isSticky = true;
    addBlur();
  } else {
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

var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 125 - Math.random() * 100;

  if (this.isDeleting) { 
    delta /= 1;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 1000;
  }
  
  setTimeout( function() {
    that.tick();
  }, delta);

};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');

  for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }

};

