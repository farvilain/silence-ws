var restError = require('silence-error');

function create(allowedContentTypes){
	return function requireContentType(req, res, next){
		if(!req.body){
			return next();
		}
		
		var usedContentType = req.headers['content-type'];
		
		if(allowedContentTypes.indexOf(usedContentType) === -1){
			return next( restError.unsupportedMediaType(usedContentType, allowedContentTypes) );
		}
		next();
	};
}

module.exports = create;