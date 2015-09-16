var restError = require('silence-error');

function create(){
	return function notAllowed(req, res, next){
		if(req.method === "OPTIONS"){
			return next();
		}
		next( restError.notAllowed() );
	};
}

module.exports = create;