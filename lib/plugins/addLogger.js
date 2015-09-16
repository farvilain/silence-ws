function create(){
	return function addLogger(req, res, next){
		req.log = {
			debug : console.info.bind(console, "[DEBUG]"),
			info : console.info.bind(console, "[INFO]"),
			warn : console.warn.bind(console, "[WARN]"),
			error : console.error.bind(console, "[ERROR]")
		};
		next();
	};
}
module.exports = create;