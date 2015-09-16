var restError = require('silence-error');

function split(version){
	var v = version.split(".");
	return {
		major : +v[0],
		minor : +v[1],
		patch : +v[2]
	};
}


function accept(server, client){
	var c = split(client);
	var s = split(server);

	if(c.major !== s.major){
		//Different major
		return false;
	}

	if(c.major === 0 && c.minor !== s.minor){
		//If 0.x.y, x is 'major' for compatibility
		return false;
	}

	//Client minor cannot be greather than server.minor
	return c.minor <= s.minor;
}

function create(serverVersion){
	var semver;
	try{
		semver = require('semver');
	}catch(e){
		if(e.message === "Cannot find module 'semver'"){
			throw "You should install semver module to use this";
		}
		throw e;
	}


	if(!semver.valid(serverVersion)){
		throw new Error("This is not a valid version:", serverVersion);
	}

	return function version(req, res, next){
		res.version = serverVersion;
		res.setHeader('version', serverVersion);
		req.version = req.headers['version'];

		if(!req.version){
			return next( restError.missingHeader('version') );
		}

		if(!semver.valid(req.version)){
			return next( restError.custom(400, "invalidVersion") );
		}

		if( ! accept(serverVersion, req.version) ){
			return next( restError.custom(400, "invalidVersion") );
		}

		next();
	};
}

module.exports = create;
