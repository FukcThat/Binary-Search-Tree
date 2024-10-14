import Tree from "./Tree.mjs";

const firstTree = new Tree([1, 3, 5, 7, 14, 32, 56]);
firstTree.prettyPrint();

firstTree.insertValue(20);

firstTree.insertValue(21);

firstTree.insertValue(22);
firstTree.insertValue(23);

firstTree.insertValue(2);

firstTree.insertValue(100);
firstTree.insertValue(6);

firstTree.insertValue(15);

firstTree.insertValue(16);
firstTree.insertValue(39);

firstTree.prettyPrint();

// firstTree.postOrderRec((val) => console.log(val));

// const levelOrderArray = [];

// firstTree.levelOrderRec((value) => {
//   levelOrderArray.push(value);
// });

// console.log(levelOrderArray);
