/*jslint white: true, node: true, plusplus: true, vars: true */
/*global module, require, __dirname */
'use strict';

var sources = __dirname + '/src';
if(process.env.YOURPACKAGE_COVERAGE) {
  sources += '-cov';
}

module.exports.Lexer = require(sources + '/lexer.js');
module.exports.Expression = require(sources + '/expression.js');