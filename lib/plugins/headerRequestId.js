var restError = require('silence-error');

function create(headerName, optionnal){
	return function headerRequestId(req, res, next){
		if(!req.headers[headerName]){
			if(optionnal){
				return next();
			}
			return next( restError.missingHeader(headerName) );
		}
		req.requestID = req.headers[headerName];
		next();
	};
}

module.exports = create;