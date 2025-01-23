import express from "express";
import HTTP_CODES from "./utils/httpCodes.mjs";
import { quotes, poem } from "./quotes_poem.mjs";
import { makeNewDeck, shuffleDeck } from "./cards.mjs";
import { v4 as uuidv4 } from "uuid";

const server = express();
const port = process.env.PORT || 8080;
const decks = {};

server.set("port", port);
server.use(express.static("public"));
server.use(express.json());

function getRoot(req, res, next) {
  res.status(HTTP_CODES.SUCCESS.OK).send("Hello World").end();
}

server.get("/", getRoot);
server.get("/tmp/poem", (req, res) => {
  res.send(poem);
});
server.get("/tmp/quote", (req, res) => {
  res.send(quotes[Math.floor(Math.random() * quotes.length)]);
});

server.post("/tmp/sum/:a/:b", (req, res) => {
  const a = parseInt(req.params.a);
  const b = parseInt(req.params.b);
  const sum = a + b;
  res.send(sum.toString());
});

server.post("/temp/deck", (req, res) => {
  const deck = makeNewDeck();
  decks[deck.id] = deck.cards;
  console.log("deck created:", deck);
  console.log("decks:", decks);
  res.send(deck);
});

server.patch("/temp/deck/shuffle/:deck_id", (req, res) => {
  const deckID = req.params.deck_id;
  console.log("shuffling deck with ID:", deckID);
  const cards = decks[deckID];
  if (!cards) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("No cards found");
  }
  const shuffledDeck = shuffleDeck(cards);
  res.send({ id: deckID, cards: shuffledDeck });
});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});
