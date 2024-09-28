import Tree from "./Tree.mjs";

const firstTree = new Tree([1, 3, 5, 7, 14, 32, 56]);

firstTree.insertValue(firstTree.root, 22);
firstTree.prettyPrint();
