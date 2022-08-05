/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/** 1.先遍历一遍二叉树计算出最大深度  2.在遍历一边二叉树，第一次到达最大深度节点 即最底层、最左边
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function(root) {
    let leftLow ,
        maxDepth = getMaxDepth(root) ;
    helpFn(root,1) ;
    function getMaxDepth (node) {
        if (node===null) {
            return 0 ;
        }
        return Math.max(getMaxDepth(node.left),getMaxDepth(node.right)) + 1 ;
    }
    function helpFn(node,depth) {
        if (node == null)
            return ;

        if (depth == maxDepth) //这里变成了最后一次到达最大深度 要保证左边后遍历，那就用后序遍历
            leftLow = node.val ;
        helpFn(node.right,depth +1) ;
        helpFn(node.left,depth +1) ; //隐藏了回溯
        return ;
    }
    return leftLow ;

    // let maxLeft = -1 , maxDepth = Number.MIN_SAFE_INTEGER ;
    // function traver (node, depth) {
    //     if (node==null)
    //         return ;
    //     if (node.left==null&&node.right==null) {
    //         if (maxDepth < depth) {
    //             maxDepth = depth ;
    //             maxLeft = node.val ;
    //         }
    //     }
    //     traver(node.left, depth +1) ;
    //     traver(node.right, depth +1) ;
    //     return ;
    // }
    // traver(root, 1) ;
    // return maxLeft ;
};