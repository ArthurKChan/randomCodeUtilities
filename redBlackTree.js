var RedBlackNode = function(value){
  this.value = value;
  this.color = "red";
  this.left = new NullNode;
  this.right =  new NullNode;
};

var NullNode = function(){
  this.color = "black";
  this.value = null;
};

var RedBlackTree = function(){
  this.color = "black";
  this.value = null;
};

// Tree Insertion
RedBlackTree.prototype.insert = function(value){
  if (this.value === null) {
    this = new RedBlackTree(value);
    // enforce rules
  }
  if (this.value < value) {
    this.right.insert(value);
  }
  if (this.value > value) {
    this.left.insert(value);
  }
};
// Tree Removal
RedBlackTree.prototype.remove = function(value){
  //... do later
};

