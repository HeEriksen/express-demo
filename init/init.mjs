import { Node, Tree } from "../data/tree.mjs";

//#region DUMMY data ------------------------------------
const a1 = Node("A1", []);
const a2 = Node("A2", []);
const a = Node("A", a1, a2);


const b1 = Node("B1", []);
const b2 = Node("B2", []);
const b = Node("B", b1, b2);

const root = Node("data", a, b);
const tree = Tree(root);

console.log(saveTree(root));
//#endregion 


// Start server ----------------------------------------
const server = await import("../server.mjs");