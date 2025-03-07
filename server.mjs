import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import HTTP_CODES from "./utils/httpCodes.mjs";
import log from "./modules/log.mjs";
import { LOGG_LEVELS, eventLogger } from "./modules/log.mjs";
import abTest from "./modules/abTesting.mjs";
import workoutsRouter from "./routes/workoutsAPI.mjs";
// // import session from "./modules/sessions.mjs";

const ENABLE_LOGGING = false;

const server = express();
const port = process.env.PORT || 8080;
const __dirname = path.resolve();
const logger = log(LOGG_LEVELS.VERBOSE);

server.set("port", port);
server.use(cookieParser());
server.use(logger);
server.use(abTest);
server.use(express.static("public"));
server.use("/workouts/", workoutsRouter);

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
  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      next(err);
    } else {
      eventLogger("Noen spurte etter root");
    }
  });
}

server.get("/", getRoot);


server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});
