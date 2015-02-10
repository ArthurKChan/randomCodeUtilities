// Javascript quick sort implementation
// uses Sedgewick's advice on pivot selection

// var listsOfLists = [
// [],
// [1],
// [2,1],
// [1,2],
// [1,2,3],
// [2,1,3],
// [4,3,2,1],
// [1,2,3,4],
// [4,4,4,4],
// [4,2,4,2],
// [4,2,1,5,6,3,10,100,11,23,14]
// ];
// for(var i=0; i<listsOfLists.length; i++){
//   console.log(quickSort(listsOfLists[i]))
// }

function quickSort(list, comparator){
  if (list.constructor !== Array){ return list; }
  if (list.length === 0){ return list; }

  comparator = comparator || defaultNumericalComparator;

  function recurse(first, last){
    var prevLast = last;
    var pivot;

    var pivotChoice = medianOfThree([list[first], list[Math.floor((last-first)/2)+first], list[last]], comparator);
    if (pivotChoice === "first") {
      pivot = first;
    }
    if (pivotChoice === "middle") {
      pivot = Math.floor((last-first)/2)+first;
    }
    if (pivotChoice === "last") {
      pivot = last;
    }
    var tempValue = list[pivot];
    list[pivot] = list[last];
    list[last] = tempValue;

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
        // console.log("i",i,"j",j);
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
