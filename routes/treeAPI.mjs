import express from "express";
import { Tree, Node, inflateTree } from "../data/tree.mjs";
import { treeData } from "../init/init.mjs";
const treeRouter = express.Router();

const tree = inflateTree(treeData);


treeRouter.use(express.json());

treeRouter.get("/", (req, res, next) => {

    res.json(tree);

});




export default treeRouter