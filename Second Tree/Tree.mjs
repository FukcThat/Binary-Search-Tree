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
