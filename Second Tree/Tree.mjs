import Node from "./Node.mjs";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // Build Tree
  buildTree = (array) => {
    // Sort Array
    array.sort((a, b) => {
      return a - b;
    });

    // Remove duplicates from Array
    let removeDuplicatesSet = new Set(array);
    array = Array.from(removeDuplicatesSet);

    // Recursively go left and right respectively (helper)
    this.buildFromArray(array, 0, array.length - 1);
  };

  // Build Tree Helper
  buildFromArray = (array, start, end) => {
    // if the start for this function is greater than the end, stop
    if (start > end) return null;

    // Find center of array & make a new Node
    let centerIndex = Math.floor((start - end) / 2);
    const newNode = new Node(array[centerIndex]);

    // Recursively make new left & right nodes
    newNode.left = this.buildFromArray(array, start, centerIndex);
    newNode.left = this.buildFromArray(array, centerIndex.end);

    // return the newNode (which is the root for the build tree function)
    return newNode;
  };

  // Insert (value)

  // Find Item(value)

  // Delete Item(value)

  // Find min. Node

  // Level Order

  // In Order

  // Pre Order

  // Post Order

  // Depth

  // Height

  // Is Balances

  // Rebalance

  // Pretty Print
  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node !== null) {
      console.log(prefix + (isLeft ? "├── " : "└── ") + node.value);
      this.prettyPrint(node.left, prefix + (isLeft ? "│   " : "    "), true);
      this.prettyPrint(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }
  };
}
