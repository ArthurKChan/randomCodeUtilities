function BinaryTree() {};

function BinaryTreeNode(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
  Object.freeze(this);
}
BinaryTreeNode.prototype = new BinaryTree();
BinaryTreeNode.prototype.constructor = BinaryTreeNode;

BinaryTreeNode.prototype.isEmpty = function() { return false; };
BinaryTreeNode.prototype.depth = function() {
  var maxDepth = 1;
  var recurse = function(node, depth){
    if (node.isEmpty()) {
      if (maxDepth < depth) maxDepth = depth;
      return;
    }
    recurse(node.left, depth+1);
    recurse(node.right, depth+1);
  };
  recurse(this, 0);
  return maxDepth;
};
BinaryTreeNode.prototype.count = function() {
  var count = 0;
  var recurse = function(node){
    if (node.isEmpty()) {
      return 0;
    }
    return 1+recurse(node.left)+recurse(node.right);
  };
  return recurse(this);
};

BinaryTreeNode.prototype.inorder = function(fn) {
  var recurse = function(node){
    if (node.isEmpty()) {
      return;
    }
    recurse(node.left);
    fn(node.value);
    recurse(node.right);
  };
  recurse(this);
};
BinaryTreeNode.prototype.preorder = function(fn) {
  var recurse = function(node){
    if (node.isEmpty()) {
      return;
    }
    fn(node.value);
    recurse(node.left);
    recurse(node.right);
  };
  recurse(this);
};
BinaryTreeNode.prototype.postorder = function(fn) {
  var recurse = function(node){
    if (node.isEmpty()) {
      return;
    }
    recurse(node.left);
    recurse(node.right);
    fn(node.value);
  };
  recurse(this);
};

BinaryTreeNode.prototype.contains = function(x) {
  var recurse = function(node){
    if (node.isEmpty()) {
      return false;
    }
    if (node.value === x) {
      return true;
    }
    if (node.value > x) {
      return recurse(node.left);
    }
    if (node.value < x) {
      return recurse(node.right);
    }
  };
  return recurse(this);
};
BinaryTreeNode.prototype.insert = function(x) { /* implement this */ };
BinaryTreeNode.prototype.remove = function(x) { /* implement this */ };

////////////////////////////////////////////////////////////////////////
function EmptyBinaryTree() { Object.freeze(this); }
EmptyBinaryTree.prototype = new BinaryTree();
EmptyBinaryTree.prototype.constructor = EmptyBinaryTree;

EmptyBinaryTree.prototype.isEmpty = function() { return true; };
EmptyBinaryTree.prototype.depth = function() { return 0; };
EmptyBinaryTree.prototype.count = function() { return 0; };

EmptyBinaryTree.prototype.inorder = function(fn) { return; };
EmptyBinaryTree.prototype.preorder = function(fn) { return; };
EmptyBinaryTree.prototype.postorder = function(fn) { return; };

EmptyBinaryTree.prototype.contains = function(x) { return false; };
EmptyBinaryTree.prototype.insert = function(x) { /* implement this */ };
EmptyBinaryTree.prototype.remove = function(x) { /* implement this */ };
