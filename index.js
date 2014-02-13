/*jslint white: true, node: true, plusplus: true, vars: true */
/*global module, require, __dirname */
'use strict';

var sources ='/src';
if(process.env.YOURPACKAGE_COVERAGE) {
  sources += '-cov';
}

module.exports.Lexer = require(__dirname + sources + '/lexer.js');