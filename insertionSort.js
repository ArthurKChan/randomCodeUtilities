function insertionSort(list){
  for(var i=1; i<list.length; i++){
    for(var j=0; j<i; j++){
      if (list[i] < list[j]) {
        var item = list.splice(i,1);
        list.splice(j, 0, item[0]);
      }
    }
    console.log(list)
  }
  return list;
};
