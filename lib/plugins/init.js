var url = require('url');

function create(){

	return function init(req, res, next) {
		req.startDate = new Date();

		res.send = function (code, data, restCode) {
			res.statusCode = code;
			res._data = data;
			res.restCode = restCode || "ok";
		};

		req.path = url.parse(req.url).pathname;

		req.params = {};
		
		next();
	};
}

module.exports = create;
