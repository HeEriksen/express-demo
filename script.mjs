import express from "express";
import HTTP_CODES from "./utils/httpCodes.mjs";
import { quotes, poem } from "./quotes_poem.mjs";
import { makeNewDeck, shuffleDeck } from "./cards.mjs";
import { v4 as uuidv4 } from "uuid"; 
// import * as cards from "./cards.mjs";

const server = express();
const port = process.env.PORT || 8080;

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
  res.send(deck);
});

server.patch("/temp/deck/shuffle/:deck_id", (req, res) => {
  const { cards } = req.body;
  if (!cards) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("No cards found");
  }
  const shuffledDeck = shuffleDeck(req.body.cards);
  res.send(shuffledDeck);
});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});
