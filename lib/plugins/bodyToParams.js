function create(){
	return function bodyToParams(req, res, next){
		if(req.body){
			req.params = req.params || {};
			Object.keys(req.body).forEach(function(k){
				req.params[k] = req.body[k];
			});
		}
		next();
	};
}

module.exports = create;