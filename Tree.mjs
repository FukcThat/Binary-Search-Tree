import Node from "./Node.mjs";

// Tree class
export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // buildTree function
  buildTree = (array) => {
    // Sort Array
    array.sort((a, b) => {
      return a - b;
    });

    // Remove Duplicates
    let set = new Set(array);
    array = Array.from(set);

    // Recursively check left & right with helper function
    return this.buildTreeFromArray(array, 0, array.length - 1);
  };

  // BuildTreeFromArray Helper
  buildTreeFromArray = (array, start, end) => {
    if (start > end) return null;

    let centerIndex = Math.floor((start + end) / 2);
    const newNode = new Node(array[centerIndex]);

    newNode.left = this.buildTreeFromArray(array, start, centerIndex - 1);
    newNode.right = this.buildTreeFromArray(array, centerIndex + 1, end);

    return newNode;
  };

  // Inset (value)
  insertValue = (value) => {
    // start at root
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    let currentNode = this.root;

    while (currentNode) {
      if (currentNode.value < value) {
        // go right
        if (!currentNode.right) {
          currentNode.right = new Node(value);
          return;
        }

        currentNode = currentNode.right;
      } else if (currentNode.value > value) {
        if (!currentNode.left) {
          currentNode.left = new Node(value);
          return;
        }
        currentNode = currentNode.left;
        // go left
      } else {
        // it IS the value in which case we cannot add it so we can just return false
        return;
      }
    }
  };

  // Find Item(value)
  findItem = (value) => {
    // Start at root
    let currentNode = this.root;

    while (currentNode !== null) {
      // console.log("Current Node:", currentNode.value);
      if (currentNode.value === value) {
        // console.log("Found:", currentNode.value);
        return currentNode;
      } else if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      }
    }
    // console.log("Value not found:", value);
    return null;
  };

  // Delete Item(value)
  deleteItem = (value) => {};

  // Pretty print
  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node !== null) {
      console.log(prefix + (isLeft ? "├── " : "└── ") + node.value);
      this.prettyPrint(node.left, prefix + (isLeft ? "│   " : "    "), true);
      this.prettyPrint(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }
  };
}

// import Node from "./Node.mjs";

// export default class Tree {
//   constructor(array) {
//     this.root = this.buildTree(array);
//   }

//   buildTree = (array) => {
//     // Sort input array
//     array.sort((a, b) => {
//       return a - b;
//     });
//     // Set input array to set to remove duplicates, then turn it back into array for funtionality
//     let set = new Set(array);
//     array = Array.from(set);

//     // Call TreeFromSortedArray
//     return this.treeFromSortedAray(array, 0, array.length - 1);
//   };

//   // Helper Functions

//   treeFromSortedAray = (array, start, end) => {
//     // If start > end return null
//     if (start > end) return null;

//     // Get middle of array
//     let centerIndex = Math.floor((end + start) / 2);
//     const newNode = new Node(array[centerIndex]);

//     // Recursively get left & right
//     newNode.left = this.treeFromSortedAray(array, start, centerIndex - 1);
//     newNode.right = this.treeFromSortedAray(array, centerIndex + 1, end);
//     return newNode;
//   };

// Pretty print
// prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
//   if (node !== null) {
//     console.log(prefix + (isLeft ? "├── " : "└── ") + node.value);
//     this.prettyPrint(node.left, prefix + (isLeft ? "│   " : "    "), true);
//     this.prettyPrint(node.right, prefix + (isLeft ? "│   " : "    "), false);
//   }
// };
// }
