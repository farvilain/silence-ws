function nodeVisitor(recCall, accumulator, node, uses, path){
	var allUses = uses.concat(node.uses);
	var pathList = path.concat([node.path]);

	accumulator(node.methods, pathList, allUses);

	node.childs.forEach(function(child) {
		recCall(recCall, accumulator, child, allUses, pathList);
	});
}

module.exports = nodeVisitor;