import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import HTTP_CODES from "./utils/httpCodes.mjs";
import { quotes, poem } from "./modules/quotes_poem.mjs";
import { makeNewDeck, shuffleDeck, drawCard } from "./modules/cardDecks.mjs";
import log from "./modules/log.mjs";
import { LOGG_LEVELS, eventLogger } from "./modules/log.mjs";
import abTest from "./modules/abTesting.mjs";
import treeRouter from './routes/treeAPI.mjs';
import questLogRouter from './routes/questLogAPI.mjs';
import userRouter from './routes/userAPI.mjs';
// // import session from "./modules/sessions.mjs";

const ENABLE_LOGGING = false;

const server = express();
const port = process.env.PORT || 8080;
const __dirname = path.resolve();
const logger = log(LOGG_LEVELS.VERBOSE);

const decks = {};

server.set("port", port);
server.use(cookieParser());
server.use(logger);
server.use(abTest);
server.use(express.static("public"));
server.use("/tree/", treeRouter);
server.use("/quest/", questLogRouter);
server.use("/user/", userRouter);

// TODO: flytt ab-test relaterte funksjoner ut i modul-mappe der det er mulig

// function getRootA(req, res, next) {
//   if (req.abVariant === "A") {
//     eventLogger(
//       "Noen spurte etter root|Brukeren fikk variant: " + req.abVariant
//     );
//     res.status(HTTP_CODES.SUCCESS.OK).send("Hello World").end();
//   } else {console.log(abVariant);}
// }

// function getRootB(req, res, next) {
//   if (req.abVariant === "B") {
//     eventLogger(
//       "Noen spurte etter root|Brukeren fikk variant: " + req.abVariant
//     );
//     res.status(HTTP_CODES.SUCCESS.OK).send("Hello Universe").end();
//   } else {console.log(abVariant);}
// }

// function ABTestTarget(config) {
//   return (req, res, next) => {
//     config[req.abVariant]();
//   };
// }


// server.get("/", ABTestTarget({ A: getRootA, B: getRootB }));

function getRoot(req, res, next) {
  eventLogger("Noen spurte etter root");
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
  const img = drawnCard.value + "_of_" + drawnCard.suit + ".png";

  if (!cards) {
    return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("No cards found");
  }
  res.send(drawnCard);
});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});
