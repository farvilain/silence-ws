function create(){
	return function allowedMethods(req, res, next){
		if(res.allowedmethods){
			res.setHeader('Allow', res.allowedmethods.join(",") );
		}else{
			res.setHeader('Allow', "");
		}
		next();
	};
}

module.exports = create;