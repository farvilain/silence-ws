

function createMiddleWare(endpointMatch, chainExecutor, endpoints, badRequest, notAllowed){
	return function silenceMW(req, res, next){
		var match = endpointMatch(req, endpoints);

		if(match === null){
			return badRequest(req, res, next);
		}
		//TODO Decide if params must really be setted at this point. Do we need it on notAllowed?
		//TODO  it would be nice to check match.paramsValue.length === match.endpoint.paramNames.length
		match.paramsValue.forEach(function(paramValue, i){
			var thisParamName = match.endpoint.paramNames[i];
			req.params[thisParamName] = paramValue;
		});

		res.allowedmethods = Object.keys(match.endpoint.methods);
		if(!match.endpoint.methods[req.method]){
			return notAllowed(req, res, next);
		}

		req.name = match.endpoint.methods[req.method].name;

		var fcts = match.endpoint.methods[req.method].fcts;
		chainExecutor(fcts, next)(req, res);
	};
}

module.exports = createMiddleWare;