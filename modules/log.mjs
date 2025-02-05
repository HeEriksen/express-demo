import { text } from "express";
import fs from "node:fs/promises";

let level_id = 0;
export const LOGG_LEVELS = {
  VERBOSE: ++level_id,
  IMPORTANT: ++level_id,
  ALWAYS: ++level_id,
};

let currentGlobalLogLevel = LOGG_LEVELS.VERBOSE;

let logInstance = async (req, res, next) => {
  await logVerbose(req, res), 
  await logImportant(req, res), 
  await logAlways(req, res);
  next();
};

const log = function (logLevel) {
  currentGlobalLogLevel = logLevel;
  return logInstance;
};

const colorize = (text) => {
  const colors = {
    red: `\x1b[1;31m`,
    green: `\x1b[1;32m`,
    yellow: `\x1b[1;33m`,
  };
  const methods = {
    GET: colors.green,
    POST: colors.red,
    PUT: colors.red,
    PATCH: colors.yellow,
  };
  return `${methods[text]}${text}`;
};

const logVerbose = async (req, res, next) => {
  if (LOGG_LEVELS.VERBOSE == currentGlobalLogLevel) {
    await printLog(req, res);
  }
};

const logImportant = async (req, res, next) => {
  if (LOGG_LEVELS.IMPORTANT == currentGlobalLogLevel) {
    await printLog(req, res);
  }
};

const logAlways = async (req, res, next) => {
  if (LOGG_LEVELS.ALWAYS == currentGlobalLogLevel) {
    await printLog(req, res);
  }
};

const printLog = async (req, res) => {
  let logStatement = `${Date.now()}|${colorize(req.method)}|${req.url}`;
  console.log(logStatement);
  await saveLog(logStatement);
};

const saveLog = async (text) => {
  await fs.appendFile("./logs/log.cvs", text);
};
export default log;
