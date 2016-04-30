"use strict";

var logger = require('silence-log').get('silence.ws.connector.mongoose');

function create(dbUrl, options){
	var mongoose = null;

	try{
		mongoose = require('mongoose');
	}catch(e){
		if(e.message === "Cannot find module 'mongoose'"){
			throw "You should install mongoose module to use this";
		}
		throw e;
	}
	
	var db = mongoose.connection;
	var myDb = {
		connect : function (callback) {
			logger.info("Will connect to:" + dbUrl);
			mongoose.connect(dbUrl, options, callback);
		},
		disconnect :  function (callback) {
			logger.info("Will disconnect from:" + dbUrl);
			mongoose.disconnect(callback);
		}
	}
	return myDb;
}


module.exports =create;