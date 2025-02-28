const viewContainer = document.getElementById("viewContainer");
let currentDeckId = null;

document.getElementById("newDeckBtn").onclick = async () => {
  let url = "/temp/deck";
  let resp = await fetch(url, { method: "POST" });

  if (resp.ok) {
    let data = await resp.json();
    console.log(data);
    currentDeckId = data.id;
    viewContainer.innerHTML = "<p>You created a new deck!</p>";
  } else {
    console.error(`HTTP error! status: ${resp.status}`);
    viewContainer.innerHTML =
      "<p>Error creating a new deck. Please try again.</p>";
  }
};

document.getElementById("shuffleBtn").onclick = async () => {
  let url = `/temp/deck/shuffle/${currentDeckId}`;
  let resp = await fetch(url, { method: "PATCH" });

  if (resp.ok) {
    let data = await resp.json();
    console.log(data);
    viewContainer.innerHTML = "<p>Deck has been shuffled!<p>";
  } else {
    console.error(`HTTP error! status: ${resp.status}`);
    viewContainer.innerHTML =
      "<p>Sorry! We could not find and shuffle your deck.</p>";
  }
};

document.getElementById("showDeckBtn").onclick = async () => {
  let url = `/temp/deck/${currentDeckId}`;
  let resp = await fetch(url, { method: "GET" });

  if (resp.ok) {
    let data = await resp.json();
    console.log(data);
    viewContainer.innerHTML = `<p>The cards left in your deck:</p>
      <ul>${data
        .map((card) => `<li>${card.value} of ${card.suit}</li>`)
        .join("")}</ul> `;
  } else {
    console.error(`HTTP error! status: ${resp.status}`);
    viewContainer.innerHTML =
      "<p>Sorry! We could not find and show your deck.</p>";
  }
};

document.getElementById("drawCardBtn").onclick = async () => {
  let url = `/temp/deck/${currentDeckId}/card`;
  let resp = await fetch(url, { method: "GET" });

  if (resp.ok) {
    let data = await resp.json();
    console.log(data);
    viewContainer.innerHTML = `<p>You drew the ${data.value} of ${data.suit}</p><br>
      <img src="/img/${data.value}_of_${data.suit}.png" alt="${data.value} of ${data.suit}">`;
  } else {
    console.error(`HTTP error! status: ${resp.status}`);
    viewContainer.innerHTML =
      "<p>Sorry! We could not find and draw a card from your deck.</p>";
  }
};
