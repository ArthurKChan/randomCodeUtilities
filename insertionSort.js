function insertionSort(list, comparator){
  comparator = comparator || defaultComparator;
  for(var i=1; i<list.length; i++){
    for(var j=0; j<i; j++){
      if (comparator(list[i],list[j]) < 0) {
        var item = list.splice(i,1);
        list.splice(j, 0, item[0]);
      }
    }
  }
  return list;
};

function defaultComparator(a, b){
  return a-b;
};
