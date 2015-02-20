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
  var leftDepth = this.left.depth() + 1;
  var rightDepth = this.right.depth() + 1;
  return leftDepth > rightDepth ? leftDepth : rightDepth;
};
BinaryTreeNode.prototype.count = function() {
  return 1+this.left.count()+this.right.count();
};

BinaryTreeNode.prototype.inorder = function(fn) {
  this.left.inorder(fn);
  fn(this.value);
  this.right.inorder(fn);
};
BinaryTreeNode.prototype.preorder = function(fn) {
  fn(this.value);
  this.left.preorder(fn);
  this.right.preorder(fn);
};
BinaryTreeNode.prototype.postorder = function(fn) {
  this.left.postorder(fn);
  this.right.postorder(fn);
  fn(this.value);
};

BinaryTreeNode.prototype.contains = function(x) {
  if (this.value === x) {
    return true;
  }
  if (this.value > x) {
    if (this.left) {
      return this.left.contains(x);
    }
  }
  if (this.value < x) {
    if (this.right) {
      return this.right.contains(x);
    }
  }
};
BinaryTreeNode.prototype.insert = function(x) {
  if (this.value >= x) {
    return new BinaryTreeNode(this.value, this.left.insert(x), this.right);
  }
  if (this.value < x) {
    return new BinaryTreeNode(this.value, this.left, this.right.insert(x));
  }
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
