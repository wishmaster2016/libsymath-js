/*jslint white: true, node: true, plusplus: true, vars: true */
/*global module, require */
'use strict';

var Lexer = require('../src/lexer.js');

module.exports.getNextToken = function(test) {
  var string = 'aaaa + бб   1',
      instance = new Lexer(string);
  
  var chunk = instance.getNextToken();
  test.equal(chunk.text, 'aaaa');
  test.equal(chunk.loc.start, 0);
  test.equal(chunk.loc.end, 4);
  
  
  chunk = instance.getNextToken();
  test.equal(chunk.text, '+');
  test.equal(chunk.loc.start, 5);
  test.equal(chunk.loc.end, 6);
  
  chunk = instance.getNextToken();
  test.equal(chunk.text, 'бб');
  test.equal(chunk.loc.start, 7);
  test.equal(chunk.loc.end, 9);
  
  chunk = instance.getNextToken();
  test.equal(chunk.text, '1');
  test.equal(chunk.loc.start, 12);
  test.equal(chunk.loc.end, 13);
  
  chunk = instance.getNextToken();
  test.equal(chunk, undefined);
  
  test.done();
};