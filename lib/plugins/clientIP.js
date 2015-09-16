function create(){
	return function clientIP(req, res, next){
		req.clientList = (req.headers['x-forwarded-for'] && req.headers['x-forwarded-for'].split(",") || [])
		.concat( req.connection.remoteAddress);
		next();
	};
}

module.exports = create;