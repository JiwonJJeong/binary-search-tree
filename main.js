// test functions here
import { Tree } from "./tree.js";



const testTree = new Tree([5, 4, 2, 3, 7, 8, 32, 6, 124, 0])

testTree.prettyPrint();

testTree.insert(3);
testTree.insert(2.5);
testTree.insert(4347);

testTree.prettyPrint();
console.log(testTree.root);