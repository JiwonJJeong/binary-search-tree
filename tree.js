// binary search tree factory function

const Tree = function (dataArray) {
  let root;
  // builds BST and returns root node
  const buildTree = function (array) {
    array.sort(); // Array.prototype.sort() changes original array
    removeDuplicatesFromArray(array);
    root = arrayToTreeRecursive(array);
    return root;
  };

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
    let rootNode = new Node(array[Math.floor(array.length / 2)]);
    // build left tree
    let leftArray = array[(0, rootIndex)];
    rootNode.left = arrayToTreeRecursive(leftArray);
    // build right tree
    let rightArray = array[(rootIndex + 1, array.length)];
    rootNode.right = arrayToTreeRecursive(rightArray);
    return rootNode;
  };

  const prettyPrint = (node, prefix = "", isLeft = true) => {
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

  return {
    buildTree,
    prettyPrint,
  };
};

export { Tree };
