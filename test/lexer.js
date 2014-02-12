/*jslint white: true, node: true, plusplus: true, vars: true */
/*global module, require */
'use strict';

var Lexer = require('../src/lexer.js');

module.exports.getNextToken = function(test) {
  var string = 'aaaa + бб   1(([',
      instance = new Lexer(string);
  
  var chunk = instance.getNextToken();
  test.strictEqual(chunk.text, 'aaaa');
  test.strictEqual(chunk.loc.start, 0);
  test.strictEqual(chunk.loc.end, 4);
  
  
  chunk = instance.getNextToken();
  test.strictEqual(chunk.text, '+');
  test.strictEqual(chunk.loc.start, 5);
  test.strictEqual(chunk.loc.end, 6);
  
  chunk = instance.getNextToken();
  test.strictEqual(chunk.text, 'бб');
  test.strictEqual(chunk.loc.start, 7);
  test.strictEqual(chunk.loc.end, 9);
  
  chunk = instance.getNextToken();
  test.strictEqual(chunk.text, '1');
  test.strictEqual(chunk.loc.start, 12);
  test.strictEqual(chunk.loc.end, 13);
  
  chunk = instance.getNextToken();
  test.strictEqual(chunk.text, '(');
  test.strictEqual(chunk.loc.start, 13);
  test.strictEqual(chunk.loc.end, 14);
  
  chunk = instance.getNextToken();
  test.strictEqual(chunk.text, '(');
  test.strictEqual(chunk.loc.start, 14);
  test.strictEqual(chunk.loc.end, 15);
  
  chunk = instance.getNextToken();
  test.strictEqual(chunk.text, '[');
  test.strictEqual(chunk.loc.start, 15);
  test.strictEqual(chunk.loc.end, 16);
  
  chunk = instance.getNextToken();
  test.strictEqual(chunk, undefined);
  
  test.done();
};

module.exports.getTokenType = function(test) {
  var string = 'aaaa + бб   1 ((] ++',
      instance = new Lexer(string);
  
  var token = instance.getNextToken(),
      type  = instance.getTokenType(token);
  
  test.strictEqual(type.type, 'literal');
  test.strictEqual(type.value, 'aaaa');
  
  token = instance.getNextToken();
  type  = instance.getTokenType(token);
  test.strictEqual(type.type, 'operator');
  test.strictEqual(type.value, '+');
  
  token = instance.getNextToken();
  type  = instance.getTokenType(token);
  test.strictEqual(type.type, 'literal');
  test.strictEqual(type.value, 'бб');
  
  token = instance.getNextToken();
  type  = instance.getTokenType(token);
  test.strictEqual(type.type, 'number');
  test.strictEqual(type.value, 1);
  
  token = instance.getNextToken();
  type  = instance.getTokenType(token);
  test.strictEqual(type.type, 'bracket');
  test.strictEqual(type.value, '(');
  
  token = instance.getNextToken();
  type  = instance.getTokenType(token);
  test.strictEqual(type.type, 'bracket');
  test.strictEqual(type.value, '(');
  
  token = instance.getNextToken();
  type  = instance.getTokenType(token);
  test.strictEqual(type.type, 'bracket');
  test.strictEqual(type.value, ']');
  
  token = instance.getNextToken();
  test.throws(function() {
    instance.getTokenType(token);
  }, SyntaxError);
  
  test.throws(function() {
    instance.getTokenType();
  }, ReferenceError);
  
  test.done();
};