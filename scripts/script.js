window.onscroll = function() {navBarFunction()};

var header = document.getElementById("header");
var navbar = document.getElementById("navbar");
const navStyle = document.querySelector("#navbar");
var sticky = navbar.offsetTop;
var navOpen = false;
var isSticky = false;
navbar.style.backdropFilter = "blur(0px)";

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.onresize = function() {checkWidth()};

function changeNavPosition() {
  if (navOpen) {
    if (isSticky)
      navbar.style.position = "";
    else
      navbar.style.position = "absolute";
  } else {
    if (isSticky)
      navbar.style.position = "";
    else
      navbar.style.position = "relative";
  }
}

function addBlur() {
  navbar.style.backgroundColor = "rgba(26, 27, 24, 0.75)";
  navbar.style.backdropFilter = "blur(25px)";
  navbar.style.boxShadow = '0px 5px 50px rgba(0, 0, 0,0.4)';
}
function removeBlur() {
  if (!isSticky) {
    navbar.style.backgroundColor = "transparent";
    navbar.style.backdropFilter = "blur(0px)";
    navbar.style.boxShadow = '0px 0px 0px rgba(0, 0, 0,0)';
  }
}

function checkWidth() {
  if (window.screen.width > 900 && navOpen) {
    removeBlur();
    const nav = document.querySelector("#nav-links");
    nav.classList.toggle('nav-open');
    navOpen = false;
    changeNavPosition();
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
    if (!navOpen) {
      removeBlur();
    }
  }
  changeNavPosition();
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

    if (navOpen) {
      addBlur();
    }
    else {
      removeBlur();
    }
    changeNavPosition();
  });

  const checkInfo = document.querySelector("confirm");
  checkInfo.addEventListener("checked", () => {
    var signup = document.getElementById("buttonSignup");
    signup.disabled = "false";
    signup.classList.add("enable");
  });
});

function removeSignup() {
  const signup = document.getElementById("signup");
  signup.remove();
}

function setFocused1() {
  var resultName = document.querySelectorAll("#field1");
  for (result of resultName) {
    result.classList.add('focused');
  }
}

function unsetFocused1() {
  var resultName = document.querySelectorAll("#field1");
  for (result of resultName) {
      result.classList.remove('focused');
  }
}

function setFocused2() {
  var resultEmail = document.querySelectorAll("#field2");
  for (result of resultEmail) {
      result.classList.add('focused');
  }
    
}

function unsetFocused2() {
  var resultEmail = document.querySelectorAll("#field2");
  for (result of resultEmail) {
      result.classList.remove('focused');
  }
}

var resultName = document.querySelectorAll("#userName");
var resultEmail = document.querySelectorAll("#userEmail");
for (result of resultName) {
  result.addEventListener("focusin", setFocused1);
  result.addEventListener("focusout", unsetFocused1);
}
for (result of resultEmail) {
  result.addEventListener("focusin", setFocused2);
  result.addEventListener("focusout", unsetFocused2);
}

function focusField(input) {
  input.children[1].focus();
}

const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

const months = ["January", "February", "March", "April",
"May", "June", "July", "August", "September", "October",
"November", "December"];

(function populateMonths() {
  for (let i = 0; i < months.length; i++) {
    const option = document.createElement("option");
    option.textContent = months[i];
    monthSelect.appendChild(option);
  }
  monthSelect.value = "January";
})();

let previousDay;

function populateDays(month) {
  while (daySelect.firstChild) {
    daySelect.removeChild(daySelect.firstChild);
  }

  let dayNum;
  let year = yearSelect.value;

  if (month === "January" || month === "March" || month === "May" || 
      month === "July" || month === "August" || month === "October" ||
      month === "December") {
    dayNum = 31;
  } else if (month === "April" || month === "June" || 
             month === "September" || month === "November") {
    dayNum = 30;
  } else {
    if (new Date(year, 1, 29).getMonth() === 1) {
      dayNum = 29;
    } else {
      dayNum = 28;
    }
  }

  for (let i = 1; i <= dayNum; i++) {
    const option = document.createElement("option");
    option.textContent = i;
    daySelect.appendChild(option);
  }
  if (previousDay) {
    daySelect.value = previousDay;

    while (daySelect.value === "") {
      daySelect.value = --previousDay;
    }
  }
}

function populateYears() {
  let year = new Date().getFullYear();

  for (let i = 0; i <= 100; i++) {
    const option = document.createElement("option");
    option.textContent = year - i;
    yearSelect.appendChild(option);
  }
}

populateDays(monthSelect.value);
populateYears();

yearSelect.onchange = function() {
  populateDays(monthSelect.value);
}
monthSelect.onchange = function() {
  populateDays(monthSelect.value);
}
daySelect.onchange = function() {
  previousDay = daySelect.value;
}

function welcome() {
  var name = document.getElementById("userName").value;

  if (name != "") {
    alert("Welcome " + name);
    removeSignup();
  }

}

// Typing animation
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

// var copyrightYear = document.getElementsByClassName(".copyright");
// let thisYear = new Date().getFullYear();

