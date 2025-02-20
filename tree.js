// binary search tree factory function
import { Node } from "./node.js";

const Tree = function (dataArray) {
  let root;

  const removeDuplicatesFromArray = function (array) {
    for (let i = 1; i < array.length; i++) {
      if (array[i] == array[i - 1]) {
        array.splice(i, 1);
        i--;
      }
    }
  };

  // returns root node from array containing rest of child tree
  const arrayToTreeRecursive = function (array) {
    if (array.length == 0) {
      return null;
    }
    if (array.length == 1) {
      return new Node(array[0], null, null);
    }
    const rootIndex = Math.floor(array.length / 2); // rootNode at middle of array, rounded up for even length
    let rootNode = new Node(array[rootIndex]);
    // build left tree
    let leftArray = array.slice(0, rootIndex);
    rootNode.left = arrayToTreeRecursive(leftArray);
    // build right tree
    let rightArray = array.slice(rootIndex + 1, array.length);
    rootNode.right = arrayToTreeRecursive(rightArray);
    return rootNode;
  };

  // builds BST and returns root node
  const buildTree = function (array = dataArray) {
    let arrayCopy = array;
    arrayCopy.sort(function(a, b){return a-b}); // sorts array numerically
    removeDuplicatesFromArray(arrayCopy);
    root = arrayToTreeRecursive(arrayCopy);
    return root;
  }(); // IIFE (will execute on new Tree)

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const insert = function(value){
    let compareNode = root;
    while (compareNode.data != value){
      if (value < compareNode.data){
        if (compareNode.left === null){
          compareNode.left = new Node(value);
          return;
        }
        compareNode = compareNode.left;
      } else {
        if (compareNode.right === null){
          compareNode.right = new Node(value);
          return;
        }
        compareNode = compareNode.right;
      }
    }
    console.error("Caanot insert existing value");
  }

  // recursively searches tree and returns (modified) root (rebuilding it along the way)
  const deleteItem = function(value, root = this.root){
    if (root === null){
      return root;
    }
    if (value < root.data){
      root.left = deleteItem(value, root.left);
    } else if (value > root.data){
      root.right = deleteItem(value, root.right);
    } else{
      // here root.data == value
      if (root.left == null && root.right ==null){
        // the node to remove has 0 children
        return null;
      } else if (root.left == null){
        // node to remove has right subtree
        return root.right;
      } else if (root.right == null){
        // node to remove has left subtree
        return root.left;
      } else{
        // node to remove has 2 children
        let nextSuccessor = root.right; // should be set to min value of right subtree
        while (nextSuccessor.left != null){
          nextSuccessor = nextSuccessor.left;
        }
        // then replace root's data with successor data
        root.data = nextSuccessor.data;
        // and remove old nextSuccessor
        root.right = deleteItem(nextSuccessor.data, root.right);
      }
    }
    return root;
  }

  const find = function(value){
    let node = root;
    while (node.data != value){
      if (value < node.data){
        node = node.left;
      } else{
        node = node.right;
      }
    }
    return node;
  }

  return {
    buildTree,
    prettyPrint,
    root,
    insert,
    deleteItem,
    find,
  };
};

export { Tree };
