var restError = require('silence-error');

function create(){
	return function headerRequestId(req, res, next){
		if(!req.headers["request-id"]){
			return next( restError.missingHeader('request-id') );
		}
		req.requestID = req.headers["request-id"];
		next();
	};
}

module.exports = create;