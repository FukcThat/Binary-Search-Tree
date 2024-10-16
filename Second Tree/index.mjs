import Tree from "../Second Tree/Tree.mjs";

const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

newTree.prettyPrint();

newTree.deleteNode(23);

newTree.prettyPrint();
