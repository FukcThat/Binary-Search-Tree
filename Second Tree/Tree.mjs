import Node from "./Node.mjs";

export default class Tree {
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
    return this.buildFromArray(array, 0, array.length - 1);
  };

  // Build Tree Helper
  buildFromArray = (array, start, end) => {
    // if the start for this function is greater than the end, stop
    if (start > end) return null;

    // Find center of array & make a new Node
    let centerIndex = Math.floor((start + end) / 2);
    const newNode = new Node(array[centerIndex]);

    // Recursively make new left & right nodes
    newNode.left = this.buildFromArray(array, start, centerIndex - 1);
    newNode.right = this.buildFromArray(array, centerIndex + 1, end);

    // return the newNode (which is the root for the build tree function)
    return newNode;
  };

  // Insert (value)
  insert = (value) => {
    // if there is no root, make one with the passed in value, then return
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    // Start comparing values by setting the root to our cuurentNode (the one we'll compare to the value)
    let currentNode = this.root;

    // While currentNode is not null (because if there's no left & right they'll be null and we stop)
    while (currentNode) {
      // if the value to insert is smaller than the currentNode's value, go left
      if (currentNode.value > value) {
        // if there is no left, set the currentNode's left to a new Node with the value there
        if (!currentNode.left) {
          currentNode.left = new Node(value);
        }
        currentNode = currentNode.left;
        // if the value to insert is larger than the root, go right
      } else if (currentNode.value < value) {
        // if there is no right, set the currentNode's right to a new Node with the value there
        if (!currentNode.right) {
          currentNode.right = new Node(value);
        }
        currentNode = currentNode.right;
      } else {
        // If neither of those apply, the value already exists and we return
        return;
      }
    }
  };

  // Find Item(value)
  find = (value) => {
    // Make a current Node to compare & start at root
    let currentNode = this.root;

    // while the currentNode is not null (a non-existent leaf), check if the value is the same, larger or smaller
    while (currentNode !== null) {
      if (currentNode.value === value) {
        console.log(currentNode, value);
        return currentNode;
      } else if (currentNode.value > value) {
        currentNode = currentNode.left;
      } else if (currentNode.value < value) {
        currentNode = currentNode.right;
      }
    }
    // If the value doesnt exist, return null
    console.log("Value does not exist.");
    return null;
  };

  // Delete Item(value)
  deleteNode = (value) => {
    this.root = this.delete(this.root, value);
  };

  // Deletion Helper (that does all the actual work)
  delete = (root, value) => {
    // if there is no root, there's nothing to delete
    if (!root) return;

    // if the value is smaller than the root value, set the root's left to recursively call delete on root's left with the value, same on the right
    if (value < root.value) {
      root.left = this.delete(root.left, value);
    } else if (value > root.value) {
      root.right = this.delete(root.right, value);
    } else {
      // if the root has no left, return the root's right and vice versa
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      // Find the largest value in the left subtree from our root
      let maxNode = this.findMaxNode(root.left);

      // Set root.value to maxNode's value
      root.value = maxNode.value;

      // recursively call delete on all the deleted nodes children
      root.left = this.delete(root.left, maxNode.value);
    }
    return root;
  };

  // Delete Helpter - Finds min. Node to replace deleted value with
  findMaxNode = (node) => {
    while (node.right) {
      node = node.right;
    }
    return node;
  };

  // Level Order
  levelOrder = (callback) => {
    // make sure there's a callback
    if (!callback) {
      throw new Error("Callback please");
    }

    // if there's no root, stop
    if (!this.root) return;

    // Make a result array & a queue
    const result = [];
    const q = [this.root];

    // while the queue isn't empty
    while (q.length) {
      // make a current variable for the first element in the q
      let firstInQ = q.shift();
      callback(firstInQ);

      // and push it to the result array
      result.push(firstInQ.value);

      // put it's children into the queue
      if (firstInQ.left) {
        q.push(firstInQ.left);
      }
      if (firstInQ.right) {
        q.push(firstInQ.right);
      }
    }
    // return the result array
    return result;
  };

  // In Order
  inOrderRec = (callback) => {
    // If there's no callback, throw error
    if (!callback) {
      throw new Error("Please provide a callback");
    }

    // If theres no root, stop.
    if (!this.root) return [];

    //Make a result array
    const result = [];

    // make a helper function to traverse left, center (root), right
    const traverseInOrder = (root) => {
      if (!root) return;
      traverseInOrder(root.left);
      callback(root.value);
      result.push(root);
      traverseInOrder(root.right);
    };
    // Recursively call the function passing in the root and return the result array
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

    //Make a result array
    const result = [];

    // Make a helper function to traverse the tree center, left, right
    const traversePreOrder = (node) => {
      if (!node) return;
      callback(node.value);
      result.push(node);
      traversePreOrder(node.left);
      traversePreOrder(node.right);
    };
    // Recursively call the function passing in the root and return the result array
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

    // Make result array
    const result = [];

    // Make helper function to traverse left, right, center
    const traversePostOrder = (node) => {
      if (!node) return;
      traversePostOrder(node.left);
      traversePostOrder(node.right);
      callback(node.value);
      result.push(node);
    };
    // Recursively call the function passing in the root and return the result array
    traversePostOrder(this.root);
    return result;
  };

  // Depth
  findDepth = (root, value) => {
    // If there's no root, return -1 as asked
    if (!root) return -1;

    // Make distance variable -1 for the logic
    let distance = -1;

    // if the root is what we're looking for OR the distance of the root's left or right recursively are 0 or more, return +1
    if (
      root.value === value ||
      (distance = this.findDepth(root.left, value)) >= 0 ||
      (distance = this.findDepth(root.right, value)) >= 0
    ) {
      return distance + 1;
    }
    // Otherwise return -1 (so just the distance as is)
    return distance;
  };

  // Height
  // Make a Util to do all the work
  findHeightUtil = (root, value) => {
    // if there's no passed in root, stop
    if (!root) return -1;

    // Make a variable for the left, right & total height
    // Set the left & right right to call this function recursively on the left and right respectively
    let leftHeight = this.findHeightUtil(root.left, value);
    let rightHeight = this.findHeightUtil(root.right, value);
    // Find the max. height of the left and right, then add 1
    let totalHeight = Math.max(leftHeight, rightHeight) + 1;

    // if the value we're looking at is the value we're looking for, return the totalHeight
    if (root.value === value) {
      return totalHeight;
    }

    // Otherwise return totalHeight which will be -1 unless the above if statements is true
    return totalHeight;
  };

  // Actual function for cleanliness
  findHeight = (root, value) => {
    // Make a height variable and set it equal to calling the Util
    let height = this.findHeightUtil(root, value);

    // If the node wasn't found, return -1 to avoid running the util at all
    if (height === -1) {
      console.log("Node not found");
    }

    // Otherwise return the height the util calculated
    console.log(height);
  };

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
