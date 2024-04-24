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
// animation start after 1000 milliseconds
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

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

// Function to handle image click event
function handleImageClick(image) {
  // Create a modal element
  var modal = document.createElement('div');
  modal.classList.add('modal');

  // Create an image element for the larger version
  var largeImage = document.createElement('img');
  largeImage.src = image.src; // Set the src attribute to the clicked image src
  largeImage.classList.add('modal-image');

  // Append the large image to the modal
  modal.appendChild(largeImage);

  // Append the modal to the body
  document.body.appendChild(modal);

  // Add event listener to close the modal when clicked
  modal.addEventListener('click', function() {
    document.body.removeChild(modal); // Remove the modal from the DOM
  });
}

// Add click event listeners to images
for (var i = 0; i < aImg.length; i++) {
  aImg[i].addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the parent container
    handleImageClick(this); // Pass the clicked image to the handleImageClick function
  });
}
