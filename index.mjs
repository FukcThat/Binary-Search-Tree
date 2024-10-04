import Tree from "./Tree.mjs";

const firstTree = new Tree([1, 3, 5, 7, 14, 32, 56]);

firstTree.insertValue(22);
firstTree.prettyPrint();
firstTree.preOrderRec((val) => console.log(val));

// const levelOrderArray = [];

// firstTree.levelOrderRec((value) => {
//   levelOrderArray.push(value);
// });

// console.log(levelOrderArray);
