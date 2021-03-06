function Compiler () {};

Compiler.prototype.compile = function (program) {
  return this.pass3(this.pass2(this.pass1(program)));
};

Compiler.prototype.tokenize = function (program) {
  // Turn a program string into an array of tokens.  Each token
  // is either '[', ']', '(', ')', '+', '-', '*', '/', a variable
  // name or a number (as a string)
  var regex = /\s*([-+*/\(\)\[\]]|[A-Za-z]+|[0-9]+)\s*/g;
  return program.replace(regex, ":$1").substring(1).split(':').map( function (tok) {
    return isNaN(tok) ? tok : tok|0;
  });
};

Compiler.prototype.pass1 = function (program) {
  var tokens = this.tokenize(program);
  var args = [];
  var operations;

  var i=1;
  while(tokens[i] !== "]"){
    args.push(tokens[i++]);
  }
  i++;

  function breakupByOps(tokens){
    var expression = {};
    var parens = [];

    if (tokens.indexOf("*") === -1 && tokens.indexOf("/") === -1 && tokens.indexOf("+") === -1 && tokens.indexOf("-") === -1) {
      while (tokens[0] === "(") {
        tokens.shift();
        tokens.pop();
      }
      if (/[a-zA-Z]/.test(tokens[0])) {
        expression.op = "arg";
        expression.n = args.indexOf(tokens[0]);
      }
      else {
        expression.op = "imm";
        expression.n = parseFloat(tokens.join(""));
      }
      return expression;
    }

    for(var i=tokens.length-1; i>=0; i--){
      if (tokens[i] === ")") {
        parens.push("(");
      }
      if (tokens[i] === "(") {
        parens.pop();
      }
      if (parens.length === 0) {
        if (tokens[i] === "+") {
          expression.op = "+";
          expression.a = tokens.slice(0, i);
          expression.b = tokens.slice(i+1);
          break;
        }
        if (tokens[i] === "-") {
          expression.op = "-";
          expression.a = tokens.slice(0,i);
          expression.b = tokens.slice(i+1);
          break;
        }
      }
    }
    if (!expression.hasOwnProperty("op")) {
      for(var i=tokens.length-1; i>=0; i--){
        if (tokens[i] === ")") {
          parens.push("(");
        }
        if (tokens[i] === "(") {
          parens.pop();
        }
        if (parens.length === 0) {
          if (tokens[i] === "*") {
            expression.op = "*";
            expression.a = tokens.slice(0, i);
            expression.b = tokens.slice(i+1);
            break;
          }
          if (tokens[i] === "/") {
            expression.op = "/";
            expression.a = tokens.slice(0,i);
            expression.b = tokens.slice(i+1);
            break;
          }
        }
      }
    }
    if (!expression.hasOwnProperty("op") && tokens[0] === "(" && tokens[tokens.length-1] === ")") {
      expression = breakupByOps(tokens.slice(1, tokens.length-1));
    }
    return expression;
  };

  function recurse(tokens){
    var expression = {};
    var a, b;
    expression = breakupByOps(tokens);
    if (expression.hasOwnProperty("a")) {
      expression.a = recurse(expression.a);
      expression.b = recurse(expression.b);
    }
    return expression;
  };
  return recurse(tokens.slice(i));
};

Compiler.prototype.pass2 = function (ast) {
  if (ast.op === "imm") {
    return ast;
  }
  if (ast.op === "arg") {
    return ast;
  }
  var a = this.pass2(ast.a), b = this.pass2(ast.b);
  if (ast.op === "*") {
    return a.op === "imm" && b.op === "imm" ? {"op":"imm","n": a.n * b.n} : {"op":"*","a":a,"b":b};
  }
  if (ast.op === "/") {
    return a.op === "imm" && b.op === "imm" ? {"op":"imm","n": a.n / b.n} : {"op":"/","a":a,"b":b};
  }
  if (ast.op === "+") {
    return a.op === "imm" && b.op === "imm" ? {"op":"imm","n": a.n + b.n} : {"op":"+","a":a,"b":b};
  }
  if (ast.op === "-") {
    return a.op === "imm" && b.op === "imm" ? {"op":"imm","n": a.n - b.n} : {"op":"-","a":a,"b":b};
  }
  // return AST with constant expressions reduced
};

Compiler.prototype.pass3 = function (ast) {
  if (ast.op === "imm") {
    return ["IM "+ast.n];
  }
  if (ast.op === "arg") {
    return ["AR "+ast.n];
  }
  var a = this.pass3(ast.a), b = this.pass3(ast.b);
  if (ast.op === "*") {
    return b.concat(["PU"]).concat(a).concat(["SW", "PO", "SW", "MU"])
    // return a.op === "imm" && b.op === "imm" ? {"op":"imm","n": a.n * b.n} : {"op":"*","a":a,"b":b};
  }
  if (ast.op === "/") {
    return b.concat(["PU"]).concat(a).concat(["SW", "PO", "SW", "DI"])
    // return a.op === "imm" && b.op === "imm" ? {"op":"imm","n": a.n / b.n} : {"op":"/","a":a,"b":b};
  }
  if (ast.op === "+") {
    return b.concat(["PU"]).concat(a).concat(["SW", "PO", "SW", "AD"])
    // return a.op === "imm" && b.op === "imm" ? {"op":"imm","n": a.n + b.n} : {"op":"+","a":a,"b":b};
  }
  if (ast.op === "-") {
    return b.concat(["PU"]).concat(a).concat(["SW", "PO", "SW", "SU"])
    // return a.op === "imm" && b.op === "imm" ? {"op":"imm","n": a.n - b.n} : {"op":"-","a":a,"b":b};
  }
  // return assembly instructions
};

var c = new Compiler;
// console.log(JSON.stringify(c.pass1("[ x y z ] ( 2*3*x + 5*y - 3*z ) / (1 + 3 + 2*2)")));
// console.log(JSON.stringify(c.pass2(c.pass1("[ x y z ] ( 2*3*x + 5*y - 3*z ) / (1 + 3 + 2*2)"))));
// console.log(JSON.stringify(c.pass3(c.pass2(c.pass1("[ x y z ] ( 2*3*x + 5*y - 3*z ) / (1 + 3 + 2*2)")))));
// {"op":"/","a":{"op":"-","a":{"op":"+","a":{"op":"*","a":{"op":"imm","n":6},"b":{"op":"arg","n":0}},"b":{"op":"*","a":{"op":"imm","n":5},"b":{"op":"arg","n":1}}},"b":{"op":"*","a":{"op":"imm","n":3},"b":{"op":"arg","n":2}}},"b":{"op":"imm","n":8}}
