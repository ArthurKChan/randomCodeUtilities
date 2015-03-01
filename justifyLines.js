/**
 * @param {String} str - inital string
 * @param {Number} len - line length
 */
var justify = function(str, len) {
  // split str into multiple lines
  str = str.split("");
  var index = len;
  while(index<str.length){
    while (str[index] !== " "){
      if (index <= 0) throw new Error("what?!");
      index--;
    }
    str[index] = "\n";
    index += len+1;
  }
  str = str.join("");
  // add in spaces
  var lines = str.split("\n");
  for (var i=0; i<lines.length-1; i++) {
    var wordCount = lines[i].split(" ").length;
    var strLengthWithoutSpaces = lines[i].length - wordCount + 1;
    var totalSpacesNeeded = len - strLengthWithoutSpaces;
    if (wordCount !== 1) {
      var spacesBetweenEachWord = Math.floor(totalSpacesNeeded / (wordCount-1));
      var leftOverSpaces = totalSpacesNeeded % (wordCount-1);
      var spaceReplacement = "";
      for (var j=0; j<spacesBetweenEachWord; j++) {
        spaceReplacement += " ";
      }
      var words = lines[i].split(" ");
      var front = words.slice(0,leftOverSpaces+1).join(spaceReplacement+" ");
      var back = words.slice(leftOverSpaces+1).join(spaceReplacement);
      lines[i] = front + spaceReplacement + back;
    }
  }
  return lines.join("\n");
};
