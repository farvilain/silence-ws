function create(){
	return function log(req, res,next){
		req.log.info(
			"[#" + req.requestID + "]",
			"from", req.clientList,
			"asking [" + req.method + ":" + req.path + "]",
			"gives [" + res.statusCode + ":" + (res.restCode || "") + "]",
			"in", (req.endDate.getTime() - req.startDate.getTime()), "ms"
		);
		next();
	};
}

module.exports = create;