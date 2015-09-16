var restError = require('silence-error');

function create(){
	return function requireJsonContentType(req, res, next){
		if(!req.body){
			return next();
		}
		if(req.headers['content-type'] !== 'application/json;charset=UTF-8'){
			return next( restError.unsupportedMediaType( req.headers['content-type'],['application/json']) );
		}
		next();
	};
}

module.exports = create;