import Tree from "./Tree.mjs";

const firstTree = new Tree([1, 3, 5, 7, 14, 32, 56]);

firstTree.prettyPrint();
firstTree.insertValue(2);
firstTree.insertValue(22);
firstTree.prettyPrint();
