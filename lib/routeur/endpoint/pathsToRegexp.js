function pathsToRegexp(regexpAndParams, paths) {
	if( !Array.isArray(paths)  || paths.length  === 0) {
		throw new Error("expects a non empty array");
	}
	if(paths.length === 1 ){
		return regexpAndParams(/^\/$/, []);
	}

	var paramNames = [];
	var regexp = [""]
		.concat(paths.slice(1))
		.map(function (path) {
			//A simple string path
			if(path.indexOf(":") !== 0) {
				return path.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
			}
			//A regexp path: ":paramName"
			//For the moment, this only match "[^/]+"
			var name = path.substr(1);
			paramNames.push(name);
			return "([^\\/]+)";
		})
		.join("\\/");

	return regexpAndParams(new RegExp("^"+regexp+"$"), paramNames);
}

module.exports = pathsToRegexp;