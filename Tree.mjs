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

  // Delete I guess
  delete = (value) => {
    this.root = this.deleteItem(this.root, value);
  };

  // Delete Item(value)
  deleteItem = (root, value) => {
    if (!root) return;

    if (value < root.value) {
      root.left = this.deleteItem(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteItem(root.right, value);
    } else {
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      const minNode = this.findMinNode(root.right);
      root.value = minNode.value;
      root.right = this.deleteItem(root.right, minNode.value);
    }

    return root;
  };

  // Find Min. Node
  findMinNode = (node) => {
    while (node.left) {
      node = node.left;
    }
    return node;
  };

  // Level Order
  levelOrder = (callback) => {
    // If there's no callback, throw error
    if (!callback) {
      throw new Error("Please provide a callback");
    }

    // If theres no root, stop.
    if (!this.root) return [];

    // Make a queue and a result array to store the nodes in
    const result = [];
    const q = [this.root];

    //
    while (q.length) {
      let currentNode = q.shift();
      callback(currentNode.value);

      result.push(currentNode.value);
      if (currentNode.left) {
        q.push(currentNode.left);
      }
      if (currentNode.right) {
        q.push(currentNode.right);
      }
    }
    return result;
  };

  // Level Order - Recursive
  levelOrderRec = (callback) => {
    // If there's no callback, throw error
    if (!callback) {
      throw new Error("Please provide a callback");
    }

    // If theres no root, stop.
    if (!this.root) return [];

    const result = [];
    const q = [this.root];

    const traverse = () => {
      if (q.length === 0) return;
      const currentNode = q.shift();

      callback(currentNode.value);
      result.push(currentNode.value);

      if (currentNode.left) {
        q.push(currentNode.left);
      }
      if (currentNode.right) {
        q.push(currentNode.right);
      }
      traverse();
    };
    traverse();

    return result;
  };

  // In Order - Recursive
  inOrderRec = (callback) => {
    // If there's no callback, throw error
    if (!callback) {
      throw new Error("Please provide a callback");
    }

    // If theres no root, stop.
    if (!this.root) return [];

    //
    const result = [];

    const traverseInOrder = (root) => {
      if (!root) return;
      traverseInOrder(root.left);
      callback(root.value);
      result.push(root);
      traverseInOrder(root.right);
    };
    traverseInOrder(this.root);
    return result;
  };

  // Pre Order
  preOrderRec = (callback) => {
    // If there's no callback, throw error
    if (!callback) {
      throw new Error("Please provide a callback");
    }

    // If theres no root, stop.
    if (!this.root) return [];

    //
    const result = [];

    const traversePreOrder = (node) => {
      if (!node) return;
      callback(node.value);
      result.push(node);
      traversePreOrder(node.left);
      traversePreOrder(node.right);
    };
    traversePreOrder(this.root);
    return result;
  };

  // Post Order
  postOrderRec = (callback) => {
    // If there's no callback, throw error
    if (!callback) {
      throw new Error("Please provide a callback");
    }

    // If theres no root, stop.
    if (!this.root) return [];

    //
    const result = [];

    const traversePostOrder = (node) => {
      if (!node) return;
      traversePostOrder(node.left);
      traversePostOrder(node.right);
      callback(node.value);
      result.push(node);
    };
    traversePostOrder(this.root);
    return result;
  };

  // Depth
  findDepth = (root, value) => {
    // If there's no root just stop
    if (!this.root) return -1;

    // Make distance variable 1 for the logic
    let distance = -1;

    // if the root is what we're looking for OR the distance of the root's left or right recursively are, return +1
    if (
      root.value === value ||
      (distance = this.findDepth(root.left, value)) >= 0 ||
      (distance = this.findDepth(root.right, value)) >= 0
    ) {
      return distance + 1;
    }
    // Otherwise return -1 (so just the distance as is)
    return dist;
  };

  // Height
  findHeight = (root, value) => {
    if (!this.root) return -1;

    let leftHeight = this.findHeight(root.left, value);
    let rightHeight = this.findHeight(root.right, value);
    let totalHeight = Math.max(leftHeight, rightHeight) + 1;

    if (root.value === value) {
      height = totalHeight;
    }

    return height;
  };

  // Is Balanced stuff
  treeHeight = (root) => {
    if (!this.root) return 0;
    return Math.max(treeHeight(root.left), this.treeHeight(root.right)) + 1;
  };

  isBalanced = (root) => {
    if (!this.root) return true;

    let leftTreeHeight = this.treeHeight(root.left);
    let rightTreeHeight = this.treeHeight(root.right);

    if (
      Math.abs(leftTreeHeight - rightTreeHeight) <= 1 &&
      this.isBalanced(root.left == true) &&
      this.isBalanced(root.right) == true
    ) {
      return true;
    }
    return false;
  };

  // Pretty print
  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node !== null) {
      console.log(prefix + (isLeft ? "├── " : "└── ") + node.value);
      this.prettyPrint(node.left, prefix + (isLeft ? "│   " : "    "), true);
      this.prettyPrint(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }
  };
}
