function create(options){
	return function (req, res, next){
		res.setHeader("Access-Control-Allow-Origin", options.origin.join(",") );
		res.setHeader("Access-Control-Allow-Methods", (res.allowedmethods || []).join(",") );
		res.setHeader("Access-Control-Expose-Headers", options.exposeHeaders.join(","));
		res.setHeader("Access-Control-Allow-Headers", options.allowHeaders.join(","));
		next();
	};
}

module.exports = create;
