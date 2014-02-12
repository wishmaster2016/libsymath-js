/*jslint white: true, node: true, plusplus: true, vars: true */
/*global module */
'use strict';

function Lexer(buffer) {  
  this.buffer = buffer;
  this.offset = 0;
}

var WHITESPACE = /\s/;

Lexer.prototype.getNextToken = function() {
  var length = this.buffer.length,
      start;
  
  while(this.offset < length && WHITESPACE.test(this.buffer[this.offset])) {
    ++this.offset;
  }
  
  if(this.offset === length) {
    return;
  }
  
  start = this.offset;
  while(this.offset < length && !WHITESPACE.test(this.buffer[this.offset])) {
    ++this.offset;
  }
  
  return {
    text: this.buffer.substr(start, this.offset - start),
    loc: {
      start: start,
      end: this.offset
    }
  };
};

module.exports = Lexer;