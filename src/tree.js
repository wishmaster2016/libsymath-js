/*jslint white: true, node: true, plusplus: true, vars: true */
/*global module */
'use strict';

function Node(head, childs) {
  this.head = head;
  this.childs = childs;
}

function Leaf(head) {
  this.head = head;
}

module.exports.Node = Node;
module.exports.Leaf = Leaf;