import WorkoutManager from "./modules/workoutManager.mjs";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(
    (registration) => {
      console.log("Service worker registration succeeded:", registration);
    },
    (error) => {
      console.error(`Service worker registration failed: ${error}`);
    }
  );
} else {
  console.error("Service workers are not supported.");
}

const exerciseUI = document.getElementById("exercise");
const repetitionsUI = document.getElementById("repetitions");
const weightUI = document.getElementById("weight");
const addExerciseButton = document.getElementById("addExerciseBtn");
const newWorkoutButton = document.getElementById("newWorkoutBtn");

newWorkoutButton.onclick = (evt) => {
  WorkoutManager.newWorkout();
};

addExerciseButton.onclick = (evt) => {
  let exerciseName =
    exerciseUI.selectedOptions[0].getAttribute("data-exercise");
  let repetitions = repetitionsUI.value;
  let weight = weightUI.value;

  WorkoutManager.add(exerciseName, repetitions, weight);
};
