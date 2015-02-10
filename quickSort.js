// Javascript quick sort implementation
// uses Sedgewick's advice on pivot selection

// quick sort performs poorly with a lot of repeating elements
var listsOfLists = [
[],
[1],
[2,1],
[1,2],
[1,2,3],
[2,1,3],
[4,3,2,1],
[1,2,3,4],
[4,4,4,4],
[4,2,4,2],
[4,2,1,5,6,3,10,100,11,23,14]
];
for(var i=0; i<listsOfLists.length; i++){
  console.log(quickSort(listsOfLists[i]))
}

function quickSort(list, comparator){
  if (list.constructor !== Array){ return list; }

  comparator = comparator || defaultNumericalComparator;
  // var pivot = medianOfThree(list, comparator);
  // var pivotIndex, pivotValue;

  // if (pivot === "first") {
  //   pivotIndex = 0;
  // }
  
  // if (pivot === "middle") {
  //   pivotIndex = Math.floor(list.length/2);
  // }
  
  // if (pivot === "last") {
  //   pivotIndex = list.length-1;
  //   pivotValue = list[pivotIndex];
  // }

  function recurse(first, last){
    var prevLast = last;
    for(var i=first; i<last; i++){
      if (comparator(list[i], list[last]) > 0) {
        var temp = list[i];
        list[i] = list[last-1];
        list[last-1] = list[last];
        list[last] = temp;
        last--;
        i--;
      }
    }

    if (last-1 - first > 0) {
      recurse(first,last-1);
    }
    if (prevLast - last+1 > 1) {
      recurse(last+1,prevLast);
    }
  };
  recurse(0,list.length-1);
  return list;
};



function defaultNumericalComparator(a, b){
  return a-b;
};

function medianOfThree(list, comparator){
  var first = {
    val: list[0],
    pos: "first"
  };
  var middle = {
    val: list[Math.floor(list.length/2)],
    pos: "middle"
  };
  var last = {
    val: list[list.length-1],
    pos: "last"
  };
  var array = [first,middle,last];  
  for(var i=1; i<array.length; i++){
    for(var j=i-1; j>-1; j--){
      if (comparator(array[i].val, array[j].val) > 0) {
        console.log("i",i,"j",j);
        var temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
    }
  }
  return array[1].pos;
};



// tj holo
// co
// Peter De Croos generators. functional programming with generators. netflix es7
// shen (js library) (functional library for composing generators)
// fibers
