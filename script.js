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

// Function to handle expanding an element
function expandElement(element) {
  element.style.transform = "scale(2) translateZ(500px)";
  var closeButton = document.createElement('button');
  closeButton.innerText = 'X';
  closeButton.classList.add('close-button');
  closeButton.onclick = function(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent container
    revertElement(element);
    this.remove(); // Remove the close button
  };
  document.getElementById('close-button-container').appendChild(closeButton);
}

// Function to handle reverting an element back to normal size
function revertElement(element) {
  element.style.transform = "translateZ(0)";
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

// Variables for storing mouse/touch coordinates
var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// Function to handle mouse/touch move event
function handleMove(e) {
  e = e || window.event;
  var clientX, clientY;
  if (e.touches) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  var nX = clientX,
      nY = clientY;
  desX = nX - sX;
  desY = nY - sY;
  tX += desX * 0.1;
  tY += desY * 0.1;
  rotateContainer();
  sX = nX;
  sY = nY;
}

// Function to handle mouse/touch up event
function handleUp() {
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
  document.removeEventListener('mousemove', handleMove);
  document.removeEventListener('touchmove', handleMove);
  document.removeEventListener('mouseup', handleUp);
  document.removeEventListener('touchend', handleUp);
}

// Function to handle mouse/touch down event
function handleDown(e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  if (e.touches) {
    sX = e.touches[0].clientX;
    sY = e.touches[0].clientY;
  } else {
    sX = e.clientX;
    sY = e.clientY;
  }
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('touchmove', handleMove);
  document.addEventListener('mouseup', handleUp);
  document.addEventListener('touchend', handleUp);
  return false;
}

// Event listeners for mouse/touch events
document.addEventListener('mousedown', handleDown);
document.addEventListener('touchstart', handleDown);

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
