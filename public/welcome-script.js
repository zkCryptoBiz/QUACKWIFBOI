// ----------------   CHECK FOR NOT LANDSCAPE LOSERS

function checkOrientation() {
  if (window.innerWidth > window.innerHeight) {
    // Landscape mode
    document.getElementById("welcomeScreen").style.display = "block";
    document.getElementById("orientationAlert").style.display = "none";
  } else {
    // Not landscape mode
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("orientationAlert").style.display = "block";
  }
}

// Check the orientation when the page loads
document.addEventListener("DOMContentLoaded", checkOrientation);

// Also check when the device orientation changes
window.addEventListener("resize", checkOrientation);

// ------------------  ENTER BUTTON SHTUFFF

document.getElementById("enterButton").addEventListener("click", function () {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("videoScreen").style.display = "block";

  // Play the video automatically when the screen is revealed
  document.getElementById("introVideo").play();
});

document.getElementById("introVideo").addEventListener("ended", function () {
  window.location.href = "home.html"; // Replace with your main site URL
});
