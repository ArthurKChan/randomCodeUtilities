function List() {}

function EmptyList() {}
EmptyList.prototype = new List();
EmptyList.prototype.constructor = EmptyList;

EmptyList.prototype.contains = function(x) { return 0; };

EmptyList.prototype.toString = function() { return "()"; };
EmptyList.prototype.isEmpty = function() { return true; };
EmptyList.prototype.length = function() { return 0; };
EmptyList.prototype.push = function(x) { return new ListNode(x, this); };
EmptyList.prototype.remove = function(x) { return this; };
EmptyList.prototype.append = function(xs) { return xs; };

function ListNode(value, next) {
  this.value = value;
  this.next = next;
  Object.freeze(this);
};
ListNode.prototype = new List();
ListNode.prototype.constructor = ListNode;

ListNode.prototype.contains = function(x) {
  if (this.value === x) {
    return 1 + this.next.contains(x);
  }
  return this.next.contains(x);
};

ListNode.prototype.toString = function() {
  if (arguments[0] !== "afterFirst" && this.next.isEmpty()) {
    return "(" + this.value + ")";
  }
  if (arguments[0] === "afterFirst" && !this.next.isEmpty()) {
    return " " + this.value + this.next.toString("afterFirst");
  }
  if (arguments[0] === "afterFirst" && this.next.isEmpty()) {
    return " " + this.value + ")";
  }
  return "(" + this.value + this.next.toString("afterFirst");
};

ListNode.prototype.isEmpty = function() { return false; };

ListNode.prototype.head = function() {
  return this.value;
};
ListNode.prototype.tail = function() {
  return this.next;
};
ListNode.prototype.length = function() {
  return 1 + this.next.length();
};
ListNode.prototype.push = function(x) {
  return new ListNode(x, this);
};
ListNode.prototype.remove = function(x) {
  if (this.contains(x) === 0) {
    return this;
  }
  if (this.value === x) {
    return  this.next.remove(x);
  }
  return new ListNode(this.value, this.next.remove(x));
};
ListNode.prototype.append = function(xs) {
  if (this.next.isEmpty()) {
    return new ListNode(this.value, xs);
  }
  return new ListNode(this.value, this.next.append(xs));
};
