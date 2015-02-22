var calc = function (expression) {
  // while there are matches
  var arr = expression.match(/\([^\(\)]+\)/g);
  while (arr){
    // Grab all the easily evaulated inner expressions
    var arrReplacements = [];
    for(var i=0; i<arr.length; i++){
      var currentExpression = arr[i].slice(1, arr[i].length-1);
      currentExpression.replace(/\s*/g, "");
      // build either 1 primative
      if (/^(\-?\d)\d*&/.test(currentExpression)) {
        arrReplacements.push(currentExpression);
      } else {
        currentExpression = currentExpression.replace(/\s+/g, "");
        arrReplacements.push(operationWithoutParen(currentExpression));
      }
    }
    // Put them back in but now evaluated
    for(var i=0; i<arr.length; i++){
      var regex = new RegExp(arr[i].replace(/[\(\*\+\-\/\)]/g, "\\$&"));
      expression = expression.replace(regex, arrReplacements[i]);
    }
    arr = expression.match(/\([^\(\)]+\)/g);
  }
  expression = expression.replace(/\s+/g, "");
  return operationWithoutParen(expression);
};

// expects expression w/o spaces
function operationWithoutParen(expression) {
  expression = expression.replace(/([\/\*])(\-\-)+/g, "$1");
  var arr = expression.match(/\d+(\.\d+)?[\*\/]\-?\d+(\.\d+)?/);
  while(arr){
    var temp = arr[0].replace(/(\d+)([\*\/])(\-?\d+)/, "$1 $2 $3");
    var regex = new RegExp(arr[0].replace(/[\(\*\+\-\/\)]/g, "\\$&"));
    temp = temp.split(" ");
    if (temp[1] === "*") {
      expression = expression.replace(regex, parseFloat(temp[0]) * parseFloat(temp[2]));
    }
    if (temp[1] === "/") {
      expression = expression.replace(regex, parseFloat(temp[0]) / parseFloat(temp[2]));
    }
    arr = expression.match(/\d+(\.\d+)?[\*\/]\-?\d+(\.\d+)?/);
  }
  expression = expression.replace(/\+?(\-\-)+/g, "+").replace(/\+\-/g, "-");
  expression = expression.replace(/[\+\-]/g, " $& ");
  expression = expression.split(/\s+/);
  if (expression[0] === "") expression.shift();
  if (expression[expression.length-1] === "") expression.pop();
  var answer = 0;
  for (var i=0; i<expression.length; i++){
    if (expression[i] === "-"){
      answer = answer - parseFloat(expression[++i]);
    } else if (expression[i] === "+"){
      answer = answer + parseFloat(expression[++i]);
    } else {
      answer = parseFloat(expression[i]);
    }
  }
  return answer;
};
