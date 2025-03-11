import express from "express";
import HTTP_CODES from "../utils/httpCodes.mjs";
import { v4 as uuidv4 } from "uuid";
import Workout from "../data/workout.mjs";

const workoutsRouter = express.Router();

workoutsRouter.use(express.json());

workoutsRouter.get("/", async (req, res, next) => {
  try {
    const workouts = await new Workout().read();
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

workoutsRouter.post("/", async (req, res, next) => {
  try {
    const newWorkout = new Workout(
      null,
      uuidv4(),
      req.body.date,
      req.body.exercises || []
    );
    const createdWorkout = await newWorkout.create();
    res.status(HTTP_CODES.SUCCESS.CREATED).json(createdWorkout);
  } catch (error) {
    next(error);
  }
});

workoutsRouter.put("/:id", async (req, res, next) => {
  try {
    let workout = new Workout(null, req.params.id)
    workout = await workout.read();
    workout.date = req.body.date || workout.date;
    workout.workout = req.body.exercises || workout.workout;
    const updatedWorkout = await workout.update();
    res.json(updatedWorkout);
  } catch (error) {
    next(error);
  }
});

workoutsRouter.delete("/:id", async (req, res, next) => {
  try {
    const workout = new Workout(null, req.params.id);
    const result = await workout.purge();
    if (result === null) {
      res.json({ message: "Treningsøkt ble slettet" });
    } else {
      res
        .status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND)
        .json({ error: "Kunne ikke finne treningsøkten" });
    }
  } catch (error) {
    next(error);
  }
});

export default workoutsRouter;
