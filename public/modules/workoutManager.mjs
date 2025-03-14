import { addWorkout, updateWorkout } from "./apiHandler.mjs";

const CURRENT_WORKOUT = "CURRENT_WORKOUT";
const WorkoutManager = {};

let pwa_id = localStorage.getItem("pwa_id");
if (!pwa_id) {
  pwa_id = crypto.randomUUID();
  localStorage.setItem("pwa_id", pwa_id);
}

let currentWorkout = JSON.parse(localStorage.getItem(CURRENT_WORKOUT));

if (!currentWorkout) {
  currentWorkout = await newWorkout();
}

async function saveWorkout(workout) {
  try {
    let updatedWorkout;
    if (workout.id) {
      updatedWorkout = await updateWorkout(workout.id, workout);
    } else {
      updatedWorkout = await addWorkout(workout);
    }
    localStorage.setItem(CURRENT_WORKOUT, JSON.stringify(updatedWorkout));
    return updatedWorkout;
  } catch (error) {
    console.error("Error saving workout:", error);
    localStorage.setItem(CURRENT_WORKOUT, JSON.stringify(workout));
    return workout;
  }
}

async function newWorkout() {
  const workout = { pwa_id, workout: [] };
  return await saveWorkout(workout);
}

function addExerciseToWorkout(name, reps, weight) {
  if (!currentWorkout) {
    console.error("Ingen gjeldende treningsøkt funnet.");
    return;
  }

  if (!Array.isArray(currentWorkout.workout)) {
    currentWorkout.workout = [];
  }
  
  currentWorkout.workout.push({ name, reps, weight });
  currentWorkout.pwa_id = pwa_id;
  saveWorkout(currentWorkout);
}

WorkoutManager.add = addExerciseToWorkout;
WorkoutManager.newWorkout = newWorkout;

export default WorkoutManager;
