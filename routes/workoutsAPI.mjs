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
    const { id, date, exercises } = req.body;
    let workout;
    let statusCode = HTTP_CODES.SUCCESS.OK;

    if (id) {
      workout = new Workout(null, id);
      try {
        workout = await workout.read();
        workout.date = date || workout.date;
        workout.workout = exercises || workout.workout;
        workout = await workout.update();
      } catch (error) {
        return res
          .status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND)
          .json({ error: `Workout with id ${id} not found` });
      }
    } else {
      const pwa_id = uuidv4();
      workout = new Workout(
        pwa_id,
        null,
        date || new Date(),
        exercises || []
      );
    
      workout = await workout.create();
          statusCode = HTTP_CODES.SUCCESS.CREATED;
        }
        res.status(statusCode).json(workout);
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
