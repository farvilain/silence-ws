var restError = require('silence-error');

function create(options){

	return {
		init	: requestId_Init,
		check	: requestId_Check
	};


	function requestId_Init(req, res, next){
		req.requestId = req.headers[options.headerName];
		next();
	}

	function requestId_Check(req, res, next){
		if(options.optionnal || req.requestId){
			return next();
		}
		return next( restError.missingHeader(options.headerName) );
	};
}

module.exports = create;