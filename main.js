// test functions here
import { Tree } from "./tree.js";

const printNodeData = function(node){
    console.log(`${node.data} `);
}

const testTree = new Tree([5, 4, 2, 3, 7, 8, 32, 6, 124, 0])

testTree.prettyPrint();

testTree.insert(3);
testTree.insert(2.5);
testTree.insert(4347);
testTree.prettyPrint();

testTree.deleteItem(6); 
testTree.deleteItem(32);
testTree.deleteItem(5);
testTree.deleteItem(124);
testTree.prettyPrint();

console.log(testTree.find(3));

testTree.levelOrder(printNodeData); // 7 3 4347 2 4 8 0 2.5