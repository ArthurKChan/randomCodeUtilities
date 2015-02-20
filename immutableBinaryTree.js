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
BinaryTreeNode.prototype.insert = function(x) {
  var recurse = function(node){
    if (node.isEmpty()) {
      return new BinaryTreeNode(x, new EmptyBinaryTree, new EmptyBinaryTree);
    }
    if (node.value >= x) {
      return new BinaryTreeNode(node.value, recurse(node.left), node.right);
    }
    if (node.value < x) {
      return new BinaryTreeNode(node.value, node.left, recurse(node.right));
    }
  };
  return recurse(this);
};
BinaryTreeNode.prototype.remove = function(x) {
  var flag = true;
  var recurse = function(node){
    if (node.isEmpty()) {
      flag = false;
      return new EmptyBinaryTree;
    }
    if (node.value === x) {
      if (node.left.isEmpty() && node.right.isEmpty()) {
        return new EmptyBinaryTree;
      }
      if (node.right.isEmpty() && !node.left.isEmpty()) {
        return node.left;
      }
      if (node.left.isEmpty() && !node.right.isEmpty()) {
        return node.right;
      }
      if (node.left.depth() < node.right.depth() ) {
        return findDirectionMost(node.left, "right", node);
      }
      else {
        return findDirectionMost(node.right, "left", node);
      }
    }
    if (node.value > x) {
      return new BinaryTreeNode(node.value, recurse(node.left), node.right);
    }
    if (node.value < x) {
      return new BinaryTreeNode(node.value, node.left, recurse(node.right));
    }
  };
  var newTree = recurse(this);
  return flag ? newTree : this;

  function findDirectionMost(node, direction, nodeToAttach){
    if (node[direction].isEmpty()) {
      if (direction === "right") {
        return new BinaryTreeNode(node.value, nodeToAttach.left.remove(node.value), nodeToAttach.right);
      }
      if (direction === "left") {
        return new BinaryTreeNode(node.value, nodeToAttach.left, nodeToAttach.right.remove(node.value));
      }
    }
    return findDirectionMost(node[direction], direction, nodeToAttach);
  };
};

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
EmptyBinaryTree.prototype.insert = function(x) {
  return new BinaryTreeNode(x, new EmptyBinaryTree, new EmptyBinaryTree);
};
EmptyBinaryTree.prototype.remove = function(x) { return this; };
