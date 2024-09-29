import Tree from "./Tree.mjs";

const firstTree = new Tree([1, 3, 5, 7, 14, 32, 56]);

const found = firstTree.findItem(3);
console.log(found);
firstTree.prettyPrint();
