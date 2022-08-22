
// Definition for a binary tree node.
function TreeNode(val, left, right) {
      this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
}
 
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
    if (root == null)
      return 0 ;

    let sum = 0 ;
    helpFn(root.left) ;
    helpFn(root.rigth) ;
    function helpFn (node) {
        if (node == null)
            return ;

        helpFn(node.left) ;
        if (node.left == null && node.right == null)
            sum += node.val ;
        helpFn(node.right) ;
        return ;
    }

    return sum ;
};

function main () {
  let arr = [1] ,
  arr2 = [3,9,20,null,null,15,7] ;
  for (var i = 0 ; i < arr.length ; i++) {

  }
}