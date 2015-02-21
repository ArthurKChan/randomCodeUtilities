function listPosition(word) {
  // sort letters
  var sortedList = word.split("").sort(function(a,b){ return a<b?-1:a>b?1:0;});
  var counts = {};
  for (var i=0; i<sortedList.length; i++){
    counts[sortedList[i]] = counts[sortedList[i]] || 0;
    counts[sortedList[i]]++;
  }
  var sortedWord = sortedList.join("");
  var curr = sortedList.join("");
  var rank = 0;
  // find rank
  for(var i=0; i<sortedList.length; i++){
    var indexToSwap = 0;
    while(sortedList[i] !== word[i]) {
      counts[sortedList[i]]--;
      var divisor = 1;
      for(var j in counts){
        divisor = divisor * f[counts[j]]; 
      }
      rank += f[sortedList.length - 1 - i] / divisor;
      counts[sortedList[i]]++;

      // Make sure to grab/swap a new letter
      // var indexToSwap = i+indexToSwap;
      indexToSwap++;
      while(sortedList[i] === sortedList[i+indexToSwap] && i+indexToSwap !== sortedList.length-1){
        indexToSwap++;
      }
      var temp = sortedList[i];
      sortedList[i] = sortedList[i+indexToSwap];
      sortedList[i+indexToSwap] = temp;
    }
    counts[sortedList[i]]--;
  }
  return rank+1;
}

var f = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000, 6402373705728000, 121645100408832000, 2432902008176640000, 51090942171709440000, 1124000727777607680000, 25852016738884976640000, 620448401733239439360000, 15511210043330985984000000, 403291461126605635584000000, 10888869450418352160768000000, 304888344611713860501504000000, 8841761993739701954543616000000, 265252859812191058636308480000000];
