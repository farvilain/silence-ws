function create(){
	return function finalSender(req, res, next){

		var allowed = res.allowedmethods && res.allowedmethods.join(",");
		allowed = allowed || "";
		res.setHeader('Allow', allowed );

		if(res._data){
			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify(res._data));
		}else{
			res.end();
		}
		req.endDate = new Date();
		next();
	};
}

module.exports = create;