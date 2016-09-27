function create(options){

	return function queryStringParser(req, res, next){
		var url = require('url');
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		if(query){
			Object.keys(query).forEach(function(k){
				req.params[k] = query[k];
			});
		}
		return next();
	};
}

module.exports = create;