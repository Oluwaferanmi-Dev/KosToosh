// You can change global variables here:
var radius = 240; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 120; // width of images (unit: px)
var imgHeight = 170; // height of images (unit: px)

// Link of background music - set 'null' if you dont want to play background music
var bgMusicURL = 'https://github.com/Oluwaferanmi-Dev/caleb.dev-3d-carousel/raw/main/yt1s.com%20-%20I%20Dont%20Trust%20Nobody%20Original.mp3';
var bgMusicControls = true; // Show UI music control

/*
     NOTE:
       + imgWidth, imgHeight will work for video
    
*/


// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";


// Function to rotate the container
function rotateContainer() {
  ospin.style.transform = "rotateY(" + (tX % 360) + "deg) rotateX(" + (-tY % 360) + "deg)";
}

// Add event listeners to images
for (var i = 0; i < aImg.length; i++) {
  aImg[i].addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent container
    expandElement(this);
  });
}

// Add event listeners to videos
for (var j = 0; j < aVid.length; j++) {
  aVid[j].addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent container
    expandElement(this);
  });
}

// Variables for storing mouse coordinates
var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// Function to handle mouse down event
document.onmousedown = function(e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  // Function to handle mouse move event
  this.onmousemove = function(e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    rotateContainer();
    sX = nX;
    sY = nY;
  };

  // Function to handle mouse up event
  this.onmouseup = function(e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      rotateContainer();
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
      }
    }, 17);
    this.onmousemove = this.onmouseup = null;
  };

  return false;
};

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// add background music
if (bgMusicURL) {
  document.getElementById('music-container').innerHTML += `
<audio src="${bgMusicURL}" ${bgMusicControls? 'controls': ''} autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`;
}

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

// Rest of the code...
