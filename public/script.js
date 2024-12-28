// Boy animation
let boyFrames = [
  "media/imgs/hero-boy-anim/hero-boy1.png",
  "media/imgs/hero-boy-anim/hero-boy2.png",
  "media/imgs/hero-boy-anim/hero-boy3.png",
  "media/imgs/hero-boy-anim/hero-boy4.png",
  "media/imgs/hero-boy-anim/hero-boy5.png",
];
let currentFrame = 0;
let boysFrameTime = 400;
let duckFrameHold = 250;

// Cycle images between these variables
let minCycle = 300;
let maxCycle = 1000;

//   -------------------   BOI PROBLEMS

setInterval(() => {
  document.querySelector(".boy img").src = boyFrames[currentFrame];
  currentFrame = (currentFrame + 1) % boyFrames.length;
}, boysFrameTime);

setTimeout(() => {
  document.querySelectorAll('a[href*="000webhost.com"]').forEach((el) => {
    if (el.parentElement.style.zIndex === "9999999") {
      el.parentElement.remove();
    }
  });
}, 200);

//   -------------------   DUCK PROBLEMS

// Target area coordinates
const targetArea = { xMin: 47, xMax: 90, yMin: 44, yMax: 99 };

// Add event listener for mouse movement to change the cursor
document
  .querySelector(".duck img")
  .addEventListener("mousemove", function (event) {
    const cursorType = isWithinTargetArea(event, this) ? "pointer" : "default";
    this.style.cursor = cursorType;
  });

// Add event listener for click event
document.querySelector(".duck img").addEventListener("click", function (event) {
  if (isWithinTargetArea(event, this)) {
    duckClicked();
  }
});

// Function to check if the mouse event is within the target area
function isWithinTargetArea(event, image) {
  const rect = image.getBoundingClientRect();
  const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
  const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

  return (
    xPercent > targetArea.xMin &&
    xPercent < targetArea.xMax &&
    yPercent > targetArea.yMin &&
    yPercent < targetArea.yMax
  );
}

// Function to handle the duck click action
function duckClicked() {
  const duckImg = document.querySelector(".duck img");
  const quackSound = document.getElementById("quackSound");
  const heroSection = document.querySelector(".hero");

  // Change to the second frame and play quack sound
  duckImg.src = "media/imgs/hero-duck-anim/hero-duck2.png";
  quackSound.play();

  // Reset to the original image after a delay
  setTimeout(function () {
    duckImg.src = "media/imgs/hero-duck-anim/hero-duck1.png"; // Adjust the image source as needed
  }, duckFrameHold); // Adjust the timeout as needed

  // Create a new glue bottle element
  const glueBottle = document.createElement("img");
  glueBottle.src = "media/imgs/glue.png";
  glueBottle.classList.add("glueBottle", "drop-glue");
  glueBottle.style.position = "absolute";
  glueBottle.style.bottom = "5%";
  glueBottle.style.right = "30%";
  heroSection.appendChild(glueBottle);

  // Optionally remove the glue bottle after animation ends
  glueBottle.addEventListener("animationend", () => {
    heroSection.removeChild(glueBottle);
  });
}

//   -------------------   CYCLE IMAGES
function cycleImages() {
  const images = document.querySelectorAll(".cycle-image");

  images.forEach((image) => {
    // Extract the base name and extension of the image file
    const baseName = image.src.replace(/[0-9]*\.(png|jpg|jpeg|gif)$/, "");
    const extension = image.src.match(/\.(png|jpg|jpeg|gif)$/)[0];

    // Function to toggle image source
    const toggleImage = () => {
      let currentNumber = image.src.match(/(\d+)(?=\.\w+$)/);
      currentNumber = currentNumber ? parseInt(currentNumber[0]) : 1;
      const nextNumber = currentNumber === 1 ? 2 : 1;
      image.src = baseName + nextNumber + extension;

      // Set a random timeout for the next toggle
      const randomTimeout =
        Math.floor(Math.random() * (maxCycle - minCycle + 1)) + minCycle;
      setTimeout(toggleImage, randomTimeout);
    };

    // Start the cycle
    toggleImage();
  });
}

// Start cycling when the document is loaded
window.addEventListener("DOMContentLoaded", cycleImages);

// DUCK WIFFIN TOO MUCH SECTION

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

function updateAnimation(duckElement, additionalAnimation) {
  // Base animations that are always present
  let baseAnimation =
    "flyCycle 0.3s steps(5) infinite, hover 0.6s ease-in-out infinite";

  // If there's an additional animation to add
  if (additionalAnimation) {
    baseAnimation += `, ${additionalAnimation}`;
  }

  // Apply the animation string
  duckElement.style.animation = baseAnimation;
}

document
  .getElementById("flyingDuck")
  .addEventListener("animationend", function (event) {
    if (event.animationName === "moveRight") {
      // Add the 'crash' class to trigger the crash animation
      this.classList.add("crash");
      // Reset other animations
      this.style.animation = "none";
      // Trigger reflow to restart the animation
      void this.offsetWidth;
      // Apply the crash animation
      this.style.animation = "crash .25s steps(7) forwards";
    }
  });

function onScroll() {
  const duckElement = document.getElementById("flyingDuck");
  const duckContainer = document.querySelector(".duck-fly");

  if (
    isElementInViewport(duckElement) &&
    !duckElement.classList.contains("moving")
  ) {
    duckElement.style.animation =
      "flyCycle 0.3s steps(5) infinite, hover 0.6s ease-in-out infinite, moveRight 4s linear forwards";
    duckElement.classList.add("moving");
  }
}

window.addEventListener("scroll", onScroll);
