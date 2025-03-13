const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
};

const isPROD = false;
const BASE_API_TEST = "http://localhost:8080/";
const BASE_API_PROD = "https://express-demo-b43z.onrender.com/";

const BASE_API = isPROD ? BASE_API_PROD : BASE_API_TEST;

const API_ENDPOINTS_TRAINING_SERVER = {
  GetWorkouts: `${BASE_API}api/workouts`,
  AddWorkout: `${BASE_API}api/workouts`,
  UpdateWorkout: (id) => `${BASE_API}api/workouts${id}`,
  DeleteWorkout: (id) => `${BASE_API}api/workouts${id}`,
};

async function getWorkouts(pwaID) {
  const workout = await runRequest(
    API_ENDPOINTS_TRAINING_SERVER.GetWorkouts(pwaID)
  );
}

async function addWorkout(workoutID) {
  const workout = await runRequest(
    API_ENDPOINTS_TRAINING_SERVER.AddWorkout(workoutID)
  );
}

async function updateWorkout(workoutID) {
  const workout = await runRequest(
    API_ENDPOINTS_TRAINING_SERVER.UpdateWorkout(workoutID)
  );
}

async function deleteWorkout(workoutID) {
  const workout = await runRequest(
    API_ENDPOINTS_TRAINING_SERVER.DeleteWorkout(workoutID)
  );
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
