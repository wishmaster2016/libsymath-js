/*jslint white: true, node: true, plusplus: true, vars: true */
/*global module */
'use strict';

function ExpressionTree() { }

ExpressionTree.prototype.parse = function(tokens) {
  if(!this.checkBrackets(tokens)) {
    throw new SyntaxError('expression error: brackets count mismatch!');
  }
  
  // TODO
};

ExpressionTree.prototype.checkBrackets = function(tokens) {
  var depth = 0,
      i;
  
  for(i = 0; i < tokens.length; ++i) {
    if(tokens[i].type === 'bracket') {
      if(tokens[i].value === '[' || tokens[i].value === '(') {
        ++depth;
        tokens[i].value = '(';
      }
      else
      if(tokens[i].value === ']' || tokens[i].value === ')') {
        --depth;
        tokens[i].value = ')';
      }
    }
  }
  
  return depth === 0;
};

module.exports = ExpressionTree;