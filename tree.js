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

  // traverses tree and calls callback function on each node
  // traverses breadth-first (use queues)
  const levelOrder = function(callback){
    if (typeof(callback) != "function"){
      console.error("A callback function parameter is required");
    }
    let queue = [root];
    while (queue.length != 0){
      let nextNode = queue.shift();
      callback(nextNode);
      if (nextNode.left != null){
        queue.push(nextNode.left);
      }
      if (nextNode.right != null){
        queue.push(nextNode.right);
      }
    }
  }

  // traverse tree depth-first inorder and calls callback on each node
  // inorder: <left><root><right> (uses stacks bc recursion)
  const inOrder = function(callback, stack = [this.root]){
    if (typeof(callback) != "function"){
      console.error("A callback function parameter is required");
    }
    let nextNode = stack.pop();
    if (nextNode.left != null){
      stack.push(nextNode.left);
      inOrder(callback, stack);
    }
    callback(nextNode);
    if (nextNode.right != null){
      stack.push(nextNode.right);
      inOrder(callback, stack);
    }
  }

  // traverse tree depth-first preorder and calls callback on each node
  // preOrder: <root><left><right>
  const preOrder = function(callback, stack = [this.root]){
    if (typeof(callback) != "function"){
      console.error("A callback function parameter is required");
    }
    let nextNode = stack.pop();
    callback(nextNode);
    if (nextNode.left != null){
      stack.push(nextNode.left);
      preOrder(callback, stack);
    }
    if (nextNode.right != null){
      stack.push(nextNode.right);
      preOrder(callback, stack);
    }
  }

  // traverse tree depth-first postorder and calls callback on each node
  // postOrder: <left><right><root>
  const postOrder = function(callback, stack = [this.root]){
    if (typeof(callback) != "function"){
      console.error("A callback function parameter is required");
    }
    let nextNode = stack.pop();
    if (nextNode.left != null){
      stack.push(nextNode.left);
      postOrder(callback, stack);
    }
    if (nextNode.right != null){
      stack.push(nextNode.right);
      postOrder(callback, stack);
    }
    callback(nextNode);
  }

  const depth = function(node){
    let counter = 0;
    let compareNode = root;
    while (compareNode != node){
      if (node.data < compareNode.data){
        if (compareNode.left != null){
          compareNode = compareNode.left;
          counter++;
        } else{
          console.error("Node not in tree");
        }
      }
      else if (node.data > compareNode.data){
        if (compareNode.right != null){
          compareNode = compareNode.right;
          counter++;
        } else{
          console.error("Node not in tree");
        }
      }
    }
    return counter;
  }

  return {
    buildTree,
    prettyPrint,
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    depth,
  };
};

export { Tree };
