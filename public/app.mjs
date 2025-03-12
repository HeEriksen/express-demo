import exerciseViewController from "./controller/exerciseView.mjs"


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").then(
      (registration) => {
        console.log("Service worker registration succeeded:", registration);
      },
      (error) => {
        console.error(`Service worker registration failed: ${error}`);
      },
    );
  } else {
    console.error("Service workers are not supported.");
  }
  
console.log(exerciseViewController);

document.body.append(exerciseViewController.view);