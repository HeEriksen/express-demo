import express from "express";
import HTTP_CODES from "../utils/httpCodes.mjs";
import { v4 as uuidv4 } from "uuid";
const workoutsRouter = express.Router();
let workouts = [];

workoutsRouter.use(express.json());

workoutsRouter.get("/", (req, res, next) => res.json(workouts));

workoutsRouter.post("/", (req, res, next) => {
  const newWorkout = { id: uuidv4(), date: req.body.date, exercises: [] };
  workouts.push(newWorkout);
  res.status(HTTP_CODES.SUCCESS.CREATED).json(newWorkout);
});

workoutsRouter.put("/", (req, res, next) => {});

workoutsRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  const originalArrayLength = workouts.length;

  workouts = workouts.filter(workout => workout.id !== id);
  if (workouts.length < originalArrayLength) {
    res.json({ message: "Treningsøkt ble slettet" });
  } else {
    res
      .status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND)
      .json({ error: "Kunne ikke finne treningsøkt" });
  }
});

export default workoutsRouter;
