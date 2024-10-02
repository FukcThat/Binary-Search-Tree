import Tree from "./Tree.mjs";

const firstTree = new Tree([1, 3, 5, 7, 14, 32, 56]);

const found = firstTree.findItem(3);
firstTree.insertValue(22);
console.log(found);
firstTree.prettyPrint();
firstTree.delete(7);
firstTree.prettyPrint();

const levelOrderArray = [];

firstTree.levelOrderRec((value) => {
  levelOrderArray.push(value);
});

console.log(levelOrderArray);
