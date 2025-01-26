const viewContainer = document.getElementById("viewContainer");
const newDeckBtn = document.getElementById("newDeckBtn");
const shuffleBtn = document.getElementsById("shuffleBtn");
const showDeckBtn = document.getElementById("showDeckBtn");
const drawCardBtn = document.getElementById("drawCardBtn");

if (newDeckBtn) {
  newDeckBtn.addEventListener("click", () => {
    console.log("New Deck button pressed");
  });
} else {
  console.error("Button with ID 'newDeckBtn' not found");
}

if (shuffleBtn) {
  shuffleBtn.addEventListener("click", () => {
    console.log("Shuffle button pressed");
  });
} else {
  console.error("Button with ID 'shuffleBtn' not found");
}

if (showDeckBtn) {
  showDeckBtn.addEventListener("click", () => {
    console.log("Show Deck button pressed");
  });
} else {
  console.error("Button with ID 'showDeckBtn' not found");
}

if (drawCardBtn) {
  drawCardBtn.addEventListener("click", () => {
    console.log("Draw Card button pressed");
  });
} else {
  console.error("Button with ID 'drawCardBtn' not found");
}
