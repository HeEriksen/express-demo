import express from "express";
import HTTP_CODES from "./utils/httpCodes.mjs";
import * as cards from "cards.mjs";

const server = express();
const port = process.env.PORT || 8080;
const quotes = [
    "Be yourself; everyone else is already taken.<br>- Oscar Wilde",
    "So many books, so little time<br>- Frank Zappa", 
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.<br>- Albert Einstein",
    "Be the change that you wish to see in the world.<br>- Mahatma Gandhi",
    "In three words I can sum up everything I've learned about life: it goes on.<br>- Robert Frost",
    "If you tell the truth, you don't have to remember anything.<br>- Mark Twain",
    "A room without books is like a body without a soul.<br>- Marcus Tullius Cicero",
    "You only live once, but if you do it right, once is enough.<br>- Mae West",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.<br>- Ralph Waldo Emerson",
    "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.<br>- Maya Angelou"];

const poem = `Lykke<br><br>
Hva lykke er?<br>
Gå på en gressgrodd setervei<br>
i tynne, tynne sommerklær,<br>
klø sine ferske myggstikk<br>
med doven ettertenksomhet<br>
og være ung og meget rik<br>
på uopplevet kjærlighet.<br>
Å få et florlett spindelvev<br>
som kjærtegn over munn og kinn<br>
og tenke litt på vær og vind.<br>
Be prestekravene om råd<br>
og kanskje ja – og kanskje nei –<br>
han elsker – elsker ikke meg.<br>

Men ennå ikke kjenne deg.<br>`;

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

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});
