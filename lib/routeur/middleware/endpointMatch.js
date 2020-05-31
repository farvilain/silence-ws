function endpointMatch(req, array){
	var endpoint;
	var paramsValue;
	array.some(function(elem){
		var match = req.path.match(elem.regexp);
		if(match) {
			endpoint = elem;
			paramsValue = match.slice(1);
			return true;
		}
	});

	if(!endpoint){
		return null;
	}

	return {
		endpoint : endpoint,
		paramsValue : paramsValue
	};
}

module.exports = endpointMatch;