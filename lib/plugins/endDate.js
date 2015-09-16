function create(){
	return function endDate(req, res, next){
		req.endDate = new Date();
		next();
	};
}

module.exports = create;