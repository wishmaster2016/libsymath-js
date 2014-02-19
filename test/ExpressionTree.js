/*jslint white: true, node: true, plusplus: true, vars: true */
/*global module, require */
'use strict';

var ExpressionTree = require('..').Expression,
    Lexer          = require('..').Lexer;

module.exports.checkBrackets = function(test) {
  var tree = new ExpressionTree(),
      expr;
  
  expr = '((()(()())))';
  test.strictEqual(tree.checkBrackets(new Lexer(expr).tokens()), true);
  
  expr = '((()()())';
  test.strictEqual(tree.checkBrackets(new Lexer(expr).tokens()), false);
  
  expr = '((';
  test.strictEqual(tree.checkBrackets(new Lexer(expr).tokens()), false);
  
  expr = '))';
  test.strictEqual(tree.checkBrackets(new Lexer(expr).tokens()), false);
  
  expr = '';
  test.strictEqual(tree.checkBrackets(new Lexer(expr).tokens()), true);
  
  expr = 'a + b';
  test.strictEqual(tree.checkBrackets(new Lexer(expr).tokens()), true);
  
  expr = '(a + b)';
  test.strictEqual(tree.checkBrackets(new Lexer(expr).tokens()), true);
  
  expr = 'f(a + b)';
  test.strictEqual(tree.checkBrackets(new Lexer(expr).tokens()), true);
  
  expr = '(a + b))';
  test.strictEqual(tree.checkBrackets(new Lexer(expr).tokens()), false);
  
  expr = 'f(a + b))';
  test.strictEqual(tree.checkBrackets(new Lexer(expr).tokens()), false);
  
  test.done();
};

