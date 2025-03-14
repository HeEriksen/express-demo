import { addWorkout, updateWorkout } from "./apiHandler.mjs";

const CURRENT_WORKOUT = "CURRENT_WORKOUT";
const WorkoutManager = {};

let pwa_id = localStorage.getItem("pwa_id");
if (!pwa_id) {
  pwa_id = crypto.randomUUID();
  localStorage.setItem("pwa_id", pwa_id);
}

let currentWorkout = JSON.parse(localStorage.getItem(CURRENT_WORKOUT)) || {
  pwa_id,
  workout: [],
};

async function saveWorkout(workout) {
  try {
    let updatedWorkout;

    if (workout.id) {
      updatedWorkout = await updateWorkout(workout.id, workout);
    } else {
      updatedWorkout = await addWorkout(workout);
      workout.id = updatedWorkout.id;
    }

    localStorage.setItem(CURRENT_WORKOUT, JSON.stringify(updatedWorkout));
    return updatedWorkout;
  } catch (error) {
    console.error("Error saving workout:", error);
    localStorage.setItem(CURRENT_WORKOUT, JSON.stringify(workout));
    return workout;
  }
}

WorkoutManager.newWorkout = function () {
  currentWorkout = { pwa_id, workout: [] };
  localStorage.setItem(CURRENT_WORKOUT, JSON.stringify(currentWorkout));
};

WorkoutManager.add = function (name, reps, weight) {
  if (!currentWorkout) {
    console.error("Ingen gjeldende treningsøkt funnet.");
    return;
  }

  currentWorkout.workout.push({ name, reps, weight });
  saveWorkout(currentWorkout);
};

WorkoutManager.getAll = async function () {
  return await getAllWorkouts();
};
export default WorkoutManager;
