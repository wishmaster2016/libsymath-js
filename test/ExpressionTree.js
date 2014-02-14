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
  
  expr = '(a + b))';
  test.strictEqual(tree.checkBrackets(new Lexer(expr).tokens()), false);
  
  test.done();
};

module.exports.polishNotation = function(test) {
  var tree = new ExpressionTree(),
      tokens = new Lexer('a + b * c * d + ( e - f ) * ( g * h + i )').tokens();

  test.strictEqual(tree.toString(tree.polishNotation(tokens)), 'a b c * d * + e f - g h * i + * +');
  
  tokens = new Lexer('7 + 4').tokens();
  test.strictEqual(tree.toString(tree.polishNotation(tokens)), '7 4 +');

  tokens = new Lexer('a + ( b - c ) * d').tokens();
  test.strictEqual(tree.toString(tree.polishNotation(tokens)), 'a b c - d * +');

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