const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
};

const isPROD = true;
const BASE_API_TEST = "http://localhost:8080/";
const BASE_API_PROD = "https://express-demo-b43z.onrender.com/";

const BASE_API = isPROD ? BASE_API_PROD : BASE_API_TEST;

const API_ENDPOINTS_TRAINING_SERVER = {
  GetWorkouts: `${BASE_API}api/workouts`,
  CreateWorkout: `${BASE_API}api/workouts`,
  UpdateWorkout: (id) => `${BASE_API}api/workouts/${id}`,
  DeleteWorkout: (id) => `${BASE_API}api/workouts/${id}`,
};

async function getWorkouts(pwaID) {
  const workout = await runRequest(
    API_ENDPOINTS_TRAINING_SERVER.GetWorkouts(pwaID)
  );
}

async function addWorkout(workout) {
  const updatedWorkout = await runRequest(
    API_ENDPOINTS_TRAINING_SERVER.CreateWorkout,
    HTTP_METHODS.POST,
    workout
  );
  return updatedWorkout;
}

async function updateWorkout(workoutID, updatedWorkoutData) {
  const updatedWorkout = await runRequest(
    API_ENDPOINTS_TRAINING_SERVER.UpdateWorkout(workoutID),
    HTTP_METHODS.PUT,
    updatedWorkoutData
  );
  return updatedWorkout;
}

async function deleteWorkout(workoutID) {
  const result = await runRequest(
    API_ENDPOINTS_TRAINING_SERVER.DeleteWorkout(workoutID),
    HTTP_METHODS.DELETE
  );
  return result;
}

async function runRequest(path, method = HTTP_METHODS.GET, data = null) {
  const request = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (
    [HTTP_METHODS.POST, HTTP_METHODS.PATCH, HTTP_METHODS.PUT].includes(method)
  ) {
    request.body = JSON.stringify(data);
  }

  const response = await fetch(path, request);

  return await response.json();
}

console.log(`API is running ${isPROD ? "PROD" : "Test"} `);

export {
  HTTP_METHODS,
  API_ENDPOINTS_TRAINING_SERVER,
  getWorkouts,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  runRequest,
};
