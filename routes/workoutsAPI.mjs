import express from "express";
const workoutsRouter = express.Router();


workoutsRouter.use(express.json());

workoutsRouter.get("/", (req, res, next) => {

});

workoutsRouter.post("/", (req, res, next) => {
});

workoutsRouter.put("/", (req, res, next) => {
});

workoutsRouter.delete("/", (req, res, next) => {
});

export default workoutsRouter;
