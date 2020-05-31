var regexpAndParams = require('./regexpAndParams');
var pathsToRegexp = require('./pathsToRegexp').bind(null, regexpAndParams);
var endpoint = require('./endpoint');
var nodeVisitor = require('./nodeVisitor');


module.exports = function(node){
	var accumulator = require('./accumulator')(endpoint, pathsToRegexp);
	nodeVisitor(nodeVisitor, accumulator, node, [], []);
	return accumulator.result;
};
