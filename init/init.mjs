import { Node, Tree, saveTree } from "../data/tree.mjs"
import fs from "fs/promises"

//#region DUMMY data --------------------

const a1 = Node("A1", []);
const a2 = Node("A2", []);
const a = Node("A", a1, a2);


const b1 = Node("B1", []);
const b2 = Node("B2", []);
const b = Node("B", b1, b2);

const root = Node("data", a, b);
export const tree = Tree(root);

console.log(saveTree(root));

// let treeData = await fs.readFile("./init/dummy/tree1.json");
// console.log(treeData);


//#endregion


// Start server ----------
const server = await import("../server.mjs")