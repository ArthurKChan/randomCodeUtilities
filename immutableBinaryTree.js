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
  if (arguments[1] !== "checked" && !this.contains(x)) {
    return this;
  }
  if (this.value === x) {
    if (this.left.isEmpty() && this.right.isEmpty()) {
      return new EmptyBinaryTree;
    }
    if (this.right.isEmpty() && !this.left.isEmpty()) {
      return this.left;
    }
    if (this.left.isEmpty() && !this.right.isEmpty()) {
      return this.right;
    }
    if (this.left.depth() < this.right.depth() ) {
      return removeNodeWithChildren(this.left, "right", this);
    }
    else {
      return removeNodeWithChildren(this.right, "left", this);
    }
  }

  if (this.value > x) {
    return new BinaryTreeNode(this.value, this.left.remove(x, "checked"), this.right);
  }

  if (this.value < x) {
    return new BinaryTreeNode(this.value, this.left, this.right.remove(x, "checked"));
  }

  function removeNodeWithChildren(node, direction, nodeToAttach){
    if (node[direction].isEmpty()) {
      if (direction === "right") {
        return new BinaryTreeNode(node.value, nodeToAttach.left.remove(node.value), nodeToAttach.right);
      }
      if (direction === "left") {
        return new BinaryTreeNode(node.value, nodeToAttach.left, nodeToAttach.right.remove(node.value));
      }
    }
    return removeNodeWithChildren(node[direction], direction, nodeToAttach);
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
