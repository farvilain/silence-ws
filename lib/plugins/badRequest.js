var restError = require('silence-error');

function create(){
	return function badRequest(req, res, next){
		next( restError.badRequest() );
	};
}

module.exports = create;