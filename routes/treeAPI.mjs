import express from 'express';
import { Tree, Node } from '../data/tree.mjs';
const treeRouter = express.Router();

const tree = Tree();
export default treeRouter;