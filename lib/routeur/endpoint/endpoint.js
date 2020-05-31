function endpoint(regexp, paramNames){
	 return	 {
		regexp : regexp,
		paramNames : paramNames,
		methods : {}
	 };
}

module.exports = endpoint;