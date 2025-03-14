import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import log from "./modules/log.mjs";
import { LOGG_LEVELS, eventLogger } from "./modules/log.mjs";
import abTest from "./modules/abTesting.mjs";
import workoutsRouter from "./routes/workoutsAPI.mjs";

const ENABLE_LOGGING = false;

const server = express();
const port = process.env.PORT || 8080;
const __dirname = path.resolve();
const logger = log(LOGG_LEVELS.VERBOSE);

server.set("port", port);
server.use(cookieParser());
server.use(express.json());
server.use(logger);
server.use(abTest);

server.use("/api/workouts", workoutsRouter);
server.use(express.static("public"));

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});
