// node factory function

const Node = function(data, left = null, right = null){
    return {
        data,
        left,
        right,
    }
}

export {Node};