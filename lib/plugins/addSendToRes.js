function create(){
	return function addSendToRes(req, res, next){
		res.send = function(code, data, restCode){
			res.statusCode = code;
			res._data = data;
			res.restCode = restCode || "ok";
		};
		next();
	};
}

module.exports = create;