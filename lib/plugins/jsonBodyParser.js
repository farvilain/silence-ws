var restError = require('silence-error');

function create(options){

	var jsonParse = null;
	try{
		jsonParse = require('body-parser').json(options);
	}catch(e){
		if(e.message === "Cannot find module 'body-parser'"){
			throw "You should install body-parser module to use jsonBodyParser plugin";
		}
		throw e;
	}

	return function jsonBodyParser(req, res, next){
		jsonParse(req, res, function(err){
			if(err){
				return next( restError.invalidBody() );
			}

			if(req.body){
				Object.keys(req.body).forEach(function(k){
					req.params[k] = req.body[k];
				});
			}

			next();
		});	
	};
}


module.exports = create;