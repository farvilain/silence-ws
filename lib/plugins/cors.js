function create(cors){
	return function (req, res, next){
		res.setHeader("Access-Control-Allow-Origin", cors.origin.join(",") );
		res.setHeader("Access-Control-Allow-Methods", res.getHeader('Allow') );
		res.setHeader("Access-Control-Expose-Headers", cors.exposeHeaders.join(","));
		res.setHeader("Access-Control-Allow-Headers", cors.allowHeaders.join(","));
		next();
	};
}

module.exports = create;