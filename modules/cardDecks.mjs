import { v4 as uuidv4 } from "uuid";

function makeNewDeck() {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace",
  ];

  const deck = suits.flatMap((suit) =>
    values.map((value) => ({ value, suit }))
  );
  const deckWithID = { id: uuidv4(), cards: deck};
  console.log(deckWithID);
  return deckWithID;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  console.log(deck);
  return deck;
}

function drawCard(deck) {
  if (deck.length === 0) {
    return "No cards left in the deck";
  }
  const randomIndex = Math.floor(Math.random() * deck.length);
  const drawnCard = deck.splice(randomIndex, 1)[0];
  return drawnCard;
}

export { makeNewDeck, shuffleDeck, drawCard };