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

  // Inset(value)
  insertValue = (root, value) => {
    // Make current Node the root
    if (root === null) return new Node(value);

    // If the root exists and the value is our value, just return that I guess
    if (root.value === value) return root;

    // Recursively compare value to insert with current Node
    if (value < root.value) {
      // --> Go left if value is smaller
      root.left = insert(root.left, value);
    } else if (value > root.value) {
      // --> Go right if value is larger
      root.right = insert(root.right, value);
    }
    return root;
  };

  // deleteItem(value)

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
