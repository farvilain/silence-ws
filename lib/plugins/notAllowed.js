var restError = require('silence-error');

function create(){
	return function notAllowed(req, res, next){
		next( restError.notAllowed() );
	};
}

module.exports = create;
