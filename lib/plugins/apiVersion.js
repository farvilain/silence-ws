"use strict";

var restError = require('silence-error');

function create(options){

	var semver = null;
	try{
		semver = require('semver');
	}catch(e){
		if(e.message === "Cannot find module 'semver'"){
			throw "You should install semver module to use jsonBodyParser plugin";
		}
		throw e;
	}

	var accepted = "^" + semver.major(options.version);
	var actual = options.version;

	return {
		init	: init,
		check	: check
	};

	function init(req, res, next) {

		res.api = res.api || {};
		res.api.version = {
			actual		: actual,
			accepted 	: accepted
		};

		res.setHeader(options.headerName, options.version);

		req.api = req.api || {};
		req.api.version = {
			gived   : req.headers[options.headerName],
			cleaned : semver.valid(req.headers[options.headerName])
		};

		return next();
	}

	function check(req, res, next) {
		if(! req.api.version.gived){
			return next( restError.missingHeader(options.headerName) );
		}

		if( req.api.version.gived !== req.api.version.cleaned) {
			var error =  restError.invalidVersion();
			return next( error );	
		}

		if(!semver.satisfies(req.api.version.cleaned, res.api.version.accepted)){
			var error = restError.versionNotAccepted(
				res.api.version.actual,
				res.api.version.accepted,
				req.api.version.cleaned
			);
			return next( error );	
		}

		next();
	}
}


module.exports = create;