module.exports.polishNotation = function(test) {
  var tree = new ExpressionTree(),
      tokens = tree.polishNotation(new Lexer('a + b * c * d + ( e - f ) * ( g * h + i )').tokens());
      //a b c * d * + e f - g h * i + * +

  test.strictEqual(tokens[0].type, 'literal');
  test.strictEqual(tokens[0].value, 'a');
  test.strictEqual(tokens[1].type, 'literal');
  test.strictEqual(tokens[1].value, 'b');
  test.strictEqual(tokens[2].type, 'literal');
  test.strictEqual(tokens[2].value, 'c');
  test.strictEqual(tokens[3].type, 'operator');
  test.strictEqual(tokens[3].value, '*');
  test.strictEqual(tokens[4].type, 'literal');
  test.strictEqual(tokens[4].value, 'd');
  test.strictEqual(tokens[5].type, 'operator');
  test.strictEqual(tokens[5].value, '*');
  test.strictEqual(tokens[6].type, 'operator');
  test.strictEqual(tokens[6].value, '+');
  test.strictEqual(tokens[7].type, 'literal');
  test.strictEqual(tokens[7].value, 'e');
  test.strictEqual(tokens[8].type, 'literal');
  test.strictEqual(tokens[8].value, 'f');
  test.strictEqual(tokens[9].type, 'operator');
  test.strictEqual(tokens[9].value, '-');
  test.strictEqual(tokens[10].type, 'literal');
  test.strictEqual(tokens[10].value, 'g');
  test.strictEqual(tokens[11].type, 'literal');
  test.strictEqual(tokens[11].value, 'h');
  test.strictEqual(tokens[12].type, 'operator');
  test.strictEqual(tokens[12].value, '*');
  test.strictEqual(tokens[13].type, 'complex');
  test.strictEqual(tokens[13].value, 1);
  test.strictEqual(tokens[14].type, 'operator');
  test.strictEqual(tokens[14].value, '+');
  test.strictEqual(tokens[15].type, 'operator');
  test.strictEqual(tokens[15].value, '*');
  test.strictEqual(tokens[16].type, 'operator');
  test.strictEqual(tokens[16].value, '+');

  tokens = tree.polishNotation(new Lexer('7 + 4').tokens());
  //7 4 +
  test.strictEqual(tokens[0].type, 'constant');
  test.strictEqual(tokens[0].value, 7);
  test.strictEqual(tokens[1].type, 'constant');
  test.strictEqual(tokens[1].value, 4);
  test.strictEqual(tokens[2].type, 'operator');
  test.strictEqual(tokens[2].value, '+');

  tokens = tree.polishNotation(new Lexer('a + ( b - c ) * d').tokens());
  //a b c - d * +
  test.strictEqual(tokens[0].type, 'literal');
  test.strictEqual(tokens[0].value, 'a');
  test.strictEqual(tokens[1].type, 'literal');
  test.strictEqual(tokens[1].value, 'b');
  test.strictEqual(tokens[2].type, 'literal');
  test.strictEqual(tokens[2].value, 'c');
  test.strictEqual(tokens[3].type, 'operator');
  test.strictEqual(tokens[3].value, '-');
  test.strictEqual(tokens[4].type, 'literal');
  test.strictEqual(tokens[4].value, 'd');
  test.strictEqual(tokens[5].type, 'operator');
  test.strictEqual(tokens[5].value, '*');
  test.strictEqual(tokens[6].type, 'operator');
  test.strictEqual(tokens[6].value, '+');
  
  tokens = tree.polishNotation(new Lexer('k(x + f(x(a + b)) + 5)').tokens());
  //x a b + x() f() + 5 + k()
  test.strictEqual(tokens[0].type, 'literal');
  test.strictEqual(tokens[0].value, 'x');
  test.strictEqual(tokens[1].type, 'literal');
  test.strictEqual(tokens[1].value, 'a');
  test.strictEqual(tokens[2].type, 'literal');
  test.strictEqual(tokens[2].value, 'b');
  test.strictEqual(tokens[3].type, 'operator');
  test.strictEqual(tokens[3].value, '+');
  test.strictEqual(tokens[4].type, 'func');
  test.strictEqual(tokens[4].value, 'x');
  test.strictEqual(tokens[5].type, 'func');
  test.strictEqual(tokens[5].value, 'f');
  test.strictEqual(tokens[6].type, 'operator');
  test.strictEqual(tokens[6].value, '+');
  test.strictEqual(tokens[7].type, 'constant');
  test.strictEqual(tokens[7].value, 5);
  test.strictEqual(tokens[8].type, 'operator');
  test.strictEqual(tokens[8].value, '+');
  test.strictEqual(tokens[9].type, 'func');
  test.strictEqual(tokens[9].value, 'k');
  
  tokens = tree.polishNotation(new Lexer('x + z^2 * a^b').tokens());
  //x z 2 ^ a b ^ * +
  test.strictEqual(tokens[0].type, 'literal');
  test.strictEqual(tokens[0].value, 'x');
  test.strictEqual(tokens[1].type, 'literal');
  test.strictEqual(tokens[1].value, 'z');
  test.strictEqual(tokens[2].type, 'constant');
  test.strictEqual(tokens[2].value, 2);
  test.strictEqual(tokens[3].type, 'operator');
  test.strictEqual(tokens[3].value, '^');
  test.strictEqual(tokens[4].type, 'literal');
  test.strictEqual(tokens[4].value, 'a');
  test.strictEqual(tokens[5].type, 'literal');
  test.strictEqual(tokens[5].value, 'b');
  test.strictEqual(tokens[6].type, 'operator');
  test.strictEqual(tokens[6].value, '^');
  test.strictEqual(tokens[7].type, 'operator');
  test.strictEqual(tokens[7].value, '*');
  test.strictEqual(tokens[8].type, 'operator');
  test.strictEqual(tokens[8].value, '+');

  test.done();
};

module.exports.parse = {
  
  invalid: function(test) {
    test.throws(function() {
      var tree = new ExpressionTree(),
          tokens = new Lexer('a + b * (c + d))').tokens();
      
      tree.parse(tokens);
    }, SyntaxError);
    
    test.done();
  }
  
};