import { v4 as uuidv4 } from "uuid";

function makeNewDeck() {
  const suits = ["hjerter", "ruter", "kløver", "spar"];
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
    "J",
    "Q",
    "K",
    "A",
  ];

  const deck = suits.flatMap((suit) =>
    values.map((value) => ({ value, suit }))
  );
  const deckWithID = { id: uuidv4(), cards: deck };
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

export { makeNewDeck, shuffleDeck };
