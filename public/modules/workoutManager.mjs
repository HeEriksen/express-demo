const CURRENT_WORKOUT = "CURRENT_WORKOUT";
const WorkoutManager = {};

import {
  runRequest,
  HTTP_METHODS,
  API_ENDPOINTS_TRAINING_SERVER,
} from "./apiHandler.mjs";

async function saveWorkout(workout) {
  const savedWorkout = await runRequest(
    API_ENDPOINTS_TRAINING_SERVER.AddWorkout,
    HTTP_METHODS.POST,
    workout
  );
  localStorage.setItem(CURRENT_WORKOUT, JSON.stringify(savedWorkout));
  return savedWorkout;
}

async function newWorkout() {
  return await saveWorkout({ workout: [] });
}

let currentWorkout = JSON.parse(localStorage.getItem(CURRENT_WORKOUT));
if (!currentWorkout) {
  currentWorkout = await newWorkout();
}

function addExerciseToWorkout(name, reps, weight) {
  let exercise = { name, reps, weight };
  currentWorkout.workout.push(exercise);
  saveWorkout(currentWorkout);
}

WorkoutManager.add = addExerciseToWorkout;
WorkoutManager.newWorkout = newWorkout;

export default WorkoutManager;
