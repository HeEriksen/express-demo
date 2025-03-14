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
  console.log("POST /api/workouts ble kalt med body:", req.body);
  try {
    const { pwa_id, workout } = req.body;

    if (!pwa_id) {
      return res
        .status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND)
        .json({ error: "pwa_id mangler" });
    }

    const workoutId = uuidv4();
    const newWorkout = new Workout(
      pwa_id,
      workoutId,
      new Date(),
      workout || []
    );
    const result = await newWorkout.create();

    if (result) {
      res.status(HTTP_CODES.SUCCESS.CREATED).json(result);
    } else {
      res
        .status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND)
        .json({ error: "Kunne ikke opprette treningsøkt" });
    }
  } catch (error) {
    next(error);
  }
});

workoutsRouter.put("/:id", async (req, res, next) => {
  try {
    const workoutId = req.params.id;
    const { pwa_id, workout } = req.body;

    const updatedWorkout = new Workout(
      pwa_id,
      workoutId,
      req.body.date ? new Date(req.body.date) : new Date(),
      workout || []
    );

    const result = await updatedWorkout.update();

    if (result) {
      res.status(HTTP_CODES.SUCCESS.OK).json(result);
    } else {
      res
        .status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND)
        .json({ error: "Kunne ikke oppdatere treningsøkt" });
    }
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
