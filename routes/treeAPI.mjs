import express from "express";
import { Tree, Node, inflateTree } from "../data/tree.mjs";
import { treeData } from "../init/init.mjs";
const treeRouter = express.Router();

const tree = inflateTree(treeData);

treeRouter.use(express.json());

treeRouter.get("/", (req, res, next) => {
  if (tree) {
    res.json(tree);
  } else {
    console.error("Tree not initialized");
  }
});

treeRouter.post("/", (req, res, next) => {
  res.send("add a node to the tree");
  //TODO: write code to add a node to the tree
});

treeRouter.put("/", (req, res, next) => {
  res.send("update a node in the tree");
  //TODO: write code to update a node in the tree
});

treeRouter.delete("/", (req, res, next) => {
  res.send("delete a node from the tree");
  //TODO: write code to delete a node from the tree
});

export default treeRouter;
