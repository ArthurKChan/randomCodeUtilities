function makePalindrome(text){
  if (text.length === 1) { return text; }
  var frontLength = 1, backLength = 1;
  // start from length 2
  for(var length=text.length; length>0; length--){
    // check if palindrome
    for(var i=0; i<Math.floor(length/2); i++){
      // not a palindrome
      if (text[i] !== text[length-1-i]) {
        break;
      }
      if (i === Math.floor(length/2)-1) {
        frontLength = length;
      }
    }
    for(var i=0; i<Math.floor(length/2); i++){
      // not a palindrome
      if (text[text.length-1-i] !== text[text.length-length+i]) {
        break;
      }
      if (i === Math.floor(length/2)-1) {
        backLength = length;
      }
    }
    if (frontLength > 1 || backLength > 1) {
      break;
    }
  }
  // the text is already a palindrome
  if (frontLength === text.length) {
    return text;
  }
  var addition = "";
  // now we know which side to add from & how much to add
  if (frontLength > backLength){
    for(var i=text.length-1; i>frontLength-1; i--){
      addition += text[i];
    }
    return addition + text;
  } else {
    for(var i=text.length - backLength -1; i>=0; i--){
      addition += text[i];
    }
    return text + addition;
  }
};

console.log(makePalindrome("a"));
console.log(makePalindrome("bb"));
console.log(makePalindrome("aaa"));
console.log(makePalindrome("aba"));
console.log(makePalindrome("ab"));
console.log(makePalindrome("level"));
console.log(makePalindrome("leveled"));
console.log(makePalindrome("delevel"));
