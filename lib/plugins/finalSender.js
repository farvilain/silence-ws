function create(){
	return function finalSender(req, res, next){
		res.setHeader("content-type", "application/json");
		var data = null;
		if(res._data){
			res.end(JSON.stringify(res._data));
		}else{
			res.end();
		}
		next();
	};
}

module.exports = create;