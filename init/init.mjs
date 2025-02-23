import { Node, Tree, saveTree } from "../data/tree.mjs";
import fs from "fs/promises";

//#region DUMMY data --------------------

export let treeData = await fs.readFile("./init/dummy/tree1.json", "utf-8");
console.log(treeData);

//#endregion

// Start server ----------
async function startServer() {
  const server = await import("../server.mjs");
}

startServer();
