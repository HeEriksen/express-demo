import express from "express";
import path from "path";
import HTTP_CODES from "./utils/httpCodes.mjs";
import { quotes, poem } from "./quotes_poem.mjs";
import { makeNewDeck, shuffleDeck, drawCard } from "./card_functions.mjs";

const server = express();
const port = process.env.PORT || 8080;
const __dirname = path.resolve();

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

const serveDrawCards = (req, res) => {
  res.sendFile(path.join(__dirname, "public", "drawCards.html"));
};

server.get("/temp/deck", serveDrawCards);

server.post("/temp/deck", (req, res) => {
  const deck = makeNewDeck();
  decks[deck.id] = deck.cards;
  res.send(deck);
});

server.patch("/temp/deck/shuffle/:deck_id", (req, res) => {
  const deckID = req.params.deck_id;
  const cards = decks[deckID];
  if (!cards) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("No cards found");
  }
  const shuffledDeck = shuffleDeck(cards);
  res.send({ id: deckID, cards: shuffledDeck });
});

server.get("/temp/deck/:deck_id", (req, res) => {
  const deckID = req.params.deck_id;
  const cards = decks[deckID];
  if (!cards) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("No cards found");
  }
  res.json(cards);
});

server.get("/temp/deck/:deck_id/card", (req, res) => {
  const deckID = req.params.deck_id;
  const cards = decks[deckID];
  const drawnCard = drawCard(cards);
  const img = drawnCard.value+"_of_"+drawnCard.suit+".png";

  if (!cards) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("No cards found");
  }
  res.send(drawnCard);
});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});
