import express from "express";
import HTTP_CODES from "./utils/httpCodes.mjs";

const server = express();
const port = process.env.PORT || 8080;
const quotes = []
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

function getRoot(req, res, next) {
  res.status(HTTP_CODES.SUCCESS.OK).send("Hello World").end();
}

server.get("/", getRoot);
server.get("/tmp/poem", (req, res) => {
  res.send(poem);
});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});
