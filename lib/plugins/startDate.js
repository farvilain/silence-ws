function create(){
	return function startDate(req, res, next){
		req.startDate = new Date();
		next();
	};
}

module.exports = create;