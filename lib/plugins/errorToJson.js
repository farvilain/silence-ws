var restError = require('silence-error');

function create(){
	return function errorToJson(err, req, res, next) {
		if(err instanceof Error){
			err = restError.internalServerError({msg:err.message, stack:err.stack});
		}else if(typeof err === "string"){
			err = restError.internalServerError({msg:err});
		}

		err.statusCode = err.statusCode || 500;
		err.restCode = err.restCode || "NotDefined";

		res.send(err.statusCode, err, err.restCode);
		next();
	};
}

module.exports = create;