/*jslint white: true, node: true, plusplus: true, vars: true */
/*global module, require */
'use strict';

var symath = require('../index.js');

module.exports.integrationTest = function(test) {
  test.ok(symath.Lexer);
  test.ok(symath.Expression);
  
  test.done();
};