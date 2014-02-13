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

module.exports.parse = {
  
  // TODO
  
  invalid: function(test) {
    test.throws(function() {
      var tree = new ExpressionTree(),
          tokens = new Lexer('a + b * (c + d))').tokens();
      
      tree.parse(tokens);
    }, SyntaxError);
    
    test.done();
  }
  
};