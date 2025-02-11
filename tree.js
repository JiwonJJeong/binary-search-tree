// binary search tree factory function

const Tree = function(dataArray){
    let root = buildTree(dataArray);

    // builds BST and returns root node
    const buildTree = function(array){ 
        array.sort();   // Array.prototype.sort() changes original array
        removeDuplicatesFromArray(array);
    }

    const removeDuplicatesFromArray = function(array){
        for (let i=1; i<array.length; i++){
            if (array[i] == array[i-1]){
                array.splice(i, 1);
                i--;
            }
        }
    }
}