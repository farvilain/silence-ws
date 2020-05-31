function create(){
	return function finalSender(req, res, next){
		var allowed = res.allowedmethods && res.allowedmethods.join(",");
		allowed = allowed || "";
		res.setHeader('Allow', allowed );

		if(res.getHeaders()['content-type']){
			res.end(res._data);
		} else if(res._data){
			res.setHeader("Content-Type", "application/json; charset=utf-8");
			res.end(JSON.stringify(res._data));
		}else{
			res.end();
		}
		req.endDate = new Date();
		next();
	}
}

module.exports = create;