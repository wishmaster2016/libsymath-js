/*jslint white: true, node: true, plusplus: true, vars: true */
/*global module */
'use strict';

function ExpressionTree() { }

ExpressionTree.prototype.parse = function(tokens) {
  if(!this.checkBrackets(tokens)) {
    throw new SyntaxError('expression error: brackets count mismatch!');
  }
};

ExpressionTree.prototype.polishNotation = function(tokens) {
  var getOperationPriority = function(value) {
    return value == '+' || value == '-' ? 1 :
           value == '*' || value == '/' || value == '%' ? 2 :
           -1;
  };
  var result = [],
      stack = [];
  for(var i in tokens) {
    if(tokens[i].type === 'complex' || 
       tokens[i].type === 'constant' || 
       tokens[i].type === 'literal')
      result.push(tokens[i]);
    else if(tokens[i].type === 'operator') {
      while(stack.length > 0 && 
            getOperationPriority(tokens[i].value) <= getOperationPriority(stack[stack.length - 1].value))
        result.push(stack.pop());
      stack.push(tokens[i]);
    }
    else if(tokens[i].type === 'bracket') {
      if(tokens[i].value === '(')
        stack.push(tokens[i]);
      else if(tokens[i].value === ')') {
        while(stack[stack.length - 1].type !== 'bracket' && 
            stack[stack.length - 1].value !== ')')
        if(stack[stack.length - 1].type !== 'bracket')
          result.push(stack.pop());
        else
          stack.pop();
      stack.pop();
      }
    }
  }
  while(stack.length > 0)
    result.push(stack.pop());
  return result;
};

ExpressionTree.prototype.toString = function(tokens) {
  var result = '';
  for(var i in tokens)
    if((tokens[i].type === 'complex' || tokens[i].type === 'constant') && 
        tokens[i].value === 0)
      continue;
    else if(tokens[i].type === 'complex') {
      if(tokens[i].value === 1 || tokens[i].value === -1)
        result += tokens[i].value.toString().substr(0, tokens[i].value.toString().length - 1) + 'i ';
      else
        result += tokens[i].value + 'i ';
    }
    else
      result += tokens[i].value + ' ';
  return result.substr(0, result.length - 1);
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