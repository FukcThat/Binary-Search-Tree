import Tree from "../Second Tree/Tree.mjs";

const newTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

newTree.prettyPrint();

newTree.insert(6);
newTree.insert(55);
newTree.find(23);
newTree.find(9);
newTree.find(55);
newTree.find(11);

newTree.prettyPrint();
