function node(path){
	return {
		path : path,
		uses : [],
		childs : [],
		methods : {}
	};
}

module.exports = node;