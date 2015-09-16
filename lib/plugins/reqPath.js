var url = require('url');

function create(){
	return function reqPath(req,res, next){
		var path = url.parse(req.url).pathname;
		req.path = path;
		next();
	};
}

module.exports = create;